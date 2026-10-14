import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  MapPin,
  Heart,
  ChevronRight,
  ChevronLeft,
  Wand2,
  ChevronDown,
  Star,
  Check,
  Eye,
  Send,
} from 'lucide-react';
import { fantasyLocations } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 09 — If I Could Give You the World (Ultra-Attractive Masterpiece Edition)
 *
 * An interactive celestial atlas of 6 breathtaking dream sanctuaries Sachin would build
 * across the cosmos exclusively for Samithra.
 *
 * Features:
 * - 6 dynamic dream sanctuaries with custom atmospheric particle simulations
 * - Interactive "Walk Hand in Hand Here" cinematic exploration simulation
 * - "Illuminate This Realm ✨" blessing with live Explorer Beacon status
 * - Quick "Prev Sanctuary" / "Next Sanctuary" travel controls
 * - Golden Realm Explorer Crown ceremony when all 6 sanctuaries are visited
 * - Deep romantic prose with Sachin's signature calligraphy and starlight aura
 */

export default function FantasyWorld() {
  const [activeLocationId, setActiveLocationId] = useState(fantasyLocations[0].id);
  const [visitedRealms, setVisitedRealms] = useState(new Set([fantasyLocations[0].id]));
  const [illuminatedRealms, setIlluminatedRealms] = useState(new Set());
  const [exploringRealm, setExploringRealm] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState([]);

  const activeIndex = fantasyLocations.findIndex((loc) => loc.id === activeLocationId);
  const activeLocation = fantasyLocations[activeIndex] || fantasyLocations[0];

  // Thematic ambient symbols for each sanctuary
  const sanctuaryThemes = {
    castle: {
      tag: 'Kingdom of Endless Sunsets',
      particles: ['☁️', '🏰', '✨', '👑', '🌅'],
      accentLight: 'rgba(205, 187, 255, 0.4)',
    },
    garden: {
      tag: 'Sanctuary of Fragrant Devotion',
      particles: ['🌹', '🌙', '✨', '🌸', '💖'],
      accentLight: 'rgba(255, 131, 184, 0.45)',
    },
    bridge: {
      tag: 'The Eternal Golden Connection',
      particles: ['🌉', '⭐', '✨', '💛', '🌟'],
      accentLight: 'rgba(255, 224, 160, 0.45)',
    },
    waterfall: {
      tag: 'Stardust Cascades of Dreams',
      particles: ['🌌', '💧', '✨', '🩵', '💫'],
      accentLight: 'rgba(184, 230, 255, 0.45)',
    },
    field: {
      tag: 'Infinite Meadow of Luminous Love',
      particles: ['🌸', '🌷', '✨', '💕', '🌿'],
      accentLight: 'rgba(255, 214, 231, 0.45)',
    },
    observatory: {
      tag: 'Celestial Tower of Shared Memories',
      particles: ['🔭', '🪐', '✨', '💜', '🌟'],
      accentLight: 'rgba(201, 184, 255, 0.45)',
    },
  };

  const currentTheme = sanctuaryThemes[activeLocation.id] || sanctuaryThemes.castle;

  // Trigger floating particle burst on realm interaction
  const triggerSanctuaryBurst = (e, locId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const symbols = sanctuaryThemes[locId]?.particles || ['✨', '💖', '🌟'];
    const newParticles = Array.from({ length: 9 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: originX + (Math.random() - 0.5) * 35,
      y: originY + (Math.random() - 0.5) * 20,
      targetX: (Math.random() - 0.5) * 170,
      targetY: -70 - Math.random() * 85,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: 16 + Math.random() * 12,
    }));

    setFloatingParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1500);
  };

  const handleSelectLocation = (id, e) => {
    if (e) triggerSanctuaryBurst(e, id);
    setActiveLocationId(id);
    const nextVisited = new Set(visitedRealms);
    nextVisited.add(id);
    setVisitedRealms(nextVisited);
  };

  const handleIlluminate = (id, e) => {
    if (e) triggerSanctuaryBurst(e, id);
    const next = new Set(illuminatedRealms);
    next.add(id);
    setIlluminatedRealms(next);
  };

  const handleExploreHandInHand = () => {
    setExploringRealm(true);
    setTimeout(() => setExploringRealm(false), 4200);
  };

  const handlePrevLocation = () => {
    const prevIdx = activeIndex > 0 ? activeIndex - 1 : fantasyLocations.length - 1;
    handleSelectLocation(fantasyLocations[prevIdx].id);
  };

  const handleNextLocation = () => {
    const nextIdx = activeIndex < fantasyLocations.length - 1 ? activeIndex + 1 : 0;
    handleSelectLocation(fantasyLocations[nextIdx].id);
  };

  const scrollToNext = () => {
    const el = document.getElementById('chapter-universe');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const allVisited = visitedRealms.size === fantasyLocations.length;

  return (
    <section
      className="chapter-section bg-midnight-galaxy"
      id="chapter-fantasy"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 6vw, 6rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(35, 14, 52, 0.95) 0%, rgba(8, 6, 22, 0.99) 80%)',
      }}
    >
      <FloatingPetals count={12} />

      {/* ─── DYNAMIC FLOATING PARTICLES ─── */}
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

      {/* Ambient Starlight Nebula Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(340px, 65vw, 780px)',
            height: 'clamp(340px, 65vw, 780px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(109,76,194,0.25) 0%, rgba(255,131,184,0.12) 45%, transparent 70%)',
            filter: 'blur(75px)',
          }}
        />
        {/* Floating stardust */}
        {[...Array(28)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 17.1) % 100}%`,
              top: `${(i * 14.3) % 100}%`,
              width: i % 2 === 0 ? '4px' : '2.5px',
              height: i % 2 === 0 ? '4px' : '2.5px',
              borderRadius: '50%',
              background: i % 3 === 0 ? '#FFE0A0' : '#FF83B8',
              boxShadow: i % 3 === 0 ? '0 0 12px #FFE0A0' : '0 0 12px #FF83B8',
              animation: `twinkle ${2.5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite alternate`,
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
          <Compass size={16} color="#FFE0A0" />
          <span>Chapter 09 — If I Could Give You the World</span>
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
        If I Could Give You the World
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
        If I held the keys to all creation, these are the six magical dream realms I would build across the cosmos just for you, Samithra.
        <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--champagne-gold)', marginTop: '0.4rem' }}>
          ✨ Tap any realm to journey there • Illuminate each sanctuary • Walk hand in hand
        </span>
      </motion.p>

      {/* ─── REALM EXPLORATION STATUS BAR ─── */}
      <motion.div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          marginBottom: '2.5rem',
          padding: '0.65rem 1.6rem',
          background: 'rgba(23, 16, 46, 0.85)',
          border: '1.5px solid rgba(205, 187, 255, 0.25)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 10px 35px rgba(0,0,0,0.5)',
          zIndex: 10,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Sparkles size={16} color="var(--champagne-gold)" />
          <span style={{ fontSize: '0.86rem', color: 'var(--warm-ivory)' }}>
            Sanctuaries Visited:{' '}
            <strong style={{ color: 'var(--champagne-gold)' }}>
              {visitedRealms.size} / {fantasyLocations.length}
            </strong>
          </span>

          {/* 6 Sanctuary Beacon Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '6px' }}>
            {fantasyLocations.map((loc) => {
              const isVisited = visitedRealms.has(loc.id);
              const isIllum = illuminatedRealms.has(loc.id);
              return (
                <div
                  key={loc.id}
                  style={{
                    width: '13px',
                    height: '13px',
                    borderRadius: '50%',
                    background: isIllum ? '#FFE0A0' : isVisited ? loc.color : 'rgba(255,255,255,0.12)',
                    border: `1px solid ${isVisited ? loc.color : 'rgba(205,187,255,0.25)'}`,
                    boxShadow: isIllum ? '0 0 10px #FFE0A0' : isVisited ? `0 0 8px ${loc.color}` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  title={loc.name}
                />
              );
            })}
          </div>
        </div>

        {allVisited && (
          <span
            style={{
              color: 'var(--champagne-gold)',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 224, 160, 0.15)',
              padding: '3px 10px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 224, 160, 0.3)',
            }}
          >
            <span>👑</span>
            <span>All Realms Explored!</span>
          </span>
        )}
      </motion.div>

      {/* ─── TWO-COLUMN REALM STAGE ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 360px) 1fr',
          gap: '2rem',
          maxWidth: '1160px',
          width: '100%',
          zIndex: 10,
          marginBottom: '2.5rem',
        }}
        className="fantasy-layout"
      >
        {/* Left Column: Sanctuary Navigation Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <span
            style={{
              fontSize: '0.76rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--champagne-gold)',
              fontWeight: 700,
              marginBottom: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}
          >
            <MapPin size={13} color="var(--champagne-gold)" />
            <span>Sacred Dream Sanctuaries</span>
          </span>

          {fantasyLocations.map((loc, idx) => {
            const isSelected = loc.id === activeLocationId;
            const isIlluminated = illuminatedRealms.has(loc.id);

            return (
              <motion.button
                key={loc.id}
                onClick={(e) => handleSelectLocation(loc.id, e)}
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.1rem',
                  padding: '1.15rem 1.35rem',
                  borderRadius: 'var(--radius-lg)',
                  background: isSelected
                    ? `linear-gradient(135deg, rgba(35, 18, 65, 0.95) 0%, ${loc.color}25 100%)`
                    : 'rgba(23, 16, 46, 0.72)',
                  border: isSelected
                    ? `2px solid ${loc.color}`
                    : '1px solid rgba(205, 187, 255, 0.18)',
                  boxShadow: isSelected
                    ? `0 12px 35px rgba(0,0,0,0.6), 0 0 25px ${loc.color}35`
                    : '0 6px 20px rgba(0,0,0,0.3)',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                }}
              >
                {/* Glowing Icon Orb */}
                <span
                  style={{
                    fontSize: '2rem',
                    flexShrink: 0,
                    filter: isSelected ? `drop-shadow(0 0 12px ${loc.color})` : 'none',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {loc.icon}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.08rem',
                      color: isSelected ? 'var(--warm-ivory)' : 'rgba(255,248,243,0.85)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {loc.name}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      color: isIlluminated
                        ? 'var(--champagne-gold)'
                        : isSelected
                        ? loc.color
                        : 'rgba(205,187,255,0.5)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {isIlluminated ? '✨ Light Awakened' : isSelected ? '🌟 Active Realm' : 'Tap to journey'}
                  </span>
                </div>

                <ChevronRight
                  size={18}
                  style={{
                    color: isSelected ? loc.color : 'rgba(205,187,255,0.35)',
                    transform: isSelected ? 'translateX(4px)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Right Column: Immersive Realm Viewing Window */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLocation.id}
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.97 }}
            transition={{ duration: 0.45 }}
            className="glass-card-premium"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '520px',
              background: activeLocation.bgGradient,
              border: `2px solid ${activeLocation.color}`,
              boxShadow: `0 25px 75px rgba(0,0,0,0.8), 0 0 65px ${activeLocation.color}35`,
              position: 'relative',
              overflow: 'hidden',
              padding: 'clamp(2rem, 4vw, 3.2rem)',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            {/* Ambient Watermark Icon */}
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                fontSize: '12rem',
                opacity: 0.08,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              {activeLocation.icon}
            </div>

            {/* Top Navigation Row: Realm Index & Next/Prev arrows */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: activeLocation.color,
                  fontWeight: 700,
                  background: 'rgba(255,255,255,0.08)',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  border: `1px solid ${activeLocation.color}40`,
                }}
              >
                Realm #{activeIndex + 1} of {fantasyLocations.length} • {currentTheme.tag}
              </span>

              {/* Prev / Next Shortcut Arrows */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handlePrevLocation}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--warm-ivory)',
                    cursor: 'pointer',
                  }}
                  title="Previous Sanctuary"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNextLocation}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--warm-ivory)',
                    cursor: 'pointer',
                  }}
                  title="Next Sanctuary"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Realm Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.4rem' }}>
                <motion.span
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  onClick={(e) => triggerSanctuaryBurst(e, activeLocation.id)}
                  style={{
                    fontSize: '3.4rem',
                    filter: `drop-shadow(0 0 20px ${activeLocation.color})`,
                    cursor: 'pointer',
                  }}
                  title="Tap for realm charm shower"
                >
                  {activeLocation.icon}
                </motion.span>

                <div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: activeLocation.color,
                      fontWeight: 700,
                    }}
                  >
                    Cosmic Sanctuary of Sachin & Samithra
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                      color: 'var(--warm-ivory)',
                      marginTop: '0.2rem',
                    }}
                  >
                    {activeLocation.name}
                  </h3>
                </div>
              </div>

              {/* Romantic Prose Parchment Inset */}
              <div
                style={{
                  padding: '1.5rem 1.7rem',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `4px solid ${activeLocation.color}`,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '1.6rem',
                  boxShadow: 'inset 0 0 25px rgba(0,0,0,0.3)',
                }}
              >
                <p
                  className="body-lg"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.12rem, 1.6vw, 1.3rem)',
                    lineHeight: 1.9,
                    color: 'var(--warm-ivory)',
                    fontStyle: 'italic',
                    textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                  }}
                >
                  "{activeLocation.message}"
                </p>

                <p
                  className="signature-text"
                  style={{
                    textAlign: 'right',
                    fontSize: '1.35rem',
                    color: 'var(--rose-pink)',
                    fontFamily: 'var(--font-script)',
                    marginTop: '1rem',
                  }}
                >
                  — Handcrafted Across the Stars for You by Sachin ❤️
                </p>
              </div>
            </div>

            {/* Interactive Actions Footer */}
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1.4rem',
                borderTop: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              {/* Walk Hand in Hand Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreHandInHand}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-xl)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(205,187,255,0.3)',
                  color: 'var(--warm-ivory)',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
                }}
              >
                <Heart size={16} color="var(--rose-pink)" fill="var(--rose-pink)" />
                <span>Walk Hand in Hand Here 👫</span>
              </motion.button>

              {/* Illuminate Realm Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleIlluminate(activeLocation.id, e)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.75rem 1.6rem',
                  borderRadius: 'var(--radius-xl)',
                  background: illuminatedRealms.has(activeLocation.id)
                    ? 'linear-gradient(135deg, rgba(255,224,160,0.35) 0%, rgba(255,131,184,0.35) 100%)'
                    : 'linear-gradient(135deg, #6D4CC2 0%, #FF83B8 100%)',
                  border: `2px solid ${activeLocation.color}`,
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: illuminatedRealms.has(activeLocation.id)
                    ? `0 0 25px ${activeLocation.color}80`
                    : '0 0 20px rgba(109,76,194,0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Sparkles size={16} color="var(--champagne-gold)" />
                <span>
                  {illuminatedRealms.has(activeLocation.id)
                    ? 'Realm Illuminated ✨'
                    : 'Illuminate This Realm ✨'}
                </span>
              </motion.button>
            </div>

            {/* Hand-in-Hand Cinematic Exploration Modal */}
            <AnimatePresence>
              {exploringRealm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, rgba(20, 10, 42, 0.98) 0%, rgba(6, 4, 16, 0.99) 100%)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem',
                    textAlign: 'center',
                    zIndex: 30,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.8 }}
                    style={{ fontSize: '4rem', marginBottom: '1.2rem' }}
                  >
                    ✨👫✨
                  </motion.div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.8rem',
                      color: 'var(--champagne-gold)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Exploring {activeLocation.name}
                  </h4>
                  <p
                    style={{
                      color: 'var(--warm-ivory)',
                      maxWidth: '460px',
                      lineHeight: 1.85,
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-serif)',
                    }}
                  >
                    "Sachin holds your hand tightly as the warm celestial breeze whispers across the {activeLocation.name}. You both look out at the endless starlight, knowing this universe was created solely to make you smile."
                  </p>
                  <span
                    style={{
                      marginTop: '1.25rem',
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-script)',
                      color: 'var(--rose-pink)',
                    }}
                  >
                    — Holding your hand forever, Sachin ❤️
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── PROGRESSION LINK TO CHAPTER 10 ─── */}
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
            Continue to Chapter 10 — Our Forever Universe 🪐✨
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} color="#FFE0A0" />
          </motion.div>
        </button>
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .fantasy-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
