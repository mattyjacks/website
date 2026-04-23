"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { TEASER_PHRASES } from "@/lib/valley-net-teasers";

export interface ChatHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
  isFullscreen: boolean;
  setIsFullscreen: (v: boolean) => void;
  setIsOpen: (v: boolean) => void;
  chatMode: 'good' | 'wicked' | 'okay';
  setImageTeaserIndex: (v: number) => void;
  setShowImageModal: (v: boolean) => void;
}

export function ChatHeader({
  isSidebarOpen, setIsSidebarOpen,
  isFullscreen, setIsFullscreen,
  setIsOpen,
  chatMode,
  setImageTeaserIndex, setShowImageModal,
}: ChatHeaderProps) {

  const handleAvatarClick = () => {
    setImageTeaserIndex(Math.floor(Math.random() * TEASER_PHRASES.length));
    setShowImageModal(true);
  };

  return (
    <div className="drag-handle flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 z-20 cursor-move touch-none relative shrink-0">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="text-white/80 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/20"
        aria-label="History"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-start gap-2">
          <button 
            onClick={handleAvatarClick}
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
          <h3 
            onClick={handleAvatarClick}
            className="text-white font-bold tracking-wide text-base whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
          >
            Valley Net <span className="text-[14px]">💘</span>
          </h3>
          {chatMode === 'wicked' && (
            <span className="ml-1 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white rounded-md animate-pulse">Wicked</span>
          )}
        </div>
      </div>

      <button onClick={() => setIsFullscreen(!isFullscreen)} className="hidden sm:inline-flex text-white font-bold text-[10px] uppercase tracking-widest bg-white/10 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-md transition-colors ml-2 whitespace-nowrap relative z-50">
        {isFullscreen ? "Minimize" : "Fullscreen"}
      </button>
      <button onClick={() => setIsOpen(false)} className="text-white font-bold text-[10px] uppercase tracking-widest bg-white/10 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-md transition-colors ml-1 whitespace-nowrap relative z-50">
        Close Chat
      </button>
    </div>
  );
}
