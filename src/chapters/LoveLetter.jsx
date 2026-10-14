import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Feather, 
  Flame, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Send, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Scroll, 
  Star, 
  RefreshCw, 
  ArrowDown,
  Crown 
} from 'lucide-react';
import { sachinLetter, personalDetails } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 11 — A Letter from Sachin
 * Heartfelt romantic letter sealed with royal wax seal and luxury interactive experience
 */
export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Interactive Reaction state
  const [reactionToast, setReactionToast] = useState(null);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Secret Reply state
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  // Load existing reply if saved in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('samithra_love_reply');
      if (saved) {
        setReplyText(saved);
        setReplySent(true);
      }
    } catch {
      // ignore in sandboxed environments
    }
  }, []);

  // Web Audio romantic chime synthesizer
  const playRomanticChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      // Romantic F-major9 arpeggio: F4, A4, C5, E5, G5
      const notes = [349.23, 440.0, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.16);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.16 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.16 + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.16);
        osc.stop(ctx.currentTime + idx * 0.16 + 1.5);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleOpenLetter = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    playRomanticChime();
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 700);
  };

  const handleCopyLetter = () => {
    const fullText = `${sachinLetter.greeting}\n\n${sachinLetter.paragraphs.join('\n\n')}\n\n${sachinLetter.closing}\n${sachinLetter.signature}`;
    navigator.clipboard?.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const triggerReaction = (type, emoji, label, responseMsg) => {
    playRomanticChime();
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 30,
      y: 50 + Math.random() * 20,
      emoji: emoji,
      size: Math.random() * 16 + 18,
    }));
    setFloatingHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 2500);

    setReactionToast({ emoji, label, responseMsg });
    setTimeout(() => setReactionToast(null), 4500);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    playRomanticChime();
    setReplySent(true);
    try {
      localStorage.setItem('samithra_love_reply', replyText.trim());
    } catch {}
    setReactionToast({
      emoji: '💌',
      label: 'Reply Sealed',
      responseMsg: 'Your loving words are sealed safely in Sachin’s heart forever! 🔒💖',
    });
    setTimeout(() => setReactionToast(null), 4500);
  };

  const scrollToFinale = () => {
    const el = document.getElementById('chapter-finale');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="chapter-section"
      id="chapter-letter"
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 25%, #230b35 0%, #150624 50%, #090214 100%)',
        overflow: 'hidden',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FloatingPetals count={10} />

      {/* Floating Reaction Hearts / Sparkles Layer */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
        <AnimatePresence>
          {floatingHearts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, scale: 0.6, x: `${item.x}vw`, y: `${item.y}vh` }}
              animate={{
                opacity: 0,
                scale: 1.6,
                y: `${item.y - 35}vh`,
                x: `${item.x + (Math.random() * 20 - 10)}vw`,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              style={{ position: 'absolute', fontSize: item.size }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Atmospheric Candle Desk Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 200, 120, 0.15) 0%, rgba(224, 85, 144, 0.08) 50%, transparent 80%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '6%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109, 76, 194, 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Chapter Badge */}
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
            background: 'rgba(35, 16, 56, 0.75)',
            border: '1px solid rgba(255, 224, 160, 0.4)',
            boxShadow: '0 0 20px rgba(255, 131, 184, 0.25)',
            padding: '6px 18px',
            borderRadius: '999px',
            color: 'var(--champagne-gold)',
            fontSize: '0.85rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          <Feather size={14} color="#FFE0A0" />
          Chapter 11 — A Letter from Sachin
        </span>
      </motion.div>

      {/* Main Title & Subtitle */}
      <motion.h2
        className="heading-lg"
        style={{
          textAlign: 'center',
          marginTop: '1rem',
          marginBottom: '0.75rem',
          background: 'linear-gradient(135deg, #FFF8F3 0%, #FFE0A0 45%, #FF83B8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.5px',
        }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        Words Written Just for You
      </motion.h2>

      <motion.p
        className="body-lg"
        style={{
          textAlign: 'center',
          maxWidth: '620px',
          color: 'var(--soft-lavender)',
          opacity: 0.9,
          lineHeight: 1.6,
          marginBottom: '1.75rem',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: true }}
      >
        A handwritten royal parchment crafted under candlelit starlight with every beat of Sachin's heart.
      </motion.p>

      {/* Atmospheric Audio Chime & Candle Indicator Bar */}
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          background: 'rgba(23, 11, 40, 0.6)',
          border: '1px solid rgba(255, 224, 160, 0.25)',
          padding: '6px 16px',
          borderRadius: '999px',
          backdropFilter: 'blur(12px)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFE0A0', fontSize: '0.82rem' }}>
          <motion.div
            animate={{ scale: [1, 1.25, 0.95, 1], opacity: [0.8, 1, 0.85, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <Flame size={15} color="#FFB347" fill="#FFB347" />
          </motion.div>
          <span>Candlelit Sanctuary</span>
        </div>

        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.2)' }} />

        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playRomanticChime();
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
          title="Toggle soft love melody chime"
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>{soundEnabled ? 'Melody: On 🎶' : 'Melody: Muted'}</span>
        </button>
      </motion.div>

      {/* Toast Notification for Reactions & Actions */}
      <AnimatePresence>
        {reactionToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: '4.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: 'linear-gradient(135deg, rgba(45, 12, 58, 0.95), rgba(20, 7, 35, 0.95))',
              border: '1px solid rgba(255, 131, 184, 0.6)',
              borderRadius: '999px',
              padding: '8px 24px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 25px rgba(255,131,184,0.4)',
              color: 'var(--warm-ivory)',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backdropFilter: 'blur(16px)',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{reactionToast.emoji}</span>
            <span>{reactionToast.responseMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central Interactive Letter Area */}
      <div style={{ maxWidth: '820px', width: '100%', position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ═══════════════════════════════════════════════════════════
               STAGE 1: THE ROYAL SEALED ENVELOPE (PRE-REVEAL)
               ═══════════════════════════════════════════════════════════ */
            <motion.div
              key="envelope-sealed"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'relative',
                background: 'linear-gradient(145deg, #1f0b2f 0%, #150722 60%, #0d0317 100%)',
                border: '1.5px solid rgba(255, 224, 160, 0.35)',
                borderRadius: '24px',
                padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(224, 85, 144, 0.2)',
                textAlign: 'center',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={handleOpenLetter}
              whileHover={{ y: -4, boxShadow: '0 30px 90px rgba(0,0,0,0.8), 0 0 70px rgba(255, 131, 184, 0.3)' }}
            >
              {/* Envelope Flap Fold Line Graphics */}
              <svg
                viewBox="0 0 800 520"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  opacity: 0.35,
                }}
              >
                {/* Triangular Top Flap Fold */}
                <path
                  d="M 0 0 L 400 220 L 800 0 Z"
                  fill="rgba(255, 224, 160, 0.04)"
                  stroke="rgba(255, 224, 160, 0.35)"
                  strokeWidth="2"
                />
                {/* Diagonal Bottom Envelope Folds */}
                <path
                  d="M 0 520 L 400 270 L 800 520 Z"
                  fill="none"
                  stroke="rgba(255, 224, 160, 0.12)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Ornate Gold Filigree Corners */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  width: 36,
                  height: 36,
                  borderTop: '2px solid rgba(255, 224, 160, 0.6)',
                  borderLeft: '2px solid rgba(255, 224, 160, 0.6)',
                  borderRadius: '6px 0 0 0',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 36,
                  height: 36,
                  borderTop: '2px solid rgba(255, 224, 160, 0.6)',
                  borderRight: '2px solid rgba(255, 224, 160, 0.6)',
                  borderRadius: '0 6px 0 0',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 14,
                  width: 36,
                  height: 36,
                  borderBottom: '2px solid rgba(255, 224, 160, 0.6)',
                  borderLeft: '2px solid rgba(255, 224, 160, 0.6)',
                  borderRadius: '0 0 0 6px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  right: 14,
                  width: 36,
                  height: 36,
                  borderBottom: '2px solid rgba(255, 224, 160, 0.6)',
                  borderRight: '2px solid rgba(255, 224, 160, 0.6)',
                  borderRadius: '0 0 6px 0',
                }}
              />

              {/* Royal Postal Ribbon / Star Stamp (Positioned neatly across top) */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 224, 160, 0.08)',
                  border: '1px dashed rgba(255, 224, 160, 0.4)',
                  padding: '5px 18px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  color: 'var(--champagne-gold)',
                  letterSpacing: '1.5px',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <Star size={12} fill="#FFE0A0" color="#FFE0A0" />
                Special Birthday Royal Dispatch • Confidential
                <Star size={12} fill="#FFE0A0" color="#FFE0A0" />
              </div>

              {/* ─────────────────────────────────────────────────────────
                  CENTRAL EMBOSSED 3D S ❤️ S WAX SEAL (EXACT ENVELOPE OPENING CENTER)
                  ───────────────────────────────────────────────────────── */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '0.75rem auto 1.5rem auto',
                }}
              >
                {/* Dangling Silk Ribbon Tails beneath seal */}
                <div style={{ position: 'relative', width: 0, height: 0 }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      left: '-26px',
                      width: '18px',
                      height: '54px',
                      background: 'linear-gradient(180deg, #990033 0%, #54001a 100%)',
                      transform: 'rotate(-20deg)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.65)',
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      left: '8px',
                      width: '18px',
                      height: '54px',
                      background: 'linear-gradient(180deg, #bf0940 0%, #660320 100%)',
                      transform: 'rotate(20deg)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.65)',
                      zIndex: 1,
                    }}
                  />
                </div>

                {/* 3D Wax Seal Button with Photo-realistic S ❤️ S Crown Stamp */}
                <motion.div
                  animate={
                    isOpening
                      ? { scale: [1, 1.3, 1.6], rotate: [0, 8, -8, 15], filter: 'brightness(1.8)' }
                      : { scale: [1, 1.05, 1] }
                  }
                  transition={isOpening ? { duration: 0.65 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleOpenLetter}
                  style={{
                    width: 'clamp(115px, 20vw, 135px)',
                    height: 'clamp(115px, 20vw, 135px)',
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 2,
                    cursor: 'pointer',
                    boxShadow: '0 0 35px rgba(224, 85, 144, 0.75), 0 0 75px rgba(255, 224, 160, 0.5), 0 18px 45px rgba(0,0,0,0.9)',
                    border: '2.5px solid rgba(255, 224, 160, 0.95)',
                    overflow: 'hidden',
                  }}
                  title="Click to break wax seal and unroll royal scroll"
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

                  {/* Golden Sparkle Glow when opening */}
                  {isOpening && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #FFE0A0 0%, transparent 70%)',
                      }}
                    />
                  )}
                </motion.div>

                {/* Tap Prompt Badge */}
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
                    fontSize: '0.74rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginTop: '0.9rem',
                    zIndex: 3,
                  }}
                >
                  <Sparkles size={11} color="#FFE0A0" />
                  <span>Tap Wax Seal to Break & Unroll 📜</span>
                  <Sparkles size={11} color="#FFE0A0" />
                </div>
              </div>

              {/* Envelope Addressing Plaque */}
              <div
                style={{
                  maxWidth: '460px',
                  margin: '0 auto 1.5rem auto',
                  background: 'rgba(10, 4, 18, 0.5)',
                  border: '1px solid rgba(255, 224, 160, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 224, 160, 0.7)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: 4,
                  }}
                >
                  Deliver by Hand To:
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.3rem, 2.8vw, 1.85rem)',
                    color: 'var(--warm-ivory)',
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  My Samithra 👑
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.25rem',
                    color: 'var(--rose-pink)',
                    lineHeight: 1.2,
                  }}
                >
                  Chellakutty • Thangoo • Ammu • Pondati
                </p>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(205, 187, 255, 0.7)',
                    marginTop: 8,
                    borderTop: '1px dashed rgba(255,255,255,0.1)',
                    paddingTop: 6,
                  }}
                >
                  From: <strong>Sachin</strong>, with every breath & promise ✍️
                </div>
              </div>

              {/* Call to Action Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 2 }}>
                <button
                  className="btn-primary"
                  onClick={handleOpenLetter}
                  style={{
                    fontSize: '1rem',
                    padding: '0.9rem 2.5rem',
                    boxShadow: '0 10px 30px rgba(224, 85, 144, 0.4), 0 0 25px rgba(255, 224, 160, 0.3)',
                  }}
                >
                  <span>{isOpening ? 'BREAKING WAX SEAL... ✨' : 'BREAK WAX SEAL & UNROLL ROYAL SCROLL 📜'}</span>
                </button>
                <span style={{ fontSize: '0.82rem', color: 'rgba(205, 187, 255, 0.65)' }}>
                  Tap directly on the wax seal or button to unroll Sachin's handwritten scroll
                </span>
              </div>
            </motion.div>
          ) : (
            /* ═══════════════════════════════════════════════════════════
               STAGE 2: THE REALISTIC ANCIENT ROYAL PARCHMENT SCROLL
               ═══════════════════════════════════════════════════════════ */
            <motion.div
              key="letter-scroll"
              initial={{ opacity: 0, y: 35, scaleY: 0.88, originY: 0 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.88, originY: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                maxWidth: '820px',
                margin: '0 auto',
                filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.85)) drop-shadow(0 0 45px rgba(212, 175, 55, 0.25))',
              }}
            >
              {/* ─────────────────────────────────────────────────────────
                  TOP 3D MAHOGANY & GOLD SCROLL ROLLER
                  ───────────────────────────────────────────────────────── */}
              <div style={{ position: 'relative', width: 'calc(100% + 36px)', left: '-18px', zIndex: 12, marginBottom: '-6px' }}>
                {/* The Wood & Gold Roller Bar */}
                <div
                  style={{
                    height: '36px',
                    borderRadius: '18px',
                    background: 'linear-gradient(180deg, #3d1404 0%, #7a320c 25%, #a84c19 50%, #7a320c 75%, #2a0c02 100%)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.7)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1.5px solid rgba(255, 224, 160, 0.65)',
                  }}
                >
                  {/* Left Gold Finial Knob */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-16px',
                      width: '32px',
                      height: '46px',
                      borderRadius: '50% 12% 12% 50%',
                      background: 'radial-gradient(ellipse at 35% 30%, #FFF2D1 0%, #E6C262 45%, #996515 80%, #4a2802 100%)',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.8)',
                      border: '2px solid #FFE0A0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ width: '8px', height: '16px', borderRadius: '4px', background: '#5c3a09', opacity: 0.55 }} />
                  </div>

                  {/* Center Crown Emblem on Roller */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '3px 18px',
                      background: 'linear-gradient(180deg, #FFE8B5 0%, #D4AF37 50%, #996515 100%)',
                      borderRadius: '8px',
                      boxShadow: '0 0 14px rgba(255, 224, 160, 0.65)',
                      border: '1px solid #FFE0A0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Crown size={14} color="#3d1404" />
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#3d1404', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                      ROYAL SCROLL
                    </span>
                  </div>

                  {/* Right Gold Finial Knob */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-16px',
                      width: '32px',
                      height: '46px',
                      borderRadius: '12% 50% 50% 12%',
                      background: 'radial-gradient(ellipse at 35% 30%, #FFF2D1 0%, #E6C262 45%, #996515 80%, #4a2802 100%)',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.8)',
                      border: '2px solid #FFE0A0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ width: '8px', height: '16px', borderRadius: '4px', background: '#5c3a09', opacity: 0.55 }} />
                  </div>
                </div>

                {/* Curled Paper Wrap Under Top Roller */}
                <div
                  style={{
                    height: '16px',
                    margin: '0 18px',
                    background: 'linear-gradient(180deg, #b88d53 0%, #dfbf8d 40%, #fbf3e0 100%)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
                    borderLeft: '2.5px solid #8b5a2b',
                    borderRight: '2.5px solid #8b5a2b',
                  }}
                />
              </div>

              {/* ─────────────────────────────────────────────────────────
                  MAIN ANCIENT PARCHMENT PAPER CANVAS
                  ───────────────────────────────────────────────────────── */}
              <div
                style={{
                  position: 'relative',
                  background: 'linear-gradient(180deg, #f7eed7 0%, #fbf3e0 15%, #fdf8eb 45%, #fbf2dc 75%, #f5e7c8 95%, #ebd8b2 100%)',
                  boxShadow: 'inset 0 0 60px rgba(139, 90, 43, 0.32), inset 0 0 120px rgba(90, 50, 15, 0.22)',
                  borderLeft: '3px solid #b8860b',
                  borderRight: '3px solid #b8860b',
                  padding: 'clamp(2.5rem, 6vw, 4.25rem) clamp(1.75rem, 5vw, 3.5rem)',
                  color: '#2c1508',
                  overflow: 'hidden',
                }}
              >
                {/* Vintage Deckled Paper Inner Gold Border */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '14px',
                    border: '1.5px solid rgba(184, 134, 11, 0.45)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '18px',
                    border: '1px dashed rgba(184, 134, 11, 0.3)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Ornate Gold Filigree Corners */}
                <div
                  style={{
                    position: 'absolute',
                    top: 22,
                    left: 22,
                    width: 34,
                    height: 34,
                    borderTop: '3px double #b8860b',
                    borderLeft: '3px double #b8860b',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 22,
                    right: 22,
                    width: 34,
                    height: 34,
                    borderTop: '3px double #b8860b',
                    borderRight: '3px double #b8860b',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 22,
                    left: 22,
                    width: 34,
                    height: 34,
                    borderBottom: '3px double #b8860b',
                    borderLeft: '3px double #b8860b',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 22,
                    right: 22,
                    width: 34,
                    height: 34,
                    borderBottom: '3px double #b8860b',
                    borderRight: '3px double #b8860b',
                  }}
                />

                {/* Watermark Monogram embedded into parchment fibers */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '48%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(6rem, 16vw, 11rem)',
                    fontWeight: 900,
                    color: 'rgba(139, 90, 43, 0.045)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    letterSpacing: '12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  S ❤️ S
                </div>

                {/* Top Reading Toolbar: Royal Decree Badge + Keepsake Copy & Re-Seal */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    paddingBottom: '1.25rem',
                    marginBottom: '2rem',
                    borderBottom: '1.5px solid rgba(184, 134, 11, 0.35)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Royal Scroll Status Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(139, 90, 43, 0.1)',
                      borderRadius: '999px',
                      padding: '6px 16px',
                      border: '1.5px solid rgba(184, 134, 11, 0.45)',
                      boxShadow: '0 2px 10px rgba(139, 90, 43, 0.1)',
                    }}
                  >
                    <Scroll size={15} color="#8b5a2b" />
                    <span style={{ fontSize: '0.82rem', color: '#5c3214', fontWeight: 700, letterSpacing: '0.04em' }}>
                      📜 Sacred Handwritten Royal Decree
                    </span>
                  </div>

                  {/* Action Buttons: Copy as Keepsake + Re-Seal Letter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleCopyLetter}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(139, 90, 43, 0.12)',
                        border: '1px solid rgba(184, 134, 11, 0.45)',
                        color: copied ? '#0e6938' : '#4a220a',
                        borderRadius: '999px',
                        padding: '6px 16px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      title="Copy Sachin's letter as a personal keepsake"
                    >
                      {copied ? <Check size={13} color="#0e6938" /> : <Copy size={13} color="#4a220a" />}
                      <span>{copied ? 'Saved to Clipboard! 📜' : 'Copy as Keepsake 📜'}</span>
                    </button>

                    <button
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'linear-gradient(135deg, rgba(124, 26, 53, 0.15), rgba(168, 36, 73, 0.15))',
                        border: '1px solid rgba(135, 0, 56, 0.35)',
                        color: '#7c1a35',
                        borderRadius: '999px',
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      title="Re-seal letter into the royal envelope"
                    >
                      <RefreshCw size={12} color="#7c1a35" />
                      <span>Re-Seal Letter 💌</span>
                    </button>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────
                    GREETING WITH ILLUMINATED ROYAL DROP CAP
                    ───────────────────────────────────────────────────────── */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '1.75rem',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #7c1a35 0%, #a82449 50%, #540e21 100%)',
                      border: '2.5px solid #d4af37',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.25), inset 0 0 8px rgba(255,224,160,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2.1rem',
                      fontWeight: 800,
                      color: '#FFE8B5',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                      flexShrink: 0,
                    }}
                  >
                    M
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#8b5a2b', fontWeight: 700 }}>
                      Royal Parchment Decree
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-script)',
                        fontSize: 'clamp(1.75rem, 3.4vw, 2.4rem)',
                        color: '#7c1a35',
                        margin: 0,
                        lineHeight: 1.15,
                        textShadow: '0 1px 2px rgba(255,255,255,0.7)',
                      }}
                    >
                      y dearest Samithra, 🌸
                    </h3>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────
                    FULL ANCIENT ROYAL SCROLL CALLIGRAPHY DECREE
                    ───────────────────────────────────────────────────────── */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Floating Animated Feather Quill Icon */}
                  <motion.div
                    animate={{
                      y: [-3, 5, -3],
                      rotate: [0, 6, 0],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      top: -10,
                      right: 12,
                      color: '#8b5a2b',
                      opacity: 0.85,
                      filter: 'drop-shadow(0 2px 6px rgba(139, 90, 43, 0.3))',
                      pointerEvents: 'none',
                    }}
                  >
                    <Feather size={26} />
                  </motion.div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {sachinLetter.paragraphs.map((para, idx) => (
                      <motion.p
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.12rem, 1.55vw, 1.34rem)',
                          lineHeight: 2.05,
                          color: '#2c1508',
                          margin: 0,
                          fontWeight: 500,
                          borderLeft: idx === 0 ? '3.5px solid #870038' : 'none',
                          paddingLeft: idx === 0 ? '1.25rem' : '0',
                          textShadow: '0 0 1px rgba(255,255,255,0.6)',
                        }}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
                      >
                        {/* Highlighted special words */}
                        {para.split(' ').map((word, wIdx) => {
                          const isSpecial =
                            word.includes('Chellakutty') ||
                            word.includes('Ammu') ||
                            word.includes('Birthday') ||
                            word.includes('magical') ||
                            word.includes('happiness') ||
                            word.includes('universe') ||
                            word.includes('special');
                          return (
                            <span
                              key={wIdx}
                              style={
                                isSpecial
                                  ? {
                                      color: '#870038',
                                      fontWeight: 700,
                                      borderBottom: '1.5px dotted rgba(135, 0, 56, 0.45)',
                                      textShadow: '0 0 10px rgba(255, 131, 184, 0.25)',
                                    }
                                  : {}
                              }
                            >
                              {word}{' '}
                            </span>
                          );
                        })}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────
                    CLOSING, HANDWRITTEN SIGNATURE & 3D WAX SEAL
                    ───────────────────────────────────────────────────────── */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    marginTop: '2.5rem',
                    paddingTop: '1.75rem',
                    borderTop: '1.5px solid rgba(184, 134, 11, 0.35)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Official 3D Royal Wax Seal Stamp on Parchment */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ position: 'relative' }}>
                      {/* Ribbon Tails behind wax seal */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '28px',
                          left: '12px',
                          width: '12px',
                          height: '32px',
                          background: 'linear-gradient(180deg, #870038, #540e21)',
                          transform: 'rotate(-18deg)',
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '28px',
                          left: '32px',
                          width: '12px',
                          height: '32px',
                          background: 'linear-gradient(180deg, #a82449, #6e122b)',
                          transform: 'rotate(18deg)',
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                        }}
                      />
                      {/* Embossed Royal 3D Wax Seal Image */}
                      <div
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: '50%',
                          border: '2.5px solid rgba(184, 134, 11, 0.95)',
                          boxShadow: '0 8px 25px rgba(110, 18, 43, 0.55), 0 0 15px rgba(255, 224, 160, 0.4)',
                          overflow: 'hidden',
                          position: 'relative',
                          zIndex: 2,
                          background: '#870038',
                        }}
                        title="Sacred Royal S ❤️ S Wax Seal"
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
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#8b5a2b', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Royal Seal of Eternal Love
                      </div>
                      <div style={{ fontSize: '0.73rem', color: '#6d421d' }}>
                        Handwritten by Sachin • Special Birthday Edition 📜
                      </div>
                    </div>
                  </div>

                  {/* Signature */}
                  <div style={{ textAlign: 'right' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        color: '#6d421d',
                        fontSize: '1.15rem',
                        margin: '0 0 0.35rem 0',
                      }}
                    >
                      {sachinLetter.closing}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-script)',
                        fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                        color: '#870038',
                        lineHeight: 1.1,
                        margin: 0,
                        textShadow: '0 2px 8px rgba(135, 0, 56, 0.25)',
                      }}
                    >
                      {sachinLetter.signature}
                    </p>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────
                    INTERACTIVE REACTION BAR (SEND LOVE TO SACHIN)
                    ───────────────────────────────────────────────────────── */}
                <div
                  style={{
                    marginTop: '2.5rem',
                    background: 'rgba(255, 252, 245, 0.85)',
                    border: '1.5px solid rgba(184, 134, 11, 0.4)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(139, 90, 43, 0.08)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#6d421d',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Send a Reaction Back to Sachin 💌
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      gap: '0.65rem',
                    }}
                  >
                    {[
                      {
                        emoji: '💋',
                        label: 'Send a Kiss',
                        response: 'Sachin felt your sweet kiss all the way to his soul! 💋🥰',
                      },
                      {
                        emoji: '🫂',
                        label: 'Tight Hug',
                        response: 'A warm, tight hug delivered straight to Sachin’s arms! 🫂✨',
                      },
                      {
                        emoji: '🥹',
                        label: 'Happy Tears',
                        response: 'Sachin will cherish every happy tear and smile of yours forever! 🥹💖',
                      },
                      {
                        emoji: '💍',
                        label: 'Forever Yours',
                        response: 'Sachin’s vow: Forever and always, until the stars fade! 💍🌌',
                      },
                    ].map((reaction, rIdx) => (
                      <motion.button
                        key={rIdx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          triggerReaction(
                            reaction.label,
                            reaction.emoji,
                            reaction.label,
                            reaction.response
                          )
                        }
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(139, 90, 43, 0.1)',
                          border: '1px solid rgba(184, 134, 11, 0.45)',
                          borderRadius: '999px',
                          padding: '6px 14px',
                          color: '#3d1a0a',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{ fontSize: '1.1rem' }}>{reaction.emoji}</span>
                        <span>{reaction.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────
                    INTERACTIVE SECRET REPLY DRAWER (SAMITHRA'S NOTE)
                    ───────────────────────────────────────────────────────── */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                  {!replyOpen ? (
                    <button
                      onClick={() => setReplyOpen(true)}
                      style={{
                        fontSize: '0.85rem',
                        padding: '8px 22px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(139, 90, 43, 0.14)',
                        border: '1.5px solid rgba(184, 134, 11, 0.5)',
                        color: '#4a220a',
                        borderRadius: '999px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span>{replySent ? 'View / Edit Your Reply to Sachin 💌' : 'Write a Secret Reply to Sachin ✍️'}</span>
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        background: 'rgba(255, 252, 245, 0.95)',
                        border: '1.5px solid rgba(184, 134, 11, 0.5)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        textAlign: 'left',
                        marginTop: '0.5rem',
                        boxShadow: '0 8px 25px rgba(139, 90, 43, 0.12)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            color: '#7c1a35',
                            fontSize: '1.15rem',
                            margin: 0,
                            fontWeight: 700,
                          }}
                        >
                          Your Return Letter to Sachin 📜
                        </h4>
                        <button
                          onClick={() => setReplyOpen(false)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#8b5a2b',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                          }}
                        >
                          Close ✕
                        </button>
                      </div>

                      {/* Quick Romantic Prompts */}
                      <p style={{ fontSize: '0.8rem', color: '#6d421d', marginBottom: '0.5rem', fontWeight: 500 }}>
                        Choose a sweet whisper or write your own message:
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.85rem' }}>
                        {[
                          'I love you more than all the stars, Sachin! ❤️',
                          'You made my birthday the most magical day ever! ✨',
                          'You are my forever person, Chellakutty! 🫂',
                          'Thank you for loving me so deeply! 🌸',
                        ].map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => setReplyText(prompt)}
                            style={{
                              background: 'rgba(139, 90, 43, 0.08)',
                              border: '1px solid rgba(184, 134, 11, 0.35)',
                              borderRadius: '999px',
                              padding: '4px 11px',
                              color: '#4a220a',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              fontWeight: 500,
                            }}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>

                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your words to Sachin here..."
                        rows={3}
                        style={{
                          width: '100%',
                          background: '#FFFDF9',
                          border: '1.5px solid rgba(184, 134, 11, 0.5)',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          color: '#2c1508',
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.95rem',
                          resize: 'none',
                          outline: 'none',
                          boxSizing: 'border-box',
                          marginBottom: '0.75rem',
                        }}
                      />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={handleSendReply}
                          style={{
                            padding: '7px 20px',
                            fontSize: '0.85rem',
                            background: 'linear-gradient(135deg, #7c1a35, #a82449)',
                            border: '1px solid #FFE0A0',
                            color: '#FFE8B5',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 700,
                            boxShadow: '0 4px 15px rgba(124, 26, 53, 0.3)',
                          }}
                        >
                          <Send size={13} style={{ marginRight: 4 }} />
                          <span>Seal & Save in Sachin's Heart 🔒</span>
                        </button>
                      </div>

                      {replySent && (
                        <p
                          style={{
                            fontSize: '0.82rem',
                            color: '#0e6938',
                            marginTop: '0.5rem',
                            marginBottom: 0,
                            textAlign: 'center',
                            fontWeight: 600,
                          }}
                        >
                          ✓ Sealed and remembered! Sachin can read your reply anytime.
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Reseal Letter Option */}
                <div style={{ textAlign: 'center', marginTop: '2rem', position: 'relative', zIndex: 2 }}>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#8b5a2b',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontWeight: 600,
                    }}
                  >
                    Roll & Reseal Royal Scroll 📜
                  </button>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────
                  BOTTOM 3D MAHOGANY & GOLD SCROLL ROLLER
                  ───────────────────────────────────────────────────────── */}
              <div style={{ position: 'relative', width: 'calc(100% + 36px)', left: '-18px', zIndex: 12, marginTop: '-6px' }}>
                {/* Curled Paper Wrap Above Bottom Roller */}
                <div
                  style={{
                    height: '16px',
                    margin: '0 18px',
                    background: 'linear-gradient(0deg, #b88d53 0%, #dfbf8d 40%, #fbf3e0 100%)',
                    boxShadow: '0 -6px 14px rgba(0,0,0,0.3)',
                    borderLeft: '2.5px solid #8b5a2b',
                    borderRight: '2.5px solid #8b5a2b',
                  }}
                />

                {/* The Wood & Gold Roller Bar */}
                <div
                  style={{
                    height: '36px',
                    borderRadius: '18px',
                    background: 'linear-gradient(180deg, #3d1404 0%, #7a320c 25%, #a84c19 50%, #7a320c 75%, #2a0c02 100%)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.95), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.7)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1.5px solid rgba(255, 224, 160, 0.65)',
                  }}
                >
                  {/* Left Gold Finial Knob */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-16px',
                      width: '32px',
                      height: '46px',
                      borderRadius: '50% 12% 12% 50%',
                      background: 'radial-gradient(ellipse at 35% 30%, #FFF2D1 0%, #E6C262 45%, #996515 80%, #4a2802 100%)',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.8)',
                      border: '2px solid #FFE0A0',
                    }}
                  />

                  {/* Center Dangling Silk Ribbon from Roller */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '-28px',
                      transform: 'translateX(-50%)',
                      width: '26px',
                      height: '36px',
                      background: 'linear-gradient(180deg, #870038 0%, #c41c59 70%, #ff5286 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.7)',
                    }}
                  />

                  {/* Center Sparkles Emblem */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '3px 18px',
                      background: 'linear-gradient(180deg, #FFE8B5 0%, #D4AF37 50%, #996515 100%)',
                      borderRadius: '8px',
                      boxShadow: '0 0 14px rgba(255, 224, 160, 0.65)',
                      border: '1px solid #FFE0A0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Sparkles size={14} color="#3d1404" />
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#3d1404', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                      ETERNAL LOVE
                    </span>
                  </div>

                  {/* Right Gold Finial Knob */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-16px',
                      width: '32px',
                      height: '46px',
                      borderRadius: '12% 50% 50% 12%',
                      background: 'radial-gradient(ellipse at 35% 30%, #FFF2D1 0%, #E6C262 45%, #996515 80%, #4a2802 100%)',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.8)',
                      border: '2px solid #FFE0A0',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          GRAND BRIDGE TO CHAPTER 12 (THE FINAL BIRTHDAY CLIMAX)
          ═══════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        viewport={{ once: true }}
        style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          zIndex: 10,
          maxWidth: '650px',
          width: '100%',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(23, 10, 45, 0.75) 0%, rgba(45, 12, 60, 0.75) 100%)',
            border: '1.5px solid rgba(255, 224, 160, 0.35)',
            borderRadius: '20px',
            padding: '1.75rem 2rem',
            boxShadow: '0 15px 50px rgba(0,0,0,0.6), 0 0 40px rgba(255, 131, 184, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--rose-pink), var(--champagne-gold), transparent)',
            }}
          />

          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--champagne-gold)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'inline-block',
              marginBottom: 6,
            }}
          >
            The Journey Culminates Here ✨
          </span>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
              color: 'var(--warm-ivory)',
              marginBottom: '0.5rem',
            }}
          >
            Ready for the Grand Final Surprise?
          </h3>

          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--soft-lavender)',
              opacity: 0.85,
              maxWidth: '480px',
              margin: '0 auto 1.25rem auto',
              lineHeight: 1.5,
            }}
          >
            One last magical celebration crafted to make Samithra’s birthday unforgettable forever.
          </p>

          <button
            onClick={scrollToFinale}
            className="btn-primary"
            style={{
              fontSize: '1rem',
              padding: '0.85rem 2.2rem',
              boxShadow: '0 8px 30px rgba(255, 131, 184, 0.45)',
            }}
          >
            <span>PROCEED TO CHAPTER 12 — THE GRAND FINALE 🌌🎆</span>
            <ArrowDown size={16} style={{ marginLeft: 6 }} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
