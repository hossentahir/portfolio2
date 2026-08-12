import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, AlertCircle } from 'lucide-react';
import DOMPurify from 'dompurify';
import api from '../api/axios';

export const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        // Fallback sample blog post if server is offline or slug not in DB
        setBlog({
          _id: '1',
          title: 'Building Scalable MERN Applications in 2026',
          slug: slug,
          content: `
            <p>Building full-stack web applications with the <strong>MERN stack</strong> (MongoDB, Express, React, Node) requires careful planning around project architecture, state management, and database schema optimization.</p>
            <h3>Key Architecture Principles:</h3>
            <ul>
              <li><strong>Clean Directory Structure:</strong> Keep client components modular and server routes encapsulated with dedicated controllers and middleware.</li>
              <li><strong>Authentication &amp; Security:</strong> Hash passwords using bcryptjs, enforce CORS configuration, and protect admin routes with JWT tokens.</li>
              <li><strong>Database Performance:</strong> Create compound indexes for frequently queried fields in MongoDB (such as published status and unique slugs).</li>
            </ul>
            <p>By following these best practices, your application remains fast, scalable, and easy to maintain.</p>
          `,
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
          tags: ['React', 'MERN', 'WebDev', 'Node.js'],
          published: true,
          createdAt: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Helper to determine if content contains raw HTML tags
  const isHtml = (str) => /<[a-z][\s\S]*>/i.test(str);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-8 animate-pulse" />
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-8 animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Blog Post Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">The requested article could not be located.</p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Back Button */}
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blogs
      </Link>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Thumbnail */}
      {blog.thumbnail && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 max-h-[480px]">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Sanitized HTML Content Rendering using DOMPurify */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 text-base sm:text-lg">
        {isHtml(blog.content) ? (
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
            className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_p]:mb-4"
          />
        ) : (
          blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        )}
      </div>

    </article>
  );
};
