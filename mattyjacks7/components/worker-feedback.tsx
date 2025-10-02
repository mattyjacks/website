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
      name: 'Christian A.',
      role: 'Developer',
      content: 'Working with Matty is motivating because he is organized and dependable. He simplifies things, communicates well, and makes the work feel effortless.',
    },
    {
      id: 3,
      name: 'Christian A.',
      role: 'Developer',
      content: 'Working with Matty is motivating because he is organized and dependable. He simplifies things, communicates well, and makes the work feel effortless.',
    },
  ];

  // Duplicate feedbacks for infinite scroll effect
  const duplicatedFeedbacks = [...feedbacks, ...feedbacks];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll position when we've scrolled through one set of items
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
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
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedFeedbacks.map((feedback, index) => (
              <div
                key={`${feedback.id}-${index}`}
                className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] group"
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
