"use client";

import { motion } from "framer-motion";

interface ResumeCardProps {
  title: string;
  url: string;
  desc: string;
}

export default function ResumeCard({ title, url, desc }: ResumeCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 flex flex-col h-full">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold break-words">{title}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{desc}</p>
      </div>
      <div className="mt-4 flex justify-end">
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-red-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          View Site
        </motion.a>
      </div>
    </div>
  );
}