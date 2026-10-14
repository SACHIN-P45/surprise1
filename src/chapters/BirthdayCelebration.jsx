import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, PartyPopper, Cake, Flame, Send, RefreshCw, X, ChevronDown, Wand2, Crown, Maximize2 } from 'lucide-react';
import { birthdayContent } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 03 — Happy Birthday, Samithra (Masterpiece Edition)
 * Features:
 * - Handcrafted royal 3-tier birthday cake with interactive flickering candles & starlight smoke
 * - Multi-stage celebration with sky fireworks, floating party balloons & celebratory confetti rain
 * - Interactive Sky Lantern Wish Release experience with personalized wish selection & custom notes
 * - Sachin's Birthday Blessing Card
 * - Progression control to Chapter 04
 */
export default function BirthdayCelebration() {
  const [candlesLit, setCandlesLit] = useState(
    Array.from({ length: birthdayContent.candleCount || 5 }, () => true)
  );
  const [allBlownOut, setAllBlownOut] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [modalLoveHearts, setModalLoveHearts] = useState([]);
  const [showWishModal, setShowWishModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedWish, setSelectedWish] = useState(0);
  const [customWish, setCustomWish] = useState('');
  const [wishReleased, setWishReleased] = useState(false);

  const litCount = candlesLit.filter(Boolean).length;

  const prebuiltWishes = [
    { id: 0, text: 'A year of pure joy, peace, and endless sweet laughter.', icon: '🌸' },
    { id: 1, text: 'All your biggest dreams blooming into beautiful reality.', icon: '✨' },
    { id: 2, text: 'Magical journeys, cozy moments, and memories we treasure forever.', icon: '🦋' },
    { id: 3, text: 'Never doubting for a single second how deeply loved you are.', icon: '💖' },
  ];

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 65 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: ['#FF83B8', '#FFE0A0', '#CDBBFF', '#FFD6E7', '#6D4CC2', '#FF69B4', '#FFF8F3'][
          Math.floor(Math.random() * 7)
        ],
        size: Math.random() * 9 + 5,
        duration: Math.random() * 3 + 2.2,
        delay: Math.random() * 1,
      })),
    []
  );

  const blowCandle = (idx) => {
    if (!candlesLit[idx]) return;
    const next = [...candlesLit];
    next[idx] = false;
    setCandlesLit(next);

    if (next.every((c) => !c)) {
      triggerCelebration();
    }
  };

  const blowAllCandles = () => {
    setCandlesLit(Array(candlesLit.length).fill(false));
    triggerCelebration();
  };

  const triggerCelebration = () => {
    setTimeout(() => {
      setAllBlownOut(true);
      setShowCelebrationModal(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
    }, 400);
  };

  const resetCandles = () => {
    setCandlesLit(Array(candlesLit.length).fill(true));
    setAllBlownOut(false);
    setShowCelebrationModal(false);
    setShowConfetti(false);
    setShowWishModal(false);
    setWishReleased(false);
  };

  const handleReleaseWish = () => {
    setWishReleased(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleModalTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: ['💖', '💕', '✨', '🌸', '👑', '🥰', '❤️'][Math.floor(Math.random() * 7)],
    };
    setModalLoveHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setModalLoveHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1800);
  };

  const scrollToNext = () => {
    const el = document.getElementById('chapter-museum');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="chapter-section bg-birthday-stage"
      id="chapter-birthday"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FloatingPetals count={12} />

      {/* ─── CONFETTI SHOWER ─── */}
      <AnimatePresence>
        {showConfetti && (
          <div
            style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 120 }}
            aria-hidden="true"
          >
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ y: -40, x: `${piece.left}vw`, opacity: 1, rotate: 0 }}
                animate={{
                  y: '110vh',
                  rotate: 720,
                  opacity: [1, 1, 0.8, 0],
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  width: piece.size,
                  height: piece.size * 0.8,
                  borderRadius: piece.id % 2 === 0 ? '50%' : '2px',
                  background: piece.color,
                  boxShadow: `0 0 10px ${piece.color}`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ─── SKY FIREWORKS WHEN ALL CANDLES BLOWN OUT ─── */}
      <AnimatePresence>
        {allBlownOut && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} aria-hidden="true">
            {[
              { x: 18, y: 18, color: '#FF83B8', delay: 0 },
              { x: 82, y: 15, color: '#FFE0A0', delay: 0.6 },
              { x: 50, y: 10, color: '#CDBBFF', delay: 1.2 },
              { x: 28, y: 35, color: '#FFD6E7', delay: 1.8 },
              { x: 72, y: 32, color: '#FF83B8', delay: 2.4 },
            ].map((fw, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${fw.x}%`,
                  top: `${fw.y}%`,
                  width: '120px',
                  height: '120px',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.2,
                  delay: fw.delay,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                }}
              >
                {[...Array(10)].map((_, j) => (
                  <div
                    key={j}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: fw.color,
                      boxShadow: `0 0 12px ${fw.color}`,
                      transform: `rotate(${j * 36}deg) translateY(-40px)`,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ─── CHAPTER BADGE ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ zIndex: 10, marginBottom: '0.75rem' }}
      >
        <span
          className="chapter-badge"
          style={{
            background: 'rgba(109, 76, 194, 0.25)',
            border: '1px solid rgba(255, 224, 160, 0.4)',
            boxShadow: '0 0 20px rgba(109,76,194,0.3)',
            color: 'var(--champagne-gold)',
          }}
        >
          <PartyPopper size={13} style={{ marginRight: 6 }} />
          Chapter 03 — Birthday Celebration
        </span>
      </motion.div>

      {/* ─── TITLE & GREETING ─── */}
      <motion.h2
        className="heading-xl"
        style={{
          fontFamily: 'var(--font-serif)',
          textAlign: 'center',
          marginBottom: '0.6rem',
          zIndex: 10,
          background: 'linear-gradient(135deg, #FFF8F3 0%, #FFE0A0 40%, #FF83B8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.15,
        }}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {birthdayContent.heading}
      </motion.h2>

      <motion.p
        className="body-lg"
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'var(--soft-lavender)',
          zIndex: 10,
          maxWidth: '580px',
          opacity: 0.85,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.85 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        viewport={{ once: true }}
      >
        {birthdayContent.subheading}
      </motion.p>

      {/* ─── THE ROYAL BIRTHDAY CAKE & INTERACTIVE CANDLES ─── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35 }}
        viewport={{ once: true }}
      >
        <div style={{ position: 'relative', width: 'clamp(320px, 46vw, 480px)' }}>
          {/* Ambient Royal Halo Backdrop & Crystal Floor Glow */}
          <div
            style={{
              position: 'absolute',
              inset: '-30px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, rgba(255,131,184,0.3) 0%, rgba(109,76,194,0.2) 45%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Luxury Realistic 3-Tier Royal Birthday Cake with Built-in Burning Candles */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={allBlownOut ? resetCandles : blowAllCandles}
            title={allBlownOut ? "Click to relight the candles" : "Click the cake to blow out the candles and make a wish!"}
            transition={{ duration: 0.4 }}
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: allBlownOut
                ? '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(109,76,194,0.25)'
                : '0 25px 80px rgba(0,0,0,0.9), 0 0 60px rgba(255,224,160,0.4), 0 0 40px rgba(255,131,184,0.35)',
              border: allBlownOut
                ? '1.5px solid rgba(205,187,255,0.25)'
                : '2px solid rgba(255, 224, 160, 0.75)',
              background: 'linear-gradient(180deg, #160D33 0%, #0B0B20 100%)',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <img
              src="/images/royal-birthday-cake.jpg"
              alt="Queen Samithra's Royal Birthday Cake with Burning Candles"
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                display: 'block',
                filter: allBlownOut ? 'brightness(0.85) saturate(0.9)' : 'brightness(1.02) saturate(1.05)',
                transition: 'filter 0.6s ease',
              }}
            />

            {/* Realistic Candlelight Flame Warmth Flicker (Active when lit) */}
            {!allBlownOut && (
              <motion.div
                animate={{
                  opacity: [0.75, 1, 0.85, 0.98, 0.8],
                  scale: [1, 1.03, 0.99, 1.02, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: '4%',
                  left: '20%',
                  right: '20%',
                  height: '35%',
                  background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 224, 160, 0.35) 0%, rgba(255, 131, 184, 0.2) 50%, transparent 80%)',
                  filter: 'blur(12px)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />
            )}

            {/* Extinguish Smoke Wisps when blown out */}
            <AnimatePresence>
              {allBlownOut && (
                <div style={{ position: 'absolute', top: '10%', left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.9, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -45, scale: 2 }}
                      transition={{ duration: 2, delay: i * 0.15 }}
                      style={{
                        width: '12px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'rgba(255,224,160,0.6)',
                        filter: 'blur(4px)',
                        margin: '0 12px',
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Subtle Royal Glass Sheen Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Floating Stardust Particles around Cake */}
          {[
            { top: '20%', left: '-8%', delay: 0 },
            { top: '45%', right: '-8%', delay: 1 },
            { top: '75%', left: '-5%', delay: 2 },
            { top: '15%', right: '-10%', delay: 1.5 },
          ].map((spark, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.9, 0.3],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: spark.delay,
              }}
              style={{
                position: 'absolute',
                top: spark.top,
                left: spark.left,
                right: spark.right,
                fontSize: '1rem',
                color: '#FFE0A0',
                filter: 'drop-shadow(0 0 8px #FFE0A0)',
                pointerEvents: 'none',
                zIndex: 4,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* ─── BLOW OUT CONTROLS & STATUS ─── */}
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.65rem' }}>
          {!allBlownOut ? (
            <>
              <motion.button
                className="btn-primary"
                onClick={blowAllCandles}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.9rem 2.4rem',
                  fontSize: '1.02rem',
                  boxShadow: '0 8px 30px rgba(109,76,194,0.5), 0 0 45px rgba(255,131,184,0.4)',
                  letterSpacing: '0.04em',
                }}
              >
                <span>🌬️ Blow Out the Candles & Make a Wish ✨</span>
              </motion.button>
              <p style={{ fontSize: '0.85rem', color: 'var(--soft-lavender)', opacity: 0.85 }}>
                Tap the cake or press the button to blow out the candles
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.42rem 1.25rem',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(90deg, rgba(255,224,160,0.12), rgba(255,131,184,0.18), rgba(255,224,160,0.12))',
                border: '1px solid rgba(255,224,160,0.35)',
                fontSize: '0.82rem',
                color: 'var(--champagne-gold)',
                letterSpacing: '0.04em',
                marginBottom: '0.25rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <Sparkles size={14} color="#FFE0A0" />
              <span>Candles Blown Out With Love • Make Your Secret Wish Below</span>
              <Sparkles size={14} color="#FFE0A0" />
            </motion.div>
          )}
        </div>

        {/* ─── POST-BLOWOUT REVELATION & MASTERPIECE ACTION CARD ─── */}
        <AnimatePresence>
          {allBlownOut && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth: '820px',
                width: '100%',
                marginTop: '2rem',
                position: 'relative',
                borderRadius: '32px',
                padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem)',
                textAlign: 'center',
                background:
                  'linear-gradient(145deg, rgba(28, 16, 56, 0.96) 0%, rgba(48, 18, 76, 0.92) 50%, rgba(18, 10, 38, 0.98) 100%)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '2px solid rgba(255, 224, 160, 0.65)',
                boxShadow:
                  '0 25px 90px rgba(0, 0, 0, 0.85), 0 0 80px rgba(255, 131, 184, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                overflow: 'hidden',
                zIndex: 10,
              }}
            >
              {/* Ambient Radiant Backdrop Flare */}
              <div
                style={{
                  position: 'absolute',
                  top: '-25%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '440px',
                  height: '280px',
                  background:
                    'radial-gradient(ellipse, rgba(255, 131, 184, 0.32) 0%, rgba(255, 224, 160, 0.2) 45%, transparent 70%)',
                  filter: 'blur(45px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Decorative Gold Filigree Corner Accents */}
              <div style={{ position: 'absolute', top: 16, left: 16, width: 28, height: 28, borderTop: '2px solid rgba(255,224,160,0.7)', borderLeft: '2px solid rgba(255,224,160,0.7)', borderRadius: '4px 0 0 0' }} />
              <div style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderTop: '2px solid rgba(255,224,160,0.7)', borderRight: '2px solid rgba(255,224,160,0.7)', borderRadius: '0 4px 0 0' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, width: 28, height: 28, borderBottom: '2px solid rgba(255,224,160,0.7)', borderLeft: '2px solid rgba(255,224,160,0.7)', borderRadius: '0 0 0 4px' }} />
              <div style={{ position: 'absolute', bottom: 16, right: 16, width: 28, height: 28, borderBottom: '2px solid rgba(255,224,160,0.7)', borderRight: '2px solid rgba(255,224,160,0.7)', borderRadius: '0 0 4px 0' }} />

              {/* Content Wrapper */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* ─── ROYAL EMBLEM & BADGE ─── */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, -2, 2, 0],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 224, 160, 0.35) 0%, rgba(255, 131, 184, 0.22) 60%, transparent 100%)',
                      border: '2px solid rgba(255, 224, 160, 0.75)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.9rem',
                      boxShadow: '0 0 30px rgba(255, 224, 160, 0.55)',
                      marginBottom: '0.85rem',
                    }}
                  >
                    👑
                  </motion.div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.4rem 1.25rem',
                      borderRadius: 'var(--radius-xl)',
                      background: 'linear-gradient(90deg, rgba(255,224,160,0.16), rgba(255,131,184,0.24), rgba(255,224,160,0.16))',
                      border: '1.5px solid rgba(255,224,160,0.45)',
                      fontSize: '0.76rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--champagne-gold)',
                      fontWeight: 700,
                      boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Sparkles size={12} color="#FFE0A0" />
                    <span>Queen of My Heart • Royal Birthday Keepsake</span>
                    <Sparkles size={12} color="#FFE0A0" />
                  </div>
                </motion.div>

                {/* ─── RADIANT GOLD TITLE ─── */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFE0A0 35%, #FF83B8 80%, #FFE0A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 2px 20px rgba(255, 131, 184, 0.45))',
                    marginBottom: '1.5rem',
                    lineHeight: 1.25,
                  }}
                >
                  Happy Birthday, Chellakutty! ✨
                </h3>

                {/* ─── MASTERPIECE 3D ROYAL BIRTHDAY GREETING CARD PICTURE ─── */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCelebrationModal(true)}
                  title="Click to view full-screen celebration keepsake"
                  style={{
                    position: 'relative',
                    borderRadius: '26px',
                    overflow: 'hidden',
                    margin: '0 auto 1.85rem auto',
                    maxWidth: '720px',
                    width: '100%',
                    border: '2.5px solid rgba(255, 224, 160, 0.85)',
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 131, 184, 0.4), 0 0 80px rgba(255, 224, 160, 0.3)',
                    cursor: 'pointer',
                    background: '#0B0B20',
                  }}
                >
                  <picture>
                    <source media="(max-width: 768px)" srcSet="/images/birthday-celebration-portrait.jpg" />
                    <source media="(min-width: 769px)" srcSet="/images/birthday-celebration-landscape.jpg" />
                    <img
                      src="/images/birthday-celebration-landscape.jpg"
                      alt="Queen Samithra's Royal Birthday Celebration Card"
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '440px',
                        objectFit: 'contain',
                        display: 'block',
                        imageRendering: '-webkit-optimize-contrast',
                      }}
                    />
                  </picture>

                  {/* Golden Sheen Passing Across */}
                  <motion.div
                    animate={{ x: ['-120%', '220%'] }}
                    transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', repeatDelay: 2.5 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(105deg, transparent 35%, rgba(255, 224, 160, 0.28) 50%, rgba(255, 131, 184, 0.25) 55%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top-Right Badge: Full-Screen Inspect Hint */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '14px',
                      background: 'rgba(23, 14, 46, 0.88)',
                      border: '1px solid rgba(255, 224, 160, 0.65)',
                      borderRadius: '999px',
                      padding: '5px 14px',
                      color: 'var(--champagne-gold)',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Maximize2 size={12} color="#FFE0A0" />
                    <span>Click to Expand Full-Screen 👑</span>
                  </div>
                </motion.div>

                {/* ─── HEARTFELT LOVE INSCRIPTION PLAQUE ─── */}
                <div
                  style={{
                    background: 'rgba(12, 9, 28, 0.72)',
                    border: '1.5px solid rgba(255, 224, 160, 0.35)',
                    borderRadius: '22px',
                    padding: 'clamp(1.2rem, 3.2vw, 2rem)',
                    marginBottom: '2rem',
                    boxShadow: 'inset 0 2px 14px rgba(0, 0, 0, 0.5), 0 8px 28px rgba(0, 0, 0, 0.4)',
                    position: 'relative',
                  }}
                >
                  {/* Decorative Header divider */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      color: 'var(--champagne-gold)',
                      opacity: 0.8,
                      fontSize: '0.75rem',
                      marginBottom: '0.9rem',
                    }}
                  >
                    <span>✦</span>
                    <div style={{ height: '1px', width: '45px', background: 'linear-gradient(90deg, transparent, rgba(255,224,160,0.6))' }} />
                    <Heart size={14} color="#FF83B8" fill="#FF83B8" />
                    <div style={{ height: '1px', width: '45px', background: 'linear-gradient(90deg, rgba(255,224,160,0.6), transparent)' }} />
                    <span>✦</span>
                  </div>

                  <p
                    style={{
                      color: 'var(--warm-ivory)',
                      fontSize: 'clamp(0.98rem, 1.85vw, 1.12rem)',
                      lineHeight: 1.9,
                      fontStyle: 'italic',
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    “{birthdayContent.wishMessage}”
                  </p>

                  {/* Sachin's sweet signature with 3D Wax Seal Badge */}
                  <div
                    style={{
                      marginTop: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <img
                      src="/images/royal-wax-seal.jpg"
                      alt="S ❤️ S Seal"
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255, 224, 160, 0.8)',
                        boxShadow: '0 0 15px rgba(255, 131, 184, 0.5)',
                      }}
                    />
                    <div
                      style={{
                        fontFamily: 'var(--font-script)',
                        fontSize: '1.35rem',
                        color: 'var(--rose-pink)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span>— Forever & Always Yours, Sachin</span>
                      <Heart size={16} color="#FF83B8" fill="#FF83B8" />
                    </div>
                  </div>
                </div>

                {/* ─── UPGRADED LUXURY ACTIONS ─── */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    width: '100%',
                  }}
                >
                  {/* HERO BUTTON: RELEASE SKY LANTERN */}
                  <motion.button
                    onClick={() => setShowWishModal(true)}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.65rem',
                      width: 'min(460px, 100%)',
                      padding: '1.05rem 2.2rem',
                      borderRadius: 'var(--radius-xl)',
                      background: 'linear-gradient(135deg, #FF69B4 0%, #AA3BFF 50%, #FF83B8 100%)',
                      color: '#FFFFFF',
                      fontSize: '1.02rem',
                      fontWeight: 700,
                      letterSpacing: '0.03em',
                      border: '1px solid rgba(255, 255, 255, 0.45)',
                      boxShadow: '0 8px 32px rgba(170, 59, 255, 0.5), 0 0 45px rgba(255, 105, 180, 0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Sparkles size={18} color="#FFE0A0" />
                    <span>Release Sky Lantern & Make Wish ✨</span>
                  </motion.button>

                  {/* SECONDARY BUTTONS ROW */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      width: '100%',
                    }}
                  >
                    {/* VIEW FULL-SCREEN KEEPSAKE */}
                    <motion.button
                      onClick={() => setShowCelebrationModal(true)}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.45rem',
                        borderRadius: 'var(--radius-xl)',
                        background: 'rgba(255, 224, 160, 0.14)',
                        border: '1.5px solid rgba(255, 224, 160, 0.45)',
                        color: 'var(--champagne-gold)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <PartyPopper size={16} color="#FFE0A0" />
                      <span>View Full-Screen Keepsake 👑</span>
                    </motion.button>

                    {/* RELIGHT CANDLES */}
                    <motion.button
                      onClick={resetCandles}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.35rem',
                        borderRadius: 'var(--radius-xl)',
                        background: 'rgba(205, 187, 255, 0.1)',
                        border: '1px solid rgba(205, 187, 255, 0.28)',
                        color: 'var(--soft-lavender)',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <RefreshCw size={15} color="#CDBBFF" />
                      <span>Relight Candles 🕯️</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ─── FULL-SCREEN CELEBRATION REVEAL (RESPONSIVE CINEMATIC LOVE EDITION) ─── */}
      <AnimatePresence>
        {showCelebrationModal && (
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalTap}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'radial-gradient(ellipse at 50% 40%, rgba(22, 13, 51, 0.98) 0%, rgba(7, 5, 18, 0.99) 100%)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(0.5rem, 2vw, 1.5rem)',
              overflow: 'hidden',
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            {/* ─── FLOATING CONTINUOUS ROMANTIC LOVE PARTICLES ─── */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
              {[...Array(22)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    y: '105vh',
                    x: `${(i * 4.6 + Math.random() * 3) % 96}vw`,
                    opacity: 0,
                    scale: 0.5 + Math.random() * 0.5,
                  }}
                  animate={{
                    y: '-10vh',
                    opacity: [0, 0.85, 0.85, 0],
                    scale: [0.6, 1.1, 0.9],
                    rotate: [0, (i % 2 === 0 ? 1 : -1) * (180 + i * 15)],
                  }}
                  transition={{
                    duration: 6.5 + (i % 5) * 1.5,
                    repeat: Infinity,
                    delay: (i * 0.35) % 4,
                    ease: 'linear',
                  }}
                  style={{
                    position: 'absolute',
                    fontSize: `${1.1 + (i % 4) * 0.25}rem`,
                    filter: 'drop-shadow(0 0 10px rgba(255,131,184,0.7))',
                  }}
                >
                  {['💖', '🌸', '✨', '💕', '👑', '🥰', '🌹', '❤️', '🦋'][i % 9]}
                </motion.div>
              ))}

              {/* Interactive Tap-To-Heart Eruptions */}
              {modalLoveHearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ scale: 0, x: h.x - 18, y: h.y - 18, opacity: 1 }}
                  animate={{
                    scale: [0, 1.6, 2],
                    y: h.y - 120,
                    opacity: [1, 1, 0],
                    rotate: Math.random() * 40 - 20,
                  }}
                  transition={{ duration: 1.6, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    fontSize: '2rem',
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 0 14px #FF83B8)',
                    zIndex: 50,
                  }}
                >
                  {h.emoji}
                </motion.div>
              ))}
            </div>

            {/* ─── MODAL CINEMATIC STAGE ─── */}
            <motion.div
              initial={{ scale: 0.84, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.84, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              onClick={(e) => {
                e.stopPropagation();
                handleModalTap(e);
              }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '96vw',
                maxHeight: '94vh',
                cursor: 'pointer',
              }}
            >
              {/* Floating Close Button */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCelebrationModal(false);
                }}
                aria-label="Close celebration screen"
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(23,16,46,0.98), rgba(45,24,80,0.98))',
                  border: '2px solid rgba(255, 224, 160, 0.9)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.9), 0 0 25px rgba(255,131,184,0.6)',
                  color: 'var(--champagne-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 40,
                }}
              >
                <X size={20} />
              </motion.button>

              {/* Regal Floating Title Banner */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.45rem 1.4rem',
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(135deg, rgba(23,16,46,0.9) 0%, rgba(45,24,80,0.85) 100%)',
                  border: '1.5px solid rgba(255, 224, 160, 0.65)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.6), 0 0 30px rgba(255,131,184,0.35)',
                  color: 'var(--champagne-gold)',
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.92rem)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                }}
              >
                <span>👑</span>
                <span>FOR MY QUEEN SAMITHRA • SHINING ALWAYS WITH LOVE</span>
                <span>💖</span>
              </motion.div>

              {/* ─── FULL SCREEN HIGH DEFINITION PICTURE FRAME ─── */}
              <motion.div
                animate={{ scale: [1, 1.018, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '2.5px solid rgba(255, 224, 160, 0.85)',
                  boxShadow: '0 30px 100px rgba(0,0,0,0.95), 0 0 80px rgba(255,131,184,0.5), 0 0 120px rgba(109,76,194,0.4)',
                  background: '#0B0B20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <picture>
                  {/* Mobile Screen: True Portrait Orientation */}
                  <source
                    media="(max-width: 768px)"
                    srcSet="/images/birthday-celebration-portrait.jpg"
                  />
                  {/* Laptop / PC Screen: True Landscape Orientation */}
                  <source
                    media="(min-width: 769px)"
                    srcSet="/images/birthday-celebration-landscape.jpg"
                  />
                  {/* Ultra-Crisp Responsive Image */}
                  <img
                    src="/images/birthday-celebration-landscape.jpg"
                    alt="Happy Birthday My Samithra"
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: 'min(94vw, 1280px)',
                      maxHeight: 'min(78vh, 800px)',
                      objectFit: 'contain',
                      display: 'block',
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                </picture>

                {/* Animated Golden Light Sheen Passing Across */}
                <motion.div
                  animate={{ x: ['-120%', '220%'] }}
                  transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', repeatDelay: 3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255, 224, 160, 0.28) 50%, rgba(255, 131, 184, 0.25) 55%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Soft Vignette Edge Shadow */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>

              {/* ─── ACTION BUTTONS & SACHIN'S DEDICATION ─── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginTop: '1rem',
                  zIndex: 20,
                }}
              >
                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.button
                    className="btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCelebrationModal(false);
                      setShowWishModal(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '0.65rem 1.6rem',
                      fontSize: '0.9rem',
                      boxShadow: '0 8px 30px rgba(255,131,184,0.45)',
                    }}
                  >
                    <Sparkles size={16} />
                    <span>Make Birthday Wish & Release Sky Lantern ✨</span>
                  </motion.button>

                  <button
                    className="btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCelebrationModal(false);
                    }}
                    style={{
                      padding: '0.65rem 1.4rem',
                      fontSize: '0.86rem',
                    }}
                  >
                    <span>Continue Celebration 🌸</span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.9 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--soft-lavender)' }}>
                    ✨ Tap anywhere to bloom hearts of love
                  </span>
                  <span style={{ color: 'var(--champagne-gold)' }}>•</span>
                  <span style={{ fontFamily: 'var(--font-script)', color: 'var(--rose-pink)', fontSize: '1.15rem' }}>
                    Forever made with all my love — Sachin ❤️
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── INTERACTIVE SKY LANTERN WISH MODAL ─── */}
      <AnimatePresence>
        {showWishModal && (
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWishModal(false)}
          >
            <motion.div
              className="glass-card-premium"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '560px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                border: '1.5px solid rgba(255,224,160,0.4)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(255,131,184,0.3)',
              }}
            >
              <button
                className="btn-close"
                onClick={() => setShowWishModal(false)}
                aria-label="Close"
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}
              >
                <X size={18} />
              </button>

              {!wishReleased ? (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏮✨</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.6rem',
                      color: 'var(--champagne-gold)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Release a Sky Lantern into the Cosmos
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--soft-lavender)', marginBottom: '1.5rem' }}>
                    Select a birthday blessing or write your secret wish for this year:
                  </p>

                  {/* Prebuilt Wishes Selection */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    {prebuiltWishes.map((w) => {
                      const isChosen = selectedWish === w.id;
                      return (
                        <button
                          key={w.id}
                          onClick={() => {
                            setSelectedWish(w.id);
                            setCustomWish('');
                          }}
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            background: isChosen
                              ? 'linear-gradient(135deg, rgba(109,76,194,0.4), rgba(255,131,184,0.25))'
                              : 'rgba(255,255,255,0.03)',
                            border: isChosen
                              ? '1px solid var(--champagne-gold)'
                              : '1px solid rgba(205,187,255,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            textAlign: 'left',
                            color: isChosen ? 'var(--warm-ivory)' : 'rgba(255,248,243,0.7)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span style={{ fontSize: '1.3rem' }}>{w.icon}</span>
                          <span style={{ fontSize: '0.88rem' }}>{w.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Optional Custom Wish Input */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <input
                      type="text"
                      placeholder="Or write your own private wish here..."
                      value={customWish}
                      onChange={(e) => setCustomWish(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(0,0,0,0.35)',
                        border: '1px solid rgba(205,187,255,0.25)',
                        color: 'var(--warm-ivory)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <motion.button
                    className="btn-primary"
                    onClick={handleReleaseWish}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Send size={18} />
                    <span>Send Wish to the Universe 🏮✨</span>
                  </motion.button>
                </>
              ) : (
                /* Lantern Released Confirmation Stage */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ padding: '1rem 0' }}
                >
                  <motion.div
                    animate={{ y: [-10, -40, -10], rotate: [-4, 4, -4] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    style={{ fontSize: '4.5rem', marginBottom: '1rem' }}
                  >
                    🏮
                  </motion.div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.7rem',
                      color: 'var(--champagne-gold)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Your Wish is Floating Among the Stars ✨
                  </h3>

                  <p className="body-md" style={{ color: 'var(--warm-ivory)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                    "{customWish || prebuiltWishes[selectedWish].text}"
                  </p>

                  <div
                    style={{
                      padding: '1.25rem',
                      background: 'rgba(255,131,184,0.1)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255,131,184,0.3)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--rose-pink)', fontSize: '1.05rem' }}>
                      "Whatever you wished for, Samithra, my promise is to spend this entire year making sure you smile every single day."
                    </p>
                    <p className="signature-text" style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                      — Sachin ❤️
                    </p>
                  </div>

                  <button className="btn-secondary" onClick={() => setShowWishModal(false)}>
                    Close ✕
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PROGRESSION LINK TO CHAPTER 04 ─── */}
      <motion.div
        whileHover={{ y: 3 }}
        style={{ zIndex: 10, textAlign: 'center', marginTop: '1rem' }}
      >
        <button
          onClick={scrollToNext}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--soft-lavender)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.8rem',
            opacity: 0.75,
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
        >
          <span>Continue to Memory Museum</span>
          <ChevronDown size={18} />
        </button>
      </motion.div>
    </section>
  );
}
