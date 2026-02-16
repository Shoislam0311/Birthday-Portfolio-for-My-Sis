import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  enabled: boolean;
}

// Chill/Lo-fi playlist for birthday vibes
const tracks = [
 {
    name: 'Sob Kanar Hat Bazar',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/16/audio_fb5fb37a3b.mp3?filename=u_0b2jhroke8-e-sob-dekhi-kana-hat-bazar-485876.mp3',
  },
  {
    name: 'Birthday Vibes',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/06/audio_998d779763.mp3?filename=u_0b2jhroke8-a-wish-you-happy-happy-birthday-480228.mp3',
  },
];

const MusicPlayer = ({ enabled }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 100);
  };

  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrack].url);
    audioRef.current.loop = false;
    audioRef.current.volume = 0.4;

    const handleTrackEnd = () => {
      nextTrack();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleTrackEnd);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    if (enabled && currentTrack === 0 && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleTrackEnd);
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current = null;
      }
    };
  }, [currentTrack, enabled]);

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

  if (!enabled) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Main Player */}
      <div className="card-premium p-4 flex items-center gap-4 border border-luxury-blue bg-black/80 backdrop-blur-sm">
        {/* Simple Icon */}
        <div className="w-10 h-10 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium glow-blue">
          <Music className="w-5 h-5 text-white" />
        </div>

        {/* Track Info */}
        <div className="hidden sm:block">
          <p className="text-xs text-luxury-blue/60 uppercase tracking-[0.2em]">Now Playing</p>
          <p className="text-sm text-white font-medium">{tracks[currentTrack].name}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-luxury-blue" /> : <Play className="w-3.5 h-3.5 text-luxury-blue ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="w-9 h-9 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all"
            aria-label="Next track"
          >
            <svg className="w-3.5 h-3.5 text-luxury-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 4l10 8-10 8V4z" />
              <path d="M19 5v14" />
            </svg>
          </button>

          <div className="w-px h-5 bg-luxury-blue/20 mx-2" />

          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-luxury-blue" /> : <Volume2 className="w-3.5 h-3.5 text-luxury-blue" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
