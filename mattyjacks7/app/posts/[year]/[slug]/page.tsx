import { notFound } from "next/navigation";
import SafeMarkdown from "@/components/safe-markdown";
import { fetchPostMarkdown, isPostRoutable } from "@/lib/posts-content";

export const revalidate = 60;

type Params = {
  year: string;
  slug: string;
};

export default async function PostPage({ params }: { params: Params }) {
  const { year, slug } = params;

  const post = await fetchPostMarkdown(year, slug);
  if (!post) return notFound();

  if (!isPostRoutable(post.frontmatter.status)) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{post.frontmatter.title}</h1>
        <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {post.frontmatter.date} - {post.frontmatter.author}
        </div>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">{post.frontmatter.description}</p>
      </header>

      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <SafeMarkdown content={post.content} />
      </article>
    </main>
  );
}
