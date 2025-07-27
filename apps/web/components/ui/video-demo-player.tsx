import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, ChevronRight, ChevronLeft, Circle, CheckCircle } from 'lucide-react';

// Placeholder assets (replace with real video and thumbnail as needed)
const DEMO_VIDEO = '/demo-video.mp4'; // Place your video in public/ or use a remote URL
const DEMO_THUMBNAIL = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';

const CHAPTERS = [
  { time: 0, label: 'Intro' },
  { time: 15, label: 'Setup' },
  { time: 40, label: 'Demo' },
  { time: 70, label: 'Results' },
  { time: 100, label: 'Conclusion' }
];

export function VideoDemoPlayer({
  videoSrc = DEMO_VIDEO,
  thumbnail = DEMO_THUMBNAIL,
  chapters = CHAPTERS,
  captionsSrc = '',
  className = ''
}: {
  videoSrc?: string;
  thumbnail?: string;
  chapters?: { time: number; label: string }[];
  captionsSrc?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showCaptions, setShowCaptions] = useState(false);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      switch (e.key) {
        case ' ': // Spacebar
        case 'k':
          setPlaying((p) => !p);
          e.preventDefault();
          break;
        case 'ArrowRight':
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration);
          break;
        case 'ArrowLeft':
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
          break;
        case 'f':
          handleFullscreen();
          break;
        case 'm':
          setMuted((m) => !m);
          break;
        case 'c':
          setShowCaptions((c) => !c);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration]);

  // Play/pause logic
  useEffect(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  // Volume/mute logic
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = volume;
    videoRef.current.muted = muted;
  }, [volume, muted]);

  // Progress tracking
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress(videoRef.current.currentTime);
    // Update active chapter
    const idx = chapters.findIndex((c, i) =>
      i === chapters.length - 1
        ? videoRef.current!.currentTime >= c.time
        : videoRef.current!.currentTime >= c.time && videoRef.current!.currentTime < chapters[i + 1].time
    );
    setActiveChapter(idx === -1 ? 0 : idx);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setProgress(time);
  };

  const handlePlayOverlay = () => {
    setShowOverlay(false);
    setPlaying(true);
    videoRef.current?.focus();
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    const container = videoRef.current.parentElement;
    if (!container) return;
    if (!fullscreen) {
      if (container.requestFullscreen) container.requestFullscreen();
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Format time helper
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black ${className}`} tabIndex={0} aria-label="Demo video player">
      {/* Video/Thumbnail Overlay */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={thumbnail}
          tabIndex={-1}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={() => setPlaying((p) => !p)}
          aria-label="Demo video"
        >
          {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default={showCaptions} />}
        </video>
        <AnimatePresence>
          {showOverlay && !playing && (
            <motion.button
              className="absolute inset-0 flex items-center justify-center bg-black/60 hover:bg-black/70 transition-colors cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePlayOverlay}
              aria-label="Play demo video"
            >
              <Play className="h-16 w-16 text-white drop-shadow-lg" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
        {/* Progress Bar with Chapters */}
        <div className="relative flex items-center w-full mb-2">
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            className="w-full accent-green-500 h-2 cursor-pointer bg-gray-700 rounded-lg appearance-none focus:outline-none"
            aria-label="Seek video"
          />
          {/* Chapter Markers */}
          <div className="absolute left-0 top-1/2 w-full h-2 pointer-events-none">
            {chapters.map((chapter, i) => (
              <div
                key={i}
                className="absolute top-0 h-2 w-1 bg-green-400 rounded"
                style={{ left: `${(chapter.time / duration) * 100}%` }}
                title={chapter.label}
                aria-label={`Chapter: ${chapter.label}`}
              />
            ))}
          </div>
        </div>
        {/* Time & Chapters */}
        <div className="flex items-center justify-between text-xs text-white/80 mb-1">
          <div>
            {formatTime(progress)} / {formatTime(duration)}
          </div>
          <button
            className="flex items-center gap-1 hover:text-green-400 transition-colors"
            onClick={() => setShowChapters((v) => !v)}
            aria-label="Show chapters"
          >
            <Circle className="h-4 w-4" /> Chapters
          </button>
        </div>
        {/* Chapters List */}
        <AnimatePresence>
          {showChapters && (
            <motion.div
              className="absolute bottom-16 left-4 bg-black/90 rounded-lg shadow-lg p-3 z-20 w-56"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="font-semibold text-green-400 mb-2">Chapters</div>
              <ul>
                {chapters.map((chapter, i) => (
                  <li key={i} className="flex items-center gap-2 mb-1">
                    {i === activeChapter ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Circle className="h-4 w-4 text-gray-500" />}
                    <button
                      className={`text-left text-white/90 hover:text-green-400 transition-colors text-sm ${i === activeChapter ? 'font-bold' : ''}`}
                      onClick={() => {
                        if (videoRef.current) videoRef.current.currentTime = chapter.time;
                        setShowChapters(false);
                      }}
                    >
                      {chapter.label} <span className="text-xs text-gray-400 ml-2">{formatTime(chapter.time)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Controls Row */}
        <div className="flex items-center gap-4 mt-2">
          {/* Play/Pause */}
          <button
            onClick={() => setPlaying((p) => !p)}
            className="p-2 rounded hover:bg-white/10 focus:outline-none"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
          </button>
          {/* Volume */}
          <button
            onClick={() => setMuted((m) => !m)}
            className="p-2 rounded hover:bg-white/10 focus:outline-none"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted || volume === 0 ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 accent-green-500 h-1 cursor-pointer bg-gray-700 rounded-lg appearance-none focus:outline-none"
            aria-label="Volume"
          />
          {/* Captions */}
          <button
            onClick={() => setShowCaptions((c) => !c)}
            className={`p-2 rounded hover:bg-white/10 focus:outline-none ${showCaptions ? 'bg-green-500/20' : ''}`}
            aria-label={showCaptions ? 'Hide captions' : 'Show captions'}
          >
            <span className="text-xs font-bold text-white">CC</span>
          </button>
          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            className="p-2 rounded hover:bg-white/10 focus:outline-none"
            aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {fullscreen ? <Minimize2 className="h-6 w-6 text-white" /> : <Maximize2 className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
} 