"use client";

import React from "react";
import { X, Send, StopCircle, Mic, MicOff, AudioLines, Zap, RotateCcw, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { type UploadedImage } from "@/lib/image-upload-handler";
import { ChatMessage } from "./types";

export interface ChatComposerProps {
  input: string;
  setInput: (v: string) => void;
  isLoading: boolean;
  sendMessage: (text?: string) => void;
  stopGeneration: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handlePaste: (e: any) => void;
  handleDragEnter: (e: any) => void;
  handleDragLeave: (e: any) => void;
  handleDragOver: (e: any) => void;
  handleDrop: (e: any) => void;
  handleFileSelect: (e: any) => void;
  handleClearInput: () => void;
  cancelClear: () => void;
  confirmClear: () => void;
  showClearConfirm: boolean;
  showOptions: boolean;
  setShowOptions: (v: boolean) => void;
  isBraidMode: boolean;
  setIsBraidMode: (v: boolean) => void;
  isRecording: boolean;
  isProcessing: boolean;
  toggleRecording: () => void;
  isAliveMode: boolean;
  setIsAliveMode: (v: boolean) => void;
  startRecording: () => void;
  stopRecordingAndTranscribe: () => void;
  currentAudioRef: React.RefObject<HTMLAudioElement | null>;
  uploadedImages: UploadedImage[];
  removeImage: (id: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  isDragActive: boolean;
  chatMode: 'good' | 'wicked' | 'okay';
  setChatMode: (v: 'good' | 'wicked' | 'okay') => void;
  isTurboMode: boolean;
  setIsTurboMode: (v: boolean) => void;
  turboFantasy: string;
  setTurboFantasy: (v: string) => void;
  turboMessagesLeft: number;
  setTurboMessagesLeft: (v: number) => void;
  isGoodTurboMode: boolean;
  setIsGoodTurboMode: (v: boolean) => void;
  goodTurboFantasy: string;
  setGoodTurboFantasy: (v: string) => void;
  goodTurboMessagesLeft: number;
  setGoodTurboMessagesLeft: (v: number) => void;
  messages: ChatMessage[];
  isLimitReached: boolean;
  error: string | null;
  currentPlaceholder: string;
  getConversationStatus: () => string;
  getStatusColor: () => string;
  applyMagicPrompt: () => void;
  regenShortPrompt: () => void;
  addFoodReward: () => void;
  currentRewardEmoji: string;
  setShowAgeWarning: (v: boolean) => void;
  setShowSumUpMenu: (v: boolean) => void;
  setIsSidebarOpen: (v: boolean) => void;
  particles: Array<{id: string; x: number; y: number; color: string; life: number}>;
  isMagicShaking: boolean;
  isRegenRotating: boolean;
  magicWandRef: React.RefObject<HTMLButtonElement | null>;
}

export function ChatComposer(props: ChatComposerProps) {
  const p = props;

  return (
    <div 
      className="p-4 border-t border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl shrink-0 z-20"
      onDragEnter={p.handleDragEnter}
      onDragLeave={p.handleDragLeave}
      onDragOver={p.handleDragOver}
      onDrop={p.handleDrop}
    >
      {p.uploadedImages.length > 0 && (
        <div className="mb-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Attached Images ({p.uploadedImages.length})</p>
          <div className="flex flex-wrap gap-2">
            {p.uploadedImages.map((img) => (
              <div key={img.id} className="relative group">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-emerald-200 dark:border-emerald-800 shadow-sm">
                  <img src={img.base64} alt={img.fileName} className="w-full h-full object-cover" />
                </div>
                <button onClick={() => p.removeImage(img.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md" aria-label="Remove image">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`relative flex items-end gap-2 bg-white dark:bg-zinc-950 border-2 rounded-2xl shadow-sm transition-all p-1 pl-3 pr-1.5 ${p.isDragActive ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-zinc-300 dark:border-zinc-800 focus-within:border-emerald-500 dark:focus-within:border-emerald-500/50'}`}>
        <textarea
          ref={p.inputRef}
          value={p.input}
          onChange={p.handleInput}
          onKeyDown={p.handleKeyDown}
          onPaste={p.handlePaste}
          placeholder={p.isLimitReached ? "Conversation limit reached (69/69) 💘" : p.currentPlaceholder || "Ask me anything..."}
          rows={1}
          disabled={p.isLoading || p.isLimitReached}
          className="w-full resize-none py-3.5 bg-transparent text-[15px] font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder-text-zinc-600 focus:outline-none custom-scrollbar"
          style={{ maxHeight: "200px" }}
        />
        <div className="flex gap-1 pb-1.5 pl-1 shrink-0">
          <button
            onClick={() => {
              const turningOn = !p.isAliveMode;
              p.setIsAliveMode(turningOn);
              if (turningOn) { p.startRecording(); }
              else { if (p.currentAudioRef.current) p.currentAudioRef.current.pause(); p.stopRecordingAndTranscribe(); }
            }}
            className={`w-[42px] h-10 flex flex-col items-center justify-center rounded-xl transition-all border ${
              p.isAliveMode 
                ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 shadow-[0_0_15px_rgba(225,29,72,0.3)]' 
                : 'bg-zinc-100 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-600 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 hover:text-zinc-500 hover:dark:bg-zinc-800'
            }`}
            title={p.isAliveMode ? "Alive Speech Active (Say 'pause' to stop)" : "Enable Alive Speech (Live mode)"}
          >
            <AudioLines className={`w-[18px] h-[18px] ${p.isAliveMode ? 'animate-pulse' : ''}`} />
            <span className="text-[7.5px] font-bold mt-0.5 leading-none">ALIVE</span>
          </button>

          <button
            onClick={p.toggleRecording}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors border ${
              p.isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                : p.isProcessing 
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-500 border-amber-200 dark:border-amber-800'
                  : 'bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
            }`}
            title={p.isRecording ? "Stop recording" : "Record audio (Whisper)"}
          >
            {p.isRecording ? <MicOff className="w-5 h-5 animate-pulse" /> : p.isProcessing ? <Zap className="w-4 h-4 animate-spin" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => p.fileInputRef.current?.click()}
            disabled={p.isLoading}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Upload images (supports drag-drop and paste)"
          >
            <Upload className="w-5 h-5" />
          </button>
          {p.isLoading ? (
            <button onClick={p.stopGeneration} className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 transition-colors" title="Stop generating">
              <StopCircle className="w-5 h-5 fill-current" />
            </button>
          ) : (
            <button onClick={() => p.sendMessage()} disabled={(p.input.trim().length === 0 && p.uploadedImages.length === 0) || p.isLimitReached} className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white disabled:opacity-50 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 transition-colors group focus:outline-none focus:ring-2 focus:ring-emerald-500/50" title={p.isLimitReached ? "Limit reached" : "Send message (Enter to send, Shift+Enter for new line)"}>
              <Send className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      <input ref={p.fileInputRef} type="file" multiple accept="image/*,.pdf,.md,.markdown,.txt,.csv,.json" onChange={p.handleFileSelect} className="hidden" aria-label="Upload images and documents" />

      {p.isDragActive && (
        <div className="absolute inset-0 bg-emerald-500/10 border-2 border-dashed border-emerald-500 rounded-2xl flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <Upload className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Drop images or documents here</p>
          </div>
        </div>
      )}

      {p.showClearConfirm && (
        <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center backdrop-blur-sm z-50">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Clear FR FR, no cap?</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">You&apos;re about to clear {p.input.length} characters of text. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={p.cancelClear} className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">No</button>
              <button onClick={p.confirmClear} className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors">Yes</button>
            </div>
          </motion.div>
        </div>
      )}

      {p.particles.map((particle) => (
        <motion.div key={particle.id} initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }} animate={{ x: particle.x + (Math.random() - 0.5) * 200, y: particle.y - Math.random() * 150, opacity: 0, scale: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="fixed pointer-events-none" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: particle.color, boxShadow: `0 0 8px ${particle.color}`, zIndex: 40 }} />
      ))}

      <div className="flex justify-center mt-2 mb-1">
        <button onClick={() => p.setShowOptions(!p.showOptions)} className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-lg" title={p.showOptions ? "Hide options" : "Show options"}>
          {p.showOptions ? "👇" : "👆"}
        </button>
      </div>

      {p.showOptions && (
        <>
          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={p.handleClearInput} disabled={p.input.length === 0} className="inline-flex items-center justify-center text-[12px] font-semibold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-full px-2 py-1 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Clear input">
              <X className="w-4 h-4" />
            </button>
            <motion.button ref={p.magicWandRef} type="button" onClick={p.applyMagicPrompt} className="inline-flex items-center justify-center text-4xl font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full w-10 h-10 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors" title="Magic prompt - tap to shake!">
              <motion.span role="img" aria-label="magic wand" animate={p.isMagicShaking ? { rotate: [-5, 5, -5, 5, -5, 5, 0] } : { rotate: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }} style={{ originX: 0, originY: 1, display: 'inline-block' }}>🪄</motion.span>
            </motion.button>
            <motion.button type="button" onClick={p.regenShortPrompt} disabled={p.isRegenRotating} animate={p.isRegenRotating ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 1, ease: "linear" }} className="inline-flex items-center justify-center text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800 rounded-full w-10 h-10 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Regenerate a random short prompt">
              <RotateCcw className="w-4 h-4" />
            </motion.button>
            <button type="button" onClick={() => p.setIsBraidMode(!p.isBraidMode)} className={`inline-flex items-center justify-center text-lg font-semibold rounded-full w-10 h-10 transition-all ${p.isBraidMode ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50' : 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50'}`} title="BRAID Mode - Convert prompts to Mermaid diagrams (35x more efficient)">🧬</button>
            <button type="button" onClick={p.addFoodReward} className="inline-flex items-center gap-1 text-[12px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-full px-3 py-1 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors" title="Add a random food emoji reward">
              <span role="img" aria-label="food reward" className="text-lg leading-none">{p.currentRewardEmoji}</span> Reward
            </button>
          </div>

          <div className="flex items-center justify-between mt-3 px-1 gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${p.chatMode === 'good' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : p.chatMode === 'okay' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'}`}>
                {p.chatMode === 'good' ? 'Good' : p.chatMode === 'okay' ? 'Okay' : 'Wicked'}
              </span>
              <span className={`text-[10px] font-bold tracking-widest uppercase truncate ${p.getStatusColor()}`}>
                {p.isLoading ? "Thinking..." : p.error ? "Error" : `${p.getConversationStatus()} ${p.messages.filter(m => m.role === 'assistant').length}/69`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 tracking-wider hidden sm:inline-block mr-1 whitespace-nowrap">Powered by God</span>
              {p.chatMode === 'good' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">Switch To Mode:</span>
                  <button onClick={() => p.setChatMode('okay')} className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-md hover:bg-blue-100 transition-colors whitespace-nowrap">[Okay]</button>
                  <button onClick={() => p.setShowAgeWarning(true)} className="text-[10px] font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-md hover:bg-rose-100 transition-colors whitespace-nowrap">[Wicked (18+)]</button>
                </div>
              )}
              {p.chatMode === 'wicked' && (
                <button onClick={() => { p.setChatMode('okay'); p.setIsTurboMode(false); }} className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-md hover:bg-blue-100 transition-colors whitespace-nowrap">Switch to Okay</button>
              )}
              {p.chatMode === 'okay' && (
                <button onClick={() => p.setChatMode('good')} className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md hover:bg-emerald-100 transition-colors whitespace-nowrap">Switch to Good</button>
              )}
            </div>
          </div>
          
          {p.chatMode === 'wicked' && (
            <div className="mt-2 px-2 py-2 bg-rose-50/50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-widest flex items-center gap-1"><Zap className="w-3 h-3 fill-current animate-pulse" /> Turbo Roleplay</span>
                <button onClick={() => { if (!p.isTurboMode) { p.setTurboMessagesLeft(5); p.setIsTurboMode(true); } else { p.setIsTurboMode(false); } }} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${p.isTurboMode ? 'bg-rose-500 text-white' : 'bg-rose-200 dark:bg-rose-800 text-rose-700 dark:text-rose-300'} transition-colors disabled:opacity-50`}>
                  {p.isTurboMode ? `STOP (${p.turboMessagesLeft} LEFT)` : 'ACTIVATE (5 MSGS MAX)'}
                </button>
              </div>
              <input type="text" value={p.turboFantasy} disabled={p.isTurboMode} onChange={(e) => p.setTurboFantasy(e.target.value)} placeholder="Enter explicit fantasy..." className="w-full bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-800 rounded-md px-2 py-1 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500 transition-colors placeholder:text-rose-300/50 disabled:opacity-50" />
            </div>
          )}

          {p.chatMode === 'good' && (
            <div className="mt-2 px-2 py-2 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest flex items-center gap-1"><Zap className="w-3 h-3 fill-current animate-pulse" /> Turbo Roleplay</span>
                <button onClick={() => { if (!p.isGoodTurboMode) { p.setGoodTurboMessagesLeft(5); p.setIsGoodTurboMode(true); } else { p.setIsGoodTurboMode(false); } }} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${p.isGoodTurboMode ? 'bg-emerald-500 text-white' : 'bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300'} transition-colors`}>
                  {p.isGoodTurboMode ? `STOP (${p.goodTurboMessagesLeft} LEFT)` : 'ACTIVATE (5 MSGS MAX)'}
                </button>
              </div>
              <input type="text" value={p.goodTurboFantasy} disabled={p.isGoodTurboMode} onChange={(e) => p.setGoodTurboFantasy(e.target.value)} placeholder="Enter roleplay scenario..." className="w-full bg-white dark:bg-zinc-950 border border-emerald-200 dark:border-emerald-800 rounded-md px-2 py-1 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-emerald-300/50 disabled:opacity-50" />
            </div>
          )}

          {p.getConversationStatus() === 'Dead' && (
            <div className="px-4 py-3 border-t border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-red-700 dark:text-red-300 uppercase tracking-widest">💀 Revive Valley Net with Sum Up</span>
              </div>
              <button onClick={() => { p.setShowSumUpMenu(true); p.setIsSidebarOpen(true); }} className="w-full px-3 py-2 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">Sum Up &amp; Revive</button>
            </div>
          )}
        </>
      )}

      <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 tracking-widest">-+OUTPUT_NOT_100%_TRUE+-</span>
      </div>
    </div>
  );
}
