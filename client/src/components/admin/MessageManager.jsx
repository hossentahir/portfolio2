import { useState, useEffect } from 'react';
import { Mail, Calendar, Trash2, CheckCircle2, Eye, EyeOff, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

export const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/contact');
      setMessages(res.data || []);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to load messages';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id, currentReadStatus) => {
    try {
      const res = await api.put(`/contact/${id}/read`, { read: !currentReadStatus });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: res.data.read } : msg))
      );
      toast.success(res.data.read ? 'Marked as read' : 'Marked as unread');
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to update status';
      toast.error(errMsg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;

    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success('Contact message deleted');
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to delete message';
      toast.error(errMsg);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Contact Submissions
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review user inquiries, feedback, and project contact form submissions.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 rounded-2xl text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Messages List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 animate-pulse space-y-3">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-1">No Messages Received Yet</h3>
          <p className="text-xs text-slate-500">Contact form submissions from visitors will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-6 rounded-3xl border transition-all ${
                !msg.read
                  ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-md'
                  : 'bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/80 opacity-90'
              }`}
            >
              {/* Top Row: Sender Info & Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {msg.name}
                    </h3>
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" title="Unread Message" />
                    )}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {msg.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(msg.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>

                  {msg.read ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                      Read
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                      Unread
                    </span>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="py-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {msg.message}
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleToggleRead(msg._id, msg.read)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {msg.read ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" /> Mark Unread
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-indigo-500" /> Mark Read
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(msg._id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
