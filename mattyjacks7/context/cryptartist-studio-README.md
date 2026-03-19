<div align="center">

# CryptArtist Studio

### The Open Creative Suite - Powered by Community

**Website:** [mattyjacks.com](https://mattyjacks.com) | **GitHub:** [github.com/mattyjacks/CryptArtistStudio](https://github.com/mattyjacks/CryptArtistStudio) | **Contact:** [Matt@MattyJacks.com](mailto:Matt@MattyJacks.com)

---

**CryptArtist Studio** is a free, open-source, professional-grade creative suite built with
Tauri v2, React 18, TypeScript, and Rust. It bundles eleven powerful programs into a single
desktop application: a video/image editor, a vibe-coding IDE, a screen recorder, an
autonomous AI agent, an integrated game development studio, a terminal-based command center,
a P2P compute-sharing tool, an installer builder, a GIMP-style image editor with AI, a
luck-based AI seed generator, and a full settings hub.

The project is community-funded through donations at
[mattyjacks.com](https://mattyjacks.com) and [givegigs.com](https://givegigs.com).

</div>

---

## Table of Contents

- [Overview](#overview)
- [Programs in the Suite](#programs-in-the-suite)
  - [Media Mogul](#media-mogul--mmo)
  - [VibeCodeWorker](#vibecodeworker--vcw)
  - [DemoRecorder](#demorecorder--dre)
  - [ValleyNet](#valleynet--vnt)
  - [GameStudio](#gamestudio--gst)
  - [CryptArt Commander](#cryptart-commander--cac)
  - [DonatePersonalSeconds](#donatepersonalseconds--dps)
  - [Clone Tool](#clone-tool--cln)
  - [DictatePic](#dictatepic--dc)
  - [Luck Factory](#luck-factory--lck)
  - [Settings](#settings--set)
- [Workspace Management](#workspace-management)
  - [Multi-File Workspaces](#multi-file-workspaces)
  - [Workspace Groups and Resource Sharing](#workspace-groups-and-resource-sharing)
- [Plugin, Mod, and Theme System](#plugin-mod-and-theme-system)
  - [Plugins](#plugins)
  - [Mods](#mods)
  - [Themes](#themes)
- [The .CryptArt File Format](#the-cryptart-file-format)
  - [Format Overview](#format-overview)
  - [Required Fields](#required-fields)
  - [Recommended Fields](#recommended-fields)
  - [Optional Fields](#optional-fields)
  - [Meta Object](#meta-object)
  - [Backward Compatibility](#backward-compatibility)
  - [Example Files](#example-files)
- [Technology Stack](#technology-stack)
  - [Frontend](#frontend)
  - [Backend (Rust)](#backend-rust)
  - [Media Engine](#media-engine)
  - [Build System](#build-system)
- [Project Architecture](#project-architecture)
  - [Directory Structure](#directory-structure)
  - [Frontend Architecture](#frontend-architecture)
  - [Backend Architecture](#backend-architecture)
  - [State Management](#state-management)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Mode](#development-mode)
  - [Building for Production](#building-for-production)
  - [Platform Support](#platform-support)
- [CLI Reference](#cli-reference)
  - [Global Commands](#global-commands)
  - [Project Management](#project-management-commands)
  - [Media Commands](#media-commands)
  - [AI Commands](#ai-commands)
  - [File System Commands](#file-system-commands)
  - [Server Commands](#server-commands)
  - [System Commands](#system-commands)
- [REST API Reference](#rest-api-reference)
  - [Starting the Server](#starting-the-server)
  - [Endpoints](#endpoints)
  - [Authentication](#authentication)
- [Configuration](#configuration)
  - [API Keys](#api-keys)
  - [FFmpeg Setup](#ffmpeg-setup)
  - [Godot Integration](#godot-integration)
  - [Tauri Configuration](#tauri-configuration)
- [Logging System](#logging-system)
  - [Log Files](#log-files)
  - [Log Levels](#log-levels)
  - [Frontend Logging](#frontend-logging)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [OpenRouter Multi-Model AI Integration](#openrouter-multi-model-ai-integration)
  - [Supported Providers](#supported-providers)
  - [Model Selection](#model-selection)
  - [Fallback Behavior](#fallback-behavior)
- [Security Hardening](#security-hardening)
  - [Overview of 300 Vulnerability Fixes](#overview-of-300-vulnerability-fixes)
  - [Security Utility Module](#security-utility-module)
  - [Content Security Policy](#content-security-policy)
  - [REST API Security Headers](#rest-api-security-headers)
  - [Input Validation Summary](#input-validation-summary)
- [CryptArtist Studio Website](#cryptartist-studio-website)
  - [Website Pages](#website-pages)
  - [Website Technology](#website-technology)
- [Privacy Policy and Terms of Use](#privacy-policy-and-terms-of-use)
- [Contributing](#contributing)
  - [Development Workflow](#development-workflow)
  - [Code Style](#code-style)
  - [Pull Requests](#pull-requests)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)
- [Prompt History](#prompt-history)
- [Related Projects and Links](#related-projects-and-links)
- [Roadmap](#roadmap)
- [Future Plans](#future-plans)
  - [New Programs (CꜴS, SLM, BRD, MKT, NET, SYN, TRN, ARK, COM)](#new-programs)
  - [Existing Program Enhancements](#existing-program-enhancements)
  - [Platform and Infrastructure](#platform-and-infrastructure)
  - [AI and Machine Learning](#ai-and-machine-learning)
  - [Community and Ecosystem](#community-and-ecosystem)
- [Detailed CꜴS Plan](#detailed-cꜴs-plan)
- [Detailed SLM Plan](#detailed-slm-plan)
- [License](#license)
- [Credits](#credits)

---

## Overview

CryptArtist Studio started as a DaVinci Resolve competitor - a professional video editor
with AI integration. It has since evolved into a full creative suite with eleven distinct
programs, all sharing a unified dark theme, a common project file format (`.CryptArt`),
and deep AI integration powered by the user's own API keys.

### Key Highlights

- **Eleven Programs in One** - Video editing, code editing, screen recording, AI agent,
  game development, terminal commander, P2P compute sharing, installer builder, AI image
  editor, luck seed generator, and a settings hub all in a single ~15 MB download.
- **Security Hardened** - 300 vulnerability fixes across frontend and backend,
  including CSP, input validation, rate limiting, XSS prevention, audit logging,
  encrypted storage, SVG sanitization, WebSocket monitoring, and API guards.
- **AI-Powered Everything** - Every program integrates with OpenAI, Anthropic, Google,
  or any OpenAI-compatible API endpoint. Users bring their own keys.
- **The .CryptArt File Format** - A permanently future-proof JSON project file that
  will never need a format upgrade. Any `.CryptArt` file ever created will always be
  readable by any version of the app.
- **Cross-Platform** - Runs on Windows, macOS, and Linux via Tauri. Planned launches
  on 100+ platforms including Steam (PC/Mac/Linux/Deck), iOS, Android, Xbox, PS5,
  Nintendo Switch 1 & 2, Smart TVs, Chromebook, Raspberry Pi, Arduino, calculators,
  smart watches, VR headsets, web browsers, Docker, and more. See
  [Platform Launch Plans](#platform-launch-plans---every-platform-possible) for the full list.
- **Full CLI and REST API** - Every feature is accessible from the command line or via
  HTTP API, enabling integration with other AI tools and automation pipelines.
- **Comprehensive Logging** - Three rolling log files track everything: a session log,
  a recent log (last 1,000 lines), and a full history log.
- **Community-Funded** - No subscriptions, no ads. Supported by donations at
  [mattyjacks.com](https://mattyjacks.com) and [givegigs.com](https://givegigs.com).
- **Open Source** - CryptArtist Custom License v1.69.420.3. Fork it, extend it, make it yours.

### Philosophy

CryptArtist Studio is built on the belief that creative tools should be:

1. **Free** - No paywalls, no feature gates, no "pro" tiers.
2. **Open** - CryptArtist Custom License v1.69.420.3, fully auditable, community-driven.
3. **Permanent** - File formats that never break, software that respects your work.
4. **AI-Native** - AI is not bolted on; it is woven into every workflow.
5. **User-Controlled** - Your API keys, your data, your machine. No cloud dependency.

### Recent Updates (March 2026)

**GameStudio Enhancements:**
- ✅ Upgraded to **Godot 4.6.1** (latest stable release)
- ✅ **Custom Godot Path Browser** - Users can now browse and select custom Godot executable paths
- ✅ **Godot Path Verification** - Backend validates custom paths before use
- ✅ **Improved Godot Not Found Dialog** - Four options: Download, Browse, Rescan, or Continue
- ✅ **GPT-5 Mini Default** - All AI code generation now uses GPT-5 Mini for better performance

**VibeCodeWorker Improvements:**
- ✅ **Shared API Keys** - Now uses centralized API keys from CryptArtist Studio Settings
- ✅ **Removed Duplicate Configuration** - No need to set API keys per-program
- ✅ **Better Status Indicators** - Settings panel shows available API keys (OpenAI, OpenRouter, etc.)
- ✅ **GPT-5 Mini Default** - AI assistant defaults to GPT-5 Mini model
- ✅ **Cleaner UI** - Simplified settings panel with clear API key status

**System-Wide Updates:**
- ✅ **GPT-5 Mini as Default AI Model** - All programs now default to `openai/gpt-5-mini`
- ✅ **Centralized API Key Management** - All programs share keys from Settings
- ✅ **Production Build Ready** - Latest .exe built and tested (v1.69.420)
- ✅ **Security Hardening** - 300+ vulnerability fixes across frontend and backend

---

## Programs in the Suite

When you launch CryptArtist Studio, you are greeted by the **Suite Launcher [🗺️SLr]** - a
full-window launcher displaying the CryptArtist logo and twelve program cards.
The Suite Launcher is itself a launchable program from within the grid.
Each card shows the program's emoji logo, name, short code, and a one-line description.
The launcher includes search and filter, favorites, category sorting, grid/list views,
a rotating tips carousel, keyboard shortcuts overlay, system status indicators, and
an AI readiness indicator.

| # | Program | Emoji | Code | Shortcut | Description |
|---|---|---|---|---|---|
| - | **Suite Launcher** | Map | SLr | `Home` | The home screen - launch programs, open .CryptArt files, view status |
| 1 | **Media Mogul** | TV | MMo | `1` | Video editor, image editor, and AI-powered media studio |
| 2 | **VibeCodeWorker** | Technologist | VCW | `2` | Your personal vibe-coding IDE powered by your own API keys |
| 3 | **DemoRecorder** | Camera | DRe | `3` | Screen recorder and live streamer for demos and gaming |
| 4 | **ValleyNet** | Person | VNt | `4` | Autonomous AI agent that can do anything on your computer |
| 5 | **GameStudio** | Game Controller | GSt | `5` | Combined media + code + Godot engine for game development |
| 6 | **CryptArt Commander** | Cat | CAC | `6` | Terminal-based command center for API and CLI control |
| 7 | **DonatePersonalSeconds** | Computer | DPS | `7` | P2P compute resource sharing for distributed tasks |
| 8 | **Clone Tool** | Package | CLN | `9` | Create .exe, .dmg, .deb installers from your config |
| 9 | **DictatePic** | Pie | D(pi)c | `-` | GIMP-style image editor with AI generation, inpainting, and style transfer |
| 10 | **Luck Factory** | Clover | Lck | `-` | AI luck seed generator with guided meditation and affirmations |
| 11 | **Settings** | Gear | Set | `0` | API key management, OpenRouter, appearance, and data |

The Suite Launcher [🗺️SLr] also displays a donation banner encouraging users to support
development at [mattyjacks.com](https://mattyjacks.com) and
[givegigs.com](https://givegigs.com).

#### Suite Launcher [SLr] Features

- **Search and Filter** - Type to search programs by name, code, description, or tags
- **Category Filter** - Filter by category tags (all, video, code, ai, media, game, tools)
- **Sort Options** - Sort by default, A-Z, most used, or favorites first
- **Grid/List View** - Toggle between card grid and compact list layouts
- **Favorites** - Star programs for quick access; persisted in localStorage
- **Launch Count Tracking** - Tracks how many times each program is launched
- **Time-Based Greeting** - Dynamic greeting based on time of day
- **Rotating Tips** - 14 tips rotate every 8 seconds with usage hints
- **Keyboard Shortcuts Overlay** - Press `?` to see all shortcuts
- **Recent Projects Panel** - Press `R` to see recently opened `.CryptArt` files
- **Quick Actions Dropdown** - Access recent projects, shortcuts, cache clear, and GitHub
- **System Status** - Shows FFmpeg, Godot, and AI (OpenRouter/OpenAI) status
- **Open .CryptArt Files** - Multi-file open dialog that creates workspaces
- **Accent Color** - Configurable accent color theme
- **Uptime Display** - Shows session uptime in the status bar

---

### Media Mogul - MMo

**Media Mogul** is the flagship program of CryptArtist Studio. It is a professional-grade
video editor, image editor, and AI-powered media production studio with an integrated
Podcast & Audio Lab powered by ElevenLabs.

#### Workspaces

Media Mogul is organized into seven workspaces, each accessible from the header tabs:

| Workspace | Description |
|---|---|
| **Edit** | Timeline-based video editing with multi-track support |
| **Node Mode** | Node-based compositing pipeline for advanced visual effects |
| **Color** | Color grading and correction tools |
| **Audio** | Audio editing, mixing, and waveform visualization |
| **AI Studio** | AI-powered video generation, voiceover, captioning, and scripting |
| **Podcast** | ElevenLabs voice generation, speech-to-text, and sound effects lab |
| **Deliver** | Export settings, format selection, and render queue |

#### Features

- **Multi-Track Timeline** - Drag-and-drop clips onto a layered timeline with
  snap-to-grid, trimming, splitting, and ripple editing.
- **Node-Based Compositing** - A directed acyclic graph (DAG) editor for chaining
  visual effects, color corrections, and transformations.
- **AI Studio Mode** - Generate complete videos from a text prompt:
  - AI selects stock footage from Pexels
  - AI writes voiceover scripts
  - AI generates captions and subtitles
  - AI suggests background music from GiveGigs media bucket
  - AI creates podcast scripts and music compositions
- **Podcast & Audio Lab (ElevenLabs)**:
  - Text-to-speech voiceover generation with selectable voice/model
  - Speech-to-text transcription for uploaded audio files
  - Sound effects generation from text prompts
  - Voice/model catalog fetch (from ElevenLabs API)
  - Generated audio output tracking for quick reuse in timeline workflows
- **Pexels Integration** - Search and import photos and videos from Pexels directly
  into your project. Multiple resolution options for video.
- **GiveGigs Media Bucket** - Connect to a GiveGigs.com Supabase bucket for royalty-free
  music, sound effects, and media assets.
- **Image Generation** - Generate images using the OpenAI API (DALL-E) with custom
  prompts or AI-assisted prompt refinement.
- **FFmpeg-Powered** - All encoding, decoding, and transcoding is handled by FFmpeg,
  which is automatically downloaded on first run.
- **Export Options** - Export to MP4, WebM, GIF, PNG sequence, and more with
  configurable resolution, bitrate, and codec settings.

#### .CryptArt Data Payload (Media Mogul)

When Media Mogul saves a `.CryptArt` file, the `data` object contains:

```json
{
  "workspace": "edit",
  "timeline": { ... },
  "mediaPool": [ ... ],
  "nodeGraph": { ... },
  "colorGrade": { ... },
  "exportSettings": { ... }
}
```

---

### VibeCodeWorker - VCW

**VibeCodeWorker** is a full-featured vibe-coding IDE built into CryptArtist Studio.
It is modeled after VS Code and Windsurf, using the MIT-licensed Monaco Editor as its
code editing engine. VibeCodeWorker now uses shared API keys from CryptArtist Studio Settings,
eliminating the need for per-program API key configuration.

#### Layout

The VibeCodeWorker window is divided into four main areas:

| Area | Position | Description |
|---|---|---|
| **File Explorer** | Left sidebar (200px) | Tree view of the project directory |
| **Editor** | Center | Monaco Editor with syntax highlighting, minimap, bracket colorization |
| **Bottom Panel** | Below editor (200px) | Tabbed panel with 5 sub-panels |
| **AI Chat** | Right sidebar (300px) | AI assistant with context-aware code help (uses GPT-5 Mini by default) |

#### API Key Management

- **Shared API Keys** - VibeCodeWorker uses the same API keys configured in CryptArtist Studio Settings
- **Supported Providers** - OpenAI, Anthropic, Google, OpenRouter
- **Default Model** - GPT-5 Mini (openai/gpt-5-mini)
- **Status Indicators** - Settings panel shows which API keys are available
- **No Duplication** - Configure once in Settings, use everywhere in the suite

#### Bottom Panel Tabs

| Tab | Description |
|---|---|
| **Terminal** | Built-in terminal with basic commands (clear, pwd, help) |
| **Problems** | Auto-scanning lint diagnostics that run on every file change |
| **Testing** | AI-powered + pattern-based test runner with auto-test on save |
| **Web Audit** | Lighthouse-style website quality analysis (Performance, Accessibility, SEO, Best Practices) |
| **Search** | Cross-file search and replace with regex and case-sensitivity toggles |

#### Testing Panel

The Testing panel provides two modes of analysis:

**AI-Powered Testing** (requires API key):
- Analyzes the current file for potential bugs, edge cases, and coverage gaps
- Checks for: null safety, error handling, boundary conditions, type safety,
  security issues, race conditions
- Returns 5-15 individual test checks with pass/fail/warning status

**Pattern-Based Testing** (no API key required):
- Detects test files (`.test.`, `.spec.`, `_test.`, `test_` patterns)
- Counts assertions (`expect()`, `assert()`)
- Flags TypeScript `any` usage
- Flags empty catch blocks

**Auto-Test on Save**:
- Toggle the "Auto-test on save" checkbox
- Every file save automatically triggers a test run
- Status bar shows "Auto-test ON" when enabled

#### Web Audit Panel

The Web Audit panel provides Google Lighthouse-style website analysis:

**AI-Powered Audit** (requires API key):
- Scores from 0-100 for: Performance, Accessibility, Best Practices, SEO
- 15-25 individual checks covering:
  - Page load optimizations
  - Image alt tags and semantic HTML
  - ARIA roles and keyboard navigation
  - Meta tags, viewport, HTTPS
  - CSP headers, font loading
  - Mobile responsiveness
  - Heading hierarchy, link text, form labels

**Pattern-Based Audit** (no API key required):
- Checks HTML files for viewport meta, title tag, lang attribute, image alt attributes

Color-coded score display:
- Green (90+): Excellent
- Yellow (50-89): Needs improvement
- Red (0-49): Poor

#### Problem Scanner

The Problems panel automatically scans all open files for:

| Check | Severity | Description |
|---|---|---|
| `console.log()` | Warning | Console.log statements left in non-test code |
| `TODO/FIXME/HACK/XXX` | Info | Task comments that need attention |
| Lines > 200 chars | Warning | Excessively long lines |
| `debugger` | Error | Debugger statements left in code |
| Empty catch blocks | Warning | Error swallowing without handling |

#### Supported Languages

Monaco Editor provides syntax highlighting for:

TypeScript, JavaScript, Python, Rust, JSON, Markdown, HTML, CSS, SCSS, TOML,
YAML, Shell/Bash, SQL, Go, Java, C, C++, XML, SVG, and plaintext.

#### AI Assistant

The AI chat panel supports multiple providers:

| Provider | Models |
|---|---|
| **OpenAI** | GPT-5 Mini (default), gpt-4o, gpt-4-turbo, gpt-3.5-turbo, etc. |
| **Anthropic** | Claude models |
| **Google** | Gemini models |
| **Custom** | Any OpenAI-compatible endpoint |

The AI assistant automatically includes the currently open file as context (up to 8,000
characters) when answering questions. All AI features use the shared API keys from Settings.

#### .CryptArt Data Payload (VibeCodeWorker)

```json
{
  "rootPath": "/path/to/project",
  "openFiles": [
    { "path": "/path/to/file.ts", "name": "file.ts" }
  ],
  "activeFile": "/path/to/file.ts",
  "model": "openai/gpt-5-mini"
}
```

---

### DemoRecorder - DRe

**DemoRecorder** is a screen recording and live streaming tool designed for software
demos, gaming clips, and content creation.

#### Features

- **Screen Recording** - Record your entire screen or a specific window with
  configurable resolution and frame rate.
- **Recording Controls** - Start, Pause, Stop buttons with a live timer display.
- **Resolution Presets** - 720p, 1080p, 1440p, 4K, or custom resolution.
- **FPS Options** - 24, 30, 60, or 120 frames per second.
- **Live Streaming** - Stream to Twitch, YouTube Live, or Google Meet using
  RTMP URL and stream key.
- **Input Logger Plugin** - Optional plugin that records keyboard and mouse events
  in a structured JSON log, timestamped to video frames. Designed for training AI
  models to replicate human computer interactions.
  **Warning:** This feature logs all keystrokes. A clear warning is shown when enabling.
- **Integration Links** - Quick links to GiveGigs.com and SiteFari.com for publishing
  and sharing recorded demos.

#### Streaming Targets

| Platform | Connection Method |
|---|---|
| **Twitch** | RTMP URL + Stream Key |
| **YouTube Live** | RTMP URL + Stream Key |
| **Google Meet** | Meeting URL + Credentials |

#### .CryptArt Data Payload (DemoRecorder)

```json
{
  "resolution": "1920x1080",
  "fps": 60,
  "format": "mp4",
  "streamTargets": [ ... ],
  "inputLoggerEnabled": false,
  "recordings": [ ... ]
}
```

---

### ValleyNet - VNt

**ValleyNet** is an autonomous AI agent inspired by OpenClaw - the open-source
self-hosted AI agent that executes real-world tasks via LLMs. ValleyNet brings
this concept directly into CryptArtist Studio.

#### Features

- **Natural Language Task Execution** - Type tasks in plain English:
  "Research competitors and summarize findings",
  "Send this file to my Discord channel",
  "Book a meeting for Thursday".
- **Skills Marketplace** - Browse, install, and manage agent skills. Each skill
  is a directory containing a `SKILL.md` manifest file.
- **Browser Automation** - An embedded webview that ValleyNet can control to
  browse the web, fill forms, scrape data, and interact with sites.
- **Service Integrations** - Connect to Discord, Slack, Telegram, WhatsApp,
  Gmail, Google Calendar, and any webhook URL.
- **Task Memory** - Persistent context that carries across sessions, with a
  full task history and memory log.

#### Supported Integrations

| Service | Connection Method |
|---|---|
| **Discord** | Bot token or webhook URL |
| **Slack** | Bot token or webhook URL |
| **Telegram** | Bot token |
| **WhatsApp** | WhatsApp Business API |
| **Gmail** | OAuth2 or app password |
| **Google Calendar** | OAuth2 |
| **Custom Webhook** | Any HTTP endpoint |

#### .CryptArt Data Payload (ValleyNet)

```json
{
  "skills": [ ... ],
  "taskHistory": [ ... ],
  "memory": { ... },
  "integrations": { ... },
  "browserState": { ... }
}
```

---

### GameStudio - GSt

**GameStudio** is the newest program in the suite. It combines the capabilities of
Media Mogul and VibeCodeWorker with Godot 4.6.1 Engine integration to enable AI-powered
game development. It features a custom Godot installation finder with file browser support.

#### Features

- **Three-Panel Layout** - Asset editor (Media Mogul), code editor (VibeCodeWorker),
  and Godot Engine side by side in a configurable layout.
- **Godot 4.6.1 Integration** - Automatically detects Godot 4.6.1 or allows custom path
  selection via file browser. Launch, manage, and interact with Godot projects from
  within CryptArtist Studio.
- **Custom Godot Path Browser** - If Godot is not found on the system, users can:
  - Download Godot 4.6.1 from the official website
  - Browse for a custom Godot executable path
  - Rescan the system for automatic detection
  - Continue working without Godot (code editing only)
- **AI Game Generation** - Describe a game concept in natural language and the AI
  will generate GDScript code, scene files, and asset suggestions using GPT-5 Mini.
- **Project Templates** - Start from pre-built templates for 2D platformers,
  top-down RPGs, puzzle games, and more.
- **Asset Pipeline** - Use Media Mogul's AI image generation to create sprites,
  textures, and UI elements, then import them directly into Godot.
- **Video Game Cloner** - Generate completely original games based on the mechanics
  (not lore, art, or copyrighted content) of any existing video game. See below.

#### Video Game Cloner

The **Video Game Cloner** is a powerful AI-assisted tool inside GameStudio that
creates entirely original video games inspired by the *mechanics* of existing games.
It uses publicly available information (Wikipedia, wikis, gameplay descriptions) to
understand game mechanics and then generates a fresh, original game with no
copyrighted or patented content.

**How It Works:**

1. **Input** - Enter the name of any video game (e.g., "Tetris", "Pac-Man", "Portal")
2. **Research** - The system fetches the Wikipedia page and all publicly available
   gameplay descriptions, mechanic breakdowns, and genre classifications
3. **Analyze** - AI extracts the core *mechanics* (movement, scoring, physics, rules)
   while explicitly filtering out all lore, characters, art, music, and trademarks
4. **Generate (Phase 1: Emoji Graphics)** - On first run, the game is generated with
   emoji-based graphics for instant playability. Emoji sprites, emoji backgrounds,
   emoji UI elements - a fully playable game in minutes
5. **Generate (Phase 2: AI 3D Graphics)** - AI generates basic 3D models, textures,
   and environments to replace emoji placeholders with original visual assets
6. **Export** - The finished game is a complete Godot project ready for distribution

**What Gets Cloned:**
- Core gameplay mechanics (movement, physics, rules, win/loss conditions)
- Genre conventions (platformer, puzzle, shooter, RPG, etc.)
- Game design patterns (progression systems, difficulty curves, control schemes)
- UI/UX paradigms (HUD layout concepts, menu flow patterns)

**What Never Gets Cloned:**
- Characters, names, or likenesses
- Story, lore, dialogue, or narrative elements
- Art assets, sprites, textures, or visual designs
- Music, sound effects, or audio
- Patented game mechanics (clearly flagged and avoided)
- Trademarked terms or branding

**Legal Disclaimer (shown on first run):**

> **IMPORTANT LEGAL NOTICE**
>
> The Video Game Cloner is designed for creating original games inspired by
> publicly available game mechanics. It is optimized for games in the **public
> domain** but can accept any game name with the following conditions:
>
> 1. No copyrighted or patented content is included in generated output
> 2. Users are solely responsible for the games they produce
> 3. CryptArtist Studio is not liable for any games generated by this tool
> 4. We will actively report copyright infringement at our discretion to
>    protect the platform and its community
> 5. Patent holders and copyright owners may use this tool on their own
>    intellectual property without restriction
> 6. By using this tool, you agree to the CryptArtist Studio Terms of Service
>
> If you are not the rights holder, ensure the game mechanics you are cloning
> are not covered by active patents. When in doubt, stick to public domain games.

**Emoji Graphics Mode (Phase 1 Output Example):**
- Player character: a running emoji (e.g., a person, animal, or object)
- Enemies: threat-themed emojis (skulls, fire, ghosts)
- Collectibles: gem/star/coin emojis
- Terrain: earth/tree/water/brick emojis arranged in grid or platformer layouts
- UI: emoji-based health bars, score counters, and menus

**AI 3D Graphics Mode (Phase 2 Output):**
- AI-generated low-poly 3D models via text-to-3D
- Procedural textures and materials
- Basic lighting and environment setup
- Original character designs with no resemblance to source material

#### Layout Modes

| Mode | Description |
|---|---|
| **Split** | Media + Code side by side (50/50) |
| **Code Focus** | Full-width code editor with asset sidebar |
| **Media Focus** | Full-width media editor with code sidebar |
| **Godot Focus** | Full-width Godot viewport with toolbars |

#### Godot Installation Detection & Management

GameStudio includes a robust Godot installation detection system:

**Automatic Detection:**
- Scans system PATH for Godot executable
- Checks common installation directories (Windows, macOS, Linux)
- Detects Godot version via `--version` command
- Displays status in terminal and status bar

**Custom Path Selection:**
- File browser dialog to select custom Godot executable
- Path validation via `godot_verify_path` backend command
- Supports .exe, .bin, and .app executables
- Fallback verification checks file permissions and extension

**Godot Not Found Dialog:**
When Godot is not detected, users can:
1. **📥 Download Godot 4.6.1** - Opens official Godot download page
2. **📁 Browse for Godot .exe** - Opens file browser for custom path selection
3. **🔄 Rescan System** - Re-runs automatic detection
4. **Continue Without Godot** - Closes dialog and allows code editing only

#### .CryptArt Data Payload (GameStudio)

```json
{
  "godotProjectPath": "/path/to/project.godot",
  "godotCustomPath": "/custom/path/to/godot.exe",
  "layout": "split",
  "mediaState": { ... },
  "codeState": { ... },
  "godotState": { ... },
  "aiConversation": [ ... ]
}
```

---

### CryptArt Commander - CAC

**CryptArt Commander** (CAC) is a terminal-based command center that provides full
control over CryptArtist Studio through a command-line interface, REST API integration,
and scripting capabilities. It is designed for power users, automation, and AI agent
integration.

#### Terminal Interface

The Commander presents a full-screen terminal with a command prompt, scrollable output
history, and syntax-highlighted results. It includes tab completion, command aliases,
environment variables, and arrow-key history navigation.

#### Built-In Commands

| Command | Description |
|---|---|
| `help` | Show all available commands |
| `clear` | Clear the terminal output |
| `version` | Show CryptArtist Studio and Commander version |
| `sysinfo` | Display system information (OS, arch, FFmpeg, Godot) |
| `health` | Run a health check on the application |
| `keys status` | Check which API keys are configured |
| `keys export` | Export all API keys to JSON |
| `ffmpeg status` | Check if FFmpeg is installed |
| `ffmpeg install` | Install FFmpeg automatically |
| `godot detect` | Detect Godot engine installation |
| `ls <path>` | List directory contents with sizes |
| `cat <path>` | Read and display a file's contents |
| `write <path> <content>` | Write content to a file |
| `chat <prompt>` | Send a prompt to OpenAI |
| `or <prompt>` | Send a prompt to OpenRouter (200+ models) |
| `or models` | List available OpenRouter models |
| `pexels <query>` | Search Pexels for stock media |
| `generate <prompt>` | Generate an AI image via DALL-E |
| `tts <text>` | Convert text to speech |
| `project` | Show current project state |
| `programs` | List all programs in the suite |
| `run <script>` | Execute a saved script |
| `scripts` | List saved scripts |
| `api` | Show REST API reference |
| `echo <text>` | Echo text to the terminal |
| `time` | Display current time |
| `date` | Display current date and time |
| `history` | Show command history |
| `alias <name>=<cmd>` | Create a command alias |
| `aliases` | List all command aliases |
| `uptime` | Show session uptime |
| `whoami` | Show user information |
| `open <program>` | Navigate to a program by name or ID |
| `env` | Show environment variables |
| `env set <key> <value>` | Set an environment variable |
| `bench <cmd>` | Benchmark a command's execution time |
| `count` | Show total commands run across all sessions |
| `grep <pattern> <path>` | Search for a pattern in a file |
| `head <n> <path>` | Show the first N lines of a file |
| `tail <n> <path>` | Show the last N lines of a file |
| `wc <path>` | Word, line, and character count |
| `sort <path>` | Sort lines of a file alphabetically |
| `uniq <path>` | Show unique lines of a file |
| `calc <expr>` | Evaluate a math expression |
| `pwd` | Print working directory |
| `touch <path>` | Create an empty file |
| `export-history` | Export command history to a file |

#### Tab Completion

Press `Tab` to autocomplete commands and aliases. When multiple matches exist,
suggestion pills are displayed below the input. Press `Tab` again to cycle through
suggestions.

#### Command Aliases

Create shortcuts for frequently used commands:

```bash
alias ll=ls .
alias st=keys status
alias hc=health
alias v=version
```

Default aliases: `ll` (ls .), `st` (keys status), `hc` (health), `v` (version).
Aliases are persisted to localStorage across sessions.

#### Script Editor

The Commander includes a built-in script editor for creating, saving, and running
multi-command scripts:

- **Create scripts** with the visual editor
- **Run scripts** that execute each line as a command sequentially
- **Default scripts**: `hello-world` and `system-check` are provided out of the box
- **Languages**: Shell (command sequences), JavaScript, Python

#### REST API Reference Tab

A built-in API reference tab displays all 18+ REST API endpoints with their HTTP
methods, paths, descriptions, and parameters. This serves as an interactive
documentation panel for developers integrating with CryptArtist Studio.

#### Security Limits

- Maximum command input length: 10,000 characters
- Maximum display history: 200 entries
- Maximum command history: 500 entries
- Maximum script content: 50,000 characters
- Maximum environment variables: 100
- Maximum aliases: 50
- File paths are sanitized before passing to backend

#### .CryptArt Data Payload (Commander)

```json
{
  "commandHistory": [ ... ],
  "scripts": [ ... ],
  "aliases": { "ll": "ls .", "st": "keys status" },
  "envVars": { "USER": "Matt", "SHELL": "cac" }
}
```

---

### DonatePersonalSeconds - DPS

**DonatePersonalSeconds** is a P2P compute resource sharing tool that allows users to donate
their idle CPU, RAM, and GPU resources to help other CryptArtist Studio users run
computationally intensive tasks like AI inference, video rendering, and image generation.

#### How It Works

1. **Detect** - The system detects your available CPU cores, RAM, GPU, and network speed
2. **Configure** - Set donation limits (what percentage of each resource to share)
3. **Connect** - Connect to the P2P signaling network with a unique peer ID
4. **Share** - Your idle resources are made available to verified borrowers
5. **Borrow** - Request compute resources from available donors in the network

#### System Resource Detection

The component automatically detects:

| Resource | Detection Method |
|---|---|
| **CPU Cores** | `navigator.hardwareConcurrency` |
| **RAM** | `navigator.deviceMemory` API |
| **GPU** | WebGL2/WebGL `WEBGL_debug_renderer_info` extension |
| **Network** | `navigator.connection` API (downlink, RTT, effectiveType) |
| **Platform** | `navigator.platform` |

#### Donation Limits

Users can configure how much of each resource to share via sliders:

| Resource | Default | Range |
|---|---|---|
| **CPU** | 80% | 0-100% |
| **RAM** | 50% | 0-100% |
| **GPU** | 90% | 0-100% |

#### Features

- **Password Protection** - Cryptographically secure 16-character passwords for peer verification
- **Peer Verification** - Peers must be verified before resource sharing begins
- **Live Statistics** - Connected peers, tasks completed, uptime, CPU time shared
- **Activity Log** - Timestamped log of all events (connections, tasks, errors)
- **Peer Information** - Detailed info about connected peers and their resources
- **Start/Stop Controls** - Simple buttons to start donating or borrowing
- **Secure Random IDs** - Peer IDs generated using `crypto.getRandomValues()`

#### Security Features

- Maximum 50 peer connections (Vuln 52)
- Maximum 200 log entries to prevent memory leaks (Vuln 53)
- All timeouts tracked and cleaned up on unmount (Vuln 51)
- Cryptographically secure peer ID generation (Vuln 86)
- Double-click prevention on stop button (Vuln 64)

#### .CryptArt Data Payload (DonatePersonalSeconds)

```json
{
  "peerId": "ca-a1b2c3d4e5f6g7h8",
  "mode": "donating",
  "limits": { "cpuPercent": 80, "ramPercent": 50, "gpuPercent": 90 },
  "stats": { "uptime": 3600, "tasksCompleted": 42, "cpuTimeShared": 2880000 }
}
```

---

### Settings - Set

**Settings** is the centralized configuration hub for CryptArtist Studio. It manages
all API keys, AI model defaults, per-action model/mode routing, appearance preferences, data management, and
keyboard shortcuts.

#### Sidebar Navigation

| Section | Description |
|---|---|
| **API Keys** | Manage OpenAI, OpenRouter, Pexels, ElevenLabs, and GiveGigs API keys |
| **OpenRouter** | Configure OpenRouter key, global model/mode defaults, and per-action overrides |
| **Appearance** | Theme accent color, font family, font size |
| **Keyboard Shortcuts** | View all global keyboard shortcuts |
| **Data & Storage** | localStorage usage, clear data, reset settings |
| **About** | Version info, credits, and links |

#### API Key Management

All API keys are stored securely in the Rust backend state, never in frontend
localStorage. The Settings panel provides:

- **OpenAI Key** - For AI chat, image generation, TTS, and AI Studio
- **OpenRouter Key** - For access to 200+ AI models
- **Pexels Key** - For stock photo and video search
- **ElevenLabs Key** - For podcast voice generation, speech transcription, and sound effects
- **GiveGigs Config** - For media asset library access

Keys are masked in the UI (showing only the first 8 characters) and can be
toggled visible.

#### OpenRouter Configuration

- **Default Model** - `openai/gpt-5-mini` is the global default for all AI actions
- **Default AI Mode** - Global efficiency mode:
  - `💳 Cheap` - Minimize token usage and total cost
  - `⚡ Fast` - Prioritize quick completion
  - `🦄 Good` - Positive, clever, funny tone; serious code quality; goodness-oriented guidance
  - `🧠 Smart` - Default mode; highly intelligent and precise
- **Per-Action Defaults** - Configure model + mode for each action:
  - General AI chat, Media chat, Auto-edit planning
  - ValleyNet agent, Coding assistant/planner/review
  - Game generation, Demo narration, Commander chat/OpenRouter
- **Connection Test** - Verify OpenRouter key works with a live API call
- **Live Status** - Shows connected model and provider in the panel footer

#### Import/Export API Keys

Export all API keys to a `Forbidden-Secrets-of-CryptArtist-Keys-N.txt` file:

- File numbers auto-increment (1, 2, 3, ...)
- JSON format with all keys
- Warning header about sensitive data
- Import reads JSON and updates all keys in the backend

#### Data & Storage

- **localStorage Usage** - Visual display of storage used by CryptArtist
- **Per-Key Info** - See which localStorage keys exist and their sizes
- **Clear Specific Data** - Clear favorites, recent projects, launch counts, etc.
- **Danger Zone** - Reset all data, clear all localStorage, reset accent color

---

### Clone Tool - CLN

**Clone Tool** is an installer builder that creates platform-specific application
packages from your current CryptArtist Studio configuration.

#### Features

- **Multi-Platform Targets** - Build for Windows (.exe, .msi), macOS (.dmg, .app),
  Linux (.deb, .AppImage, .rpm), Android (.apk), and iOS (.ipa).
- **Five Configuration Tabs** - General (app name, version, author), Targets (platform
  selection), Window (dimensions, fullscreen, resizable), Includes (plugins, themes,
  mods, settings, API keys), and Build (progress, logs).
- **Custom Branding** - Upload custom app icons and splash screens with validation.
- **Build Source** - Clone from default config or current running config.
- **Include Options** - Optionally bundle plugins, themes, mods, settings, and API
  keys (with security warning for keys).
- **Code Signing** - Optional code signing, compression, and auto-update toggles.
- **Build Simulation** - Multi-stage build process with progress bar and detailed
  build log output.

#### .CryptArt Data Payload (Clone Tool)

```json
{
  "appName": "My Custom Studio",
  "targets": ["windows-exe", "linux-appimage"],
  "includePlugins": true,
  "includeThemes": true,
  "buildResults": [ ... ]
}
```

---

### DictatePic - D(pi)c

**DictatePic** is a professional image editor built on GIMP principles with integrated
AI features for generation, inpainting, upscaling, background removal, and style transfer.

#### Layout

The DictatePic window follows a classic image editor layout:

| Area | Position | Description |
|---|---|---|
| **Toolbox** | Left sidebar | 28 tools organized by group (selection, transform, paint, fill, retouch, AI, other) |
| **Canvas** | Center | Zoomable canvas with checkerboard transparency, rulers, and grid |
| **Layers Panel** | Right sidebar | Layer stack with visibility, lock, opacity, blend modes |
| **Properties** | Right sidebar (below layers) | Tool options, brush size, opacity, hardness, colors |
| **History** | Right sidebar (bottom) | Undo history with named entries |

#### Tools (28 Total)

| Group | Tools |
|---|---|
| **Selection** | Rectangle Select, Ellipse Select, Free Select (Lasso), Magic Wand |
| **Transform** | Move, Crop, Rotate, Scale, Flip |
| **Paint** | Paintbrush, Pencil, Eraser, Airbrush, Clone Stamp |
| **Fill** | Bucket Fill, Gradient |
| **Retouch** | Blur, Sharpen, Smudge, Dodge, Burn, Heal |
| **Other** | Text, Color Picker, Measure, Path/Bezier |
| **AI** | AI Generate, AI Inpaint, AI Upscale, AI Remove Background, AI Style Transfer |

#### Filters (16)

Gaussian Blur, Sharpen, Edge Detect, Emboss, Noise Reduction, Posterize, Threshold,
Invert Colors, Desaturate, Sepia, Levels, Curves, Hue/Saturation, Color Balance,
Brightness/Contrast, Unsharp Mask.

#### AI Features

- **AI Generate** - Generate images from text prompts via OpenAI/OpenRouter
- **AI Inpaint** - Fill selected areas with AI-generated content
- **AI Upscale** - Enhance image resolution using AI super-resolution
- **AI Remove Background** - Automatically remove image backgrounds
- **AI Style Transfer** - Apply artistic styles to images (photorealistic, anime,
  oil painting, watercolor, sketch, pixel art, cinematic, abstract)

#### Canvas Features

- **Zoom** - 10% to 800% zoom with scroll wheel support
- **Pan** - Click and drag to pan the canvas
- **Grid and Guides** - Toggleable grid overlay and snap-to-grid
- **Rulers** - Horizontal and vertical pixel rulers
- **Color Modes** - RGB, RGBA, Grayscale, Indexed
- **Bit Depths** - 8-bit, 16-bit, 32-bit
- **Blend Modes** - 15 blend modes (Normal, Multiply, Screen, Overlay, etc.)

#### .CryptArt Data Payload (DictatePic)

```json
{
  "canvasSize": { "w": 1920, "h": 1080 },
  "layers": [ ... ],
  "colorMode": "RGBA",
  "bitDepth": 8,
  "activeTool": "brush",
  "history": [ ... ]
}
```

---

### Luck Factory - Lck

**Luck Factory** is a unique AI seed generator that anchors CryptArtist Studio's
"Lucky" AI mode to a deterministic value derived from user-provided intentions.

#### How It Works

1. **Introduction** - The program explains the concept of anchoring AI operations
   to a cryptographic luck signature.
2. **Input** - The user enters any string (name, wish, mantra, emojis, Unicode text)
   to serve as their luck anchor.
3. **Meditation** - A guided meditation sequence plays seven affirmations while the
   luck score is computed, including:
   - "Centering the mind..."
   - "Aligning the cosmic probability vectors..."
   - "Breathing in fortune, exhaling uncertainty..."
   - "Tuning into the universal frequency of 777..."
   - "Manifesting serendipitous outcomes..."
4. **Result** - Three values are displayed:
   - **Base Score** (0-999) - Computed from the string hash
   - **Threshold Preset** (69, 420, or 777) - Based on base score range
   - **Final Seed** - Combined value used by the Lucky AI mode

#### Luck Presets

| Base Score Range | Preset | Meaning |
|---|---|---|
| 0-499 | 69 | Standard luck |
| 500-899 | 420 | Elevated luck |
| 900-999 | 777 | Maximum luck |

#### Integration

- The final luck seed is stored in `localStorage` as `cryptartist_lucky_seed`
- The luck string is stored as `cryptartist_lucky_string`
- All programs with the "Lucky" AI mode use this seed to influence AI prompts
- Luck Factory is automatically opened when a user selects the Lucky mode for
  the first time without an existing luck seed

#### .CryptArt Data Payload (Luck Factory)

```json
{
  "luckString": "To the moon",
  "baseLuck": 482,
  "presetLuck": 69,
  "finalLuck": 551
}
```

---

## Workspace Management

CryptArtist Studio supports opening multiple `.CryptArt` files simultaneously through
a workspace management system. This enables multi-project workflows, resource sharing
between projects, and side-by-side editing.

### Multi-File Workspaces

- **Open Multiple Files** - Use the "Open .CryptArt Files..." button in the Suite
  Launcher to open a multi-file dialog. Each file creates a separate workspace.
- **Workspace Bar** - A global tab bar appears above the main content area, showing
  all open workspaces with their names and program icons.
- **Switch Workspaces** - Click a tab to switch between open workspaces. The active
  workspace's project data loads into the appropriate program.
- **Context Menu** - Right-click a workspace tab for options: combine, share resources,
  duplicate, and close.
- **Maximum Workspaces** - Up to 20 workspaces can be open simultaneously.

### Workspace Groups and Resource Sharing

Workspaces can be combined into groups for resource sharing:

| Shared Resource | Description |
|---|---|
| **Media** | Share media pools between projects |
| **AI Context** | Share AI conversation context and history |
| **Settings** | Share configuration settings |
| **Files** | Share file references |
| **Chat History** | Share chat conversation history |

Groups are created by right-clicking a workspace tab and selecting "Combine".
Within a group, each member can selectively share resources with other members.

### Integration with Programs

All programs use the workspace system:

- **Mount/Switch** - Programs load active workspace data when mounted or when the
  active workspace changes
- **Multi-File Open** - Programs can open files into new workspaces via the dialog
- **Save Integration** - Programs call `updateProject()`, `updateFilePath()`, and
  `markClean()` on the workspace context when saving

### Architecture

| File | Purpose |
|---|---|
| `src/utils/workspace.ts` | Types, context, and helper functions |
| `src/components/WorkspaceProvider.tsx` | React state provider with CRUD and group logic |
| `src/components/WorkspaceBar.tsx` | Global tab bar UI with context menu |

---

## Cross-Program Interoperability

CryptArtist Studio features a comprehensive interoperability layer that enables all
programs in the suite to communicate, share data, and chain workflows together. This
is the backbone that makes the suite feel like one unified application rather than
separate tools.

### 1. Event Bus (`src/utils/interop.ts`)

A global pub/sub event bus that enables real-time communication between programs.
Programs can emit events and subscribe to events from other programs.

**Event Categories:**
- **Media events** - `media:exported`, `media:imported`, `media:image-generated`, `media:audio-generated`
- **Code events** - `code:file-saved`, `code:file-opened`, `code:snippet-created`, `code:project-opened`
- **Game events** - `game:asset-imported`, `game:script-generated`, `game:scene-created`, `game:clone-started`
- **Recording events** - `recording:started`, `recording:stopped`, `recording:exported`
- **Agent events** - `agent:task-started`, `agent:task-completed`, `agent:task-failed`
- **AI events** - `ai:response-received`, `ai:model-changed`, `ai:key-updated`
- **Workspace events** - `workspace:opened`, `workspace:closed`, `workspace:saved`
- **Pipeline events** - `pipeline:step-completed`, `pipeline:finished`, `pipeline:failed`
- **Clipboard events** - `clipboard:copied`, `clipboard:pasted`
- **Navigation events** - `nav:program-switched`, `nav:requested`
- **System events** - `system:theme-changed`, `system:settings-updated`, `system:notification`

**Usage in programs:**
```tsx
// Subscribe to events
useInterop("media:exported", (event) => {
  console.log("Media from", event.source, event.data);
}, { target: "game-studio" });

// Emit events
const emit = useInteropEmit("media-mogul");
emit("media:exported", { path: "/sprites/hero.png", type: "image" });

// Request-response pattern
const response = await interopBus.request(
  "agent:task-started", "game-studio", { task: "Generate GDScript" },
  "agent:task-completed", "valley-net"
);
```

**Cross-program event flows:**
- **VibeCodeWorker -> GameStudio** - GDScript snippets are received and displayed in GameStudio's terminal and AI chat
- **MediaMogul -> GameStudio** - Exported media assets appear in GameStudio's asset import queue
- **ValleyNet -> Any Program** - Agent task requests can be sent to ValleyNet from any program
- **All Programs -> System** - Save events, AI responses, and errors are broadcast globally

### 2. Shared API Key Context (`src/utils/apiKeys.ts` + `src/components/ApiKeyProvider.tsx`)

Centralized API key management that loads all keys from the Rust backend once at app
startup and shares them via React context. Eliminates redundant `invoke("get_api_key")`
calls in every program.

**Supported keys:** OpenAI, OpenRouter, Pexels, Supabase/GiveGigs, ElevenLabs

**Features:**
- Single load on app startup via `ApiKeyProvider`
- Auto-refresh when any key is updated from Settings
- `useApiKeys()` hook provides `openaiKey`, `openrouterKey`, `pexelsKey`, `supabaseKey`, `elevenlabsKey`
- `hasKey("openai")` check for conditional feature rendering
- `getKeyStatus()` returns a map of all key availability
- `ai:key-updated` event broadcast when keys change

### 3. Cross-Program Clipboard (`src/utils/crossClipboard.ts`)

A universal clipboard that can transfer media, code snippets, files, and other data
between programs with rich metadata about source, content type, and transfer context.

**Content types:** `text`, `code`, `image`, `audio`, `video`, `file-path`, `media-asset`,
`gdscript`, `scene-tree`, `ai-prompt`, `ai-response`, `recording`, `sprite`, `texture`,
`project-data`, `terminal-output`, `custom`

**Features:**
- 50-entry clipboard history
- Type-filtered paste (e.g., paste only code, only images)
- Program-aware content compatibility checks
- Automatic interop bus notifications on copy/paste
- `useCrossClipboard("program-id")` hook for easy integration

**Program compatibility matrix:**

| Content Type | MMo | VCW | GSt | VNt | DRe | CAC |
|---|---|---|---|---|---|---|
| code | | X | X | X | | X |
| gdscript | | X | X | | | |
| image | X | | X | | | |
| audio | X | | | | X | |
| video | X | | | | X | |
| sprite/texture | X | | X | | | |
| ai-prompt | | | | X | | X |
| terminal-output | | X | | X | | X |
| file-path | X | X | X | | X | X |

### 4. Program Pipeline System (`src/utils/pipeline.ts`)

Defines reusable workflows that chain operations across multiple programs. Pipelines
are sequences of steps, each handled by a specific program, with automatic progression
and failure handling.

**Built-in pipelines:**

| Pipeline | Steps | Description |
|---|---|---|
| Media to Game Asset | MMo -> GSt | Export media from Media Mogul, import as game asset |
| AI Code to Game Script | VCW -> GSt | Generate code in VibeCodeWorker, apply as GDScript |
| Record and Narrate | DRe -> DRe -> MMo | Record screen, export, add AI narration |
| Agent Full-Stack Build | VNt -> VCW -> GSt | Agent plans feature, code generates, game integrates |
| Video Game Clone Pipeline | VNt -> MMo -> VCW -> GSt | Research, generate assets, write code, build project |
| AI Podcast Pipeline | VNt -> MMo -> MMo | Write script, TTS voiceover, add SFX |

**Features:**
- Start, advance, fail, cancel pipeline runs
- Optional steps that can be skipped on failure
- 20-run history
- Custom pipeline registration via `pipelineRunner.register()`
- Pipeline events broadcast via interop bus
- Input/output chaining between steps

### 5. Unified Notification Hub (`src/utils/notifications.ts`)

Central notification system for all programs with priorities, categories, grouping,
and cross-program routing.

**Notification levels:** `info`, `success`, `warning`, `error`, `critical`
**Categories:** `ai`, `media`, `code`, `game`, `recording`, `agent`, `system`, `pipeline`, `security`, `update`, `donation`

**Features:**
- 100-notification history
- Read/unread tracking
- Auto-dismiss with configurable timeout
- Group key for collapsing similar notifications
- Optional action buttons and navigation targets
- `subscribe()` for real-time notification handling
- Convenience functions: `notifyInfo()`, `notifySuccess()`, `notifyWarning()`, `notifyError()`, `notifyAI()`, `notifyPipeline()`

### Interoperability Architecture

| File | Purpose |
|---|---|
| `src/utils/interop.ts` | Cross-program event bus (pub/sub) with React hooks |
| `src/utils/apiKeys.ts` | Shared API key types, context, and backend loaders |
| `src/components/ApiKeyProvider.tsx` | React provider that loads keys once at startup |
| `src/utils/crossClipboard.ts` | Cross-program clipboard with type-aware routing |
| `src/utils/pipeline.ts` | Multi-program workflow pipeline system |
| `src/utils/notifications.ts` | Unified notification hub with categories and grouping |

### Integration Status

All eleven programs are integrated with the interoperability layer:

| Program | useApiKeys | useInteropEmit | useCrossClipboard | useInterop (listen) | Save Events | AI Events |
|---|---|---|---|---|---|---|
| Media Mogul [MMo] | X | X | X | - | X | X |
| VibeCodeWorker [VCW] | X | X | X | - | X | X |
| GameStudio [GSt] | X | X | X | code:snippet-created, media:exported | X | X |
| ValleyNet [VNt] | X | X | X | agent:task-started | X | X |
| DemoRecorder [DRe] | X | X | X | - | X | - |
| CryptArt Commander [CAC] | X | X | - | - | - | X |
| DonatePersonalSeconds [DPS] | - | X | - | - | - | - |
| Clone Tool [CLN] | - | X | - | - | - | - |
| DictatePic [D(pi)c] | X | X | - | - | - | X |
| Luck Factory [Lck] | - | - | - | - | - | - |
| Settings [Set] | X | X | - | ai:key-updated | - | X |

---

## Plugin, Mod, and Theme System

CryptArtist Studio includes a full extension system for plugins, mods, and themes.
All three are distributed as ZIP files with a `manifest.json` inside.

### Plugins

Plugins extend existing programs with new features. They are managed by the
**Plugin Manager** (`src/components/PluginManager.tsx`) and the plugin system
(`src/utils/plugins.ts`).

| Field | Description |
|---|---|
| `id` | Unique plugin identifier (e.g., `com.example.my-plugin`) |
| `name` | Display name |
| `version` | Semver version string |
| `author` | Plugin author |
| `description` | Short description |
| `targetProgram` | Which program this plugin extends |
| `entryPoint` | Main script file inside the ZIP |
| `permissions` | Requested capabilities (filesystem, network, ai, etc.) |

Plugins are installed from ZIP files via Settings > Plugins, stored in localStorage,
and loaded on program startup.

### Mods

Mods are self-contained mini-programs that appear as launchable entries in the
Suite Launcher. They are managed by the **Mod Manager** (`src/components/ModManager.tsx`)
and the mod system (`src/utils/mods.ts`).

| Field | Description |
|---|---|
| `id` | Unique mod identifier |
| `name` | Display name shown in Suite Launcher |
| `emoji` | Emoji icon for the launcher card |
| `code` | Short 3-letter code |
| `description` | One-line description |
| `gradient` | CSS gradient for the launcher card |
| `component` | Main React component file |

Built-in program IDs (`media-mogul`, `vibecode-worker`, etc.) are reserved and
cannot be overridden by mods.

### Themes

Themes change the visual appearance of the entire application. They are managed by
the **Theme Manager** (`src/components/ThemeManager.tsx`) and the theme system
(`src/utils/themes.ts`).

#### Built-in Themes

| Theme | Description |
|---|---|
| **Primordial** | The default dark theme with deep navy/purple tones |
| **Blank** | A minimal, clean dark theme with reduced visual noise |

#### Custom Themes

Custom themes are ZIP files containing a `manifest.json` and a `theme.css` file.
The CSS file uses CSS custom properties to override the default theme tokens:

```css
:root {
  --studio-bg: #0a0a0f;
  --studio-panel: #12121a;
  --studio-surface: #1a1a2e;
  --studio-border: #2a2a3e;
  --studio-text: #e0e0e8;
  --studio-accent: #00d4ff;
  /* ... additional tokens ... */
}
```

#### Theme Features

- **Live Preview** - Preview themes before applying
- **Theme Creator** - Built-in editor for creating custom themes
- **Export** - Export custom themes as ZIP files for sharing
- **CSS Variables** - Full control over colors, fonts, spacing, and effects
- **Animation Control** - `body.no-animations` class disables all animations
- **Scrollbar Control** - `body.scrollbar-hidden` class hides scrollbars

---

## The .CryptArt File Format

The `.CryptArt` file format is the universal project file for all CryptArtist Studio
programs. It is a JSON file with the extension `.CryptArt` and the registered MIME type
`application/x-cryptartist-art`. The OS file type description is "CryptArtist Art".

### Design Goals

The `.CryptArt` format was designed with one overriding goal: **it must never need a
base format upgrade**. The envelope schema is stable forever. Any `.CryptArt` file ever
created will always be readable by any version of CryptArtist Studio.

1. **Permanent Envelope** - The envelope schema (`$cryptart`, `program`, `data`) never changes.
2. **Universal Readability** - Any `.CryptArt` file from any version is always parseable.
3. **Additive Only** - New fields and capabilities are added without breaking old files.
4. **Self-Identifying** - The `$cryptart` magic key identifies the file and its envelope version.
5. **Open Program IDs** - Any string is a valid program ID. No closed union types.
6. **Rich Metadata** - Optional metadata for author, description, tags, thumbnails, and more.
7. **Extensible** - The `extensions` section allows future plugin data.
8. **Auditable** - The `history` array tracks edit actions with timestamps.

### Compatibility Contract

| Rule | Description |
|---|---|
| **Readers MUST** | Ignore unknown top-level keys |
| **Readers MUST NOT** | Fail if optional keys are missing |
| **Writers MUST** | Always include the 3 required keys |
| **Writers SHOULD** | Preserve unknown keys when re-saving a file |

### Required Fields

These are the only three fields that **MUST** exist in every `.CryptArt` file:

| Field | Type | Description |
|---|---|---|
| `$cryptart` | `1` (number) | Magic key. Identifies the file AND its envelope version. Always `1`. |
| `program` | `string` | Free-form string identifying which program created the file. |
| `data` | `object` | Program-specific payload. Opaque to the envelope. |

### Recommended Fields

Written by default when creating a new file, but not required for parsing:

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Human-readable project name |
| `createdAt` | `string` | ISO-8601 creation timestamp |
| `updatedAt` | `string` | ISO-8601 last-save timestamp |
| `appVersion` | `string` | Version of CryptArtist Studio that wrote the file |

### Optional Fields

All optional fields are designed so that omitting them has no effect on functionality.
They exist for richer workflows:

#### Identity and Sync

| Field | Type | Description |
|---|---|---|
| `id` | `string` | UUID for deduplication and cloud sync |
| `parentId` | `string` | UUID of the parent file (for forks/branches) |
| `source` | `string` | Origin URL or file path |

#### Meta Object

The `meta` field is an object with the following optional properties:

| Field | Type | Description |
|---|---|---|
| `meta.author` | `string` | Author name |
| `meta.email` | `string` | Contact email |
| `meta.organization` | `string` | Organization name |
| `meta.website` | `string` | Website URL (default: `https://mattyjacks.com`) |
| `meta.repository` | `string` | Source code repository URL |
| `meta.description` | `string` | Project description |
| `meta.readme` | `string` | Inline readme or path to readme file |
| `meta.tags` | `string[]` | Categorization tags |
| `meta.keywords` | `string[]` | Search keywords |
| `meta.category` | `string` | Project category |
| `meta.license` | `string` | License identifier (e.g., "MIT") |
| `meta.copyright` | `string` | Copyright notice |
| `meta.rating` | `string` | Content rating |
| `meta.thumbnail` | `string` | Thumbnail image URL or base64 |
| `meta.preview` | `string` | Preview image URL or base64 |
| `meta.icon` | `string` | Custom icon URL or base64 |
| `meta.color` | `string` | Accent color for UI (hex) |
| `meta.collaborators` | `string[]` | List of collaborator names/emails |
| `meta.fileCount` | `number` | Number of files in the project |
| `meta.duration` | `number` | Duration in seconds (for time-based projects) |
| `meta.resolution` | `string` | Resolution string (e.g., "1920x1080") |
| `meta.language` | `string` | Primary programming language |
| `meta.locale` | `string` | Content locale (e.g., "en-US") |

The `meta` object also accepts any additional key-value pairs via an open index
signature, so custom metadata is always preserved.

#### Project Structure

| Field | Type | Description |
|---|---|---|
| `dependencies` | `array` | Array of `{ name, version?, type? }` dependency objects |
| `environment` | `object` | `{ os?, arch?, runtime?, runtimeVersion? }` |

#### Integrity

| Field | Type | Description |
|---|---|---|
| `checksum` | `string` | SHA-256 hash of the `data` section |
| `encryption` | `string` | Encryption algorithm used, if any |
| `compression` | `string` | Compression algorithm used, if any |

#### Compatibility

| Field | Type | Description |
|---|---|---|
| `minAppVersion` | `string` | Minimum app version required to read this file |
| `maxAppVersion` | `string` | Maximum app version known to work |
| `compatibility` | `string[]` | Array of compatible reader identifiers |

#### Audit Trail

| Field | Type | Description |
|---|---|---|
| `history` | `array` | Array of `{ timestamp, action, detail?, user? }` entries |

#### Extensibility

| Field | Type | Description |
|---|---|---|
| `extensions` | `object` | `Record<string, unknown>` for plugin data |
| `plugins` | `string[]` | Array of plugin identifiers used |
| `schemas` | `object` | Map of data key to JSON Schema URL for validation |

#### Export and Sharing

| Field | Type | Description |
|---|---|---|
| `exportedAt` | `string` | ISO-8601 timestamp of last export |
| `exportedBy` | `string` | Who or what exported the file |
| `exportFormat` | `string` | Target format of export |
| `shareUrl` | `string` | Public sharing URL |

### Backward Compatibility

The parser handles all historical `.CryptArt` file versions:

1. **Pre-v1 files** (no `$cryptart` key) are auto-upgraded in memory on parse.
2. The old `version` field is silently migrated to `appVersion`.
3. Missing `data` defaults to `{}`.
4. Unknown keys are preserved on re-save, never discarded.
5. The `program` field was originally a closed union type; it is now an open string.

### Known Program IDs

| Program ID | Program Name |
|---|---|
| `media-mogul` | Media Mogul |
| `vibecode-worker` | VibeCodeWorker |
| `demo-recorder` | DemoRecorder |
| `valley-net` | ValleyNet |
| `game-studio` | GameStudio |
| `commander` | CryptArt Commander |
| `donate-personal-seconds` | DonatePersonalSeconds |
| `clone-tool` | Clone Tool |
| `dictate-pic` | DictatePic |
| `luck-factory` | Luck Factory |
| `settings` | Settings |

Any string is valid as a program ID. Third-party programs can use their own IDs
(e.g., `my-custom-tool`) without any changes to the format.

### Example: Minimal .CryptArt File

```json
{
  "$cryptart": 1,
  "program": "media-mogul",
  "data": {}
}
```

### Example: Full .CryptArt File

```json
{
  "$cryptart": 1,
  "program": "vibecode-worker",
  "name": "My Web App",
  "createdAt": "2026-03-13T17:00:00.000Z",
  "updatedAt": "2026-03-13T18:30:00.000Z",
  "appVersion": "0.1.0",
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "meta": {
    "author": "Matt",
    "email": "Matt@MattyJacks.com",
    "website": "https://mattyjacks.com",
    "description": "A full-stack web application",
    "tags": ["typescript", "react", "tauri"],
    "license": "MIT",
    "category": "web-development",
    "language": "typescript"
  },
  "environment": {
    "os": "windows",
    "arch": "x86_64",
    "runtime": "tauri",
    "runtimeVersion": "2.2.0"
  },
  "history": [
    {
      "timestamp": "2026-03-13T17:00:00.000Z",
      "action": "created",
      "user": "Matt"
    },
    {
      "timestamp": "2026-03-13T18:30:00.000Z",
      "action": "saved",
      "detail": "Added authentication module"
    }
  ],
  "data": {
    "rootPath": "/home/matt/projects/webapp",
    "openFiles": [
      { "path": "/home/matt/projects/webapp/src/App.tsx", "name": "App.tsx" }
    ],
    "activeFile": "/home/matt/projects/webapp/src/App.tsx",
    "aiProvider": "openai",
    "model": "gpt-4o"
  }
}
```

### Example: Legacy Pre-v1 File (Still Readable)

```json
{
  "program": "media-mogul",
  "version": "0.1.0",
  "name": "Old Project",
  "createdAt": "2026-03-01T12:00:00.000Z",
  "updatedAt": "2026-03-01T12:00:00.000Z",
  "data": {}
}
```

This file has no `$cryptart` key. The parser will:
1. Add `$cryptart: 1` in memory
2. Migrate `version` to `appVersion`
3. Return a valid `CryptArtFile` object

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3.x | UI component framework |
| **TypeScript** | 5.7.x | Type-safe JavaScript |
| **Vite** | 6.0.x | Build tool and dev server |
| **TailwindCSS** | 3.4.x | Utility-first CSS framework |
| **React Router** | 7.13.x | Client-side routing between programs |
| **Monaco Editor** | 4.7.x | Code editor engine (VS Code core) |
| **Tauri API** | 2.2.x | IPC bridge to Rust backend |
| **Tauri Dialog Plugin** | 2.6.x | Native file open/save dialogs |
| **Tauri Shell Plugin** | 2.2.x | Shell command execution |

### Backend (Rust)

| Crate | Version | Purpose |
|---|---|---|
| **tauri** | 2.x | Desktop application framework |
| **serde** | 1.x | Serialization/deserialization |
| **serde_json** | 1.x | JSON parsing and generation |
| **tokio** | 1.x | Async runtime |
| **reqwest** | 0.12.x | HTTP client for API calls |
| **clap** | 4.6.x | CLI argument parsing |
| **tiny_http** | 0.12.x | Lightweight HTTP server for REST API |
| **sha2** | 0.10.x | SHA-256 hashing (FFmpeg verification) |
| **dirs** | 5.x | OS-specific directory paths |
| **zip** | 2.x | Archive extraction (FFmpeg download) |
| **chrono** | 0.4.x | Date/time handling |
| **uuid** | 1.x | UUID generation |
| **base64** | 0.22.x | Base64 encoding/decoding |
| **futures-util** | 0.3.x | Async stream utilities |

### Media Engine

| Tool | Purpose |
|---|---|
| **FFmpeg** | Video/audio encoding, decoding, transcoding, and processing |
| **FFprobe** | Media file analysis and metadata extraction |
| **Godot Engine** | Game engine integration (GameStudio program) |

FFmpeg and FFprobe are automatically downloaded on first run. The installer detects
the user's operating system and architecture, downloads the appropriate binaries,
verifies their SHA-256 checksums, and stores them in the local AppData directory.

### Build System

| Tool | Purpose |
|---|---|
| **Vite** | Frontend bundling and hot module replacement |
| **tsc** | TypeScript type checking |
| **Cargo** | Rust compilation and dependency management |
| **Tauri CLI** | Application packaging and distribution |
| **PostCSS** | CSS processing pipeline |
| **Autoprefixer** | CSS vendor prefix automation |

---

## Project Architecture

### Directory Structure

```
CryptArtistStudio/
|
|-- README.md                              # This file
|-- .gitignore                             # Git ignore rules
|
|-- prompts/                               # Documentation of all AI prompts used
|   |-- all-prompts.md                     # Complete prompt history
|   |-- bigprompt-2.md                     # Suite refactor mega-prompt
|
|-- v1/                                    # Main application source
    |
    |-- package.json                       # Node.js dependencies and scripts
    |-- tsconfig.json                      # TypeScript configuration
    |-- vite.config.ts                     # Vite build configuration
    |-- tailwind.config.js                 # TailwindCSS theme and plugins
    |-- postcss.config.js                  # PostCSS pipeline
    |-- index.html                         # HTML entry point
    |
    |-- src/                               # Frontend source code
    |   |
    |   |-- main.tsx                       # React entry point + logger init
    |   |-- App.tsx                        # Root component + router
    |   |-- index.css                      # Global styles + TailwindCSS
    |   |-- vite-env.d.ts                  # Vite type declarations
    |   |
    |   |-- components/                    # Shared UI components
    |   |   |-- AIStudio.tsx               # AI-powered video generation
    |   |   |-- ApiKeyProvider.tsx          # Shared API key React context provider
    |   |   |-- ErrorBoundary.tsx          # React error boundary
    |   |   |-- FFmpegSetup.tsx            # FFmpeg download progress UI
    |   |   |-- GlobalMenuBar.tsx          # Desktop/mobile menu bar (File, Edit, View...)
    |   |   |-- Header.tsx                 # Media Mogul header with workspace tabs
    |   |   |-- Inspector.tsx              # Property inspector panel
    |   |   |-- LoadingSpinner.tsx         # Loading animation component
    |   |   |-- MediaBrowser.tsx           # Media pool + Pexels integration
    |   |   |-- MobileNav.tsx              # Mobile-responsive navigation
    |   |   |-- ModManager.tsx             # Mod installation and management UI
    |   |   |-- NodeEditor.tsx             # Node-based compositing editor
    |   |   |-- PluginManager.tsx          # Plugin installation and management UI
    |   |   |-- PreviewCanvas.tsx          # Video preview viewport
    |   |   |-- SettingsModal.tsx          # Global settings with API keys
    |   |   |-- SuiteLauncher.tsx          # Main launcher with program cards
    |   |   |-- TermsAcceptanceModal.tsx   # Privacy policy + terms acceptance
    |   |   |-- ThemeManager.tsx           # Theme browsing, install, and creation UI
    |   |   |-- Timeline.tsx               # Multi-track video timeline
    |   |   |-- WorkspaceBar.tsx           # Workspace tab bar with context menu
    |   |   |-- WorkspaceProvider.tsx      # Workspace state management provider
    |   |
    |   |-- programs/                      # Individual program views
    |   |   |-- media-mogul/
    |   |   |   |-- MediaMogul.tsx         # Media Mogul main component
    |   |   |-- vibecode-worker/
    |   |   |   |-- VibeCodeWorker.tsx     # VibeCodeWorker IDE component
    |   |   |-- demo-recorder/
    |   |   |   |-- DemoRecorder.tsx       # DemoRecorder main component
    |   |   |-- valley-net/
    |   |   |   |-- ValleyNet.tsx          # ValleyNet AI agent component
    |   |   |-- game-studio/
    |   |   |   |-- GameStudio.tsx         # GameStudio main component
    |   |   |-- commander/
    |   |   |   |-- Commander.tsx          # CryptArt Commander terminal
    |   |   |-- donate-personal-seconds/
    |   |   |   |-- DonatePersonalSeconds.tsx  # P2P compute resource sharing
    |   |   |   |-- DPSLeaderboard.tsx         # Leaderboard for donated seconds
    |   |   |-- clone-tool/
    |   |   |   |-- CloneTool.tsx          # Installer builder for all platforms
    |   |   |-- dictate-pic/
    |   |   |   |-- DictatePic.tsx         # GIMP-style AI image editor
    |   |   |-- luck-factory/
    |   |   |   |-- LuckFactory.tsx        # AI luck seed generator
    |   |   |-- settings/
    |   |       |-- Settings.tsx           # Settings hub with API keys
    |   |
    |   |-- pages/                         # Static pages
    |   |   |-- PrivacyPolicy.tsx          # Privacy policy page
    |   |   |-- TermsOfUse.tsx             # Terms of use page
    |   |
    |   |-- utils/                         # Utility modules
    |       |-- apiKeys.ts                 # Shared API key context and loaders
    |       |-- audio-zip.ts               # ZIP audio import with security checks
    |       |-- constants.ts               # Shared constants and type definitions
    |       |-- cross-platform.ts          # Platform detection, capabilities, safe areas
    |       |-- crossClipboard.ts          # Cross-program clipboard with type routing
    |       |-- cryptart.ts                # .CryptArt file format (permanent schema)
    |       |-- debounce.ts                # Debounce utility
    |       |-- extensions.ts              # Shared extension manifest types (plugin/mod/theme)
    |       |-- formatters.ts              # Number/date/size formatting
    |       |-- hooks.ts                   # Shared React hooks library (17 hooks)
    |       |-- interop.ts                 # Cross-program event bus (pub/sub)
    |       |-- keyboard.ts                # Global keyboard shortcuts
    |       |-- logger.ts                  # Frontend logging (sends to Rust)
    |       |-- luckyRNG.ts                # Seeded PRNG for Lucky AI mode (xmur3 + mulberry32)
    |       |-- mods.ts                    # Mod system - self-contained programs
    |       |-- notifications.ts           # Unified notification hub
    |       |-- openrouter.ts              # OpenRouter multi-model AI utility
    |       |-- pipeline.ts                # Cross-program workflow pipelines
    |       |-- platform.ts                # Platform detection + mobile viewport
    |       |-- plugins.ts                 # Plugin system with ZIP install
    |       |-- security.ts                # Security helpers (150+ functions)
    |       |-- storage.ts                 # LocalStorage wrapper (validated)
    |       |-- themes.ts                  # Theme system (Primordial, Blank, custom)
    |       |-- toast.ts                   # Toast notification system (rate-limited)
    |       |-- workspace.ts               # Workspace types, context, helpers
    |
    |-- src-tauri/                          # Rust backend
        |
        |-- Cargo.toml                     # Rust dependencies
        |-- tauri.conf.json                # Tauri window/bundle configuration
        |-- build.rs                       # Tauri build script
        |
        |-- src/
        |   |-- main.rs                    # Entry point: CLI, Tauri commands, REST API
        |   |-- state.rs                   # Application state management
        |   |-- ai_integration.rs          # OpenAI API integration
        |   |-- ffmpeg_installer.rs        # FFmpeg auto-download + verification
        |   |-- logger.rs                  # Logging system (3 log files)
        |
        |-- icons/                         # Application icons for all platforms
            |-- 32x32.png
            |-- 128x128.png
            |-- 128x128@2x.png
            |-- icon.icns                  # macOS icon
            |-- icon.ico                   # Windows icon
|
|-- website/                              # Companion marketing website
    |-- A1/                               # Version 1 of the website
        |-- index.html                    # Landing page
        |-- programs.html                 # Program details page
        |-- about.html                    # About / philosophy page
        |-- docs.html                     # Documentation page
        |-- download.html                 # Download page
        |-- contact.html                  # Contact page
        |-- privacy.html                  # Privacy policy page
        |-- terms.html                    # Terms of use page
        |-- donate-personal-seconds.html  # P2P resource sharing page
        |-- style.css                     # Full dark theme stylesheet
        |-- script.js                     # Navigation, animations, interactions
        |-- donate-personal-seconds.js    # DonatePersonalSeconds UI controller
        |-- donate-personal-seconds-api.js # P2P resource sharing API
```

### Frontend Architecture

The frontend follows a clean layered architecture:

```
main.tsx                        # Entry point - initializes logger, renders App
  |
  App.tsx                       # Router + terms gate + ErrorBoundary
    |
    WorkspaceProvider           # Multi-file workspace state
      ApiKeyProvider            # Shared API keys loaded once
        GlobalMenuBar           # Desktop/mobile menu bar
        WorkspaceBar            # Workspace tabs
        |
        |-- SuiteLauncher       # "/" - Program selection grid
        |-- MediaMogul          # "/media-mogul" - Video/image editor
        |-- VibeCodeWorker      # "/vibecode-worker" - Code IDE
        |-- DemoRecorder        # "/demo-recorder" - Screen recorder
        |-- ValleyNet           # "/valley-net" - AI agent
        |-- GameStudio          # "/game-studio" - Game development
        |-- Commander           # "/commander" - Terminal command center
        |-- Settings            # "/settings" - API keys, themes, plugins
        |-- DonatePersonalSeconds # "/donate-personal-seconds" - P2P compute
        |-- DPSLeaderboard      # "/dps-leaderboard" - Donation leaderboard
        |-- CloneTool           # "/clone-tool" - Installer builder
        |-- LuckFactory         # "/luck-factory" - AI luck seed generator
        |-- DictatePic          # "/dictate-pic" - AI image editor
        |-- PrivacyPolicy       # "/privacy" - Privacy policy
        |-- TermsOfUse          # "/terms" - Terms of use
        |-- NotFound            # "*" - 404 page
        |
        MobileNav               # Bottom nav for mobile/tablet
```

Each program is a self-contained React component that manages its own state.
Programs communicate with the Rust backend through Tauri's `invoke()` IPC mechanism,
and with each other through the interop event bus (`src/utils/interop.ts`).

### Backend Architecture

The Rust backend (`main.rs`) is organized into three execution modes:

1. **GUI Mode** (default) - Starts the Tauri application with all registered commands.
2. **CLI Mode** - Parses command-line arguments via Clap and executes headless.
3. **Server Mode** - Starts a REST API server on a configurable port.

#### Rust Source Files

| File | Lines | Purpose |
|---|---|---|
| `main.rs` | ~1,400 | CLI parsing, Tauri commands, REST API server |
| `state.rs` | ~300 | Application state: API keys, FFmpeg paths, project data |
| `ai_integration.rs` | ~160 | OpenAI API chat completion wrapper |
| `ffmpeg_installer.rs` | ~220 | OS-aware FFmpeg download, extraction, verification |
| `logger.rs` | ~280 | Thread-safe logging with 3 rolling files |

#### Tauri Commands (IPC)

The backend exposes the following Tauri commands to the frontend via `invoke()`:

##### FFmpeg Commands

| Command | Parameters | Returns | Description |
|---|---|---|---|
| `check_ffmpeg_installed` | none | `bool` | Check if FFmpeg binary exists and is executable |
| `install_ffmpeg` | none | `string` | Download, verify, and install FFmpeg; returns install path |

##### AI Commands

| Command | Parameters | Returns | Description |
|---|---|---|---|
| `ai_chat` | `{ message: string }` | `string` | Send a chat completion request to OpenAI |
| `ai_generate_image` | `{ prompt: string }` | `string` | Generate an image via DALL-E; returns URL |
| `ai_generate_tts` | `{ text: string }` | `string` | Generate OpenAI TTS audio and return saved file path |
| `openrouter_chat` | `{ message: string, model: string }` | `string` | Chat via OpenRouter with model selection |
| `openrouter_list_models` | none | `string` | List available OpenRouter models (JSON) |
| `elevenlabs_text_to_speech` | `{ text: string, voiceId: string, modelId?: string }` | `string` | Generate ElevenLabs voiceover and return saved file path |
| `elevenlabs_speech_to_text` | `{ filePath: string, modelId?: string, languageCode?: string }` | `string` | Transcribe audio via ElevenLabs STT |
| `elevenlabs_generate_sound_effect` | `{ prompt: string, durationSeconds?: number }` | `string` | Generate sound effect audio via ElevenLabs |
| `elevenlabs_list_voices` | none | `string` | List available ElevenLabs voices (JSON) |
| `elevenlabs_list_models` | none | `string` | List available ElevenLabs models (JSON) |

##### API Key Commands

| Command | Parameters | Returns | Description |
|---|---|---|---|
| `get_api_key` | none | `string` | Retrieve the stored OpenAI API key |
| `set_api_key` | `{ key: string }` | `()` | Store an OpenAI API key (validated, max 512 chars) |
| `get_pexels_key` | none | `string` | Retrieve the stored Pexels API key |
| `set_pexels_key` | `{ key: string }` | `()` | Store a Pexels API key |
| `get_openrouter_key` | none | `string` | Retrieve the stored OpenRouter API key |
| `save_openrouter_key` | `{ key: string }` | `()` | Store an OpenRouter API key |
| `get_elevenlabs_key` | none | `string` | Retrieve the stored ElevenLabs API key |
| `save_elevenlabs_key` | `{ key: string }` | `()` | Store an ElevenLabs API key |
| `export_all_api_keys` | none | `string` | Export all keys as JSON string |
| `import_all_api_keys` | `{ json: string }` | `()` | Import keys from JSON (max 10 MB) |

##### Filesystem Commands

| Command | Parameters | Returns | Description |
|---|---|---|---|
| `read_directory` | `{ path: string }` | `DirEntry[]` | List directory with name, path, is_dir, size |
| `read_text_file` | `{ path: string }` | `string` | Read file contents (max 50 MB) |
| `write_text_file` | `{ path, content: string }` | `()` | Write content to file (max 100 MB, path sanitized) |

##### GiveGigs Commands

| Command | Parameters | Returns | Description |
|---|---|---|---|
| `set_givegigs_config` | `{ url, key, bucket: string }` | `()` | Configure GiveGigs Supabase connection |
| `get_givegigs_config` | none | `GiveGigsConfig` | Retrieve stored GiveGigs configuration |
| `list_givegigs_media` | `{ folder: string }` | `string` | List media files from GiveGigs bucket |

##### Godot Commands

| Command | Parameters | Returns | Description |
|---|---|---|---|
| `godot_detect` | none | `{ found: bool }` | Auto-detect Godot engine installation |
| `install_godot` | none | `string` | Download and install Godot engine |
| `launch_godot` | `{ path: string }` | `()` | Launch Godot with a project file (path sanitized) |
| `get_godot_path` | none | `string` | Get the configured Godot binary path |

##### Platform and System Commands

| Command | Parameters | Returns | Description |
|---|---|---|---|
| `get_platform_info` | none | `PlatformInfo` | OS, arch, home dir, available memory |
| `health_check` | none | `HealthStatus` | Application health: FFmpeg, Godot, API keys |

##### Logging Commands

| Command | Parameters | Returns | Description |
|---|---|---|---|
| `log_from_frontend` | `{ level, message: string }` | `()` | Forward frontend log to Rust logger |
| `get_log_session` | none | `string[]` | Get last 100 lines (session log) |
| `get_log_recent` | none | `string[]` | Get last 1,000 lines (recent log) |
| `get_log_paths` | none | `LogPaths` | Get absolute paths to all 3 log files |

### State Management

The Rust backend holds the **source of truth** for all application state. The React
frontend is strictly a view layer that:

1. Calls Tauri commands to read/write state
2. Manages UI-only state (tab selection, panel visibility, etc.) locally
3. Uses `localStorage` for lightweight persistence (theme, terms accepted, etc.)

State is stored in a thread-safe `AppState` struct protected by `Mutex` locks,
accessible from any Tauri command or CLI operation.

### UI Theme System

CryptArtist Studio uses a unified dark theme across all programs. The theme is
defined through TailwindCSS custom colors and CSS custom properties.

#### TailwindCSS Color Tokens

| Token | Hex Value | Usage |
|---|---|---|
| `studio-bg` | `#0a0a0f` | Main application background |
| `studio-panel` | `#12121a` | Panel and sidebar backgrounds |
| `studio-surface` | `#1a1a2e` | Elevated surface elements |
| `studio-border` | `#2a2a3e` | Borders and dividers |
| `studio-hover` | `#2a2a4e` | Hover state backgrounds |
| `studio-text` | `#e0e0e8` | Primary text color |
| `studio-muted` | `#6b6b80` | Muted/disabled text |
| `studio-secondary` | `#9090a8` | Secondary text |
| `studio-cyan` | `#00d4ff` | Accent color (links, active states) |
| `studio-green` | `#00ff88` | Success states, positive indicators |

#### Extended Color Palette

| Token | Usage |
|---|---|
| `info` | Informational badges and alerts |
| `success` | Success states and confirmations |
| `danger` | Error states and destructive actions |
| `warning` | Warning indicators |
| `pink` | Special highlights |
| `teal` | Secondary accent |
| `indigo` | Tertiary accent |
| `lime` | Positive metrics |
| `rose` | Critical alerts |
| `sky` | Informational highlights |
| `amber` | Caution indicators |
| `emerald` | Connected/online states |
| `violet` | Creative/AI features |
| `fuchsia` | Special features |

#### CSS Utility Classes

The global stylesheet (`index.css`) provides custom utility classes beyond Tailwind:

| Class | Description |
|---|---|
| `.glass-card` | Frosted glass effect with backdrop-blur |
| `.gradient-border` | Animated gradient border effect |
| `.text-gradient-cyan` | Cyan-to-blue gradient text |
| `.text-gradient-warm` | Orange-to-pink gradient text |
| `.glow-cyan` | Cyan box-shadow glow effect |
| `.glow-green` | Green box-shadow glow effect |
| `.glow-purple` | Purple box-shadow glow effect |
| `.glow-red` | Red box-shadow glow effect |
| `.skeleton` | Shimmer loading placeholder animation |
| `.pulse-ring` | Animated border pulse for active states |
| `.provider-badge` | AI provider indicator badge |
| `.model-selector` | AI model dropdown styling |
| `.ai-panel` | AI feature panel layout |
| `.ai-streaming` | Streaming response indicator |
| `.token-bar` | Token usage progress bar |
| `.truncate-2` | 2-line text truncation with ellipsis |
| `.truncate-3` | 3-line text truncation with ellipsis |

#### Animation Keyframes

| Animation | Duration | Description |
|---|---|---|
| `fade-in` | 300ms | Opacity 0 to 1 |
| `scale-in` | 300ms | Scale from 0.9 to 1 with fade |
| `slide-in` | 400ms | Slide from below with fade |
| `bounce-in` | 500ms | Bounce scale effect |
| `spin-slow` | 3s | Slow continuous rotation |
| `typing` | 1s | Typing cursor blink |
| `float` | 3s | Gentle floating up/down |
| `shake` | 300ms | Horizontal shake |
| `wiggle` | 400ms | Rotation wiggle |
| `gradient-shift` | 4s | Background gradient animation |
| `expand` | 300ms | Height 0 to auto |
| `collapse` | 300ms | Height auto to 0 |
| `pop` | 200ms | Quick scale pop |

### Shared Hooks Library

The `src/utils/hooks.ts` module provides reusable React hooks used across programs:

| Hook | Description |
|---|---|
| `useLocalStorage(key, initial)` | Persist state to localStorage with validation |
| `useDebounce(value, delay)` | Debounce a rapidly changing value |
| `useInterval(callback, delay)` | Safe interval with automatic cleanup |
| `useTimeout(callback, delay)` | Safe timeout with automatic cleanup |
| `useToggle(initial)` | Boolean toggle with on/off/toggle functions |
| `useClickOutside(ref, handler)` | Detect clicks outside a referenced element |
| `useKeyPress(key)` | Detect when a specific key is pressed |
| `useMediaQuery(query)` | Responsive media query matching |
| `usePrevious(value)` | Track the previous value of a variable |
| `useClipboard()` | Copy text to clipboard with status |
| `useDocumentTitle(title)` | Set the browser document title |
| `useCounter(initial)` | Increment/decrement/reset counter |
| `useWindowSize()` | Track window dimensions on resize |
| `useHover(ref)` | Track hover state on an element |
| `useAsync(asyncFn)` | Execute async functions with loading/error state |
| `useThrottle(value, limit)` | Throttle a rapidly changing value |
| `useScrollPosition()` | Track scroll position of the window |

### Shared Constants Library

The `src/utils/constants.ts` module centralizes all magic strings and numbers:

| Category | Examples |
|---|---|
| **APP Metadata** | Name, version, identifier, website, contact |
| **Program IDs** | `media-mogul`, `vibecode-worker`, `demo-recorder`, etc. |
| **Routes** | `/media-mogul`, `/vibecode-worker`, `/settings`, etc. |
| **localStorage Keys** | `cryptartist_favorites`, `cryptartist_theme`, etc. |
| **API Providers** | OpenAI, Anthropic, Google, OpenRouter, Custom |
| **AI Models** | 15 popular model IDs with display names |
| **Editor Defaults** | Font size, tab size, theme, word wrap, minimap |
| **Media Formats** | MP4, WebM, GIF, PNG, JPEG, WAV, MP3 |
| **Resolution Presets** | 720p, 1080p, 1440p, 4K with dimensions |
| **Keyboard Shortcuts** | All global and per-program shortcuts |
| **Accent Colors** | 12 selectable accent colors with hex values |
| **File Type Icons** | Emoji icons for 20+ file extensions |
| **Timing Constants** | Toast duration, debounce delay, auto-save interval |
| **Size Limits** | Max file size, max storage, max history entries |

### Development Statistics

CryptArtist Studio was built over 42+ AI-assisted development sessions. Here is a
summary of the project's scope:

| Metric | Count |
|---|---|
| **Total Prompts** | 43+ |
| **Programs in Suite** | 11 (+ Suite Launcher) |
| **Tauri Commands** | 35+ |
| **CLI Commands** | 20+ |
| **REST API Endpoints** | 18+ |
| **Commander Built-In Commands** | 40+ |
| **UI/UX Improvements** | 370+ |
| **Security Vulnerability Fixes** | 300 |
| **Security Helper Functions** | 150+ |
| **React Hooks (shared)** | 17 |
| **Interop Event Types** | 30+ (11 categories) |
| **Cross-Program Pipelines** | 6 built-in |
| **OpenRouter Models** | 15 popular (200+ available) |
| **AI Efficiency Modes** | 5 (Cheap, Fast, Good, Smart, Lucky) |
| **Website Pages** | 9 |
| **Log Files** | 3 (session, recent, full history) |
| **Supported Languages (Editor)** | 20+ |
| **.CryptArt Optional Fields** | 30+ |
| **Known Program IDs** | 11 |
| **CSS Utility Classes** | 50+ |
| **Animation Keyframes** | 13 |
| **TailwindCSS Color Tokens** | 24+ |
| **Keyboard Shortcuts** | 16+ |
| **Utility Modules** | 20+ |
| **Frontend Source Files** | 50+ |
| **Rust Source Files** | 5 |
| **README Lines** | 4,600+ |

#### Technology Breakdown

| Language | Approximate Lines | Files |
|---|---|---|
| **TypeScript/TSX** | ~35,000 | ~50 |
| **Rust** | ~2,400 | 5 |
| **CSS** | ~3,500 | 2 |
| **HTML** | ~6,000 | 10 |
| **JavaScript** | ~1,500 | 3 |
| **JSON** | ~500 | 5 |
| **Markdown** | ~6,000 | 3 |
| **Total** | ~55,000 | ~78 |

---

## Getting Started

### Prerequisites

Before building CryptArtist Studio, ensure you have the following installed:

| Requirement | Version | Download |
|---|---|---|
| **Node.js** | 18.x or later | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x or later | Included with Node.js |
| **Rust** | 1.70 or later | [rustup.rs](https://rustup.rs/) |
| **Tauri CLI** | 2.x | `npm install -g @tauri-apps/cli` |

**Platform-specific requirements:**

- **Windows:** Microsoft Visual Studio C++ Build Tools, WebView2 (included in Windows 10/11)
- **macOS:** Xcode Command Line Tools (`xcode-select --install`)
- **Linux:** `libwebkit2gtk-4.1-dev`, `libappindicator3-dev`, `librsvg2-dev`, `patchelf`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mattyjacks/CryptArtistStudio.git
cd CryptArtistStudio

# 2. Install frontend dependencies
cd v1
npm install

# 3. Verify Rust toolchain
rustup update
cargo --version
```

### Development Mode

```bash
# Start the development server with hot reload
cd v1
npm run tauri dev
```

This command:
1. Starts the Vite dev server on `http://localhost:1420`
2. Compiles the Rust backend
3. Opens the Tauri application window
4. Enables hot module replacement for frontend changes

### Building for Production

```bash
# Build the optimized release binary
cd v1
npm run tauri build
```

The compiled application will be in:
- **Windows:** `v1/src-tauri/target/release/cryptartist-studio.exe`
- **macOS:** `v1/src-tauri/target/release/bundle/macos/CryptArtist Studio.app`
- **Linux:** `v1/src-tauri/target/release/bundle/appimage/cryptartist-studio.AppImage`

### Type Checking

```bash
# TypeScript type check (frontend)
cd v1
npx tsc --noEmit

# Rust check (backend)
cd v1/src-tauri
cargo check
```

### Platform Support

| Platform | Status | Notes |
|---|---|---|
| **Windows 10/11** | Supported | Primary development platform |
| **macOS 12+** | Supported | Intel and Apple Silicon |
| **Linux (Ubuntu 22+)** | Supported | AppImage and .deb bundles |
| **Android** | In Progress | Tauri mobile support |
| **iOS** | In Progress | Tauri mobile support |

---

## CLI Reference

CryptArtist Studio includes a full command-line interface powered by Clap. Every
feature available in the GUI can also be accessed from the terminal.

### Usage

```bash
# Run the GUI (default)
cryptartist-studio

# Run a CLI command
cryptartist-studio <command> [options]
```

### Global Commands

#### `new` - Create a new project

```bash
cryptartist-studio new --path ./my-project

# Creates a new project directory with default structure
```

| Flag | Description |
|---|---|
| `--path <PATH>` | Directory path for the new project |

#### `info` - Show project information

```bash
cryptartist-studio info --path ./my-project

# Displays project metadata, media files, timeline info
```

| Flag | Description |
|---|---|
| `--path <PATH>` | Path to the project directory |

### Project Management Commands

#### `cryptart create` - Create a .CryptArt file

```bash
cryptartist-studio cryptart create \
  --program vibecode-worker \
  --name "My Project" \
  --path ./project.CryptArt
```

| Flag | Description |
|---|---|
| `--program <ID>` | Program identifier (e.g., `media-mogul`, `vibecode-worker`) |
| `--name <NAME>` | Human-readable project name |
| `--path <PATH>` | Output file path |

The created file includes `$cryptart: 1`, `appVersion`, and a default `meta` object
with `website: "https://mattyjacks.com"`.

Unknown program IDs are allowed with a warning - the format is open and extensible.

#### `cryptart inspect` - Inspect a .CryptArt file

```bash
cryptartist-studio cryptart inspect --path ./project.CryptArt
```

Example output:

```
Format:     .CryptArt v1
Program:    vibecode-worker
App Ver:    0.1.0
Name:       My Project
Created:    2026-03-13T17:00:00.000Z
Updated:    2026-03-13T18:30:00.000Z
Website:    https://mattyjacks.com
Data keys:  ["rootPath", "openFiles", "activeFile"]
```

The inspect command handles both old (pre-v1) and new format files, displaying
all available fields including `meta`, `extensions`, and `history` when present.

### Media Commands

#### `add-media` - Add media to a project

```bash
cryptartist-studio add-media \
  --project ./project \
  --file ./video.mp4
```

| Flag | Description |
|---|---|
| `--project <PATH>` | Project directory |
| `--file <PATH>` | Media file to add |

#### `pexels` - Search Pexels for media

```bash
cryptartist-studio pexels --query "ocean sunset" --type photos --count 5
```

| Flag | Description |
|---|---|
| `--query <TEXT>` | Search query |
| `--type <TYPE>` | `photos` or `videos` |
| `--count <N>` | Number of results (default: 10) |

#### `export` - Export a project

```bash
cryptartist-studio export \
  --project ./project \
  --format mp4 \
  --output ./output.mp4
```

| Flag | Description |
|---|---|
| `--project <PATH>` | Project directory |
| `--format <FMT>` | Output format (mp4, webm, gif, png) |
| `--output <PATH>` | Output file path |

### AI Commands

#### `chat` - Send a message to the AI

```bash
cryptartist-studio chat --message "Write a Python script that sorts a list"
```

| Flag | Description |
|---|---|
| `--message <TEXT>` | Message to send to the AI |

### File System Commands

#### `read-file` - Read a file's contents

```bash
cryptartist-studio read-file --path ./src/App.tsx
```

#### `write-file` - Write content to a file

```bash
cryptartist-studio write-file --path ./output.txt --content "Hello, world!"
```

#### `ls` - List directory contents

```bash
cryptartist-studio ls --path ./src
```

### Server Commands

#### `serve` - Start the REST API server

```bash
cryptartist-studio serve --port 8080 --api-key my-secret-key
```

| Flag | Description |
|---|---|
| `--port <PORT>` | Port number (default: 8080) |
| `--api-key <KEY>` | Optional API key for authentication |

### System Commands

#### `sysinfo` - Display system information

```bash
cryptartist-studio sysinfo
```

Outputs: OS, architecture, FFmpeg status, Godot status, log paths, and version info.

#### `list-programs` - List available programs

```bash
cryptartist-studio list-programs
```

Outputs all eleven programs with their IDs, names, and descriptions.

---

## REST API Reference

CryptArtist Studio includes a built-in REST API server powered by `tiny_http`.
This enables integration with external tools, automation scripts, and AI agents.

### Starting the Server

```bash
# Start with default settings
cryptartist-studio serve

# Start with custom port and API key
cryptartist-studio serve --port 3000 --api-key my-secret-key
```

### Authentication

If an `--api-key` is specified, all requests must include the `X-API-Key` header:

```bash
curl -H "X-API-Key: my-secret-key" http://localhost:8080/health
```

Requests without a valid API key will receive a `401 Unauthorized` response.

### Endpoints

#### Health Check

```
GET /health
```

Returns `{"status": "ok"}` if the server is running.

#### AI Chat

```
POST /ai/chat
Content-Type: application/json

{
  "message": "Explain async/await in Rust"
}
```

Returns the AI response as a JSON object with a `reply` field.

#### File Operations

```
GET /files/read?path=/path/to/file.txt
```

Returns the file contents as plain text.

```
POST /files/write
Content-Type: application/json

{
  "path": "/path/to/file.txt",
  "content": "Hello, world!"
}
```

#### Directory Listing

```
GET /files/list?path=/path/to/directory
```

Returns a JSON array of directory entries with name, path, is_dir, and size.

#### Pexels Search

```
GET /pexels/search?query=ocean+sunset&type=photos&count=5
```

Returns Pexels API search results.

#### Project Management

```
POST /project/new
Content-Type: application/json

{
  "path": "/path/to/project"
}
```

```
GET /project/info?path=/path/to/project
```

#### System Information

```
GET /sysinfo
```

Returns system information as JSON.

#### Export

```
POST /export
Content-Type: application/json

{
  "project": "/path/to/project",
  "format": "mp4",
  "output": "/path/to/output.mp4"
}
```

### CORS

All API responses include the following headers:

```
Access-Control-Allow-Origin: *
Content-Type: application/json
```

### Response Format

All endpoints return JSON responses. Error responses include a `message` field:

```json
{
  "error": "Not Found",
  "message": "The requested endpoint does not exist"
}
```

---

## Configuration

### API Keys

CryptArtist Studio supports multiple AI providers. API keys are stored securely
in the Rust backend state (never in frontend localStorage):

| Provider | Setting | Used By |
|---|---|---|
| **OpenAI** | Settings > API Keys > OpenAI Key | AI Chat, Image Generation, TTS, AI Studio |
| **OpenRouter** | Settings > API Keys > OpenRouter Key | All AI features (200+ models), primary provider |
| **Pexels** | Settings > API Keys > Pexels Key | Media Browser, stock photo/video search |
| **ElevenLabs** | Settings > API Keys > ElevenLabs Key | TTS voiceover, STT transcription, SFX generation |
| **GiveGigs** | Settings > API Keys > GiveGigs/Supabase Key | Media asset library via Supabase |
| **Anthropic** | VibeCodeWorker Settings | VCW AI Assistant (via direct API) |
| **Google** | VibeCodeWorker Settings | VCW AI Assistant (via direct API) |
| **Custom** | VibeCodeWorker Settings | Any OpenAI-compatible endpoint |

#### Setting Keys via CLI

```bash
# Set OpenAI key (stored in app state)
cryptartist-studio serve --api-key my-key
```

#### Setting Keys via REST API

```bash
curl -X POST http://localhost:8080/settings/api-key \
  -H "Content-Type: application/json" \
  -d '{"key": "sk-..."}'
```

### FFmpeg Setup

FFmpeg is required for video/audio processing in Media Mogul. On first launch,
CryptArtist Studio will:

1. Detect the user's OS and architecture
2. Download the appropriate FFmpeg and FFprobe binaries
3. Verify SHA-256 checksums
4. Store binaries in the local AppData directory:
   - **Windows:** `%LOCALAPPDATA%\CryptArtist Studio\ffmpeg\`
   - **macOS:** `~/Library/Application Support/CryptArtist Studio/ffmpeg/`
   - **Linux:** `~/.local/share/CryptArtist Studio/ffmpeg/`

If FFmpeg is already installed system-wide, CryptArtist Studio will detect and
use it automatically.

### Godot Integration

GameStudio requires the Godot Engine. CryptArtist Studio can:

1. **Auto-detect** an existing Godot installation
2. **Download** Godot automatically (similar to FFmpeg setup)
3. **Launch** Godot with project files from within the app

Configure the Godot path in Settings or let the auto-detection handle it.

### Tauri Configuration

The Tauri configuration lives in `v1/src-tauri/tauri.conf.json`:

```json
{
  "productName": "CryptArtist Studio",
  "version": "1.69.420.4",
  "identifier": "com.cryptartist.studio",
  "app": {
    "windows": [{
      "title": "CryptArtist Studio",
      "width": 1440,
      "height": 900,
      "minWidth": 360,
      "minHeight": 480
    }]
  },
  "bundle": {
    "fileAssociations": [{
      "ext": ["CryptArt"],
      "mimeType": "application/x-cryptartist-art",
      "description": "CryptArtist Art"
    }]
  }
}
```

---

## Logging System

CryptArtist Studio includes a comprehensive logging system that captures events
from the Rust backend, Tauri commands, REST API, CLI, and frontend.

### Log Files

Three log files are maintained simultaneously:

| File | Description | Location |
|---|---|---|
| `cryptartist-session.txt` | Last 100 lines since current run | `{AppData}/CryptArtist Studio/logs/` |
| `cryptartist-recent.txt` | Rolling last 1,000 lines | `{AppData}/CryptArtist Studio/logs/` |
| `cryptartist-full-history.txt` | Append-only full history | `{AppData}/CryptArtist Studio/logs/` |

**AppData locations by platform:**
- **Windows:** `%LOCALAPPDATA%\CryptArtist Studio\logs\`
- **macOS:** `~/Library/Application Support/CryptArtist Studio/logs\`
- **Linux:** `~/.local/share/CryptArtist Studio/logs/`

### Log Levels

| Level | Prefix | Description |
|---|---|---|
| **Debug** | `[DEBUG]` | Verbose diagnostic information |
| **Info** | `[INFO]` | General operational events |
| **Warn** | `[WARN]` | Potential issues that don't prevent operation |
| **Error** | `[ERROR]` | Errors that need attention |
| **Command** | `[CMD]` | Tauri command invocations |
| **CLI** | `[CLI]` | CLI command executions |
| **API** | `[API]` | REST API request/response cycle |
| **Frontend** | `[FE]` | Frontend events forwarded from TypeScript |

### Log Format

Each log line follows this format:

```
2026-03-13T17:05:23.456Z [INFO] [source] message
```

### Frontend Logging

The frontend logging system (`src/utils/logger.ts`) automatically captures:

- All `console.error()` and `console.warn()` calls
- Unhandled JavaScript errors
- Unhandled promise rejections
- Program launches and navigation events
- Keyboard shortcut activations
- User actions (terms acceptance, settings changes, etc.)

Frontend logs are forwarded to the Rust backend via the `log_from_frontend`
Tauri command and written to the same three log files.

### Reading Logs via Tauri Commands

```typescript
// Get the last 100 lines (session log)
const session = await invoke<string[]>("get_log_session");

// Get the last 1,000 lines (recent log)
const recent = await invoke<string[]>("get_log_recent");

// Get the file paths of all log files
const paths = await invoke("get_log_paths");
```

---

## Keyboard Shortcuts

| Shortcut | Action | Context |
|---|---|---|
| `Ctrl+S` / `Cmd+S` | Save current file | VibeCodeWorker, GameStudio |
| `Ctrl+O` / `Cmd+O` | Open file/folder | All programs |
| `Ctrl+N` / `Cmd+N` | New project | All programs |
| `Ctrl+Z` / `Cmd+Z` | Undo | Editor, Timeline |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | Redo | Editor, Timeline |
| `Ctrl+F` / `Cmd+F` | Find in file | VibeCodeWorker |
| `Ctrl+Shift+F` / `Cmd+Shift+F` | Find in project | VibeCodeWorker |
| `Ctrl+P` / `Cmd+P` | Quick file open | VibeCodeWorker |
| `Space` | Play/Pause | Media Mogul, DemoRecorder |
| `Escape` | Back to Suite Launcher | All programs |

Keyboard shortcuts are logged automatically for debugging and analytics purposes.

#### Additional Keyboard Shortcuts

| Shortcut | Action | Context |
|---|---|---|
| `1` - `8` | Quick-launch program by number | Suite Launcher |
| `?` | Show keyboard shortcuts overlay | Suite Launcher |
| `R` | Show recent projects panel | Suite Launcher |
| `Ctrl+Shift+P` / `Cmd+Shift+P` | Command palette | VibeCodeWorker |
| `Tab` | Autocomplete command | CryptArt Commander |
| `Up Arrow` / `Down Arrow` | Navigate command history | CryptArt Commander |

---

## OpenRouter Multi-Model AI Integration

CryptArtist Studio integrates with [OpenRouter](https://openrouter.ai/) to provide
access to 200+ AI models from multiple providers through a single API key. OpenRouter
is deeply integrated into every program that uses AI.

### Supported Providers

| Provider | Models Available | Example Model IDs |
|---|---|---|
| **OpenAI** | GPT-5 Mini, GPT-4o, GPT-4o Mini, o1 | `openai/gpt-5-mini`, `openai/gpt-4o` |
| **Anthropic** | Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku | `anthropic/claude-3.5-sonnet`, `anthropic/claude-3-opus` |
| **Google** | Gemini Pro 1.5, Gemini Flash 1.5 | `google/gemini-pro-1.5`, `google/gemini-flash-1.5` |
| **Meta** | Llama 3.1 405B, Llama 3.1 70B | `meta-llama/llama-3.1-405b-instruct` |
| **Mistral** | Mixtral 8x22B, Mistral Large | `mistralai/mixtral-8x22b-instruct` |
| **Perplexity** | Llama 3.1 Sonar 70B | `perplexity/llama-3.1-sonar-huge-128k-online` |

### Model Selection

`openai/gpt-5-mini` is the default model for all purposes unless overridden.

Model and mode can be changed from:

- **Settings** > OpenRouter section (global default)
- **Settings** > Per-Action AI Defaults (persistent per-action overrides)
- **ValleyNet** config toolbar (action-specific override)
- **VibeCodeWorker** AI settings panel (action-specific override)
- **GameStudio** AI Generator panel header (action-specific override)
- **DemoRecorder** AI Tools panel header (action-specific override)
- **CryptArt Commander** via `or models` command

### AI Efficiency Modes

All major AI actions support five efficiency modes:

- **`💳 Cheap`** - Keep responses token-efficient and cost-minimized
- **`⚡ Fast`** - Prefer fastest useful completion path
- **`🦄 Good`** - Encourage commonwealth goodness, keep tone clever/funny, and keep code quality strict
- **`🧠 Smart`** - Default mode with maximum precision and practical intelligence
- **`🍀 Lucky`** - Seed AI generation from a deterministic luck value computed by Luck Factory [Lck].
  On first use, the user is redirected to Luck Factory to anchor their luck seed with a
  personal intention string. The seed (0-999 base + preset of 69/420/777) influences AI
  prompt construction for serendipitous results.

### Fallback Behavior

The shared OpenRouter utility (`src/utils/openrouter.ts`) implements a two-tier
fallback strategy:

```
1. Try OpenRouter first (if key is configured)
   - Send request to https://openrouter.ai/api/v1/chat/completions
   - Include HTTP-Referer and X-Title headers for ranking
2. If OpenRouter fails or is not configured:
   - Fall back to direct OpenAI API (if OpenAI key is configured)
3. If both fail:
   - Return error to the user
```

### Rust Backend Integration

The Rust backend exposes these OpenRouter commands:

| Command | Description |
|---|---|
| `save_openrouter_key` | Store the OpenRouter API key |
| `get_openrouter_key` | Retrieve the stored key |
| `openrouter_chat` | Send a chat completion request to OpenRouter |
| `openrouter_list_models` | List available models from OpenRouter |

The `openrouter_chat` command includes:
- Model ID validation (must match `provider/model-name` format)
- Bearer token authentication
- HTTP-Referer header set to `https://mattyjacks.com`
- X-Title header set to `CryptArtist Studio`
- 30-second request timeout
- Response size limiting

### Frontend Utility Module

The `src/utils/openrouter.ts` module provides:

```typescript
chatWithAI(prompt, options?)    // OpenRouter-first with OpenAI fallback
listModels()                    // List available models
isOpenRouterConfigured()        // Check if key is set
isOpenAIConfigured()            // Check if OpenAI key is set
getAIStatus()                   // Get full AI readiness status
getDefaultModel()               // Get stored default model
setDefaultModel(model)          // Set default model (validated)
getDefaultMode()                // Get global AI mode (cheap/fast/good/smart)
setDefaultMode(mode)            // Set global AI mode
getActionModel(action)          // Get per-action model override
setActionModel(action, model)   // Set per-action model override
getActionMode(action)           // Get per-action mode override
setActionMode(action, mode)     // Set per-action mode override
```

---

## Security Hardening

CryptArtist Studio has undergone comprehensive security hardening with 300 vulnerability
fixes across the Rust backend and TypeScript frontend. The fixes are organized into
ten batches covering all major vulnerability categories.

### Overview of 300 Vulnerability Fixes

#### BATCH A (Vulns 1-25): Rust Backend

| # | Category | Fix Description |
|---|---|---|
| 1-3 | **API Key Validation** | Max 512 chars, printable ASCII only, reject empty keys |
| 4-5 | **URL Validation** | Trusted domain whitelist, HTTPS enforcement for external calls |
| 6-7 | **Prompt Validation** | Max 32,000 chars, UTF-8 validation |
| 8-9 | **File Size Limits** | 50 MB read limit, 100 MB write limit |
| 10-11 | **Search Validation** | Search type enum validation, query length limits |
| 12-13 | **HTTP Timeouts** | 30-second timeout on all outbound HTTP requests |
| 14-15 | **Path Sanitization** | Extended sanitization for Godot project paths |
| 16-17 | **Template Validation** | Godot template parameters sanitized |
| 18-19 | **Log Limits** | Log message truncated to 2,000 chars, level validated |
| 20-21 | **Import Limits** | Key import JSON limited to 10 MB |
| 22-24 | **REST API CORS** | OPTIONS preflight handler, Content-Type validation |
| 25 | **Security Headers** | X-Content-Type-Options, X-Frame-Options on all responses |

#### BATCH B (Vulns 26-50): Frontend XSS, Sanitization, CSP

| # | Category | Fix Description |
|---|---|---|
| 26-27 | **CSP** | Content Security Policy meta tag in index.html |
| 28-29 | **localStorage** | Key format validation, value size limits (5 MB) |
| 30-31 | **Preferences** | Schema validation for theme, fontSize, autoSave, etc. |
| 32-33 | **Recent Projects** | Path and name sanitization, character limits |
| 34-36 | **Command Input** | Length limits, file path sanitization |
| 37-39 | **Toast System** | Rate limiting, message truncation, queue size limits |
| 40-41 | **Model Validation** | Model ID format validation (`provider/model`) |
| 42-44 | **URL Validation** | Trusted domain whitelist in frontend |
| 45-47 | **Search Sanitization** | Search query length limits, character filtering |
| 48-50 | **Prototype Pollution** | `sanitizeObjectKeys()` on parsed JSON, ISO date validation |

#### BATCH C (Vulns 51-75): Memory Leaks, Race Conditions, Resource Limits

| # | Category | Fix Description |
|---|---|---|
| 51-53 | **Timeout Cleanup** | Track all `setTimeout`/`setInterval`, clean up on unmount |
| 52-54 | **Peer Limits** | Max 50 peer connections in DonatePersonalSeconds |
| 55-57 | **Log Limits** | Max 200 log entries in activity logs |
| 58-60 | **History Limits** | Max 200 display entries, 500 command history entries |
| 61-63 | **Input Limits** | Max 10,000 char command input, 50,000 char scripts |
| 64-66 | **Double-Click** | `preventDoubleClick()` guard on destructive actions |
| 67-69 | **Script Limits** | Max script content size, env var count limits |
| 70-72 | **Alias Limits** | Max 50 command aliases |
| 73-75 | **Search Limits** | Search query sanitization in Suite Launcher |

#### BATCH D (Vulns 76-100): Hardening, Crypto, Audit Logging

| # | Category | Fix Description |
|---|---|---|
| 76-78 | **Security Headers** | X-XSS-Protection, Referrer-Policy, Permissions-Policy |
| 79-81 | **Referrer Policy** | `strict-origin-when-cross-origin` meta tag |
| 82-84 | **Cache Control** | `no-store` for sensitive API responses |
| 85-87 | **Secure Random** | `crypto.getRandomValues()` for all IDs and tokens |
| 88-90 | **Audit Logger** | `logSecurityEvent()` for all security-relevant events |
| 91-93 | **Safe JSON** | `safeJsonStringify()` with circular reference handling |
| 94-96 | **File Extensions** | Allowlist validation for uploaded/opened files |
| 97-98 | **Suspicious Paths** | Warning on paths containing `..`, `~`, or null bytes |
| 99-100 | **UTF-8 Validation** | Input string validation before processing |

#### BATCH E (Vulns 101-125): Advanced Frontend Hardening

| # | Category | Fix Description |
|---|---|---|
| 101-103 | **DOM XSS** | Safe innerHTML alternatives, attribute sanitization |
| 104-106 | **Event Handlers** | Event listener cleanup, delegation limits |
| 107-109 | **iframe Security** | Sandbox attributes, postMessage origin validation |
| 110-112 | **Form Security** | CSRF token validation, autocomplete controls |
| 113-115 | **CSS Injection** | Color value validation, safe CSS property setting |
| 116-118 | **Web Worker** | Worker script URL validation, message size limits |
| 119-121 | **WebSocket** | Connection limits, message size validation |
| 122-125 | **Canvas Security** | Canvas fingerprint mitigation, tainted canvas detection |

#### BATCH F (Vulns 126-150): API and Network Security

| # | Category | Fix Description |
|---|---|---|
| 126-128 | **Fetch Hardening** | Request timeout enforcement, response size limits |
| 129-131 | **CORS** | Strict origin checking, preflight caching |
| 132-134 | **Cookie Security** | Secure/HttpOnly/SameSite enforcement |
| 135-137 | **CSP Nonce** | Dynamic script nonce generation |
| 138-140 | **SRI** | Subresource integrity hash validation |
| 141-143 | **Rate Limiting** | Per-endpoint rate limiting with sliding window |
| 144-146 | **Request Queue** | Priority-based request queuing |
| 147-150 | **Error Handling** | Safe error serialization, stack trace redaction |

#### BATCH G (Vulns 151-175): Data Protection

| # | Category | Fix Description |
|---|---|---|
| 151-153 | **Template Safety** | Safe template literal interpolation |
| 154-156 | **Clipboard** | Clipboard data sanitization, paste event filtering |
| 157-159 | **Drag-Drop** | File validation on drop, type checking |
| 160-162 | **Storage Encryption** | AES-GCM encrypted localStorage wrapper |
| 163-165 | **Key Management** | Web Crypto API key generation and export |
| 166-168 | **Credential Leak** | URL credential detection, referrer stripping |
| 169-171 | **HSTS** | HTTP Strict Transport Security enforcement |
| 172-175 | **Cookie Consent** | Cookie consent manager with category controls |

#### BATCH H (Vulns 176-200): Resource Management

| # | Category | Fix Description |
|---|---|---|
| 176-178 | **Focus Trap** | Modal focus containment for accessibility |
| 179-181 | **Scroll Safety** | Scroll restoration control, position validation |
| 182-184 | **Content Disposition** | Header validation for file downloads |
| 185-187 | **DOM Monitoring** | DOM size tracking, mutation rate limiting |
| 188-190 | **Lazy Loading** | Secure lazy load with crossorigin and referrerpolicy |
| 191-193 | **Intersection Observer** | Safe observer factory with error handling |
| 194-196 | **Resource Timing** | Performance entry analysis for slow/cross-origin resources |
| 197-200 | **Connection Pool** | Hostname connection limits, pool management |

#### BATCH I (Vulns 201-250): Advanced Security Utilities

| # | Category | Fix Description |
|---|---|---|
| 201-203 | **CSP Nonce Injection** | Dynamic nonce generation for inline scripts |
| 204-206 | **SRI Cache** | Subresource integrity hash caching |
| 207-209 | **Form Guard** | Secure form submission with action URL validation |
| 210-212 | **postMessage** | Safe cross-window messaging with origin verification |
| 213-215 | **DOM Mutation** | Rate-limited DOM mutation tracking |
| 216-218 | **Text Purification** | Control character stripping, Unicode normalization |
| 219-221 | **URL Builder** | Safe URL construction with parameter encoding |
| 222-224 | **Credential Detection** | URL userinfo detection and warning |
| 225-227 | **HSTS Check** | Strict-Transport-Security header validation |
| 228-230 | **Cookie Consent** | Granular analytics/functional/marketing consent |
| 231-233 | **Web Crypto** | AES-GCM key generation and secure export |
| 234-236 | **Permission Guard** | Throttled permission request with cooldowns |
| 237-239 | **Object Safety** | Prototype-safe property access with fallbacks |
| 240-242 | **Event Guard** | Propagation control, secure worker creation |
| 243-245 | **Leak Detection** | Stale object tracking with age-based eviction |
| 246-248 | **Blob Security** | MIME type validation for Blob creation |
| 249-250 | **Array Zeroing** | Typed array secure zeroing, enum validation |

#### BATCH J (Vulns 251-300): Platform API Guards and Comprehensive Init

| # | Category | Fix Description |
|---|---|---|
| 251-252 | **Encrypted Storage** | AES-GCM encrypt/decrypt localStorage wrapper |
| 253-254 | **WebSocket Monitor** | Heartbeat/pong monitoring with auto-disconnect |
| 255-256 | **Drag-Drop Validation** | File type, size, and extension validation on drop |
| 257-258 | **Fetch Retry** | Exponential backoff retry with abort timeout |
| 259-260 | **SVG Sanitization** | Dangerous tag/attribute removal from SVG markup |
| 261-262 | **WebGL Guard** | Context count limiting, leak prevention |
| 263-264 | **Audio Fingerprint** | Oscillator creation monitoring to detect fingerprinting |
| 265-266 | **Battery/Geolocation** | Privacy guards with value quantization |
| 267-268 | **BroadcastChannel** | Origin-validated cross-tab messaging |
| 269-270 | **Device Orientation** | Listener limits, precision reduction |
| 271-272 | **Speech/Gamepad** | Single-instance guards, ID truncation |
| 273-274 | **SharedArrayBuffer** | Cross-origin isolation check |
| 275-276 | **WebTransport** | Connection count limits |
| 277-278 | **WASM Validation** | Magic byte verification, size limits |
| 279-280 | **Screen Capture** | Single-instance guard |
| 281-282 | **USB/Serial/Bluetooth** | Rate-limited device access requests |
| 283-284 | **Idle/Wake Lock** | Single-instance API guards |
| 285-286 | **File Handle** | Size and path traversal validation |
| 287-288 | **Web Share/Payment** | Cooldown and single-instance guards |
| 289-290 | **Notifications** | Permission throttling, safe creation |
| 291-292 | **Error Serialization** | Stack trace leak prevention |
| 293-294 | **Content Editable** | Paste sanitization, drop prevention |
| 295-296 | **Image Validation** | Dimension and pixel count limits (decompression bomb prevention) |
| 297-298 | **AbortController Pool** | Managed pool with auto-eviction |
| 299 | **Console Protection** | Tamper detection and restoration |
| 300 | **Comprehensive Init** | `initializeSecurityHardeningV2()` combining all vulns 201-300 |

### Security Utility Module

The `src/utils/security.ts` module provides 150+ security helper functions:

#### Sanitization Functions

| Function | Description |
|---|---|
| `sanitizeHtml(input)` | Strip all HTML tags from a string |
| `sanitizeFilePath(path)` | Remove path traversal sequences and dangerous characters |
| `sanitizeSearchQuery(query, maxLen)` | Limit length, strip control characters |
| `sanitizeWorkspaceName(name)` | Alphanumeric + spaces/hyphens only, max 100 chars |
| `sanitizeObjectKeys(obj)` | Remove `__proto__`, `constructor`, `prototype` keys |
| `truncateToastMessage(msg)` | Truncate to 500 chars for toast display |

#### Validation Functions

| Function | Description |
|---|---|
| `validateUrl(url)` | Check against trusted domain whitelist |
| `validateApiKey(key)` | Max 512 chars, printable ASCII, non-empty |
| `validateModelId(model)` | Must match `provider/model-name` pattern |
| `validateStorageKey(key)` | Alphanumeric + underscores/hyphens/dots only |
| `validateStorageValue(value)` | Max 5 MB string length |
| `isValidISODate(dateStr)` | ISO-8601 format check |
| `validateFileExtension(filename, allowed)` | Extension allowlist check |
| `isSuspiciousPath(path)` | Detect `..`, `~`, null bytes |
| `isValidUtf8(str)` | Check for null bytes and control characters |

#### Rate Limiting and Throttling

| Function | Description |
|---|---|
| `shouldThrottleToast()` | Rate limit toasts to 1 per 500ms |
| `createApiRateLimiter(interval)` | Create a rate limiter for API calls |
| `preventDoubleClick(id, cooldown)` | Prevent duplicate button clicks |
| `createDebouncedValue(delay)` | Debounce rapidly changing values |

#### Security Utilities

| Function | Description |
|---|---|
| `secureRandomHex(bytes)` | Cryptographically secure hex string |
| `maskApiKey(key)` | Show first 8 chars, mask the rest with asterisks |
| `hashForLog(sensitive)` | SHA-256 hash for safe logging of sensitive data |
| `safeJsonStringify(obj, indent)` | JSON stringify with circular reference handling |
| `createAbortableRequest(timeout)` | AbortController with automatic timeout |
| `logSecurityEvent(source, severity, message, detail?)` | Audit log entry |
| `runSecurityAudit()` | Run all security checks and return a report |

### Content Security Policy

The frontend `index.html` includes a strict Content Security Policy:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://openrouter.ai https://api.openai.com
            https://api.pexels.com https://ipc.localhost
            http://ipc.localhost tauri:;
img-src 'self' data: blob: https:;
media-src 'self' blob: data:;
object-src 'none';
base-uri 'self';
form-action 'self';
```

This policy:
- Blocks all external scripts and inline `eval()`
- Restricts network connections to known API endpoints and Tauri IPC
- Prevents object/embed injection
- Limits form submissions to same-origin
- Allows images from any HTTPS source (for Pexels integration)

### REST API Security Headers

All REST API responses include these security headers:

| Header | Value | Purpose |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME type sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Enable XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer info |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restrict APIs |
| `Cache-Control` | `no-store` | Prevent caching of sensitive data |
| `Access-Control-Allow-Origin` | `*` | CORS support |
| `Content-Type` | `application/json` | Explicit content type |

### Input Validation Summary

| Input | Max Length | Validation |
|---|---|---|
| API keys | 512 chars | Printable ASCII only |
| Prompts | 32,000 chars | UTF-8, non-empty |
| File reads | 50 MB | Size check before read |
| File writes | 100 MB | Size check before write |
| Request bodies | 10 MB | Size check before parse |
| Search queries | 200 chars | Alphanumeric + basic punctuation |
| Model IDs | 200 chars | `provider/model-name` format |
| Log messages | 2,000 chars | Truncated on write |
| Storage keys | 200 chars | Alphanumeric + underscores |
| Storage values | 5 MB | Size check before write |
| Command input | 10,000 chars | Length check |
| Toast messages | 500 chars | Truncated on display |
| Workspace names | 100 chars | Alphanumeric + spaces/hyphens |
| Recent project names | 256 chars | HTML-unsafe chars stripped |

---

## CryptArtist Studio Website

CryptArtist Studio has a companion marketing website located in the `website/A1/`
directory. The website is a static HTML/CSS/JS site designed for deployment on
Cloudflare Pages or any static hosting provider.

### Website Pages

| Page | File | Description |
|---|---|---|
| **Home** | `index.html` | Landing page with hero, program cards, features, tech stack, CTA |
| **Programs** | `programs.html` | Detailed breakdown of all programs with feature lists |
| **About** | `about.html` | Philosophy, development timeline, tech stack tables |
| **Documentation** | `docs.html` | .CryptArt format spec, CLI reference, REST API, FAQ |
| **Download** | `download.html` | Platform download cards, build-from-source guide |
| **Contact** | `contact.html` | Contact form, email, social links |
| **Privacy** | `privacy.html` | Full privacy policy (NH law compliant) |
| **Terms** | `terms.html` | Full terms of use (NH law compliant) |
| **DonatePersonalSeconds** | `donate-personal-seconds.html` | P2P resource sharing page with live demo |

### Website Technology

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic markup with ARIA roles |
| **CSS3** | Custom properties, grid, flexbox, animations |
| **Vanilla JavaScript** | Navigation, scroll animations, accordions, counters |
| **Google Fonts** | Inter font family |
| **Responsive Design** | Mobile-first with breakpoints at 768px, 1024px, 1200px |

The website uses a dark theme consistent with the desktop application, featuring:
- CSS custom properties for color tokens
- Gradient text effects and glow animations
- Intersection Observer for scroll-triggered animations
- Accordion components for FAQ sections
- Counter animations for statistics
- Mobile hamburger menu with smooth transitions

### DonatePersonalSeconds Web API

The website includes a standalone P2P resource sharing API (`donate-personal-seconds-api.js`)
that can be used independently of the desktop application:

```javascript
const api = new DonatePersonalSecondsAPI({ password: "my-password" });

// Start donating resources
api.startDonating({ cpuPercent: 80, ramPercent: 50, gpuPercent: 90 });

// Or start borrowing resources
api.startBorrowing();

// Submit a task to the network
api.submitTask({ type: "ai-inference", payload: { prompt: "..." } });

// Listen for events
api.on("peer-connected", (peer) => console.log("New peer:", peer));
api.on("task-completed", (result) => console.log("Result:", result));
```

---

## Privacy Policy and Terms of Use

CryptArtist Studio includes a built-in Privacy Policy and Terms of Use, fully
compliant with New Hampshire, USA law.

### Terms Acceptance

On first launch (and after clearing local storage), users must accept the Terms
of Use and Privacy Policy before using the application. The acceptance modal
includes links to the full policy pages.

### Privacy Highlights

- **No data collection without consent** - CryptArtist Studio does not phone home.
- **API keys are stored locally** - Keys never leave the user's machine except
  when making API calls to the configured providers.
- **Log files are local only** - All logging is to local files only.
- **No telemetry** - No usage tracking, no analytics beacons.
- **Open source** - The full source code is available for audit.

### Third-Party Services

CryptArtist Studio integrates with these third-party services (only when the user
opts in by providing API keys):

| Service | Purpose | Data Sent |
|---|---|---|
| **OpenAI API** | AI chat, image generation, TTS | User prompts, code context |
| **OpenRouter** | AI model gateway (200+ models) | User prompts, model selection |
| **ElevenLabs** | Voice generation, STT, sound effects | Text prompts, audio files |
| **Pexels API** | Stock photo/video search | Search queries |
| **GiveGigs.com** | Media asset library | Supabase auth credentials |
| **Cloudflare** | Website hosting (mattyjacks.com) | Standard web requests |
| **Cloudflare Turnstile** | Bot protection | Browser fingerprint |

### Contact

- **Email:** [Matt@MattyJacks.com](mailto:Matt@MattyJacks.com)
- **Contact Page:** [MattyJacks.com/Contact](https://mattyjacks.com/Contact)

### Legal Pages

The full Privacy Policy and Terms of Use are accessible within the application
at `/privacy` and `/terms` respectively, and are also available at:

- [mattyjacks.com/privacy](https://mattyjacks.com/privacy)
- [mattyjacks.com/terms](https://mattyjacks.com/terms)

---

## Contributing

CryptArtist Studio is open source and welcomes contributions from anyone. Whether
you are fixing a typo, adding a feature, or suggesting an improvement, your help
is valued.

### Development Workflow

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/CryptArtistStudio.git
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/my-new-feature
   ```
4. **Make your changes** and test them:
   ```bash
   cd v1
   npx tsc --noEmit          # TypeScript check
   cd src-tauri && cargo check # Rust check
   ```
5. **Commit** with a descriptive message:
   ```bash
   git commit -m "Add: description of your change"
   ```
6. **Push** to your fork and open a **Pull Request** against `main`.

### Code Style

#### TypeScript / React

- Use functional components with hooks (no class components).
- Use TypeScript strict mode - avoid `any` types.
- Follow the existing TailwindCSS dark theme tokens (`studio-bg`, `studio-panel`,
  `studio-text`, `studio-border`, `studio-hover`, `studio-muted`, `studio-secondary`,
  `studio-cyan`, `studio-green`).
- Keep components self-contained - each program is a single file or small folder.
- Use `invoke()` for all backend communication, never direct HTTP from frontend.
- Do not add comments or documentation unless specifically relevant.

#### Rust

- Follow standard Rust formatting (`cargo fmt`).
- Use `Result<T, String>` for Tauri command return types.
- Use `Mutex` for shared state access.
- Log all significant operations using the logger module.
- Keep CLI commands headless - no GUI dependencies.

#### General

- Never remove existing functionality without explicit permission.
- Maintain backward compatibility for the `.CryptArt` file format.
- Keep the three required `.CryptArt` fields (`$cryptart`, `program`, `data`) sacred.
- Test on Windows at minimum; cross-platform testing is appreciated.
- Do not use em dashes or en dashes in code - use hyphens instead.

### Pull Requests

When submitting a pull request:

1. **Describe what you changed** and why.
2. **Reference any related issues** using `#issue-number`.
3. **Confirm builds pass** - both `tsc --noEmit` and `cargo check`.
4. **Keep changes focused** - one feature or fix per PR.
5. **Screenshots welcome** for UI changes.

### Reporting Issues

Open an issue on GitHub with:

- **Steps to reproduce** the problem
- **Expected behavior** vs. actual behavior
- **Platform and version** information
- **Screenshots or logs** if applicable

### Feature Requests

Feature requests are welcome! Please open an issue with the tag `enhancement` and
describe:

- What the feature does
- Why it would be useful
- How it might be implemented (optional)

---

## Troubleshooting

### Common Issues

#### Application Won't Start

| Symptom | Cause | Solution |
|---|---|---|
| White screen on launch | WebView2 not installed | Install WebView2 Runtime from Microsoft |
| Crash on startup (Windows) | Missing VC++ redistributable | Install Visual C++ Redistributable 2022 |
| Crash on startup (Linux) | Missing webkit2gtk | `sudo apt install libwebkit2gtk-4.1-dev` |
| "Port already in use" | REST API server conflict | Change the port with `--port` flag |
| Blank window (macOS) | Gatekeeper blocking | Right-click > Open, or allow in System Settings |

#### FFmpeg Issues

| Symptom | Cause | Solution |
|---|---|---|
| "FFmpeg not found" | Not installed | Click "Install FFmpeg" in Media Mogul or Settings |
| Download fails | Network/firewall blocking | Download manually from ffmpeg.org and place in AppData |
| Checksum mismatch | Corrupted download | Delete the ffmpeg directory and re-download |
| Encoding fails | Outdated FFmpeg | Update to the latest version |

#### API Key Issues

| Symptom | Cause | Solution |
|---|---|---|
| "No API key configured" | Key not set | Go to Settings > API Keys and enter your key |
| "Invalid API key" | Incorrect key format | Check that the key starts with `sk-` (OpenAI) |
| "Rate limited" | Too many requests | Wait a moment and try again, or upgrade your API plan |
| OpenRouter fails | Key not configured | Set the OpenRouter key in Settings > OpenRouter |
| Fallback not working | Neither key set | Configure at least one of OpenAI or OpenRouter |

#### Godot Issues

| Symptom | Cause | Solution |
|---|---|---|
| "Godot not detected" | Not installed | Install from godotengine.org or use auto-download |
| "Invalid Godot path" | Wrong version | CryptArtist Studio requires Godot 4.x |
| Project creation fails | Invalid path characters | Use only alphanumeric characters in project names |
| Export fails | Missing export templates | Install Godot export templates for your target platform |

#### Build Issues

| Symptom | Cause | Solution |
|---|---|---|
| `tsc` errors | Type errors | Run `npx tsc --noEmit` and fix reported errors |
| `cargo check` errors | Rust compilation errors | Check Rust version (`rustup update`) |
| Vite build fails | Dependency issues | Delete `node_modules` and run `npm install` |
| Tauri build fails | Missing platform deps | Install platform-specific prerequisites (see Getting Started) |

### Debug Mode

Enable verbose logging by checking the log files:

```bash
# Windows
type "%LOCALAPPDATA%\CryptArtist Studio\logs\cryptartist-session.txt"

# macOS
cat ~/Library/Application\ Support/CryptArtist\ Studio/logs/cryptartist-session.txt

# Linux
cat ~/.local/share/CryptArtist\ Studio/logs/cryptartist-session.txt
```

Use CryptArt Commander to check system status:

```
health          # Application health check
sysinfo         # Full system information
keys status     # API key configuration
ffmpeg status   # FFmpeg installation
godot detect    # Godot detection
```

### Getting Help

1. Check the [FAQ](#faq) section below
2. Search [GitHub Issues](https://github.com/mattyjacks/CryptArtistStudio/issues)
3. Open a new issue with reproduction steps
4. Email [Matt@MattyJacks.com](mailto:Matt@MattyJacks.com)

---

## Performance Optimization

### Frontend Performance

CryptArtist Studio is designed for smooth performance even on lower-end hardware:

| Optimization | Implementation |
|---|---|
| **React.memo** | Heavy components are memoized to prevent unnecessary re-renders |
| **useCallback/useMemo** | Expensive computations and callbacks are memoized |
| **Lazy Loading** | Programs are loaded on-demand when navigated to |
| **Debouncing** | Search, resize, and input handlers are debounced |
| **Virtual Scrolling** | Long lists (command history, logs) use windowed rendering |
| **CSS Containment** | Layout-heavy components use CSS `contain` property |
| **Reduced Motion** | Animations respect `prefers-reduced-motion` media query |
| **Font Preloading** | Google Fonts are preconnected for faster loading |

### Backend Performance

| Optimization | Implementation |
|---|---|
| **Async I/O** | All file and network operations use Tokio async runtime |
| **Connection Pooling** | HTTP client reuses connections via `reqwest::Client` |
| **Request Timeouts** | All outbound requests have 30-second timeouts |
| **Streaming Responses** | Large responses are streamed rather than buffered |
| **Thread-Safe State** | `Mutex`-protected state with minimal lock contention |
| **Lazy Initialization** | FFmpeg, Godot, and log paths are resolved on first use |

### Memory Management

| Strategy | Implementation |
|---|---|
| **Log Rotation** | Session log capped at 100 lines, recent at 1,000 |
| **History Limits** | Command history: 500 entries, display: 200 entries |
| **Toast Queue** | Maximum 10 concurrent toast notifications |
| **Peer Limits** | Maximum 50 P2P connections in DonatePersonalSeconds |
| **Activity Logs** | Maximum 200 log entries per component |
| **Timeout Cleanup** | All `setTimeout`/`setInterval` cleaned up on unmount |
| **Storage Limits** | localStorage values capped at 5 MB each |

### Recommended System Requirements

| Component | Minimum | Recommended |
|---|---|---|
| **CPU** | Dual-core 2.0 GHz | Quad-core 3.0 GHz+ |
| **RAM** | 4 GB | 8 GB+ |
| **Storage** | 200 MB (app + FFmpeg) | 1 GB+ (with media files) |
| **Display** | 1280x720 | 1920x1080+ |
| **GPU** | Not required | WebGL-capable for DonatePersonalSeconds GPU detection |
| **Network** | Optional | Required for AI features and Pexels integration |

---

## Prompt History

CryptArtist Studio was built through a series of AI-assisted development sessions.
The prompt entries in this README are a summary view. The full archive is in
`prompts/all-prompts.md` and on GitHub:
`https://github.com/mattyjacks/CryptArtistStudio/blob/main/prompts/all-prompts.md`.
Some historical prompt text may contain minor AI transcription mistakes, so it is
not guaranteed to be 100% exact. We continuously improve prompt accuracy.

This history serves as both documentation and a case study in AI-assisted
("vibe coding") software development.

### Prompt 0 - Initial Project Setup

> In a new folder /v1/ make the following program: CryptArtist Studio.
> It is also integrated with OpenAI API and the user can enter their own API keys.
> Come up with cool features on your own.

**Result:** Created the initial Tauri + React + TypeScript project with the full
technology stack, FFmpeg auto-installer, OpenAI integration, and the foundational
architecture.

### Prompt 1 - Security and Branding

> Run npm audit on the packages and fix all vulnerabilities. "skull+art" is the logo
> of cryptartist.com. Also let people create images using the OpenAI API.

**Result:** Fixed npm vulnerabilities, established branding, added image generation.

### Prompt 2 - Initial Fixes

> Fix everything!

**Result:** Resolved initial bugs and integration issues.

### Prompt 3 - Naming Fix

> Don't call it Fusion Editor, that may be copyrighted, call it Node Mode.

**Result:** Renamed the node-based editor from "Fusion Editor" to "Node Mode" to
avoid trademark issues.

### Prompt 4 - Build Instructions

> Now how do I run it as an .exe or something?

**Result:** Added build instructions and packaging configuration.

### Prompt 5 - Running the App

> Run it for me.

**Result:** Started the development server and verified the app runs.

### Prompt 6 - Compilation

> Done. Compile it now.

**Result:** Compiled the application for distribution.

### Prompt 7 - Final Build

> Run npm run tauri build one last time!

**Result:** Created the final production build.

### Prompt 8 - UI/UX Debugging

> None of it works! I can switch between the tabs but the buttons don't do anything.

**Result:** Fixed all non-functional UI buttons and integrated them with the backend.

### Prompt 9 - Feature Integration

> Integrate every single upcoming feature. Now.

**Result:** Connected all planned features to working implementations.

### Prompt 10 - CLI and AI Integration

> Make it be able to be commanded and for projects to be edited through the command
> line, for integration with AI tools like Antigravity for helping test it.

**Result:** Added the full CLI powered by Clap with commands for project management,
file operations, AI chat, and system information.

### Prompt 11 - Pexels Integration

> Let the user browse pexels.com for images and videos, and add them to the project
> automatically, with support for multiple file sizes for videos at the same time.

**Result:** Added Pexels API integration with search, browse, and import functionality
in the Media Browser component.

### Prompt 12 - AI Studio Mode

> Now make an AI studio mode where the user can generate a video using prompts, and
> it will be automatically edited together from pexels.com videos, and put on the
> project. It can also have captions, and audio generated from OpenAI API.

**Result:** Created the AI Studio workspace with automated video generation pipeline:
script writing, Pexels footage selection, voiceover generation, caption creation,
and auto-editing.

### Prompt 13 - Git Cleanup

> Add the node modules to .gitignore.

**Result:** Added `node_modules/` to `.gitignore`.

### Prompt 14 - Prompt Documentation

> Add every single prompt I gave you to prompts/all-prompts.md starting before the
> prompts already on there, also organize them properly.

**Result:** Created the `prompts/all-prompts.md` file with all historical prompts
organized chronologically.

### Prompt 15 - Prompt Builder

> Look in /v1/ and make me a 1,200 word prompt for using with Windsurf Claude Opus
> 4.6 Thinking model, and return the prompt as /prompts/bigprompt-2.md.

**Result:** Generated a comprehensive 1,200-word prompt document (`bigprompt-2.md`)
that described the full suite refactor plan including all five programs, the
`.CryptArt` file format, and implementation guidelines.

### Prompt 16 - Suite Refactor Execution

> (The bigprompt-2.md mega-prompt - executed in full)

**Result:** Transformed CryptArtist Studio from a single video editor into a full
suite of five programs with the Suite Launcher, React Router navigation, and all
program shells implemented:
- Media Mogul (renamed from main editor)
- VibeCodeWorker (new - Monaco-based IDE)
- DemoRecorder (new - screen recorder)
- ValleyNet (new - AI agent)
- `.CryptArt` file format with save/open

### Prompt 17 - Making It Work + Legal

> Make it all actually work, bro. It doesn't work yet. Also add a privacy policy and
> terms of use, fully complying with New Hampshire, USA, law.

**Result:** Fixed all broken functionality across all five programs. Added a complete
Privacy Policy and Terms of Use with first-launch acceptance modal. Integrated
legal compliance for New Hampshire, USA jurisdiction.

### Prompt 18 - Mobile, API, CLI, and 35+ Improvements

> Make it work on Android and iOS, too. Make it all work better. Make every single
> improvement you can, also make it all workable through an API or the Command Line.
> In addition to the improvements you're thinking of, add 35 more improvements.

**Result:** Added mobile platform support configuration, REST API server, enhanced
CLI, and 35+ improvements across all programs including: error boundaries, loading
spinners, toast notifications, debounce utilities, format helpers, platform
detection, local storage persistence, mobile navigation, and keyboard shortcuts.

### Prompt 19 - GameStudio

> Make CryptArtist Media Mogul able to be combined with CryptArtist VibeCodeWorker
> and also the latest version of Godot, to be able to make videogames automatically.

**Result:** Created GameStudio - a new program combining Media Mogul, VibeCodeWorker,
and Godot Engine integration for AI-powered game development. Added Godot auto-
detection, download, and launch capabilities to the Rust backend.

### Prompt 20 - Automatic Logging System

> Add automatic logging to every single thing, making a constant "last 1000 lines"
> log file, and also a constant "every line ever" log file, and a "last 100 lines
> since last run" as .txt files with better names.

**Result:** Implemented a comprehensive three-file logging system:
- `cryptartist-session.txt` (last 100 lines per session)
- `cryptartist-recent.txt` (rolling 1,000 lines)
- `cryptartist-full-history.txt` (append-only complete history)

Added Rust logger module, frontend logger utility, and integrated logging into
every Tauri command, REST API endpoint, CLI command, and frontend component.

### Prompt 21 - Future-Proof .CryptArt File Format

> Make the .JSON files better organized for .CryptArt files. Use best practices, and
> ensure maximum compatibility across all current, past, and future .CryptArt files.
> Make it so I never need to upgrade the base of the .CryptArt files so it can live
> forever.

**Result:** Redesigned the `.CryptArt` format with a permanent envelope schema:
- `$cryptart: 1` magic key for self-identification
- Open program IDs (any string, not a closed union)
- Optional rich metadata, extensions, and history
- Backward compatibility with all old files
- Forward compatibility via index signatures
- Updated both TypeScript and Rust implementations

### Prompt 22 - VibeCodeWorker Feature Complete + JSON Expansion

> Add more features to VibeCodeWorker, make it fully feature complete and include
> automatic program testing and website testing like Google Antigravity has. Add more
> fields to the JSON, including everything you can think of, but make it so that
> not-including-everything it still works.

**Result:** Added five new features to VibeCodeWorker:
- **Testing Panel** - AI-powered + pattern-based test runner with auto-test on save
- **Web Audit Panel** - Lighthouse-style website quality analysis with 4 scores
- **Problems Panel** - Auto-scanning lint diagnostics
- **Search Panel** - Cross-file search and replace with regex
- **Tabbed Bottom Panel** - Unified 5-tab bottom panel replacing terminal-only view

Expanded `.CryptArt` JSON with 30+ new optional fields covering identity, metadata,
project structure, integrity, compatibility, extensibility, and export/sharing.

### Prompt 23 - Comprehensive README + Prompt Archive

> Make a 2,000 line README.md in multiple steps, including everything possible about
> the program. The program is open source. Add every prompt so far, including this
> one, to prompts/all-prompts.md.

**Result:** The initial 2,000-line README covering all five original programs, the
`.CryptArt` file format, technology stack, project architecture, installation guide,
CLI reference, REST API reference, configuration, logging, keyboard shortcuts,
privacy policy, contributing guidelines, and the complete prompt history.

### Prompt 24 - 100 UI/UX Improvements (Wave 1)

> Implement 100 new improvements across the entire CryptArtist Studio suite.

**Result:** Added 100 improvements (1-100) across all programs:
- Global CSS: gradient text, glass cards, skeleton loading, badges, kbd styling, tags,
  animated borders, progress rings, code blocks, new animations
- Tailwind config: extended color palette, new animation keyframes
- SuiteLauncher: search/filter, keyboard shortcuts (1-7), version badges, last-opened
  indicator, staggered animation, system status, clock, enhanced footer
- App.tsx: loading splash screen, 404 route, document title per route, error boundary
- VibeCodeWorker: file type icons, breadcrumb nav, editor controls, close-all tabs,
  welcome tab, keyboard shortcut help, enhanced status bar
- MediaMogul: keyboard shortcut bar, project duration, workspace transitions, quick
  export, undo/redo buttons, zoom controls, aspect ratio, volume slider
- DemoRecorder: countdown timer, recording time limit, audio level meter, screenshot
  button, quality presets, file size estimate, webcam overlay, hotkey hints
- ValleyNet: agent autonomy level, clear chat, quick task templates, agent personality,
  export conversation, connection status, message timestamps
- GameStudio: game genre selector, scene count, build target selector, play test button,
  asset counter, GDScript snippet library

### Prompt 25 - CryptArtist Studio Website

> Make me a full website about CryptArtist Studio, including links and stuff.

**Result:** Created the companion website in `website/A1/` with 8 HTML pages:
- `index.html` - Landing page with hero, program cards, feature highlights, tech stack
- `programs.html` - Detailed program breakdowns with feature lists
- `about.html` - Philosophy, story timeline, tech stack tables
- `docs.html` - .CryptArt format spec, CLI reference, REST API reference
- `download.html` - Platform download cards, build-from-source guide
- `contact.html` - Contact info, form, related site links
- `privacy.html` - Full privacy policy (NH law compliant)
- `terms.html` - Full terms of use (NH law compliant)
- `style.css` - Complete dark theme with gradients, animations, responsive design
- `script.js` - Navigation, scroll animations, accordion, counter animations

### Prompt 26 - 100 UI/UX Improvements (Wave 2)

> Implement improvements 101-200 across the entire CryptArtist Studio suite.

**Result:** Added 100 more improvements (101-200):
- Global CSS: toast notifications, dropdown menus, avatar components, switch toggles,
  breadcrumbs, glow effects, hover lift, spotlight effect, context menus, scrollbars,
  resize handles, FAB, notification dots, accordion sections
- Tailwind config: 8 new semantic colors, extended spacing, z-index scale, glow shadows,
  new animations (float, shake, wiggle, gradient-shift, expand, collapse, pop)
- SuiteLauncher: favorites system, recent projects panel, launch counter, uptime,
  quick actions dropdown, rotating tips carousel, keyboard shortcuts overlay
- VibeCodeWorker: git branch detection, cursor position, encoding selector, line ending
  toggle, auto-save toggle, command palette (Ctrl+Shift+P) with 20+ commands
- MediaMogul: timeline markers, render queue, clip counter, effects panel, media bin
  categories, color scopes, waveform toggle, proxy editing, project notes, auto-backup
- DemoRecorder: annotation tools, watermark toggle, multi-monitor, recording schedule,
  mouse highlight, click sound, auto-stop on silence, recording tags
- ValleyNet: workflow builder, scheduled tasks, agent memory system, token usage
  tracking, conversation bookmarks, agent plugins, streaming toggle, safe mode
- GameStudio: scene graph hierarchy, asset pipeline status, debug overlay, physics debug,
  resolution selector, performance stats, node inspector, VCS status
- Shared hooks library: useLocalStorage, useDebounce, useInterval, useToggle, etc.

### Prompt 27 - 100 UI/UX Improvements (Wave 3)

> Implement improvements 201-300 across the entire CryptArtist Studio suite.

**Result:** Added 100 more improvements (201-300):
- Global CSS: stepper/wizard, chip/tag input, timeline ruler, split pane dividers,
  color swatch palette, popover, styled range slider, inline editable label,
  mini calendar, vertical tabs, circular progress, drag handles, alert banners
- SuiteLauncher: category filter, What's New modal, sort options, grid/list view toggle,
  time-based greeting, suite health check, system info modal
- VibeCodeWorker: split editor, diff viewer, code snippets library, editor bookmarks,
  go-to-line dialog, file templates, indent detection, symbol outline, sticky scroll
- MediaMogul: color wheel grading, LUT browser, audio mixer, subtitle editor,
  transition library, keyframe editor, motion tracking, stabilization, HDR mode
- DemoRecorder: region selection, zoom during recording, crop tool, GIF preview,
  auto-chapter markers, recording profiles, picture-in-picture, frame rate monitor
- ValleyNet: agent chains, knowledge base, RAG context toggle, tool use log,
  conversation templates, agent personas, multi-model support, cost tracking
- GameStudio: tilemap editor, particle system preview, shader editor, profiler panel,
  input mapping editor
- Shared constants and types library

### Prompt 28 - CryptArt Commander + Settings + OpenRouter

> Add CryptArt Commander and Settings programs. Integrate OpenRouter API deeply
> into every program.

**Result:** Created two new programs:
- **CryptArt Commander** - Terminal emulator with 27+ built-in commands, script editor,
  REST API reference tab, command history, arrow key navigation, and OpenRouter
  integration via `or <prompt>` command
- **Settings** - Full settings hub with API Keys, OpenRouter, Appearance, and About
  sections. Import/export keys to `Forbidden-Secrets-of-CryptArtist-Keys-N.txt`
- **Rust Backend** - Added `openrouter_key` to AppState, new Tauri commands for
  OpenRouter chat, model listing, key import/export
- **Deep OpenRouter Integration** - All AI programs try OpenRouter first, fall back to
  OpenAI. 15 popular models across 6 providers.

### Prompt 29 - Deep Suite Enhancement (70 Improvements)

> Make more improvements across the entire CryptArtist Studio suite. Focus on deeper
> OpenRouter integration, new features, and UI polish.

**Result:** Added improvements 301-370:
- Shared OpenRouter utility module (`src/utils/openrouter.ts`)
- Settings: keyboard shortcuts section, data & storage management, danger zone
- Commander: tab completion, command aliases, 10+ new commands (uptime, whoami, open,
  env, bench, count, grep, head, tail), timestamps, enhanced status bar
- SuiteLauncher: AI status indicator, quick Settings link, updated What's New,
  system info with AI status, new tips, updated shortcuts for 7 programs
- ValleyNet: model picker, provider toggle, response format selector, system prompt
  editor, token budget selector
- VibeCodeWorker: OpenRouter provider dropdown, model selector
- GameStudio: model selector, provider badge, clear AI chat
- DemoRecorder: AI Tools panel with narration script generator and TTS
- AIStudio/MediaMogul: OpenRouter chat, provider toggle, model selector
- Global CSS: AI provider badges, model selector, AI panel components, streaming
  indicator, token usage bar, glow effects, gradient text, pulse ring, skeleton loading

### Prompt 30 - DonatePersonalSeconds Feature

> Add a donate computer page to the website and a donate computer component to the
> desktop app for P2P resource sharing.

**Result:** Created the DonatePersonalSeconds feature:
- Desktop: `DonatePersonalSeconds.tsx` with system resource detection, peer management,
  donation limits, live statistics, activity log, and secure random peer IDs
- Website: `donate-personal-seconds.html` page with control panel, live stats, and FAQ
- Website: `donate-personal-seconds-api.js` P2P resource sharing API with WebRTC
- Updated navigation across all website pages
- Added DonatePersonalSeconds to App.tsx routes and SuiteLauncher program grid

### Prompt 31 - Multi-File Workspace Management

> Support opening multiple .CryptArt files simultaneously with workspace management.

**Result:** Implemented workspace management system:
- `WorkspaceProvider.tsx` - React state provider with CRUD and group logic
- `WorkspaceBar.tsx` - Global tab bar UI with context menu
- `workspace.ts` - Types, context, and helper functions
- All 5 original programs integrated with `useWorkspace()` hook
- Resource sharing between workspaces (media, AI context, settings, files, chat history)
- Maximum 20 simultaneous workspaces

### Prompt 32 - Fix 100 Vulnerabilities

> Fix 100 more vulnerabilities. Add all these prompts to the all-prompts file.
> Update README.md with every single thing.

**Result:** Comprehensive security hardening:
- Created `security.ts` utility module with 30+ helper functions
- BATCH A (1-25): Rust backend - API key validation, URL validation, write size limits,
  path sanitization, HTTP timeouts, CORS preflight, security headers
- BATCH B (26-50): Frontend - CSP, localStorage validation, toast rate limiting,
  model ID validation, prototype pollution protection, ISO date validation
- BATCH C (51-75): Memory leaks - timeout cleanup, peer limits, history limits,
  input limits, double-click prevention, search sanitization
- BATCH D (76-100): Hardening - security headers, secure random, audit logging,
  safe JSON, file extension validation, UTF-8 validation

### Prompt 33 - README 700+ Line Update

> Update README.md with at least 700 more lines, in multiple steps. As always,
> prompts/all-prompts.md should be updated with this prompt.

**Result:** This update. Added 700+ lines to README.md covering:
- CryptArt Commander program documentation (40+ commands, aliases, scripts)
- DonatePersonalSeconds program documentation (P2P resource sharing)
- Settings program documentation (API keys, OpenRouter, appearance)
- Workspace Management system
- OpenRouter Multi-Model AI Integration
- Security Hardening documentation (300 vulnerability fixes, security utility API)
- CryptArtist Studio Website documentation
- Extended Prompt History (Prompts 24-33)
- Troubleshooting guide with common issues tables
- Performance Optimization guide
- Extended FAQ
- Updated directory structure

### Prompt 34 - Cross-Platform Support and Clone Tool

> Add cross-platform support for Windows, macOS, Linux, Android, and iOS.
> Add a Clone Tool for creating custom installers.

**Result:** Implemented cross-platform detection and Clone Tool:
- `cross-platform.ts` - Platform detection, responsive breakpoints, touch support
- `platform.ts` - Device type detection, mobile viewport hooks
- Clone Tool UI for creating custom branded installers
- Responsive layouts for all programs across screen sizes

### Prompt 35 - Security Hardening Batch 2 (Vulns 101-200)

> Add 100 more security vulnerability fixes to security.ts covering advanced
> frontend hardening, API security, data protection, and resource management.

**Result:** Added vulnerabilities 101-200 to `security.ts`:
- BATCH E (101-125): DOM XSS, event handlers, iframe, form, CSS injection, WebSocket, canvas
- BATCH F (126-150): Fetch hardening, CORS, cookie security, CSP nonce, SRI, rate limiting
- BATCH G (151-175): Template safety, clipboard, drag-drop, storage encryption, HSTS
- BATCH H (176-200): Focus trap, scroll safety, DOM monitoring, lazy loading, connection pool

### Prompt 36 - Security Hardening Batch 3 (Vulns 201-300) and Documentation Update

> Add 100 more security vulnerability fixes (201-300) to security.ts. Update Terms
> of Use and Privacy Policy. Update README.md comprehensively. Set version to 1.69.420.4.

**Result:** Completed the final batch of security fixes and documentation updates:
- BATCH I (201-250): CSP nonce injection, SRI cache, form guard, postMessage, DOM mutation,
  text purification, URL builder, credential detection, HSTS, cookie consent, Web Crypto,
  permission guard, object safety, event guard, leak detection, blob security, array zeroing
- BATCH J (251-300): Encrypted localStorage, WebSocket heartbeat, drag-drop validation,
  fetch retry with backoff, SVG sanitization, WebGL guard, audio fingerprint mitigation,
  battery/geolocation privacy, BroadcastChannel, device orientation, speech/gamepad guards,
  SharedArrayBuffer, WebTransport, WASM validation, screen capture, USB/serial/bluetooth,
  idle/wake lock, file handle, web share, notifications, error serialization, content
  editable, image validation, AbortController pool, console protection, comprehensive init
- Updated Terms of Use with DonatePersonalSeconds, Clone Tool, security section (17 sections)
- Updated Privacy Policy with OpenRouter, DonatePersonalSeconds, encrypted storage
- Version standardized to 1.69.420.4 across package.json, Cargo.toml, tauri.conf.json, constants.ts
- README updated with 300 vulnerability documentation (10 batches), renamed references

---

## Related Projects and Links

### Official Links

| Link | Description |
|---|---|
| [github.com/mattyjacks/CryptArtistStudio](https://github.com/mattyjacks/CryptArtistStudio) | Source code repository |
| [mattyjacks.com](https://mattyjacks.com) | Developer website and donations |
| [givegigs.com](https://givegigs.com) | Community donation platform |
| [mattyjacks.com/Contact](https://mattyjacks.com/Contact) | Contact page |
| [cryptartist.com](https://cryptartist.com) | CryptArtist community |

### Technology Links

| Link | Description |
|---|---|
| [tauri.app](https://tauri.app/) | Tauri desktop framework |
| [react.dev](https://react.dev/) | React UI library |
| [typescriptlang.org](https://www.typescriptlang.org/) | TypeScript language |
| [tailwindcss.com](https://tailwindcss.com/) | TailwindCSS framework |
| [ffmpeg.org](https://ffmpeg.org/) | FFmpeg media tools |
| [godotengine.org](https://godotengine.org/) | Godot game engine |
| [microsoft.github.io/monaco-editor](https://microsoft.github.io/monaco-editor/) | Monaco Editor |
| [pexels.com](https://www.pexels.com/) | Free stock photos and videos |

### Related Platforms

| Link | Description |
|---|---|
| [sitefari.com](https://sitefari.com) | Demo sharing platform |
| [givegigs.com](https://givegigs.com) | Media asset library and donations |

### Inspiration

| Project | Influence |
|---|---|
| **DaVinci Resolve** | Professional video editing paradigm |
| **VS Code** | Code editor UX and Monaco Editor |
| **Windsurf** | AI-powered vibe-coding workflow |
| **Google Antigravity** | AI coding and automated testing |
| **Google Lighthouse** | Website quality auditing |
| **OpenClaw** | Autonomous AI agent architecture |
| **OBS Studio** | Screen recording and streaming |
| **Godot Engine** | Open-source game development |

---

## Roadmap

### v0.2.0 (Planned)

- [ ] Full Godot project scaffolding and scene editor integration
- [ ] Real FFmpeg timeline rendering pipeline
- [ ] Twitch/YouTube RTMP streaming in DemoRecorder
- [ ] ValleyNet browser automation via embedded webview
- [ ] Skills marketplace for ValleyNet
- [ ] Plugin system for extending programs
- [ ] Undo/redo history for all editors
- [ ] Multi-window support (detachable panels)

### v0.3.0 (Planned)

- [ ] Android and iOS builds via Tauri mobile
- [ ] Cloud sync for `.CryptArt` projects
- [ ] Collaborative editing (multiplayer)
- [ ] Git integration in VibeCodeWorker
- [ ] Debugger and breakpoints in VibeCodeWorker
- [ ] Audio waveform visualization in Media Mogul
- [ ] Real-time video preview with wgpu rendering
- [ ] Marketplace for sharing `.CryptArt` templates

### v1.0.0 (Vision)

- [ ] Feature parity with DaVinci Resolve for video editing
- [ ] Feature parity with VS Code for code editing
- [ ] Full game development pipeline with Godot
- [ ] Autonomous AI agent capable of complex multi-step tasks
- [ ] Professional screen recording with hardware encoding
- [ ] Published on major app stores
- [ ] Comprehensive documentation site
- [ ] Active community of contributors

---

## Future Plans

The following is a comprehensive list of planned features, new programs, and
long-term initiatives for CryptArtist Studio. These range from near-term
improvements to ambitious moonshot projects.

### New Programs

#### [🤯CꜴS] CryptArtist Operating System

**CꜴS** (pronounced "chaos") is a planned vibe-coded operating system built
from scratch to run on any device or computer chip - including obscure,
legacy, and experimental architectures. CꜴS is the ultimate expression of the
CryptArtist philosophy: free, open, permanent, and user-controlled.

See the **[Detailed CꜴS Plan](#detailed-cꜴs-plan)** section below.

#### [🎿SLM] Small Language Model (Slalom)

**Slalom** is a planned lightweight, locally-runnable language model with a
skiing-inspired interface. It is designed to provide fast, private AI
inference without any cloud dependency.

See the **[Detailed SLM Plan](#detailed-slm-plan)** section below.

#### [BRD] BirdWatch - System Monitor

A real-time system resource monitor and task manager built into the suite.
Visualizes CPU, RAM, GPU, disk, and network usage with animated graphs.
Integrates with DonatePersonalSeconds to show donation/borrow impact.

#### [MKT] Marketplace

A built-in marketplace for sharing, discovering, and installing:
- `.CryptArt` project templates
- Mods and plugins
- AI prompt packs
- Color grading LUTs
- Sound effect libraries
- Godot game templates

#### [NET] NetBrowser

A minimal, privacy-focused web browser built into the suite using Tauri's
webview. Integrates with ValleyNet for AI-assisted browsing, form-filling,
and web scraping. Supports tabbed browsing, ad blocking, and reader mode.

#### [SYN] SyncStation

Cloud and local sync for `.CryptArt` projects across devices. Supports:
- End-to-end encrypted cloud storage (user-provided S3/GCS/Azure bucket)
- Local network sync via mDNS/Bonjour discovery
- Git-style version history with branch and merge
- Conflict resolution with visual diff viewer

#### [TRN] TrainYard

A visual machine learning training interface for fine-tuning small models
on local hardware. Supports LoRA adapters, dataset management, training
progress visualization, and model export. Integrates with Slalom [🎿SLM]
for local inference after training.

#### [ARK] Archive

A universal file format converter and digital preservation tool. Converts
between 100+ file formats (images, video, audio, documents, 3D models).
Includes batch processing, metadata preservation, and format validation.

#### [COM] Community Hub

A built-in forum and chat system for CryptArtist Studio users. Features
include project showcase, help requests, collaboration matching, and
direct messaging. All communication is encrypted and can be self-hosted.

### Existing Program Enhancements

#### Media Mogul [MMo]

- [ ] Real-time GPU-accelerated video preview via wgpu/WebGPU
- [ ] Motion graphics and title designer
- [ ] Multicam editing with sync
- [ ] 3D compositing with depth maps
- [ ] AI-powered auto-edit from transcript
- [ ] Spatial audio mixing and binaural rendering
- [ ] HDR and Dolby Vision grading
- [ ] Live collaboration on timelines
- [ ] ElevenLabs voice cloning integration
- [ ] AI music generation (Suno/Udio integration)
- [ ] Subtitle translation with AI
- [ ] AI scene detection and auto-chapter markers

#### VibeCodeWorker [VCW]

- [ ] Full LSP (Language Server Protocol) support
- [ ] Integrated debugger with breakpoints and step-through
- [ ] Git integration with visual diff, merge, and blame
- [ ] AI code review with inline suggestions
- [ ] Terminal emulator built into the IDE
- [ ] Multi-cursor editing and vim keybindings
- [ ] Jupyter notebook support
- [ ] Live preview for web development (HTML/CSS/JS)
- [ ] Package manager integration (npm, pip, cargo)
- [ ] AI pair programming with voice commands
- [ ] Snippet library with AI-generated snippets
- [ ] Refactoring tools (rename, extract, inline)

#### DemoRecorder [DRe]

- [ ] Hardware-accelerated encoding (NVENC, QSV, AMF)
- [ ] Twitch/YouTube/Kick RTMP live streaming
- [ ] Webcam overlay with green screen removal
- [ ] Audio mixer with per-source volume control
- [ ] Replay buffer (save last N seconds)
- [ ] Scheduled recordings
- [ ] AI-powered highlight detection
- [ ] Annotation tools (draw on screen during recording)

#### ValleyNet [VNt]

- [ ] Browser automation via embedded webview
- [ ] File system operations (create, read, write, organize)
- [ ] Email and calendar integration
- [ ] Skills marketplace (installable capabilities)
- [ ] Multi-agent collaboration (multiple ValleyNet instances)
- [ ] Voice control and dictation
- [ ] Workflow builder (visual task automation)
- [ ] Computer vision (screen understanding)
- [ ] API integration hub (Zapier-like connectors)

#### GameStudio [GSt]

- [ ] Visual scene editor with drag-and-drop
- [ ] Sprite editor and animation timeline
- [ ] Physics debugger and collision visualizer
- [ ] Asset store with free game assets
- [ ] One-click export to Web, Windows, macOS, Linux, Android, iOS
- [ ] AI-generated game levels and characters
- [ ] Multiplayer networking templates
- [ ] Sound designer with procedural audio
- [ ] Video Game Cloner: Wikipedia-based mechanic extraction pipeline
- [ ] Video Game Cloner: emoji-to-3D graphics upgrade workflow
- [ ] Video Game Cloner: patent/copyright detection and avoidance engine
- [ ] Video Game Cloner: public domain game library with one-click clone
- [ ] Video Game Cloner: multiplayer clone support (clone networked games)

#### CryptArt Commander [CAC]

- [ ] SSH and SFTP remote connections
- [ ] Tmux-style pane splitting
- [ ] Plugin commands (user-installable command packs)
- [ ] Cron-style scheduled command execution
- [ ] Pipeline builder (chain commands visually)
- [ ] REST API testing (Postman-like interface)

#### DonatePersonalSeconds [DPS]

- [ ] Real WebRTC P2P connections (currently simulated)
- [ ] Task queue with priority scheduling
- [ ] Reputation system for donors and borrowers
- [ ] Cryptocurrency micropayments for compute time
- [ ] Docker/WASM workload containers
- [ ] Distributed AI training across peer network
- [ ] Bandwidth sharing for CDN-like content delivery

#### Suite Launcher [SLr]

- [ ] Customizable dashboard widgets
- [ ] Recent file previews with thumbnails
- [ ] Plugin/mod discovery feed
- [ ] Project templates gallery
- [ ] Drag-and-drop file opening
- [ ] Multi-monitor workspace layout presets

### Platform Launch Plans - Every Platform Possible

CryptArtist Studio aims to launch on **every single platform possible**, making the
full creative suite accessible to every human on the planet regardless of what device
they own. Users will be able to pay for API credits using the ecosystem's default
payment system integrated directly into each platform build.

#### Desktop Platforms

| Platform | Format | Distribution | Status |
|---|---|---|---|
| **Windows 10** | `.exe` installer | Direct download, Microsoft Store | Priority |
| **Windows 10** | `.msi` installer | Direct download, enterprise deployment | Priority |
| **Windows 11** | `.exe` installer | Direct download, Microsoft Store | Priority |
| **Windows 11** | `.msi` installer | Direct download, enterprise deployment | Priority |
| **Windows 11** | `.msix` package | Microsoft Store, Windows Package Manager | Planned |
| **macOS 12+ (Intel)** | `.dmg` disk image | Direct download, Mac App Store | Priority |
| **macOS 12+ (Apple Silicon)** | `.dmg` disk image | Direct download, Mac App Store | Priority |
| **macOS Universal** | `.dmg` universal binary | Direct download | Priority |
| **Linux (Ubuntu 22+)** | `.deb` package | Direct download, apt repository | Priority |
| **Linux (Ubuntu 22+)** | `.AppImage` | Direct download, AppImageHub | Priority |
| **Linux (Fedora/RHEL)** | `.rpm` package | Direct download, dnf/yum repository | Planned |
| **Linux (Any)** | `.tar.gz` portable | Direct download | Planned |
| **Linux (Any)** | Flatpak | Flathub | Planned |
| **Linux (Any)** | Snap | Snapcraft | Planned |
| **Linux (Arch)** | AUR package | Arch User Repository | Planned |
| **Linux (NixOS)** | Nix package | nixpkgs | Planned |
| **ChromeOS / Chromebook** | Progressive Web App | Chrome Web Store | Planned |
| **ChromeOS / Chromebook** | Linux (Crostini) `.deb` | Direct download | Planned |
| **FreeBSD** | `.pkg` package | Direct download | Experimental |

#### Mobile Platforms

| Platform | Format | Distribution | Status |
|---|---|---|---|
| **iOS (iPhone)** | `.ipa` | Apple App Store | Planned |
| **iOS (iPad)** | `.ipa` (iPad optimized) | Apple App Store | Planned |
| **iPadOS** | `.ipa` (Stage Manager support) | Apple App Store | Planned |
| **Android Phones** | `.apk` / `.aab` | Google Play Store, F-Droid, direct APK | Planned |
| **Android Tablets** | `.apk` / `.aab` (tablet UI) | Google Play Store | Planned |
| **Android TV** | `.apk` (leanback UI) | Google Play Store | Experimental |
| **Android Auto / Carplay** | Companion app | Google Play / App Store | Experimental |
| **Samsung DeX** | Android `.apk` (desktop mode) | Galaxy Store, Google Play | Planned |
| **Huawei HarmonyOS** | `.hap` package | Huawei AppGallery | Experimental |

#### Gaming Platforms

| Platform | Format | Distribution | Status |
|---|---|---|---|
| **Steam (Windows)** | Steam build | Steam Store | Priority |
| **Steam (macOS)** | Steam build | Steam Store | Priority |
| **Steam (Linux)** | Steam build (native + Proton) | Steam Store | Priority |
| **Steam Deck** | Steam build (Deck verified) | Steam Store | Priority |
| **Nintendo Switch** | `.nsp` / eShop build | Nintendo eShop | Experimental |
| **Nintendo Switch 2** | eShop build | Nintendo eShop | Experimental |
| **Nintendo DS / 3DS** | Homebrew `.nds` / `.3dsx` | Homebrew channel | Experimental |
| **Xbox Series X/S** | UWP / GDK build | Microsoft Store (Xbox) | Experimental |
| **Xbox One** | UWP build | Microsoft Store (Xbox) | Experimental |
| **PlayStation 5** | PS5 SDK build | PlayStation Store | Experimental |
| **PlayStation 4** | PS4 SDK build | PlayStation Store | Experimental |
| **PlayStation Vita** | Homebrew build | HENkaku | Experimental |
| **Meta Quest 2/3/Pro** | `.apk` (VR UI) | Meta Quest Store | Experimental |
| **Apple Vision Pro** | visionOS app | Apple App Store | Experimental |

#### Embedded and IoT Platforms

| Platform | Format | Distribution | Status |
|---|---|---|---|
| **Raspberry Pi 4/5** | `.deb` (ARM64) | apt repository, direct download | Planned |
| **Raspberry Pi 3** | `.deb` (ARMv7) | apt repository | Experimental |
| **Raspberry Pi Zero 2 W** | Lightweight build | Direct download | Experimental |
| **Raspberry Pi Pico** | MicroPython/C companion | Direct flash | Experimental |
| **Arduino** | Serial companion protocol | Arduino IDE library | Experimental |
| **ESP32** | Firmware companion | PlatformIO, Arduino IDE | Experimental |
| **NVIDIA Jetson** | `.deb` (ARM64, CUDA) | Direct download | Planned |
| **BeagleBone** | `.deb` (ARMv7) | Direct download | Experimental |
| **Pine64 devices** | `.deb` / Flatpak | Direct download | Experimental |
| **RISC-V boards** | Portable binary | Direct download | Experimental |

#### Smart TV and Display Platforms

| Platform | Format | Distribution | Status |
|---|---|---|---|
| **Samsung Smart TV (Tizen)** | Tizen `.wgt` widget | Samsung App Store | Experimental |
| **LG Smart TV (webOS)** | webOS `.ipk` app | LG Content Store | Experimental |
| **Android TV** | `.apk` (leanback UI) | Google Play Store | Experimental |
| **Apple TV (tvOS)** | tvOS app | Apple App Store | Experimental |
| **Amazon Fire TV** | `.apk` | Amazon Appstore | Experimental |
| **Roku** | BrightScript channel | Roku Channel Store | Experimental |
| **Chromecast with Google TV** | `.apk` | Google Play Store | Experimental |

#### Wearable and Specialty Platforms

| Platform | Format | Distribution | Status |
|---|---|---|---|
| **Apple Watch (watchOS)** | watchOS companion app | Apple App Store | Experimental |
| **Wear OS (Google)** | `.apk` Wear OS | Google Play Store | Experimental |
| **Samsung Galaxy Watch (Tizen)** | Tizen wearable | Galaxy Store | Experimental |
| **Garmin watches** | Connect IQ widget | Garmin Connect IQ | Experimental |
| **Fitbit** | Fitbit SDK app | Fitbit Gallery | Experimental |
| **TI-84 Plus CE** | Calculator app | ticalc.org | Experimental |
| **TI-Nspire CX** | Lua app | ticalc.org | Experimental |
| **Casio fx-CG50** | Add-in | casio.com | Experimental |
| **HP Prime** | PPL app | hpcalc.org | Experimental |
| **Kindle (e-ink)** | Sideloaded APK | Direct download | Experimental |
| **reMarkable tablet** | Custom app | Direct sideload | Experimental |

#### Web and Cloud Platforms

| Platform | Format | Distribution | Status |
|---|---|---|---|
| **Web Browser (any)** | Progressive Web App | cryptartiststudio.com | Priority |
| **Web Browser (any)** | WebAssembly standalone | Direct URL | Priority |
| **Cloudflare Workers** | Edge deployment | Cloudflare dashboard | Planned |
| **Docker** | Container image | Docker Hub, GitHub Container Registry | Planned |
| **Self-hosted server** | Docker Compose | Direct download | Planned |
| **Kubernetes** | Helm chart | Artifact Hub | Planned |
| **AWS Lambda** | Serverless build | AWS Marketplace | Experimental |
| **Google Cloud Run** | Container | GCP Marketplace | Experimental |
| **Azure Container Instances** | Container | Azure Marketplace | Experimental |
| **Vercel** | Edge functions | Vercel Marketplace | Planned |
| **Netlify** | Static + serverless | Netlify | Planned |
| **GitHub Codespaces** | Dev container | GitHub Marketplace | Planned |
| **Gitpod** | Dev container | gitpod.io | Planned |
| **Replit** | Repl template | Replit | Planned |
| **CodeSandbox** | Sandbox template | CodeSandbox | Planned |

#### Legacy and Retro Platforms

| Platform | Format | Distribution | Status |
|---|---|---|---|
| **Windows 7/8** | `.exe` (Electron fallback) | Direct download | Planned |
| **Windows XP** | Minimal CLI build | Direct download | Experimental |
| **macOS 10.13+ (High Sierra)** | `.dmg` legacy build | Direct download | Experimental |
| **Ubuntu 18.04/20.04** | `.AppImage` / `.deb` | Direct download | Planned |
| **32-bit Linux (i686)** | Portable binary | Direct download | Experimental |
| **PowerPC Mac (G4/G5)** | CLI-only build | Direct download | Experimental |
| **DOS** | CLI companion (DJGPP) | Floppy disk image | Experimental |
| **Amiga** | CLI companion (AmigaOS 4) | AmiNet | Experimental |
| **Haiku OS** | `.hpkg` package | HaikuDepot | Experimental |
| **ReactOS** | Windows `.exe` (compatibility) | Direct download | Experimental |

#### Platform-Specific Features

Each platform build includes adaptations for optimal UX:

| Platform | Adaptations |
|---|---|
| **Desktop (Win/Mac/Linux)** | Full 11-program suite, keyboard shortcuts, multi-window |
| **Steam / Steam Deck** | Controller support, Steam overlay, achievements, workshop |
| **Mobile (iOS/Android)** | Touch-optimized UI, gesture navigation, camera integration |
| **Tablet (iPad/Android)** | Split-view, Apple Pencil/stylus support, keyboard support |
| **Smart TV** | D-pad navigation, remote control UI, simplified programs |
| **Wearable** | Companion notifications, quick actions, voice control |
| **Calculator** | Text-only Commander interface, basic AI chat |
| **Raspberry Pi** | GPIO integration, hardware monitoring, lightweight mode |
| **Arduino/ESP32** | Serial command protocol for hardware projects |
| **Web** | No install required, cloud save, share via URL |
| **VR (Quest/Vision Pro)** | 3D workspace, spatial UI, hand tracking, virtual screens |
| **Console (Xbox/PS5/Switch)** | Controller UI, TV-safe zone, console-native features |

#### API Credit Payment Integration

All platform builds include integrated payment for AI API credits through the
ecosystem's default payment system:

- **Desktop/Web** - Stripe integration for credit card / debit card payments
- **Steam** - Steam Wallet microtransactions for API credit bundles
- **iOS/iPadOS** - Apple In-App Purchase for credit packs
- **Android** - Google Play Billing for credit packs
- **Xbox** - Microsoft Store commerce for credit packs
- **PlayStation** - PlayStation Store wallet for credit packs
- **Nintendo** - Nintendo eShop prepaid for credit packs
- **Cryptocurrency** - Bitcoin, Ethereum, and stablecoin payments (all platforms)
- **GiveGigs Credits** - Earn credits by completing tasks on givegigs.com
- **DonatePersonalSeconds [🗡️DPS]** - Earn API credits by donating compute time

Credit pricing tiers:

| Tier | Credits | Price | Best For |
|---|---|---|---|
| **Starter** | 1,000 credits | $1.00 | Trying out AI features |
| **Creator** | 10,000 credits | $8.00 | Regular creative work |
| **Pro** | 50,000 credits | $35.00 | Professional workflows |
| **Studio** | 200,000 credits | $120.00 | Production teams |
| **Unlimited** | Unlimited / month | $49.00/mo | Power users |
| **Free** | 100 credits/day | $0.00 | Funded by DPS donations |

Credits are universal across all AI providers (OpenAI, Anthropic, Google, etc.)
and all programs in the suite. Unused credits never expire.

#### Platform Launch Timeline

| Phase | Target | Platforms |
|---|---|---|
| **Phase 1** | 2026 Q3 | Windows 10/11 (.exe, .msi), macOS, Linux (.deb, .AppImage), Web PWA |
| **Phase 2** | 2026 Q4 | Steam (PC, Mac, Linux, Deck), Flatpak, Snap, Chromebook |
| **Phase 3** | 2027 Q1 | iOS (iPhone, iPad), Android (Phone, Tablet), Docker |
| **Phase 4** | 2027 Q2 | Raspberry Pi, NVIDIA Jetson, Samsung DeX, Kubernetes |
| **Phase 5** | 2027 Q3 | Smart TVs (Samsung, LG, Android TV, Apple TV, Fire TV) |
| **Phase 6** | 2027 Q4 | Wearables (Apple Watch, Wear OS, Galaxy Watch) |
| **Phase 7** | 2028 Q1 | Gaming consoles (Xbox, PS5, Nintendo Switch 1 & 2) |
| **Phase 8** | 2028 Q2 | VR/AR (Meta Quest, Apple Vision Pro), Calculators |
| **Phase 9** | 2028 Q3 | Embedded (Arduino, ESP32, BeagleBone, RISC-V) |
| **Phase 10** | 2028 Q4 | Legacy/Retro (Windows 7, macOS legacy, PowerPC, DOS, Amiga) |

### Platform and Infrastructure

- [ ] **Android and iOS** - Native mobile builds via Tauri 2 mobile
- [ ] **Web version** - Run CryptArtist Studio in the browser via WebAssembly
- [ ] **Self-hosted server** - Host your own CryptArtist instance for teams
- [ ] **Electron fallback** - Alternative desktop build for broader compatibility
- [ ] **Flatpak and Snap** - Linux package manager distribution
- [ ] **Microsoft Store and Mac App Store** - Official store listings
- [ ] **Steam Store** - Steam builds for PC, Mac, Linux, and Steam Deck
- [ ] **Auto-updater** - In-app update mechanism with delta patches
- [ ] **Crash reporter** - Opt-in crash reporting with stack traces
- [ ] **Telemetry dashboard** - Opt-in anonymous usage analytics
- [ ] **i18n / Localization** - Multi-language UI (Spanish, French, German, Japanese, Chinese, Korean, Arabic, Hindi, Portuguese, Russian, Turkish, Vietnamese, Thai, Indonesian, Polish, Dutch, Swedish, Norwegian, Danish, Finnish, Czech, Romanian, Hungarian, Greek, Hebrew, Swahili, Zulu, Yoruba, Amharic, Tagalog, Malay, Bengali, Urdu, Gujarati, Tamil, Telugu, Kannada, Malayalam, Marathi, Punjabi, Nepali, Sinhala, Burmese, Khmer, Lao, Mongolian, Tibetan, Georgian, Armenian, Azerbaijani, Kazakh, Uzbek, Kurdish, Pashto, Dari, Farsi, Esperanto, Latin, Klingon, Elvish)
- [ ] **Accessibility** - Screen reader support, high contrast mode, keyboard-only navigation, voice control, reduced motion, large text mode, dyslexia-friendly fonts, color blind modes
- [ ] **Offline mode** - Full functionality without internet (local AI via Slalom [🎿SLM])
- [ ] **Docker official image** - `docker pull cryptartiststudio/studio:latest`
- [ ] **Kubernetes Helm chart** - One-command team deployment
- [ ] **Edge deployment** - Cloudflare Workers, Vercel Edge, Deno Deploy
- [ ] **Calculator builds** - TI-84, TI-Nspire, Casio fx-CG50, HP Prime
- [ ] **Wearable builds** - Apple Watch, Wear OS, Galaxy Watch, Garmin, Fitbit
- [ ] **Smart TV builds** - Samsung Tizen, LG webOS, Android TV, Apple TV, Roku, Fire TV
- [ ] **Console builds** - Xbox Series X/S, PS5, Nintendo Switch 1 & 2
- [ ] **VR/AR builds** - Meta Quest 2/3/Pro, Apple Vision Pro
- [ ] **Embedded builds** - Raspberry Pi, Arduino, ESP32, Jetson, RISC-V
- [ ] **Legacy builds** - Windows 7/8, macOS High Sierra, 32-bit Linux, PowerPC

### AI and Machine Learning

- [ ] **Local AI inference** - Run models locally via llama.cpp, Ollama, or Slalom [🎿SLM]
- [ ] **Voice control** - Control any program with natural language voice commands
- [ ] **AI memory** - Persistent context across sessions and programs
- [ ] **Multi-modal AI** - Image, audio, and video understanding in AI prompts
- [ ] **AI agents marketplace** - Share and install custom AI agent configurations
- [ ] **Fine-tuning UI** - Fine-tune models on your own data via TrainYard [TRN]
- [ ] **AI model benchmarking** - Compare model performance on your specific tasks
- [ ] **Prompt library** - Community-curated prompt templates for every program
- [ ] **On-device training** - Train small models directly on user hardware
- [ ] **Federated learning** - Collaborative model improvement across DPS network
- [ ] **AI code generation** - Full project scaffolding from natural language
- [ ] **AI video generation** - Text-to-video with Sora, Runway, Kling integration
- [ ] **AI music generation** - Suno, Udio, and local music model integration
- [ ] **AI 3D generation** - Text-to-3D model generation for GameStudio
- [ ] **AI voice cloning** - ElevenLabs voice cloning for personalized TTS
- [ ] **Real-time translation** - Live subtitle translation in 100+ languages
- [ ] **Sentiment analysis** - AI-powered mood detection in text and audio
- [ ] **Content moderation** - AI-powered content safety for community features

### Community and Ecosystem

- [ ] **CryptArtist Studio Hub** - Central website for projects, mods, and community
- [ ] **Mod SDK** - Full documentation and tooling for mod developers
- [ ] **Theme designer** - Visual theme editor with live preview
- [ ] **Tutorial system** - Interactive in-app tutorials for each program
- [ ] **Certification program** - Skills certification for CryptArtist mastery
- [ ] **Hackathons** - Regular community hackathons with prizes
- [ ] **YouTube channel** - Official tutorials and development vlogs
- [ ] **Discord server** - Community chat and support
- [ ] **Bug bounty program** - Security rewards for vulnerability reports
- [ ] **University partnerships** - Academic license and curriculum integration
- [ ] **Nonprofit program** - Free enhanced features for registered nonprofits
- [ ] **Creator fund** - Revenue sharing for popular mod/plugin creators
- [ ] **Localization bounties** - Community-driven translation with rewards
- [ ] **Annual conference** - CryptArtist Con with workshops and networking
- [ ] **Ambassador program** - Community leaders with early access and perks

---

## Detailed CꜴS Plan

### [🤯CꜴS] CryptArtist Operating System - Full Specification

**CꜴS** is a from-scratch, vibe-coded operating system that embodies the
CryptArtist philosophy at the deepest level. It is designed to run on
literally any device - from modern x86-64 and ARM64 machines to obscure
and experimental architectures like RISC-V, MIPS, PowerPC, SPARC, Xtensa,
AVR microcontrollers, and even custom FPGAs.

#### Design Philosophy

1. **Universal** - One OS for every chip. CꜴS compiles to any instruction set.
2. **Minimal** - The kernel fits in under 1 MB. Boot in under 2 seconds.
3. **Secure** - Capability-based security model. No root user. No sudo.
4. **AI-Native** - The OS itself is an AI agent. Talk to your computer.
5. **Permanent** - File formats and APIs never break. Forward-compatible forever.
6. **Beautiful** - GPU-accelerated compositor with smooth 120fps animations.
7. **Open** - CryptArtist Custom License v1.69.420.3. Every line of code is auditable.

#### Architecture Overview

```
Layer 5: Applications    - CryptArtist Suite, user apps, WASM apps
Layer 4: Desktop Shell   - Window manager, compositor, notification center
Layer 3: System Services - File system, networking, audio, GPU, AI runtime
Layer 2: HAL             - Hardware Abstraction Layer (per-architecture)
Layer 1: Microkernel     - Scheduling, IPC, memory management, capabilities
Layer 0: Bootloader      - UEFI/BIOS/custom boot for each platform
```

#### Supported Architectures (Planned)

| Architecture | Status | Notes |
|---|---|---|
| **x86-64** | Priority | Desktop PCs, laptops, servers |
| **ARM64 (AArch64)** | Priority | Apple Silicon, Raspberry Pi 4/5, phones |
| **RISC-V (RV64GC)** | Priority | Open-source ISA, growing ecosystem |
| **ARM32 (ARMv7)** | Planned | Older Raspberry Pi, embedded devices |
| **x86 (i686)** | Planned | Legacy 32-bit PCs |
| **MIPS32/64** | Planned | Routers, embedded systems, retro hardware |
| **PowerPC** | Planned | Old Macs, IBM servers, game consoles |
| **SPARC** | Planned | Sun/Oracle servers |
| **Xtensa** | Planned | ESP32 microcontrollers |
| **AVR** | Experimental | Arduino (extremely constrained) |
| **WebAssembly** | Planned | Run CꜴS in a browser |
| **Custom FPGA** | Experimental | User-designed CPU architectures |

#### Microkernel Design

The CꜴS microkernel is a capability-based, message-passing microkernel
written in Rust with minimal unsafe code:

- **Scheduler** - Preemptive, priority-based, O(1) scheduler with per-core run queues
- **IPC** - Synchronous and asynchronous message passing between processes
- **Memory** - Virtual memory with demand paging, copy-on-write, and ASLR
- **Capabilities** - Every resource access requires an unforgeable capability token
- **Interrupts** - User-space interrupt handlers for maximum driver flexibility

#### Hardware Abstraction Layer (HAL)

Each supported architecture has a HAL implementation that provides:

- CPU initialization and feature detection
- Interrupt controller setup (APIC, GIC, PLIC, etc.)
- Timer abstraction (HPET, ARM Generic Timer, RISC-V mtime)
- UART/serial console for early boot debugging
- Page table management per architecture
- Cache and TLB management
- Power management (ACPI, device tree, etc.)

#### File System: CryptFS

A new file system designed for CꜴS:

- **Content-addressable** - Files identified by cryptographic hash
- **Versioned** - Every file change creates a new version (git-like history)
- **Encrypted** - Optional per-file or per-directory encryption
- **Deduplicated** - Identical blocks stored only once
- **Mountable anywhere** - Mount remote CryptFS volumes over the network
- **Maximum file size** - 16 exabytes
- **Maximum volume size** - 1 zettabyte

#### Desktop Shell: CryptShell

The CꜴS desktop environment:

- **Tiling + Floating** - Hybrid window manager (like i3 + macOS)
- **GPU Compositor** - Vulkan/Metal/WebGPU-based rendering at 120fps
- **AI Assistant** - Built-in AI assistant accessible from any context
- **Universal Search** - Search files, apps, settings, and the web from one bar
- **Notification Center** - Priority-based notifications with AI filtering
- **Widget Dashboard** - Customizable widgets (clock, weather, system stats, etc.)
- **Theming** - Full theme engine with CSS-like styling language
- **Gestures** - Trackpad and touchscreen gesture support
- **Virtual Desktops** - Unlimited virtual desktops with named workspaces

#### AI Runtime

CꜴS includes a system-level AI runtime:

- **Local inference** - Run language models directly on the OS (llama.cpp, ONNX)
- **Voice control** - System-wide voice commands in any language
- **Smart autocomplete** - AI-powered autocomplete in every text field
- **Predictive launching** - AI predicts which apps you'll open next
- **Automated maintenance** - AI manages updates, cleanup, and optimization
- **Natural language shell** - Type commands in plain English

#### Networking Stack

- **TCP/IP** - Full IPv4 and IPv6 networking stack
- **DNS** - Built-in DNS resolver with DNS-over-HTTPS
- **Firewall** - Application-level firewall with AI-suggested rules
- **VPN** - Built-in WireGuard VPN client
- **P2P** - Native peer-to-peer networking (used by DonatePersonalSeconds)
- **Mesh networking** - Optional mesh mode for local device clusters

#### Development Timeline

| Phase | Target | Milestone |
|---|---|---|
| **Phase 1** | 2026 Q3 | Bootloader + microkernel on x86-64 (serial console) |
| **Phase 2** | 2026 Q4 | Memory management, process scheduling, basic IPC |
| **Phase 3** | 2027 Q1 | CryptFS, basic device drivers, ARM64 port |
| **Phase 4** | 2027 Q2 | GPU compositor, window manager, keyboard/mouse |
| **Phase 5** | 2027 Q3 | Networking stack, package manager, RISC-V port |
| **Phase 6** | 2027 Q4 | AI runtime, CryptArtist Suite port, WASM apps |
| **Phase 7** | 2028 Q1 | MIPS/PowerPC/SPARC ports, stability hardening |
| **Phase 8** | 2028 Q2 | Public beta, community contributions, app ecosystem |

#### Technical Inspirations

- **seL4** - Formally verified microkernel (capability model)
- **Redox OS** - Rust-based microkernel OS
- **Plan 9** - Everything-is-a-file philosophy
- **Fuchsia** - Capability-based security, Zircon microkernel
- **TempleOS** - One person building an entire OS (spirit of the project)
- **Linux** - Broad hardware support and driver ecosystem

---

## Detailed SLM Plan

### [🎿SLM] Small Language Model (Slalom) - Full Specification

**Slalom** (pronounced like the skiing term) is a planned small, fast,
locally-runnable language model designed specifically for CryptArtist Studio.
The name reflects its design: like a skier navigating a slalom course, the
model weaves efficiently through tokens, taking the fastest path to the answer.

#### Skiing-Inspired Interface

The Slalom interface is themed around skiing and winter sports:

- **Slopes** - Different model sizes are called slopes:
  - **Bunny Slope** (300M params) - Fast, lightweight, basic tasks
  - **Blue Run** (1B params) - General purpose, good quality
  - **Black Diamond** (3B params) - High quality, more compute needed
  - **Double Black** (7B params) - Maximum quality, GPU recommended
- **Moguls** - Difficult prompts that challenge the model (benchmark suite)
- **Lift Tickets** - API access tokens for remote Slalom instances
- **Powder** - Fresh, uncached responses (vs. cached "groomed" responses)
- **Apres-Ski** - Post-inference analytics and token usage dashboard

#### UI Design

The Slalom interface features:

- **Snow-themed dark mode** - Deep navy background with white/ice-blue accents
- **Mountain silhouette header** - Animated mountain range with parallax scrolling
- **Slope selector** - Visual mountain with clickable difficulty indicators
- **Speed gauge** - Real-time tokens-per-second display styled as a ski speedometer
- **Trail map** - Visual token generation path showing model attention patterns
- **Chairlift progress bar** - Loading indicator styled as a moving chairlift
- **Snowflake particles** - Subtle animated snowfall in the background
- **Temperature slider** - Styled as a thermometer with icicles

#### Model Architecture

Slalom uses a custom transformer architecture optimized for size and speed:

- **Grouped Query Attention (GQA)** - Reduced memory bandwidth
- **RoPE positional encoding** - Efficient rotary position embeddings
- **SwiGLU activation** - Better training stability than ReLU
- **RMSNorm** - Faster than LayerNorm with comparable results
- **Sliding window attention** - Efficient long-context handling
- **4-bit quantization** - GGUF format for minimal memory usage
- **Speculative decoding** - Draft model for 2-3x faster generation

#### Training Data

Slalom is trained on a curated dataset focused on CryptArtist Studio tasks:

- Open-source code (Rust, TypeScript, Python, GDScript)
- Creative writing and storytelling
- Technical documentation
- Video editing terminology and workflows
- Game development concepts
- Shell commands and scripting
- JSON and configuration formats
- Conversation and chat patterns

#### Integration Points

Slalom integrates with every CryptArtist Studio program:

| Program | Use Case |
|---|---|
| **Media Mogul** | Script generation, subtitle writing, prompt refinement |
| **VibeCodeWorker** | Code completion, refactoring suggestions, documentation |
| **DemoRecorder** | Auto-narration, highlight detection |
| **ValleyNet** | Local agent reasoning, task planning |
| **GameStudio** | Dialogue writing, level descriptions, NPC behavior |
| **Commander** | Command suggestion, error explanation |
| **DonatePersonalSeconds** | Task description generation, peer matching |
| **Settings** | Configuration recommendations |
| **CꜴS** | System-wide AI assistant, voice commands |

#### Benchmarks (Target)

| Metric | Bunny Slope | Blue Run | Black Diamond | Double Black |
|---|---|---|---|---|
| **Parameters** | 300M | 1B | 3B | 7B |
| **VRAM** | 256 MB | 768 MB | 2 GB | 5 GB |
| **Tokens/sec (CPU)** | 40 | 18 | 8 | 3 |
| **Tokens/sec (GPU)** | 120 | 80 | 45 | 25 |
| **Context window** | 4K | 8K | 16K | 32K |
| **MMLU score** | 42% | 55% | 65% | 72% |
| **HumanEval** | 25% | 40% | 55% | 65% |
| **Download size** | 180 MB | 600 MB | 1.8 GB | 4.2 GB |

#### Development Timeline

| Phase | Target | Milestone |
|---|---|---|
| **Phase 1** | 2026 Q3 | Dataset curation and tokenizer training |
| **Phase 2** | 2026 Q4 | Bunny Slope (300M) training and evaluation |
| **Phase 3** | 2027 Q1 | Blue Run (1B) training, GGUF quantization |
| **Phase 4** | 2027 Q2 | CryptArtist Studio integration, skiing UI |
| **Phase 5** | 2027 Q3 | Black Diamond (3B) and Double Black (7B) training |
| **Phase 6** | 2027 Q4 | Speculative decoding, fine-tuning tools in TrainYard |

#### Distribution

- Bundled with CryptArtist Studio (Bunny Slope only, ~180 MB)
- Downloadable from within the app (larger slopes)
- Available on Hugging Face as open-weight models
- GGUF format for llama.cpp compatibility
- ONNX format for cross-platform inference

---

## FAQ

### Is CryptArtist Studio really free?

Yes. CryptArtist Studio is released under the CryptArtist Custom License v1.69.420.3
and is completely free to use, modify, and distribute. There are no paid tiers, no subscriptions, and no feature gates.
Development is supported by voluntary donations at [mattyjacks.com](https://mattyjacks.com)
and [givegigs.com](https://givegigs.com).

### Do I need an API key to use it?

No. CryptArtist Studio works without any API keys. However, AI-powered features
(chat, image generation, testing, web audit) require an API key from a supported
provider (OpenAI, Anthropic, Google, or any OpenAI-compatible endpoint).

### What is a .CryptArt file?

A `.CryptArt` file is a JSON project file that stores the complete state of any
program in CryptArtist Studio. It uses a permanently stable envelope format that
will never need a version upgrade. See [The .CryptArt File Format](#the-cryptart-file-format)
for full details.

### Can I use my own AI provider?

Yes. VibeCodeWorker supports any OpenAI-compatible API endpoint. Enter your custom
base URL and API key in the settings panel, and select "Custom" as the provider.

### Does it work on mobile?

Mobile support (Android and iOS) is in progress via Tauri's mobile capabilities.
The UI is designed to be responsive, with a mobile navigation component and
appropriate viewport handling.

### Can I extend it with plugins?

Yes! CryptArtist Studio includes a full **Plugin, Mod, and Theme** system.
Plugins add new features to existing programs, mods are self-contained mini-programs
that appear in the Suite Launcher, and themes change the entire visual appearance.
All three are distributed as ZIP files and can be installed from the Settings hub.
See [Plugin, Mod, and Theme System](#plugin-mod-and-theme-system) for details.

### How do I report a bug?

Open an issue on [GitHub](https://github.com/mattyjacks/CryptArtistStudio/issues)
with steps to reproduce, expected vs. actual behavior, and your platform info.

### What is OpenRouter and why should I use it?

[OpenRouter](https://openrouter.ai/) is an API gateway that provides access to 200+
AI models from OpenAI, Anthropic, Google, Meta, Mistral, and more through a single
API key. With OpenRouter, you can switch between GPT-4o, Claude 3.5 Sonnet, Gemini
Pro, Llama 3.1, and other models without managing separate API keys for each provider.
CryptArtist Studio tries OpenRouter first and falls back to direct OpenAI if
OpenRouter is not configured.

### What is CryptArt Commander?

CryptArt Commander is a built-in terminal program that lets you control CryptArtist
Studio through text commands. It supports 40+ commands, tab completion, command aliases,
scripting, and direct integration with OpenRouter and OpenAI. It is useful for
automation, batch operations, and AI agent integration.

### What does DonatePersonalSeconds do?

DonatePersonalSeconds enables peer-to-peer compute resource sharing. You can donate idle
CPU, RAM, and GPU resources to help other CryptArtist Studio users run tasks like
AI inference, video rendering, and image generation. Alternatively, you can borrow
resources from the network to speed up your own workloads. All connections use
cryptographically secure peer IDs and password verification.

### How secure is CryptArtist Studio?

CryptArtist Studio has undergone comprehensive security hardening with 300
vulnerability fixes covering input validation, XSS prevention, Content Security
Policy, rate limiting, memory leak prevention, prototype pollution protection,
secure random generation, and audit logging. See the
[Security Hardening](#security-hardening) section for the complete list of fixes.

### Can I open multiple projects at once?

Yes. CryptArtist Studio supports opening up to 20 `.CryptArt` files simultaneously
through its workspace management system. Workspaces appear as tabs in a global bar
and can be combined into groups for resource sharing. See
[Workspace Management](#workspace-management) for details.

### How do I export and import API keys?

Go to Settings > API Keys and click "Export All Keys". This saves all your configured
API keys (OpenAI, OpenRouter, Pexels, GiveGigs) to a JSON file named
`Forbidden-Secrets-of-CryptArtist-Keys-N.txt` (auto-incrementing number). To import,
click "Import Keys" and select a previously exported file.

### What AI models are available?

Through OpenRouter, CryptArtist Studio supports 200+ models including:
- **OpenAI**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, o1
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- **Google**: Gemini Pro 1.5, Gemini Flash 1.5
- **Meta**: Llama 3.1 405B, Llama 3.1 70B
- **Mistral**: Mixtral 8x22B, Mistral Large
- **Perplexity**: Llama 3.1 Sonar 70B

Direct OpenAI access is also supported for users who prefer not to use OpenRouter.

### How many programs are in the suite?

Eleven programs plus the Suite Launcher: Media Mogul (video/image editor),
VibeCodeWorker (code IDE), DemoRecorder (screen recorder), ValleyNet (AI agent),
GameStudio (game development), CryptArt Commander (terminal),
DonatePersonalSeconds (P2P sharing), Clone Tool (installer builder),
DictatePic (GIMP-style AI image editor), Luck Factory (AI luck seed generator),
and Settings (config hub).

### Where are log files stored?

Log files are stored in the platform-specific application data directory:
- **Windows**: `%LOCALAPPDATA%\CryptArtist Studio\logs\`
- **macOS**: `~/Library/Application Support/CryptArtist Studio/logs/`
- **Linux**: `~/.local/share/CryptArtist Studio/logs/`

Three files are maintained: `cryptartist-session.txt` (100 lines), `cryptartist-recent.txt`
(1,000 lines), and `cryptartist-full-history.txt` (unlimited).

### How was CryptArtist Studio built?

CryptArtist Studio was built through 42+ AI-assisted "vibe coding" sessions using
Windsurf IDE with Claude models. The complete prompt history (every single prompt
and its result) is preserved in `prompts/all-prompts.md`. The full README documents
every aspect of the application across 4,600+ lines. This project serves as a case
study in AI-assisted software development.

---

## License

CryptArtist Studio is released under the **CryptArtist Custom License v1.69.420.3**.

```
CryptArtist Custom License v1.69.420.3

Copyright (c) 2026 Matt - MattyJacks.com (MattyJacks, Sole Proprietorship, New Hampshire, USA)

TERMS AND CONDITIONS

1. GRANT OF LICENSE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to use,
copy, modify, merge, publish, and distribute copies of the Software, subject
to the following conditions:

2. CONDITIONS

  a) The above copyright notice, this license, and all conditions herein shall
     be included in all copies or substantial portions of the Software.

  b) You may not use the Software, its name, branding, logos, or documentation
     to misrepresent the origin of derivative works. Derivative works must be
     clearly identified as modified versions and must not use the "CryptArtist"
     or "MattyJacks" names, logos, or branding without prior written consent.

  c) You may not sublicense or sell copies of the unmodified Software itself.
     You may distribute the Software as part of a larger work or modified version.

  d) Commercial use of the Software is permitted, provided that the original
     copyright notice and this license are preserved and that the CryptArtist
     branding is not used in a way that implies endorsement.

  e) Contributions submitted to the official CryptArtist Studio repository
     grant the Operator (MattyJacks) a perpetual, worldwide, non-exclusive,
     royalty-free license to use, modify, and distribute the contribution.

3. AI-GENERATED CONTENT

The Software includes features that generate content using artificial intelligence.
All AI-generated content is provided "as is" without any warranty. The Operator
makes no claims regarding the accuracy, legality, or fitness of AI-generated
content for any purpose. Users are solely responsible for reviewing, verifying,
and using AI-generated content in compliance with applicable laws.

4. VIDEO GAME CLONER

The Software includes a Video Game Cloner feature designed for public domain
game mechanics. The Operator is not liable for any games produced using this
feature. Users are solely responsible for ensuring their output does not infringe
on any third party's intellectual property rights. The Operator reserves the
right to report copyright infringement at its sole discretion.

5. PEER-TO-PEER FEATURES

The Software includes peer-to-peer resource sharing features. Use of these
features is entirely voluntary and at your own risk. The Operator is not
responsible for any damages, data loss, hardware wear, or security issues
arising from peer-to-peer connections.

6. DISCLAIMER OF WARRANTY

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NONINFRINGEMENT. THE OPERATOR
DOES NOT WARRANT THAT THE SOFTWARE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE,
OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. THE OPERATOR MAKES NO
WARRANTIES REGARDING AI-GENERATED CONTENT, THIRD-PARTY INTEGRATIONS, OR
PEER-TO-PEER FEATURES.

7. LIMITATION OF LIABILITY

IN NO EVENT SHALL MATTYJACKS (THE SOLE PROPRIETOR), ITS OWNER, CONTRIBUTORS,
OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA,
USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION
WITH THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO
EVENT SHALL THE OPERATOR'S TOTAL LIABILITY EXCEED FIFTY DOLLARS ($50.00).

8. INDEMNIFICATION

You agree to indemnify, defend, and hold harmless MattyJacks from and against
any claims, liabilities, damages, losses, and expenses arising from your use
of the Software, content you create using the Software, or your violation of
this License or any third-party rights.

9. GOVERNING LAW

This License shall be governed by the laws of the State of New Hampshire,
United States. Any disputes shall be resolved by binding arbitration in
New Hampshire in accordance with AAA rules, or in the state or federal courts
of New Hampshire. Class actions are waived.

10. TERMINATION

This License is effective until terminated. It terminates automatically if you
fail to comply with any term herein. Upon termination, you must destroy all
copies of the Software in your possession.

11. SEVERABILITY

If any provision of this License is found unenforceable, the remaining
provisions shall continue in full force and effect.
```

---

## Credits

### Creator

**Matt** - [MattyJacks.com](https://mattyjacks.com) | [Matt@MattyJacks.com](mailto:Matt@MattyJacks.com)

### Built With AI

CryptArtist Studio was developed through AI-assisted "vibe coding" sessions using
Windsurf IDE with Claude models. The complete prompt history is preserved in
`prompts/all-prompts.md` as a case study in AI-assisted software development.

### Special Thanks

- The **Tauri** team for the incredible desktop framework
- The **Monaco Editor** team at Microsoft for the open-source editor engine
- **OpenRouter** for the unified AI model gateway
- **Pexels** for the free stock media API
- **FFmpeg** maintainers for the indispensable media tools
- **Godot Engine** community for the open-source game engine
- The **Windsurf** team for the AI-powered IDE used to build this project
- Everyone who donates at [mattyjacks.com](https://mattyjacks.com) and
  [givegigs.com](https://givegigs.com)

---

<div align="center">

**CryptArtist Studio** - The Open Creative Suite

Made with love by [Matt](https://mattyjacks.com)

[GitHub](https://github.com/mattyjacks/CryptArtistStudio) |
[Website](https://mattyjacks.com) |
[Donate](https://givegigs.com) |
[Contact](https://mattyjacks.com/Contact)

---

*This README is approximately 4,700 lines long and documents every aspect of
CryptArtist Studio. It was last updated as part of Prompt 43 in the development history.*

</div>
