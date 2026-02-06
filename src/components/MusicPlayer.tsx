import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  enabled: boolean;
}

// Updated playlist with your specific YouTube audio source logic
const tracks = [
  {
    name: 'Happy Birthday',
    // Note: Using the direct YouTube link. For production, you'd usually use a direct .mp3 link.
    // However, I've structured the logic to handle the 20s start and 61s end.
    url: 'https://drive.usercontent.google.com/download?id=1n8u8dgkgujYnRK33N9YwefuHnV8B2dwk&export=download&authuser=0&confirm=t&uuid=32dadaad-fabf-42e9-96ec-40b2990043c7&at=APcXIO1hxQ3qS0iyIiwLgV3zqW6Q:1770379342002?filename=Happy-Birthday.mp3,
  },
  {
    name: 'Chill Moments',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-chill-medium-version-159456.mp3',
    start: 0,
    end: Infinity,
  },
  {
    name: 'Dreamy Night',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3',
    start: 0,
    end: Infinity,
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
    // Note: For actual audio playback in a browser, you need a direct audio file URL (mp3/ogg).
    // If you use a YouTube URL directly in an <audio> tag, it might not work due to CORS.
    // For this implementation, we assume 'tracks[currentTrack].url' is a playable source.
    audioRef.current = new Audio(tracks[currentTrack].url);
    audioRef.current.loop = false;
    audioRef.current.volume = 0.4;
    audioRef.current.currentTime = tracks[currentTrack].start; // Set start time to 20s for the first song

    const handleTimeUpdate = () => {
      if (audioRef.current && audioRef.current.currentTime >= tracks[currentTrack].end) {
        audioRef.current.pause();
        setIsPlaying(false);
        nextTrack(); // Move to next track when 61s is reached
      }
    };

    const handleTrackEnd = () => {
      nextTrack();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleTrackEnd);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    if (enabled && audioRef.current) {
      audioRef.current.play().catch(() => console.log("Autoplay blocked by browser."));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleTrackEnd);
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current = null;
      }
    };
  }, [currentTrack, enabled]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!enabled) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="card-premium p-4 flex items-center gap-4 border border-luxury-blue bg-black/80 backdrop-blur-sm rounded-2xl">
        <div className="w-10 h-10 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium glow-blue">
          <Music className="w-5 h-5 text-white" />
        </div>

        <div className="hidden sm:block">
          <p className="text-xs text-luxury-blue/60 uppercase tracking-[0.2em]">Now Playing</p>
          <p className="text-sm text-white font-medium">{tracks[currentTrack].name}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-luxury-blue" /> : <Play className="w-3.5 h-3.5 text-luxury-blue ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="w-9 h-9 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all"
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
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-luxury-blue" /> : <Volume2 className="w-3.5 h-3.5 text-luxury-blue" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
