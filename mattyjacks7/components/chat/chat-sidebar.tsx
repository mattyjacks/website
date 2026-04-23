"use client";

import { useState } from "react";
import { MessageSquare, Plus, X, MoreVertical } from "lucide-react";
import { ChatSession, CloudSessionMeta } from "./types";
import { ChatModeSelector } from "./chat-mode-selector";

export interface ChatSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
  showSettings: boolean;
  setShowSettings: (v: boolean) => void;
  showSumUpMenu: boolean;
  setShowSumUpMenu: (v: boolean) => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;
  createNewSession: () => void;
  deleteSession: (id: string) => void;
  renameSessionAuto: (id: string) => void;
  sumUpSession: (id: string) => void;
  nickname: string;
  setNickname: (v: string) => void;
  chatMode: 'good' | 'wicked' | 'okay';
  setChatMode: (v: 'good' | 'wicked' | 'okay') => void;
  selectedModel: string;
  setSelectedModel: (v: string) => void;
  wickedModel: string;
  setWickedModel: (v: string) => void;
  autoScrollEnabled: boolean;
  setAutoScrollEnabled: (v: boolean) => void;
  consoleDebugEnabled: boolean;
  setConsoleDebugEnabled: (v: boolean) => void;
  cloudSessions: CloudSessionMeta[];
  cloudLoading: boolean;
  cloudError: string | null;
  downloadSummary: (id: string, format: 'markdown' | 'text') => void;
  copySummaryToClipboard: (id: string) => void;
  startNewChatWithSummary: (id: string) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

