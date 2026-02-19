import { lazy, Suspense } from 'react';
import { LogOut, MessageSquareHeart, Images, Settings, ShieldCheck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import LoginForm from '@/components/admin/LoginForm';

const WishesManager = lazy(() => import('@/components/admin/WishesManager'));
const PhotosManager = lazy(() => import('@/components/admin/PhotosManager'));
const SettingsManager = lazy(() => import('@/components/admin/SettingsManager'));

const TabLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-7 h-7 border-2 border-luxury-blue/30 border-t-luxury-blue rounded-full animate-spin" />
  </div>
);

const Admin = () => {
  const { isAuthenticated, checking, login, logout } = useAdminAuth();

  if (checking) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-luxury-blue/30 border-t-luxury-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-luxury-blue" />
            <span className="font-serif-display font-semibold text-white text-base">Admin Panel</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors text-xs font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="wishes">
          <TabsList className="bg-white/5 border border-white/10 h-auto p-1 rounded-xl mb-6 flex flex-wrap gap-1">
            <TabsTrigger
              value="wishes"
              className="flex items-center gap-1.5 data-[state=active]:bg-luxury-blue data-[state=active]:text-white text-white/60 rounded-lg text-xs px-3 py-2 transition-all"
            >
              <MessageSquareHeart className="w-3.5 h-3.5" />
              Wishes
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="flex items-center gap-1.5 data-[state=active]:bg-luxury-blue data-[state=active]:text-white text-white/60 rounded-lg text-xs px-3 py-2 transition-all"
            >
              <Images className="w-3.5 h-3.5" />
              Photos
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-1.5 data-[state=active]:bg-luxury-blue data-[state=active]:text-white text-white/60 rounded-lg text-xs px-3 py-2 transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wishes">
            <Suspense fallback={<TabLoader />}>
              <WishesManager />
            </Suspense>
          </TabsContent>

          <TabsContent value="photos">
            <Suspense fallback={<TabLoader />}>
              <PhotosManager />
            </Suspense>
          </TabsContent>

          <TabsContent value="settings">
            <Suspense fallback={<TabLoader />}>
              <SettingsManager />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
