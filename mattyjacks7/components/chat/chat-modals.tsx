"use client";

import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TEASER_PHRASES } from "@/lib/valley-net-teasers";

export interface ChatModalsProps {
  showAgeWarning: boolean;
  setShowAgeWarning: (v: boolean) => void;
  setChatMode: (v: 'good' | 'wicked' | 'okay') => void;
  setIsGoodTurboMode: (v: boolean) => void;
  showImageModal: boolean;
  setShowImageModal: (v: boolean) => void;
  imageTeaserIndex: number;
  showSumUpConfirm: boolean;
  setShowSumUpConfirm: (v: boolean) => void;
  selectedSumUpSession: string | null;
  summarizeConversation: (id: string) => void;
  setShowSumUpMenu: (v: boolean) => void;
  showTeaser: boolean;
  setShowTeaser: (v: boolean) => void;
  currentTeaser: string;
  setIsOpen: (v: boolean) => void;
}

export function ChatModals(props: ChatModalsProps) {
  const {
    showAgeWarning, setShowAgeWarning,
    setChatMode, setIsGoodTurboMode,
    showImageModal, setShowImageModal, imageTeaserIndex,
    showSumUpConfirm, setShowSumUpConfirm,
    selectedSumUpSession, summarizeConversation, setShowSumUpMenu,
    showTeaser, setShowTeaser, currentTeaser,
    setIsOpen,
  } = props;

  return (
    <>
      {/* Age Verification Modal */}
      <AnimatePresence>
        {showAgeWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-zinc-900 border border-rose-900/50 max-w-md w-full rounded-3xl p-6 shadow-[0_0_50px_rgba(225,29,72,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-600 via-rose-400 to-rose-600" />
              
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <span className="text-3xl" role="img" aria-label="warning">🔞</span>
                </div>
                
                <h2 className="text-xl font-bold text-white tracking-wide">Age Restricted Area</h2>
                
                <p className="text-sm text-zinc-400 leading-relaxed">
                  This is an uncensored AI model. You must be at least 18 years of age to use Wicked Mode. 
                  By continuing, you acknowledge that you are entering an age-restricted environment.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                  <button
                    onClick={() => setShowAgeWarning(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 transition-colors"
                  >
                    Stay Good
                  </button>
                  <button
                    onClick={() => {
                      setChatMode('wicked');
                      setIsGoodTurboMode(false);
                      setShowAgeWarning(false);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-rose-600 text-white hover:bg-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all"
                  >
                    Confirm Wickedness
                  </button>
                </div>
              </div>
            </motion.div>
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
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
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
                &ldquo;{TEASER_PHRASES[imageTeaserIndex]}&rdquo;
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sum Up Confirmation Dialog */}
      <AnimatePresence>
        {showSumUpConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 max-w-sm mx-4"
            >
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Sum Up Conversation?</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                This will create a markdown summary of the conversation and save it for future reference. The summary will be downloaded automatically.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSumUpConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedSumUpSession) {
                      summarizeConversation(selectedSumUpSession);
                      setShowSumUpConfirm(false);
                      setShowSumUpMenu(false);
                    }
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
                >
                  Sum Up
                </button>
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