export function ChatSidebar(props: ChatSidebarProps) {
  const {
    isSidebarOpen, setIsSidebarOpen,
    showSettings, setShowSettings,
    showSumUpMenu, setShowSumUpMenu,
    sessions, currentSessionId, setCurrentSessionId,
    createNewSession, deleteSession, renameSessionAuto, sumUpSession,
    nickname, setNickname,
    chatMode, setChatMode,
    selectedModel, setSelectedModel,
    wickedModel, setWickedModel,
    autoScrollEnabled, setAutoScrollEnabled,
    consoleDebugEnabled, setConsoleDebugEnabled,
    cloudSessions, cloudLoading, cloudError,
    downloadSummary, copySummaryToClipboard, startNewChatWithSummary,
    openMenuId, setOpenMenuId,
  } = props;

  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  return (
    <div className={`absolute top-[60px] bottom-0 left-0 w-[50vw] sm:w-[40vw] lg:w-[35vw] min-w-[300px] max-w-[550px] bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-200 dark:border-white/10 z-30 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full opacity-0'}`}>
      <div className="p-4 border-b border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-black/20 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-base text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">Chat Menu</h4>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-white flex-shrink-0"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={createNewSession} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500 text-white border border-emerald-600 dark:bg-emerald-600 dark:border-emerald-700 transition-all hover:shadow-sm hover:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900" aria-label="Create new conversation"><Plus className="w-3 h-3 inline mr-1" />New</button>
          <button onClick={() => setShowSettings(!showSettings)} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800/50 transition-all hover:shadow-sm hover:bg-emerald-200 dark:hover:bg-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900" aria-label="Toggle chat settings">Settings</button>
          <button onClick={() => setShowSumUpMenu(!showSumUpMenu)} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800/50 transition-all hover:shadow-sm hover:bg-emerald-200 dark:hover:bg-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900" aria-label="Toggle sum up conversations">Sum Up</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {showSumUpMenu ? (
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-black/30 border border-purple-200 dark:border-purple-800 shadow-sm space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-purple-300">Sum Up Conversations</h5>
            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {sessions.length === 0 ? (
                <div className="text-xs text-zinc-500 py-2">No conversations to sum up.</div>
              ) : (
                sessions.map((session) => (
                  <div key={session.id} className="p-3 rounded-lg bg-purple-50/50 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-800/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{session.title}</span>
                      <span className="text-[10px] text-zinc-500">({session.messages.length} msgs)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => downloadSummary(session.id, 'markdown')} className="px-2 py-1.5 text-[11px] font-bold rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors">📄 Markdown</button>
                      <button onClick={() => downloadSummary(session.id, 'text')} className="px-2 py-1.5 text-[11px] font-bold rounded bg-slate-600 text-white hover:bg-slate-700 transition-colors">📝 Text</button>
                      <button onClick={() => copySummaryToClipboard(session.id)} className="px-2 py-1.5 text-[11px] font-bold rounded bg-green-600 text-white hover:bg-green-700 transition-colors">📋 Copy</button>
                      <button onClick={() => startNewChatWithSummary(session.id)} className="px-2 py-1.5 text-[11px] font-bold rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors">✨ New Chat</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-white/70 dark:bg-black/30 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Local Conversations</h5>
                <button onClick={createNewSession} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black text-[11px] font-bold shadow-sm hover:scale-[1.02] transition-transform"><Plus className="w-3.5 h-3.5" /> New</button>
              </div>
              <div className="space-y-1 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
                {sessions.length === 0 && (
                  <div className="text-xs text-zinc-500 py-2">No local conversations yet.</div>
                )}
                {sessions.map((session) => (
                  <div key={session.id} className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-all ${currentSessionId === session.id ? "bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-transparent font-medium"}`}>
                    <div className="flex items-center gap-2 truncate flex-1" onClick={() => { setCurrentSessionId(session.id); setIsSidebarOpen(false); }}>
                      <MessageSquare className={`w-4 h-4 flex-shrink-0 ${currentSessionId === session.id ? 'text-emerald-500' : 'opacity-60'}`} />
                      <span className="truncate">{session.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-400">{session.messages.length}</span>
                      <div className="relative">
                        <button onClick={() => setOpenMenuId(openMenuId === session.id ? null : session.id)} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors" title="More options">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                        {openMenuId === session.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 py-1">
                            <button onClick={() => { setCurrentSessionId(session.id); setIsSidebarOpen(false); setOpenMenuId(null); }} className="w-full text-left px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">Go To</button>
                            <button onClick={() => { renameSessionAuto(session.id); }} className="w-full text-left px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">Rename Auto</button>
                            <button onClick={() => { sumUpSession(session.id); }} className="w-full text-left px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">Sum Up</button>
                            <button onClick={() => { deleteSession(session.id); }} className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Delete</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 dark:bg-black/30 border border-purple-200 dark:border-purple-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-purple-300">Cloud Conversations</h5>
                {cloudLoading && <span className="text-[11px] text-purple-500 font-semibold">Loading…</span>}
                {cloudError && !cloudLoading && <span className="text-[11px] text-rose-500 font-semibold">{cloudError}</span>}
              </div>
              <div className="space-y-1 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                {cloudSessions.length === 0 && !cloudLoading && !cloudError && (
                  <div className="text-xs text-zinc-500 py-2">No cloud conversations found.</div>
                )}
                {cloudSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm bg-purple-50/70 dark:bg-purple-900/20 border border-purple-200/70 dark:border-purple-800/70 text-purple-800 dark:text-purple-200">
                    <div className="flex items-center gap-2 truncate">
                      <MessageSquare className="w-4 h-4 flex-shrink-0 text-purple-500" />
                      <span className="truncate">{session.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-purple-600 dark:text-purple-300">
                      {session.messageCount !== undefined && <span>{session.messageCount}</span>}
                      <span>{new Date(session.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-black/30 border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/50 dark:border-emerald-800/50">
                <h5 className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Settings</h5>
                <span className="text-xs font-bold text-emerald-500">Valley Net</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    Nickname
                    <span className="block text-xs text-emerald-700/70 dark:text-emerald-300/70 font-normal mt-0.5">Your name in chat</span>
                  </label>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full text-sm font-semibold bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <ChatModeSelector 
                  chatMode={chatMode} 
                  setChatMode={setChatMode}
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  wickedModel={wickedModel}
                  setWickedModel={setWickedModel}
                />

                <div className="flex items-start gap-3 p-3 bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-lg">
                  <input 
                    type="checkbox" 
                    checked={autoScrollEnabled} 
                    onChange={(e) => setAutoScrollEnabled(e.target.checked)} 
                    className="h-5 w-5 mt-0.5 flex-shrink-0 cursor-pointer"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Auto-scroll on replies</span>
                    <span className="text-xs text-emerald-700/70 dark:text-emerald-300/70">Keeps the newest message in view</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-lg">
                  <input 
                    type="checkbox" 
                    checked={consoleDebugEnabled} 
                    onChange={(e) => setConsoleDebugEnabled(e.target.checked)} 
                    className="h-5 w-5 mt-0.5 flex-shrink-0 cursor-pointer"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Console debug logs</span>
                    <span className="text-xs text-emerald-700/70 dark:text-emerald-300/70">Show backend debug trail in DevTools</span>
                  </div>
                </div>


                <div className="p-3 bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-200/60 dark:border-indigo-800/50 rounded-lg">
                  <button
                    onClick={() => setShowEmbedCode(!showEmbedCode)}
                    className="w-full flex items-center justify-between text-sm font-semibold text-indigo-700 dark:text-indigo-200"
                  >
                    <span>🔗 Embed on Your Website</span>
                    <span className="text-lg">{showEmbedCode ? '▲' : '▼'}</span>
                  </button>
                  {showEmbedCode && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-indigo-600/80 dark:text-indigo-300/80">Paste this code into any website to add Valley Net AI chat:</p>
                      <div className="relative">
                        <pre className="text-[11px] bg-white dark:bg-zinc-950 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all text-zinc-800 dark:text-zinc-200 font-mono select-all">{`<script src="https://mattyjacks.com/embed.js"></script>`}</pre>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('<script src="https://mattyjacks.com/embed.js"></script>');
                            setEmbedCopied(true);
                            setTimeout(() => setEmbedCopied(false), 2000);
                          }}
                          className="absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                          {embedCopied ? '✓ Copied!' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">No authentication needed. Works on any website.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
