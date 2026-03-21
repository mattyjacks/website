import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseVoiceChatProps {
  onTranscript: (text: string) => void;
  onCommandCommand?: (command: 'stop' | 'regen' | 'pause' | 'go') => void;
  onError?: (errorMessage: string) => void;
  autoProcessSilenceMs?: number;
}

export function useVoiceChat({ onTranscript, onCommandCommand, onError, autoProcessSilenceMs = 1500 }: UseVoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceStartRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingStartRef = useRef<number | null>(null);
  const isProcessingRef = useRef(false); // Ref mirror for guards inside async closures

  const stopTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const stopRecordingAndTranscribe = useCallback(async () => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsProcessing(true);
    isProcessingRef.current = true;
    stopTracks();
    if (audioContextRef.current?.state === 'running') {
      await audioContextRef.current.close();
    }
  }, [stopTracks]);

  const processAudioBlob = useCallback(async (blob: Blob) => {
    // Minimum 8KB guard — anything smaller is silence/empty
    if (blob.size < 8000) {
      console.warn('[Voice] Skipped tiny/silent blob:', blob.size, 'bytes');
      setIsProcessing(false);
      isProcessingRef.current = false;
      return;
    }

    try {
      const base64Audio = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const response = await fetch('/api/speech/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileBase64: base64Audio }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Transcription HTTP ${response.status}`);
      }
      const { text } = await response.json();
      const lower = (text ?? '').toLowerCase().trim();

      if (lower.includes('stop stop')) {
        onCommandCommand?.('stop');
      } else if (lower.includes('regen regen')) {
        onCommandCommand?.('regen');
      } else if (lower.includes('pause pause')) {
        onCommandCommand?.('pause');
      } else if (lower.includes('go go go')) {
        onCommandCommand?.('go');
      } else if (text.trim().length > 0) {
        onTranscript(text);
      }
    } catch (error: any) {
      const msg = error?.message ?? String(error);
      console.error('[Voice] Whisper transcription error:', msg);
      // Only surface the error to the user if it's not just a silent/empty blob rejection
      if (!msg.includes('Transcription HTTP 200')) {
        onError?.(`Transcription error: ${msg}`);
      }
    } finally {
      setIsProcessing(false);
      isProcessingRef.current = false;
    }
  }, [onTranscript, onCommandCommand, onError]);

  const startRecording = useCallback(async () => {
    // Don't start a new recording if already processing or already recording
    if (isProcessingRef.current) {
      console.warn('[Voice] startRecording skipped — still processing previous audio');
      return;
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      console.warn('[Voice] startRecording skipped — already recording');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];
        processAudioBlob(blob);
      };

      // Silence detection setup
      const AudioContextType = window.AudioContext || (window as any).webkitAudioContext;
      const actx = new AudioContextType();
      audioContextRef.current = actx;
      const source = actx.createMediaStreamSource(stream);
      const analyser = actx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      mediaRecorder.start();
      setIsRecording(true);
      recordingStartRef.current = Date.now();
      silenceStartRef.current = null;

      const checkSilence = () => {
        if (!analyserRef.current || mediaRecorderRef.current?.state !== 'recording') return;
        const memory = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(memory);
        const average = memory.reduce((a, b) => a + b) / memory.length;

        const minRecordMs = 1000; // Must record at least 1 second before stopping on silence
        const elapsed = recordingStartRef.current ? Date.now() - recordingStartRef.current : 0;
        const hasMinRecording = elapsed > minRecordMs;

        if (average < 20 && hasMinRecording) {
          if (!silenceStartRef.current) silenceStartRef.current = Date.now();
          else if (Date.now() - silenceStartRef.current > autoProcessSilenceMs) {
            stopRecordingAndTranscribe();
            return;
          }
        } else if (average >= 20) {
          silenceStartRef.current = null;
        }

        animationFrameRef.current = requestAnimationFrame(checkSilence);
      };

      checkSilence();

    } catch (err: any) {
      const msg = err?.message ?? 'Unknown error';
      if (!navigator.mediaDevices) {
        onError?.('Microphone API disabled — must be on HTTPS (Secure Context).');
      } else if (msg.includes('Permission denied') || msg.includes('NotAllowedError')) {
        onError?.('Microphone permission denied. Allow it in your browser settings.');
      } else {
        onError?.(`Microphone error: ${msg}`);
      }
      setIsProcessing(false);
      isProcessingRef.current = false;
      setIsRecording(false);
    }
  }, [autoProcessSilenceMs, stopRecordingAndTranscribe, processAudioBlob, onError]);

  const toggleRecording = useCallback(() => {
    if (isRecording) stopRecordingAndTranscribe();
    else startRecording();
  }, [isRecording, startRecording, stopRecordingAndTranscribe]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
      stopTracks();
    };
  }, [stopTracks]);

  return { isRecording, isProcessing, startRecording, stopRecordingAndTranscribe, toggleRecording };
}
