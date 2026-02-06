import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, SkipForward } from 'lucide-react';
import { musicPlaylistApi } from '../lib/api';
import { useAnalytics } from '../hooks/useAnalytics';

interface MusicPlayerProps {
  enabled: boolean;
  autoPlay?: boolean;
}

interface Track {
  name: string;
  url: string;
  artist?: string;
  duration?: number;
}

// Default tracks as fallback
const defaultTracks: Track[] = [
  {
    name: 'Birthday Vibes',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/06/audio_998d779763.mp3?filename=u_0b2jhroke8-a-wish-you-happy-happy-birthday-480228.mp3',
    artist: 'Pixabay',
  },
  {
    name: 'Chill Moments',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-chill-medium-version-159456.mp3',
    artist: 'Pixabay',
  },
  {
    name: 'Dreamy Night',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3',
    artist: 'Pixabay',
  },
  {
    name: 'Celebration Time',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_517a7a4f84.mp3?filename=celebration-song-122603.mp3',
    artist: 'Pixabay',
  },
];

const MusicPlayer = ({ enabled, autoPlay = false }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const [isLoading, setIsLoading] = useState(false);
  const { trackMusicPlayback } = useAnalytics();

  // Load playlist from API
  useEffect(() => {
    const loadPlaylist = async () => {
      setIsLoading(true);
      try {
        const response = await musicPlaylistApi.getPlaylist();
        if (response.success && response.data?.tracks) {
          setTracks(response.data.tracks);
        }
      } catch (error) {
        console.error('Failed to load playlist:', error);
        // Use default tracks on error
      } finally {
        setIsLoading(false);
      }
    };

    if (enabled) {
      loadPlaylist();
    }
  }, [enabled]);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
        trackMusicPlayback('skip', tracks[(currentTrack + 1) % tracks.length].name);
      }
    }, 100);
  };

  useEffect(() => {
    if (!enabled || isLoading) return;

    audioRef.current = new Audio(tracks[currentTrack].url);
    audioRef.current.loop = false;
    audioRef.current.volume = 0.4;

    const handleTrackEnd = () => {
      nextTrack();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      trackMusicPlayback('play', tracks[currentTrack].name);
    };

    const handlePause = () => {
      setIsPlaying(false);
      trackMusicPlayback('pause', tracks[currentTrack].name);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleTrackEnd);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    // Auto-play if enabled and this is the first track
    if (autoPlay && currentTrack === 0 && audioRef.current) {
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
  }, [currentTrack, enabled, autoPlay, tracks, isLoading, trackMusicPlayback]);

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

  const currentTrackData = tracks[currentTrack] || defaultTracks[0];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Main Player */}
      <div className="card-premium p-4 flex items-center gap-4 border border-luxury-blue bg-black/80 backdrop-blur-sm shadow-[0_0_30px_rgba(0,102,255,0.2)]">
        {/* Animated Icon */}
        <div className={`w-10 h-10 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium glow-blue ${isPlaying ? 'animate-pulse' : ''}`}>
          <Music className="w-5 h-5 text-white" />
        </div>

        {/* Track Info */}
        <div className="hidden sm:block min-w-[120px]">
          <p className="text-xs text-luxury-blue/60 uppercase tracking-[0.2em]">Now Playing</p>
          <p className="text-sm text-white font-medium truncate">{currentTrackData.name}</p>
          {currentTrackData.artist && (
            <p className="text-xs text-white/50 truncate">{currentTrackData.artist}</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all active:scale-95"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-luxury-blue" /> : <Play className="w-3.5 h-3.5 text-luxury-blue ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="w-9 h-9 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all active:scale-95"
            aria-label="Next track"
            disabled={isLoading}
          >
            <SkipForward className="w-3.5 h-3.5 text-luxury-blue" />
          </button>

          <div className="w-px h-5 bg-luxury-blue/20 mx-2" />

          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all active:scale-95"
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
