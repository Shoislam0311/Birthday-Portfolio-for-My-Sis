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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Player */}
      <div className="bg-white rounded-lg border border-neutral-200 p-3 flex items-center gap-3 shadow-minimal">
        {/* Simple Icon */}
        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
          <Music className="w-4 h-4 text-white" />
        </div>

        {/* Track Info */}
        <div className="hidden sm:block">
          <p className="text-xs text-neutral-500 uppercase tracking-wider">Now Playing</p>
          <p className="text-sm text-neutral-700 font-medium">{tracks[currentTrack].name}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full border border-neutral-300 hover:border-teal-600 flex items-center justify-center transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-neutral-600" /> : <Play className="w-3 h-3 text-neutral-600 ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="w-8 h-8 rounded-full border border-neutral-300 hover:border-teal-600 flex items-center justify-center transition-colors"
            aria-label="Next track"
          >
            <svg className="w-3 h-3 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 4l10 8-10 8V4z" />
              <path d="M19 5v14" />
            </svg>
          </button>

          <div className="w-px h-4 bg-neutral-300 mx-1" />

          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full border border-neutral-300 hover:border-teal-600 flex items-center justify-center transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-neutral-600" /> : <Volume2 className="w-3 h-3 text-neutral-600" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;