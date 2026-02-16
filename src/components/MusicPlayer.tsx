import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  enabled: boolean;
}

const tracks = [
  {
    name: 'Edition 2026 Vibes',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/06/audio_998d779763.mp3?filename=u_0b2jhroke8-a-wish-you-happy-happy-birthday-480228.mp3',
  },
  {
    name: 'Elite Chill',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-chill-medium-version-159456.mp3',
  },
];

const MusicPlayer = ({ enabled }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrack].url);
    audioRef.current.loop = false;
    audioRef.current.volume = 0.3;

    const handleTrackEnd = () => nextTrack();
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleTrackEnd);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    if (enabled && audioRef.current) {
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
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!enabled) return null;

  return (
    <div className="fixed bottom-8 left-8 lg:bottom-12 lg:left-12 z-50">
      <div className="glass-premium p-4 flex items-center gap-4 border border-white/5 rounded-2xl">
        <div className="w-10 h-10 rounded-full bg-premium-violet flex items-center justify-center shadow-premium glow-violet">
          <Music className="w-4 h-4 text-white" />
        </div>

        <div className="hidden sm:block">
          <p className="text-[10px] text-premium-violet font-bold uppercase tracking-[0.2em] mb-1">Elite Audio</p>
          <p className="text-xs text-white/70 font-medium truncate max-w-[120px]">{tracks[currentTrack].name}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-premium-violet/50 flex items-center justify-center transition-all bg-white/5"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white ml-0.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-premium-violet/50 flex items-center justify-center transition-all bg-white/5"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-white" /> : <Volume2 className="w-3 h-3 text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
