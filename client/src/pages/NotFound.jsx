import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Compass, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found | Sazzad Hossen</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl space-y-6">
          
          <div className="inline-flex p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
            <Compass className="w-12 h-12 animate-spin-slow" />
          </div>

          <div>
            <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400 block mb-2">
              404
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Oops! The page you are looking for might have been removed, renamed, or does not exist.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all text-sm"
            >
              <Home className="w-4 h-4" /> Return to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
