'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, X } from 'lucide-react';

// Define the type for lead sheets
interface LeadSheet {
  id: string;
  name: string;
  description: string;
  embedUrl: string;
}

// Premium Lead Databases - Your shortcut to quality prospects
const leadSheets: LeadSheet[] = [
  {
    id: '1',
    name: 'USA Leads from Anvith',
    description: 'A curated list of Instagram marketing prospects with usernames, bios, and follower metrics—ideal for social campaigns.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCtIW1D3w-YOcG6DudGLel5F1KxOJ-P20fKVEESC2PmhTK0ph1uYlaAaIUPyQIaA/pubhtml?widget=true&headers=false',
  },
  {
    id: '2',
    name: 'Mike Orange County Trade Compliance Leads',
    description: 'Companies in Orange County specializing in trade compliance, complete with websites and key contact details.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQo8a86GJuaHBNt6twgyyYS67r-rQK7ThY2bxRYxBBI9vT1sf2c_nepfffUqWJdiA/pubhtml?widget=true&headers=false',
  },
  {
    id: '3',
    name: 'Septic & Plumbers USA – Dec 2024',
    description: 'Verified septic system and plumbing businesses across the U.S., including phone numbers, addresses, and service info.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmU5IpksX3BkPNyGtMgs609jddAPY8znmddtsrFz1nswoJLWXeq4CnRaz_l9IjNg/pubhtml?widget=true&headers=false',
  },
  {
    id: '4',
    name: '15k USA Marketing + 15k USA Lawyers + F500 (2019)',
    description: 'Three rich databases featuring Fortune 500 firms, U.S. marketing contacts, and nationwide legal professionals.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRB3_L8jQVoAYppPCzsLqKXVng3EmZ7BSgStV4J1ucHlB63_sh2R92D10nl8L_vKQ/pubhtml?widget=true&headers=false',
  },
  {
    id: '5',
    name: 'Cruise & Travel Companies – Claudine & Andrea',
    description: 'Travel-oriented companies and agencies with potential trip or booking plans, including websites and notes.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQHh-4gDTsdIJsv3E1-NA7zRezECm_DFjlDpkkalgQ9rSujkf1UAEdHcJPT-7q0-g/pubhtml?widget=true&headers=false',
  },
  {
    id: '6',
    name: 'Beverly, MA, Employers with Health Plans',
    description: 'Employers in Beverly, Massachusetts, offering health benefits, with company info and benefits openness.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRf8oeyTt7zTkrHgei6QivMKYoG8p2-01Jl3b-lDsu5O0c5r41UVCKh3aSxZcSfkQ/pubhtml?widget=true&headers=false',
  },
  {
    id: '7',
    name: 'Instagram Leads 500k Global + 12k USA (2024)',
    description: 'Massive influencer and brand lists with bios and follower stats—perfect for outreach at scale.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRuusqefwKC8BFJhOSO7k5U5TopRiWw4ckC8pc2xOU9h9ZIoan57v7c5hwsrY3FvQ/pubhtml?widget=true&headers=false',
  },
  {
    id: '8',
    name: 'Random Scrapes 2025 Edition',
    description: 'A mixed collection of trucking, tech, wine, yoga, pet, insurance, and contractor leads gathered from various web scrapes.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCb08sZX-x-9pK_a8LTDtB9bg7O0vkSIcvB5__TSyj5gWj-pplVrHi_nJ3Mm60og/pubhtml?widget=true&headers=false',
  },
  {
    id: '9',
    name: 'Cannabis Payment Processors',
    description: 'Contacts for cannabis-industry payment processors, including coverage areas and accepted payment methods.',
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6EOp1Gf4fesmnmZNL6jz-eN2WUu_97Ws0lPVpHMYoTcAfbrL-erC_ohPi_UF0Fg/pubhtml?widget=true&headers=false',
  }
];

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
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 px-4 py-3 sm:px-6">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white">{sheet.name}</h3>
            <button
              type="button"
              className="rounded-md p-1.5 text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={onClose}
            >
              <X className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="h-[calc(90vh-60px)] w-full">
            <iframe
              src={sheet.embedUrl}
              className="h-full w-full border-0"
              frameBorder="0"
              allowFullScreen
              title={`Google Sheet: ${sheet.name}`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function LeadsPage() {
  const [selectedSheet, setSelectedSheet] = useState<LeadSheet | null>(null);
  return (
    <main className="min-h-[calc(100vh-16rem)]">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Free Lead Databases</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
            Browse our free lead databases to help grow your business. View and analyze the data directly in your browser.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-800 shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
              <thead className="bg-zinc-50 dark:bg-zinc-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    File Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                {leadSheets.map((sheet) => (
                  <tr key={sheet.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-zinc-900 dark:text-white">
                            <button
                              onClick={() => setSelectedSheet(sheet)}
                              className="hover:text-emerald-600 dark:hover:text-emerald-400 text-left"
                            >
                              {sheet.name}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                        {sheet.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedSheet(sheet)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-4 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 text-center">
              More lead lists coming soon! Check back regularly for updates.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 border border-emerald-100 dark:border-emerald-900/50">
          <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-2">Need custom lead generation?</h3>
          <p className="text-emerald-700 dark:text-emerald-300 mb-4">
            If you need a specific type of lead list or more detailed information, our team can create a custom lead generation solution for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Contact Us for Custom Leads
          </Link>
        </div>
      </div>
      
      {/* Sheet Modal */}
      <SheetModal sheet={selectedSheet} onClose={() => setSelectedSheet(null)} />
    </main>
  );
}
