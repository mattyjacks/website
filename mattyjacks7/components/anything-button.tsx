"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { MessageSquare, Plus, Trash2, Menu, X, Copy, Check, Bot, User, Send, StopCircle, GripHorizontal, ChevronDown, RotateCcw } from "lucide-react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { TEASER_PHRASES } from "@/lib/valley-net-teasers";
import { ThreeBorderBack, ThreeBorderFront, triggerWobble, setMorphTarget } from "./three-border";
import { Rnd } from "react-rnd";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  error?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}

const GREETING_VARIANTS = [
  "Let's make some money together for the common good of humanity. I'll help you with ANY idea, no matter how wild, naturally as God intended with Artificial Intelligence. What are your orders, boss? \n\n👱🏻‍♀️ **Valley Net** 💘",
  "Ready to make moves, Boss! I'm **Valley Net**, your high-performance AI operator. Give me a strategy to break down or code to write. \n\n👱🏻‍♀️ **Valley Net** 💘",
  "Let's ship something great today! I'm **Valley Net**, capable of writing, planning, debugging, and strategizing. \n\n👱🏻‍♀️ **Valley Net** 💘"
];

const SUGGESTIONS = [
  "Build a React Dashboard",
  "Draft a Cold Email",
  "Explain WebSockets"
];

function getRandomGreeting() {
  return GREETING_VARIANTS[Math.floor(Math.random() * GREETING_VARIANTS.length)];
}

function generateId() {
  const timestamp = Date.now().toString(36);
  const randomPart = crypto.getRandomValues(new Uint8Array(6)).reduce((acc, byte) => acc + byte.toString(36), '');
  return `${timestamp}-${randomPart}`;
}

function formatSmartTime(timestamp: number) {
  const d = new Date(timestamp);
  const now = new Date();
  const isToday = d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return isToday ? `Today, ${timeStr}` : `${d.toLocaleDateString()} ${timeStr}`;
}

