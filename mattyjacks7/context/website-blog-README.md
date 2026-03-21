# websiteBlog

**Blog content repository for [MattyJacks.com](https://mattyjacks.com)**

This repository is a headless content store for the MattyJacks.com blog system. It contains Markdown posts with YAML frontmatter, organized by year. The main website (`website-dev` repo) fetches and renders these posts at runtime using `gray-matter` for frontmatter parsing and `react-markdown` with GFM support for rendering.

Images are served via jsDelivr CDN directly from this repo, so no separate image hosting is needed.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Repository Structure](#repository-structure)
3. [Content Base Path](#content-base-path)
4. [URL and Routing](#url-and-routing)
5. [Post Format](#post-format)
6. [Status System](#status-system)
7. [Publishing Rules](#publishing-rules)
8. [Images via jsDelivr](#images-via-jsdelivr)
9. [How to Add a Post](#how-to-add-a-post)
10. [Naming Rules](#naming-rules)
11. [Existing Posts](#existing-posts)
12. [Content Categories](#content-categories)
13. [How the Website Consumes This Repo](#how-the-website-consumes-this-repo)
14. [CryptArtist Ecosystem Integration](#cryptartist-ecosystem-integration)
15. [Roadmap](#roadmap)
16. [Related Projects](#related-projects)
17. [License](#license)

---

## Architecture

```
websiteBlog (this repo)         mattyjacks.com (website-dev repo)
|                               |
|  content1/posts/YYYY/slug.md  |  app/posts/page.tsx (listing)
|          |                     |  app/posts/[year]/[slug]/page.tsx (detail)
|          |                     |       |
|          +--- jsDelivr CDN ---+       |
|          |    (images)                |
|          +--- GitHub Raw API ---------+ gray-matter parses frontmatter
|               (markdown)              | react-markdown renders body
|                                       | rehype-raw + rehype-sanitize for safe HTML
|                                       | remark-gfm for tables, strikethrough, etc.
```

The blog is a **decoupled content system**:
- **This repo**: stores raw Markdown content and images
- **website-dev repo**: fetches, parses, and renders the content
- **jsDelivr**: serves images as a free CDN with GitHub integration

---

## Repository Structure

```
websiteBlog/
|-- README.md                                  # This file
|-- content1/                                  # Content root
|   |-- HOW TO ADD A POST.md                   # Quick reference guide
|   |-- assets/                                # Static assets
|   |   |-- images/                            # Blog images
|   |       |-- random/                        # General images (logos, etc.)
|   |-- posts/                                 # Blog posts by year
|       |-- 2024/                              # 2024 posts
|       |   |-- facebook-roas-guide.md         # Facebook ROAS primer
|       |   |-- scale-facebook-ads.md          # Scaling Meta ads guide
|       |-- 2025/                              # 2025 posts
|           |-- another-post.md                # Placeholder/template post
|           |-- facebook-roas-guide.md         # Updated ROAS guide
|           |-- givegigs-logo.md               # Image embedding test (live)
|           |-- scale-facebook-ads.md          # Scaling ads guide (updated)
```

---

## Content Base Path

All blog posts live under:

```
content1/posts/
```

---

## URL and Routing

Target URL format on the live website:

```
/blog/<year>/<slug>
```

Where:
- **`year`** is the folder name under `content1/posts/` (4 digits)
- **`slug`** is the filename without `.md`

Example: `content1/posts/2025/givegigs-logo.md` maps to `/blog/2025/givegigs-logo`

---

## Post Format

Every post must start with YAML frontmatter enclosed in `---` delimiters.

### Required Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Post title displayed on the blog |
| `description` | string | One-sentence summary for listings and SEO |
| `date` | string | ISO date format `YYYY-MM-DD` |
| `year` | string | Must match the parent folder name |
| `slug` | string | Must match the filename without `.md` |
| `status` | string | Publishing status (see below) |
| `author` | string | Author name |

### Frontmatter Template

```md
---
title: "Your Post Title"
description: "One sentence description."
date: "YYYY-MM-DD"
year: "2025"
slug: "your-post-slug"
status: "concept"
author: "Your Name"
---

## Your First Section
Start writing here...
```

### Consistency Rules

- `year` in frontmatter **must match** the folder name
- `slug` in frontmatter **must match** the filename (without `.md`)
- Breaking these rules will cause routing mismatches on the website

---

## Status System

Posts have a lifecycle managed through the `status` field:

| Status | Visible on Site | Listed on Blog Page | Description |
|---|---|---|---|
| `concept` | No | No | Early idea, minimal content |
| `draft` | No | No | Work in progress, not ready |
| `hidden` | Yes (direct URL) | No | Live but unlisted - accessible via direct link only |
| `live` | Yes | Yes | Published and visible everywhere |
| `dead` | No | No | Was once live, now removed |
| `junk` | No | No | Abandoned, decided not to continue |

### Status Flow

```
concept -> draft -> live -> dead
                 -> hidden (accessible but unlisted)
           draft -> junk (abandoned)
```

---

## Publishing Rules

Only posts with `status: "live"` are shown publicly on the main blog page.

Posts with `status: "hidden"` are accessible via direct URL but not linked from the blog listing. This is useful for:
- Sharing specific posts with a link before official announcement
- Posts that are relevant only in certain contexts
- Permanent but non-promoted content

---

## Images via jsDelivr

Images are stored in this repo and served via jsDelivr CDN for fast global delivery.

### jsDelivr URL Format

```
https://cdn.jsdelivr.net/gh/<owner>/<repo>@<ref>/<path>
```

### Example

Store image at:
```
content1/assets/images/random/my-image.png
```

Reference in Markdown:
```md
![Alt text](https://cdn.jsdelivr.net/gh/mattyjacks/websiteBlog@main/content1/assets/images/random/my-image.png)
```

### Image Guidelines

- Store images under `content1/assets/images/`
- Use subdirectories to organize by topic or post
- URL-encode spaces in filenames (use `%20`)
- Use `@main` branch reference for latest content
- jsDelivr caches aggressively; use `@<commit-hash>` for cache-busting if needed

---

## How to Add a Post

1. **Create the year folder** if it doesn't exist:
   ```
   content1/posts/<YEAR>/
   ```

2. **Create the Markdown file**:
   ```
   content1/posts/<YEAR>/<slug>.md
   ```

3. **Add frontmatter** at the top of the file using the template above

4. **Write content** in standard Markdown (GFM supported)

5. **Set status** to `concept` or `draft` initially

6. **Commit and push** to the `main` branch

7. **Change status to `live`** when ready to publish

---

## Naming Rules

| Rule | Example |
|---|---|
| Filenames must be **kebab-case** | `my-great-post.md` |
| No spaces in filenames | Use hyphens instead |
| File extension must be `.md` | Not `.markdown` or `.txt` |
| Year folders must be **4 digits** | `2025`, not `25` |
| Slug must match filename | `slug: "my-great-post"` for `my-great-post.md` |

---

## Existing Posts

### 2025

| Slug | Title | Status | Description |
|---|---|---|---|
| `givegigs-logo` | GiveGigs Logo | **live** | Image embedding validation with jsDelivr |
| `scale-facebook-ads` | How to Scale Facebook Ads Without Nuking ROAS | draft | Guide to scaling Meta ads |
| `facebook-roas-guide` | Facebook ROAS Guide | draft | ROAS primer and decision making |
| `another-post` | Another Post | draft | Placeholder/template post |

### 2024

| Slug | Title | Status | Description |
|---|---|---|---|
| `facebook-roas-guide` | Facebook ROAS Guide (2024 Edition) | draft | ROAS basics and attribution |
| `scale-facebook-ads` | How to Scale Facebook Ads Without Nuking ROAS | draft | Practical scaling guide |

---

## Content Categories

Current and planned content categories for the blog:

| Category | Description | Examples |
|---|---|---|
| **Marketing** | Advertising, growth, social media | Facebook Ads scaling, ROAS guides |
| **Devlogs** | Development updates across projects | GraveGain progress, CryptArtist features |
| **Announcements** | Product launches and news | GiveGigs updates, new tool releases |
| **Tutorials** | How-to guides and walkthroughs | Tech tutorials, business guides |
| **Case Studies** | Client work and results | TristateHoney, Opority, TikTok growth |
| **Ecosystem** | CryptArtist ecosystem news | New programs, platform updates, VCA listings |

---

## How the Website Consumes This Repo

The main website (`website-dev` repo / mattyjacks.com) renders blog content as follows:

### Rendering Pipeline

1. **Fetch**: Raw Markdown fetched from GitHub (or jsDelivr for cached access)
2. **Parse**: `gray-matter` extracts YAML frontmatter from the Markdown body
3. **Filter**: Only posts with `status: "live"` appear on the listing page
4. **Render**: `react-markdown` with plugins:
   - `remark-gfm` - GitHub Flavored Markdown (tables, strikethrough, task lists)
   - `rehype-raw` - Allows raw HTML in Markdown
   - `rehype-sanitize` - Sanitizes HTML to prevent XSS
5. **Cache**: `revalidate = 60` (ISR refreshes every 60 seconds)

### Website Routes

| Route | Description |
|---|---|
| `/posts` | Blog listing page (all `live` posts) |
| `/posts/<year>/<slug>` | Individual post detail page |

### Content Management File

`lib/posts-content.ts` in the website repo manages:
- Post fetching and caching
- Frontmatter validation
- Listed vs unlisted status handling
- Date sorting for the blog listing

---

## CryptArtist Ecosystem Integration

This blog serves the entire CryptArtist ecosystem:

| Project | Blog Coverage |
|---|---|
| **MattyJacks.com** | Company news, service announcements, case studies |
| **GiveGigs** | Platform updates, worker success stories, AI agent news |
| **CryptArtist Studio** | Feature devlogs, new program announcements, tutorials |
| **VentureCapitalArts** | Portfolio updates, investment opportunities, SAAS launches |
| **GraveGain** | Game development devlogs, gameplay updates, lore reveals |
| **VibeCodeWorker** | Developer tools updates, template releases |

### Planned Blog Series

- **GraveGain Devlog**: Regular development updates with screenshots and gameplay GIFs
- **CryptArtist Studio Changelog**: Detailed release notes for each update
- **GiveGigs Worker Spotlights**: Profiles of top freelancers on the platform
- **Building in Public**: Behind-the-scenes of building the MattyJacks ecosystem

---

## Roadmap

### Phase 1 - Content System (Completed)

- [x] YAML frontmatter-based post format
- [x] Year/slug folder organization
- [x] 6-status lifecycle system
- [x] jsDelivr image hosting
- [x] Website integration with gray-matter + react-markdown
- [x] ISR caching (60-second revalidation)

### Phase 2 - Content Expansion (2026 Q2-Q3)

- [ ] **Devlog series**: Regular GraveGain and CryptArtist Studio devlogs
- [ ] **Tutorial library**: Step-by-step guides for ecosystem tools
- [ ] **Case study archive**: Detailed client work case studies
- [ ] **Tags/categories**: Add `tags` field to frontmatter for filtering
- [ ] **Featured images**: Add `image` field for post thumbnails and OG cards

### Phase 3 - Platform Features (2026 Q4+)

- [ ] **RSS feed**: Auto-generated from live posts
- [ ] **Search**: Full-text search across all published posts
- [ ] **Newsletter**: Email subscription for new posts
- [ ] **Comments**: Integration with GiveGigs auth for post comments
- [ ] **Series support**: Group related posts into ordered series
- [ ] **Reading time**: Auto-calculated from word count
- [ ] **Multi-author**: Author profiles with avatars and bios

---

## Related Projects

| Project | Description | Link |
|---|---|---|
| **MattyJacks.com** | Parent website that renders blog content | [Website](https://mattyjacks.com) / [GitHub](https://github.com/mattyjacks/website) |
| **GiveGigs** | Freelance marketplace with AI agent ecosystem | [Website](https://givegigs.com) / [GitHub](https://github.com/mattyjacks/GiveGigs) |
| **CryptArtist Studio** | Open creative suite with 11 programs | [GitHub](https://github.com/mattyjacks/CryptArtistStudio) |
| **VentureCapitalArts** | Satirical investment portfolio marketplace | [GitHub](https://github.com/mattyjacks/VCA) |
| **GraveGain** | Dark fantasy action RPG with emoji graphics | [GitHub](https://github.com/mattyjacks/GraveGain) |

---

## License

All blog content is copyright MattyJacks.com. All rights reserved.

---

*websiteBlog - Content powering the MattyJacks.com blog.*
