'use client';

import { useEffect, useRef, useState } from 'react';

type Feedback = {
  id: number;
  name: string;
  role: string;
  content: string;
};

export default function WorkerFeedbackCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const feedbacks: Feedback[] = [
    {
      id: 1,
      name: 'Christian A.',
      role: 'Developer',
      content: 'Working with Matty is motivating because he is organized and dependable. He simplifies things, communicates well, and makes the work feel effortless.',
    },
    {
      id: 2,
      name: 'Kenj R.',
      role: 'Web Developer',
      content: 'Collaborating with Matty has been a great experience. As freelancers, we have the flexibility to manage our own time and complete tasks efficiently, and he completely respects that. He\'s easy to communicate with, cool, and chill to work with.',
    },
  ];

  // Triple the feedbacks for seamless infinite scroll effect
  const duplicatedFeedbacks = [...feedbacks, ...feedbacks, ...feedbacks];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        const currentScroll = scrollContainer.scrollLeft;
        // Reset after scrolling through one complete set (1/3 of total since we tripled)
        const singleSetWidth = scrollContainer.scrollWidth / 3;

        // Seamlessly reset when we've scrolled through one set
        if (currentScroll >= singleSetWidth) {
          scrollContainer.scrollLeft = currentScroll - singleSetWidth;
        } else {
          scrollContainer.scrollLeft = currentScroll + scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  return (
    <section className="px-4 py-16 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/30 dark:via-zinc-900/10 dark:to-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">
            What <span className="font-bold text-red-600 dark:text-red-500">Workers</span> Say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
            Worker Feedback
          </h2>
        </div>

        <div
          className="relative overflow-hidden -mx-4 px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left gradient fade overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-48 lg:w-64 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />

          {/* Right gradient fade overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-48 lg:w-64 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedFeedbacks.map((feedback, index) => (
              <div
                key={`${feedback.id}-${index}`}
                className="flex-shrink-0 w-[85vw] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] group"
              >
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 h-full hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {feedback.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">
                        {feedback.name}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{feedback.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    &ldquo;{feedback.content}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
