import Sidebar from '@/app/ui/sidenav';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col p-6 lg:p-24">
      {/* Side Navigation */}
      <Sidebar />

      {/* Divider */}
      <div className="fixed top-0 left-64 h-full w-px bg-gray-400 z-10"></div>

      {/* Main Content */}
      <div className="ml-64 flex flex-col w-full pl-6">
        {/* Header and Footer */}
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
            <code className="font-mono font-bold">Data Science Hackathon</code>
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black pb-6">
            Footer here
          </div>
        </div>

        {/* Card Section */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Create Dataset Card */}
          <Link href="/dashboard/create-dataset" className="group block rounded-lg border border-gray-300 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create Dataset</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Start by creating a new dataset for your data science projects.
            </p>
          </Link>

          {/* Validate Dataset Card */}
          <Link href="/dashboard/validate-dataset" className="group block rounded-lg border border-gray-300 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Validate Dataset</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Validate your datasets to ensure they meet the required standards.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
