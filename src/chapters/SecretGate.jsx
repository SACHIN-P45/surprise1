import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, Sparkles, Heart, Lock, Unlock, Flame, Crown, Star, Delete, X, Check } from 'lucide-react';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 01 — The Secret Gate of Love (Ultra-Premium Cinematic Edition)
 * An enchanting fairytale opening scene with a glowing moon, deep nebula atmosphere,
 * intricate 3D baroque gate, interactive knocking ripples, glowing heart lock,
 * secret golden key passcode modal ("1530"), and a smooth, cinematic portal transition 
 * into Samithra's Love Universe.
 */
export default function SecretGate({ onEnter }) {
  // Interaction states: 'idle' | 'unlocking' | 'opening'
  const [gateState, setGateState] = useState('idle');
  const [hoveringKey, setHoveringKey] = useState(false);
  const [knockRipples, setKnockRipples] = useState([]);
  const [knockCount, setKnockCount] = useState(0);
  const [knockFeedback, setKnockFeedback] = useState('');
  const feedbackTimeoutRef = useRef(null);

  // Golden Key Passcode Modal States (Password: 1530)
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);

  // Check reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, []);

  // Deterministic shooting stars for consistent cinematic rhythm without thrashing
  const shootingStars = useMemo(
    () => [
      { id: 1, top: '12%', left: '15%', delay: 1.5, duration: 2.2 },
      { id: 2, top: '22%', left: '52%', delay: 4.8, duration: 1.9 },
      { id: 3, top: '8%', left: '76%', delay: 7.2, duration: 2.4 },
    ],
    []
  );

  // Web Audio chime & knock sound generator (pure vanilla, zero external asset dependencies)
  const playMagicalTone = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'knock') {
        // Resonant warm brass/wood knocking tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.23);
      } else if (type === 'unlock') {
        // Celestial harp arpeggio: F5, A5, C6, E6
        const notes = [698.46, 880.0, 1046.5, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.9);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 1.0);
        });
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.26);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Open the Passcode Modal
  const handleOpenPasscode = () => {
    if (gateState !== 'idle') return;
    setPasscode('');
    setPasscodeError(false);
    setPasscodeSuccess(false);
    setShowPasscodeModal(true);
  };

  // Trigger unlocking & opening sequence (after passcode verified)
  const handleUnlockSequence = () => {
    if (gateState !== 'idle') return;
    setGateState('unlocking');
    playMagicalTone('unlock');

    // Lock turning and light beam charging
    setTimeout(() => {
      setGateState('opening');
      // Allow gate doors to swing open completely before proceeding
      setTimeout(() => {
        onEnter();
      }, 1900);
    }, 900);
  };

  // Verify Passcode ("1530")
  const verifyPasscode = (code) => {
    if (code === '1530') {
      setPasscodeSuccess(true);
      playMagicalTone('unlock');
      setTimeout(() => {
        setShowPasscodeModal(false);
        handleUnlockSequence();
      }, 700);
    } else {
      setPasscodeError(true);
      playMagicalTone('error');
      setTimeout(() => {
        setPasscode('');
        setPasscodeError(false);
      }, 850);
    }
  };

  const handleDigitInput = (digit) => {
    if (passcode.length >= 4 || passcodeSuccess) return;
    const next = passcode + digit;
    setPasscode(next);
    if (next.length === 4) {
      verifyPasscode(next);
    }
  };

  const handleBackspace = () => {
    if (passcodeSuccess) return;
    setPasscode((prev) => prev.slice(0, -1));
    setPasscodeError(false);
  };

  // Physical Keyboard Listener for Passcode Modal
  useEffect(() => {
    if (!showPasscodeModal) return;

    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigitInput(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        setShowPasscodeModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPasscodeModal, passcode, passcodeSuccess]);

  // Interactive knocking on the gate
  const handleGateClick = (e) => {
    if (gateState !== 'idle') return;
    playMagicalTone('knock');

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now() + Math.random(), x, y };
    setKnockRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setKnockRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1200);

    const nextCount = knockCount + 1;
    setKnockCount(nextCount);

    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);

    if (nextCount === 1) {
      setKnockFeedback('The golden gates echo with gentle warmth… ✨');
    } else if (nextCount === 2) {
      setKnockFeedback('Sachin’s heart flutters… the lock is glowing! 💖');
    } else {
      setKnockFeedback('The secret gates require the Golden Key Passcode to open! 🗝️');
      setTimeout(() => {
        handleOpenPasscode();
      }, 500);
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      setKnockFeedback('');
    }, 3200);
  };

  // Clean up timers
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  return (
    <section
      className="chapter-section"
      id="chapter-gate"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #1c0d33 0%, #110724 40%, #080314 75%, #030108 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(2rem, 5vh, 3.5rem) clamp(1rem, 4vw, 2.5rem) clamp(1.5rem, 4vh, 2.5rem) clamp(1rem, 4vw, 2.5rem)',
        boxSizing: 'border-box',
      }}
    >
      {/* ─── LAYER A & B: NEBULA ATMOSPHERE & BACKGROUND GLOWS ─── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          right: '15%',
          height: '55%',
          background: 'radial-gradient(ellipse at 50% 10%, rgba(124, 82, 216, 0.28) 0%, rgba(255, 131, 184, 0.16) 45%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(350px, 60vw, 750px)',
          height: 'clamp(350px, 50vh, 600px)',
          background: 'radial-gradient(circle, rgba(255, 224, 160, 0.12) 0%, rgba(109, 76, 194, 0.15) 50%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, x: -80, y: -40 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: [0, 1, 1, 0],
                    x: [0, 320],
                    y: [0, 160],
                  }
            }
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 6 + star.id * 3,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: '130px',
              height: '2px',
              background: 'linear-gradient(90deg, #FFFFFF 0%, #FFE0A0 40%, transparent 100%)',
              borderRadius: '999px',
              transform: 'rotate(24deg)',
              boxShadow: '0 0 10px rgba(255, 224, 160, 0.7)',
            }}
          />
        ))}
      </div>

      {/* ─── LAYER D: FLOATING PETALS ─── */}
      <FloatingPetals count={6} />

      {/* ─── SECTION 3: THE ETHEREAL CINEMATIC MOON ─── */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(2.5%, 4vh, 6%)',
          right: 'clamp(4%, 7vw, 12%)',
          width: 'clamp(85px, 11vw, 140px)',
          height: 'clamp(85px, 11vw, 140px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 36% 36%, #FFFDF7 0%, #FFF4D4 35%, #EED08A 70%, #B8923F 100%)',
          boxShadow:
            '0 0 35px rgba(255, 235, 170, 0.65), 0 0 85px rgba(255, 214, 140, 0.35), 0 0 160px rgba(109, 76, 194, 0.3)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {/* Soft lunar surface crater topography */}
        <div
          style={{
            position: 'absolute',
            top: '22%',
            left: '26%',
            width: '18%',
            height: '18%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(160, 125, 60, 0.25) 0%, rgba(160, 125, 60, 0.05) 80%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '40%',
            width: '24%',
            height: '24%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(160, 125, 60, 0.22) 0%, rgba(160, 125, 60, 0.05) 80%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '32%',
            left: '60%',
            width: '14%',
            height: '14%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(160, 125, 60, 0.24) 0%, rgba(160, 125, 60, 0.05) 80%)',
          }}
        />
      </div>

      {/* Fairytale Castle Horizon Silhouette */}
      <div
        style={{
          position: 'absolute',
          bottom: '14%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(420px, 75vw, 920px)',
          opacity: 0.18,
          zIndex: 1,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 900 260" width="100%">
          <defs>
            <linearGradient id="gateCastleFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CDBBFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#100a26" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="gateWindowGlow">
              <stop offset="0%" stopColor="#FFE0A0" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFE0A0" stopOpacity="0.15" />
            </radialGradient>
          </defs>
          <polygon points="120,200 145,80 170,200" fill="url(#gateCastleFill)" />
          <polygon points="250,180 275,50 300,180" fill="url(#gateCastleFill)" />
          <polygon points="420,160 450,20 480,160" fill="url(#gateCastleFill)" />
          <polygon points="600,180 625,50 650,180" fill="url(#gateCastleFill)" />
          <polygon points="730,200 755,80 780,200" fill="url(#gateCastleFill)" />
          <rect x="135" y="160" width="30" height="100" fill="#251648" />
          <rect x="245" y="140" width="60" height="120" fill="#20133e" />
          <rect x="390" y="110" width="120" height="150" fill="#2b1a54" />
          <rect x="595" y="140" width="60" height="120" fill="#20133e" />
          <rect x="745" y="160" width="30" height="100" fill="#251648" />
          <rect x="160" y="210" width="580" height="50" fill="#1b1036" />
          <circle cx="450" cy="75" r="7" fill="url(#gateWindowGlow)" />
          <rect x="445" y="130" width="10" height="22" rx="5" fill="url(#gateWindowGlow)" />
          <rect x="270" y="150" width="10" height="20" rx="5" fill="url(#gateWindowGlow)" />
          <rect x="620" y="150" width="10" height="20" rx="5" fill="url(#gateWindowGlow)" />
        </svg>
      </div>

      {/* ─── SECTION 6 & 7: CHAPTER LABEL, HEADING & SUBTITLE ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          maxWidth: '720px',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span
            className="chapter-badge"
            style={{
              background: 'rgba(28, 14, 52, 0.72)',
              border: '1.5px solid rgba(255, 224, 160, 0.45)',
              boxShadow: '0 0 24px rgba(109, 76, 194, 0.35), inset 0 0 12px rgba(255, 224, 160, 0.1)',
              color: 'var(--champagne-gold)',
              padding: '6px 20px',
              borderRadius: '999px',
              fontSize: 'clamp(0.72rem, 1vw, 0.85rem)',
              letterSpacing: '1.6px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Sparkles size={14} color="#FFE0A0" />
            The Secret Gate of Love
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.3rem, 5.2vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginTop: '0.75rem',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #FFF8F3 0%, #FFE0A0 40%, #FF83B8 85%, #FFD6E7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 28px rgba(0, 0, 0, 0.6)',
            letterSpacing: '-0.5px',
          }}
        >
          Samithra's Universe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'var(--soft-lavender)',
            maxWidth: '580px',
            lineHeight: 1.6,
            margin: '0 auto',
            opacity: 0.92,
          }}
        >
          "Beyond these gates lies a world where every single star was named with love for you."
        </motion.p>
      </div>

      {/* ─── SECTION 4: THE PHOTOREALISTIC ROYAL PALACE GATE (CENTERPIECE) ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.55 }}
        style={{
          position: 'relative',
          width: 'clamp(280px, 92vw, 460px)',
          aspectRatio: '1 / 1',
          maxWidth: '100%',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0.75rem 0',
          borderRadius: '22px',
          overflow: 'hidden',
          boxShadow: '0 25px 85px rgba(0,0,0,0.85), 0 0 50px rgba(255, 224, 160, 0.35)',
          border: '2.5px solid rgba(255, 224, 160, 0.65)',
          zIndex: 10,
          cursor: gateState === 'idle' ? 'pointer' : 'default',
        }}
        onClick={handleGateClick}
        title="Knock on the gates of love or tap the golden heart lock"
      >
        {/* Divine radiant light pouring through when gates open */}
        <AnimatePresence>
          {gateState === 'opening' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4 }}
              style={{
                position: 'absolute',
                inset: '-20%',
                background:
                  'radial-gradient(circle at 50% 60%, rgba(255, 240, 200, 1) 0%, rgba(255, 131, 184, 0.8) 40%, rgba(109, 76, 194, 0.4) 75%, transparent 100%)',
                filter: 'blur(35px)',
                zIndex: 25,
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {/* ─── REALISTIC OPEN GATE STATE (Revealed when unlocked) ─── */}
        <img
          src="/images/gate-realistic-open.jpg"
          alt="Magical Castle Wonderland - Gates Open"
          loading="eager"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />

        {/* ─── REALISTIC CLOSED GATE STATE (Dissolves/swings open when unlocked) ─── */}
        <motion.div
          animate={
            gateState === 'opening'
              ? { opacity: 0, scale: 1.06 }
              : knockCount > 0
              ? { scale: [1, 1.015, 0.99, 1] }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: gateState === 'opening' ? 1.4 : 0.35, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        >
          <img
            src="/images/gate-realistic-closed.jpg"
            alt="Royal Palace Gate - Closed"
            loading="eager"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        {/* Interactive Knock Concentric Ripple Waves */}
        {knockRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              borderRadius: '50%',
              border: '2px solid #FFE0A0',
              background: 'radial-gradient(circle, rgba(255, 224, 160, 0.5) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        ))}

        {/* ─── INTERACTIVE GOLDEN HEART LOCK OVERLAY ─── */}
        {/* Placed precisely over the antique golden heart lock in the image (top: ~61.5%, left: 50%) */}
        {gateState !== 'opening' && (
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              handleOpenPasscode();
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.94 }}
            title="Tap to enter Golden Key passcode (1530)"
            animate={
              gateState === 'unlocking'
                ? { scale: [1, 1.25, 1.15] }
                : {
                    scale: [1, 1.08, 1],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: '61.5%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFF8F3 0%, #FFE0A0 40%, #E69500 80%, #7A4200 100%)',
              border: '2.5px solid #FFF8F3',
              boxShadow: '0 0 30px rgba(255, 224, 160, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              willChange: 'transform',
              cursor: gateState === 'idle' ? 'pointer' : 'default',
            }}
          >
            {gateState === 'unlocking' ? (
              <Unlock size={24} color="#1F1002" />
            ) : (
              <Lock size={22} color="#1F1002" />
            )}
          </motion.div>
        )}

        {/* Floating instruction pill over bottom of gate */}
        {gateState === 'idle' && (
          <motion.div
            animate={{ y: [0, -4, 0], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 8, 28, 0.88)',
              border: '1.2px solid rgba(255, 224, 160, 0.65)',
              borderRadius: '20px',
              padding: '4px 14px',
              color: '#FFE0A0',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              zIndex: 10,
              pointerEvents: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
            }}
          >
            ✨ Tap Golden Heart Lock or Knock to Enter
          </motion.div>
        )}
      </motion.div>

      {/* Dynamic Knock Echo Toast Feedback */}
      <AnimatePresence>
        {knockFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            style={{
              background: 'rgba(28, 12, 48, 0.85)',
              border: '1px solid rgba(255, 224, 160, 0.4)',
              borderRadius: '999px',
              padding: '6px 20px',
              color: 'var(--champagne-gold)',
              fontSize: '0.85rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
              zIndex: 15,
              marginBottom: '0.4rem',
            }}
          >
            {knockFeedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SECTION 5, 8 & 9: ENTRANCE BUTTON & SIGNATURE CONTROLS ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.65rem',
          zIndex: 10,
          width: '100%',
          maxWidth: '520px',
        }}
      >
        <AnimatePresence>
          {gateState !== 'opening' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem',
                width: '100%',
              }}
            >
              {/* Grand Interactive Entrance Button (Opens Passcode Modal) */}
              <motion.button
                onClick={handleOpenPasscode}
                onMouseEnter={() => setHoveringKey(true)}
                onMouseLeave={() => setHoveringKey(false)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                disabled={gateState !== 'idle'}
                className="btn-primary"
                style={{
                  padding: '1.15rem 2.75rem',
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                  boxShadow:
                    '0 12px 40px rgba(109, 76, 194, 0.55), 0 0 60px rgba(255, 131, 184, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderRadius: 'var(--radius-xl)',
                  background:
                    'linear-gradient(135deg, #7C52D8 0%, #D84F88 50%, #FFD175 100%)',
                  cursor: gateState === 'idle' ? 'pointer' : 'default',
                  border: 'none',
                }}
              >
                <motion.div
                  animate={
                    gateState === 'unlocking'
                      ? { rotate: 90, scale: 1.25 }
                      : hoveringKey
                      ? { rotate: [0, -15, 15, 0] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                >
                  <KeyRound size={22} color="#0B0B20" />
                </motion.div>
                <span style={{ color: '#0B0B20', fontWeight: 800, letterSpacing: '0.04em' }}>
                  {gateState === 'unlocking' ? 'UNLOCKING YOUR UNIVERSE…' : 'TURN GOLDEN KEY & ENTER ✨'}
                </span>
              </motion.button>

              {/* Interaction Hint */}
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 248, 243, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  margin: 0,
                }}
              >
                <Sparkles size={14} color="var(--champagne-gold)" />
                Tap the Golden Key or touch the heart lock to enter
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dedicated Love Tag (Never overlaps!) */}
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)',
              color: 'var(--rose-pink)',
              opacity: 0.95,
              textShadow: '0 0 14px rgba(255, 131, 184, 0.45)',
            }}
          >
            Handcrafted with endless love by Sachin for Samithra ❤️
          </span>
        </div>
      </div>

      {/* ─── GOLDEN KEY PASSCODE MODAL ("1530") ─── */}
      <AnimatePresence>
        {showPasscodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(7, 3, 18, 0.84)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '1rem',
            }}
            onClick={() => !passcodeSuccess && setShowPasscodeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 25, opacity: 0 }}
              animate={
                passcodeError
                  ? { x: [-12, 12, -8, 8, -4, 4, 0], scale: 1, y: 0, opacity: 1 }
                  : { scale: 1, y: 0, opacity: 1 }
              }
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                maxWidth: '430px',
                width: '100%',
                background: 'linear-gradient(150deg, #220e3a 0%, #150726 55%, #090214 100%)',
                border: passcodeError
                  ? '2px solid #ff4d6d'
                  : passcodeSuccess
                  ? '2px solid #85E3B3'
                  : '1.5px solid rgba(255, 224, 160, 0.55)',
                borderRadius: '24px',
                padding: 'clamp(1.75rem, 5vw, 2.25rem) clamp(1.25rem, 4vw, 1.75rem)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.85), 0 0 60px rgba(255, 131, 184, 0.3)',
                textAlign: 'center',
                position: 'relative',
                boxSizing: 'border-box',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {!passcodeSuccess && (
                <button
                  onClick={() => setShowPasscodeModal(false)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--soft-lavender)',
                    cursor: 'pointer',
                  }}
                  title="Close"
                >
                  <X size={16} />
                </button>
              )}

              {/* Header Icon */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #FF83B8 0%, #6D4CC2 100%)',
                  border: '2px solid #FFE0A0',
                  boxShadow: '0 0 25px rgba(255, 224, 160, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                }}
              >
                <KeyRound size={30} color="#FFF8F3" />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
                  color: 'var(--warm-ivory)',
                  margin: '0 0 0.35rem 0',
                  fontWeight: 700,
                }}
              >
                Enter Golden Key Passcode
              </h3>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--soft-lavender)',
                  margin: '0 0 1rem 0',
                  opacity: 0.9,
                }}
              >
                To unlock the secret gates to Samithra's Universe
              </p>

              {/* Romantic Hint Box */}
              <div
                style={{
                  background: 'rgba(255, 224, 160, 0.12)',
                  border: '1px dashed rgba(255, 224, 160, 0.5)',
                  borderRadius: '12px',
                  padding: '9px 14px',
                  marginBottom: '1.25rem',
                  fontSize: '0.88rem',
                  color: '#FFE0A0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  lineHeight: 1.4,
                }}
              >
                <span>💡</span>
                <span>
                  <strong>Hint:</strong> Sami birthday date and sachin birthday date 💖
                </span>
              </div>

              {/* 4-Digit Boxes */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '1.25rem',
                }}
              >
                {[0, 1, 2, 3].map((index) => {
                  const digit = passcode[index];
                  const isCurrent = passcode.length === index;
                  return (
                    <motion.div
                      key={index}
                      animate={
                        digit
                          ? { scale: [1, 1.15, 1], borderColor: '#FFE0A0' }
                          : isCurrent
                          ? { borderColor: 'rgba(255, 131, 184, 0.8)' }
                          : { borderColor: 'rgba(205, 187, 255, 0.3)' }
                      }
                      style={{
                        width: '54px',
                        height: '62px',
                        borderRadius: '14px',
                        background: 'rgba(15, 6, 28, 0.85)',
                        border: '2px solid rgba(255, 224, 160, 0.35)',
                        boxShadow: digit
                          ? '0 0 16px rgba(255, 224, 160, 0.5), inset 0 0 10px rgba(255, 131, 184, 0.2)'
                          : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 700,
                        color: '#FFF8F3',
                      }}
                    >
                      {digit ? (
                        <span>{digit}</span>
                      ) : (
                        <span style={{ opacity: 0.25, fontSize: '1.2rem' }}>•</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Feedback messages */}
              <div style={{ minHeight: '24px', marginBottom: '0.75rem' }}>
                {passcodeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: '#ff6b8b', fontSize: '0.85rem', margin: 0, fontWeight: 600 }}
                  >
                    Incorrect Passcode ❤️ Check the hint: Sami's Date + Sachin's Date!
                  </motion.p>
                )}
                {passcodeSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: '#85E3B3', fontSize: '0.9rem', margin: 0, fontWeight: 700 }}
                  >
                    Passcode Verified! ✨ Unlocking the Universe…
                  </motion.p>
                )}
              </div>

              {/* On-screen Keypad */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  maxWidth: '300px',
                  margin: '0 auto',
                }}
              >
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <motion.button
                    key={num}
                    whileHover={{ scale: 1.08, background: 'rgba(255, 224, 160, 0.2)' }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleDigitInput(num)}
                    disabled={passcodeSuccess}
                    style={{
                      height: '50px',
                      borderRadius: '12px',
                      background: 'rgba(35, 16, 56, 0.7)',
                      border: '1px solid rgba(255, 224, 160, 0.3)',
                      color: 'var(--warm-ivory)',
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {num}
                  </motion.button>
                ))}

                {/* Clear button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    setPasscode('');
                    setPasscodeError(false);
                  }}
                  disabled={passcodeSuccess}
                  style={{
                    height: '50px',
                    borderRadius: '12px',
                    background: 'rgba(255, 77, 109, 0.15)',
                    border: '1px solid rgba(255, 77, 109, 0.4)',
                    color: '#ff85a1',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </motion.button>

                {/* Zero button */}
                <motion.button
                  whileHover={{ scale: 1.08, background: 'rgba(255, 224, 160, 0.2)' }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleDigitInput('0')}
                  disabled={passcodeSuccess}
                  style={{
                    height: '50px',
                    borderRadius: '12px',
                    background: 'rgba(35, 16, 56, 0.7)',
                    border: '1px solid rgba(255, 224, 160, 0.3)',
                    color: 'var(--warm-ivory)',
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  0
                </motion.button>

                {/* Backspace button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleBackspace}
                  disabled={passcodeSuccess}
                  style={{
                    height: '50px',
                    borderRadius: '12px',
                    background: 'rgba(255, 224, 160, 0.12)',
                    border: '1px solid rgba(255, 224, 160, 0.35)',
                    color: 'var(--champagne-gold)',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Backspace"
                >
                  <Delete size={20} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
