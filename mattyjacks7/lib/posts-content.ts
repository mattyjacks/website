import matter from "gray-matter";

export type PostStatus = "hidden" | "live" | "dead" | "draft" | "concept" | "junk";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  year: string;
  slug: string;
  status: PostStatus;
  author: string;
};

export type PostIndexItem = PostFrontmatter & {
  path: string;
};

const CONTENT_OWNER = "mattyjacks";
const CONTENT_REPO = "websiteBlog";
const CONTENT_REF = "main";
const CONTENT_BASE_PATH = "content1/posts";

function isNonProd() {
  return process.env.NODE_ENV !== "production";
}

export function isPostRoutable(status: PostStatus) {
  if (status === "dead" || status === "junk") return false;

  if (isNonProd()) {
    return status === "live" || status === "hidden" || status === "draft" || status === "concept";
  }

  return status === "live" || status === "hidden";
}

export function isPostListed(status: PostStatus) {
  if (!isPostRoutable(status)) return false;
  return status === "live";
}

async function fetchGitTree() {
  const url = `https://api.github.com/repos/${CONTENT_OWNER}/${CONTENT_REPO}/git/trees/${CONTENT_REF}?recursive=1`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch git tree: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as {
    tree: Array<{ path: string; type: "blob" | "tree" }>;
  };
}

function parsePostPath(path: string) {
  // content1/posts/2025/some-slug.md
  if (!path.startsWith(`${CONTENT_BASE_PATH}/`)) return null;
  if (!path.endsWith(".md")) return null;

  const rest = path.slice(`${CONTENT_BASE_PATH}/`.length);
  const parts = rest.split("/");
  if (parts.length !== 2) return null;

  const year = parts[0];
  const filename = parts[1];
  const slug = filename.replace(/\.md$/i, "");

  if (!/^\d{4}$/.test(year)) return null;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  return { year, slug };
}

function rawUrlFor(path: string) {
  return `https://raw.githubusercontent.com/${CONTENT_OWNER}/${CONTENT_REPO}/${CONTENT_REF}/${path}`;
}

export async function fetchPostMarkdown(year: string, slug: string) {
  const path = `${CONTENT_BASE_PATH}/${year}/${slug}.md`;
  const res = await fetch(rawUrlFor(path), { next: { revalidate: 60 } });
  if (!res.ok) {
    return null;
  }

  const raw = await res.text();
  const parsed = matter(raw);
  const fm = parsed.data as Partial<PostFrontmatter>;

  if (
    !fm.title ||
    !fm.description ||
    !fm.date ||
    !fm.year ||
    !fm.slug ||
    !fm.status ||
    !fm.author
  ) {
    throw new Error(`Missing required frontmatter fields for ${path}`);
  }

  if (fm.year !== year) {
    throw new Error(`Frontmatter year mismatch for ${path}`);
  }
  if (fm.slug !== slug) {
    throw new Error(`Frontmatter slug mismatch for ${path}`);
  }

  return {
    frontmatter: fm as PostFrontmatter,
    content: parsed.content,
    path,
  };
}

export async function listAllPosts() {
  const tree = await fetchGitTree();

  const mdFiles = tree.tree
    .filter((n) => n.type === "blob")
    .map((n) => n.path)
    .filter((p) => p.startsWith(`${CONTENT_BASE_PATH}/`) && p.endsWith(".md"));

  const items: PostIndexItem[] = [];

  for (const path of mdFiles) {
    const parsedPath = parsePostPath(path);
    if (!parsedPath) continue;

    const res = await fetch(rawUrlFor(path), { next: { revalidate: 60 } });
    if (!res.ok) continue;

    const raw = await res.text();
    const parsed = matter(raw);
    const fm = parsed.data as Partial<PostFrontmatter>;

    if (
      !fm.title ||
      !fm.description ||
      !fm.date ||
      !fm.year ||
      !fm.slug ||
      !fm.status ||
      !fm.author
    ) {
      continue;
    }

    if (fm.year !== parsedPath.year) continue;
    if (fm.slug !== parsedPath.slug) continue;

    items.push({ ...(fm as PostFrontmatter), path });
  }

  items.sort((a, b) => b.date.localeCompare(a.date));

  return items;
}
