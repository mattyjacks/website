# AI Features & Cost Tracking System

## Overview

MattyJacks.com now includes a comprehensive AI system with intelligent cost tracking, categorization, and OpenServ documentation integration. This document outlines all AI-related features and their implementation.

---

## Table of Contents

- [AI Chat System](#ai-chat-system)
- [Category-Based Cost Tracking](#category-based-cost-tracking)
- [OpenServ RAG Integration](#openserv-rag-integration)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)
- [Usage Examples](#usage-examples)

---

## AI Chat System

### Overview

The AI Chat System provides a real-time conversational interface powered by OpenAI's GPT models, with advanced prompt engineering and user engagement features.

### Features

#### 1. Real-Time Chat Interface
- **Location**: `components/anything-button.tsx`
- **Functionality**:
  - Fixed position chat window (z-index: 110, above header z-index: 100)
  - Message history with scrollable conversation
  - Real-time streaming responses
  - Responsive design (mobile & desktop)
  - Dark/light mode support

#### 2. Magic Prompt Templates
- **Location**: `components/short-prompts.ts`
- **Count**: 20+ pre-built templates
- **Features**:
  - Randomized selection on new conversations
  - Non-repetitive algorithm
  - Categories: MattyJacks-related, expert analysis, creative, technical
  - "Regen" button to generate new suggestions
  - One-click insertion into prompt box

#### 3. Food Emoji Rewards
- **Feature**: Reinforce AI behavior with food emojis
- **Emoji List**: 🍕🍯🍓🍇🍪🍉🍅🍑🥝
- **Behavior**:
  - Random emoji selection every 4.2 seconds
  - Resets timer when emoji is used
  - AI understands food emojis as positive reinforcement
  - Continues thinking rather than short acknowledgments

#### 4. Chat Disclaimer
- **Text**: `-+OUTPUT_NOT_100%_TRUE+-`
- **Location**: Bottom of chat window
- **Purpose**: Reminds users that AI output may not be 100% accurate
- **Styling**: Small monospace text, zinc-500 color

### Technical Details

**Model**: gpt-5.4-mini-2026-03-17 (with fallbacks to gpt-5-mini-2025-08-07, gpt-4o-mini)

**System Prompt Features**:
- Boss/nickname customization
- Food emoji safeguard (prevents corruption)
- RAG context injection for OpenServ queries
- Instruction following and safety guidelines

**API Endpoint**: `/api/chat` (POST)

**Request Format**:
```json
{
  "messages": [
    { "role": "user", "content": "Your question here" }
  ],
  "nickname": "Boss"
}
```

**Response Format**:
```json
{
  "message": "AI response text",
  "model": "gpt-5.4-mini-2026-03-17",
  "toolCalls": 0,
  "responseTimeMs": 1234
}
```

---

## Category-Based Cost Tracking

### Overview

Intelligent system that automatically categorizes API usage and tracks costs by category using gpt-5.4-nano.

### Categories

| Category | Purpose |
|---|---|
| **MattyJacks** | Questions about MattyJacks, the person, projects, or brand |
| **GiveGigs** | GiveGigs platform or feature questions |
| **CryptArtist** | CryptArtist Studio or related projects |
| **OpenServ** | OpenServ, agents, or autonomous systems |
| **Personal** | Personal questions, life advice, casual chat |
| **Coding** | Programming, development, technical questions |
| **Weird** | Unusual, strange, or absurd requests |
| **Marketing** | Marketing strategy, branding, promotion |
| **Mischief** | Playful, mischievous, or humorous requests |
| **Other** | General topics not fitting above categories |
| **Unknown** | Cannot determine category |

### Features

#### 1. AI Categorization
- **Model**: gpt-5.4-nano (cost-efficient)
- **Assignments**: 1-3 categories per prompt
- **Reasoning**: Includes explanation of categorization
- **Speed**: Fast, lightweight categorization

#### 2. Cost Splitting
- **2 Categories**: 50% cost split each
- **3 Categories**: 33% cost split each
- **Tokens**: Proportionally split across categories
- **Requests**: Fractional request count per category

#### 3. Live Dashboard
- **Location**: Clout Calculator component
- **Display**:
  - Category name
  - Cost in USD
  - Percentage of total cost
  - Request count
- **Updates**: Real-time (every 2 seconds)
- **Layout**: Responsive grid (2-4 columns)

#### 4. Cost Metrics Tracked
- Total requests
- Total input tokens
- Total output tokens
- Total tokens (combined)
- Total cost in USD
- Cost per category
- Percentage breakdown

### Technical Details

**Files**:
- `lib/category-cost-tracker.ts` - Core tracking system
- `lib/prompt-categorizer.ts` - AI categorization
- `app/api/category-costs/route.ts` - API endpoint
- `components/clout-calculations.tsx` - Dashboard display

**Storage**: In-memory (production should use database)

**API Endpoint**: `/api/category-costs` (GET)

**Response Format**:
```json
{
  "categoryBreakdown": [
    {
      "category": "Coding",
      "cost": 0.45,
      "percentage": 25.5,
      "requests": 3.5
    }
  ]
}
```

**Pricing** (gpt-5.4-mini):
- Input: $0.075 per 1K tokens
- Output: $0.30 per 1K tokens

---

## OpenServ RAG Integration

### Overview

Comprehensive OpenServ documentation with intelligent retrieval-augmented generation (RAG) system.

### Documentation Files

Located in `context/openserv/`:

| File | Purpose |
|---|---|
| **README.md** | Overview, quick links, key resources |
| **SDK.md** | TypeScript SDK features, installation, core concepts |
| **AGENT_TUTORIAL.md** | Building agents, architecture, development workflow |
| **API_CONCEPTS.md** | API patterns, action types, authentication, error handling |
| **EXAMPLES.md** | Real-world agent examples and patterns |
| **ARCHITECTURE.md** | System architecture, shadow agents, control levels |
| **DEPLOYMENT.md** | Deployment strategies, monitoring, scaling, security |
| **TROUBLESHOOTING.md** | Common issues, debugging, FAQ |

### Features

#### 1. Selective RAG Scanning
- **Location**: `lib/openserv-rag.ts`
- **Functionality**:
  - Scans `.md` and `.txt` files in `/context/openserv/`
  - Calculates relevance scores
  - Extracts relevant snippets
  - Returns top 3 most relevant matches
  - Keyword grouping for better matching

#### 2. Quick-Context Mini-AI
- **Model**: gpt-5.4-nano
- **Purpose**: Summarize relevant documentation
- **Features**:
  - Processes RAG context
  - Generates concise summaries (2-3 sentences)
  - Cost-efficient (nano model)
  - Fallback to empty context if no matches

#### 3. OpenServ Counter
- **Location**: `lib/openserv-counter.ts`
- **Features**:
  - Tracks OpenServ prompt count
  - 10% chance message display
  - Shows total prompts and spend
  - Shared across all users
  - Example: "This is the 3247th OpenServ prompt. MattyJacks has spent $32.48 teaching OpenServ."

#### 4. Integration with Chat
- **Automatic Detection**: Detects OpenServ queries
- **Context Injection**: Adds relevant documentation to system prompt
- **Cost Tracking**: Separate OpenServ cost tracking
- **Counter Display**: 10% chance message appended to response

### Technical Details

**Files**:
- `lib/openserv-rag.ts` - RAG scanning and matching
- `lib/openserv-counter.ts` - Counter and messaging
- `app/api/quick-context/route.ts` - Quick-context endpoint
- `context/openserv/` - Documentation files

**API Endpoint**: `/api/quick-context` (POST)

**Request Format**:
```json
{
  "query": "How do I create an OpenServ agent?"
}
```

**Response Format**:
```json
{
  "context": "Summarized documentation context",
  "isOpenserv": true,
  "source": "quick-context-rag"
}
```

**Relevance Scoring**:
- Exact phrase match: +10 points
- Word-by-word match: +2 points per word
- Keyword group match: +3 points per match

---

## API Endpoints

### Chat Endpoint

**Route**: `/api/chat`
**Method**: POST
**Purpose**: Send messages and receive AI responses

**Request**:
```typescript
{
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  nickname?: string;
  requestedModel?: string;
}
```

**Response**:
```typescript
{
  message: string;
  model: string;
  toolCalls: number;
  responseTimeMs: number;
  debugLogs?: string[];
}
```

### Category Costs Endpoint

**Route**: `/api/category-costs`
**Method**: GET
**Purpose**: Fetch category cost breakdown

**Response**:
```typescript
{
  categoryBreakdown: Array<{
    category: string;
    cost: number;
    percentage: number;
    requests: number;
  }>;
}
```

### Quick Context Endpoint

**Route**: `/api/quick-context`
**Method**: POST
**Purpose**: Get RAG-enhanced context for OpenServ queries

**Request**:
```typescript
{
  query: string;
}
```

**Response**:
```typescript
{
  context: string;
  isOpenserv: boolean;
  source: "quick-context-rag" | "no-docs";
}
```

---

## Architecture

### Data Flow

```
User Message
    ↓
Chat API (/api/chat)
    ↓
├─→ Categorization (gpt-5.4-nano)
│   └─→ Assign 1-3 categories
│
├─→ OpenServ Detection
│   └─→ If OpenServ query:
│       ├─→ RAG Scanning
│       ├─→ Quick-Context Summary
│       └─→ Counter Increment
│
├─→ OpenAI API Call (gpt-5.4-mini)
│   └─→ Process with context
│
├─→ Cost Tracking
│   ├─→ API Cost Tracker
│   └─→ Category Cost Tracker
│
└─→ Response to User
    └─→ Display in Chat UI
```

### Component Hierarchy

```
App Layout
├─ Navigation (z-index: 100)
├─ Main Content
│  └─ AnythingButton (Chat, z-index: 110)
│     ├─ Message List
│     ├─ Input Area
│     ├─ Magic Prompts
│     ├─ Food Emoji Button
│     └─ Disclaimer
└─ Footer
   └─ CloutCalculations
      ├─ View Stats
      ├─ API Cost Tracking
      └─ Category Cost Breakdown
```

---

## Usage Examples

### Example 1: Regular Chat

**User Input**: "What's the best way to optimize a React component?"

**Flow**:
1. Message sent to `/api/chat`
2. Categorized as "Coding" (100%)
3. No OpenServ detection
4. OpenAI processes with system prompt
5. Response displayed with disclaimer
6. Costs tracked under "Coding" category

### Example 2: OpenServ Query

**User Input**: "How do I create an autonomous agent with OpenServ?"

**Flow**:
1. Message sent to `/api/chat`
2. Categorized as "OpenServ" (100%)
3. OpenServ detected
4. RAG scans documentation
5. Quick-context summarizes relevant docs
6. Context injected into system prompt
7. OpenAI processes with enhanced context
8. 10% chance: Counter message appended
9. Costs tracked under "OpenServ" category

### Example 3: Multi-Category Query

**User Input**: "I want to build a weird marketing campaign using AI agents"

**Flow**:
1. Message sent to `/api/chat`
2. Categorized as: "Marketing" (33%), "Weird" (33%), "Coding" (33%)
3. Costs split equally across 3 categories
4. OpenAI processes
5. Response displayed
6. Each category receives 33% of the cost

---

## Configuration

### Environment Variables

```bash
# OpenAI API Key (required)
OPENAI_API_KEY=sk-...

# Optional: Custom model selection
OPENAI_MODEL=gpt-5.4-mini-2026-03-17
```

### Customization

**Magic Prompts**: Edit `components/short-prompts.ts`
**Categories**: Edit `lib/category-cost-tracker.ts` (COST_CATEGORIES)
**System Prompt**: Edit `app/api/chat/route.ts` (SYSTEM_PROMPT)
**RAG Settings**: Edit `lib/openserv-rag.ts` (MAX_SNIPPET_LENGTH, MAX_RESULTS)

---

## Performance Metrics

### Typical Response Times

- Chat response: 1-3 seconds
- Categorization: 200-500ms
- RAG scanning: 50-150ms
- Quick-context: 300-800ms

### Token Usage

- Average chat message: 150-300 tokens
- Categorization: 50-100 tokens
- RAG context: 200-500 tokens

### Cost Estimates

- Average chat: $0.01-0.05
- Categorization: $0.001-0.002
- Quick-context: $0.002-0.005

---

## Future Enhancements

- [ ] Database persistence for cost tracking
- [ ] User-specific cost tracking
- [ ] Cost alerts and budgets
- [ ] Advanced RAG with vector embeddings
- [ ] Multi-language support
- [ ] Custom category creation
- [ ] Cost analytics and reporting
- [ ] Conversation export/sharing

---

For more information, see the individual feature documentation files.
