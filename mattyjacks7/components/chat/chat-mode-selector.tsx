import React from "react";

interface ChatModeSelectorProps {
  chatMode: string;
  setChatMode: (mode: 'good' | 'okay' | 'wicked') => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  wickedModel: string;
  setWickedModel: (model: string) => void;
}

export function ChatModeSelector({
  chatMode,
  setChatMode,
  selectedModel,
  setSelectedModel,
  wickedModel,
  setWickedModel,
}: ChatModeSelectorProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          Mode:
          <span className="block text-xs text-emerald-700/70 dark:text-emerald-300/70 font-normal mt-0.5">
            Choose personality mode
          </span>
        </label>
        <select
          value={chatMode}
          onChange={(e) => setChatMode(e.target.value as 'good' | 'okay' | 'wicked')}
          className={`w-full py-2.5 px-3 rounded-lg text-sm font-bold transition-all focus:outline-none focus:ring-2 ${
            chatMode === 'good'
              ? 'bg-emerald-500 text-white focus:ring-emerald-600'
              : chatMode === 'okay'
              ? 'bg-blue-500 text-white focus:ring-blue-600'
              : 'bg-rose-600 text-white focus:ring-rose-700'
          }`}
        >
          <option value="good">Good</option>
          <option value="okay">Okay</option>
          <option value="wicked">Wicked (18+)</option>
        </select>
      </div>

      {chatMode === 'good' ? (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            Model
            <span className="block text-xs text-emerald-700/70 dark:text-emerald-300/70 font-normal mt-0.5">
              Choose AI engine
            </span>
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full text-sm font-semibold bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="gpt-5.4-mini-2026-03-17">GPT-5.4 Mini (primary)</option>
            <option value="gpt-5-mini-2025-08-07">GPT-5 Mini</option>
            <option value="gpt-4o-mini">GPT-4o Mini</option>
          </select>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-rose-700 dark:text-rose-300">
            Wicked Model
            <span className="block text-xs text-rose-700/70 dark:text-rose-300/70 font-normal mt-0.5">
              Uncensored AI via OpenRouter
            </span>
          </label>
          <select
            value={wickedModel}
            onChange={(e) => setWickedModel(e.target.value)}
            className="w-full text-sm font-semibold bg-white dark:bg-zinc-900 border border-rose-300 dark:border-rose-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="random">Random (surprise me)</option>
            <option value="nousresearch/hermes-3-llama-3.1-405b:free">Hermes 3 405B (free)</option>
            <option value="cognitivecomputations/dolphin-mistral-24b-venice-edition:free">Venice Uncensored (free)</option>
            <option value="nousresearch/hermes-4-70b">Hermes 4 70B</option>
            <option value="anthracite-org/magnum-v4-72b">Magnum v4 72B</option>
            <option value="microsoft/wizardlm-2-8x22b">WizardLM 2 8x22B</option>
          </select>
          <div className="p-2.5 rounded-lg bg-rose-50/60 dark:bg-rose-900/20 border border-rose-200/60 dark:border-rose-800/50">
            <p className="text-[11px] text-rose-700 dark:text-rose-300 font-medium leading-relaxed">
              Wicked Mode uses uncensored open-source models. No content filters. No refusals. Use responsibly.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
