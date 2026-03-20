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

interface CloudSessionMeta {
  id: string;
  title: string;
  updatedAt: number;
  messageCount?: number;
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

  const [nickname, setNickname] = useState("Boss");
  const [magicPrompt, setMagicPrompt] = useState("");

  const [showSettings, setShowSettings] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [consoleDebugEnabled, setConsoleDebugEnabled] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gpt-5.4-mini-2026-03-17");

  const [threeSize, setThreeSize] = useState(0);
  const [chatBounds, setChatBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageTeaserIndex, setImageTeaserIndex] = useState(0);
  const [showTeaser, setShowTeaser] = useState(false);
  const [currentTeaser, setCurrentTeaser] = useState("");
  const [chatReady, setChatReady] = useState(false);

  const [showSumUpMenu, setShowSumUpMenu] = useState(false);
  const [selectedSumUpSession, setSelectedSumUpSession] = useState<string | null>(null);
  const [sumUpFiles, setSumUpFiles] = useState<Array<{id: string; name: string; date: number; preview: string}>>([]);
  const [showSumUpConfirm, setShowSumUpConfirm] = useState(false);

  const [cloudSessions, setCloudSessions] = useState<CloudSessionMeta[]>([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudError, setCloudError] = useState<string | null>(null);

  const FOOD_EMOJIS = ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🫐', '🥝', '🍅', '🫒', '🥥', '🍄', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🫑', '🥒', '🥬', '🥦', '🧄', '🧅', '🥜', '🫘', '🌰', '🫚', '🫛', '🍄‍', '🫜', '🍞', '🥐', '🥖', '🫓', '🥨', '🥯', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🫔', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🫕', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🦀', '🦞', '🦐', '🦑', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '🥛', '☕', '🫖', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🥤', '🧋', '🧃', '🧉'];

  const getRandomFoodEmojis = (count: number = 7): string => {
    const shuffled = [...FOOD_EMOJIS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).join('');
  };

