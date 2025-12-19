import Link from "next/link";
import { listAllPosts, isPostListed } from "@/lib/posts-content";

export const revalidate = 60;

export default async function PostsIndexPage() {
  const posts = await listAllPosts();
  const listed = posts.filter((p) => isPostListed(p.status));

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Posts</h1>
      <div className="mt-8 space-y-6">
        {listed.map((p) => (
          <article key={`${p.year}/${p.slug}`} className="border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6">
            <h2 className="text-xl font-semibold">
              <Link
                href={`/posts/${p.year}/${p.slug}`}
                className="text-zinc-900 dark:text-zinc-100 hover:underline"
              >
                {p.title}
              </Link>
            </h2>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {p.date} - {p.author}
            </div>
            <p className="mt-3 text-zinc-700 dark:text-zinc-300">{p.description}</p>
          </article>
        ))}
        {listed.length === 0 ? (
          <div className="text-zinc-600 dark:text-zinc-400">No live posts yet.</div>
        ) : null}
      </div>
    </main>
  );
}
