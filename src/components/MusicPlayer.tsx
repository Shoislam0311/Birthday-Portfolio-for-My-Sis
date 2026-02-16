import { Music } from 'lucide-react';

interface MusicPlayerProps {
  enabled: boolean;
}

const MusicPlayer = ({ enabled }: MusicPlayerProps) => {
  if (!enabled) return null;

  const scrollToMusic = () => {
    const musicSection = document.getElementById('music');
    if (musicSection) {
      musicSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Scroll Shortcut Player */}
      <button
        onClick={scrollToMusic}
        className="card-premium p-4 flex items-center gap-4 border border-luxury-blue bg-black/80 backdrop-blur-sm hover:bg-luxury-blue/10 transition-all group"
        aria-label="Scroll to music section"
      >
        {/* Simple Icon */}
        <div className="w-10 h-10 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium glow-blue group-hover:scale-110 transition-transform">
          <Music className="w-5 h-5 text-white" />
        </div>

        {/* Info */}
        <div className="hidden sm:block">
          <p className="text-xs text-luxury-blue/60 uppercase tracking-[0.2em]">Music</p>
          <p className="text-sm text-white font-medium">Listen to Special Song</p>
        </div>
      </button>
    </div>
  );
};

export default MusicPlayer;
