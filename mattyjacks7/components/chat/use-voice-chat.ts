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
  const recordingStartRef = useRef<number | null>(null); // track recording start time

  const stopRecordingAndTranscribe = useCallback(async () => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") return;
    
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsProcessing(true);
    
    // Stop tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current?.state === "running") {
      await audioContextRef.current.close();
    }
  }, []);

  const processAudioBlob = useCallback(async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob, "audio.webm");

      const response = await fetch("/api/speech/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Transcription failed");
      const { text } = await response.json();
      
      const lower = text.toLowerCase().trim();
      
      // Parse Voice Commands as requested: "stop stop", "regen regen", "pause pause", "go go go"
      if (lower.includes("stop stop")) {
        onCommandCommand?.("stop");
      } else if (lower.includes("regen regen")) {
        onCommandCommand?.("regen");
      } else if (lower.includes("pause pause")) {
        onCommandCommand?.("pause");
      } else if (lower.includes("go go go")) {
        onCommandCommand?.("go");
      } else if (text.trim().length > 0) {
        onTranscript(text);
      }
    } catch (error) {
      console.error("Whisper transcription error:", error);
      onError?.("Transcription failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [onTranscript, onCommandCommand]);

  const startRecording = useCallback(async () => {
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
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Only send if we have meaningful audio (at least 8KB)
        if (audioBlob.size > 8000) {
          processAudioBlob(audioBlob);
        } else {
          setIsProcessing(false);
          console.warn('[Voice] Skipped tiny/silent blob:', audioBlob.size, 'bytes');
        }
      };

      // Set up Silence Detection
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
        if (!analyserRef.current) return;
        const memory = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(memory);
        const average = memory.reduce((a, b) => a + b) / memory.length;
        
        // Silence detection — threshold 20 and require at least 800ms of recording before stopping
        const minRecordMs = 800;
        const hasMinRecording = recordingStartRef.current !== null && (Date.now() - recordingStartRef.current) > minRecordMs;
        
        if (average < 20 && hasMinRecording) {
          if (silenceStartRef.current === null) {
            silenceStartRef.current = Date.now();
          } else if (Date.now() - silenceStartRef.current > autoProcessSilenceMs) {
            // Silence detected for X ms
            stopRecordingAndTranscribe();
            return;
          }
        } else if (average >= 20) {
          silenceStartRef.current = null;
        }

        if (mediaRecorderRef.current?.state === "recording") {
          animationFrameRef.current = requestAnimationFrame(checkSilence);
        }
      };
      
      checkSilence();
      
    } catch (err: any) {
      console.error("Microphone access error:", err);
      // Give the user a clear explanation
      const msg = err.message || "Unknown error";
      if (!navigator.mediaDevices) {
        onError?.("Microphone API is disabled. This usually happens if you're not on HTTPS (Secure Context).");
      } else if (msg.includes("Permission denied") || msg.includes("NotAllowedError")) {
        onError?.("Microphone permission was denied. Please allow it in your browser settings.");
      } else {
        onError?.(`Microphone Error: ${msg}`);
      }
      setIsProcessing(false);
      setIsRecording(false);
    }
  }, [autoProcessSilenceMs, stopRecordingAndTranscribe, onError]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecordingAndTranscribe();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecordingAndTranscribe]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecordingAndTranscribe,
    toggleRecording
  };
}
