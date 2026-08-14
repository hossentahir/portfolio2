import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Tag, ChevronLeft, ChevronRight, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState('');

  const fetchBlogs = async (currentPage = 1, tagFilter = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: currentPage, limit: 6 };
      if (tagFilter) params.tag = tagFilter;

      const res = await api.get('/blogs', { params });
      const data = res.data;

      setBlogs(data.blogs || []);
      setPage(data.page || 1);
      setTotalPages(data.pages || 1);
      setTotalBlogs(data.total || 0);
    } catch (err) {
      console.warn('Backend API fetch error, using fallback blog data:', err.message);
      setError('Could not connect to live backend API. Displaying sample blogs.');
      toast.error('Could not connect to backend API. Displaying sample articles.');
      setBlogs([
        {
          _id: '1',
          title: 'Building Scalable MERN Stack Applications',
          slug: 'building-scalable-mern-stack-applications',
          content: 'Learn essential architecture tips for structuring React and Express code, securing APIs with JWT, and managing MongoDB schemas effectively.',
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
          tags: ['MERN', 'React', 'Node.js'],
          published: true,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Mastering Tailwind CSS v4 in Modern Web Dev',
          slug: 'mastering-tailwind-css-v4-in-modern-web-dev',
          content: 'Discover the new features of Tailwind CSS v4 with Vite integration, CSS variables configuration, and seamless dark mode toggles.',
          thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
          tags: ['Tailwind', 'CSS', 'Frontend'],
          published: true,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          _id: '3',
          title: 'REST API Security Best Practices with Node & Express',
          slug: 'rest-api-security-best-practices-with-node-express',
          content: 'Protect your Express endpoints using bcrypt password hashing, JWT authorization headers, CORS configuration, and input validation.',
          thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
          tags: ['Security', 'Express', 'Backend'],
          published: true,
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
        }
      ]);
      setTotalPages(1);
      setTotalBlogs(3);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page, selectedTag);
  }, [page, selectedTag]);

  // Helper to decode HTML entities (&nbsp;, &amp;, &lt;, &gt;, etc.) safely
  const decodeHtmlEntities = (text) => {
    if (!text) return '';
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  };

  // Helper to extract clean plain text excerpt (stripping HTML tags & decoding entities)
  const getExcerpt = (htmlOrText, maxLength = 130) => {
    if (!htmlOrText) return '';
    // 1. Strip HTML tags
    const noHtml = htmlOrText.replace(/<[^>]*>?/gm, ' ');
    // 2. Decode HTML entities
    const decoded = decodeHtmlEntities(noHtml);
    // 3. Clean markdown symbols and extra whitespace
    const clean = decoded.replace(/#|\*|`|\[|\]/g, '').replace(/\s+/g, ' ').trim();
    if (clean.length <= maxLength) return clean;
    return clean.substring(0, maxLength) + '...';
  };

  return (
    <>
      <Helmet>
        <title>Technical Articles &amp; Blog | Tahir Hossen</title>
        <meta name="description" content="Technical guides, MERN stack tutorials, and web engineering articles written by Tahir Hossen." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Page Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Latest <span className="text-indigo-600 dark:text-indigo-400">Articles</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Thoughts, technical guides, and architectural insights on modern full-stack web engineering.
          </p>
        </div>

      {/* Offline API Warning Banner */}
      {error && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-amber-800 dark:text-amber-300 text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchBlogs(page, selectedTag)}
            className="inline-flex items-center gap-1 text-xs font-semibold underline hover:no-underline"
          >
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse">
              <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Articles Published Yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Check back soon for new blog posts and technical guides.
          </p>
        </div>
      ) : (
        /* Blog Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Thumbnail with aspect-video and object-cover */}
              <Link to={`/blog/${blog.slug}`} className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                {blog.thumbnail ? (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="w-10 h-10 opacity-70" />
                  </div>
                )}
              </Link>

              {/* Card Body */}
              <div className="flex flex-col flex-grow p-6">
                
                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  <Link to={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                  {getExcerpt(blog.content)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      <Tag className="w-3 h-3 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
    </>
  );
};
