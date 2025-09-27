import Link from 'next/link';
import { Download, ExternalLink } from 'lucide-react';

// Define the type for lead files
interface LeadFile {
  id: string;
  fileName: string;
  driveLink: string;
  dateModified: string;
  fileSize: string;
  description?: string;
}

// Sample data - replace with your actual Google Drive files
const leadFiles: LeadFile[] = [
  {
    id: '1',
    fileName: 'High-Intent B2B Leads Q3 2023.csv',
    driveLink: 'https://drive.google.com/file/d/EXAMPLE1/view?usp=sharing',
    dateModified: '2023-09-15',
    fileSize: '2.4 MB',
    description: 'List of high-intent B2B leads with verified contact information.'
  },
  {
    id: '2',
    fileName: 'E-commerce Business Owners 2023.xlsx',
    driveLink: 'https://drive.google.com/file/d/EXAMPLE2/view?usp=sharing',
    dateModified: '2023-09-10',
    fileSize: '1.8 MB',
    description: 'Comprehensive list of e-commerce business owners with store URLs and contact details.'
  },
  {
    id: '3',
    fileName: 'Startup Founders Database 2023.csv',
    driveLink: 'https://drive.google.com/file/d/EXAMPLE3/view?usp=sharing',
    dateModified: '2023-09-05',
    fileSize: '3.1 MB',
    description: 'Database of startup founders including contact information and funding details.'
  },
];

export default function LeadsPage() {
  return (
    <main className="min-h-[calc(100vh-16rem)]">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Free Lead Databases</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
            Download our free lead databases to help grow your business. These lists are regularly updated and contain verified contact information.
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                {leadFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                          <Download className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-zinc-900 dark:text-white">
                            <a 
                              href={file.driveLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1"
                            >
                              {file.fileName}
                              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                        {file.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-300">
                      {file.dateModified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-300">
                      {file.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={file.driveLink}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
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
    </main>
  );
}
