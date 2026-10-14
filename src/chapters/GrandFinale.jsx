import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  Crown, 
  Gift, 
  RefreshCw, 
  Award, 
  PartyPopper, 
  Star, 
  Camera, 
  Upload, 
  Check, 
  Volume2, 
  VolumeX, 
  X,
  MapPin,
  Maximize2,
  Printer
} from 'lucide-react';
import { grandFinale, personalDetails, chapters } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 12 — The Grand Final Climax (Masterpiece Edition)
 * Handcrafted for Sachin & Samithra:
 * - 3D Celestial Royal Gift Box with ambient aurora and orbiting stardust
 * - Royal Couple Memory Gallery with interactive portrait switcher (5 real couple portraits)
 * - Cosmic Decree & Certificate of Eternal Love with Sachin's 4 Sacred Vows & Royal Wax Seal
 * - Full-Screen Certificate Modal with Print / Keepsake support
 * - Interactive Love & Kiss Cannon with live physics-like emojis, dynamic audio fanfare & milestones
 * - Sky Fireworks & Ascending Golden Lanterns Cannon
 * - 12-Chapter Constellation Trophy of Eternal Love
 * - Sachin's Final Heartfelt Personal Closing Inscription
 */
export default function GrandFinale({ onReplay }) {
  const [revealed, setRevealed] = useState(false);
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [heartsExplosion, setHeartsExplosion] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(4); // Default to Royal Destiny (dream-05)
  const [customPhoto, setCustomPhoto] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [floatingTaps, setFloatingTaps] = useState([]);
  const [fireworks, setFireworks] = useState([]);
  const [skyLanterns, setSkyLanterns] = useState([]);
  const fileInputRef = useRef(null);

  // Sachin & Samithra's 5 Cherished Couple Portraits
  const coupleMemories = [
    {
      id: 1,
      title: 'Side by Side at Vivekanandha',
      location: 'Vivekanandha Campus • Under the Palm Trees',
      quote: 'Sitting side by side on that sunny day, my arm holding you close — I wished time would just freeze right there.',
      src: '/images/memories/dream-01.jpg',
      badge: 'Campus Memories 🌸',
      accent: '#FF83B8',
    },
    {
      id: 2,
      title: 'Golden Sunset by the Lake',
      location: 'Serene Lakefront • Golden Hour Reflection',
      quote: 'Watching the golden sun set across the water, holding your hand... I realized paradise is just being next to you.',
      src: '/images/memories/dream-02.jpg',
      badge: 'Golden Hours 🌅',
      accent: '#FFE0A0',
    },
    {
      id: 3,
      title: 'Matching Vibes & Shared Smiles',
      location: 'Our Cozy Corner • Casual Evening Together',
      quote: 'Matching in black and olive green, sharing private jokes and smiles that only the two of us understand.',
      src: '/images/memories/dream-04.jpg',
      badge: 'Matching Vibes 💫',
      accent: '#85E3B3',
    },
    {
      id: 4,
      title: 'Under the Palm Trees',
      location: 'Tropical Palm Groves • Quiet Afternoon',
      quote: 'Wrapped gently in my arms under the palm trees, feeling your heartbeat against mine in peaceful silence.',
      src: '/images/memories/dream-03.jpg',
      badge: 'Sweet Embrace ✨',
      accent: '#CDBBFF',
    },
    {
      id: 5,
      title: 'Royal Destiny in Purple & Gold',
      location: 'The Starlight Terrace • Forever Promise',
      quote: 'Dressed in royal purple and deep black, looking into your eyes and seeing my entire future right there.',
      src: '/images/memories/dream-05.jpg',
      badge: 'Royal Destiny 👑',
      accent: '#FFD700',
    },
  ];

  const currentPortrait = coupleMemories[selectedPhotoIndex];

  // Confetti particles generator
  const confetti = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: ['#FF83B8', '#FFE0A0', '#CDBBFF', '#FFD6E7', '#FF69B4', '#6D4CC2', '#FFD700', '#FFFFFF'][
          Math.floor(Math.random() * 8)
        ],
        size: Math.random() * 12 + 6,
        duration: Math.random() * 3 + 2.5,
        delay: Math.random() * 0.7,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
      })),
    []
  );

  // Synthesize grand fanfare celebratory sound via Web Audio API
  const playCelebrationFanfare = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      // Grand celebratory chords: C5, E5, G5, B5, C6 (Major 7th fanfare)
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
      });
    } catch {
      // Audio fallback
    }
  };

  const playSoftChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.65);
    } catch {
      // Audio fallback
    }
  };

  const triggerFireworksBurst = () => {
    playCelebrationFanfare();
    const burstId = Date.now();
    const newBursts = Array.from({ length: 28 }, (_, i) => ({
      id: `${burstId}-${i}`,
      angle: (i / 28) * 360,
      distance: Math.random() * 220 + 80,
      color: ['#FFE0A0', '#FF83B8', '#CDBBFF', '#FF69B4', '#85E3B3', '#FFF', '#FFD700'][Math.floor(Math.random() * 7)],
      size: Math.random() * 9 + 4,
    }));
    setFireworks((prev) => [...prev, ...newBursts]);

    // Spawn 5 floating sky lanterns
    const newLanterns = Array.from({ length: 6 }, (_, i) => ({
      id: `${burstId}-lantern-${i}`,
      left: 15 + Math.random() * 70,
      delay: i * 0.25,
      size: Math.random() * 14 + 28,
    }));
    setSkyLanterns((prev) => [...prev, ...newLanterns]);

    setTimeout(() => {
      setFireworks((prev) => prev.filter((p) => !p.id.startsWith(String(burstId))));
    }, 2000);
    setTimeout(() => {
      setSkyLanterns((prev) => prev.filter((l) => !l.id.startsWith(String(burstId))));
    }, 6000);
  };

  const triggerHearts = () => {
    setHeartsExplosion(true);
    triggerFireworksBurst();
    setTimeout(() => setHeartsExplosion(false), 5000);
  };

  const handleReveal = () => {
    if (isUnwrapping || revealed) return;
    setIsUnwrapping(true);
    playCelebrationFanfare();
    setTimeout(() => {
      setRevealed(true);
      setIsUnwrapping(false);
      triggerHearts();
    }, 900);
  };

  const handleHeartTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setLoveCount((prev) => prev + 1);
    playSoftChime();

    const newTap = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: ['💖', '💋', '✨', '🌸', '👑', '🥰', '💍', '🌹'][Math.floor(Math.random() * 8)],
    };
    setFloatingTaps((prev) => [...prev, newTap]);
    setTimeout(() => {
      setFloatingTaps((prev) => prev.filter((t) => t.id !== newTap.id));
    }, 1600);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Love milestone levels based on tap count
  const getLoveLevel = () => {
    if (loveCount < 10) return { title: 'First Sweet Smiles', next: 10, icon: '🌸' };
    if (loveCount < 25) return { title: 'Warm Forehead Kisses', next: 25, icon: '💋' };
    if (loveCount < 50) return { title: 'Endless Warm Hugs', next: 50, icon: '🤗' };
    if (loveCount < 100) return { title: 'A Lifetime Promise', next: 100, icon: '💍' };
    return { title: 'Eternal Cosmic Soulmates', next: 100, icon: '👑' };
  };

  const getLoveNote = () => {
    if (loveCount === 0) return 'Tap the heart to send Sachin your sweet love & kisses!';
    if (loveCount < 10) return `Sachin received ${loveCount} kisses! He is smiling warmly! 🥰`;
    if (loveCount < 25) return `Sachin’s heart is racing with ${loveCount} loving taps! 💓✨`;
    if (loveCount < 50) return `Overwhelmed with happiness! ${loveCount} kisses floating to Sachin! 🫂💖`;
    if (loveCount < 100) return `${loveCount} kisses sent! Sachin is promising his whole life to you! 💍✨`;
    return `Infinite love unlocked (${loveCount} kisses)! Bound for eternity across galaxies! 🌌👑`;
  };

  return (
    <section
      className="chapter-section bg-birthday-stage"
      id="chapter-finale"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 6vw, 7rem) clamp(1rem, 4vw, 2.5rem)',
        background: 'radial-gradient(ellipse at 50% 15%, #340c42 0%, #19082e 50%, #090214 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FloatingPetals count={14} />

      {/* Confetti & Hearts Rain when revealed */}
      <AnimatePresence>
        {(revealed || heartsExplosion) && (
          <div
            style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999 }}
            aria-hidden="true"
          >
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ y: -50, x: `${piece.left}vw`, opacity: 1, rotate: 0 }}
                animate={{
                  y: '110vh',
                  rotate: 720,
                  opacity: [1, 1, 0.85, 0],
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  width: piece.size,
                  height: piece.shape === 'rect' ? piece.size * 0.75 : piece.size,
                  borderRadius: piece.shape === 'circle' ? '50%' : '2px',
                  background: piece.color,
                  boxShadow: `0 0 12px ${piece.color}`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Ascending Golden Sky Lanterns */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 997 }}>
        <AnimatePresence>
          {skyLanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              initial={{ y: '105vh', x: `${lantern.left}vw`, opacity: 0, scale: 0.6 }}
              animate={{
                y: '-20vh',
                x: `${lantern.left + (Math.random() * 8 - 4)}vw`,
                opacity: [0, 1, 1, 0.8, 0],
                scale: [0.6, 1, 1, 0.9, 0.8],
              }}
              transition={{ duration: 5.5, delay: lantern.delay, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: lantern.size,
                height: lantern.size * 1.35,
                borderRadius: '8px 8px 16px 16px',
                background: 'linear-gradient(180deg, #FFE0A0 0%, #FF83B8 60%, #FF69B4 100%)',
                boxShadow: '0 0 25px rgba(255, 224, 160, 0.9), 0 0 50px rgba(255, 131, 184, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFE0A0',
                fontSize: '0.85rem',
              }}
            >
              🏮
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Interactive Fireworks Burst Canvas */}
      <div
        style={{
          position: 'fixed',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 998,
        }}
      >
        <AnimatePresence>
          {fireworks.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const targetX = Math.cos(rad) * p.distance;
            const targetY = Math.sin(rad) * p.distance;
            return (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: targetX,
                  y: targetY,
                  scale: [1, 1.4, 0],
                  opacity: [1, 0.9, 0],
                }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  background: p.color,
                  boxShadow: `0 0 12px ${p.color}, 0 0 25px ${p.color}`,
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Top Chapter Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span
          className="chapter-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(48, 14, 70, 0.85)',
            border: '1.5px solid rgba(255, 224, 160, 0.55)',
            boxShadow: '0 0 30px rgba(255, 131, 184, 0.35)',
            padding: '7px 22px',
            borderRadius: '999px',
            color: 'var(--champagne-gold)',
            fontSize: '0.85rem',
            letterSpacing: '1.4px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <Crown size={14} color="#FFE0A0" />
          The Ultimate Birthday Climax
        </span>
      </motion.div>

      {/* Atmospheric Audio & Celebration Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '1rem',
          marginBottom: '2rem',
          background: 'rgba(22, 9, 40, 0.75)',
          border: '1px solid rgba(255, 224, 160, 0.3)',
          padding: '7px 20px',
          borderRadius: '999px',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFE0A0', fontSize: '0.82rem', fontWeight: 600 }}>
          <Sparkles size={14} color="#FFE0A0" />
          <span>Birthday Climax Realm</span>
        </div>

        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.2)' }} />

        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playCelebrationFanfare();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: soundEnabled ? '#FF83B8' : 'rgba(205, 187, 255, 0.7)',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: 0,
            transition: 'color 0.2s',
          }}
          title="Toggle celebration fanfare audio"
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>{soundEnabled ? 'Fanfare: Active 🎺' : 'Fanfare: Muted'}</span>
        </button>
      </div>

      <div style={{ maxWidth: '960px', width: '100%', zIndex: 10, textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          {!revealed ? (
            /* ═══════════════════════════════════════════════════════════
               STAGE 1: THE COSMIC ROYAL GIFT BOX (PRE-REVEAL)
               ═══════════════════════════════════════════════════════════ */
            <motion.div
              key="prereveal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
              transition={{ duration: 0.7 }}
              className="glass-card-premium"
              style={{
                padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 4vw, 3rem)',
                borderRadius: '32px',
                border: '1.5px solid rgba(255, 224, 160, 0.45)',
                background: 'linear-gradient(145deg, rgba(28, 14, 52, 0.94) 0%, rgba(46, 16, 68, 0.9) 50%, rgba(20, 10, 40, 0.96) 100%)',
                boxShadow: '0 25px 90px rgba(0,0,0,0.85), 0 0 90px rgba(224, 85, 144, 0.35)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Rotating Celestial Rays Aura */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  width: '420px',
                  height: '420px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, rgba(255,224,160,0.18), rgba(255,131,184,0.12), rgba(109,76,194,0.15), rgba(255,224,160,0.18))',
                  filter: 'blur(35px)',
                  pointerEvents: 'none',
                }}
              />

              {/* 3D Handcrafted Royal Gift Box */}
              <div style={{ position: 'relative', margin: '0 auto 2.25rem auto', width: 'clamp(150px, 22vw, 180px)', height: 'clamp(150px, 22vw, 180px)' }}>
                <motion.div
                  animate={
                    isUnwrapping
                      ? { scale: [1, 1.25, 1.45], rotate: [0, 8, -8, 12], filter: 'brightness(1.6) drop-shadow(0 0 40px #FFE0A0)' }
                      : {
                          scale: [1, 1.04, 1],
                          rotate: [0, -2, 2, 0],
                        }
                  }
                  transition={isUnwrapping ? { duration: 0.7 } : { repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '26px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    border: '2.5px solid rgba(255, 224, 160, 0.9)',
                    boxShadow: '0 0 35px rgba(255, 131, 184, 0.6), 0 0 75px rgba(255, 224, 160, 0.45)',
                  }}
                  onClick={handleReveal}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src="/images/royal-gift-box.jpg"
                    alt="Royal Birthday Gift Box for Samithra"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  {/* Subtle inner gold rim highlight */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                      pointerEvents: 'none',
                    }}
                  />
                </motion.div>

                {/* Orbiting Golden Star Particles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    inset: -22,
                    pointerEvents: 'none',
                  }}
                >
                  <Star
                    size={20}
                    fill="#FFE0A0"
                    color="#FFE0A0"
                    style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
                  />
                  <Heart
                    size={18}
                    fill="#FF83B8"
                    color="#FF83B8"
                    style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
                  />
                </motion.div>
              </div>

              {/* Tap Guidance Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 16px',
                  borderRadius: '999px',
                  background: 'rgba(255, 224, 160, 0.12)',
                  border: '1px solid rgba(255, 224, 160, 0.35)',
                  color: 'var(--champagne-gold)',
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                <span>✦ Tap the Gift Box or Button to Unwrap ✦</span>
              </div>

              <h2
                className="heading-lg"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--champagne-gold)',
                  marginBottom: '1rem',
                  fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
                }}
              >
                {grandFinale.preReveal}
              </h2>

              <p
                className="body-lg"
                style={{
                  color: 'var(--warm-ivory)',
                  maxWidth: '580px',
                  margin: '0 auto 2.25rem auto',
                  lineHeight: 1.8,
                  opacity: 0.95,
                  fontSize: '1.05rem',
                }}
              >
                Every flower bloomed, every star named, and every chapter journeyed in this universe leads to this single, priceless birthday climax.
              </p>

              {/* Reveal Button */}
              <motion.button
                className="btn-primary"
                onClick={handleReveal}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1.15rem 3.4rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  background: 'linear-gradient(135deg, #FF69B4 0%, #AA3BFF 50%, #FF83B8 100%)',
                  boxShadow: '0 12px 40px rgba(224, 85, 144, 0.6), 0 0 45px rgba(255, 224, 160, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                }}
              >
                <Sparkles size={20} color="#FFE0A0" />
                <span>{isUnwrapping ? 'UNWRAPPING THE STARS... ✨' : 'OPEN FINAL BIRTHDAY SURPRISE ✨'}</span>
              </motion.button>
            </motion.div>
          ) : (
            /* ═══════════════════════════════════════════════════════════
               STAGE 2: THE GRAND CELEBRATION STAGE (CLIMAX REVEAL)
               ═══════════════════════════════════════════════════════════ */
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: 45, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="glass-card-premium"
              style={{
                padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 3.5rem)',
                borderRadius: '36px',
                border: '2px solid rgba(255, 224, 160, 0.65)',
                background: 'linear-gradient(145deg, rgba(28, 14, 52, 0.95) 0%, rgba(48, 16, 72, 0.92) 50%, rgba(20, 10, 42, 0.97) 100%)',
                boxShadow:
                  '0 30px 100px rgba(0,0,0,0.88), 0 0 120px rgba(255, 131, 184, 0.4), inset 0 0 50px rgba(255, 224, 160, 0.15)',
                position: 'relative',
              }}
            >
              {/* Ultra-Luxury 3D Royal Queen Crown Crest */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
                {/* Rotating Outer Starlight Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    inset: -14,
                    borderRadius: '50%',
                    border: '1.5px dashed rgba(255, 224, 160, 0.45)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Floating Crown Medallion */}
                <motion.div
                  animate={{
                    y: [-4, 6, -4],
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'clamp(96px, 14vw, 120px)',
                    height: 'clamp(96px, 14vw, 120px)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #2a1444 0%, #150828 75%, #0d041c 100%)',
                    border: '3px solid rgba(255, 224, 160, 0.95)',
                    boxShadow:
                      '0 0 35px rgba(255, 224, 160, 0.65), 0 0 65px rgba(255, 131, 184, 0.45), inset 0 0 25px rgba(255, 224, 160, 0.3)',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  title="Imperial Royal Crown for Queen Samithra 👑"
                >
                  {/* 3D Royal Queen Crown High-Res Image */}
                  <img
                    src="/images/royal-queen-crown.jpg"
                    alt="Imperial Royal Queen Crown for Samithra"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1.12)',
                      display: 'block',
                      filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
                    }}
                  />

                  {/* Shimmering Golden Glass Light Sheen */}
                  <motion.div
                    animate={{
                      x: ['-120%', '220%'],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5,
                      ease: 'easeInOut',
                      repeatDelay: 2,
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(105deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Inner Baroque Gold Ring Highlight */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '2px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 224, 160, 0.5)',
                      pointerEvents: 'none',
                    }}
                  />
                </motion.div>

                {/* Floating Orbit Sparkles around the Crown */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    inset: -10,
                    pointerEvents: 'none',
                  }}
                >
                  <Sparkles
                    size={16}
                    color="#FFE0A0"
                    style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
                  />
                  <Heart
                    size={13}
                    fill="#FF83B8"
                    color="#FF83B8"
                    style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)' }}
                  />
                </motion.div>
              </div>

              {/* Main Climax Birthday Title */}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FFF8F3 0%, #FFE0A0 40%, #FF83B8 80%, #FFD6E7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1.25rem',
                  lineHeight: 1.15,
                  letterSpacing: '-0.5px',
                  filter: 'drop-shadow(0 4px 20px rgba(255, 131, 184, 0.4))',
                }}
              >
                {grandFinale.mainTitle}
              </h2>

              {/* Romantic Dedication Message */}
              <p
                className="body-lg"
                style={{
                  maxWidth: '720px',
                  margin: '0 auto 2.5rem auto',
                  lineHeight: 1.9,
                  color: 'var(--warm-ivory)',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                }}
              >
                "{grandFinale.message}"
              </p>

              {/* ───────────────────────────────────────────────────────────
                  ROYAL COUPLE MEMORY GALLERY (5 REAL PORTRAITS)
                  ─────────────────────────────────────────────────────────── */}
              <div
                style={{
                  background: 'rgba(16, 7, 30, 0.8)',
                  border: '1.5px solid rgba(255, 224, 160, 0.4)',
                  borderRadius: '24px',
                  padding: 'clamp(1.2rem, 3vw, 1.8rem)',
                  maxWidth: '720px',
                  margin: '0 auto 2.5rem auto',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.65)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <Camera size={18} color="var(--rose-pink)" />
                  <span style={{ fontSize: '0.82rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--champagne-gold)', fontWeight: 700 }}>
                    Our Starlit Memory Gallery • Sachin & Samithra
                  </span>
                </div>

                {/* Main Selected Image Stage */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '2px solid rgba(255, 224, 160, 0.55)',
                    background: '#0d0418',
                    aspectRatio: '16 / 10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.7)',
                  }}
                >
                  <img
                    src={customPhoto || currentPortrait.src}
                    alt={currentPortrait.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 15%',
                      transition: 'transform 0.5s ease',
                    }}
                  />

                  {/* Gradient Overlay for Subtitle */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 55%, rgba(10, 4, 20, 0.88) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Caption & Location on image bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.9rem',
                      left: '1rem',
                      right: '1rem',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      pointerEvents: 'none',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: currentPortrait.accent,
                          background: 'rgba(0,0,0,0.65)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginBottom: '0.35rem',
                          border: '1px solid rgba(255,224,160,0.3)',
                        }}
                      >
                        <MapPin size={11} /> {currentPortrait.location}
                      </span>
                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                          color: '#FFFFFF',
                          margin: 0,
                          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                        }}
                      >
                        {currentPortrait.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        pointerEvents: 'auto',
                        background: 'rgba(20, 8, 35, 0.85)',
                        border: '1px solid rgba(255, 224, 160, 0.45)',
                        borderRadius: '999px',
                        padding: '6px 14px',
                        color: 'var(--champagne-gold)',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                      }}
                      title="Upload your favorite memory photo"
                    >
                      <Upload size={12} />
                      <span>{customPhoto ? 'Change Custom' : 'Upload Local 📸'}</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* Selected Portrait Quote */}
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'rgba(255, 248, 243, 0.9)',
                    fontStyle: 'italic',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    lineHeight: 1.6,
                  }}
                >
                  “{currentPortrait.quote}”
                </p>

                {/* 5 Portrait Switcher Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {coupleMemories.map((m, idx) => {
                    const isSelected = selectedPhotoIndex === idx && !customPhoto;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setCustomPhoto(null);
                          setSelectedPhotoIndex(idx);
                        }}
                        style={{
                          background: isSelected
                            ? 'linear-gradient(135deg, #FFE0A0 0%, #FF83B8 100%)'
                            : 'rgba(255, 224, 160, 0.08)',
                          color: isSelected ? '#0B0B20' : 'var(--warm-ivory)',
                          border: isSelected
                            ? '1px solid #FFE0A0'
                            : '1px solid rgba(255, 224, 160, 0.25)',
                          borderRadius: '999px',
                          padding: '0.35rem 0.85rem',
                          fontSize: '0.75rem',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 0 15px rgba(255, 131, 184, 0.4)' : 'none',
                        }}
                      >
                        {m.badge}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ───────────────────────────────────────────────────────────
                  ROYAL COSMIC CERTIFICATE OF ETERNAL LOVE & SACRED VOWS
                  ─────────────────────────────────────────────────────────── */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                style={{
                  background: 'linear-gradient(145deg, rgba(28, 12, 42, 0.9) 0%, rgba(14, 5, 24, 0.95) 100%)',
                  border: '2px solid rgba(255, 224, 160, 0.6)',
                  borderRadius: '24px',
                  padding: 'clamp(1.75rem, 4vw, 3rem)',
                  maxWidth: '720px',
                  margin: '0 auto 2.5rem auto',
                  position: 'relative',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.7), inset 0 0 30px rgba(255, 224, 160, 0.1)',
                }}
              >
                {/* Filigree Corner Accents */}
                <div style={{ position: 'absolute', top: 12, left: 12, width: 26, height: 26, borderTop: '2px solid #FFE0A0', borderLeft: '2px solid #FFE0A0' }} />
                <div style={{ position: 'absolute', top: 12, right: 12, width: 26, height: 26, borderTop: '2px solid #FFE0A0', borderRight: '2px solid #FFE0A0' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12, width: 26, height: 26, borderBottom: '2px solid #FFE0A0', borderLeft: '2px solid #FFE0A0' }} />
                <div style={{ position: 'absolute', bottom: 12, right: 12, width: 26, height: 26, borderBottom: '2px solid #FFE0A0', borderRight: '2px solid #FFE0A0' }} />

                {/* Certificate Ribbon Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.65rem' }}>
                  <Award size={22} color="var(--champagne-gold)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: 'var(--champagne-gold)',
                      fontWeight: 700,
                    }}
                  >
                    Cosmic Decree & Certificate of Love
                  </span>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#FFE0A0', opacity: 0.8, letterSpacing: '1px', marginBottom: '0.5rem' }}>
                  REGISTRY № COSMIC-1530-ETERNAL-LOVE
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: 'var(--warm-ivory)',
                    margin: '0.35rem 0',
                    fontWeight: 700,
                  }}
                >
                  Conferred Upon Queen Samithra 👑
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.35rem',
                    color: 'var(--rose-pink)',
                    margin: '0.25rem 0 1.25rem 0',
                  }}
                >
                  Chellakutty • Thangoo • Ammu • Pondati • My Whole World
                </p>

                {/* Sachin's 4 Sacred Birthday Vows */}
                <div
                  style={{
                    background: 'rgba(10, 4, 18, 0.55)',
                    border: '1px solid rgba(255, 224, 160, 0.25)',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    marginBottom: '1.5rem',
                    fontSize: '0.88rem',
                    color: 'var(--warm-ivory)',
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ color: '#FFE0A0', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.6rem', textAlign: 'center' }}>
                    ✦ Sachin's Sacred Lifetime Promises ✦
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div>🌸 <strong>Safe Haven:</strong> To always be your safest place, your greatest comfort, and the one you can share anything with.</div>
                    <div>💫 <strong>Endless Smiles:</strong> To listen to your late-night thoughts and turn every heavy day into gentle laughter.</div>
                    <div>💖 <strong>Deepening Love:</strong> To love you more passionately, patiently, and deeply with every passing sunrise.</div>
                    <div>👑 <strong>Building Tomorrow:</strong> To stand by your side through every season of life and build our dream universe together.</div>
                  </div>
                </div>

                {/* Official Certificate Seal & Signature */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    borderTop: '1px dashed rgba(255, 224, 160, 0.35)',
                    paddingTop: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      style={{
                        position: 'relative',
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 224, 160, 0.95)',
                        boxShadow: '0 0 22px rgba(255, 131, 184, 0.65), 0 0 35px rgba(255, 224, 160, 0.4)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      title="Sacred Royal S ❤️ S Seal of Destiny"
                    >
                      <img
                        src="/images/royal-wax-seal.jpg"
                        alt="Royal S ❤️ S Wax Seal"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {/* Subtle gold sheen overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </motion.div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#FFE0A0', fontWeight: 800, letterSpacing: '0.8px' }}>
                        SACRED S ❤️ S SEAL OF DESTINY
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(205, 187, 255, 0.85)' }}>
                        Registered 15 & 30 • Sealed Forever for Samithra
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(205, 187, 255, 0.8)', fontStyle: 'italic' }}>
                      Proclaimed by:
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-script)',
                        fontSize: '1.8rem',
                        color: 'var(--rose-pink)',
                        lineHeight: 1.1,
                      }}
                    >
                      Sachin ❤️
                    </div>
                  </div>
                </div>

                {/* View Full Screen Modal Button */}
                <div style={{ marginTop: '1.25rem' }}>
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    style={{
                      background: 'rgba(255, 224, 160, 0.12)',
                      border: '1px solid rgba(255, 224, 160, 0.4)',
                      borderRadius: '999px',
                      padding: '0.45rem 1.25rem',
                      color: 'var(--champagne-gold)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.25s',
                    }}
                  >
                    <Maximize2 size={13} />
                    <span>View Full-Screen Decree & Save 📜</span>
                  </button>
                </div>
              </motion.div>

              {/* ───────────────────────────────────────────────────────────
                  INTERACTIVE LOVE COUNTER / "SEND ENDLESS KISSES"
                  ─────────────────────────────────────────────────────────── */}
              <div
                style={{
                  background: 'rgba(15, 6, 26, 0.75)',
                  border: '1.5px solid rgba(255, 131, 184, 0.4)',
                  borderRadius: '24px',
                  padding: '1.75rem',
                  maxWidth: '600px',
                  margin: '0 auto 2.5rem auto',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.35rem' }}>
                  <Heart size={16} color="#FF83B8" fill="#FF83B8" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--champagne-gold)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Sachin's Live Love & Kiss Meter 💓
                  </span>
                  <Heart size={16} color="#FF83B8" fill="#FF83B8" />
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--warm-ivory)', marginBottom: '1rem', lineHeight: 1.6 }}>
                  {getLoveNote()}
                </p>

                {/* Milestone Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.25rem 0.9rem',
                    borderRadius: '999px',
                    background: 'rgba(255, 131, 184, 0.15)',
                    border: '1px solid rgba(255, 131, 184, 0.35)',
                    fontSize: '0.76rem',
                    color: '#FF83B8',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span>{getLoveLevel().icon}</span>
                  <span>Current Milestone: <strong>{getLoveLevel().title}</strong></span>
                </div>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <motion.button
                    whileHover={{ scale: 1.14 }}
                    whileTap={{ scale: 0.88 }}
                    onClick={handleHeartTap}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 30%, #ff6aa4 0%, #e0246a 60%, #99093e 100%)',
                      border: '3.5px solid #FFE0A0',
                      boxShadow: '0 10px 35px rgba(224, 36, 106, 0.7), inset 0 0 18px rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#FFF',
                    }}
                  >
                    <Heart size={44} fill="#FFF" />
                  </motion.button>

                  {/* Tap float particles */}
                  {floatingTaps.map((t) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 1, scale: 0.8, x: t.x - 45, y: t.y - 45 }}
                      animate={{ opacity: 0, scale: 2.2, y: t.y - 140, x: t.x - 45 + (Math.random() * 50 - 25) }}
                      transition={{ duration: 1.3, ease: 'easeOut' }}
                      style={{ position: 'absolute', pointerEvents: 'none', fontSize: '2rem', zIndex: 100 }}
                    >
                      {t.emoji}
                    </motion.div>
                  ))}
                </div>

                <div style={{ marginTop: '0.9rem', fontSize: '0.85rem', color: 'rgba(205, 187, 255, 0.85)' }}>
                  Total Kisses & Hugs Sent: <strong style={{ color: '#FF83B8', fontSize: '1.1rem' }}>{loveCount}</strong>
                </div>
              </div>



              {/* ───────────────────────────────────────────────────────────
                  GRAND ACTION CONTROLS (FIREWORKS & REPLAY)
                  ─────────────────────────────────────────────────────────── */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '1.5rem',
                }}
              >
                <motion.button
                  className="btn-primary"
                  onClick={triggerHearts}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '1rem 2.4rem',
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #FF69B4 0%, #AA3BFF 50%, #FF83B8 100%)',
                    boxShadow: '0 8px 32px rgba(255, 131, 184, 0.45)',
                  }}
                >
                  <PartyPopper size={18} color="#FFE0A0" />
                  <span>Launch Sky Fireworks & Lanterns 🎆</span>
                </motion.button>

                <motion.button
                  className="btn-secondary"
                  onClick={onReplay}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2.4rem',
                    fontSize: '1.02rem',
                    background: 'rgba(255, 224, 160, 0.12)',
                    border: '1px solid rgba(255, 224, 160, 0.4)',
                    color: 'var(--champagne-gold)',
                  }}
                >
                  <RefreshCw size={17} />
                  <span>Explore Our Universe Again ✨</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ───────────────────────────────────────────────────────────
          FULL-SCREEN OFFICIAL CERTIFICATE MODAL
          ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showCertificateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(8, 2, 16, 0.92)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setShowCertificateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '680px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'linear-gradient(145deg, #1f0b2f 0%, #10041a 100%)',
                border: '3px solid #FFE0A0',
                borderRadius: '28px',
                padding: 'clamp(2rem, 5vw, 3rem)',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 25px 90px rgba(0,0,0,0.9), 0 0 60px rgba(255, 224, 160, 0.3)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCertificateModal(false)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 224, 160, 0.4)',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFE0A0',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              <Crown size={48} color="#FFE0A0" style={{ marginBottom: '0.75rem' }} />
              
              <div style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#FFE0A0', fontWeight: 700, marginBottom: '0.25rem' }}>
                Supreme Cosmic Registry of Eternal Love
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFF', margin: '0.5rem 0' }}>
                Queen Samithra 👑
              </h2>

              <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: '#FF83B8', margin: '0.25rem 0 1.25rem 0' }}>
                Chellakutty • Thangoo • Ammu • Pondati • My Whole World
              </p>

              <p style={{ fontSize: '0.92rem', color: 'rgba(255, 248, 243, 0.9)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                This celestial decree certifies that Samithra reigns supreme over every heartbeat, thought, and dream of Sachin. 
                Bound across galaxies, beyond distance, and through all lifetimes.
              </p>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 224, 160, 0.3)',
                  borderRadius: '16px',
                  padding: '1.2rem',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  lineHeight: 1.7,
                  color: 'var(--warm-ivory)',
                  marginBottom: '1.75rem',
                }}
              >
                <div>🌸 <strong>Sacred Promise 1:</strong> Always your safe haven and warmest shelter.</div>
                <div>💫 <strong>Sacred Promise 2:</strong> Turning all hard days into smiles and laughter.</div>
                <div>💖 <strong>Sacred Promise 3:</strong> Loving you unconditionally with every passing dawn.</div>
                <div>👑 <strong>Sacred Promise 4:</strong> Building our beautiful destiny, together.</div>
              </div>

              {/* Official Seal with 3D Wax Seal Image */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,224,160,0.4)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 224, 160, 0.95)',
                      boxShadow: '0 0 20px rgba(255, 131, 184, 0.65)',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="/images/royal-wax-seal.jpg"
                      alt="Royal S ❤️ S Wax Seal"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#FFE0A0', fontWeight: 800, letterSpacing: '0.8px' }}>
                      ROYAL S ❤️ S DESTINY SEAL
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(205,187,255,0.8)' }}>
                      Cosmic Decree Registry № 1530 • Forever Bound
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(205,187,255,0.7)' }}>Forever Sealed by:</div>
                  <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.7rem', color: '#FF83B8' }}>
                    Sachin ❤️
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    background: 'linear-gradient(135deg, #FFE0A0, #FF83B8)',
                    color: '#0B0B20',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.65rem 1.6rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Printer size={15} />
                  <span>Print / Save Keepsake</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Tagline */}
      <div
        style={{
          marginTop: 'var(--space-2xl)',
          textAlign: 'center',
          color: 'rgba(255, 248, 243, 0.5)',
          fontSize: '0.85rem',
          zIndex: 10,
        }}
      >
        <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--rose-pink)', marginBottom: '0.35rem' }}>
          {personalDetails.siteSubtitle}
        </p>
        <p style={{ fontSize: '0.8rem', color: 'rgba(205, 187, 255, 0.75)' }}>
          Handcrafted with infinite love by <strong>Sachin</strong> for <strong>Samithra</strong> • A Universe of Memories
        </p>
      </div>
    </section>
  );
}
