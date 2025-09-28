import { NextResponse } from 'next/server';

export async function GET() {
  const sheets = [
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

  // For now, we'll return mock data since we can't access Google Sheets API without authentication
  // In production, you would make actual API calls to Google Sheets to get row counts
  const stats = sheets.map(sheet => ({
    id: sheet.id,
    rowCount: Math.floor(Math.random() * 1000) + 100, // Mock data - replace with actual API call
    lastUpdated: new Date().toISOString()
  }));

  const totalRows = stats.reduce((sum, stat) => sum + stat.rowCount, 0);

  return NextResponse.json({
    stats,
    summary: {
      totalSheets: sheets.length,
      totalRows,
      lastUpdated: new Date().toISOString()
    }
  });
}
