import { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { isSupabaseConfigured } from '@/lib/supabase';

const SETTINGS_SCHEMA = [
  {
    key: 'birthday_person_name',
    label: 'Birthday Person Name',
    description: 'Displayed in the public site headings.',
    type: 'text',
    placeholder: 'e.g. Zuyairia',
  },
  {
    key: 'notification_email',
    label: 'Notification Email',
    description: 'Email address that receives wish notifications.',
    type: 'email',
    placeholder: 'e.g. you@example.com',
  },
  {
    key: 'admin_password',
    label: 'Admin Password',
    description: 'Password to access this admin panel. Change from the default immediately.',
    type: 'password',
    placeholder: 'New password',
  },
  {
    key: 'site_title',
    label: 'Browser Tab Title',
    description: 'Title shown in the browser tab.',
    type: 'text',
    placeholder: "e.g. Zuyairia's Birthday 🎂",
  },
];

const SettingsManager = () => {
  const { settings, loading, error, save } = useSiteSettings();
  const [saving, setSaving] = useState<string | null>(null);
  const [localValues, setLocalValues] = useState<Record<string, string>>({});

  const getValue = (key: string) =>
    key in localValues ? localValues[key] : (settings[key] ?? '');

  const handleChange = (key: string, value: string) => {
    setLocalValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    const value = getValue(key);
    setSaving(key);
    try {
      await save(key, value);
      toast.success('Setting saved');
      setLocalValues((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } catch {
      toast.error('Failed to save setting');
    } finally {
      setSaving(null);
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
      {!isSupabaseConfigured && (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Supabase is not configured. Settings cannot be saved until you add your
            VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.
          </span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {SETTINGS_SCHEMA.map((field) => {
          const isDirty = field.key in localValues;
          const isSaving = saving === field.key;

          return (
            <div
              key={field.key}
              className="rounded-xl border border-white/10 bg-white/3 p-5 space-y-3"
            >
              <div>
                <label className="block text-white font-semibold text-sm mb-0.5">
                  {field.label}
                </label>
                <p className="text-white/40 text-xs">{field.description}</p>
              </div>

              <div className="flex gap-2">
                <input
                  type={field.type}
                  value={getValue(field.key)}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-luxury-blue/50 transition-colors"
                />
                <button
                  onClick={() => handleSave(field.key)}
                  disabled={isSaving || !isDirty || !isSupabaseConfigured}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-luxury-blue hover:bg-luxury-blue-dark text-white"
                >
                  {isSaving ? (
                    <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  Save
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-white/5 bg-white/2 p-4">
        <p className="text-white/30 text-xs leading-relaxed">
          <strong className="text-white/50">Note:</strong> The <code className="text-luxury-blue/70">admin_password</code> setting overrides the default password in{' '}
          <code className="text-luxury-blue/70">src/config/site.config.ts</code>.
          Always set a strong password before sharing your deployment URL.
        </p>
      </div>
    </div>
  );
};

export default SettingsManager;
