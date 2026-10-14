import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Orbit,
  Heart,
  Star,
  ChevronDown,
  Wand2,
  Crown,
  Compass,
} from 'lucide-react';
import { foreverUniverse } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 10 — Our Forever Universe (Fully Mobile-Responsive Masterpiece Edition)
 *
 * An interactive, cinematic celestial observatory engineered to adapt seamlessly
 * from narrow mobile viewports (320px) up to ultra-wide 4K displays.
 */

export default function ForeverUniverse() {
  const [activeStar, setActiveStar] = useState('both'); // 'sachin' | 'samithra' | 'both'
  const [activeNode, setActiveNode] = useState(null);
  const [illuminatedNodes, setIlluminatedNodes] = useState(new Set([1, 2, 3, 4, 5])); // Pre-connected for magnificent first sight
  const [cosmicPulse, setCosmicPulse] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState([]);

  const cosmicNodes = [
    {
      id: 1,
      title: 'The First Spark',
      subtitle: 'Where destiny ignited our sky',
      text: 'When your world crossed into mine, every quiet corner of life suddenly became radiant, warm, and deeply meaningful.',
      x: 18,
      y: 32,
      roman: 'I',
      icon: '✨',
      color: '#FF83B8',
      particles: ['✨', '💖', '🌟', '💫'],
    },
    {
      id: 2,
      title: 'Infinite Laughter',
      subtitle: 'The sweetest music in the cosmos',
      text: 'The effortless smiles that happen only when we talk — precious moments where time completely forgets to tick.',
      x: 36,
      y: 18,
      roman: 'II',
      icon: '🌸',
      color: '#FFE0A0',
      particles: ['🌸', '✨', '💛', '🌟'],
    },
    {
      id: 3,
      title: 'Unspoken Comfort',
      subtitle: 'Where silence feels like home',
      text: 'Where silence feels safe, conversations feel like coming home, and warmth is unconditionally guaranteed forever.',
      x: 64,
      y: 18,
      roman: 'III',
      icon: '🌙',
      color: '#CDBBFF',
      particles: ['🌙', '✨', '💜', '💫'],
    },
    {
      id: 4,
      title: 'Twin Destinies',
      subtitle: 'Gravitational soul alignment',
      text: 'Two separate journeys across a vast universe that were destined by the stars to orbit one another across every tomorrow.',
      x: 82,
      y: 32,
      roman: 'IV',
      icon: '💫',
      color: '#B8E6FF',
      particles: ['💫', '🩵', '✨', '⭐'],
    },
    {
      id: 5,
      title: 'Forever Tomorrow',
      subtitle: 'The eternal choice of my heart',
      text: 'Every sunrise, every storm, and every quiet sunset from now until the end of time — chosen with full certainty and endless devotion.',
      x: 50,
      y: 78,
      roman: 'V',
      icon: '👑',
      color: '#FFD6E7',
      particles: ['👑', '💖', '✨', '♾️'],
    },
  ];

  // Delicate Celestial Audio Chimes
  const playCelestialTone = (freq = 528) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.25);
    } catch {
      // Audio fallback safe
    }
  };

  // Trigger floating particle burst on star or node interaction
  const triggerCosmicBurst = (e, particles = ['✨', '💖', '🌟', '💫']) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: originX + (Math.random() - 0.5) * 35,
      y: originY + (Math.random() - 0.5) * 20,
      targetX: (Math.random() - 0.5) * 180,
      targetY: -70 - Math.random() * 90,
      symbol: particles[Math.floor(Math.random() * particles.length)],
      size: 14 + Math.random() * 12,
    }));

    setFloatingParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1500);
  };

  const handleNodeClick = (node, e) => {
    playCelestialTone(440 + node.id * 88);
    if (e) triggerCosmicBurst(e, node.particles);
    setActiveNode(node);
    const next = new Set(illuminatedNodes);
    next.add(node.id);
    setIlluminatedNodes(next);
  };

  const handleConnectAll = () => {
    playCelestialTone(659.25);
    const all = new Set(cosmicNodes.map((n) => n.id));
    setIlluminatedNodes(all);
    setCosmicPulse(true);
    setTimeout(() => setCosmicPulse(false), 3500);
  };

  const triggerStarPulse = (starName, e) => {
    playCelestialTone(starName === 'sachin' ? 587.33 : 698.46);
    setActiveStar(starName);
    if (e) {
      const symbols = starName === 'sachin' ? ['⭐', '✨', '💛', '🌟', '👑'] : ['💖', '🌸', '✨', '💕', '👑'];
      triggerCosmicBurst(e, symbols);
    }
    setCosmicPulse(true);
    setTimeout(() => setCosmicPulse(false), 2500);
  };

  const scrollToNext = () => {
    const el = document.getElementById('chapter-letter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const allConnected = illuminatedNodes.size === cosmicNodes.length;

  return (
    <section
      className="chapter-section bg-romantic-sky"
      id="chapter-universe"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(2.5rem, 5vw, 5rem) clamp(0.75rem, 3.5vw, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 15%, rgba(28, 12, 48, 0.96) 0%, rgba(6, 3, 16, 1) 85%)',
      }}
    >
      <FloatingPetals count={12} />

      {/* ─── DYNAMIC FLOATING COSMIC PARTICLES ─── */}
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
              filter: 'drop-shadow(0 0 10px rgba(255, 224, 160, 0.9))',
            }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </div>

      {/* ─── AMBIENT STARLIGHT NEBULA BACKDROP ─── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "radial-gradient(circle at 50% 30%, rgba(109, 76, 194, 0.3) 0%, transparent 70%), url('/images/celestial-galaxy-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
            filter: 'blur(3px)',
          }}
        />

        {/* Twinkling ambient stars */}
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 17.3) % 100}%`,
              width: i % 3 === 0 ? '3.5px' : '2px',
              height: i % 3 === 0 ? '3.5px' : '2px',
              borderRadius: '50%',
              background: i % 2 === 0 ? '#FFE0A0' : '#FF83B8',
              boxShadow: i % 2 === 0 ? '0 0 8px #FFE0A0' : '0 0 8px #FF83B8',
              opacity: 0.4 + (i % 5) * 0.12,
              animation: `twinkle ${2.4 + (i % 4)}s ease-in-out ${i * 0.3}s infinite alternate`,
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
        style={{ zIndex: 10, marginBottom: '0.75rem' }}
      >
        <span
          className="chapter-badge"
          style={{
            background: 'rgba(22, 12, 42, 0.85)',
            border: '1.5px solid rgba(255, 224, 160, 0.65)',
            boxShadow: '0 0 25px rgba(109,76,194,0.45), inset 0 0 12px rgba(255,224,160,0.25)',
            color: 'var(--champagne-gold)',
            padding: 'clamp(0.45rem, 1.5vw, 0.6rem) clamp(1rem, 3vw, 1.6rem)',
            borderRadius: 'var(--radius-xl)',
            fontSize: 'clamp(0.78rem, 2.2vw, 0.9rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <Orbit size={16} color="#FFE0A0" />
          <span>Chapter 10 • Our Forever Universe</span>
        </span>
      </motion.div>

      {/* ─── HEADING ─── */}
      <motion.h2
        className="heading-lg"
        style={{
          fontFamily: 'var(--font-serif)',
          textAlign: 'center',
          marginBottom: '0.75rem',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFE0A0 35%, #FF83B8 75%, #CDBBFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          zIndex: 10,
          lineHeight: 1.25,
          fontSize: 'clamp(1.75rem, 4.5vw, 3.4rem)',
          filter: 'drop-shadow(0 4px 18px rgba(255, 224, 160, 0.3))',
        }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {foreverUniverse.heading}
      </motion.h2>

      <motion.p
        className="body-lg"
        style={{
          textAlign: 'center',
          marginBottom: '1.75rem',
          maxWidth: '740px',
          color: 'var(--soft-lavender)',
          zIndex: 10,
          opacity: 0.95,
          fontSize: 'clamp(0.88rem, 2.4vw, 1.12rem)',
          lineHeight: 1.7,
          padding: '0 0.5rem',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.95 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Across infinite galaxies and light-years of space, our two stars found each other. Touch the realistic 3D twin celestial bodies or glowing constellation nodes to weave our sacred heart.
        <span style={{ display: 'block', fontSize: 'clamp(0.8rem, 2.2vw, 0.92rem)', color: 'var(--champagne-gold)', marginTop: '0.4rem', fontWeight: 500 }}>
          ✨ Touch Sachin's Sun ⭐ or Samithra's Rose Star 💖 to resonate our eternal gravitational harmony
        </span>
      </motion.p>

      {/* ─── CELESTIAL CONTROL RIBBON (MOBILE RESPONSIVE) ─── */}
      <motion.div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.6rem, 2vw, 1.25rem)',
          marginBottom: '2rem',
          padding: 'clamp(0.55rem, 1.8vw, 0.75rem) clamp(0.85rem, 3vw, 1.6rem)',
          background: 'linear-gradient(135deg, rgba(24, 12, 46, 0.94) 0%, rgba(12, 8, 28, 0.96) 100%)',
          border: '1.5px solid rgba(255, 224, 160, 0.55)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 10px 35px rgba(0,0,0,0.65), 0 0 20px rgba(255,224,160,0.2)',
          zIndex: 10,
          maxWidth: '100%',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Sparkles size={16} color="var(--champagne-gold)" />
          <span style={{ fontSize: 'clamp(0.78rem, 2vw, 0.88rem)', color: 'var(--warm-ivory)', fontWeight: 500 }}>
            Sacred Weave:{' '}
            <strong style={{ color: 'var(--champagne-gold)', letterSpacing: '0.04em' }}>
              {illuminatedNodes.size} / {cosmicNodes.length} Stars
            </strong>
          </span>

          {/* Node Light Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '4px' }}>
            {cosmicNodes.map((n) => {
              const isLit = illuminatedNodes.has(n.id);
              return (
                <div
                  key={n.id}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isLit ? n.color : 'rgba(255,255,255,0.12)',
                    border: `1.2px solid ${isLit ? '#FFF8F3' : 'rgba(205,187,255,0.3)'}`,
                    boxShadow: isLit ? `0 0 10px ${n.color}` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  title={n.title}
                />
              );
            })}
          </div>
        </div>

        {!allConnected && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,224,160,0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConnectAll}
            style={{
              fontSize: 'clamp(0.74rem, 2vw, 0.82rem)',
              color: '#120826',
              background: 'linear-gradient(135deg, #FFE0A0, #FF83B8)',
              border: 'none',
              fontWeight: 700,
              padding: '5px 13px',
              borderRadius: 'var(--radius-xl)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 0 16px rgba(255,224,160,0.45)',
            }}
          >
            <Wand2 size={13} />
            <span>Weave Cosmic Heart ✨</span>
          </motion.button>
        )}

        {allConnected && (
          <span
            style={{
              color: 'var(--champagne-gold)',
              fontSize: 'clamp(0.76rem, 2vw, 0.85rem)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(255, 224, 160, 0.15)',
              padding: '3px 10px',
              borderRadius: '12px',
              border: '1.2px solid rgba(255, 224, 160, 0.45)',
            }}
          >
            <span>👑</span>
            <span>Cosmic Heart in Eternal Harmony!</span>
          </span>
        )}
      </motion.div>

      {/* ─── REALISTIC OBSERVATORY CONSTELLATION VISUALIZER CANVAS ─── */}
      <motion.div
        className="glass-card-premium"
        style={{
          maxWidth: '1080px',
          width: '100%',
          position: 'relative',
          padding: 'clamp(0.85rem, 2.8vw, 2.6rem)',
          borderRadius: 'clamp(18px, 3.5vw, 26px)',
          border: '2px solid rgba(255, 224, 160, 0.55)',
          boxShadow: '0 25px 85px rgba(0,0,0,0.9), 0 0 70px rgba(109,76,194,0.35)',
          overflow: 'hidden',
          zIndex: 10,
          marginBottom: '2.5rem',
          background: 'linear-gradient(165deg, rgba(22, 12, 44, 0.98) 0%, rgba(10, 6, 22, 0.99) 60%, rgba(38, 14, 56, 0.95) 100%)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Constellation Canvas Stage with Photorealistic Galaxy Backdrop */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(400px, 58vh, 540px)',
            width: '100%',
            marginBottom: '1.6rem',
            borderRadius: 'clamp(14px, 3vw, 20px)',
            backgroundImage: "radial-gradient(circle at center, rgba(16, 8, 36, 0.35) 0%, rgba(8, 4, 18, 0.82) 75%, rgba(4, 2, 10, 0.98) 100%), url('/images/celestial-galaxy-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1.5px solid rgba(255, 224, 160, 0.35)',
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.85), 0 8px 30px rgba(0,0,0,0.7)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Cosmic Coordinate Circles */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(280px, 45vw, 500px)',
              height: 'clamp(280px, 45vw, 500px)',
              borderRadius: '50%',
              border: '1.2px dashed rgba(255, 224, 160, 0.2)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(190px, 30vw, 340px)',
              height: 'clamp(190px, 30vw, 340px)',
              borderRadius: '50%',
              border: '1px solid rgba(255, 131, 184, 0.18)',
              pointerEvents: 'none',
            }}
          />

          {/* SVG Constellation Web & Heart Geometry */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}
          >
            <defs>
              <linearGradient id="orbitBridgeGradRealistic" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFE0A0" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#FFF8F3" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF83B8" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="heartContourGradRealistic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF83B8" />
                <stop offset="50%" stopColor="#FFE0A0" />
                <stop offset="100%" stopColor="#CDBBFF" />
              </linearGradient>

              <filter id="celestialBridgeGlowRealistic" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Sacred Cosmic Heart Constellation Path (Traced along nodes 5 -> 1 -> 2 -> notch -> 3 -> 4 -> 5) */}
            <motion.path
              d="M 50 78 Q 20 60 18 32 Q 22 14 36 18 Q 45 22 50 30 Q 55 22 64 18 Q 78 14 82 32 Q 80 60 50 78 Z"
              fill={allConnected ? 'rgba(255, 131, 184, 0.08)' : 'none'}
              stroke="url(#heartContourGradRealistic)"
              strokeWidth={allConnected ? '2' : '1.4'}
              strokeDasharray={allConnected ? 'none' : '3, 2'}
              filter="url(#celestialBridgeGlowRealistic)"
              animate={
                allConnected
                  ? { strokeWidth: [2, 2.8, 2], opacity: [0.85, 1, 0.85] }
                  : { strokeDashoffset: [0, -35] }
              }
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />

            {/* Pulsing Starlight Gravitational Bridge connecting Sachin (22, 50) & Samithra (78, 50) */}
            <motion.line
              x1="22"
              y1="50"
              x2="78"
              y2="50"
              stroke="url(#orbitBridgeGradRealistic)"
              strokeWidth="2.8"
              strokeDasharray="2.5, 2.5"
              filter="url(#celestialBridgeGlowRealistic)"
              animate={{ strokeDashoffset: [0, -45] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
            />

            {/* Dynamic Radial Connections to illuminated memory nodes */}
            {cosmicNodes.map((node) => {
              const isLit = illuminatedNodes.has(node.id);
              return (
                <g key={node.id}>
                  {/* Line from closest star */}
                  <line
                    x1={node.x < 50 ? 22 : 78}
                    y1={50}
                    x2={node.x}
                    y2={node.y}
                    stroke={isLit ? node.color : 'rgba(205,187,255,0.22)'}
                    strokeWidth={isLit ? '1.5' : '0.7'}
                    strokeDasharray={isLit ? 'none' : '1.5, 1.5'}
                    opacity={isLit ? 0.95 : 0.4}
                  />

                  {/* Convergence line to node 5 (apex of heart) */}
                  {isLit && node.id !== 5 && (
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={50}
                      y2={78}
                      stroke="rgba(255, 224, 160, 0.5)"
                      strokeWidth="1.2"
                      strokeDasharray="2, 2"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Center Union Medallion with Real Royal Wax Seal at (50%, 50%) */}
          <motion.div
            animate={{
              scale: cosmicPulse ? [1, 1.3, 1] : [1, 1.08, 1],
              boxShadow: [
                '0 0 20px rgba(255, 224, 160, 0.75), 0 0 35px rgba(255, 131, 184, 0.85)',
                '0 0 40px rgba(255, 224, 160, 1), 0 0 65px rgba(255, 131, 184, 1)',
                '0 0 20px rgba(255, 224, 160, 0.75), 0 0 35px rgba(255, 131, 184, 0.85)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              width: 'clamp(40px, 10vw, 54px)',
              height: 'clamp(40px, 10vw, 54px)',
              borderRadius: '50%',
              border: '2px solid #FFE0A0',
              zIndex: 9,
              pointerEvents: 'none',
              overflow: 'hidden',
              background: '#5c0617',
            }}
          >
            <img
              src="/images/royal-wax-seal.jpg"
              alt="Royal S ❤️ S Seal"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </motion.div>

          {/* ─── REALISTIC 3D SACHIN'S CELESTIAL STAR (SOLAR SUN) ─── */}
          <motion.div
            onClick={(e) => triggerStarPulse('sachin', e)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            style={{
              position: 'absolute',
              left: '22%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 12,
            }}
          >
            {/* Outer Rotating Astrolabe Constellation Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 'clamp(98px, 25vw, 155px)',
                height: 'clamp(98px, 25vw, 155px)',
                borderRadius: '50%',
                border: '1.5px dashed rgba(255, 224, 160, 0.7)',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                pointerEvents: 'none',
              }}
            />

            {/* Solar Corona Flare Breathing Aura */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.65, 0.95, 0.65],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: 'clamp(82px, 21vw, 132px)',
                height: 'clamp(82px, 21vw, 132px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 210, 80, 0.6) 20%, rgba(255, 140, 20, 0.35) 55%, transparent 75%)',
                filter: 'blur(14px)',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                pointerEvents: 'none',
              }}
            />

            {/* Photorealistic 3D Solar Sun Sphere */}
            <div
              style={{
                width: 'clamp(68px, 17vw, 108px)',
                height: 'clamp(68px, 17vw, 108px)',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #FFE0A0',
                boxShadow: '0 0 35px rgba(255, 215, 90, 0.95), 0 0 70px rgba(255, 140, 20, 0.6)',
                position: 'relative',
              }}
            >
              <motion.img
                src="/images/sachin-celestial-star.jpg"
                alt="Sachin's Star - The Golden Sun"
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Gilded Nameplate Pill */}
            <span
              style={{
                marginTop: 'clamp(0.45rem, 1.5vw, 0.85rem)',
                fontSize: 'clamp(0.72rem, 2.2vw, 0.9rem)',
                fontWeight: 700,
                color: '#FFE0A0',
                fontFamily: 'Cinzel, var(--font-serif)',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, rgba(20, 10, 42, 0.95), rgba(40, 20, 80, 0.9))',
                padding: 'clamp(3px, 1vw, 5px) clamp(7px, 2vw, 14px)',
                borderRadius: '14px',
                border: '1.2px solid rgba(255, 224, 160, 0.65)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.7), 0 0 12px rgba(255,224,160,0.25)',
                letterSpacing: '0.03em',
              }}
            >
              ⭐ Sachin's Star
            </span>
          </motion.div>

          {/* ─── REALISTIC 3D SAMITHRA'S CELESTIAL STAR (ROSE QUARTZ QUEEN) ─── */}
          <motion.div
            onClick={(e) => triggerStarPulse('samithra', e)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            style={{
              position: 'absolute',
              left: '78%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 12,
            }}
          >
            {/* Outer Rotating Astrolabe Constellation Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 'clamp(98px, 25vw, 155px)',
                height: 'clamp(98px, 25vw, 155px)',
                borderRadius: '50%',
                border: '1.5px dashed rgba(255, 131, 184, 0.75)',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                pointerEvents: 'none',
              }}
            />

            {/* Rose Aurora Flare Breathing Aura */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.65, 0.95, 0.65],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute',
                width: 'clamp(82px, 21vw, 132px)',
                height: 'clamp(82px, 21vw, 132px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 131, 184, 0.65) 20%, rgba(216, 27, 96, 0.35) 55%, transparent 75%)',
                filter: 'blur(14px)',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                pointerEvents: 'none',
              }}
            />

            {/* Photorealistic 3D Rose Queen Star Sphere */}
            <div
              style={{
                width: 'clamp(68px, 17vw, 108px)',
                height: 'clamp(68px, 17vw, 108px)',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #FF83B8',
                boxShadow: '0 0 35px rgba(255, 131, 184, 0.98), 0 0 70px rgba(216, 27, 96, 0.6)',
                position: 'relative',
              }}
            >
              <motion.img
                src="/images/samithra-celestial-star.jpg"
                alt="Samithra's Star - The Rose Queen"
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Gilded Nameplate Pill */}
            <span
              style={{
                marginTop: 'clamp(0.45rem, 1.5vw, 0.85rem)',
                fontSize: 'clamp(0.72rem, 2.2vw, 0.9rem)',
                fontWeight: 700,
                color: '#FF83B8',
                fontFamily: 'Cinzel, var(--font-serif)',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, rgba(30, 8, 25, 0.95), rgba(70, 15, 55, 0.9))',
                padding: 'clamp(3px, 1vw, 5px) clamp(7px, 2vw, 14px)',
                borderRadius: '14px',
                border: '1.2px solid rgba(255, 131, 184, 0.65)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.7), 0 0 12px rgba(255,131,184,0.25)',
                letterSpacing: '0.03em',
              }}
            >
              💖 Samithra's Star
            </span>
          </motion.div>

          {/* ─── 5 CELESTIAL STELLAR AMULETS (INTERACTIVE NODES) ─── */}
          {cosmicNodes.map((node) => {
            const isLit = illuminatedNodes.has(node.id);
            const isSelected = activeNode?.id === node.id;
            return (
              <motion.button
                key={node.id}
                onClick={(e) => handleNodeClick(node, e)}
                whileHover={{ scale: 1.35 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  x: '-50%',
                  y: '-50%',
                  width: 'clamp(36px, 9vw, 46px)',
                  height: 'clamp(36px, 9vw, 46px)',
                  borderRadius: '50%',
                  background: isLit
                    ? `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${node.color} 50%, #150928 100%)`
                    : 'rgba(20, 12, 38, 0.9)',
                  border: isLit ? '2.5px solid #FFFFFF' : '1.5px solid rgba(205,187,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: isLit
                    ? `0 0 25px ${node.color}, 0 0 40px ${node.color}, inset 0 0 8px #FFF`
                    : '0 4px 12px rgba(0,0,0,0.6)',
                  zIndex: 15,
                  fontSize: 'clamp(0.92rem, 2.5vw, 1.15rem)',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  outline: isSelected ? '3px solid #FFE0A0' : 'none',
                }}
                title={`${node.roman}. ${node.title}`}
              >
                {/* 4-Point Optical Diffraction Starburst Behind Node */}
                {isLit && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-6px',
                      pointerEvents: 'none',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${node.color} 0%, transparent 70%)`,
                      filter: 'blur(4px)',
                      opacity: 0.7,
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 2 }}>{node.icon}</span>
              </motion.button>
            );
          })}
        </div>

        {/* ─── SELECTED COSMIC NODE STORY BANNER ─── */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              style={{
                background: 'linear-gradient(135deg, rgba(38,20,68,0.96) 0%, rgba(109,76,194,0.45) 100%)',
                border: '1.8px solid var(--champagne-gold)',
                borderRadius: '16px',
                padding: 'clamp(0.85rem, 2.5vw, 1.3rem) clamp(0.95rem, 3vw, 1.8rem)',
                marginBottom: '1.6rem',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                boxShadow: '0 12px 35px rgba(0,0,0,0.7), 0 0 20px rgba(255,224,160,0.25)',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <span
                  style={{
                    fontSize: 'clamp(0.72rem, 2vw, 0.8rem)',
                    color: 'var(--champagne-gold)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Sacred Star Memory #{activeNode.roman} • {activeNode.title}
                </span>
                <p
                  style={{
                    fontSize: 'clamp(0.92rem, 2.4vw, 1.08rem)',
                    color: 'var(--warm-ivory)',
                    marginTop: '0.35rem',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  "{activeNode.text}"
                </p>
              </div>
              <button
                onClick={() => setActiveNode(null)}
                style={{
                  color: 'var(--champagne-gold)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,224,160,0.4)',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── DUAL CELESTIAL VOWS TABLETS (RESPONSIVE GRID) ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.8rem)',
            textAlign: 'left',
          }}
        >
          {/* From Sachin's Star */}
          <div
            style={{
              padding: 'clamp(1.2rem, 3vw, 1.8rem) clamp(1.1rem, 3.5vw, 2rem)',
              borderRadius: '18px',
              background: 'linear-gradient(150deg, rgba(109,76,194,0.28) 0%, rgba(18,10,38,0.94) 100%)',
              border: '1.8px solid rgba(205,187,255,0.45)',
              boxShadow: '0 12px 35px rgba(0,0,0,0.5), inset 0 0 20px rgba(109,76,194,0.2)',
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
                height: '3px',
                background: 'linear-gradient(90deg, #FFE0A0, #CDBBFF)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.8rem' }}>
              <Star size={20} color="#FFE0A0" fill="#FFE0A0" />
              <h4 style={{ fontFamily: 'Cinzel, var(--font-serif)', fontSize: 'clamp(1.1rem, 2.8vw, 1.28rem)', color: '#FFE0A0', letterSpacing: '0.04em' }}>
                From Sachin's Star ⭐
              </h4>
            </div>
            <p className="body-md" style={{ fontStyle: 'italic', color: 'var(--warm-ivory)', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 2.2vw, 0.98rem)' }}>
              "{foreverUniverse.sachinMessage}"
            </p>
          </div>

          {/* Dedicated to Samithra's Star */}
          <div
            style={{
              padding: 'clamp(1.2rem, 3vw, 1.8rem) clamp(1.1rem, 3.5vw, 2rem)',
              borderRadius: '18px',
              background: 'linear-gradient(150deg, rgba(255,131,184,0.28) 0%, rgba(22,10,32,0.94) 100%)',
              border: '1.8px solid rgba(255,131,184,0.45)',
              boxShadow: '0 12px 35px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,131,184,0.2)',
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
                height: '3px',
                background: 'linear-gradient(90deg, #FF83B8, #FFE0A0)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.8rem' }}>
              <Heart size={20} color="#FF83B8" fill="#FF83B8" />
              <h4 style={{ fontFamily: 'Cinzel, var(--font-serif)', fontSize: 'clamp(1.1rem, 2.8vw, 1.28rem)', color: '#FF83B8', letterSpacing: '0.04em' }}>
                To Samithra's Star 💖
              </h4>
            </div>
            <p className="body-md" style={{ fontStyle: 'italic', color: 'var(--warm-ivory)', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 2.2vw, 0.98rem)' }}>
              "{foreverUniverse.samithraMessage}"
            </p>
          </div>
        </div>

        {/* Footer Romantic Covenant */}
        <p
          className="signature-text"
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.65rem)',
            color: 'var(--rose-pink)',
            fontFamily: 'var(--font-script)',
            textShadow: '0 0 15px rgba(255,131,184,0.5)',
          }}
        >
          Two souls, one endless sky — forever Sachin & Samithra ❤️
        </p>
      </motion.div>

      {/* ─── PROGRESSION LINK TO CHAPTER 11 ─── */}
      <motion.div
        whileHover={{ y: 4 }}
        style={{ zIndex: 10, textAlign: 'center', marginTop: '1.25rem' }}
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
            fontSize: 'clamp(0.82rem, 2.2vw, 0.92rem)',
            opacity: 0.9,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
        >
          <span style={{ color: 'var(--champagne-gold)', fontWeight: 600, letterSpacing: '0.03em' }}>
            Continue to Chapter 11 — A Sacred Letter from Sachin 📜✨
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
