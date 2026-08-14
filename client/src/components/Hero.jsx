import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Software Engineering Student @ DIU (CGPA 3.7)
          </div>

          {/* Headline / Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Sazzad Hossen
            </span>
          </h1>

          {/* Short Intro */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            Full-Stack Developer, Cofounder of SPC Academy, and Competitive Programmer building real-world software solutions.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 dark:shadow-indigo-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://github.com/hossentahir"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sazzad-hossen-646bb0233/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#0A66C2] hover:bg-[#084e96] shadow-md shadow-blue-500/20 transition-all"
            >
              <FaLinkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:sazzademon009@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <FaEnvelope className="w-4 h-4 text-indigo-500" />
              <span>Email</span>
            </a>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Core Technologies &amp; Tools
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['JavaScript', 'MERN Stack', 'Java (Spring Boot)', 'C/C++', 'PHP', 'SQL / MySQL', 'SQA', 'IoT', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
