import { useState, useRef } from 'react';
import { Upload, Trash2, RefreshCw, Camera, GripVertical, Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { uploadPhoto, deletePhoto, updatePhoto } from '@/lib/api';
import { isSupabaseConfigured } from '@/lib/supabase';
import { usePhotos } from '@/hooks/usePhotos';
import type { PhotoRow } from '@/types/database.types';

const isPhotoRow = (p: unknown): p is PhotoRow =>
  typeof p === 'object' && p !== null && 'storage_path' in p && 'created_at' in p;

const PhotosManager = () => {
  const { photos, loading, error, refetch } = usePhotos();
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [caption, setCaption] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const managedPhotos = photos.filter(isPhotoRow);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured. Please add environment variables.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10 MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are supported');
      return;
    }

    setUploading(true);
    try {
      const nextOrder = managedPhotos.length > 0
        ? Math.max(...managedPhotos.map((p) => p.order_index)) + 1
        : 1;

      await uploadPhoto(file, caption || file.name.replace(/\.[^.]+$/, ''), nextOrder);
      toast.success('Photo uploaded');
      setCaption('');
      if (fileRef.current) fileRef.current.value = '';
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, storagePath: string | null) => {
    if (!confirm('Delete this photo permanently?')) return;
    setDeletingId(id);
    try {
      await deletePhoto(id, storagePath);
      toast.success('Photo deleted');
      refetch();
    } catch {
      toast.error('Failed to delete photo');
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (photo: PhotoRow) => {
    setEditingId(photo.id);
    setEditCaption(photo.caption);
  };

  const saveEdit = async (id: string) => {
    try {
      await updatePhoto(id, { caption: editCaption.trim() || 'Untitled' });
      toast.success('Caption updated');
      refetch();
    } catch {
      toast.error('Failed to update caption');
    } finally {
      setEditingId(null);
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
    <div className="space-y-6">
      {!isSupabaseConfigured && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
          Supabase is not configured. Photo management requires environment variables.
          The gallery is currently using fallback photos.
        </div>
      )}

      {/* Upload section */}
      <div className="rounded-xl border border-white/10 bg-white/3 p-5 space-y-3">
        <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wide">Upload New Photo</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-luxury-blue/50 transition-colors"
          />
          <label className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
            uploading || !isSupabaseConfigured
              ? 'bg-luxury-blue/30 text-white/50 cursor-not-allowed'
              : 'bg-luxury-blue hover:bg-luxury-blue-dark text-white'
          }`}>
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Choose File
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading || !isSupabaseConfigured}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Photos grid */}
      <div className="flex items-center justify-between">
        <span className="text-white/50 text-sm">{managedPhotos.length} photos in Supabase</span>
        <button
          onClick={refetch}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-luxury-blue/30 transition-colors"
          aria-label="Refresh"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {managedPhotos.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <Camera className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No photos in Supabase yet.</p>
          <p className="text-xs mt-1">Upload photos above or add rows directly in Supabase.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {managedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-[3/4]"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-between items-start">
                  <GripVertical className="w-4 h-4 text-white/40" />
                  <button
                    onClick={() => handleDelete(photo.id, photo.storage_path)}
                    disabled={deletingId === photo.id}
                    className="p-1 rounded-md bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors disabled:opacity-50"
                    aria-label="Delete photo"
                  >
                    {deletingId === photo.id ? (
                      <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div>
                  {editingId === photo.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        className="flex-1 px-2 py-1 bg-black/80 border border-white/20 rounded text-white text-xs focus:outline-none"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(photo.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                      <button onClick={() => saveEdit(photo.id)} className="p-1 text-green-400 hover:text-green-300">
                        <Check className="w-3 h-3" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1 text-white/40 hover:text-white/70">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="text-white text-xs flex-1 truncate">{photo.caption}</span>
                      <button
                        onClick={() => startEdit(photo)}
                        className="p-1 text-white/40 hover:text-white transition-colors flex-shrink-0"
                        aria-label="Edit caption"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosManager;
