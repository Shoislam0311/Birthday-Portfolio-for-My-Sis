import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, ChevronRight, ExternalLink } from 'lucide-react';

interface MusicPlayerProps {
  enabled: boolean;
}

const tracks = [
  {
    name: 'Sob Kanar Hat Bazar',
    type: 'vocaroo',
    url: 'https://vocaroo.com/embed/17keJbAY9slH?autoplay=0',
    link: 'https://voca.ro/17keJbAY9slH'
  },
  {
    name: 'Birthday Vibes',
    type: 'mp3',
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
  };

  useEffect(() => {
    const track = tracks[currentTrack];
    let audio: HTMLAudioElement | null = null;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (track.type === 'mp3') {
      audio = new Audio(track.url);
      audio.loop = false;
      audio.volume = 0.4;
      audio.muted = isMuted;

      audio.addEventListener('ended', nextTrack);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      audioRef.current = audio;

      if (enabled) {
        audio.play().catch(() => {});
      }
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('ended', nextTrack);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      }
      audioRef.current = null;
      setIsPlaying(false);
    };
  }, [currentTrack, enabled, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  if (!enabled) return null;

  const current = tracks[currentTrack];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="card-premium p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-4 border border-luxury-blue bg-black/80 backdrop-blur-md shadow-blue-glow">

        {/* Track Content */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium glow-blue shrink-0">
            <Music className="w-5 h-5 text-white" />
          </div>

          {/* Info */}
          <div className="min-w-[120px]">
            <p className="text-[10px] text-luxury-blue/60 uppercase tracking-[0.2em] font-bold">Now Playing</p>
            <p className="text-sm text-white font-medium truncate max-w-[150px]">{current.name}</p>
          </div>
        </div>

        {/* Player UI */}
        <div className="flex items-center gap-3 bg-black/40 p-2 rounded-lg border border-white/5 w-full sm:w-auto justify-center">
          {current.type === 'vocaroo' ? (
            <div className="flex items-center gap-3">
              <div className="w-[180px] h-[40px] overflow-hidden rounded-md border border-luxury-blue/20 bg-black/60 scale-90 origin-left">
                 <iframe
                    width="100%"
                    height="60"
                    src={`${current.url}`}
                    frameBorder="0"
                    allow="autoplay"
                    className="mt-[-10px]"
                  ></iframe>
              </div>
              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-luxury-blue/10 text-luxury-blue transition-colors"
                title="Open in Vocaroo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <>
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-luxury-blue" /> : <Play className="w-4 h-4 text-luxury-blue ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-luxury-blue" /> : <Volume2 className="w-4 h-4 text-luxury-blue" />}
              </button>
            </>
          )}

          <div className="w-px h-6 bg-luxury-blue/20 mx-1" />

          <button
            onClick={nextTrack}
            className="w-10 h-10 rounded-full border border-luxury-blue/30 hover:border-luxury-blue hover:bg-luxury-blue/10 flex items-center justify-center transition-all group"
            aria-label="Next track"
          >
            <ChevronRight className="w-5 h-5 text-luxury-blue group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
