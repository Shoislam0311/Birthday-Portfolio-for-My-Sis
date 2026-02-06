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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  // 3. Robust Play Function
  const attemptPlay = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch {
      console.log("Autoplay blocked. Waiting for user interaction.");
    }
  };

  // 1. Initialize Audio Instance (Persistent)
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(tracks[0].url);
      audioRef.current.volume = 0.4;
      audioRef.current.preload = "auto";
    }

    const audio = audioRef.current;

    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Global listener to bypass Autoplay Policy
    const startOnInteraction = () => {
      if (enabled && audioRef.current && audioRef.current.paused) {
        attemptPlay();
        window.removeEventListener('click', startOnInteraction);
      }
    };
    window.addEventListener('click', startOnInteraction);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('click', startOnInteraction);
    };
  }, [enabled]);

  // 2. Handle Track Changes & Sequential Auto-play
  useEffect(() => {
    if (!audioRef.current) return;
    
    const isActuallyPlaying = !audioRef.current.paused;
    audioRef.current.src = tracks[currentTrack].url;
    audioRef.current.load();
    
    if (enabled || isActuallyPlaying) {
      attemptPlay();
    }
  }, [currentTrack, enabled]);

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
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!enabled) return null;

  return (
    <div className="fixed bottom-28 md:bottom-6 right-4 md:right-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)]">
      <div className="p-1.5 md:p-3 pr-3 md:pr-5 flex items-center gap-2 md:gap-4 border border-luxury-blue/40 bg-black/80 backdrop-blur-xl rounded-full shadow-[0_0_30px_rgba(0,198,255,0.2)]">
        
        {/* Animated Music Icon */}
        <div className={`w-8 h-8 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium ${isPlaying ? 'animate-spin-slow' : ''}`}>
           <Music className={`w-4 h-4 md:w-5 md:h-5 text-white ${isPlaying ? 'animate-bounce' : ''}`} />
        </div>

        {/* Info & Controls */}
        <div className="flex flex-col min-w-0">
          <p className="text-[9px] md:text-[10px] text-luxury-blue font-bold uppercase tracking-widest opacity-70 truncate">Playing Loop</p>
          <div className="flex items-center gap-2 md:gap-3">
             <span className="text-xs md:text-sm text-white font-medium truncate max-w-[80px] md:max-w-[120px]">
              {tracks[currentTrack].name}
            </span>
            
            <div className="flex items-center gap-1 md:gap-2 ml-1 md:ml-2 flex-shrink-0">
              <button onClick={togglePlay} className="hover:scale-110 transition-transform p-1" aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause size={16} className="text-luxury-blue fill-luxury-blue md:w-[18px] md:h-[18px]" /> : <Play size={16} className="text-luxury-blue fill-luxury-blue md:w-[18px] md:h-[18px]" />}
              </button>
              <button onClick={nextTrack} className="hover:scale-110 transition-transform p-1" aria-label="Next track">
                <SkipForward size={16} className="text-luxury-blue fill-luxury-blue md:w-[18px] md:h-[18px]" />
              </button>
              <button onClick={toggleMute} className="hover:scale-110 transition-transform p-1" aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX size={16} className="text-red-400 md:w-[18px] md:h-[18px]" /> : <Volume2 size={16} className="text-luxury-blue md:w-[18px] md:h-[18px]" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