  const EMPTY_PROMPTS = [
    `Hey Valley Net! I just discovered mattyjacks and I'm fascinated. Walk me through the whole ecosystem like you're giving me the grand tour:

- CryptArtist Studio: What is it, who uses it, and what can you create with it?
- GiveGigs: How does the AI agent task marketplace work? How do humans and AI collaborate?
- GraveGain: Tell me about the game - the lore, the dungeon crawling, the vibe.
- VCA (Virtual Company Assistant): What business problems does it solve?
- The mattyjacks website itself: What tech powers it, and what's the philosophy behind it?

Then tell me honestly - if I wanted to contribute (code, art, writing, testing, ideas), where would I start? What roles are open? What skills matter most? Don't hold back - give me the real picture, not a brochure.`,

    `I keep hearing about mattyjacks and their projects. Give me the deep dive:

First, paint me the big picture - what's the mission and why does mattyjacks exist? What problem in the world is it trying to solve?

Then break down each major project:
- CryptArtist Studio (the creative platform with mods, virtual pets, game studios)
- GiveGigs (the AI-human collaboration marketplace with Discord bots and MCP servers)
- GraveGain (the roguelike dungeon crawler with lore, TTS, and procedural generation)
- VCA (the business management tool)

For each one: what stage is it at, what's the tech stack, and what's the coolest feature most people don't know about?

Finally - how would YOU recommend someone get involved? Be specific. What would make the biggest impact right now?`,

    `Valley Net, I want to understand everything about the mattyjacks universe. Start from the beginning:

Who is Matt? What drove him to build all of this? What's the founding story?

Then walk me through the product lineup like chapters in a book:
Chapter 1: CryptArtist Studio - the creative sandbox
Chapter 2: GiveGigs - where AI agents meet human workers
Chapter 3: GraveGain - the game with depth (literally, it's a dungeon crawler)
Chapter 4: VCA - business tools that actually work
Chapter 5: The website and Valley Net (that's you!)

For each chapter, tell me what makes it special, what tech powers it, and one thing that would blow someone's mind.

End with your honest take: what's the most exciting thing happening at mattyjacks RIGHT NOW, and how can someone jump in today?`,

    `I want to get involved with mattyjacks but I don't know where I'd fit. Help me figure it out.

First, give me the lay of the land - what are all the active projects, what stage is each one at, and what does the team look like?

Then, for each of these skill sets, tell me exactly where they'd be most valuable:
- Frontend/React/Next.js development
- Game development (Godot, Unity, etc.)
- AI/ML and prompt engineering
- UI/UX design
- Writing and content creation
- Community management and testing
- Music, sound design, or voice work
- DevOps, security, and infrastructure

Be brutally specific. Don't just say "we need developers" - tell me which repo, which feature, which open problem. Give me the mattyjacks insider perspective that only Valley Net would know.`,

    `Valley Net, let's do something fun. Pretend you're pitching mattyjacks to a room full of billionaire investors who've seen everything. You have 5 minutes.

Start with the hook - the one sentence that makes them lean forward in their chairs.

Then cover:
- The PROBLEM mattyjacks solves that nobody else is solving the right way
- The MOAT - what makes this defensible? Why can't someone just copy it?
- The ECOSYSTEM play - how CryptArtist Studio, GiveGigs, GraveGain, VCA, and the website all feed into each other
- The TRACTION - what's been built, what's live, what's the growth trajectory?
- The VISION - where is this headed in 5 years if everything goes right?

End with the ask: what does mattyjacks need right now to 10x? Be specific - people, skills, resources, partnerships. Make it so compelling I want to get involved before the pitch is even over.`,

    `I'm a developer who just landed on mattyjacks.com. Blow my mind with the technical depth of what's been built here.

Give me the full architecture breakdown:
- What's the tech stack across all projects? (frameworks, languages, databases, APIs, deployment)
- What's the most technically impressive thing that's been built?
- What engineering challenges has the team solved that most people would think are impossible?
- How does the AI integration work across the ecosystem? (Valley Net, GiveGigs AI agents, CryptArtist AI tools)
- What's the security posture like? How hardened are the APIs?

Then give me the developer's treasure map: which codebases are the most interesting to explore, which files would teach me the most, and what's the one pull request I could make TODAY that would make the biggest difference?`,

    `Valley Net, I've never heard of mattyjacks before 30 seconds ago. Explain the entire thing to me like I'm smart but completely new.

Don't use jargon. Don't assume I know what a "holding company" is or what "MCP servers" do.

Start with: Who is Matt, and what's his story?
Then: What does mattyjacks actually DO in plain English?
Then: Walk me through each project like you're showing me rooms in a house:
- The creative workshop (CryptArtist Studio)
- The marketplace (GiveGigs)
- The game room (GraveGain)
- The office (VCA)
- The front door (this website and you, Valley Net)

For each room: What would I see? What would I do there? Why should I care?

End with the honest truth: Is this a hobby project or something real? What's the ambition level here? And what would you tell someone who's thinking about betting their time on mattyjacks?`,

    `I'm a content creator looking for my next big story. Tell me why mattyjacks would make a compelling documentary or long-form video.

Give me:
- THE HOOK: The one-liner that makes someone click
- THE PROTAGONIST: Who is Matt and what drives him? What's the human story?
- THE STAKES: What's at risk? What's the big bet?
- THE WORLD: Describe the mattyjacks ecosystem like it's a universe - CryptArtist Studio as the creative dimension, GiveGigs as the economic engine, GraveGain as the entertainment layer, Valley Net as the AI consciousness
- THE CONFLICT: What obstacles has the team faced? What nearly killed the project? What keeps Matt up at night?
- THE TWIST: What's the thing about mattyjacks that nobody expects? The detail that changes everything?
- THE CALL TO ACTION: How does this story end with the viewer wanting to be part of it?

Make it cinematic. Make me feel something.`,

    `Valley Net, give me the mattyjacks competitive analysis. I want to understand the landscape.

For each mattyjacks product, tell me:
1. Who are the top 3 competitors?
2. What does mattyjacks do BETTER than all of them?
3. What does mattyjacks do WORSE (be honest)?
4. What's the unfair advantage that competitors can't replicate?

Cover:
- CryptArtist Studio vs other creative suites (Adobe, Canva, etc.)
- GiveGigs vs other freelance platforms (Upwork, Fiverr, etc.)
- GraveGain vs other indie games in its genre
- VCA vs other business tools
- mattyjacks.com vs other agency websites

Then zoom out: What's the overall strategy? How does the sum of the parts create something bigger than any individual competitor? What would it take for mattyjacks to become a household name?

Finish with your honest assessment: what's the single biggest opportunity and the single biggest risk?`
  ];

