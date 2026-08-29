import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Layers, Search, Code, AlertCircle, RefreshCw, FolderGit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.warn('Backend API fetch error, utilizing fallback projects data:', err.message);
      setError('Could not connect to live backend API. Displaying sample projects.');
      toast.error('Could not connect to backend API. Displaying sample projects.');
      setProjects([
        {
          _id: '1',
          title: 'MERN E-Commerce Store',
          description: 'Full-featured online shop with Stripe payment processing, admin inventory management, and JWT auth.',
          techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
          imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com'
        },
        {
          _id: '2',
          title: 'Real-time Kanban Board',
          description: 'Collaborative task and workflow manager with live drag-and-drop updates and team permission controls.',
          techStack: ['React', 'Node.js', 'Mongoose', 'Tailwind CSS', 'REST API'],
          imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com'
        },
        {
          _id: '3',
          title: 'Developer Blog & CMS Platform',
          description: 'Developer publishing engine featuring Markdown formatting, tag categorization, and Cloudinary media storage.',
          techStack: ['React', 'Vite', 'Express', 'MongoDB', 'Cloudinary'],
          imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Extract all unique technology tags across projects
  const allTechnologies = ['All', ...new Set(projects.flatMap((p) => p.techStack || []))];

  // Filter projects by search query & selected tech tag
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech =
      selectedTech === 'All' || (project.techStack && project.techStack.includes(selectedTech));
    return matchesSearch && matchesTech;
  });

  return (
    <>
      <Helmet>
        <title>Projects &amp; Portfolio | Sazzad Hossen</title>
        <meta name="description" content="Explore full-stack software applications, open-source projects, and MERN stack systems created by Sazzad Hossen." />
        <link rel="canonical" href="https://sazzad-engr.vercel.app/projects" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sazzad-engr.vercel.app/projects" />
        <meta property="og:title" content="Projects &amp; Portfolio | Sazzad Hossen" />
        <meta property="og:description" content="Explore full-stack software applications, open-source projects, and MERN stack systems created by Sazzad Hossen." />
        <meta property="og:image" content="https://sazzad-engr.vercel.app/favicon.svg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://sazzad-engr.vercel.app/projects" />
        <meta name="twitter:title" content="Projects &amp; Portfolio | Sazzad Hossen" />
        <meta name="twitter:description" content="Explore full-stack software applications, open-source projects, and MERN stack systems created by Sazzad Hossen." />
        <meta name="twitter:image" content="https://sazzad-engr.vercel.app/favicon.svg" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Featured <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore my latest full-stack software applications, open-source work, and REST API services built with the MERN stack.
          </p>
      </div>

      {/* Search and Technology Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Tech Stack Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {allTechnologies.slice(0, 7).map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTech === tech
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* API Notice / Warning Banner if Offline */}
      {error && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-amber-800 dark:text-amber-300 text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchProjects}
            className="inline-flex items-center gap-1 text-xs font-semibold underline hover:no-underline"
          >
            <RefreshCw className="w-3 h-3" /> Retry API
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-slate-200 dark:bg-slate-800" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <FolderGit2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Projects Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Try adjusting your search query or technology filter.
          </p>
        </div>
      ) : (
        /* Responsive Grid of Project Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project._id}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full min-w-0"
            >
              {/* Project Cover Image with aspect-video and object-cover */}
              <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-indigo-600 dark:text-indigo-400 font-bold">
                    <Layers className="w-10 h-10 opacity-70" />
                  </div>
                )}
              </div>

              {/* Card Content with proper flexbox and text wrapping */}
              <div className="flex flex-col flex-grow p-6 w-full min-w-0">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 break-words">
                  {project.title}
                </h2>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow line-clamp-3 break-words overflow-hidden">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-sm font-semibold mt-auto">
                  {project.githubLink ? (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Code
                    </a>
                  ) : <div />}

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                    >
                      Live Demo
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            </article>
          ))}
        </div>
      )}

    </div>
    </>
  );
};
