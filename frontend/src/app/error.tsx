'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <main className="container py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Something went wrong!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {error.message || 'Failed to load country information'}
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className="inline-flex items-center px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}