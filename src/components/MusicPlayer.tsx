import { useEffect, useRef, useState, useCallback } from 'react';
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

  // 1. Initialize Audio Instance (Persistent)
  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrack].url);
    audioRef.current.volume = 0.4;
    audioRef.current.preload = "auto";

    const audio = audioRef.current;

    const handleEnded = () => {
      // Loop Logic: Go to next track, or back to 0 if at the end
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Global listener to bypass Autoplay Policy
    const startOnInteraction = () => {
      if (enabled && !isPlaying) {
        attemptPlay();
        window.removeEventListener('click', startOnInteraction);
      }
    };
    window.addEventListener('click', startOnInteraction);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('click', startOnInteraction);
    };
  }, []);

  // 2. Handle Track Changes & Sequential Auto-play
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.src = tracks[currentTrack].url;
    audioRef.current.load();
    
    // Only auto-start if enabled or if we were already playing
    if (enabled || isPlaying) {
      attemptPlay();
    }
  }, [currentTrack]);

  // 3. Robust Play Function
  const attemptPlay = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch (err) {
      console.log("Autoplay blocked. Waiting for user interaction.");
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : attemptPlay();
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
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="p-3 pr-5 flex items-center gap-4 border border-luxury-blue/40 bg-black/80 backdrop-blur-xl rounded-full shadow-[0_0_30px_rgba(0,198,255,0.2)]">
        
        {/* Animated Music Icon */}
        <div className={`w-12 h-12 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium ${isPlaying ? 'animate-spin-slow' : ''}`}>
           <Music className={`w-5 h-5 text-white ${isPlaying ? 'animate-bounce' : ''}`} />
        </div>

        {/* Info & Controls */}
        <div className="flex flex-col">
          <p className="text-[10px] text-luxury-blue font-bold uppercase tracking-widest opacity-70">Playing Loop</p>
          <div className="flex items-center gap-3">
             <span className="text-sm text-white font-medium truncate max-w-[120px]">
              {tracks[currentTrack].name}
            </span>
            
            <div className="flex items-center gap-2 ml-2">
              <button onClick={togglePlay} className="hover:scale-110 transition-transform">
                {isPlaying ? <Pause size={18} className="text-luxury-blue fill-luxury-blue" /> : <Play size={18} className="text-luxury-blue fill-luxury-blue" />}
              </button>
              <button onClick={nextTrack} className="hover:scale-110 transition-transform">
                <SkipForward size={18} className="text-luxury-blue fill-luxury-blue" />
              </button>
              <button onClick={toggleMute} className="hover:scale-110 transition-transform">
                {isMuted ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} className="text-luxury-blue" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
