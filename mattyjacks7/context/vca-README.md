# VCA - VentureCapitalArts.com

**"Making a Mockery of Money"**

VentureCapitalArts (VCA) is a satirical marketplace for buying and selling shares of private companies. It is the most absurdly transparent investment platform ever created - showcasing portfolio companies with honest ownership percentages, SAAS template sales with tiered pricing, and a business portal powered by GiveGigs authentication.

A subsidiary of [MattyJacks.com](https://mattyjacks.com).

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Portfolio Companies](#portfolio-companies)
4. [SAAS Templates](#saas-templates)
5. [Revenue Model](#revenue-model)
6. [GiveGigs Ecosystem Integration](#givegigs-ecosystem-integration)
7. [Tech Stack](#tech-stack)
8. [Project Structure](#project-structure)
9. [Pages and Routes](#pages-and-routes)
10. [Components](#components)
11. [Getting Started](#getting-started)
12. [Environment Variables](#environment-variables)
13. [GiveGigs Control Plane](#givegigs-control-plane)
14. [Authentication Flow](#authentication-flow)
15. [Design System](#design-system)
16. [CryptArtist Ecosystem Integration](#cryptartist-ecosystem-integration)
17. [Roadmap](#roadmap)
18. [Troubleshooting](#troubleshooting)
19. [Contributing](#contributing)
20. [Related Projects](#related-projects)
21. [License](#license)

---

## Overview

VCA is a Next.js web application that serves as both a genuine investment portfolio showcase and a satirical commentary on venture capital culture. It features:

- A public portfolio page displaying all companies with transparent equity percentages
- A SAAS template marketplace with tiered pricing from $100 to $500,000
- A `/biz/` business portal with GiveGigs SSO authentication
- A GiveGigs Control Plane integration strip showing ecosystem status
- Dark/light theme support
- Privacy policy and terms of service pages

### Philosophy

> "We tell you exactly what percentage we own. No hidden stakes."

VCA embraces radical transparency. Every company in the portfolio lists its exact equity stake. Every revenue share is broken down to the decimal. The entire platform is "for sale" - because that's what capitalists do.

---

## Key Features

- **Transparent Ownership**: Every portfolio company shows exact equity percentages
- **Everything For Sale**: Almost every asset is available for purchase
- **4.20% Revenue Share**: Creators 50%, Charity 20%, Affiliates 10%, MattyJacks 20%
- **Parody Premium**: Making money while making fun of making money
- **GiveGigs SSO**: Single sign-on across the entire ecosystem
- **Control Plane Integration**: Real-time ecosystem status from GiveGigs
- **Dark/Light Theme**: System-aware theme switching with manual override
- **Responsive Design**: Mobile-first layout with Tailwind CSS
- **Server Components**: Next.js App Router with RSC for optimal performance

---

## Portfolio Companies

VCA manages and showcases the following portfolio:

| Company | Domain | Equity | Category | For Sale |
|---|---|---|---|---|
| **FirebringerAI** | firebringerai.com | 10%-30% | AI / Machine Learning | Yes |
| **DebateDash** | debatedash.com | 5% | EdTech / Social | Yes |
| **GiveGigs** | givegigs.com | 96.8% | Marketplace / Gig Economy | Yes |
| **VentureCapitalArts** | venturecapitalarts.com | 100% | FinTech / Satire | Yes |
| **CryptArtist** | cryptartist.com | 100% | NFT / Digital Art | Yes |
| **VibeCodeWorker** | vibecodeworker.com | 100% | Dev Services / SAAS | Yes |
| **Sitefari** | sitefari.com | 100% | Web Discovery | Yes |
| **MattyJacks** | mattyjacks.com | 100% | Holding Company | **No** |
| **MyRide.Today** | myride.today | 0%-5% | Transportation / Mobility | Yes |

### Company Data Model

```typescript
interface Company {
  name: string;        // Display name
  domain: string;      // Primary domain
  equity: string;      // Ownership percentage (human-readable)
  description: string; // One-line description
  forSale: boolean;    // Available for investment
  category: string;    // Business category
  highlights: string[]; // Feature tags displayed as badges
}
```

---

## SAAS Templates

VCA sells premium SAAS templates through CryptArtist.com and VibeCodeWorker.com.

### ProperlyTrade

A trading platform SAAS template with full source code access.

| Tier | Cost | Matt's Time | Freelancer Time | Domain Included | Notes |
|---|---|---|---|---|---|
| License Only | $100 | 0 hr | 0 hr | No | Just the code |
| Basic Support | $300 | 2 hr | 3 hr | No | Standard support |
| Professional | $1,000 | 10 hr | 20 hr | No | Standard support |
| Enterprise | $5,000 | 20 hr | 100 hr | No | Standard support |
| Domain Bundle | $50,000 | 75 hr | 750 hr | Yes | Only 1 available |
| Exclusive | $500,000 | 200 hr | 3,000 hr | Yes | Private repo, no competitors |

---

## Revenue Model

### 4.20% Revenue Share

All projects and templates hosted through VCA use a 4.20% revenue share model:

| Recipient | Share of 4.20% | Percentage |
|---|---|---|
| **Creators** | 2.10% | 50% |
| **Charity** | 0.84% | 20% |
| **Affiliates** | 0.42% | 10% |
| **MattyJacks** | 0.84% | 20% |

**Charity requirement**: Must be rated 3+ stars on CharityNavigator.org.

If revenue is not the primary compensation method, an equivalent payment structure must be agreed upon.

---

## GiveGigs Ecosystem Integration

VCA is tightly integrated with the GiveGigs ecosystem through a Control Plane system.

### Control Plane Strip

Every page displays a GiveGigs Control Plane strip at the top showing:
- **Connection status**: Whether the control plane is reachable
- **Shared database**: PostgreSQL provider info
- **App count**: Number of integrated ecosystem apps
- **Access mode**: session, integration, or anonymous
- **Admin status**: Whether the current user has ecosystem admin privileges

### Ecosystem Apps

The control plane recognizes 5 ecosystem apps:

| App ID | Name | Description |
|---|---|---|
| `givegigs` | GiveGigs | Auth provider and control plane authority |
| `mattyjacks` | MattyJacks | Parent company website |
| `cryptartist-studio` | CryptArtist Studio | Creative suite |
| `cryptartist-website` | CryptArtist Website | CryptArtist.com |
| `venturecapitalarts` | VentureCapitalArts | This application |

### Shared Database

All ecosystem apps share a single PostgreSQL database managed by GiveGigs:

```
Database Authority: GiveGigs
Provider: PostgreSQL (Supabase)
Shared: true
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | Latest (App Router) | React framework with SSR/RSC |
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.4.x | Utility-first styling |
| **shadcn/ui** | Latest | Component library |
| **Lucide React** | 0.511.x | Icon library |
| **next-themes** | 0.4.x | Dark/light theme support |

### Backend

| Technology | Purpose |
|---|---|
| **Supabase** | Authentication and database |
| **Next.js API Routes** | Control plane proxy endpoints |
| **GiveGigs Control Plane** | Ecosystem orchestration |

### Fonts

| Font | Usage |
|---|---|
| **Playfair Display** | Headings and display text |
| **Inter** | Body text and UI elements |

---

## Project Structure

```
VCA/
|-- README.md                              # This file (root)
|-- vca1/                                  # Main Next.js application
|   |-- .env.example                       # Environment variable template
|   |-- package.json                       # Dependencies and scripts
|   |-- next.config.ts                     # Next.js configuration
|   |-- tailwind.config.ts                 # Tailwind CSS configuration
|   |-- tsconfig.json                      # TypeScript configuration
|   |-- components.json                    # shadcn/ui configuration
|   |-- postcss.config.mjs                 # PostCSS configuration
|   |-- eslint.config.mjs                  # ESLint configuration
|   |-- proxy.ts                           # Proxy utility
|   |-- app/                               # Next.js App Router
|   |   |-- layout.tsx                     # Root layout (fonts, theme, metadata)
|   |   |-- page.tsx                       # Homepage (hero, features, portfolio)
|   |   |-- globals.css                    # Global styles
|   |   |-- favicon.ico                    # Site icon
|   |   |-- opengraph-image.png            # OG image for social sharing
|   |   |-- twitter-image.png              # Twitter card image
|   |   |-- portfolio/                     # Portfolio page
|   |   |   |-- page.tsx                   # All companies with filters
|   |   |-- saas/                          # SAAS templates page
|   |   |   |-- page.tsx                   # Template pricing and details
|   |   |-- biz/                           # Business portal
|   |   |   |-- page.tsx                   # GiveGigs SSO redirect
|   |   |-- auth/                          # Authentication pages
|   |   |-- privacy/                       # Privacy policy
|   |   |-- terms/                         # Terms of service
|   |   |-- protected/                     # Authenticated routes
|   |   |-- api/                           # API routes
|   |   |   |-- givegigs/                  # GiveGigs proxy endpoints
|   |   |   |   |-- control-plane/         # Control plane proxy
|   |   |   |   |-- apps/                  # Ecosystem apps proxy
|   |-- components/                        # React components
|   |   |-- hero.tsx                       # Landing page hero section
|   |   |-- company-card.tsx               # Portfolio company card
|   |   |-- givegigs-control-strip.tsx     # Ecosystem status bar (RSC)
|   |   |-- footer.tsx                     # Site footer with links
|   |   |-- footer-year.tsx                # Dynamic copyright year
|   |   |-- auth-button.tsx                # Authentication button
|   |   |-- login-form.tsx                 # Login form
|   |   |-- sign-up-form.tsx               # Sign up form
|   |   |-- forgot-password-form.tsx       # Password reset form
|   |   |-- update-password-form.tsx       # Password update form
|   |   |-- logout-button.tsx              # Logout button
|   |   |-- theme-switcher.tsx             # Dark/light theme toggle
|   |   |-- deploy-button.tsx              # Vercel deploy button
|   |   |-- env-var-warning.tsx            # Missing env var warning
|   |   |-- ui/                            # shadcn/ui primitives
|   |   |-- tutorial/                      # Tutorial components
|   |-- lib/                               # Utilities and data
|   |   |-- utils.ts                       # General utilities (cn)
|   |   |-- givegigs-control-plane.ts      # Control plane client
|   |   |-- data/                          # Static data
|   |   |   |-- companies.ts              # Portfolio and SAAS data
|   |   |-- supabase/                      # Supabase client setup
```

---

## Pages and Routes

### Public Pages

| Route | Component | Description |
|---|---|---|
| `/` | `page.tsx` | Homepage with hero, features, featured investments, CTA |
| `/portfolio` | `portfolio/page.tsx` | Full portfolio with for-sale/held filters and summary stats |
| `/saas` | `saas/page.tsx` | SAAS template marketplace with pricing tiers |
| `/biz` | `biz/page.tsx` | Business portal with GiveGigs SSO and control plane status |
| `/privacy` | `privacy/page.tsx` | Privacy policy |
| `/terms` | `terms/page.tsx` | Terms of service |

### API Routes

| Route | Method | Description |
|---|---|---|
| `/api/givegigs/control-plane` | GET | Proxy to GiveGigs control plane API |
| `/api/givegigs/apps` | GET | Proxy to GiveGigs ecosystem apps API |

### Auth Routes

| Route | Description |
|---|---|
| `/auth/*` | Supabase authentication callback routes |
| `/protected/*` | Authenticated-only pages |

---

## Components

### Key Components

| Component | Type | Description |
|---|---|---|
| `GiveGigsControlStrip` | Server Component (async) | Fetches control plane data at render time, shows ecosystem status |
| `Hero` | Server Component | Landing page hero with animated icons and gradient text |
| `CompanyCard` | Server Component | Portfolio company card with equity, category, highlights, and sale badge |
| `Footer` | Server Component | 4-column footer (VCA info, parent company, subsidiaries, legal) |
| `ThemeSwitcher` | Client Component | Dark/light/system theme toggle dropdown |

### UI Components (shadcn/ui)

Located in `components/ui/`:
- Button, Input, Label, Checkbox, Dropdown Menu, and more

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm**, **yarn**, or **pnpm**
- A **Supabase** project for authentication
- (Optional) **GiveGigs** deployment for control plane integration

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mattyjacks/VCA.git
   cd VCA/vca1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your Supabase and GiveGigs credentials.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Script | Command | Description |
|---|---|---|
| **dev** | `npm run dev` | Start development server with hot reload |
| **build** | `npm run build` | Build for production |
| **start** | `npm run start` | Start production server |
| **lint** | `npm run lint` | Run ESLint |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase anon/publishable key |
| `GIVEGIGS_CONTROL_PLANE_URL` | No | GiveGigs deployment URL (default: `https://givegigs.com`) |
| `GIVEGIGS_CONTROL_PLANE_INTEGRATION_KEY` | No | Shared secret for ecosystem admin features |

---

## GiveGigs Control Plane

The control plane is VCA's connection to the broader ecosystem. It provides:

### Data Flow

```
VCA Frontend
  |
  |-- Server Component (GiveGigsControlStrip)
  |     |-- fetchControlPlane({ app: "venturecapitalarts" })
  |     |     |-- GET {GIVEGIGS_URL}/api/ecosystem/control-plane?app=venturecapitalarts
  |     |     |-- Headers: X-GiveGigs-Integration-Key, X-GiveGigs-Supabase-Id, X-GiveGigs-Email
  |     |
  |     |-- fetchEcosystemApps()
  |           |-- GET {GIVEGIGS_URL}/api/ecosystem/apps
  |
  |-- Client Component (BizPage)
        |-- GET /api/givegigs/control-plane?app=venturecapitalarts (local proxy)
        |-- GET /api/givegigs/apps (local proxy fallback)
```

### Control Plane Payload

```typescript
interface ControlPlanePayload {
  controlPlane: {
    appId: "givegigs";
    version: string;
    generatedAt: string;
  };
  database: {
    sharedDatabase: true;
    authorityAppId: "givegigs";
    provider: "postgresql";
  };
  apps: ControlPlaneApp[];
  requestedApp: EcosystemAppId | null;
  user: {
    authenticated: boolean;
    supabaseId: string | null;
    email: string | null;
    internalUserId: string | null;
    isGiveGigsAdmin: boolean;
    canControlEcosystem: boolean;
    accessMode: "session" | "integration" | "anonymous";
  };
  admin: {
    url: string;
    access: "granted" | "denied";
  };
  links: {
    appsEndpoint: string;
    controlPlaneEndpoint: string;
  };
}
```

---

## Authentication Flow

VCA delegates all authentication to GiveGigs:

```
1. User clicks "Login via GiveGigs" on VCA
2. /biz page shows 5-second countdown
3. Auto-redirect to https://givegigs.com/login
4. User authenticates on GiveGigs (Supabase Auth)
5. Session shared across ecosystem via shared Supabase project
6. User returns to VCA with authenticated session
```

The `/biz` page includes:
- **Auto-redirect countdown** (5 seconds, cancellable)
- **Control plane status** display (Connected/Offline)
- **Ecosystem app links** for all integrated apps
- **Login/signup buttons** linking to GiveGigs

---

## Design System

### Colors

VCA uses a gold-themed primary color palette:

| Element | Color | Usage |
|---|---|---|
| **Primary** | Gold/Yellow gradient | Branding, CTAs, highlights |
| **Emerald** | `emerald-500` | "For Sale" badges, success states |
| **Red** | `red-500` | "Held" badges, charity indicators |
| **Blue** | `blue-500` | Affiliate indicators |
| **Amber** | `amber-500` | Revenue share section |

### Typography

- **Playfair Display**: Logo, hero headings (serif, elegant)
- **Inter**: Body text, navigation, UI elements (sans-serif, clean)

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| **Mobile** | < 768px | Single column, stacked nav |
| **Tablet** | 768px+ | 2-column grids |
| **Desktop** | 1024px+ | Full nav, 3-4 column grids |

---

## CryptArtist Ecosystem Integration

VCA connects to the broader CryptArtist ecosystem:

| Project | Integration |
|---|---|
| **GiveGigs** | Authentication provider, control plane authority, shared database |
| **CryptArtist Studio** | SAAS templates sold through VCA are built with CryptArtist tools |
| **CryptArtist Website** | Listed as subsidiary in footer, linked in navigation |
| **VibeCodeWorker** | Co-seller of SAAS templates, listed as subsidiary |
| **MattyJacks.com** | Parent company, all rights reserved under MattyJacks |
| **GraveGain** | Future: game asset marketplace integration |

---

## Roadmap

### Phase 1 - Foundation (Completed)

- [x] Next.js App Router with TypeScript
- [x] Portfolio page with company cards and equity display
- [x] SAAS template marketplace with tiered pricing
- [x] `/biz/` business portal with GiveGigs SSO
- [x] GiveGigs Control Plane integration (server + client)
- [x] Dark/light theme support
- [x] Responsive design with Tailwind CSS
- [x] Privacy policy and terms of service pages
- [x] Footer with ecosystem links

### Phase 2 - Marketplace Features (2026 Q3-Q4)

- [ ] **Live Deal Room**: Real-time chat for investment negotiations
- [ ] **Document Vault**: Secure document sharing for due diligence
- [ ] **Offer System**: Submit and track investment offers
- [ ] **Portfolio Analytics**: Charts and graphs for portfolio performance
- [ ] **Company Profiles**: Expanded company pages with financials, team, metrics
- [ ] **Watchlist**: Save companies to a personal watchlist
- [ ] **Notifications**: Email and in-app alerts for new listings and offers
- [ ] **Multi-SAAS Templates**: Add more templates beyond ProperlyTrade

### Phase 3 - Platform Expansion (2027 Q1-Q2)

- [ ] **Escrow System**: Secure payment escrow for transactions
- [ ] **Legal Document Generator**: Auto-generate investment agreements
- [ ] **Affiliate Dashboard**: Track referral earnings and payouts
- [ ] **Charity Integration**: Direct donation tracking with CharityNavigator verification
- [ ] **API for Partners**: Public API for portfolio data and investment inquiries
- [ ] **Mobile App**: React Native companion app
- [ ] **Blog/News**: Investment insights and portfolio updates

### Phase 4 - AI Integration (2027 Q3+)

- [ ] **AI Valuation**: AI-powered company valuation estimates
- [ ] **AI Due Diligence**: Automated background checks and risk analysis
- [ ] **AI Matching**: Match investors with companies based on preferences
- [ ] **AI Report Generation**: Auto-generate investment reports
- [ ] **Slalom [🎿SLM] Integration**: Use CryptArtist's local AI for private analysis

---

## Troubleshooting

### Common Issues

| Problem | Solution |
|---|---|
| **Control plane shows "Offline"** | Check `GIVEGIGS_CONTROL_PLANE_URL` in `.env.local`. Ensure GiveGigs is running. |
| **Auth redirect fails** | Verify Supabase URL and key in `.env.local`. Check GiveGigs is accessible. |
| **Build errors** | Run `npm install` to ensure all dependencies are present. Check Node.js 18+. |
| **Theme not switching** | Clear browser localStorage. Check `next-themes` provider in layout. |
| **Company cards not showing** | Verify `companies.ts` data file is not corrupted. |
| **API proxy returns 500** | Check GiveGigs server is running and integration key matches. |

### Development Tips

- Use `npm run dev` for hot reloading during development
- The control plane strip will show "unreachable" if GiveGigs is not running locally - this is expected in local dev without GiveGigs
- Theme preference is stored in localStorage via `next-themes`
- All portfolio data is static in `lib/data/companies.ts` - no database needed for basic portfolio display

---

## Contributing

### Code Style

- TypeScript strict mode
- Functional React components (prefer Server Components where possible)
- Tailwind CSS utility classes (no CSS modules)
- shadcn/ui for reusable UI primitives
- Lucide React for icons
- ESLint with Next.js recommended config

### Adding a Portfolio Company

1. Edit `vca1/lib/data/companies.ts`
2. Add a new entry to the `companies` array:
   ```typescript
   {
     name: "NewCompany",
     domain: "newcompany.com",
     equity: "50%",
     description: "Description of the company.",
     forSale: true,
     category: "Category",
     highlights: ["Tag 1", "Tag 2", "Tag 3"],
   }
   ```
3. The company will appear on the homepage (if featured) and portfolio page

### Adding a SAAS Template

1. Edit `vca1/lib/data/companies.ts`
2. Add a new entry to the `saasTemplates` array with pricing tiers and revenue terms
3. Update `vca1/app/saas/page.tsx` to display the new template

---

## Related Projects

| Project | Description | Link |
|---|---|---|
| **MattyJacks.com** | Parent company and portfolio hub | [Website](https://mattyjacks.com) |
| **GiveGigs** | Freelance marketplace, auth provider, control plane | [Website](https://givegigs.com) / [GitHub](https://github.com/mattyjacks/GiveGigs) |
| **CryptArtist Studio** | Open creative suite with 11 programs | [GitHub](https://github.com/mattyjacks/CryptArtistStudio) |
| **GraveGain** | Dark fantasy action RPG with emoji graphics | [GitHub](https://github.com/mattyjacks/GraveGain) |
| **Website Blog** | Personal blog and devlogs | [GitHub](https://github.com/mattyjacks/websiteBlog) |
| **ProperlyTrade** | Trading platform SAAS template | [GitHub](https://github.com/mattyjacks/ProperlyTrade) |

---

## License

VentureCapitalArts is a project of MattyJacks.com. All rights reserved.

---

*VentureCapitalArts.com - Making a Mockery of Money.*