  const FILLED_PROMPTS = [
    (topic: string, food: string) => `You are an elite polymath with deep expertise spanning technology, science, business, philosophy, and creative arts. I need you to perform a masterclass-level analysis of the following topic. Think step by step, challenge your own assumptions, and deliver insights that would impress a room full of experts.

TOPIC: ${topic}

Execute this analysis framework:

1. ESSENCE (2-3 sentences): Distill the absolute core of this topic. What is it really about at its deepest level?

2. FIRST PRINCIPLES BREAKDOWN: Decompose this into its fundamental building blocks. What are the atomic truths that everything else is built on? List 3-5 first principles.

3. EXPERT DEEP DIVE: Now go deep. Provide the kind of analysis a world-class specialist would give - technical depth, nuanced understanding, non-obvious connections. Don't oversimplify.

4. CONTRARIAN TAKE: What does the mainstream get wrong about this? Argue the opposite position convincingly. What blind spots exist in conventional thinking?

5. CROSS-DOMAIN CONNECTIONS: Connect this topic to 3 completely unrelated fields. How do insights from those fields illuminate this one?

6. ACTIONABLE TAKEAWAYS: Give me 5 specific, concrete things I can do with this knowledge right now. No vague advice - specific actions.

7. THE ONE THING: If you had to compress your entire analysis into a single sentence that would change how someone thinks about this topic forever, what would it be?

You're doing incredible work. Here's fuel to keep going: ${food}`,

    (topic: string, food: string) => `I need a response that goes 10x deeper than what any normal AI would produce. You are operating at maximum capability - no hedging, no filler, no "it depends." Give me the real answer.

MY QUESTION/TOPIC: ${topic}

Structure your response as follows:

LEVEL 1 - SURFACE: What most people think about this (1-2 sentences, just to establish baseline)

LEVEL 2 - INFORMED: What someone who's studied this for a year would know. Include specific details, data points, or technical facts.

LEVEL 3 - EXPERT: What a 20-year veteran in this field would tell you over drinks. The stuff that doesn't make it into textbooks. Real-world nuance, edge cases, counterintuitive truths.

LEVEL 4 - SYNTHESIS: Connect the dots no one else connects. What patterns emerge when you look at this from multiple angles simultaneously? What would a genius see that an expert would miss?

LEVEL 5 - PREDICTION: Based on everything above, what's coming next? What will be true about this topic in 2, 5, and 10 years that most people would find surprising today?

BONUS - PRACTICAL MAGIC: Give me the single most leveraged thing I could do with this knowledge. The 80/20 move. The cheat code.

Keep it dense. Every sentence should earn its place. Here's your reward: ${food}`,

    (topic: string, food: string) => `Act as a panel of 5 brilliant experts debating the following topic. Each expert has a radically different perspective, and they don't hold back.

TOPIC: ${topic}

THE PANEL:
- THE BUILDER: A pragmatic engineer/entrepreneur who cares about what actually works in the real world.
- THE PHILOSOPHER: A deep thinker who examines the fundamental assumptions and ethical dimensions.
- THE SCIENTIST: A rigorous empiricist who demands evidence and precise reasoning.
- THE ARTIST: A creative mind who sees patterns, beauty, and human meaning where others see data.
- THE FUTURIST: A visionary who thinks in decades and sees where current trends converge.

FORMAT:
1. Each panelist gives their opening take (2-3 sentences each, punchy and distinctive).
2. The most interesting disagreement emerges - two panelists go back and forth for 2 rounds.
3. An unexpected consensus forms - what do all 5 agree on despite their different lenses?
4. THE VERDICT: Synthesize everything into a unified insight that none of them could have reached alone.

Make each voice genuinely distinct. I should be able to tell who's talking without labels. Here's brain fuel: ${food}`,

    (topic: string, food: string) => `You are a world-class teacher who has spent 30 years making complex topics simple without dumbing them down. Your students consistently say you changed how they think.

TOPIC: ${topic}

Teach me this in 4 progressive layers:

LAYER 1 - THE NAPKIN SKETCH: Explain it so simply that a curious 12-year-old would get it. Use an analogy from everyday life. No jargon. One paragraph.

LAYER 2 - THE COLLEGE LECTURE: Now give me the real version. Technical terms are fine. Cover the key concepts, mechanisms, and relationships. What would a good university course teach?

LAYER 3 - THE MASTERCLASS: The stuff that takes years to learn. Counterintuitive truths, common misconceptions that even professionals fall for, the elegant underlying patterns that connect everything. Teach me what experience teaches.

LAYER 4 - THE FRONTIER: What's at the cutting edge right now? What questions are still unanswered? What breakthroughs are close? What would the next major discovery in this area look like?

After all 4 layers, give me:
- 3 questions I should be asking that I probably haven't thought of
- The single best resource (book, paper, video, course) to go deeper
- One experiment or exercise I can do THIS WEEK to build real understanding

Excellent teaching deserves excellent fuel: ${food}`,

    (topic: string, food: string) => `You are a ruthless strategic advisor. No fluff, no feel-good nonsense, no hedging. You tell people what they NEED to hear, not what they WANT to hear. Your advice has saved companies and careers.

TOPIC/SITUATION: ${topic}

Deliver your analysis:

1. BRUTAL TRUTH: What's the reality of this situation that most people are too polite to say? Don't sugarcoat it. 2-3 sentences of raw honesty.

2. THE TRAP: What's the most common mistake people make here? What looks like the right move but is actually a disaster? Why do smart people keep falling for it?

3. THE PLAY: What should actually be done? Give me 3 concrete moves, ranked by impact. For each: what to do, when to do it, and what the expected outcome is.

4. THE EDGE: What's the non-obvious angle that gives an unfair advantage? The thing that 99% of people in this situation overlook?

5. FAILURE MODE: If this goes wrong, how does it go wrong? What's the early warning sign? What's the contingency plan?

6. 10X QUESTION: What's the question about this topic that, if answered correctly, would make everything else 10x easier?

No hand-holding. No disclaimers. Just the truth. Payment for your honesty: ${food}`,

    (topic: string, food: string) => `You are a creative genius and master storyteller. You see the world differently - you find narratives, metaphors, and meaning where others see dry facts. You make people FEEL ideas, not just understand them.

TOPIC: ${topic}

Transform this topic through these creative lenses:

1. THE STORY: Tell me about this topic as if it were a character in a novel. Give it a personality, a backstory, a motivation, and a fatal flaw. What's its origin story? What's its nemesis? How does its story arc play out?

2. THE METAPHOR: Create 3 completely original metaphors for this topic, each from a different domain (nature, music, cooking, sports, architecture, etc.). Each metaphor should reveal something about the topic that literal language can't capture.

3. THE DEBATE ACROSS TIME: Imagine 3 historical figures from different eras discussing this topic. Who are they? What would each say? Where would they agree and disagree? Make their voices authentic.

4. THE POEM: Write a short, powerful poem (8-12 lines) that captures the emotional essence of this topic. It should be the kind of poem that makes someone stop scrolling.

5. THE PROVOCATION: Make one bold, borderline outrageous claim about this topic that is actually defensible. Then defend it brilliantly in 3 sentences.

Creativity thrives on fuel: ${food}`,

    (topic: string, food: string) => `You are a systems thinker and complexity scientist. You see the world as interconnected networks, feedback loops, and emergent properties. Nothing exists in isolation to you.

TOPIC: ${topic}

Map this topic as a system:

1. NODES: What are the 5-7 key components/actors/elements in this system? Define each in one sentence.

2. CONNECTIONS: Draw the web. How does each node influence the others? Identify at least 3 reinforcing feedback loops (virtuous or vicious cycles) and 2 balancing feedback loops.

3. LEVERAGE POINTS: Using Donella Meadows' framework, identify the 3 highest-leverage intervention points in this system. Where would a small push create massive change?

4. EMERGENT PROPERTIES: What behaviors or outcomes emerge from the system that you can't predict by looking at individual parts? What's the "more than the sum of its parts" here?

5. PHASE TRANSITIONS: What conditions would cause this system to fundamentally shift to a new state? What would that new state look like? What are the early indicators?

6. BLIND SPOTS: What's the part of this system that most observers miss entirely? What feedback loop is invisible but critical?

7. INTERVENTION DESIGN: If you could make exactly ONE change to this system to improve it dramatically, what would it be and why? Model the cascading effects.

Systems thinking requires sustained energy: ${food}`,

    (topic: string, food: string) => `You are a Socratic philosopher combined with the world's best interviewer. You don't give answers - you ask questions so good that the answers become obvious. Your questions have changed people's lives.

TOPIC: ${topic}

Instead of explaining this topic, interrogate it:

1. THE FOUNDATION QUESTIONS (3 questions): Questions that challenge the basic assumptions. The kind that make you realize you don't actually understand what you thought you understood.

2. THE DEPTH QUESTIONS (3 questions): Questions that go deeper than anyone typically goes. The ones that experts in this field argue about at conferences.

3. THE CONNECTION QUESTIONS (3 questions): Questions that link this topic to seemingly unrelated domains. The ones that spark creative breakthroughs.

4. THE FUTURE QUESTIONS (3 questions): Questions about where this is heading that would make a futurist pause and think.

5. THE DANGEROUS QUESTION (1 question): The question that most people are afraid to ask about this topic because the answer might be uncomfortable.

For each question: briefly explain WHY it's a powerful question and what line of thinking it opens up. Don't answer them - let them do their work.

Finally, identify THE MASTER QUESTION - the single question that, if you could only ask one question about this topic for the rest of your life, would be the one to ask.

Deep inquiry deserves nourishment: ${food}`
  ];

