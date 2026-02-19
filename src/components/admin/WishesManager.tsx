import { useState } from 'react';
import { Trash2, Mail, MailOpen, RefreshCw, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useWishes } from '@/hooks/useWishes';

const WishesManager = () => {
  const { wishes, loading, error, refetch, toggleRead, remove } = useWishes();
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = wishes.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.email.toLowerCase().includes(search.toLowerCase()) ||
      w.message.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = wishes.filter((w) => !w.is_read).length;

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this wish permanently?')) return;
    setDeletingId(id);
    try {
      await remove(id);
      toast.success('Wish deleted');
    } catch {
      toast.error('Failed to delete wish');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleRead = async (id: string, current: boolean) => {
    try {
      await toggleRead(id, !current);
    } catch {
      toast.error('Failed to update wish');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-luxury-blue/30 border-t-luxury-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-sm">
            {wishes.length} total
          </span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-luxury-blue/20 text-luxury-blue text-xs font-semibold">
              {unreadCount} unread
            </span>
          )}
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input
              type="text"
              placeholder="Search wishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-56 pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-white/30 focus:outline-none focus:border-luxury-blue/50 transition-colors"
            />
          </div>
          <button
            onClick={refetch}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-luxury-blue/30 transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          {search ? 'No wishes match your search.' : 'No wishes yet.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((wish) => (
            <div
              key={wish.id}
              className={`group rounded-xl border p-4 transition-all ${
                wish.is_read
                  ? 'bg-white/2 border-white/5'
                  : 'bg-luxury-blue/5 border-luxury-blue/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-white text-sm">{wish.name}</span>
                    <span className="text-white/30 text-xs">{wish.email}</span>
                    {!wish.is_read && (
                      <span className="px-1.5 py-0.5 rounded bg-luxury-blue/30 text-luxury-blue text-[10px] font-bold uppercase tracking-wide">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {wish.message}
                  </p>
                  <p className="text-white/25 text-xs mt-2">
                    {new Date(wish.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggleRead(wish.id, wish.is_read)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                    aria-label={wish.is_read ? 'Mark as unread' : 'Mark as read'}
                    title={wish.is_read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {wish.is_read ? (
                      <Mail className="w-3.5 h-3.5" />
                    ) : (
                      <MailOpen className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(wish.id)}
                    disabled={deletingId === wish.id}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors disabled:opacity-50"
                    aria-label="Delete wish"
                    title="Delete wish"
                  >
                    {deletingId === wish.id ? (
                      <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishesManager;
