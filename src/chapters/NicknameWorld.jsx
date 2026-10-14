import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Crown,
  X,
  Volume2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Award,
  Eye,
  Radio,
} from 'lucide-react';
import { nicknames } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 06 — Seven Names, One Favourite Person (Ultra-Attractive Masterpiece Edition)
 *
 * An enchanted, emotionally mesmerizing showcase of the 7 sacred names Sachin lovingly calls Samithra.
 *
 * Features:
 * - 7 glowing royal amulets with jewelry-grade gradients, gold filigree trim & light glints
 * - Custom thematic particle bursts on tap (👑 crowns, 🌸 flowers, 🦋 butterflies, 💍 rings, etc.)
 * - Interactive "Whisper to Me" tender audio-visual pulse with simulated animated voice wave
 * - Interactive "Crown Your Favorite Name" royal ceremony with golden aura halo
 * - Dual Perspective: "Sacred Constellation Grid" vs "Romantic Carousel / Deck View"
 * - Deep velvet-lined story modal with Sachin's calligraphy signature and romantic inscription
 * - Floating charms and starlight garden fireflies
 */

export default function NicknameWorld() {
  const [activeNickname, setActiveNickname] = useState(null);
  const [crownedName, setCrownedName] = useState('Pondati');
  const [whisperPulse, setWhisperPulse] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [floatingParticles, setFloatingParticles] = useState([]);

  // Thematic particle sets for each sacred name
  const thematicSymbols = {
    Samithra: ['👑', '✨', '💜', '🌟'],
    Chellakutty: ['🌸', '💖', '🎀', '💕'],
    Thangoo: ['✨', '💛', '🪙', '🌟'],
    Ammu: ['💖', '🥰', '💗', '✨'],
    Pattukutty: ['🦋', '🩵', '✨', '🪶'],
    Pondati: ['💍', '👑', '💖', '♾️'],
    Pasakari: ['🌙', '✨', '💜', '💫'],
  };

  const charmDecorations = {
    crown: '👑',
    flower: '🌸',
    sparkle: '✨',
    heart: '💖',
    butterfly: '🦋',
    ring: '💍',
    moon: '🌙',
  };

  const nameSubtitles = {
    Samithra: 'The Sacred Queen • The Name That Changed My World',
    Chellakutty: 'My Little Precious • Tender & Irresistibly Sweet',
    Thangoo: 'Pure 24K Treasure • Priceless Beyond All Kingdoms',
    Ammu: 'The Gentle Heartbeat • Soft, Pure & Endlessly Loved',
    Pattukutty: 'My Silk Butterfly • Delicate Grace & Soft Magic',
    Pondati: 'My Forever Wife • The Promise of Every Tomorrow',
    Pasakari: 'My Soul’s Sanctuary • The Comfort of Late-Night Talks',
  };

  // Trigger floating particle burst on click
  const triggerThematicBurst = (e, name) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const symbols = thematicSymbols[name] || ['💖', '✨', '🌟'];
    const newParticles = Array.from({ length: 9 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: originX + (Math.random() - 0.5) * 35,
      y: originY + (Math.random() - 0.5) * 20,
      targetX: (Math.random() - 0.5) * 180,
      targetY: -70 - Math.random() * 90,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: 16 + Math.random() * 12,
    }));

    setFloatingParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1500);
  };

  const handleWhisper = () => {
    setWhisperPulse(true);
    setTimeout(() => setWhisperPulse(false), 4500);
  };

  const scrollToNext = () => {
    const el = document.getElementById('chapter-garden');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="chapter-section bg-romantic-sky"
      id="chapter-nicknames"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 6vw, 6rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 15%, rgba(42, 16, 56, 0.95) 0%, rgba(11, 11, 32, 0.98) 75%)',
      }}
    >
      <FloatingPetals count={14} />

      {/* ─── DYNAMIC THEMATIC FLOATING PARTICLES ─── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 1.5,
              x: p.x + p.targetX,
              y: p.y + p.targetY,
            }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              fontSize: `${p.size}px`,
              filter: 'drop-shadow(0 0 10px rgba(255, 224, 160, 0.8))',
            }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </div>

      {/* Ambient Fireflies in Sky */}
      <div
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}
        aria-hidden="true"
      >
        {[...Array(26)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 13.9) % 100}%`,
              width: i % 3 === 0 ? '5px' : '3px',
              height: i % 3 === 0 ? '5px' : '3px',
              borderRadius: '50%',
              background: i % 2 === 0 ? '#FFE0A0' : '#FF83B8',
              boxShadow: i % 2 === 0 ? '0 0 12px #FFE0A0' : '0 0 12px #FF83B8',
              animation: `twinkle ${2.5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ─── CHAPTER BADGE ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ zIndex: 10, marginBottom: '0.85rem' }}
      >
        <span
          className="chapter-badge"
          style={{
            background: 'rgba(109, 76, 194, 0.28)',
            border: '1.5px solid rgba(255, 224, 160, 0.55)',
            boxShadow: '0 0 25px rgba(109,76,194,0.4), inset 0 0 15px rgba(255,224,160,0.2)',
            color: 'var(--champagne-gold)',
            padding: '0.55rem 1.4rem',
            borderRadius: 'var(--radius-xl)',
            fontSize: '0.88rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Sparkles size={15} color="#FFE0A0" />
          <span>Seven Names, One Favourite Person</span>
        </span>
      </motion.div>

      {/* ─── HEADING ─── */}
      <motion.h2
        className="heading-lg"
        style={{
          fontFamily: 'var(--font-serif)',
          textAlign: 'center',
          marginBottom: '0.75rem',
          background: 'linear-gradient(135deg, #FFF8F3 0%, #FFE0A0 40%, #FF83B8 80%, #CDBBFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          zIndex: 10,
          lineHeight: 1.25,
          fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
          filter: 'drop-shadow(0 4px 15px rgba(255, 131, 184, 0.25))',
        }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Seven Names, One Favourite Person
      </motion.h2>

      <motion.p
        className="body-lg"
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          maxWidth: '680px',
          color: 'var(--soft-lavender)',
          zIndex: 10,
          opacity: 0.9,
          fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
          lineHeight: 1.7,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        To the rest of the world, you have one name. But to me, you are a whole galaxy of love.
        <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--champagne-gold)', marginTop: '0.4rem' }}>
          ✨ Tap any sacred amulet to hear Sachin's tender meaning • Crown your favourite name
        </span>
      </motion.p>

      {/* ─── CROWNED FAVORITE NAME PILL & VIEW SWITCHER ─── */}
      <motion.div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.2rem',
          marginBottom: '2.5rem',
          zIndex: 10,
        }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        viewport={{ once: true }}
      >
        {/* Crowned Favorite Pill */}
        {crownedName && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 1.25rem',
              background: 'rgba(23, 16, 46, 0.85)',
              border: '1.5px solid var(--champagne-gold)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 0 25px rgba(255, 224, 160, 0.35), inset 0 0 10px rgba(255, 224, 160, 0.15)',
            }}
          >
            <Crown size={16} color="var(--champagne-gold)" />
            <span style={{ fontSize: '0.84rem', color: 'var(--warm-ivory)' }}>
              Crowned Favorite: <strong style={{ color: 'var(--champagne-gold)' }}>"{crownedName}" 👑</strong>
            </span>
          </div>
        )}

        {/* View Mode Switcher */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(23, 16, 46, 0.8)',
            border: '1px solid rgba(205, 187, 255, 0.25)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
          }}
        >
          <button
            onClick={() => setViewMode('grid')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.42rem 0.95rem',
              borderRadius: 'var(--radius-xl)',
              fontSize: '0.8rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: viewMode === 'grid' ? 600 : 400,
              background: viewMode === 'grid' ? 'linear-gradient(135deg, #6D4CC2, #FF83B8)' : 'transparent',
              color: viewMode === 'grid' ? '#FFFFFF' : 'rgba(255,248,243,0.7)',
              boxShadow: viewMode === 'grid' ? '0 0 15px rgba(255,131,184,0.4)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <span>💎</span>
            <span>Constellation Grid</span>
          </button>

          <button
            onClick={() => setViewMode('carousel')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.42rem 0.95rem',
              borderRadius: 'var(--radius-xl)',
              fontSize: '0.8rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: viewMode === 'carousel' ? 600 : 400,
              background: viewMode === 'carousel' ? 'linear-gradient(135deg, #FFE0A0, #FF83B8)' : 'transparent',
              color: viewMode === 'carousel' ? '#0B0B20' : 'rgba(255,248,243,0.7)',
              boxShadow: viewMode === 'carousel' ? '0 0 15px rgba(255,224,160,0.5)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <span>🔮</span>
            <span>Amulet Deck</span>
          </button>
        </div>
      </motion.div>

      {/* ─── VIEW MODE 1: CONSTELLATION GRID ─── */}
      {viewMode === 'grid' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.6rem',
            maxWidth: '1140px',
            width: '100%',
            zIndex: 10,
            marginBottom: '2.5rem',
          }}
        >
          {nicknames.map((nick, idx) => {
            const isCrowned = crownedName === nick.name;
            return (
              <motion.div
                key={nick.name}
                initial={{ opacity: 0, scale: 0.88, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, y: -8 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  triggerThematicBurst(e, nick.name);
                  setActiveNickname(nick);
                }}
                className="glass-card-premium"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '2.2rem 1.4rem 1.8rem 1.4rem',
                  borderRadius: 'var(--radius-lg)',
                  border: isCrowned
                    ? '2px solid #FFE0A0'
                    : `1.5px solid ${nick.color}50`,
                  background: `linear-gradient(150deg, rgba(30, 18, 56, 0.92) 0%, rgba(14, 10, 29, 0.96) 60%, ${nick.color}22 100%)`,
                  boxShadow: isCrowned
                    ? '0 18px 45px rgba(0,0,0,0.7), 0 0 40px rgba(255,224,160,0.4), inset 0 0 20px rgba(255,224,160,0.2)'
                    : `0 14px 35px rgba(0,0,0,0.55), 0 0 25px ${nick.color}25`,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Diagonal Light Sheen Glint on Card */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background:
                      'linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.08) 50%, transparent 55%)',
                    pointerEvents: 'none',
                    transform: 'rotate(25deg)',
                  }}
                />

                {/* Crown badge if selected */}
                {isCrowned && (
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      background: 'linear-gradient(135deg, rgba(255,224,160,0.3) 0%, rgba(255,131,184,0.3) 100%)',
                      border: '1px solid #FFE0A0',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '0.72rem',
                      color: 'var(--champagne-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 700,
                      boxShadow: '0 0 15px rgba(255,224,160,0.5)',
                    }}
                  >
                    <Crown size={12} fill="#FFE0A0" />
                    <span>Crowned</span>
                  </motion.div>
                )}

                {/* Glowing Sacred Amulet Sphere */}
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 20px ${nick.color}40`,
                      `0 0 40px ${nick.color}80, inset 0 0 20px ${nick.color}50`,
                      `0 0 20px ${nick.color}40`,
                    ],
                  }}
                  transition={{ duration: 3.2 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 35% 35%, ${nick.color}55 0%, rgba(25, 14, 48, 0.95) 85%)`,
                    border: `2.5px solid ${nick.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    marginBottom: '1.15rem',
                    userSelect: 'none',
                    position: 'relative',
                  }}
                >
                  {/* Rotating Starlight Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + idx * 2, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: -6,
                      borderRadius: '50%',
                      border: `1px dashed ${nick.color}70`,
                      pointerEvents: 'none',
                    }}
                  />
                  <span>{nick.emoji}</span>
                </motion.div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: 'var(--warm-ivory)',
                    marginBottom: '0.35rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {nick.name}
                </h3>

                {/* Romantic Meaning Tag */}
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: nick.color,
                    letterSpacing: '0.02em',
                    fontWeight: 600,
                    marginBottom: '1.2rem',
                    lineHeight: 1.4,
                  }}
                >
                  {nameSubtitles[nick.name] || `${charmDecorations[nick.decoration]} Sacred Love`}
                </p>

                {/* Bottom Card Action Cue */}
                <div
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.76rem',
                    color: 'rgba(255,248,243,0.75)',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '4px 12px',
                    borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Sparkles size={12} color="var(--champagne-gold)" />
                  <span>Tap to reveal Sachin's story</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── VIEW MODE 2: AMULET CAROUSEL DECK ─── */}
      {viewMode === 'carousel' && (
        <div
          style={{
            maxWidth: '620px',
            width: '100%',
            position: 'relative',
            zIndex: 10,
            marginBottom: '2.5rem',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={carouselIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="glass-card-premium"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'clamp(2rem, 5vw, 3rem) 2rem',
                borderRadius: 'var(--radius-lg)',
                border: `2px solid ${nicknames[carouselIndex].color}`,
                background: `linear-gradient(150deg, rgba(32, 19, 60, 0.95) 0%, rgba(14, 10, 29, 0.98) 70%, ${nicknames[carouselIndex].color}25 100%)`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 50px ${nicknames[carouselIndex].color}40`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Giant Amulet Emoji */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                onClick={(e) => triggerThematicBurst(e, nicknames[carouselIndex].name)}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, ${nicknames[carouselIndex].color}55 0%, rgba(25, 14, 48, 0.95) 85%)`,
                  border: `3px solid ${nicknames[carouselIndex].color}`,
                  boxShadow: `0 0 35px ${nicknames[carouselIndex].color}80`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.4rem',
                  marginBottom: '1.2rem',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                {nicknames[carouselIndex].emoji}
              </motion.div>

              <span
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: nicknames[carouselIndex].color,
                  fontWeight: 700,
                  marginBottom: '0.3rem',
                }}
              >
                {charmDecorations[nicknames[carouselIndex].decoration]} Sacred Name #{carouselIndex + 1}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.2rem',
                  color: 'var(--warm-ivory)',
                  marginBottom: '0.5rem',
                }}
              >
                {nicknames[carouselIndex].name}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--champagne-gold)',
                  fontStyle: 'italic',
                  marginBottom: '1.4rem',
                }}
              >
                {nameSubtitles[nicknames[carouselIndex].name]}
              </p>

              {/* Story Excerpt */}
              <div
                style={{
                  padding: '1.2rem 1.4rem',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `3.5px solid ${nicknames[carouselIndex].color}`,
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    color: 'var(--warm-ivory)',
                    fontSize: '1.02rem',
                    lineHeight: 1.75,
                  }}
                >
                  "{nicknames[carouselIndex].message}"
                </p>
                <span
                  style={{
                    display: 'block',
                    textAlign: 'right',
                    marginTop: '0.6rem',
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.15rem',
                    color: 'var(--rose-pink)',
                  }}
                >
                  — Sachin ❤️
                </span>
              </div>

              {/* Action buttons inside carousel */}
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  className="btn-primary"
                  onClick={() => setActiveNickname(nicknames[carouselIndex])}
                  style={{
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.86rem',
                    background: `linear-gradient(135deg, #6D4CC2, ${nicknames[carouselIndex].color})`,
                  }}
                >
                  <span>Open Sacred Story</span>
                  <Sparkles size={14} style={{ marginLeft: 6 }} />
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => setCrownedName(nicknames[carouselIndex].name)}
                  style={{
                    padding: '0.65rem 1.3rem',
                    fontSize: '0.84rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Crown size={14} color="#FFE0A0" />
                  <span>Crown this Name 👑</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
            }}
          >
            <button
              onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : nicknames.length - 1))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(23,16,46,0.85)',
                border: '1px solid rgba(205,187,255,0.3)',
                color: 'var(--warm-ivory)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={16} />
              <span>Previous Amulet</span>
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              {nicknames.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  style={{
                    width: carouselIndex === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: carouselIndex === i ? '#FF83B8' : 'rgba(255,255,255,0.25)',
                    boxShadow: carouselIndex === i ? '0 0 10px #FF83B8' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCarouselIndex((prev) => (prev < nicknames.length - 1 ? prev + 1 : 0))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(23,16,46,0.85)',
                border: '1px solid rgba(205,187,255,0.3)',
                color: 'var(--warm-ivory)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <span>Next Amulet</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─── NICKNAME STORY REVEAL MODAL ─── */}
      <AnimatePresence>
        {activeNickname && (
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNickname(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'radial-gradient(ellipse at center, rgba(23, 13, 46, 0.98) 0%, rgba(6, 4, 15, 0.99) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              className="glass-card-premium"
              initial={{ scale: 0.82, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.82, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '620px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                background: `linear-gradient(145deg, rgba(30, 18, 56, 0.96) 0%, rgba(14, 10, 29, 0.98) 70%, ${activeNickname.color}25 100%)`,
                border: `2px solid ${activeNickname.color}`,
                boxShadow: `0 25px 80px rgba(0,0,0,0.85), 0 0 70px ${activeNickname.color}45`,
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.8rem)',
              }}
            >
              {/* Close Button */}
              <button
                className="btn-close"
                onClick={() => setActiveNickname(null)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--warm-ivory)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              {/* Central Big Amulet Emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                onClick={(e) => triggerThematicBurst(e, activeNickname.name)}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, ${activeNickname.color}55 0%, rgba(23,16,46,0.9) 75%)`,
                  border: `3px solid ${activeNickname.color}`,
                  boxShadow: `0 0 40px ${activeNickname.color}80`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.4rem',
                  margin: '0 auto 1.25rem auto',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                title="Tap to burst love charms"
              >
                {activeNickname.emoji}
              </motion.div>

              <span
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: activeNickname.color,
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.3rem',
                }}
              >
                {nameSubtitles[activeNickname.name] || 'The Sacred Meaning'}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                  color: 'var(--warm-ivory)',
                  marginBottom: '1.25rem',
                }}
              >
                {activeNickname.name}
              </h3>

              {/* Handwritten Story Plaque */}
              <div
                style={{
                  padding: '1.4rem 1.6rem',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `4px solid ${activeNickname.color}`,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '1.6rem',
                  textAlign: 'left',
                  boxShadow: 'inset 0 0 25px rgba(0,0,0,0.3)',
                }}
              >
                <p
                  className="body-lg"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    lineHeight: 1.85,
                    fontStyle: 'italic',
                    color: 'var(--warm-ivory)',
                    fontSize: '1.12rem',
                  }}
                >
                  "{activeNickname.message}"
                </p>

                <p
                  className="signature-text"
                  style={{
                    marginTop: '1.2rem',
                    textAlign: 'right',
                    fontSize: '1.35rem',
                    fontFamily: 'var(--font-script)',
                    color: 'var(--rose-pink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.4rem',
                  }}
                >
                  <span>— Forever Your Sachin</span>
                  <Heart size={16} fill="#FF83B8" color="#FF83B8" />
                </p>
              </div>

              {/* Action Buttons in Modal */}
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  className="btn-primary"
                  onClick={handleWhisper}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.8rem 1.75rem',
                    fontSize: '0.9rem',
                    background: `linear-gradient(135deg, #6D4CC2 0%, ${activeNickname.color} 100%)`,
                    border: 'none',
                    borderRadius: 'var(--radius-xl)',
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 0 20px rgba(109,76,194,0.4)',
                  }}
                >
                  <Volume2 size={17} />
                  <span>Whisper To Me Again ❤️</span>
                </motion.button>

                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCrownedName(activeNickname.name);
                    setActiveNickname(null);
                  }}
                  style={{
                    padding: '0.8rem 1.6rem',
                    fontSize: '0.88rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(23,16,46,0.85)',
                    border: '1.5px solid var(--champagne-gold)',
                    borderRadius: 'var(--radius-xl)',
                    color: 'var(--warm-ivory)',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(255,224,160,0.3)',
                  }}
                >
                  <Crown size={16} color="var(--champagne-gold)" fill="var(--champagne-gold)" />
                  <span>Crown as My Favorite 👑</span>
                </motion.button>
              </div>

              {/* Animated Whisper Soundwave & Audio Toast */}
              <AnimatePresence>
                {whisperPulse && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    style={{
                      marginTop: '1.4rem',
                      padding: '0.85rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 224, 160, 0.12)',
                      border: '1px solid rgba(255, 224, 160, 0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    {/* Pulsing Soundwaves */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[15, 25, 35, 20, 40, 25, 35, 18, 30].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [h * 0.4, h, h * 0.4] }}
                          transition={{
                            duration: 0.7 + (i % 3) * 0.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          style={{
                            width: '3px',
                            background: '#FFE0A0',
                            borderRadius: '2px',
                          }}
                        />
                      ))}
                    </div>

                    <p
                      style={{
                        fontSize: '0.94rem',
                        color: 'var(--champagne-gold)',
                        fontStyle: 'italic',
                        fontFamily: 'var(--font-serif)',
                        margin: 0,
                      }}
                    >
                      "Sachin whispers softly into your ear: 'In every lifetime, across every galaxy... you will always be my {activeNickname.name}...' ✨"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PROGRESSION LINK TO CHAPTER 07 ─── */}
      <motion.div
        whileHover={{ y: 4 }}
        style={{ zIndex: 10, textAlign: 'center', marginTop: '2.5rem' }}
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
            gap: '0.4rem',
            fontSize: '0.88rem',
            opacity: 0.85,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
        >
          <span style={{ color: 'var(--champagne-gold)', fontWeight: 500 }}>
            Continue to: The Garden of Feelings 🌸
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} color="#FFE0A0" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