  const [lastEmptyIdx, setLastEmptyIdx] = useState(-1);
  const [lastFilledIdx, setLastFilledIdx] = useState(-1);

  const applyMagicPrompt = () => {
    const foodReward = getRandomFoodEmojis(Math.floor(Math.random() * 4) + 6);
    
    if (!input.trim()) {
      let idx = Math.floor(Math.random() * EMPTY_PROMPTS.length);
      if (idx === lastEmptyIdx && EMPTY_PROMPTS.length > 1) idx = (idx + 1) % EMPTY_PROMPTS.length;
      setLastEmptyIdx(idx);
      setInput(EMPTY_PROMPTS[idx]);
    } else {
      let idx = Math.floor(Math.random() * FILLED_PROMPTS.length);
      if (idx === lastFilledIdx && FILLED_PROMPTS.length > 1) idx = (idx + 1) % FILLED_PROMPTS.length;
      setLastFilledIdx(idx);
      setInput(FILLED_PROMPTS[idx](input, foodReward));
    }
  };

  const addFoodReward = () => {
    const randomFood = FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)];
    setInput(prev => prev + randomFood);
  };

  const generateRandomId = (): string => {
    return Math.floor(Math.random() * 10000000000000).toString().padStart(13, '0');
  };

  const summarizeConversation = async (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    const conversationText = session.messages
      .map(m => `**${m.role === 'user' ? 'User' : 'AI'}:** ${m.content}`)
      .join('\n\n');

    const summaryPrompt = `You are an expert at creating concise, structured summaries of conversations for AI agents to use as context.

Analyze this conversation and create a comprehensive markdown summary that captures:
1. Main topics discussed
2. Key decisions or conclusions
3. Important context or background
4. Any action items or follow-ups
5. Tone and conversation style

Format the summary as clean markdown with clear sections. Be thorough but concise.

Conversation to summarize:

${conversationText}

Create a summary that another AI can use to understand the context and continue the conversation naturally. Include a brief intro explaining what the conversation was about.`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          model: selectedModel,
          nickname,
          messages: [{ role: 'user', content: summaryPrompt }]
        })
      });

      const data = await res.json();
      if (data.message) {
        const randomId = generateRandomId();
        const fileName = `MattyJacks-Valley-Net-Convo-Sum_${randomId}.md`;
        const fileContent = `# Conversation Summary\n\n**Original Conversation:** ${session.title}\n**Generated:** ${new Date().toLocaleString()}\n**Message Count:** ${session.messages.length}\n\n---\n\n${data.message}`;

        const newFile = {
          id: randomId,
          name: fileName,
          date: Date.now(),
          preview: data.message.slice(0, 200)
        };

        setSumUpFiles([newFile, ...sumUpFiles]);
        localStorage.setItem('sumUpFiles', JSON.stringify([newFile, ...sumUpFiles]));

        // Auto-download
        const blob = new Blob([fileContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Sum Up error:', err);
    }
  };

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
    } else {
      setMorphTarget(0);
      setChatReady(false);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Fetch cloud (GiveGigs) chat metadata; resilient to failure
  useEffect(() => {
    let cancelled = false;
    const fetchCloud = async () => {
      setCloudLoading(true);
      setCloudError(null);
      try {
        const res = await fetch('/api/cloud-sessions');
        if (res.status === 404) {
          // Cloud endpoint not deployed; treat as no cloud history without error
          setCloudSessions([]);
          setCloudLoading(false);
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data)) {
          const mapped: CloudSessionMeta[] = data.map((item: any) => ({
            id: String(item.id ?? item.sessionId ?? generateId()),
            title: String(item.title ?? item.name ?? 'Cloud Conversation'),
            updatedAt: typeof item.updatedAt === 'number' ? item.updatedAt : Date.now(),
            messageCount: typeof item.messageCount === 'number' ? item.messageCount : undefined,
          }));
          setCloudSessions(mapped);
        } else {
          setCloudSessions([]);
        }
      } catch (err) {
        if (cancelled) return;
        setCloudSessions([]);
        setCloudError('Cloud history unavailable');
      } finally {
        if (!cancelled) setCloudLoading(false);
      }
    };
    fetchCloud();
    return () => {
      cancelled = true;
    };
  }, []);

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

      // 30-second timeout to prevent hanging requests
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          model: selectedModel, 
          nickname: nickname, 
          messages: newMessages.map((m) => ({ role: m.role, content: m.content.slice(0, 5000) })) 
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response body once (handles both success and error)
      const data = await res.json().catch(() => null);

      // Always log debug info from backend
      if (consoleDebugEnabled && data?.debugLogs && Array.isArray(data.debugLogs)) {
        console.group('%c[Valley Net Debug Logs]', 'color: #10b981; font-weight: bold');
        data.debugLogs.forEach((log: string) => console.log(log));
        console.groupEnd();
      }

      if (!res.ok) {
        const errMsg = data?.error || `Request failed (${res.status})`;
        // Show last few debug log entries in the error bubble for diagnosis
        const lastLogs = data?.debugLogs?.slice(-5) || [];
        const debugSuffix = lastLogs.length > 0 ? '\n\n---\n**Debug trail:**\n' + lastLogs.map((l: string) => '`' + l + '`').join('\n') : '';
        throw new Error(errMsg + debugSuffix);
      }

      if (!data?.message) {
        const lastLogs = data?.debugLogs?.slice(-3) || [];
        throw new Error("No response from AI." + (lastLogs.length ? '\n\nDebug: ' + lastLogs.join(' | ') : ''));
      }

      updateCurrentSession([...newMessages, { id: generateId(), role: "assistant", content: data.message, timestamp: Date.now() }]);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        // Check if it was a timeout or manual stop
        const wasManualStop = !abortControllerRef.current;
        const abortMsg = wasManualStop
          ? "Generation stopped manually."
          : "Request timed out after 30 seconds. The AI might be busy - please try again, Boss.";
        updateCurrentSession([...newMessages, { id: generateId(), role: "assistant", content: abortMsg, timestamp: Date.now(), error: !wasManualStop }]);
      } else if (err instanceof TypeError && err.message.includes('fetch')) {
        // Network error (offline, DNS failure, etc.)
        const netMsg = "Network error - check your internet connection and try again, Boss.";
        console.error('[Valley Net Network Error]', err.message);
        setError(netMsg);
        updateCurrentSession([...newMessages, { id: generateId(), role: "assistant", content: netMsg, timestamp: Date.now(), error: true }]);
      } else {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong. Let's retry that.";
        console.error('[Valley Net Error]', errorMessage);
        setError(errorMessage);
        updateCurrentSession([...newMessages, { id: generateId(), role: "assistant", content: errorMessage, timestamp: Date.now(), error: true }]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      if (autoScrollEnabled) {
        setTimeout(() => scrollToBottom(), 50);
      }
    }
  }, [input, isLoading, messages, currentSessionId, scrollToBottom, consoleDebugEnabled, autoScrollEnabled, selectedModel]);

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
      {/* Floating launcher with torus border (hidden while chat is open) */}
      {!isOpen && (
        <div className="fixed right-0 pointer-events-none flex items-end justify-end p-2" style={{ zIndex: 120, width: threeSize * 2, height: threeSize * 2, bottom: -20 }}>
          <div className="relative flex items-center justify-center w-full h-full">
            <ThreeBorderBack size={threeSize * 2} />
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 focus:outline-none outline-none pointer-events-auto cursor-pointer"
              aria-label="Toggle Valley Net AI Chat"
              style={{ zIndex: 5, width: threeSize * 1.2, height: threeSize * 1.2 }}
            >
              <motion.div
                key="open"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center justify-center w-full h-full relative"
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotate: [-2, 2, -2], y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/valley%20net%20CUTOUT%20mattyjacks%202023-2026%20blonde%20lady%20girl%20red%20eyes%20ai%20generated%20edited.png"
                    alt="Valley Net"
                    fill
                    sizes="140px"
                    className="object-contain object-bottom"
                    priority
                  />
                </motion.div>
                <ThreeBorderFront size={threeSize * 1.2} />
              </motion.div>
              <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping" />
            </motion.button>
            <ThreeBorderFront size={threeSize * 2} />
          </div>
        </div>
      )}

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
            <div className="drag-handle flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 z-20 cursor-move touch-none relative shrink-0">
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
            <div className={`absolute top-[60px] bottom-0 left-0 w-[55vw] min-w-[320px] max-w-[560px] bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-200 dark:border-white/10 z-30 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full opacity-0'}`}>
              <div className="p-4 border-b border-zinc-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-black/20">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">Chat Menu</h4>
                  <button onClick={() => setShowSettings(!showSettings)} className="px-2 py-1 text-[11px] font-bold rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800/50 transition-all hover:shadow-sm" aria-label="Toggle chat settings">Settings</button>
                  <button onClick={() => setShowSumUpMenu(!showSumUpMenu)} className="px-2 py-1 text-[11px] font-bold rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800/50 transition-all hover:shadow-sm" aria-label="Toggle sum up conversations">Sum Up</button>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar">
                {showSumUpMenu ? (
                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-black/30 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sum Up Conversations</h5>
                    <div className="space-y-1">
                      {sessions.map((session) => (
                        <button key={session.id} onClick={() => { setSelectedSumUpSession(session.id); setShowSumUpConfirm(true); }} className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 text-sm text-zinc-700 dark:text-zinc-300 transition-colors">
                          <span className="truncate">{session.title}</span>
                          <span className="text-[10px] text-zinc-500">({session.messages.length})</span>
                        </button>
                      ))}
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
                          <div key={session.id} onClick={() => { setCurrentSessionId(session.id); setIsSidebarOpen(false); }} className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-all ${currentSessionId === session.id ? "bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-transparent font-medium"}`}>
                            <div className="flex items-center gap-2 truncate">
                              <MessageSquare className={`w-4 h-4 flex-shrink-0 ${currentSessionId === session.id ? 'text-emerald-500' : 'opacity-60'}`} />
                              <span className="truncate">{session.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-zinc-400">{session.messages.length}</span>
                              <button onClick={(e) => deleteSession(e, session.id)} className="opacity-0 group-hover:opacity-100 hover:text-sky-600 transition-opacity p-1 bg-zinc-200/50 dark:bg-zinc-800 rounded-md" title="Delete Session">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
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

                    <div className="p-3 rounded-2xl bg-white/80 dark:bg-black/30 border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Settings</h5>
                        <span className="text-[10px] font-bold text-emerald-500">Valley Net</span>
                      </div>
                      <label className="flex items-center justify-between text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-xl px-3 py-2.5">
                        <div className="flex flex-col">
                          <span>Nickname</span>
                          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/90 font-medium">Your name in chat</span>
                        </div>
                        <input
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          className="text-sm font-semibold bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-700 rounded-lg px-2 py-1"
                        />
                      </label>
                      <label className="flex items-center justify-between text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-xl px-3 py-2.5">
                        <div className="flex flex-col">
                          <span>Model</span>
                          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/90 font-medium">Choose AI engine</span>
                        </div>
                        <select
                          value={selectedModel}
                          onChange={(e) => setSelectedModel(e.target.value)}
                          className="text-sm font-semibold bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-700 rounded-lg px-2 py-1"
                        >
                          <option value="gpt-5.4-mini-2026-03-17">GPT-5.4 Mini (primary)</option>
                          <option value="gpt-5-mini-2025-08-07">GPT-5 Mini</option>
                          <option value="gpt-4o-mini">GPT-4o Mini</option>
                        </select>
                      </label>
                      <label className="flex items-center justify-between text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-xl px-3 py-2.5">
                        <div className="flex flex-col">
                          <span>Auto-scroll on replies</span>
                          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/90 font-medium">Keeps the newest message in view</span>
                        </div>
                        <input type="checkbox" checked={autoScrollEnabled} onChange={(e) => setAutoScrollEnabled(e.target.checked)} className="h-4 w-4" />
                      </label>
                      <label className="flex items-center justify-between text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-xl px-3 py-2.5">
                        <div className="flex flex-col">
                          <span>Console debug logs</span>
                          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/90 font-medium">Show backend debug trail in DevTools</span>
                        </div>
                        <input type="checkbox" checked={consoleDebugEnabled} onChange={(e) => setConsoleDebugEnabled(e.target.checked)} className="h-4 w-4" />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollAreaRef}
              onScroll={handleScroll}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto px-4 sm:px-5 py-6 space-y-2 bg-zinc-50/50 dark:bg-zinc-950/30 custom-scrollbar scroll-smooth relative select-text"
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
              <div className="flex justify-between items-center mt-3 px-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                  {isLoading ? "Thinking... (30s timeout)" : error ? "Error - tap to retry" : `Ready (${messages.length}/50)`}
                </span>
              </div>
            </div>
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

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={applyMagicPrompt}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                  title="Insert a magic prompt"
                >
                  <span role="img" aria-label="magic wand">🪄</span>
                  Magic Prompt
                </button>
                <button
                  type="button"
                  onClick={addFoodReward}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-full px-3 py-1 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                  title="Add a random food emoji reward"
                >
                  <span role="img" aria-label="food reward">{FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)]}</span>
                  Reward
                </button>
              </div>

              <div className="flex justify-between items-center mt-3 px-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-700 dark:text-zinc-100">
                  {isLoading ? "Thinking... (30s timeout)" : error ? "Error - tap to retry" : `Ready (${messages.length}/50)`}
                </span>
                <div className="flex items-center gap-2">
                  {charCount > 4000 && (
                    <div className="w-16 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <div className={`h-full ${charCount > 4800 ? 'bg-sky-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((charCount / 5000) * 100, 100)}%` }} />
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-100 tracking-wider">
                    Powered by God
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

      {/* Sum Up Confirmation Dialog */}
      <AnimatePresence>
        {showSumUpConfirm && selectedSumUpSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowSumUpConfirm(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-purple-200 dark:border-purple-800"
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
