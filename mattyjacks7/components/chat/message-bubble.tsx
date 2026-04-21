"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCcw, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage } from "./types";

function formatSmartTime(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function CodeBlock({ node, inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");
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

export function MessageBubble({ message, onCopy }: { message: ChatMessage; onCopy: (text: string) => void }) {
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
      layout={!message.content.endsWith('▍')}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} group mb-5`}
    >
      <div className={`flex w-full gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-[95%] sm:max-w-[85%]`}>
        <div className="relative group/bubble flex flex-col min-w-0 max-w-full gap-2">
          {message.images && message.images.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
              {message.images.map((img) => {
                const isImageFile = img.mimeType?.startsWith("image/") ?? true;
                return (
                  <div key={img.fileName} className="relative group/img rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-800 shadow-sm max-w-[200px] flex bg-zinc-50 dark:bg-zinc-800/50">
                    {isImageFile ? (
                      <img
                        src={img.base64}
                        alt={img.fileName}
                        className="w-full h-auto rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 min-w-[120px] text-zinc-500 dark:text-zinc-600">
                        <FileText className="w-10 h-10 mb-2 opacity-80" />
                        <span className="text-[10px] font-bold truncate max-w-full px-2 text-center">{img.fileName}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div
            style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
            className={`px-4 py-3 sm:px-5 sm:py-4 text-[15px] leading-[1.6] overflow-hidden break-words transition-all shadow-sm select-text cursor-text ${
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
                strong: ({ children }) => <strong className="font-black text-current">{children}</strong>,
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
