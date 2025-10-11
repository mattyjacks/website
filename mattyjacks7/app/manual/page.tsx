"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Clock, ExternalLink, ChevronDown, ChevronUp, Info, ZoomIn, ZoomOut, X } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp } from "@/lib/animations/scroll-animations";

export default function ManualPage() {
  const [showListView, setShowListView] = useState(true);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const headerRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const irsRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const togglRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const noteRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  return (
    <main className="min-h-[70vh] px-4 py-14">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-red-600 dark:text-red-500">Worker</span>
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              {" "}Manual
            </span>
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Essential information and tools for working with MattyJacks. Please review this guide carefully.
          </p>
        </div>

        {/* IRS Forms Section */}
        <div ref={irsRef} className="mb-10">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 bg-white dark:bg-zinc-950">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">IRS Forms</h2>
            </div>
            
            <p className="text-sm lg:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              All international contractors must complete IRS Form W-8BEN to establish tax status. 
              This form certifies that you are a foreign person and helps determine the correct amount 
              of tax withholding. Please follow these steps:
            </p>

            <div className="space-y-4">
              {/* Adobe Sign Link */}
              <div className="group rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Step 1: Sign PDF Online</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Use Adobe&apos;s free online tool to sign your form</p>
                  </div>
                  <a
                    href="https://www.adobe.com/acrobat/online/sign-pdf.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-red-500 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Adobe
                  </a>
                </div>
              </div>

              {/* IRS Official Form */}
              <div className="group rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Step 2: Reference Official Form</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Download the official IRS W-8BEN form for reference</p>
                  </div>
                  <a
                    href="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-red-500 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    IRS Form
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggl Section */}
        <div ref={togglRef} className="mb-10">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 bg-white dark:bg-zinc-950">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Time Tracking with Toggl</h2>
            </div>
            
            <p className="text-sm lg:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              <a 
                href="https://toggl.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-red-600 dark:hover:text-red-400 transition-colors underline decoration-emerald-500 hover:decoration-red-500"
              >
                Toggl Track
              </a>
              {" "}is a simple time tracking tool that helps you log your work hours accurately. 
              It allows you to start and stop timers for different tasks, categorize your work, 
              and generate detailed reports. We use Toggl to ensure accurate billing and project tracking.
            </p>

            {/* View Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowListView(!showListView)}
                className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {showListView ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showListView ? "Hide" : "Show"} View Comparison
              </button>
            </div>

            {showListView && (
              <div className="space-y-6">
                {/* Screenshots - Side by Side */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* List View Screenshot */}
                  <div className="rounded-lg border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3 text-center">List View</h4>
                    <div 
                      className="rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900 cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:shadow-lg group"
                      onClick={() => setExpandedImage('/images/toggl-list-view.png')}
                    >
                      <div className="relative">
                        <Image
                          src="/images/toggl-list-view.png"
                          alt="Toggl List View"
                          width={600}
                          height={400}
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="flex items-center justify-center p-8 text-zinc-500 dark:text-zinc-400"><div class="text-center"><svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-sm">Add toggl-list-view.png</p></div></div>';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                            Click to expand
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar View Screenshot */}
                  <div className="rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-3 text-center">Calendar View</h4>
                    <div 
                      className="rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900 cursor-pointer hover:border-zinc-500 dark:hover:border-zinc-400 transition-all duration-300 hover:shadow-lg group"
                      onClick={() => setExpandedImage('/images/toggl-calendar-view.png')}
                    >
                      <div className="relative">
                        <Image
                          src="/images/toggl-calendar-view.png"
                          alt="Toggl Calendar View"
                          width={600}
                          height={400}
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="flex items-center justify-center p-8 text-zinc-500 dark:text-zinc-400"><div class="text-center"><svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-sm">Add toggl-calendar-view.png</p></div></div>';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                            Click to expand
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Explanation */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 p-4 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold">✓</span>
                      List View (Recommended)
                    </h3>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      Shows your time entries in a clean, organized list format. 
                      Easier to review, edit, and verify your logged hours. This is the preferred view for accuracy.
                    </p>
                  </div>

                  <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                      Calendar View (Default)
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Displays time entries on a calendar grid. While visually appealing, 
                      it can be harder to spot errors or review detailed entries. Switch to List View for better clarity.
                    </p>
                  </div>
                </div>

                {/* How to Switch */}
                <div className="rounded-lg border border-blue-200 dark:border-blue-800 p-4 bg-blue-50/50 dark:bg-blue-950/20">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    How to Switch Views
                  </h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    Log into Toggl Track, open the Timer/Track page, and click the List view or Calendar button at the top-right of the time-entries area.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contractor Note */}
        <div ref={noteRef}>
          <div className="rounded-lg border border-yellow-200 dark:border-yellow-800/50 p-4 bg-yellow-50 dark:bg-yellow-950/20">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-semibold text-yellow-900 dark:text-yellow-100">Important:</span> The freelancer is an independent contractor, 
                not an employee. You are responsible for your own taxes, insurance, and business expenses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Expansion Modal with Zoom */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => {
            setExpandedImage(null);
            setZoomLevel(1);
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Top Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <div className="flex items-center gap-1 bg-black/50 rounded-lg p-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel(Math.max(0.5, zoomLevel - 0.25));
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="text-white text-sm font-semibold px-3">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel(Math.min(3, zoomLevel + 0.25));
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel(1);
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 text-xs font-semibold"
                  aria-label="Reset zoom"
                >
                  Reset
                </button>
              </div>
              <button
                onClick={() => {
                  setExpandedImage(null);
                  setZoomLevel(1);
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Zoomable Image Container */}
            <div className="overflow-auto max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              <div 
                className="transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <Image
                  src={expandedImage}
                  alt="Expanded view"
                  width={1200}
                  height={800}
                  className="rounded-lg shadow-2xl"
                  style={{ maxWidth: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
