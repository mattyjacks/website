"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ResumeCTAButtons() {
  return (
    <div className="mt-4 md:mt-0 flex gap-3">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link href="/contact" className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-500">
          Get Yours
        </Link>
      </motion.div>
      <motion.a
        href="tel:+16039999420"
        className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-3 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        Call Matt
      </motion.a>
    </div>
  );
}