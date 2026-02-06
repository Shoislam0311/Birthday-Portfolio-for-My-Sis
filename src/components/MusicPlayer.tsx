import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, SkipForward } from 'lucide-react';

interface MusicPlayerProps {
  enabled: boolean;
}

const tracks = [
  {
    name: 'Birthday Vibes',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/06/audio_998d779763.mp3?filename=u_0b2jhroke8-a-wish-you-happy-happy-birthday-480228.mp3',
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
  // Use a single persistent audio instance
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  // Initialize Audio once
  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrack].url);
    audioRef.current.volume = 0.4;

    const audio = audioRef.current;

    const handleEnded = () => nextTrack();
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Sync Track Changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    const wasPlaying = isPlaying;
    audioRef.current.src = tracks[currentTrack].url;
    audioRef.current.load();
    
    if (wasPlaying || (enabled && currentTrack === 0)) {
      attemptPlay();
    }
  }, [currentTrack]);

  // Handle Global Enable/Disable
  useEffect(() => {
    if (enabled && currentTrack === 0) {
      attemptPlay();
    } else if (!enabled && audioRef.current) {
      audioRef.current.pause();
    }
  }, [enabled]);

  const attemptPlay = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch (err) {
      console.warn("Autoplay blocked. Waiting for user interaction.");
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      attemptPlay();
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newState = !isMuted;
    audioRef.current.muted = newState;
    setIsMuted(newState);
  };

  if (!enabled) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="card-premium p-4 flex items-center gap-4 border border-luxury-blue bg-black/90 backdrop-blur-md rounded-2xl shadow-2xl">
        {/* Visualizer Effect */}
        <div className={`w-10 h-10 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium glow-blue ${isPlaying ? 'animate-pulse' : ''}`}>
          <Music className={`w-5 h-5 text-white ${isPlaying ? 'animate-bounce' : ''}`} />
        </div>

        {/* Track Info */}
        <div className="hidden sm:block min-w-[140px]">
          <p className="text-[10px] text-luxury-blue/60 uppercase tracking-[0.2em] font-bold">Now Playing</p>
          <p className="text-sm text-white font-medium truncate max-w-[150px]">{tracks[currentTrack].name}</p>
        </div>

        {/* Logic Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/20 flex items-center justify-center transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-luxury-blue fill-luxury-blue" /> : <Play className="w-4 h-4 text-luxury-blue fill-luxury-blue ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="w-10 h-10 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/20 flex items-center justify-center transition-all"
          >
            <SkipForward className="w-4 h-4 text-luxury-blue fill-luxury-blue" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/20 flex items-center justify-center transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-luxury-blue" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
