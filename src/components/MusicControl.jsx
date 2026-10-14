import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioConfig } from '../data/loveWorldData';

/**
 * MusicControl — Luxury Ambient Music Controller
 * Features:
 * - Plays background music strictly after entering the passcode and entering the universe
 * - Smooth cinematic volume fade-in upon entrance
 * - Instant, responsive Mute / Play toggle with event isolation
 * - Animated musical wave indicators when active
 */
export default function MusicControl({ hasEntered = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const hasStartedRef = useRef(false);
  const resumeListenerRef = useRef(null);

  // Clean up any pending fallback click listener
  const cleanupResumeListener = useCallback(() => {
    if (resumeListenerRef.current) {
      window.removeEventListener('click', resumeListenerRef.current);
      window.removeEventListener('touchstart', resumeListenerRef.current);
      resumeListenerRef.current = null;
    }
  }, []);

  // Initialize single persistent Audio instance
  useEffect(() => {
    const audio = new Audio(audioConfig.soundtrack);
    audio.loop = true;
    audio.volume = 0.5;

    const handleCanPlay = () => setHasAudio(true);
    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setHasAudio(false);

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      cleanupResumeListener();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, [cleanupResumeListener]);

  // Smooth Volume Fade In Helper
  const fadeInAudio = useCallback((targetVolume = 0.5, durationMs = 1200) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const stepMs = 50;
    const steps = durationMs / stepMs;
    const volumeStep = targetVolume / steps;
    let currentVol = 0;
    audioRef.current.volume = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentVol = Math.min(targetVolume, currentVol + volumeStep);
      if (audioRef.current) {
        audioRef.current.volume = currentVol;
      }
      if (currentVol >= targetVolume) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, stepMs);
  }, []);

  // Trigger playback strictly ONCE when user unlocks the universe (hasEntered turns true)
  useEffect(() => {
    if (!hasEntered || !audioRef.current || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const audio = audioRef.current;
    audio.volume = 0;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasAudio(true);
          fadeInAudio(0.5, 1200);
        })
        .catch((err) => {
          console.warn('Browser policy: waiting for interaction inside world', err);
          // Fallback listener for the first click/touch inside the unlocked world
          const handleFirstInteraction = (e) => {
            // Ignore if the click was directly on the music button
            if (e.target && e.target.closest && e.target.closest('[data-music-control="true"]')) {
              return;
            }
            cleanupResumeListener();
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  setHasAudio(true);
                  fadeInAudio(0.5, 1200);
                })
                .catch(() => {});
            }
          };

          resumeListenerRef.current = handleFirstInteraction;
          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true });
        });
    }
  }, [hasEntered, fadeInAudio, cleanupResumeListener]);

  // Robust Toggle Mute / Play Handler
  const toggleMusic = useCallback(
    (e) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      cleanupResumeListener();

      if (!audioRef.current) return;
      const audio = audioRef.current;

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      if (!audio.paused) {
        // Active -> Mute / Pause immediately!
        audio.pause();
        setIsPlaying(false);
      } else {
        // Paused / Muted -> Unmute / Play immediately!
        audio.volume = 0.5;
        audio.muted = false;
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasAudio(true);
          })
          .catch(() => {
            setHasAudio(false);
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 4000);
          });
      }
    },
    [cleanupResumeListener]
  );

  // Only render the floating controller once the gate is unlocked
  if (!hasEntered) return null;

  return (
    <motion.div
      data-music-control="true"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 'var(--z-nav)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.4rem',
      }}
    >
      <AnimatePresence>
        {showTooltip && !hasAudio && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              background: 'rgba(15, 6, 26, 0.92)',
              border: '1px solid rgba(255, 224, 160, 0.4)',
              borderRadius: '12px',
              padding: '0.5rem 0.85rem',
              color: 'var(--champagne-gold)',
              fontSize: '0.74rem',
              boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
              maxWidth: '240px',
              textAlign: 'right',
            }}
          >
            Music file not found: <code style={{ color: '#FF83B8' }}>public/audio/background-music.mp3</code>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        data-music-control="true"
        onClick={toggleMusic}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        title={isPlaying ? 'Click to Mute background music' : 'Click to Play background music 🎵'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          padding: isPlaying ? '0.55rem 1.1rem' : '0.55rem 0.95rem',
          borderRadius: '999px',
          background: isPlaying
            ? 'linear-gradient(135deg, rgba(45, 16, 68, 0.92), rgba(23, 14, 46, 0.95))'
            : 'rgba(23, 14, 46, 0.92)',
          border: isPlaying ? '1.5px solid rgba(255, 131, 184, 0.65)' : '1px solid rgba(255, 224, 160, 0.4)',
          boxShadow: isPlaying
            ? '0 0 25px rgba(255, 131, 184, 0.45), 0 4px 15px rgba(0,0,0,0.5)'
            : '0 4px 15px rgba(0,0,0,0.5)',
          color: isPlaying ? 'var(--champagne-gold)' : 'rgba(255, 224, 160, 0.85)',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.25s ease',
        }}
      >
        {isPlaying ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <Music size={16} color="#FF83B8" />
            </motion.div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '14px' }}>
              {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.3, 1, 0.4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + i * 0.15,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: '2px',
                    height: '12px',
                    background: '#FFE0A0',
                    borderRadius: '2px',
                  }}
                />
              ))}
            </div>
            <Volume2 size={16} color="#FFE0A0" />
            <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#FFE0A0' }}>Mute</span>
          </>
        ) : (
          <>
            <VolumeX size={17} color="#FF83B8" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--champagne-gold)' }}>Play BGM 🎵</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
