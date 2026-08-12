import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Upload, Plus, Edit2, Trash2, CheckCircle2, XCircle, AlertCircle, Image as ImageIcon, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

export const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [published, setPublished] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/blogs?all=true');
      setBlogs(res.data.blogs || []);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to fetch blogs';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setTagsInput('');
    setThumbnail('');
    setPublished(true);
    setIsFormOpen(false);
  };

  // Thumbnail upload handler using POST /api/upload
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    setError(null);

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.url) {
        setThumbnail(res.data.url);
        toast.success('Thumbnail uploaded successfully!');
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Image upload failed';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setUploadingImage(false);
    }
  };

  // Create or Update Blog Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Article title is required');
      return;
    }
    if (!content.trim()) {
      toast.error('Article content is required');
      return;
    }

    setSubmitting(true);
    setError(null);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title,
      content,
      tags,
      thumbnail,
      published
    };

    try {
      if (editingId) {
        await api.put(`/blogs/${editingId}`, payload);
        toast.success('Blog post updated successfully!');
      } else {
        await api.post('/blogs', payload);
        toast.success('New blog post created successfully!');
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to save blog post';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title || '');
    setContent(blog.content || '');
    setTagsInput(blog.tags ? blog.tags.join(', ') : '');
    setThumbnail(blog.thumbnail || '');
    setPublished(Boolean(blog.published));
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Blog post deleted successfully.');
      fetchBlogs();
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to delete blog post';
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'code-block'],
      ['clean']
    ]
  };

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Manage Blogs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish articles, update content with Rich Text editor, and manage published state.
          </p>
        </div>

        {!isFormOpen && (
          <button
            onClick={() => { resetForm(); setIsFormOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            Create New Article
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 rounded-2xl text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Blog Form (Create / Edit) */}
      {isFormOpen && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Blog Article' : 'Create New Blog Article'}
            </h3>
            <button
              onClick={resetForm}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Master MERN Architecture in 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. React, MERN, WebDev"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Thumbnail Upload (using /api/upload) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Article Thumbnail Image
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer border border-slate-200 dark:border-slate-700 transition-colors">
                  <Upload className="w-4 h-4 text-indigo-500" />
                  {uploadingImage ? 'Uploading image...' : 'Choose Image File'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
                <input
                  type="url"
                  placeholder="Or paste image URL directly..."
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="flex-grow w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {thumbnail && (
                <div className="mt-3 relative w-32 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <img src={thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Rich Text Editor (ReactQuill) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Article Content (Rich Text Editor) *
              </label>
              <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[250px]">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  placeholder="Write article content here..."
                  className="h-60 mb-12"
                />
              </div>
            </div>

            {/* Published Toggle */}
            <div className="flex items-center gap-3 pt-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
              </label>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {published ? 'Published (Visible to public)' : 'Draft (Hidden from public)'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors"
              >
                <Save className="w-4 h-4" />
                {submitting ? 'Saving...' : editingId ? 'Update Article' : 'Publish Article'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Blogs List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Existing Articles ({blogs.length})</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mx-auto" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No blog articles found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-950/60 uppercase text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.thumbnail ? (
                          <img src={blog.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{blog.title}</div>
                          <div className="text-xs text-slate-400 font-mono">{blog.slug}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {blog.published ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/50">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900/50">
                          <XCircle className="w-3.5 h-3.5" /> Draft
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                          title="Edit Blog"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
