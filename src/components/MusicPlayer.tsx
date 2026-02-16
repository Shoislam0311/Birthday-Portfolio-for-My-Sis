import { Music, Play } from 'lucide-react';

interface MusicPlayerProps {
  enabled: boolean;
}

const MusicPlayer = ({ enabled }: MusicPlayerProps) => {
  const scrollToMusic = () => {
    const element = document.getElementById('music');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!enabled) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Navigation Toggle to Music Section */}
      <button
        onClick={scrollToMusic}
        className="card-premium p-4 flex items-center gap-4 border border-luxury-blue bg-black/80 backdrop-blur-sm group hover:scale-105 transition-all duration-300"
      >
        {/* Simple Icon */}
        <div className="w-10 h-10 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium glow-blue group-hover:glow-blue-strong">
          <Music className="w-5 h-5 text-white" />
        </div>

        {/* Track Info */}
        <div className="hidden sm:block text-left">
          <p className="text-xs text-luxury-blue/60 uppercase tracking-[0.2em]">Dedicated Song</p>
          <p className="text-sm text-white font-medium">Sob Kanar Hat Bazar</p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center w-9 h-9 rounded-full border border-luxury-blue/30 group-hover:border-luxury-blue group-hover:bg-luxury-blue/10 transition-all">
          <Play className="w-3.5 h-3.5 text-luxury-blue ml-0.5" />
        </div>
      </button>
    </div>
  );
};

export default MusicPlayer;
