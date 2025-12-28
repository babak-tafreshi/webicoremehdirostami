import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  trackDuration?: string;
}

const AudioPlayer = ({ trackDuration = "02:18" }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Parse trackDuration string to seconds for display
  const parseDuration = (time: string): number => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const displayDuration = duration > 0 ? duration : parseDuration(trackDuration);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Audio file not available, simulate playback
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      // No audio element, just toggle visual state
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * displayDuration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const progressPercentage = (currentTime / displayDuration) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <audio ref={audioRef} src="/audio/sample.mp3" preload="metadata" />
      
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:border-primary transition-all duration-300"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-body min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="flex-1 h-1 bg-border rounded-full cursor-pointer group"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={displayDuration}
            aria-valuenow={currentTime}
            aria-label="Audio progress"
            tabIndex={0}
          >
            <div
              className="h-full bg-primary rounded-full relative transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <span className="text-sm text-muted-foreground font-body min-w-[40px]">
            {formatTime(displayDuration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
