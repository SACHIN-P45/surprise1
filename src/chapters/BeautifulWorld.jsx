import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Sun, Music, Compass, ChevronDown, Wand2, Moon, Star, Flame } from 'lucide-react';
import { beautifulWorldContent } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 02 — A Beautiful World (Ultra-Luxury Masterpiece Edition)
 * Handcrafted for Sachin & Samithra:
 * - Celestial Welcome Aura greeting Samithra as she enters from Chapter 1
 * - Interactive Universe Perspective Switcher ("The World Before You 🌑" vs "With Samithra ✨")
 * - Illuminated Love Memoir Parchment with filigree gold accents & cursive signoff
 * - 3 Crystal Spheres of Transformation with split-screen before/after comparisons
 * - Interactive Cosmic Heartbeat Pulse with Web Audio heart-thump sound & expanding shockwaves
 * - Shimmering starlight particles and romantic ambient nebula glows
 */
export default function BeautifulWorld() {
  const [magicMode, setMagicMode] = useState(true); // true = 'With Samithra ✨'
  const [activeSphere, setActiveSphere] = useState(0);
  const [heartbeatSent, setHeartbeatSent] = useState(false);
  const [heartBeatsCount, setHeartBeatsCount] = useState(0);
  const [floatingHeartSparks, setFloatingHeartSparks] = useState([]);

  // Synthesize soft audio tones using Web Audio API
  const playSoundEffect = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'heartbeat') {
        // Deep warm dual-beat pulse (lub-dub)
        [0, 0.16].forEach((timeOffset, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(idx === 0 ? 85 : 75, ctx.currentTime + timeOffset);
          osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + timeOffset + 0.18);
          gain.gain.setValueAtTime(0.001, ctx.currentTime + timeOffset);
          gain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + timeOffset + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + timeOffset);
          osc.stop(ctx.currentTime + timeOffset + 0.22);
        });
      } else if (type === 'magic') {
        // Shimmering celestial harp chime
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.65);
        });
      }
    } catch {
      // Audio fallback
    }
  };

  const transformations = [
    {
      id: 0,
      title: 'Ordinary to Pure Magic',
      tag: 'The Realm of Wonder',
      icon: <Sun size={28} color="#FFE0A0" />,
      beforeText: 'The sky was just ordinary blue, and days were just passing hours on a quiet clock.',
      afterText: 'Now, every sunrise feels like a priceless gift and every dusk is painted in your gentle colours.',
      color: '#FFE0A0',
      badgeBg: 'rgba(255, 224, 160, 0.15)',
      gradient: 'linear-gradient(135deg, rgba(255,224,160,0.18) 0%, rgba(109,76,194,0.25) 100%)',
    },
    {
      id: 1,
      title: 'Silence to Sweet Melody',
      tag: 'The Realm of Music',
      icon: <Music size={28} color="#FF83B8" />,
      beforeText: 'The quiet world had no sweet soundtrack or rhythm to make the heart dance.',
      afterText: 'Then your laughter filled the silence — and now every single thought of you is a melody.',
      color: '#FF83B8',
      badgeBg: 'rgba(255, 131, 184, 0.15)',
      gradient: 'linear-gradient(135deg, rgba(255,131,184,0.22) 0%, rgba(109,76,194,0.25) 100%)',
    },
    {
      id: 2,
      title: 'Wanderer to Forever Home',
      tag: 'The Realm of Peace',
      icon: <Compass size={28} color="#CDBBFF" />,
      beforeText: 'Walking through life without knowing where the wandering soul truly belonged.',
      afterText: 'You didn’t just enter my world, Samithra. You became the destination, my forever home.',
      color: '#CDBBFF',
      badgeBg: 'rgba(205, 187, 255, 0.15)',
      gradient: 'linear-gradient(135deg, rgba(205,187,255,0.22) 0%, rgba(255,131,184,0.18) 100%)',
    },
  ];

  const handleHeartbeatClick = (e) => {
    playSoundEffect('heartbeat');
    setHeartbeatSent(true);
    setHeartBeatsCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSpark = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: ['💖', '✨', '🌸', '💓', '🥰'][Math.floor(Math.random() * 5)],
    };
    setFloatingHeartSparks((prev) => [...prev, newSpark]);
    setTimeout(() => {
      setFloatingHeartSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 1500);

    setTimeout(() => setHeartbeatSent(false), 4500);
  };

  const scrollToNext = () => {
    const el = document.getElementById('chapter-birthday');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="chapter-section bg-romantic-sky"
      id="chapter-beautiful-world"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 6vw, 6rem) clamp(1rem, 4vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: magicMode
          ? 'radial-gradient(ellipse at 50% 15%, #2a0c3b 0%, #150628 45%, #080214 100%)'
          : 'radial-gradient(ellipse at 50% 15%, #150f24 0%, #0d0918 50%, #05030a 100%)',
        transition: 'background 0.8s ease',
      }}
    >
      <FloatingPetals count={magicMode ? 14 : 4} />

      {/* ─── AMBIENT COSMIC NEBULA RADIANCE ─── */}
      <motion.div
        animate={
          magicMode
            ? {
                scale: [1, 1.18, 1],
                opacity: [0.38, 0.55, 0.38],
              }
            : { scale: 0.85, opacity: 0.1 }
        }
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(320px, 65vw, 850px)',
          height: 'clamp(320px, 65vw, 850px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,131,184,0.3) 0%, rgba(109,76,194,0.22) 45%, transparent 70%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ─── CELESTIAL WELCOME ARCH (First thing seen after Gate unlocks) ─── */}
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1.25rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 18px',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, rgba(255,224,160,0.12), rgba(255,131,184,0.18), rgba(255,224,160,0.12))',
            border: '1px solid rgba(255,224,160,0.4)',
            fontSize: '0.74rem',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            color: 'var(--champagne-gold)',
            fontWeight: 700,
            boxShadow: '0 0 25px rgba(255, 224, 160, 0.3)',
            marginBottom: '0.75rem',
          }}
        >
          <Sparkles size={13} color="#FFE0A0" />
          <span>The Gates Have Opened • Welcome Samithra</span>
          <Sparkles size={13} color="#FFE0A0" />
        </div>

        <span
          className="chapter-badge"
          style={{
            background: 'rgba(38, 14, 58, 0.85)',
            border: '1px solid rgba(255, 131, 184, 0.45)',
            boxShadow: '0 0 25px rgba(109, 76, 194, 0.35)',
            color: 'var(--warm-ivory)',
            fontSize: '0.82rem',
            padding: '6px 20px',
            borderRadius: '999px',
          }}
        >
          <Heart size={13} color="#FF83B8" fill="#FF83B8" style={{ marginRight: 6 }} />
          A Beautiful World
        </span>
      </motion.div>

      {/* ─── MAIN MASTERPIECE HEADING ─── */}
      <div style={{ maxWidth: '840px', width: '100%', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {magicMode ? (
            <motion.h2
              key="with-samithra"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="heading-lg"
              style={{
                fontFamily: 'var(--font-serif)',
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.25,
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                color: '#FFE0A0',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFE0A0 35%, #FF83B8 75%, #FFE0A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 22px rgba(255, 131, 184, 0.45))',
              }}
            >
              {beautifulWorldContent.heading}
            </motion.h2>
          ) : (
            <motion.h2
              key="before-you"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="heading-lg"
              style={{
                fontFamily: 'var(--font-serif)',
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.25,
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                color: '#CDBBFF',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E2D9F3 40%, #B8A6E4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 15px rgba(109, 76, 194, 0.4))',
              }}
            >
              Before You, The World Was Just Ordinary...
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      <div style={{ maxWidth: '640px', width: '100%', minHeight: '50px', marginBottom: '2rem', zIndex: 10, textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={magicMode ? 'sub-magic' : 'sub-before'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.9, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="body-lg"
            style={{
              margin: 0,
              color: 'var(--soft-lavender)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
              lineHeight: 1.7,
            }}
          >
            {magicMode
              ? 'A heartfelt love letter on how your presence turned an ordinary universe into an endless canvas of light, laughter, and romance.'
              : 'The days were passing quietly, skies were just blue, and silence had no melody... until you walked into Sachin’s life.'}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ─── DYNAMIC PERSPECTIVE SWITCHER (Before You vs With Samithra) ─── */}
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          marginBottom: '2.5rem',
          padding: '0.45rem 0.6rem 0.45rem 1.1rem',
          background: 'rgba(23, 14, 46, 0.82)',
          border: '1.5px solid rgba(255, 224, 160, 0.38)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 10px 35px rgba(0,0,0,0.5)',
          zIndex: 10,
          backdropFilter: 'blur(16px)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Wand2 size={16} color="var(--champagne-gold)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--warm-ivory)', fontWeight: 600 }}>
            Perspective:
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.35rem',
            background: 'rgba(10, 4, 20, 0.45)',
            padding: '3px',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <button
            onClick={() => {
              setMagicMode(false);
            }}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-xl)',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: !magicMode ? '#FFFFFF' : 'rgba(255,248,243,0.5)',
              background: !magicMode ? 'rgba(109,76,194,0.65)' : 'transparent',
              border: !magicMode ? '1px solid rgba(205,187,255,0.4)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            The World Before You 🌑
          </button>

          <button
            onClick={() => {
              setMagicMode(true);
              playSoundEffect('magic');
            }}
            style={{
              padding: '0.45rem 1.25rem',
              borderRadius: 'var(--radius-xl)',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: magicMode ? '#0B0B20' : 'rgba(255,248,243,0.5)',
              background: magicMode ? 'linear-gradient(135deg, #FFE0A0, #FF83B8)' : 'transparent',
              border: 'none',
              boxShadow: magicMode ? '0 0 20px rgba(255,131,184,0.6)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            With Samithra ✨
          </button>
        </div>
      </motion.div>

      {/* ─── MAIN QUOTE & ILLUMINATED LOVE MEMOIR PARCHMENT ─── */}
      <motion.div
        className="glass-card-premium"
        style={{
          maxWidth: '880px',
          width: '100%',
          position: 'relative',
          padding: 'clamp(2.2rem, 5vw, 3.8rem)',
          borderRadius: '32px',
          border: magicMode
            ? '1.5px solid rgba(255, 224, 160, 0.48)'
            : '1.5px solid rgba(205, 187, 255, 0.2)',
          background: magicMode
            ? 'linear-gradient(145deg, rgba(30, 16, 56, 0.94) 0%, rgba(48, 18, 72, 0.9) 50%, rgba(22, 12, 44, 0.96) 100%)'
            : 'linear-gradient(145deg, rgba(20, 14, 34, 0.9) 0%, rgba(14, 8, 24, 0.92) 100%)',
          boxShadow: magicMode
            ? '0 25px 85px rgba(0,0,0,0.75), 0 0 90px rgba(255,131,184,0.25), inset 0 1px 1px rgba(255,255,255,0.2)'
            : '0 20px 50px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(28px)',
          transition: 'all 0.6s ease',
          zIndex: 10,
          marginBottom: '3rem',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
      >
        {/* Subtle Corner Filigree Accents */}
        <div style={{ position: 'absolute', top: '1.2rem', left: '1.5rem', color: '#FFE0A0', opacity: 0.65, fontSize: '0.9rem', pointerEvents: 'none' }}>✧</div>
        <div style={{ position: 'absolute', top: '1.2rem', right: '1.5rem', color: '#FFE0A0', opacity: 0.65, fontSize: '0.9rem', pointerEvents: 'none' }}>✧</div>

        {/* Ambient Top Radiant Flare */}
        {magicMode && (
          <div
            style={{
              position: 'absolute',
              top: '-25%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '360px',
              height: '220px',
              background: 'radial-gradient(circle, rgba(255, 131, 184, 0.25) 0%, rgba(255, 224, 160, 0.15) 50%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        {/* Big Watermark Quote Mark */}
        <div
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '2.2rem',
            fontFamily: 'var(--font-serif)',
            fontSize: '7rem',
            lineHeight: 1,
            color: 'rgba(255,224,160,0.08)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          “
        </div>

        {/* Narrative Memoir Paragraphs */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {beautifulWorldContent.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="body-lg"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.08rem, 1.6vw, 1.35rem)',
                lineHeight: 1.95,
                color: magicMode ? 'var(--warm-ivory)' : 'rgba(255,248,243,0.7)',
                transition: 'color 0.5s ease',
                margin: 0,
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Highlighted Rose-Gold Plaque */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: '2.25rem',
            padding: '1.35rem 1.85rem',
            background: magicMode
              ? 'linear-gradient(135deg, rgba(109,76,194,0.35) 0%, rgba(255,131,184,0.22) 100%)'
              : 'rgba(255,255,255,0.04)',
            borderRadius: '20px',
            borderLeft: '4px solid var(--rose-pink)',
            borderRight: '1px solid rgba(255,131,184,0.25)',
            borderTop: '1px solid rgba(255,224,160,0.2)',
            borderBottom: '1px solid rgba(255,224,160,0.2)',
            boxShadow: magicMode ? '0 10px 35px rgba(109,76,194,0.3), inset 0 0 20px rgba(255,131,184,0.1)' : 'none',
            transition: 'all 0.5s ease',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
              fontStyle: 'italic',
              color: 'var(--rose-pink)',
              lineHeight: 1.6,
              fontWeight: 600,
              margin: 0,
            }}
          >
            "{beautifulWorldContent.highlight}"
          </p>
        </motion.div>

        {/* Signature & Heartfelt Dedication Line */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2.25rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(205,187,255,0.16)',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '0.88rem', color: 'rgba(255,248,243,0.6)', fontStyle: 'italic' }}>
            Written with all my heart for Samithra
          </span>

          <p
            className="signature-text"
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
              color: 'var(--rose-pink)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{beautifulWorldContent.signature}</span>
          </p>
        </div>
      </motion.div>

      {/* ─── 3 INTERACTIVE CRYSTAL SPHERES OF TRANSFORMATION ─── */}
      <div style={{ maxWidth: '880px', width: '100%', zIndex: 10, marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 224, 160, 0.12)',
              border: '1px solid rgba(255, 224, 160, 0.3)',
              fontSize: '0.74rem',
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
              color: 'var(--champagne-gold)',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            <span>✦ 3 Realities You Transformed Forever ✦</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.95rem)',
              color: 'var(--warm-ivory)',
              margin: '0.2rem 0',
              fontWeight: 700,
            }}
          >
            Touch Each Crystal to Experience the Magic
          </h3>
        </div>

        {/* 3 Interactive Tab Crystal Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          {transformations.map((item) => {
            const isSelected = activeSphere === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveSphere(item.id);
                  playSoundEffect('magic');
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.95rem',
                  padding: '1.1rem 1.35rem',
                  borderRadius: '22px',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(109,76,194,0.45) 0%, rgba(255,131,184,0.3) 100%)'
                    : 'rgba(23, 14, 46, 0.65)',
                  border: isSelected
                    ? `1.5px solid ${item.color}`
                    : '1px solid rgba(205,187,255,0.18)',
                  boxShadow: isSelected
                    ? `0 10px 35px rgba(109,76,194,0.35), 0 0 25px ${item.color}30`
                    : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: isSelected ? 'rgba(0,0,0,0.35)' : item.badgeBg,
                    border: `1.5px solid ${isSelected ? item.color : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isSelected ? `0 0 20px ${item.color}` : 'none',
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: isSelected ? 'var(--warm-ivory)' : 'rgba(255,248,243,0.75)',
                      margin: '0 0 2px 0',
                    }}
                  >
                    {item.title}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: isSelected ? item.color : 'rgba(205,187,255,0.5)',
                    }}
                  >
                    {isSelected ? '✨ Active Reality' : 'Tap to reveal'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Transformation Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSphere}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-card-premium"
            style={{
              padding: 'clamp(1.5rem, 4vw, 2.2rem)',
              borderRadius: '26px',
              background: transformations[activeSphere].gradient,
              border: `1.5px solid ${transformations[activeSphere].color}60`,
              boxShadow: `0 15px 45px rgba(0,0,0,0.6), 0 0 45px ${transformations[activeSphere].color}20`,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                textAlign: 'left',
              }}
            >
              {/* The World Before You */}
              <div
                style={{
                  padding: '1.25rem 1.4rem',
                  background: 'rgba(10, 4, 20, 0.5)',
                  borderRadius: '18px',
                  borderLeft: '4px solid rgba(205,187,255,0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.45rem' }}>
                  <Moon size={14} color="rgba(205,187,255,0.7)" />
                  <span
                    style={{
                      fontSize: '0.74rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,248,243,0.55)',
                      fontWeight: 700,
                    }}
                  >
                    The World Before You:
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.96rem',
                    color: 'rgba(255,248,243,0.75)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                >
                  "{transformations[activeSphere].beforeText}"
                </p>
              </div>

              {/* The World With You */}
              <div
                style={{
                  padding: '1.25rem 1.4rem',
                  background: 'rgba(255,131,184,0.14)',
                  borderRadius: '18px',
                  borderLeft: `4px solid ${transformations[activeSphere].color}`,
                  border: `1px solid ${transformations[activeSphere].color}40`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.45rem' }}>
                  <Sparkles size={14} color={transformations[activeSphere].color} />
                  <span
                    style={{
                      fontSize: '0.74rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: transformations[activeSphere].color,
                      fontWeight: 700,
                    }}
                  >
                    With You, Samithra:
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '1.02rem',
                    color: 'var(--warm-ivory)',
                    fontWeight: 500,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  "{transformations[activeSphere].afterText}"
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── INTERACTIVE COSMIC HEARTBEAT TELEPATHY PULSE ─── */}
      <div style={{ textAlign: 'center', zIndex: 10, marginBottom: '2.5rem', position: 'relative' }}>
        <motion.button
          onClick={handleHeartbeatClick}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          style={{
            padding: '1rem 2.4rem',
            borderRadius: 'var(--radius-xl)',
            background: heartbeatSent
              ? 'linear-gradient(135deg, rgba(255,105,180,0.5), rgba(170,59,255,0.5))'
              : 'linear-gradient(135deg, rgba(35, 18, 62, 0.9), rgba(58, 20, 84, 0.85))',
            border: heartbeatSent ? '1.5px solid var(--rose-pink)' : '1.5px solid rgba(255,131,184,0.5)',
            boxShadow: heartbeatSent
              ? '0 0 40px rgba(255,131,184,0.7), 0 8px 30px rgba(0,0,0,0.6)'
              : '0 8px 30px rgba(0,0,0,0.4), 0 0 25px rgba(255,131,184,0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--warm-ivory)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
          }}
        >
          {/* Animated Beating Heart Icon */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1, 1.25, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut',
            }}
          >
            <Heart size={20} color="var(--rose-pink)" fill="var(--rose-pink)" />
          </motion.div>

          <span>
            {heartbeatSent
              ? `Heartbeat Received! (${heartBeatsCount} Sent) ❤️`
              : 'Send a Heartbeat Pulse to Sachin'}
          </span>
        </motion.button>

        {/* Floating Tap Sparkles */}
        {floatingHeartSparks.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0.8, y: 0 }}
            animate={{ opacity: 0, scale: 2.2, y: -80, x: Math.random() * 40 - 20 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              pointerEvents: 'none',
              fontSize: '1.6rem',
              zIndex: 100,
            }}
          >
            {s.emoji}
          </motion.div>
        ))}

        <AnimatePresence>
          {heartbeatSent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                marginTop: '1rem',
                padding: '0.6rem 1.4rem',
                borderRadius: '999px',
                background: 'rgba(255, 131, 184, 0.15)',
                border: '1px solid rgba(255, 131, 184, 0.35)',
                display: 'inline-block',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: 'var(--champagne-gold)',
                  fontStyle: 'italic',
                }}
              >
                "Across every distance and star, my heart beats in sync with yours, Samithra. ❤️"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── PROGRESSION ARROW TO CHAPTER 3 ─── */}
      <motion.div
        whileHover={{ y: 3 }}
        style={{ zIndex: 10, textAlign: 'center' }}
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
            gap: '0.35rem',
            fontSize: '0.85rem',
            opacity: 0.85,
            transition: 'opacity 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
        >
          <span>Continue to Birthday Celebration</span>
          <ChevronDown size={18} />
        </button>
      </motion.div>
    </section>
  );
}
