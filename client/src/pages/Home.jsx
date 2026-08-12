import { Hero } from '../components/Hero';
import { Projects } from './Projects';
import { useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import api from '../api/axios';

export const Home = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/health');
      setHealthStatus(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Server connection offline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero />
      
      {/* Featured Projects Section */}
      <section id="projects" className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
        <Projects />
      </section>

      {/* Express & MongoDB Health Check Widget */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                MERN Backend Health Status
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Test live API status at <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400">/api/health</code>
            </p>

            <button
              onClick={checkHealth}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Ping Backend...' : 'Ping Express Server'}
            </button>

            {healthStatus && (
              <div className="mt-6 text-left bg-slate-950 text-indigo-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-sans font-semibold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Express Server Connected Successfully
                </div>
                <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-900/50 text-sm flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error} - Make sure Express is running on port 5000
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