function CodeBlock({ node, inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");
  // Local state hook workaround inside component
  const [copied, setCopied] = useState(false);

  if (inline) {
    return (
      <code className="bg-zinc-200/60 dark:bg-zinc-800/80 rounded-[4px] px-1.5 py-0.5 text-[0.85em] font-mono text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm" {...props}>
        {children}
      </code>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden shadow-2xl border border-zinc-300 dark:border-zinc-700 bg-[#0d1117] group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">{match ? match[1] : "Code"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Copy Code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="text-[10px] uppercase font-bold tracking-wider">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed custom-scrollbar">
        <code className={className}>{children}</code>
      </div>
    </div>
  );
}

function MessageBubble({ message, onCopy }: { message: ChatMessage; onCopy: (text: string) => void }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const copyItem = () => {
    onCopy(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      layout
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} group mb-5`}
    >
      <div className={`flex w-full gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-[95%] sm:max-w-[85%]`}>
        <div className="relative group/bubble flex flex-col min-w-0 max-w-full">
          <div
            className={`px-4 py-3 sm:px-5 sm:py-4 text-[15px] leading-[1.6] overflow-hidden break-words transition-all shadow-sm ${
              isUser
                ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl rounded-tr-sm shadow-emerald-600/20"
                : message.error
                  ? "bg-white text-sky-900 rounded-2xl rounded-tl-sm border border-sky-200 shadow-sky-900/5"
                  : "bg-white text-zinc-900 rounded-2xl rounded-tl-sm border border-zinc-200 shadow-black/5"
            }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock,
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" className={`hover:underline underline-offset-4 decoration-2 font-bold transition-all ${isUser ? "text-emerald-100 hover:text-white decoration-emerald-200" : "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 decoration-emerald-500/30 hover:decoration-emerald-500"}`} />
                ),
                p: ({ children }) => <p className="mb-4 last:mb-0 font-medium">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-outside ml-6 mb-4 space-y-1.5 marker:text-emerald-500">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-1.5 marker:text-emerald-500 font-bold">{children}</ol>,
                li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
                strong: ({ children }) => <strong className={`font-black ${isUser ? "text-white" : "text-zinc-900 dark:text-white"}`}>{children}</strong>,
                h1: ({ children }) => <h1 className={`text-2xl font-black mb-4 mt-6 ${isUser ? "" : "text-zinc-900 dark:text-white"} tracking-tight`}>{children}</h1>,
                h2: ({ children }) => <h2 className={`text-xl font-bold mb-3 mt-5 pb-1 border-b ${isUser ? "border-emerald-500/30" : "border-zinc-200 dark:border-zinc-800"} tracking-tight`}>{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 tracking-tight">{children}</h3>,
                blockquote: ({ children }) => <blockquote className={`border-l-4 pl-4 italic py-2 pr-4 rounded-r-xl my-4 ${isUser ? "border-emerald-300 bg-emerald-700/50 text-emerald-50" : "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-zinc-600 dark:text-zinc-400"}`}>{children}</blockquote>,
                table: ({ children }) => <div className="overflow-x-auto my-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm"><table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm whitespace-nowrap">{children}</table></div>,
                thead: ({ children }) => <thead className={isUser ? "bg-emerald-700/50" : "bg-zinc-50 dark:bg-zinc-900"}>{children}</thead>,
                th: ({ children }) => <th className="px-4 py-3 text-left font-bold tracking-wider">{children}</th>,
                td: ({ children }) => <td className={`px-4 py-3 font-medium border-t ${isUser ? "border-emerald-500/30" : "border-zinc-200 dark:border-zinc-800"} whitespace-normal`}>{children}</td>
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          <div className={`flex items-center gap-3 mt-2 text-[11px] font-bold tracking-wide opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300 ${isUser ? "justify-end text-emerald-600 dark:text-emerald-400 mr-2" : "justify-start text-zinc-500 ml-2"}`}>
            <span>{formatSmartTime(message.timestamp)}</span>
            {!message.error && (
              <button
                onClick={copyItem}
                className="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors uppercase"
                title="Copy message"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
            {message.error && (
              <span className="flex items-center gap-1 text-sky-600 uppercase">
                <RotateCcw className="w-3.5 h-3.5" /> Failed
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AnythingButton() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const [showTeaser, setShowTeaser] = useState(false);
  const [currentTeaser, setCurrentTeaser] = useState("");
  const [threeSize, setThreeSize] = useState(140);
  const [chatBounds, setChatBounds] = useState<{x:number;y:number;width:number;height:number} | null>(null);
  const [chatReady, setChatReady] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageTeaserIndex, setImageTeaserIndex] = useState(0);

  useEffect(() => {
    const calcThreeSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const base = Math.min(vw, vh);
      // Smaller footprint: favor lower-right corner
      return vw < 640 ? Math.max(110, Math.min(base * 0.30, 200)) : Math.max(120, Math.min(base * 0.25, 220));
    };
    setThreeSize(calcThreeSize());
    const handleResize = () => setThreeSize(calcThreeSize());
    window.addEventListener('resize', handleResize);

    // Calculate chat window bounds once on the client
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;
    // Give more breathing room on desktop (wider and taller) while keeping margins
    const horizontalMargin = isMobile ? 10 : 16;
    const verticalMargin = isMobile ? 10 : 12;
    const w = isMobile ? vw - horizontalMargin * 2 : Math.min(520, vw - horizontalMargin * 2);
    const h = isMobile ? vh - verticalMargin * 2 : Math.min(Math.floor(vh * 0.92), vh - verticalMargin * 2);
    const x = isMobile ? horizontalMargin : Math.max(horizontalMargin, vw - w - horizontalMargin);
    const y = isMobile ? verticalMargin : Math.max(verticalMargin, vh - h - verticalMargin);
    setChatBounds({ x, y, width: w, height: h });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    triggerWobble();
    if (isOpen) {
      setMorphTarget(1);
      // Delay showing the chat window so the morph animation plays
      const timer = setTimeout(() => setChatReady(true), 600);
      // Lock background scroll while chat is open
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      setMorphTarget(0);
      setChatReady(false);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      // Cleanup overflow lock on unmount
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!showImageModal) return;
    const interval = setInterval(() => {
      setImageTeaserIndex((prev) => (prev + 1) % TEASER_PHRASES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [showImageModal]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const STORAGE_KEY = "valley_net_chat_sessions";

  const scrollToBottom = useCallback((smooth = true) => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ChatSession[] = JSON.parse(stored);
        setSessions(parsed);
        if (parsed.length > 0) setCurrentSessionId(parsed[0].id);
      } else {
        createNewSession();
      }
    } catch {
      createNewSession();
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
    setShowScrollBottom(!isAtBottom && messages.length > 4);
  };

  const createNewSession = () => {
    const newId = generateId();
    const newSession: ChatSession = {
      id: newId,
      title: "New Conversation",
      messages: [{ id: generateId(), role: "assistant", content: getRandomGreeting(), timestamp: Date.now() }],
      updatedAt: Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setIsSidebarOpen(false);
    setError(null);
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      if (currentSessionId === id) setCurrentSessionId(next.length > 0 ? next[0].id : null);
      if (next.length === 0) setTimeout(() => createNewSession(), 0);
      return next;
    });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      scrollToBottom(false);
    }
  }, [isOpen, currentSessionId, scrollToBottom]);

  const copyToClipboard = useCallback((text: string, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const updateCurrentSession = (updatedMessages: ChatMessage[], newTitle?: string) => {
    setSessions((prev) => prev.map((s) => s.id === currentSessionId ? { ...s, messages: updatedMessages, title: newTitle || s.title, updatedAt: Date.now() } : s));
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const sendMessage = useCallback(async (textOverride?: string) => {
    const textToSend = (textOverride || input).trim();
    if (!textToSend || isLoading || !currentSessionId) return;

    setError(null);
    const userMessageId = generateId();
    const userMessage: ChatMessage = { id: userMessageId, role: "user", content: textToSend, timestamp: Date.now() };

    const newMessages = [...messages, userMessage];
    const isFirstUserMsg = messages.filter(m => m.role === "user").length === 0;
    const newTitle = isFirstUserMsg ? textToSend.slice(0, 30) + (textToSend.length > 30 ? "..." : "") : undefined;

    updateCurrentSession(newMessages, newTitle);
    if (!textOverride) {
      setInput("");
      setCharCount(0);
      if (inputRef.current) inputRef.current.style.height = 'auto'; // Reset height
    }
    
    setIsLoading(true);
    setTimeout(() => scrollToBottom(), 50);

    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content.slice(0, 5000) })) }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || `Request failed (${res.status})`);
      const data = await res.json();
      
      updateCurrentSession([...newMessages, { id: generateId(), role: "assistant", content: data.message, timestamp: Date.now() }]);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        updateCurrentSession([...newMessages, { id: generateId(), role: "assistant", content: "Generation stopped manually.", timestamp: Date.now() }]);
      } else {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong. Let's retry that.";
        setError(errorMessage);
        updateCurrentSession([...newMessages, { id: generateId(), role: "assistant", content: errorMessage, timestamp: Date.now(), error: true }]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      setTimeout(() => scrollToBottom(), 50);
    }
  }, [input, isLoading, messages, currentSessionId, scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setCharCount(e.target.value.length);
    setError(null);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <>
      {/* Floating launcher with torus border */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-none flex items-center justify-center" style={{ zIndex: 50, width: threeSize, height: threeSize }}>
        <div className="relative flex items-center justify-center w-full h-full">
          <ThreeBorderBack size={threeSize} />
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 focus:outline-none outline-none pointer-events-auto cursor-pointer"
            aria-label="Toggle Valley Net AI Chat"
            style={{ zIndex: 5, width: threeSize * 0.6, height: threeSize * 0.6 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <ChevronDown className="w-10 h-10 flex-shrink-0" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="flex items-center justify-center w-full h-full relative p-[3px]">
                  <Image 
                    src="/images/valley%20net%20512%20face%20mattyjacks%202023-2026%20blonde%20lady%20girl%20red%20eyes%20ai%20generated%20edited.png"
                    alt="Valley Net"
                    fill
                    className="rounded-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {!isOpen && <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping" />}
          </motion.button>
          <ThreeBorderFront size={threeSize} />
        </div>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && chatBounds && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', left: chatBounds.x, top: chatBounds.y, width: chatBounds.width, height: chatBounds.height, zIndex: 60 }}
            className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Header */}
            <div className="drag-handle flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 z-20 cursor-move touch-none relative shrink-0 select-none">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white/80 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/20"
                aria-label="History"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-center gap-2">
                  <button 
                    onClick={() => {
                      setImageTeaserIndex(Math.floor(Math.random() * TEASER_PHRASES.length));
                      setShowImageModal(true);
                    }}
                    className="w-7 h-7 relative shrink-0 rounded-[6px] overflow-hidden shadow-sm border border-black/10 hover:scale-110 hover:shadow-md transition-all pointer-events-auto cursor-pointer"
                    aria-label="View Valley Net v23.2"
                  >
                    <Image 
                      src="/images/valley%20net%20512%20face%20mattyjacks%202023-2026%20blonde%20lady%20girl%20red%20eyes%20ai%20generated%20edited.png"
                      alt="Valley Net"
                      fill
                      className="object-cover"
                    />
                  </button>
                  <h3 className="text-white font-bold tracking-wide text-base whitespace-nowrap">Valley Net <span className="text-[14px]">💘</span></h3>
                </div>
              </div>

              <div className="hidden sm:flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-50 border border-emerald-400/30">
                Online
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white font-bold text-[10px] uppercase tracking-widest bg-white/10 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-md transition-colors ml-1 whitespace-nowrap relative z-50">
                Close Chat
              </button>
            </div>

            {/* Sidebar */}
            <div className={`absolute top-[60px] bottom-0 left-0 w-[280px] bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-200 dark:border-white/10 z-30 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full opacity-0'}`}>
              <div className="p-4 border-b border-zinc-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-black/20">
                <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">Chat History</h4>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-3">
                <button onClick={createNewSession} className="flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold shadow-sm hover:scale-[1.02] transition-transform">
                  <Plus className="w-4 h-4" /> New Session
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {sessions.map((session) => (
                  <div key={session.id} onClick={() => { setCurrentSessionId(session.id); setIsSidebarOpen(false); }} className={`group flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer text-sm transition-all ${currentSessionId === session.id ? "bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-transparent font-medium"}`}>
                    <div className="flex items-center gap-3 truncate">
                      <MessageSquare className={`w-4 h-4 flex-shrink-0 ${currentSessionId === session.id ? 'text-emerald-500' : 'opacity-60'}`} />
                      <span className="truncate">{session.title}</span>
                    </div>
                    <button onClick={(e) => deleteSession(e, session.id)} className="opacity-0 group-hover:opacity-100 hover:text-sky-600 transition-opacity p-1 bg-zinc-200/50 dark:bg-zinc-800 rounded-md" title="Delete Session">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollAreaRef}
              onScroll={handleScroll}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto px-4 sm:px-5 py-6 space-y-2 bg-zinc-50/50 dark:bg-zinc-950/30 custom-scrollbar scroll-smooth relative"
              onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
            >
              {messages.length === 1 && messages[0].role === "assistant" && (
                <div className="mb-8 mt-2 animation-fade-in flex flex-col items-center justify-center pt-8 pb-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 shadow-inner">
                    <Bot className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight text-center">How can I help you today?</h3>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {SUGGESTIONS.map(s => (
                      <button key={s} onClick={() => sendMessage(s)} className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onCopy={(text) => copyToClipboard(text, msg.id)} />
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start mb-4 gap-3 max-w-[90%]">
                  <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-2">
                    <div className="flex space-x-1.5">
                      <motion.div className="w-2 h-2 rounded-full bg-emerald-500" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                      <motion.div className="w-2 h-2 rounded-full bg-emerald-500" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                      <motion.div className="w-2 h-2 rounded-full bg-emerald-500" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Scroll to bottom */}
            <AnimatePresence>
              {showScrollBottom && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => scrollToBottom()} className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 bg-zinc-900/90 dark:bg-white/90 text-white dark:text-black border border-white/10 dark:border-black/10 rounded-full p-2.5 shadow-xl backdrop-blur-md">
                  <ChevronDown className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-4 border-t border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl shrink-0 z-20">
              <div className="relative flex items-end gap-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 focus-within:border-emerald-500 dark:focus-within:border-emerald-500/50 rounded-2xl shadow-sm transition-colors p-1 pl-3 pr-1.5">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  disabled={isLoading}
                  className="w-full resize-none py-3.5 bg-transparent text-[15px] font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder-text-zinc-600 focus:outline-none custom-scrollbar"
                  style={{ maxHeight: "200px" }}
                />
                <div className="flex gap-1 pb-1.5 pl-1 shrink-0">
                  {isLoading ? (
                    <button
                      onClick={stopGeneration}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 transition-colors"
                      title="Stop generating"
                    >
                      <StopCircle className="w-5 h-5 fill-current" />
                    </button>
                  ) : (
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim()}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white disabled:opacity-50 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 transition-colors group focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      title="Send message (Enter to send, Shift+Enter for new line)"
                    >
                      <Send className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 px-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                  {isLoading ? "Thinking..." : "Ready"}
                </span>
                <div className="flex items-center gap-2">
                  {charCount > 4000 && (
                    <div className="w-16 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <div className={`h-full ${charCount > 4800 ? 'bg-sky-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((charCount / 5000) * 100, 100)}%` }} />
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-zinc-400 tracking-wider">
                    Powered by Valley Net
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-size image modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowImageModal(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-full"
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-10 right-0 text-white hover:text-zinc-300 transition-colors p-2 z-50"
                aria-label="Close image"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full max-w-screen max-h-[90vh]">
                <Image
                  src="/images/valley%20net%20v23.2%20mattyjacks%202023-2026%20blonde%20lady%20girl%20red%20eyes%20ai%20generated%20edited.png"
                  alt="Valley Net v23.2"
                  width={1024}
                  height={1024}
                  className="w-full h-auto max-h-[90vh] object-contain"
                  priority
                />
              </div>
              <div className="mt-4 text-center text-white text-sm sm:text-base font-semibold italic drop-shadow-lg px-4">
                “{TEASER_PHRASES[imageTeaserIndex]}”
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teaser popup */}
      <AnimatePresence>
        {showTeaser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[130px] right-6 sm:right-10 z-[70] w-[320px] max-w-[90vw] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-emerald-200 dark:border-emerald-900 shadow-sm">
                <Image src="/images/valley%20net%20512%20face%20mattyjacks%202023-2026%20blonde%20lady%20girl%20red%20eyes%20ai%20generated%20edited.png" alt="Valley Net" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Valley Net 💘</h4>
                  <button onClick={() => setShowTeaser(false)} className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200" aria-label="Close teaser">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed whitespace-pre-line">{currentTeaser}</p>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={() => {
                  setShowTeaser(false);
                  setIsOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white text-sm font-bold py-2.5 shadow-sm hover:bg-emerald-700 transition-colors"
              >
                Open Chat <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
