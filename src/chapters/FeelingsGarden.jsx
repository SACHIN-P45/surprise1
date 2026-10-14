import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  BookOpen,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Wand2,
  Bookmark,
  Check,
} from 'lucide-react';
import { loveNotes } from '../data/loveWorldData';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 07 — The Garden of Feelings (Ultra-Attractive Masterpiece Edition)
 *
 * An enchanted blossoming meadow of 30 interactive glowing flowers, each holding a
 * secret, deeply personal reason why Sachin cherishes Samithra.
 *
 * Features:
 * - 30 animated blooming flower petals with organic bud-to-bloom unfurling
 * - Thematic petal burst physics on every flower tap
 * - Modal with consecutive Next/Previous navigation (read like an intimate love book)
 * - Dual View: "Interactive Meadow Grid" vs "Storybook Card Carousel"
 * - Mood Bouquet Filters (All, Smiles, Strength, Comfort, Romance)
 * - "Bloom All Flowers" magical cascade animation
 * - Master Bouquet celebration when all 30 blossoms are unfurled
 * - Full reading book modal with romantic ivory typography
 */

export default function FeelingsGarden() {
  const [revealedNotes, setRevealedNotes] = useState(new Set([0, 1, 2])); // first 3 open as preview
  const [activeNote, setActiveNote] = useState(null);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [activeMood, setActiveMood] = useState('all');
  const [favoritedNotes, setFavoritedNotes] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [floatingParticles, setFloatingParticles] = useState([]);

  // 7 distinct glowing royal flower varieties
  const flowerPalette = [
    { color: '#FF83B8', bg: 'rgba(255,131,184,0.22)', icon: '🌸', name: 'Cherry Blossom', meaning: 'Sweet Romance' },
    { color: '#CDBBFF', bg: 'rgba(205,187,255,0.22)', icon: '🪻', name: 'Lavender Iris', meaning: 'Soulful Peace' },
    { color: '#FFE0A0', bg: 'rgba(255,224,160,0.22)', icon: '🌻', name: 'Golden Sunflower', meaning: 'Radiant Joy' },
    { color: '#FFD6E7', bg: 'rgba(255,214,231,0.22)', icon: '🌷', name: 'Blush Tulip', meaning: 'Gentle Tenderness' },
    { color: '#B8E6FF', bg: 'rgba(184,230,255,0.22)', icon: '🪷', name: 'Starlight Lotus', meaning: 'Divine Grace' },
    { color: '#FF85A1', bg: 'rgba(255,133,161,0.22)', icon: '🌹', name: 'Velvet Rose', meaning: 'Deep Devotion' },
    { color: '#FFF0B8', bg: 'rgba(255,240,184,0.22)', icon: '🌼', name: 'Starlight Jasmine', meaning: 'Pure Elegance' },
  ];

  // Categorize the 30 notes into 4 emotional bouquets
  const categorizedNotes = useMemo(() => {
    return loveNotes.map((note, idx) => {
      let category = 'romance';
      if (idx % 4 === 0) category = 'smiles';
      else if (idx % 4 === 1) category = 'strength';
      else if (idx % 4 === 2) category = 'comfort';

      const style = flowerPalette[idx % flowerPalette.length];
      return {
        id: idx,
        note,
        category,
        style,
      };
    });
  }, []);

  const filteredFlowers = categorizedNotes.filter((item) => {
    if (activeMood === 'all') return true;
    return item.category === activeMood;
  });

  // Trigger floating flower petal particle burst on bloom
  const triggerPetalBurst = (e, flowerStyle) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const symbols = [flowerStyle.icon, '✨', '💖', '🌸', '💫'];
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: originX + (Math.random() - 0.5) * 30,
      y: originY + (Math.random() - 0.5) * 20,
      targetX: (Math.random() - 0.5) * 160,
      targetY: -60 - Math.random() * 80,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: 16 + Math.random() * 12,
    }));

    setFloatingParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1500);
  };

  const handleBloom = (idx, e) => {
    if (e) triggerPetalBurst(e, flowerPalette[idx % flowerPalette.length]);
    const next = new Set(revealedNotes);
    next.add(idx);
    setRevealedNotes(next);
    setActiveNote(idx);
  };

  const bloomAll = () => {
    const all = new Set(loveNotes.map((_, i) => i));
    setRevealedNotes(all);
  };

  const toggleFavorite = (idx, e) => {
    if (e) e.stopPropagation();
    const next = new Set(favoritedNotes);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setFavoritedNotes(next);
  };

  const scrollToNext = () => {
    const el = document.getElementById('chapter-vault');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const allBlossomed = revealedNotes.size === loveNotes.length;

  return (
    <section
      className="chapter-section bg-garden"
      id="chapter-garden"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 6vw, 6rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(35, 14, 48, 0.95) 0%, rgba(10, 8, 26, 0.98) 75%)',
      }}
    >
      <FloatingPetals count={16} />

      {/* ─── DYNAMIC FLOATING PETAL PARTICLES ─── */}
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
              filter: 'drop-shadow(0 0 10px rgba(255, 131, 184, 0.8))',
            }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </div>

      {/* Floating Garden Fireflies */}
      <div
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}
        aria-hidden="true"
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 15.3) % 100}%`,
              top: `${(i * 18.7) % 100}%`,
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
          <Flower2 size={16} color="#FFE0A0" />
          <span>Chapter 07 — The Garden of Feelings</span>
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
        The Garden of Feelings
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
        Every flower in this enchanted meadow carries an intimate reason why I adore you. Touch any bloom to unfurl its petals.
        <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--champagne-gold)', marginTop: '0.4rem' }}>
          ✨ Tap any flower to bloom • Save your favourites • Unveil all 30 reasons
        </span>
      </motion.p>

      {/* ─── LIVE PROGRESS BAR & QUICK ACTION CONTROLS ─── */}
      <motion.div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          marginBottom: '2rem',
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
        {/* Progress Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Sparkles size={16} color="var(--champagne-gold)" />
          <span style={{ fontSize: '0.86rem', color: 'var(--warm-ivory)' }}>
            Blossomed:{' '}
            <strong style={{ color: 'var(--champagne-gold)' }}>
              {revealedNotes.size} / {loveNotes.length}
            </strong>
          </span>
          <div
            style={{
              width: '110px',
              height: '7px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #FF83B8 0%, #FFE0A0 100%)',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(255,131,184,0.6)',
              }}
              animate={{ width: `${(revealedNotes.size / loveNotes.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {!allBlossomed && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={bloomAll}
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
              <Wand2 size={13} />
              <span>Bloom All ✨</span>
            </motion.button>
          )}

          {/* Read Book View */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllNotes(true)}
            style={{
              fontSize: '0.78rem',
              color: 'var(--soft-lavender)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(205,187,255,0.25)',
              padding: '5px 12px',
              borderRadius: 'var(--radius-xl)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <BookOpen size={13} />
            <span>Read Book View</span>
          </motion.button>
        </div>

        {/* View Switcher: Grid vs Carousel */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(15, 10, 30, 0.7)',
            border: '1px solid rgba(205, 187, 255, 0.2)',
          }}
        >
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '3px 10px',
              borderRadius: 'var(--radius-xl)',
              fontSize: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: viewMode === 'grid' ? 600 : 400,
              background: viewMode === 'grid' ? 'linear-gradient(135deg, #6D4CC2, #FF83B8)' : 'transparent',
              color: viewMode === 'grid' ? '#FFFFFF' : 'rgba(255,248,243,0.7)',
              transition: 'all 0.2s ease',
            }}
          >
            Meadow Grid
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            style={{
              padding: '3px 10px',
              borderRadius: 'var(--radius-xl)',
              fontSize: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: viewMode === 'carousel' ? 600 : 400,
              background: viewMode === 'carousel' ? 'linear-gradient(135deg, #FFE0A0, #FF83B8)' : 'transparent',
              color: viewMode === 'carousel' ? '#0B0B20' : 'rgba(255,248,243,0.7)',
              transition: 'all 0.2s ease',
            }}
          >
            Story Carousel
          </button>
        </div>
      </motion.div>

      {/* ─── MOOD BOUQUET FILTER TABS (FOR GRID MODE) ─── */}
      {viewMode === 'grid' && (
        <motion.div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '2.5rem',
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { id: 'all', label: 'All 30 Blooms', icon: '🌸' },
            { id: 'smiles', label: 'Laughter & Smiles', icon: '✨' },
            { id: 'strength', label: 'Strength & Wonder', icon: '🦋' },
            { id: 'comfort', label: 'Peace & Sanctuary', icon: '🌙' },
            { id: 'romance', label: 'Deep Devotion', icon: '💖' },
          ].map((tab) => {
            const isSelected = activeMood === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveMood(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1.15rem',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? '#0B0B20' : 'var(--soft-lavender)',
                  background: isSelected
                    ? 'linear-gradient(135deg, #FFE0A0, #FF83B8)'
                    : 'rgba(23,16,46,0.75)',
                  border: isSelected
                    ? '1.5px solid #FFE0A0'
                    : '1px solid rgba(205,187,255,0.22)',
                  boxShadow: isSelected ? '0 0 18px rgba(255,131,184,0.45)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* ─── VIEW 1: THE BLOOMING MEADOW GRID ─── */}
      {viewMode === 'grid' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: 'clamp(0.85rem, 2vw, 1.35rem)',
            maxWidth: '1020px',
            width: '100%',
            zIndex: 10,
            marginBottom: '2.5rem',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence>
            {filteredFlowers.map((item) => {
              const isRevealed = revealedNotes.has(item.id);
              const isFav = favoritedNotes.has(item.id);

              return (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: (item.id % 8) * 0.03 }}
                  whileHover={{ scale: 1.18, y: -6 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => handleBloom(item.id, e)}
                  aria-label={`Bloom note #${item.id + 1}`}
                  style={{
                    width: 'clamp(76px, 8.5vw, 88px)',
                    height: 'clamp(76px, 8.5vw, 88px)',
                    borderRadius: '50%',
                    background: isRevealed
                      ? `radial-gradient(circle at 35% 35%, ${item.style.color}55 0%, rgba(26, 14, 50, 0.95) 85%)`
                      : 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08) 0%, rgba(20, 12, 38, 0.9) 85%)',
                    border: isRevealed
                      ? `2.5px solid ${item.style.color}`
                      : '1.5px dashed rgba(205,187,255,0.35)',
                    boxShadow: isRevealed
                      ? `0 0 25px ${item.style.color}70, inset 0 0 15px ${item.style.color}35`
                      : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    padding: 0,
                    margin: '0 auto',
                  }}
                  title={isRevealed ? `Reason #${item.id + 1}: ${item.style.name}` : 'Tap to unfurl flower bud'}
                >
                  {/* Rotating Starlight Ring if bloomed */}
                  {isRevealed && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        border: `1px dashed ${item.style.color}60`,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Flower Icon / Bloom */}
                  <motion.span
                    animate={
                      isRevealed
                        ? { rotate: [0, 6, -6, 0], scale: [1, 1.08, 1] }
                        : { scale: [1, 1.05, 1] }
                    }
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      fontSize: isRevealed ? '2rem' : '1.35rem',
                      filter: isRevealed
                        ? `drop-shadow(0 0 10px ${item.style.color})`
                        : 'grayscale(0.6) opacity(0.55)',
                    }}
                  >
                    {isRevealed ? item.style.icon : '🌱'}
                  </motion.span>

                  {/* Petal number indicator */}
                  <span
                    style={{
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      color: isRevealed ? item.style.color : 'rgba(255,248,243,0.45)',
                      marginTop: '2px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    #{item.id + 1}
                  </span>

                  {/* Favorited Heart Pin */}
                  {isFav && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '3px',
                        right: '3px',
                        fontSize: '0.75rem',
                        filter: 'drop-shadow(0 0 6px rgba(255,131,184,0.8))',
                      }}
                    >
                      ❤️
                    </div>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* ─── VIEW 2: STORYBOOK CARD CAROUSEL ─── */}
      {viewMode === 'carousel' && (
        <div
          style={{
            maxWidth: '650px',
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
                border: `2px solid ${flowerPalette[carouselIndex % flowerPalette.length].color}`,
                background: `linear-gradient(150deg, rgba(32, 19, 60, 0.95) 0%, rgba(14, 10, 29, 0.98) 70%, ${flowerPalette[carouselIndex % flowerPalette.length].color}25 100%)`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 50px ${flowerPalette[carouselIndex % flowerPalette.length].color}40`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Giant Flower Icon */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                onClick={(e) => triggerPetalBurst(e, flowerPalette[carouselIndex % flowerPalette.length])}
                style={{
                  width: '94px',
                  height: '94px',
                  borderRadius: '50%',
                  background: flowerPalette[carouselIndex % flowerPalette.length].bg,
                  border: `3px solid ${flowerPalette[carouselIndex % flowerPalette.length].color}`,
                  boxShadow: `0 0 35px ${flowerPalette[carouselIndex % flowerPalette.length].color}80`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.2rem',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                }}
              >
                {flowerPalette[carouselIndex % flowerPalette.length].icon}
              </motion.div>

              <span
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: flowerPalette[carouselIndex % flowerPalette.length].color,
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}
              >
                Reason #{carouselIndex + 1} • {flowerPalette[carouselIndex % flowerPalette.length].name}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  color: 'var(--champagne-gold)',
                  marginBottom: '1.4rem',
                }}
              >
                {flowerPalette[carouselIndex % flowerPalette.length].meaning}
              </h3>

              {/* Love Note Box */}
              <div
                style={{
                  padding: '1.4rem 1.6rem',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `4px solid ${flowerPalette[carouselIndex % flowerPalette.length].color}`,
                  marginBottom: '1.6rem',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    color: 'var(--warm-ivory)',
                    fontSize: '1.18rem',
                    lineHeight: 1.85,
                  }}
                >
                  "{loveNotes[carouselIndex]}"
                </p>
                <span
                  style={{
                    display: 'block',
                    textAlign: 'right',
                    marginTop: '0.75rem',
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.25rem',
                    color: 'var(--rose-pink)',
                  }}
                >
                  — With endless love, Sachin ❤️
                </span>
              </div>

              {/* Action buttons inside carousel */}
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  className="btn-secondary"
                  onClick={(e) => toggleFavorite(carouselIndex, e)}
                  style={{
                    padding: '0.65rem 1.3rem',
                    fontSize: '0.84rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Heart
                    size={16}
                    color="#FF83B8"
                    fill={favoritedNotes.has(carouselIndex) ? '#FF83B8' : 'none'}
                  />
                  <span>
                    {favoritedNotes.has(carouselIndex) ? 'Favorited Reason ❤️' : 'Save as Favorite'}
                  </span>
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
              onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : loveNotes.length - 1))}
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
              <span>Previous Reason</span>
            </button>

            <span style={{ fontSize: '0.85rem', color: 'var(--champagne-gold)', fontWeight: 600 }}>
              {carouselIndex + 1} of {loveNotes.length}
            </span>

            <button
              onClick={() => setCarouselIndex((prev) => (prev < loveNotes.length - 1 ? prev + 1 : 0))}
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
              <span>Next Reason</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─── MASTER BOUQUET CELEBRATION (WHEN ALL ARE BLOSSOMED) ─── */}
      <AnimatePresence>
        {allBlossomed && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card-premium"
            style={{
              maxWidth: '720px',
              width: '100%',
              marginBottom: '2.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255,224,160,0.6)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 70px rgba(255,131,184,0.4)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2rem, 5vw, 3rem)',
            }}
          >
            <div style={{ fontSize: '3.4rem', marginBottom: '0.6rem' }}>💐👑✨</div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)',
                color: 'var(--champagne-gold)',
                marginBottom: '0.75rem',
              }}
            >
              The Garden is in Full Eternal Bloom!
            </h3>
            <p className="body-lg" style={{ color: 'var(--warm-ivory)', marginBottom: '1.2rem', lineHeight: 1.85 }}>
              "You have unlocked all thirty reasons in this garden, Samithra. But the truth is, thirty thousand flowers could not hold all the reasons why you are the greatest blessing of my life."
            </p>
            <p className="signature-text" style={{ fontSize: '1.45rem', color: 'var(--rose-pink)', fontFamily: 'var(--font-script)' }}>
              — With endless devotion, Sachin ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SINGLE REVEAL NOTE MODAL (WITH PREV / NEXT NAVIGATION) ─── */}
      <AnimatePresence>
        {activeNote !== null && !showAllNotes && (
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNote(null)}
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
                maxWidth: '560px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                border: `2px solid ${flowerPalette[activeNote % flowerPalette.length].color}`,
                boxShadow: `0 25px 80px rgba(0,0,0,0.85), 0 0 65px ${flowerPalette[activeNote % flowerPalette.length].color}40`,
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
              }}
            >
              {/* Close Button */}
              <button
                className="btn-close"
                onClick={() => setActiveNote(null)}
                aria-label="Close note"
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

              {/* Central Flower Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                onClick={(e) => triggerPetalBurst(e, flowerPalette[activeNote % flowerPalette.length])}
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  background: flowerPalette[activeNote % flowerPalette.length].bg,
                  border: `3px solid ${flowerPalette[activeNote % flowerPalette.length].color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.2rem',
                  margin: '0 auto 1.1rem auto',
                  boxShadow: `0 0 35px ${flowerPalette[activeNote % flowerPalette.length].color}70`,
                  cursor: 'pointer',
                }}
                title="Tap for petal shower"
              >
                {flowerPalette[activeNote % flowerPalette.length].icon}
              </motion.div>

              <span
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: flowerPalette[activeNote % flowerPalette.length].color,
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Little Reason #{activeNote + 1}
              </span>

              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  color: 'var(--warm-ivory)',
                  marginBottom: '1.25rem',
                }}
              >
                {flowerPalette[activeNote % flowerPalette.length].name} • {flowerPalette[activeNote % flowerPalette.length].meaning}
              </h4>

              {/* Romantic Note Box */}
              <div
                style={{
                  padding: '1.5rem 1.6rem',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `4px solid ${flowerPalette[activeNote % flowerPalette.length].color}`,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '1.6rem',
                  textAlign: 'left',
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
                  "{loveNotes[activeNote]}"
                </p>
                <p
                  className="signature-text"
                  style={{
                    textAlign: 'right',
                    marginTop: '1rem',
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-script)',
                    color: 'var(--rose-pink)',
                  }}
                >
                  — Sachin ❤️
                </p>
              </div>

              {/* Prev / Next within Modal + Favorite Button */}
              <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    const prev = activeNote > 0 ? activeNote - 1 : loveNotes.length - 1;
                    handleBloom(prev);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.84rem',
                    padding: '0.55rem 1.1rem',
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                <button
                  className="btn-secondary"
                  onClick={(e) => toggleFavorite(activeNote, e)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.85rem',
                    padding: '0.55rem 1.25rem',
                  }}
                >
                  <Heart
                    size={16}
                    color="#FF83B8"
                    fill={favoritedNotes.has(activeNote) ? '#FF83B8' : 'none'}
                  />
                  <span>
                    {favoritedNotes.has(activeNote) ? 'Favorited Reason ❤️' : 'Save as Favorite'}
                  </span>
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    const next = activeNote < loveNotes.length - 1 ? activeNote + 1 : 0;
                    handleBloom(next);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.84rem',
                    padding: '0.55rem 1.1rem',
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

      {/* ─── FULL READING BOOK VIEW MODAL ─── */}
      <AnimatePresence>
        {showAllNotes && (
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllNotes(false)}
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
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '720px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                border: '2px solid rgba(255,224,160,0.5)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.85), 0 0 65px rgba(109,76,194,0.4)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(2rem, 5vw, 3rem)',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.6rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  paddingBottom: '1rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.75rem',
                      color: 'var(--champagne-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>📖</span>
                    <span>The Book of Thirty Reasons</span>
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--soft-lavender)' }}>
                    All 30 love notes written with tenderness by Sachin for Samithra
                  </span>
                </div>
                <button
                  className="btn-close"
                  onClick={() => setShowAllNotes(false)}
                  aria-label="Close"
                  style={{
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
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                {loveNotes.map((note, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.1rem 1.35rem',
                      background: 'rgba(255,255,255,0.035)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(205,187,255,0.12)',
                      borderLeft: `4px solid ${flowerPalette[idx % flowerPalette.length].color}`,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                    }}
                  >
                    <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>
                      {flowerPalette[idx % flowerPalette.length].icon}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            color: flowerPalette[idx % flowerPalette.length].color,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                        >
                          Reason #{idx + 1} • {flowerPalette[idx % flowerPalette.length].name}
                        </span>
                        {favoritedNotes.has(idx) && (
                          <span style={{ fontSize: '0.75rem', color: '#FF83B8' }}>❤️ Favorited</span>
                        )}
                      </div>
                      <p
                        style={{
                          marginTop: '0.35rem',
                          fontSize: '0.98rem',
                          color: 'var(--warm-ivory)',
                          lineHeight: 1.65,
                          fontFamily: 'var(--font-serif)',
                          fontStyle: 'italic',
                        }}
                      >
                        "{note}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <p
                  className="signature-text"
                  style={{
                    fontSize: '1.4rem',
                    color: 'var(--rose-pink)',
                    fontFamily: 'var(--font-script)',
                  }}
                >
                  Forever written with all my love by Sachin ❤️
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PROGRESSION LINK TO CHAPTER 08 ─── */}
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
            Continue to Chapter 08 — The Secret Love Vault 💌
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
