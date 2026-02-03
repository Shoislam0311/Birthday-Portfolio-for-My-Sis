import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  enabled: boolean;
}

// Chill/Lo-fi playlist for birthday vibes
const tracks = [
  {
    name: 'Birthday Vibes',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/03/audio_87b90144b4.mp3?filename=a-wish-you-happy-happy-birthday-478577.mp3',
  },
  {
    name: 'Chill Moments',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-chill-medium-version-159456.mp3',
  },
  {
    name: 'Dreamy Night',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3',
  },
];

const MusicPlayer = ({ enabled }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrack].url);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (enabled) {
      setShowPlayer(true);
    }
  }, [enabled]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 100);
  };

  if (!showPlayer) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Player */}
      <div className="glass-card rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
        {/* Album Art / Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #b026ff 0%, #ff2d95 100%)',
          }}
        >
          <Music className={`w-6 h-6 text-white ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>

        {/* Track Info */}
        <div className="hidden sm:block">
          <p className="text-xs text-white/50 font-space uppercase tracking-wider">Now Playing</p>
          <p className="text-sm text-white font-medium">{tracks[currentTrack].name}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Next track"
          >
            <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 4l10 8-10 8V4z" />
              <path d="M19 5v14" />
            </svg>
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/70" /> : <Volume2 className="w-4 h-4 text-white/70" />}
          </button>
        </div>
      </div>

      {/* Visualizer */}
      {isPlaying && !isMuted && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-end gap-1 h-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full animate-bar"
              style={{
                background: 'linear-gradient(to top, #b026ff, #ff2d95)',
                height: `${20 + Math.random() * 80}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.3 + Math.random() * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-bar {
          animation: bar ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
