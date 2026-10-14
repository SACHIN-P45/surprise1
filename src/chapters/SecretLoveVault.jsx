import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  KeyRound,
  Lock,
  Unlock,
  Sparkles,
  X,
  Heart,
  Gift,
  Mail,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { vaultSecrets } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 08 — The Secret Love Vault (Ultra-Attractive Masterpiece Edition)
 *
 * A royal celestial treasury holding 4 locked romantic treasures reserved exclusively
 * for Samithra.
 *
 * Features:
 * - 4 interactive 3D-feeling magical relics with distinct jewelry glows & orbital rune rings
 * - Interactive lock-break ceremony with physics-based thematic sparkle bursts
 * - 4 glowing jewel socket vault meter that illuminates as relics are unlocked
 * - Grand Master Key of Eternity ceremony when all 4 relics are solved
 * - Ancient parchment oath modal with wax-stamp animation & in-modal Prev/Next navigation
 * - "Seal in My Heart" royal seal badge
 */

export default function SecretLoveVault() {
  const [unlockedIds, setUnlockedIds] = useState(new Set(['envelope'])); // 1 unlocked as alluring preview
  const [activeSecret, setActiveSecret] = useState(null);
  const [bonusUnlocked, setBonusUnlocked] = useState(false);
  const [sealedPledges, setSealedPledges] = useState(new Set());
  const [floatingParticles, setFloatingParticles] = useState([]);

  const relicThemes = {
    envelope: {
      color: '#FF83B8',
      glow: 'rgba(255,131,184,0.65)',
      gemColor: '#FF4D94',
      bg: 'linear-gradient(135deg, rgba(42, 11, 34, 0.95) 0%, rgba(82, 21, 65, 0.85) 50%, rgba(125, 28, 99, 0.9) 100%)',
      subtitle: 'The Handwritten Confession • Pure Vulnerability',
      iconEmoji: '💌',
      badgeText: 'Velvet Sealed Letter',
      particles: ['💌', '💖', '✨', '🌸', '💕'],
    },
    gift: {
      color: '#FFE0A0',
      glow: 'rgba(255,224,160,0.65)',
      gemColor: '#FFB800',
      bg: 'linear-gradient(135deg, rgba(43, 24, 7, 0.95) 0%, rgba(82, 46, 12, 0.85) 50%, rgba(125, 72, 20, 0.9) 100%)',
      subtitle: 'The Birthday Vow • An Eternal Promise',
      iconEmoji: '🎁',
      badgeText: 'Golden Treasure Chest',
      particles: ['🎁', '👑', '✨', '💛', '🌟'],
    },
    heart: {
      color: '#FFD6E7',
      glow: 'rgba(255,214,231,0.7)',
      gemColor: '#FF83B8',
      bg: 'linear-gradient(135deg, rgba(42, 9, 29, 0.95) 0%, rgba(84, 17, 57, 0.85) 50%, rgba(130, 27, 88, 0.9) 100%)',
      subtitle: 'The Sweetest Truth • Soul to Soul',
      iconEmoji: '💖',
      badgeText: 'Crystal Eternal Heart',
      particles: ['💖', '💎', '✨', '🌹', '❤️'],
    },
    star: {
      color: '#CDBBFF',
      glow: 'rgba(205,187,255,0.7)',
      gemColor: '#9D7BFF',
      bg: 'linear-gradient(135deg, rgba(16, 11, 46, 0.95) 0%, rgba(33, 21, 89, 0.85) 50%, rgba(54, 34, 143, 0.9) 100%)',
      subtitle: 'A Starlight Compliment • Cosmic Devotion',
      iconEmoji: '⭐',
      badgeText: 'Cosmic Star Relic',
      particles: ['⭐', '💫', '✨', '🌙', '🌟'],
    },
  };

  // Trigger floating particle burst on unlock
  const triggerRelicBurst = (e, relicType) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const symbols = relicThemes[relicType]?.particles || ['✨', '💖', '🗝️'];
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

  const handleUnlock = (secret, e) => {
    if (e) triggerRelicBurst(e, secret.type);
    const nextSet = new Set(unlockedIds);
    nextSet.add(secret.id);
    setUnlockedIds(nextSet);
    setActiveSecret(secret);

    if (nextSet.size === vaultSecrets.length) {
      setBonusUnlocked(true);
    }
  };

  const handleUnlockAll = () => {
    const allIds = new Set(vaultSecrets.map((s) => s.id));
    setUnlockedIds(allIds);
    setBonusUnlocked(true);
  };

  const toggleSealPledge = (id) => {
    const next = new Set(sealedPledges);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSealedPledges(next);
  };

  const scrollToNext = () => {
    const el = document.getElementById('chapter-fantasy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSecretIndex = activeSecret ? vaultSecrets.findIndex((s) => s.id === activeSecret.id) : 0;

  return (
    <section
      className="chapter-section bg-vault"
      id="chapter-vault"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 6vw, 6rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(38, 14, 52, 0.95) 0%, rgba(10, 8, 24, 0.99) 80%)',
      }}
    >
      <FloatingPetals count={14} />

      {/* ─── DYNAMIC FLOATING PARTICLES (ON UNLOCK) ─── */}
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

      {/* Ambient Treasury Aura */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(340px, 65vw, 750px)',
            height: 'clamp(340px, 65vw, 750px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(109,76,194,0.22) 0%, rgba(255,224,160,0.1) 45%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Floating golden stardust */}
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 19.3) % 100}%`,
              top: `${(i * 17.7) % 100}%`,
              width: i % 2 === 0 ? '4px' : '2.5px',
              height: i % 2 === 0 ? '4px' : '2.5px',
              borderRadius: '50%',
              background: '#FFE0A0',
              boxShadow: '0 0 12px #FFE0A0',
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
          <KeyRound size={16} color="#FFE0A0" />
          <span>Chapter 08 — The Secret Love Vault</span>
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
          filter: 'drop-shadow(0 4px 15px rgba(255, 224, 160, 0.25))',
        }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        The Secret Love Vault
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
        Behind these four mystical seals lie sacred words reserved exclusively for you, Samithra. Touch each relic to break its seal.
        <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--champagne-gold)', marginTop: '0.4rem' }}>
          🗝️ Unlock all 4 relics to summon the Master Key of Sachin's Heart
        </span>
      </motion.p>

      {/* ─── LIVE VAULT STATUS & 4 JEWEL SOCKETS METER ─── */}
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
          <ShieldCheck size={17} color="var(--champagne-gold)" />
          <span style={{ fontSize: '0.86rem', color: 'var(--warm-ivory)' }}>
            Treasures Unlocked:{' '}
            <strong style={{ color: 'var(--champagne-gold)' }}>
              {unlockedIds.size} / {vaultSecrets.length}
            </strong>
          </span>

          {/* 4 Jewel Socket Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '6px' }}>
            {vaultSecrets.map((s) => {
              const isUnlocked = unlockedIds.has(s.id);
              const theme = relicThemes[s.type];
              return (
                <div
                  key={s.id}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: isUnlocked ? theme.gemColor : 'rgba(255,255,255,0.1)',
                    border: isUnlocked ? `1.5px solid ${theme.color}` : '1px solid rgba(205,187,255,0.25)',
                    boxShadow: isUnlocked ? `0 0 10px ${theme.glow}` : 'none',
                    transition: 'all 0.4s ease',
                  }}
                  title={isUnlocked ? `${s.title} (Unlocked)` : `${s.title} (Locked)`}
                />
              );
            })}
          </div>
        </div>

        {unlockedIds.size < vaultSecrets.length && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnlockAll}
            style={{
              fontSize: '0.78rem',
              color: '#0B0B20',
              background: 'linear-gradient(135deg, #FFE0A0, #FF83B8)',
              border: 'none',
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: 'var(--radius-xl)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 0 15px rgba(255,224,160,0.4)',
            }}
          >
            <KeyRound size={13} />
            <span>Unlock All Relics ✨</span>
          </motion.button>
        )}
      </motion.div>

      {/* ─── 4 MAGICAL RELIC PEDESTALS GRID ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.6rem',
          maxWidth: '1120px',
          width: '100%',
          zIndex: 10,
          marginBottom: '2.5rem',
        }}
      >
        {vaultSecrets.map((secret, idx) => {
          const isUnlocked = unlockedIds.has(secret.id);
          const theme = relicThemes[secret.type] || relicThemes.star;

          return (
            <motion.div
              key={secret.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => handleUnlock(secret, e)}
              className="glass-card-premium"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2.4rem 1.5rem 2rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: isUnlocked
                  ? `2px solid ${theme.color}`
                  : '1.5px solid rgba(205,187,255,0.22)',
                background: isUnlocked
                  ? `linear-gradient(150deg, rgba(30, 18, 56, 0.95) 0%, rgba(14, 10, 29, 0.98) 60%, ${theme.color}22 100%)`
                  : 'linear-gradient(150deg, rgba(20, 14, 40, 0.85) 0%, rgba(10, 8, 22, 0.92) 100%)',
                boxShadow: isUnlocked
                  ? `0 18px 45px rgba(0,0,0,0.7), 0 0 40px ${theme.glow}, inset 0 0 20px ${theme.color}20`
                  : '0 12px 35px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.35s ease',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Light Sheen Reflection on Unlocked Relics */}
              {isUnlocked && (
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
              )}

              {/* Status Lock/Unlock Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '0.85rem',
                  right: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.72rem',
                  padding: '4px 10px',
                  borderRadius: '14px',
                  background: isUnlocked ? 'rgba(255,224,160,0.22)' : 'rgba(255,255,255,0.06)',
                  border: isUnlocked ? '1px solid #FFE0A0' : '1px solid rgba(255,255,255,0.1)',
                  color: isUnlocked ? 'var(--champagne-gold)' : 'rgba(205,187,255,0.5)',
                  fontWeight: 700,
                  boxShadow: isUnlocked ? '0 0 12px rgba(255,224,160,0.4)' : 'none',
                }}
              >
                {isUnlocked ? (
                  <>
                    <Unlock size={12} color="var(--champagne-gold)" />
                    <span>Unlocked</span>
                  </>
                ) : (
                  <>
                    <Lock size={12} />
                    <span>Sealed</span>
                  </>
                )}
              </div>

              {/* Glowing 3D Relic Sphere */}
              <motion.div
                animate={
                  isUnlocked
                    ? { rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }
                    : { y: [0, -5, 0] }
                }
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  background: isUnlocked
                    ? `radial-gradient(circle at 35% 35%, ${theme.color}55 0%, rgba(25, 14, 48, 0.95) 85%)`
                    : 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08) 0%, rgba(18, 12, 34, 0.9) 85%)',
                  border: isUnlocked
                    ? `2.5px solid ${theme.color}`
                    : '1.5px dashed rgba(205,187,255,0.3)',
                  boxShadow: isUnlocked
                    ? `0 0 35px ${theme.glow}, inset 0 0 18px ${theme.color}40`
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.8rem',
                  marginBottom: '1.25rem',
                  userSelect: 'none',
                  position: 'relative',
                }}
              >
                {/* Rotating Starlight Ring if unlocked */}
                {isUnlocked && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: -6,
                      borderRadius: '50%',
                      border: `1px dashed ${theme.color}70`,
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <span>{theme.iconEmoji}</span>
              </motion.div>

              <span
                style={{
                  fontSize: '0.74rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isUnlocked ? theme.color : 'rgba(205,187,255,0.5)',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}
              >
                {theme.badgeText}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--warm-ivory)',
                  marginBottom: '0.35rem',
                }}
              >
                {secret.title}
              </h3>

              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(255,248,243,0.7)',
                  lineHeight: 1.5,
                  marginBottom: '1.4rem',
                  fontStyle: 'italic',
                }}
              >
                {theme.subtitle}
              </p>

              {/* Bottom Action Pill */}
              <div
                style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.82rem',
                  padding: '5px 14px',
                  borderRadius: '16px',
                  background: isUnlocked ? 'rgba(255,131,184,0.18)' : 'rgba(255,224,160,0.15)',
                  border: isUnlocked ? '1px solid rgba(255,131,184,0.4)' : '1px solid rgba(255,224,160,0.3)',
                  color: isUnlocked ? 'var(--rose-pink)' : 'var(--champagne-gold)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                {isUnlocked ? (
                  <>
                    <Sparkles size={13} />
                    <span>READ SECRET 💌</span>
                  </>
                ) : (
                  <>
                    <KeyRound size={13} />
                    <span>BREAK SEAL 🔓</span>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── MASTER CEREMONY: THE MASTER KEY OF ETERNITY ─── */}
      <AnimatePresence>
        {bonusUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card-premium"
            style={{
              maxWidth: '780px',
              width: '100%',
              marginBottom: '2.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255,224,160,0.6)',
              boxShadow: '0 25px 85px rgba(0,0,0,0.85), 0 0 75px rgba(255,224,160,0.35)',
              padding: 'clamp(2rem, 5vw, 3.2rem)',
              borderRadius: 'var(--radius-xl)',
              background: 'radial-gradient(circle at 50% 20%, rgba(45, 20, 65, 0.95) 0%, rgba(14, 10, 30, 0.98) 80%)',
            }}
          >
            {/* Pulsing 3D Golden Key Emblem */}
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 78,
                height: 78,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,224,160,0.4) 0%, rgba(23,16,46,0.9) 75%)',
                border: '2.5px solid var(--champagne-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 0 35px rgba(255,224,160,0.7)',
              }}
            >
              <KeyRound size={42} color="var(--champagne-gold)" />
            </motion.div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
                color: 'var(--champagne-gold)',
                marginBottom: '0.85rem',
              }}
            >
              The Master Key to Sachin's Entire Heart
            </h3>

            <p
              className="body-lg"
              style={{
                color: 'var(--warm-ivory)',
                marginBottom: '1.4rem',
                lineHeight: 1.85,
                fontSize: 'clamp(0.98rem, 1.4vw, 1.15rem)',
              }}
            >
              "You have unsealed all four chambers of this vault, Samithra. But the greatest truth was never locked away: you hold the master key to my whole heart, today and across every tomorrow."
            </p>

            <p
              className="signature-text"
              style={{
                fontSize: '1.45rem',
                color: 'var(--rose-pink)',
                fontFamily: 'var(--font-script)',
              }}
            >
              — Handcrafted with all my devotion, Sachin ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SINGLE SECRET MODAL (ANCIENT OATH SCROLL WITH PREV/NEXT) ─── */}
      <AnimatePresence>
        {activeSecret && (
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSecret(null)}
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
              initial={{ scale: 0.84, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.84, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                border: `2px solid ${relicThemes[activeSecret.type]?.color || '#FFE0A0'}`,
                boxShadow: `0 25px 80px rgba(0,0,0,0.85), 0 0 65px ${relicThemes[activeSecret.type]?.glow || 'rgba(255,224,160,0.3)'}`,
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.6rem)',
                background: 'linear-gradient(150deg, rgba(32, 18, 60, 0.96) 0%, rgba(14, 10, 29, 0.98) 70%, rgba(45, 20, 65, 0.92) 100%)',
              }}
            >
              {/* Close Button */}
              <button
                className="btn-close"
                onClick={() => setActiveSecret(null)}
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

              {/* Big Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                onClick={(e) => triggerRelicBurst(e, activeSecret.type)}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, ${relicThemes[activeSecret.type]?.color || '#FFE0A0'}50 0%, rgba(23,16,46,0.9) 75%)`,
                  border: `2.5px solid ${relicThemes[activeSecret.type]?.color || '#FFE0A0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.4rem',
                  margin: '0 auto 1.15rem auto',
                  boxShadow: `0 0 35px ${relicThemes[activeSecret.type]?.glow || 'rgba(255,224,160,0.5)'}`,
                  cursor: 'pointer',
                }}
                title="Tap for sparkle burst"
              >
                {relicThemes[activeSecret.type]?.iconEmoji || '💌'}
              </motion.div>

              <span
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: relicThemes[activeSecret.type]?.color || 'var(--rose-pink)',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.3rem',
                }}
              >
                {activeSecret.label}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)',
                  color: 'var(--warm-ivory)',
                  marginBottom: '1.25rem',
                }}
              >
                {activeSecret.title}
              </h3>

              {/* Inscription Scroll Plaque */}
              <div
                style={{
                  padding: '1.5rem 1.6rem',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `4px solid ${relicThemes[activeSecret.type]?.color || '#FFE0A0'}`,
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
                    fontSize: '1.15rem',
                  }}
                >
                  "{activeSecret.message}"
                </p>

                <p
                  className="signature-text"
                  style={{
                    textAlign: 'right',
                    marginTop: '1.1rem',
                    fontSize: '1.3rem',
                    fontFamily: 'var(--font-script)',
                    color: 'var(--rose-pink)',
                  }}
                >
                  — Forever Yours, Sachin ❤️
                </p>
              </div>

              {/* Action Buttons: Prev, Seal In Heart, Next */}
              <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    const prevIdx = currentSecretIndex > 0 ? currentSecretIndex - 1 : vaultSecrets.length - 1;
                    const prevSecret = vaultSecrets[prevIdx];
                    setUnlockedIds((prev) => new Set([...prev, prevSecret.id]));
                    setActiveSecret(prevSecret);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.84rem',
                    padding: '0.6rem 1.1rem',
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                {/* Seal in My Heart Button */}
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSealPledge(activeSecret.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                    padding: '0.65rem 1.4rem',
                    background: sealedPledges.has(activeSecret.id)
                      ? 'linear-gradient(135deg, #FF83B8, #6D4CC2)'
                      : `linear-gradient(135deg, #6D4CC2 0%, ${relicThemes[activeSecret.type]?.color || '#FFE0A0'} 100%)`,
                    border: 'none',
                    borderRadius: 'var(--radius-xl)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    boxShadow: '0 0 20px rgba(109,76,194,0.4)',
                    cursor: 'pointer',
                  }}
                >
                  <Heart
                    size={16}
                    fill={sealedPledges.has(activeSecret.id) ? '#FFFFFF' : 'none'}
                    color="#FFFFFF"
                  />
                  <span>
                    {sealedPledges.has(activeSecret.id)
                      ? 'Sealed into My Heart 💖'
                      : 'Seal into My Heart'}
                  </span>
                </motion.button>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    const nextIdx = currentSecretIndex < vaultSecrets.length - 1 ? currentSecretIndex + 1 : 0;
                    const nextSecret = vaultSecrets[nextIdx];
                    setUnlockedIds((prev) => new Set([...prev, nextSecret.id]));
                    setActiveSecret(nextSecret);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.84rem',
                    padding: '0.6rem 1.1rem',
                  }}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PROGRESSION LINK TO CHAPTER 09 ─── */}
      <motion.div
        whileHover={{ y: 4 }}
        style={{ zIndex: 10, textAlign: 'center', marginTop: '3rem' }}
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
            Continue to Chapter 09 — If I Could Give You the World 🏰✨
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
