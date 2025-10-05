'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { fadeInUp, slideInGrid } from '@/lib/animations/scroll-animations';

// Define the types for our data
interface LeadSheet {
  id: string;
  name: string;
  description: string;
  embedUrl: string;
  rowCount?: number;
}

interface SummaryStats {
  totalSheets: number;
  totalRows: number;
  lastUpdated: string;
}

// Premium Lead Databases - Your shortcut to quality prospects
const leadSheets: LeadSheet[] = [
  {
    id: '1',
    name: 'USA Leads',
    description: 'A curated list of Instagram marketing prospects with usernames, bios, and follower metrics-ideal for social campaigns.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCtIW1D3w-YOcG6DudGLel5F1KxOJ-P20fKVEESC2PmhTK0ph1uYlaAaIUPyQIaA/pubhtml?widget=true&headers=false',
    rowCount: 11970, // Update with actual count
  },
  {
    id: '3',
    name: 'Septic & Plumbers USA - Dec 2024',
    description: 'Verified septic system and plumbing businesses across the U.S., including phone numbers, addresses, and service info.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmU5IpksX3BkPNyGtMgs609jddAPY8znmddtsrFz1nswoJLWXeq4CnRaz_l9IjNg/pubhtml?widget=true&headers=false',
    rowCount: 1195, // Update with actual count
  },
  {
    id: '4',
    name: '15k USA Marketing + 15k USA Lawyers + F500 (2019)',
    description: 'Three rich databases featuring Fortune 500 firms, U.S. marketing contacts, and nationwide legal professionals.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRB3_L8jQVoAYppPCzsLqKXVng3EmZ7BSgStV4J1ucHlB63_sh2R92D10nl8L_vKQ/pubhtml?widget=true&headers=false',
    rowCount: 30811, // Update with actual count
  },
  {
    id: '5',
    name: 'Leads for Cruise & Travel Companies',
    description: 'Travel-oriented companies and agencies with potential trip or booking plans, including websites and notes.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQHh-4gDTsdIJsv3E1-NA7zRezECm_DFjlDpkkalgQ9rSujkf1UAEdHcJPT-7q0-g/pubhtml?widget=true&headers=false',
    rowCount: 131, // Update with actual count
  },
  {
    id: '6',
    name: 'Beverly, MA, Employers with Health Plans',
    description: 'Employers in Beverly, Massachusetts, offering health benefits, with company info and benefits openness.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRf8oeyTt7zTkrHgei6QivMKYoG8p2-01Jl3b-lDsu5O0c5r41UVCKh3aSxZcSfkQ/pubhtml?widget=true&headers=false',
    rowCount: 40, // Update with actual count
  },
  {
    id: '7',
    name: 'Instagram Leads 500k Global + 12k USA (2024)',
    description: 'Massive influencer and brand lists with bios and follower stats-perfect for outreach at scale.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRuusqefwKC8BFJhOSO7k5U5TopRiWw4ckC8pc2xOU9h9ZIoan57v7c5hwsrY3FvQ/pubhtml?widget=true&headers=false',
    rowCount: 511970, // Update with actual count
  },
  {
    id: '8',
    name: 'Random Scrapes 2025 Edition',
    description: 'A mixed collection of trucking, tech, wine, yoga, pet, insurance, and contractor leads gathered from various web scrapes.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCb08sZX-x-9pK_a8LTDtB9bg7O0vkSIcvB5__TSyj5gWj-pplVrHi_nJ3Mm60og/pubhtml?widget=true&headers=false',
    rowCount: 8789, // Update with actual count
  },
  {
    id: '9',
    name: 'Cannabis Payment Processors',
    description: 'Contacts for cannabis-industry payment processors, including coverage areas and accepted payment methods.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6EOp1Gf4fesmnmZNL6jz-eN2WUu_97Ws0lPVpHMYoTcAfbrL-erC_ohPi_UF0Fg/pubhtml?widget=true&headers=false',
    rowCount: 60, // Update with actual count
  }
];

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Modal component for displaying Google Sheet
function SheetModal({ sheet, onClose }: { sheet: LeadSheet | null; onClose: () => void }) {
  if (!sheet) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block h-[90vh] w-full max-w-6xl transform overflow-hidden rounded-lg bg-white dark:bg-zinc-800 text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{sheet.name}</h3>
              {sheet.rowCount && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {formatNumber(sheet.rowCount)} {sheet.rowCount === 1 ? 'lead' : 'leads'}
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <a
                href={sheet.embedUrl.replace('/pubhtml?', '/pub?')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white shadow-lg hover:bg-red-500 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
              >
                <ExternalLink className="h-4 w-4 mr-1.5" />
                <span>Open</span>
              </a>
              <button
                type="button"
                className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onClick={onClose}
              >
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
          <div className="h-[calc(90vh-73px)] w-full bg-white dark:bg-zinc-900">
            <iframe
              src={sheet.embedUrl}
              className="h-full w-full border-0"
              frameBorder="0"
              allowFullScreen
              title={`Google Sheet: ${sheet.name}`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// Lead Card Component
function LeadCard({ sheet, onClick }: { sheet: LeadSheet; onClick: () => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 line-clamp-2">
          {sheet.name}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-4 flex-1 line-clamp-3">
          {sheet.description}
        </p>
        {sheet.rowCount !== undefined && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
              {formatNumber(sheet.rowCount)} {sheet.rowCount === 1 ? 'lead' : 'leads'}
            </span>
          </div>
        )}
      </div>
      <div className="bg-zinc-50 dark:bg-zinc-700/30 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700">
        <button
          onClick={onClick}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-emerald-600 text-white shadow-lg hover:bg-red-500 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          <span>View {formatNumber(sheet.rowCount || 0)} Leads</span>
        </button>
      </div>
    </div>
  );
}

// Summary Stats Component
function SummaryStats({ stats }: { stats: SummaryStats }) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-800 rounded-xl p-6 mb-8 border border-emerald-100 dark:border-emerald-900/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center">
          <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Total Leads</dt>
          <dd className="mt-1 text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
            {formatNumber(stats.totalRows)}
          </dd>
        </div>
        <div className="text-center">
          <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Lead Lists</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-600 dark:text-red-400">
            {stats.totalSheets}
          </dd>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const [selectedSheet, setSelectedSheet] = useState<LeadSheet | null>(null);

  const headerRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const statsRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const gridRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const ctaRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  // Calculate summary stats from the hardcoded data
  const summaryStats: SummaryStats = {
    totalSheets: leadSheets.length,
    totalRows: leadSheets.reduce((sum, sheet) => sum + (sheet.rowCount || 0), 0),
    lastUpdated: new Date().toISOString(),
  };

  // No loading state needed since we're using hardcoded data
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-16rem)]">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-48 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-16rem)] bg-zinc-50 dark:bg-zinc-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-emerald-600">Free Lead</span>{" "}
            <span className="text-red-600">Databases</span>
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-300">
            Browse our free lead databases to help grow your business. View and analyze the data directly in your browser.
            <span className="block mt-2 text-sm text-amber-600 dark:text-amber-400">
              Note: Some spreadsheets may take a moment to load due to their size.
            </span>
          </p>
        </div>

        {/* Summary Stats */}
        <div ref={statsRef}>
          <SummaryStats stats={summaryStats} />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Lead Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {leadSheets.map((sheet) => (
            <LeadCard 
              key={sheet.id} 
              sheet={sheet} 
              onClick={() => setSelectedSheet(sheet)} 
            />
          ))}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-800 rounded-xl p-8 mb-12 border border-emerald-100 dark:border-emerald-900/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Need Custom Lead Generation?</h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              If you need a specific type of lead list or more detailed information, our team can create a custom lead generation solution tailored to your business needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-xl shadow-lg bg-emerald-600 text-white hover:bg-red-500 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
            >
              <span>Get Custom Leads</span>
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Sheet Modal */}
      <SheetModal sheet={selectedSheet} onClose={() => setSelectedSheet(null)} />
    </main>
  );
}
