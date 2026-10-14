import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Check,
  Maximize2,
  Volume2,
  BookOpen,
  MapPin,
  X,
  Smile,
  Compass,
} from 'lucide-react';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 05 — Little Moments, Big Feelings (Ultra-Attractive Masterpiece Edition)
 *
 * An interactive, emotionally resonant storybook experience celebrating the 5 precious
 * milestones between Sachin & Samithra.
 *
 * Features:
 * - Real photographic polaroid keepsakes with gold clips & handwritten vintage captions
 * - Animated starlight energy flowing continuously down the central garden vine
 * - Milestone crystal nodes with rotating starlight rings and interactive soundwave ripples
 * - Dual Perspective: "Illuminated Garden Trail" vs "Cinematic Storybook Slider"
 * - Interactive heart bursts (floating particle physics on like)
 * - Milestone 02 animated audio soundwave frequency (simulating late-night whisper calls)
 * - Romantic love stickers / emotion reactions (🥰 Heart Melted, ✨ Pure Magic, etc.)
 * - Deep Sachin handwriting quote plaques with wax-seal glow
 * - Full-screen luxury keepsake photo lightbox with backdrop blur
 */

export default function MemoryJourney() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [likedMoments, setLikedMoments] = useState(new Set([1, 2, 3, 4, 5])); // all treasured by default
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState('trail'); // 'trail' | 'storybook'
  const [activeLightbox, setActiveLightbox] = useState(null); // moment object or null
  const [floatingParticles, setFloatingParticles] = useState([]); // array of { id, x, y, symbol }
  const [momentReactions, setMomentReactions] = useState({
    1: '✨ Pure Magic',
    2: '🌙 Late Night Calls',
    3: '🌸 Her Laugh',
    4: '☕ My Safe Haven',
    5: '👑 Forever My Queen',
  });

  // Curated storybook milestones with genuine couple memories photos
  const [momentsData, setMomentsData] = useState([
    {
      id: 1,
      title: 'The Very First Hello',
      date: 'College Days • Chapter 01 of Us',
      image: '/images/memories/memory-01.jpg',
      icon: '✨',
      subtitle: 'Where destiny whispered and our world quietly changed forever',
      tag: 'The Spark That Changed Everything',
      story:
        'The first time we spoke, neither of us knew what the universe was quietly putting together. What started as simple, innocent words quickly became the most anticipated highlight of every single day. Sitting side by side on that campus curb in your pink saree, time stood completely still.',
      sachinNote:
        'I still remember the first feeling of talking to you — like finding something precious I had been searching for my entire life without even realizing it.',
      color: '#FF83B8',
      accentGlow: 'rgba(255, 131, 184, 0.45)',
      badge: 'Spark of Destiny',
    },
    {
      id: 2,
      title: 'Midnight Calls & Sweet Silence',
      date: 'Under the Stars • Golden Hour',
      image: '/images/memories/memory-02.jpg',
      icon: '🌙',
      subtitle: 'When three hours melted like three seconds in the dark',
      tag: 'Where Silence Was Never Awkward',
      hasSoundwave: true,
      story:
        'Staying up way past midnight just to hear your soft breathing and gentle voice. Even the quiet pauses between our words felt safe, comfortable, and warm. With you, silence was never awkward or empty — it was the sweetest sanctuary in the world.',
      sachinNote:
        'There were countless nights when sleep was effortlessly sacrificed, because talking to you was a thousand times sweeter and more magical than any dream could ever be.',
      color: '#CDBBFF',
      accentGlow: 'rgba(205, 187, 255, 0.45)',
      badge: 'Midnight Whispers',
    },
    {
      id: 3,
      title: 'Your Carefree, Unstoppable Laugh',
      date: 'Pure Happiness • Classic Style',
      image: '/images/memories/memory-04.jpg',
      icon: '🌸',
      subtitle: 'The sweetest melody ever composed in the entire universe',
      tag: 'Twin Souls in Perfect Sync',
      story:
        'Walking together in matching style, catching each other’s eyes and breaking into unstoppable laughter. That sound instantly became my absolute favourite music in all of existence. Seeing your crinkled nose and radiant smile makes every problem in life disappear.',
      sachinNote:
        'Whenever you laugh like that, Samithra, the whole universe seems to light up with blooming spring flowers. My life’s goal every day is simply to hear that laughter again.',
      color: '#FFD6E7',
      accentGlow: 'rgba(255, 214, 231, 0.45)',
      badge: 'Melody of Joy',
    },
    {
      id: 4,
      title: 'The Safe Harbor in Every Storm',
      date: 'Pure Tenderness • Unshakable Comfort',
      image: '/images/memories/memory-03.jpg',
      icon: '☕',
      subtitle: 'Where my restless heart always finds eternal peace',
      tag: 'Hand on My Heart',
      story:
        'On difficult days when the world felt heavy, chaotic, or exhausting, all it took was a few gentle words from you to make everything calm again. The peaceful feeling of your hand resting over my chest — knowing you are right there — is the greatest blessing of my life.',
      sachinNote:
        'You are my calm in every chaos, Samithra. Just knowing you believe in me gives me the strength to conquer any mountain. You are my safe harbor.',
      color: '#FFE0A0',
      accentGlow: 'rgba(255, 224, 160, 0.45)',
      badge: 'Unshakable Sanctuary',
    },
    {
      id: 5,
      title: 'The Quiet Realization of Forever',
      date: 'Forever & Always • My Queen',
      image: '/images/memories/memory-05.jpg',
      icon: '👑',
      subtitle: 'Choosing you, today, tomorrow, and across every lifetime',
      tag: 'Eternal Soulmate',
      story:
        'Looking at you standing with unmatched grace in royal purple, feeling a deep certainty resonate in my heart: you are not just a part of my story, you are the entire journey, the destination, and every tomorrow I ever want to live.',
      sachinNote:
        'I don’t just love you for who you are, Chellakutty — I love you for who I become when I am with you. You are my forever choice, my girl, my Queen.',
      color: '#B8E6FF',
      accentGlow: 'rgba(184, 230, 255, 0.45)',
      badge: 'Eternal Destiny',
    },
  ]);

  // Trigger floating particle burst on heart click
  const triggerHeartParticles = (e, momentId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const symbols = ['💖', '✨', '🌸', '💫', '❤️', '🌟'];
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: originX + (Math.random() - 0.5) * 40,
      y: originY + (Math.random() - 0.5) * 20,
      targetX: (Math.random() - 0.5) * 160,
      targetY: -60 - Math.random() * 80,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: 14 + Math.random() * 12,
    }));

    setFloatingParticles((prev) => [...prev, ...newParticles]);

    // auto clean particles
    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1500);

    // Toggle heart state
    setLikedMoments((prev) => {
      const next = new Set(prev);
      if (next.has(momentId)) next.delete(momentId);
      else next.add(momentId);
      return next;
    });
  };

  const handleUpdateStory = (id, newText) => {
    setMomentsData((prev) => prev.map((m) => (m.id === id ? { ...m, story: newText } : m)));
    setEditingId(null);
  };

  const scrollToNext = () => {
    const el = document.getElementById('chapter-nicknames');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="chapter-section bg-garden"
      id="chapter-moments"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 6vw, 6rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(35, 13, 46, 0.95) 0%, rgba(11, 11, 32, 0.98) 75%)',
      }}
    >
      <FloatingPetals count={14} />

      {/* ─── DYNAMIC FLOATING PARTICLES (ON LIKE) ─── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 1.4,
              x: p.x + p.targetX,
              y: p.y + p.targetY,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              fontSize: `${p.size}px`,
              filter: 'drop-shadow(0 0 8px rgba(255,131,184,0.8))',
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
        {[...Array(28)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 19.3) % 100}%`,
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

      {/* ─── TOP CHAPTER BADGE ─── */}
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
          <span>Chapter 05 — Little Moments, Big Feelings</span>
        </span>
      </motion.div>

      {/* ─── GRAND HEADING ─── */}
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
        Little Moments, Big Feelings
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
        A gentle, illuminated trail through the 5 precious milestones that built our little universe.
        <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--champagne-gold)', marginTop: '0.4rem' }}>
          ✨ Tap any photo for full-screen view • Tap the gem or heart to cherish
        </span>
      </motion.p>

      {/* ─── DUAL VIEW TOGGLE & CHERISHED COUNTER BAR ─── */}
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
        {/* Cherished Heart Counter */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.1rem',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(255, 131, 184, 0.12)',
            border: '1px solid rgba(255, 131, 184, 0.35)',
            boxShadow: '0 0 15px rgba(255, 131, 184, 0.2)',
            color: 'var(--warm-ivory)',
            fontSize: '0.82rem',
            fontWeight: 500,
          }}
        >
          <Heart size={15} color="#FF83B8" fill="#FF83B8" />
          <span>
            Treasured:{' '}
            <strong style={{ color: '#FFE0A0' }}>
              {likedMoments.size} of {momentsData.length}
            </strong>{' '}
            Milestones
          </span>
        </div>

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
            onClick={() => setViewMode('trail')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.42rem 0.95rem',
              borderRadius: 'var(--radius-xl)',
              fontSize: '0.8rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: viewMode === 'trail' ? 600 : 400,
              background: viewMode === 'trail' ? 'linear-gradient(135deg, #6D4CC2, #FF83B8)' : 'transparent',
              color: viewMode === 'trail' ? '#FFFFFF' : 'rgba(255,248,243,0.7)',
              boxShadow: viewMode === 'trail' ? '0 0 15px rgba(255,131,184,0.4)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <span>🌿</span>
            <span>Garden Trail View</span>
          </button>

          <button
            onClick={() => setViewMode('storybook')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.42rem 0.95rem',
              borderRadius: 'var(--radius-xl)',
              fontSize: '0.8rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: viewMode === 'storybook' ? 600 : 400,
              background: viewMode === 'storybook' ? 'linear-gradient(135deg, #FFE0A0, #FF83B8)' : 'transparent',
              color: viewMode === 'storybook' ? '#0B0B20' : 'rgba(255,248,243,0.7)',
              boxShadow: viewMode === 'storybook' ? '0 0 15px rgba(255,224,160,0.5)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <BookOpen size={14} />
            <span>Storybook Slider</span>
          </button>
        </div>
      </motion.div>

      {/* ─── QUICK MILESTONE SELECTOR BAR ─── */}
      <motion.div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.6rem',
          marginBottom: '3rem',
          zIndex: 10,
          maxWidth: '920px',
        }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {momentsData.map((m, idx) => {
          const isSelected = activeMilestone === idx;
          return (
            <motion.button
              key={m.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveMilestone(idx);
                if (viewMode === 'trail') {
                  const el = document.getElementById(`moment-card-${m.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-xl)',
                fontSize: '0.82rem',
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? '#0B0B20' : 'var(--warm-ivory)',
                background: isSelected
                  ? 'linear-gradient(135deg, #FFE0A0 0%, #FF83B8 100%)'
                  : 'rgba(23,16,46,0.75)',
                border: isSelected ? '1.5px solid #FFE0A0' : '1px solid rgba(205,187,255,0.22)',
                boxShadow: isSelected
                  ? '0 0 20px rgba(255,131,184,0.5), 0 4px 15px rgba(0,0,0,0.3)'
                  : '0 4px 15px rgba(0,0,0,0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontSize: '1rem' }}>{m.icon}</span>
              <span>{m.title}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* ─── VIEW MODE 1: ILLUMINATED GARDEN TRAIL (WINDING TIMELINE) ─── */}
      {viewMode === 'trail' && (
        <div
          style={{
            maxWidth: '1020px',
            width: '100%',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '3.5rem',
          }}
        >
          {/* Animated Central Glowing Starlight Vine */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40px',
              bottom: '40px',
              width: '3px',
              background:
                'linear-gradient(180deg, rgba(255,131,184,0.2) 0%, rgba(255,224,160,0.85) 25%, rgba(205,187,255,0.95) 50%, rgba(255,131,184,0.85) 75%, rgba(109,76,194,0.3) 100%)',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 20px rgba(255,224,160,0.6), 0 0 40px rgba(255,131,184,0.3)',
              zIndex: 1,
              overflow: 'hidden',
              contain: 'strict',
            }}
            className="timeline-center-line"
            aria-hidden="true"
          >
            {/* Travelling Golden Light Particle */}
            <motion.div
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 0 20px #FFE0A0, 0 0 35px #FF83B8',
              }}
            />
          </div>

          {momentsData.map((moment, idx) => {
            const isLeft = idx % 2 === 0;
            const isLiked = likedMoments.has(moment.id);
            const isEditing = editingId === moment.id;

            return (
              <motion.div
                key={moment.id}
                id={`moment-card-${moment.id}`}
                initial={{ opacity: 0, y: 40, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  gap: 'clamp(1rem, 3.5vw, 2.5rem)',
                  alignItems: 'center',
                  position: 'relative',
                }}
                className="timeline-row"
              >
                {/* Left Column (Card if left, empty slot if right) */}
                <div style={{ display: isLeft ? 'block' : 'none' }} className="timeline-left-slot">
                  {isLeft && (
                    <MomentCard
                      moment={moment}
                      isLiked={isLiked}
                      isEditing={isEditing}
                      onToggleHeart={(e) => triggerHeartParticles(e, moment.id)}
                      onStartEdit={() => setEditingId(moment.id)}
                      onSaveEdit={(text) => handleUpdateStory(moment.id, text)}
                      onOpenLightbox={() => setActiveLightbox(moment)}
                    />
                  )}
                </div>

                {/* Center Milestone Gem on Starlight Vine */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 4,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: 12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => triggerHeartParticles(e, moment.id)}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, #3e1b5b 0%, #150a26 100%)',
                      border: `2.5px solid ${moment.color}`,
                      boxShadow: `0 0 25px ${moment.color}80, inset 0 0 15px ${moment.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.45rem',
                      cursor: 'pointer',
                      userSelect: 'none',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                    }}
                    title="Milestone crystal node • Tap to send love"
                  >
                    {/* Rotating Aura Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        border: '1px dashed rgba(255, 224, 160, 0.6)',
                        pointerEvents: 'none',
                      }}
                    />
                    <span>{isLiked ? '❤️' : moment.icon}</span>
                  </motion.div>

                  <span
                    style={{
                      fontSize: '0.76rem',
                      color: moment.color,
                      fontWeight: 700,
                      marginTop: '0.45rem',
                      letterSpacing: '0.08em',
                      background: 'rgba(15, 10, 30, 0.8)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      border: `1px solid ${moment.color}40`,
                    }}
                  >
                    0{moment.id}
                  </span>
                </div>

                {/* Right Column (Card if right, empty slot if left) */}
                <div style={{ display: !isLeft ? 'block' : 'none' }} className="timeline-right-slot">
                  {!isLeft && (
                    <MomentCard
                      moment={moment}
                      isLiked={isLiked}
                      isEditing={isEditing}
                      onToggleHeart={(e) => triggerHeartParticles(e, moment.id)}
                      onStartEdit={() => setEditingId(moment.id)}
                      onSaveEdit={(text) => handleUpdateStory(moment.id, text)}
                      onOpenLightbox={() => setActiveLightbox(moment)}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── VIEW MODE 2: CINEMATIC STORYBOOK SLIDER ─── */}
      {viewMode === 'storybook' && (
        <div
          style={{
            maxWidth: '850px',
            width: '100%',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.96 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <MomentCard
                moment={momentsData[activeMilestone]}
                isLiked={likedMoments.has(momentsData[activeMilestone].id)}
                isEditing={editingId === momentsData[activeMilestone].id}
                onToggleHeart={(e) => triggerHeartParticles(e, momentsData[activeMilestone].id)}
                onStartEdit={() => setEditingId(momentsData[activeMilestone].id)}
                onSaveEdit={(text) => handleUpdateStory(momentsData[activeMilestone].id, text)}
                onOpenLightbox={() => setActiveLightbox(momentsData[activeMilestone])}
                isCarouselMode
              />
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
            }}
          >
            <button
              onClick={() => setActiveMilestone((prev) => (prev > 0 ? prev - 1 : momentsData.length - 1))}
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
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              }}
            >
              <ChevronLeft size={16} />
              <span>Previous Memory</span>
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              {momentsData.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveMilestone(i)}
                  style={{
                    width: activeMilestone === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: activeMilestone === i ? '#FF83B8' : 'rgba(255,255,255,0.25)',
                    boxShadow: activeMilestone === i ? '0 0 10px #FF83B8' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveMilestone((prev) => (prev < momentsData.length - 1 ? prev + 1 : 0))}
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
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              }}
            >
              <span>Next Memory</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─── FULL-SCREEN KEEPSAKE LIGHTBOX ─── */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
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
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '650px',
                width: '100%',
                background: 'rgba(23, 16, 46, 0.92)',
                border: `2px solid ${activeLightbox.color}`,
                boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 50px ${activeLightbox.color}40`,
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 3vw, 2.2rem)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--warm-ivory)',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>

              {/* Polaroid Photo in Lightbox */}
              <div
                style={{
                  padding: '12px 12px 24px 12px',
                  background: '#FFF8F3',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(255, 224, 160, 0.25)',
                  marginBottom: '1.2rem',
                  maxWidth: '520px',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxHeight: '55vh',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#120a1f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={activeLightbox.image}
                    alt={activeLightbox.title}
                    style={{
                      width: '100%',
                      maxHeight: '55vh',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      display: 'block',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-script)',
                    color: '#2B1038',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    marginTop: '12px',
                    textAlign: 'center',
                  }}
                >
                  {activeLightbox.title} • {activeLightbox.date}
                </div>
              </div>

              {/* Lightbox Story & Note */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  color: 'var(--warm-ivory)',
                  marginBottom: '0.4rem',
                }}
              >
                {activeLightbox.title}
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--soft-lavender)',
                  lineHeight: 1.7,
                  marginBottom: '1.2rem',
                }}
              >
                {activeLightbox.story}
              </p>

              <div
                style={{
                  padding: '0.85rem 1.2rem',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: `3px solid ${activeLightbox.color}`,
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: 'var(--champagne-gold)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                "{activeLightbox.sachinNote}"
                <span
                  style={{
                    display: 'block',
                    textAlign: 'right',
                    marginTop: '0.4rem',
                    fontFamily: 'var(--font-script)',
                    color: 'var(--rose-pink)',
                    fontSize: '1.1rem',
                  }}
                >
                  — Sachin ❤️
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PROGRESSION LINK TO CHAPTER 06 ─── */}
      <motion.div
        whileHover={{ y: 4 }}
        style={{ zIndex: 10, textAlign: 'center', marginTop: '4rem' }}
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
            Continue to Chapter 06 — Seven Names, One Favourite Person 🌸
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} color="#FFE0A0" />
          </motion.div>
        </button>
      </motion.div>

      {/* ─── RESPONSIVE STYLING ─── */}
      <style>{`
        @media (max-width: 820px) {
          .timeline-center-line {
            left: 28px !important;
          }
          .timeline-row {
            grid-template-columns: 56px 1fr !important;
            gap: 1rem !important;
          }
          .timeline-left-slot, .timeline-right-slot {
            display: block !important;
            grid-column: 2 !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── SUBCOMPONENT: ULTRA-LUXURY MOMENT CARD ───
function MomentCard({
  moment,
  isLiked,
  isEditing,
  onToggleHeart,
  onStartEdit,
  onSaveEdit,
  onOpenLightbox,
  isCarouselMode,
}) {
  const [editText, setEditText] = useState(moment.story);

  return (
    <div
      className="glass-card-premium"
      style={{
        padding: 'clamp(1.25rem, 2.5vw, 1.85rem)',
        borderRadius: 'var(--radius-lg)',
        border: isLiked ? `1.5px solid ${moment.color}` : '1px solid rgba(205,187,255,0.22)',
        boxShadow: isLiked
          ? `0 20px 50px rgba(0,0,0,0.65), 0 0 35px ${moment.color}35`
          : '0 15px 45px rgba(0,0,0,0.55)',
        textAlign: 'left',
        position: 'relative',
        transition: 'all 0.35s ease',
        background: 'linear-gradient(145deg, rgba(28, 17, 54, 0.85) 0%, rgba(14, 10, 29, 0.95) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Ambient Glow Pill in Card Background */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: moment.color,
          opacity: 0.08,
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />

      {/* ─── CARD HEADER: BADGE + ACTION BUTTONS ─── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.9rem',
        }}
      >
        <span
          style={{
            fontSize: '0.74rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: moment.color,
            fontWeight: 700,
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '3px 10px',
            borderRadius: '20px',
            border: `1px solid ${moment.color}35`,
          }}
        >
          {moment.date}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Edit Narrative Button */}
          <button
            onClick={onStartEdit}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              color: 'rgba(255,248,243,0.6)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            title="Personalize this memory text"
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFE0A0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,248,243,0.6)')}
          >
            <Edit3 size={14} />
          </button>

          {/* Expand Fullscreen Button */}
          <button
            onClick={onOpenLightbox}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              color: 'rgba(255,248,243,0.6)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            title="Expand Keepsake"
            onMouseEnter={(e) => (e.currentTarget.style.color = '#CDBBFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,248,243,0.6)')}
          >
            <Maximize2 size={14} />
          </button>

          {/* Heart Like Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onToggleHeart}
            style={{
              background: isLiked ? 'rgba(255,131,184,0.2)' : 'rgba(255,255,255,0.06)',
              border: isLiked ? '1px solid #FF83B8' : '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              color: isLiked ? '#FF83B8' : 'rgba(255,248,243,0.6)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: isLiked ? '0 0 12px rgba(255,131,184,0.4)' : 'none',
            }}
            title={isLiked ? 'Cherished memory' : 'Treasure this memory'}
          >
            <Heart size={15} fill={isLiked ? '#FF83B8' : 'none'} color={isLiked ? '#FF83B8' : 'currentColor'} />
          </motion.button>
        </div>
      </div>

      {/* ─── POLAROID KEEPSAKE PHOTO FRAME ─── */}
      <motion.div
        whileHover={{ scale: 1.02, rotate: 0.5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={onOpenLightbox}
        style={{
          background: '#FFF9F4',
          borderRadius: '12px',
          padding: '10px 10px 18px 10px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.45)',
          marginBottom: '1.2rem',
          cursor: 'pointer',
          position: 'relative',
        }}
        title="Tap to expand photo in HD"
      >
        {/* Vintage Brass Corner Washi Tape Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-6px',
            right: '25px',
            width: '55px',
            height: '16px',
            background: 'rgba(255, 224, 160, 0.75)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            transform: 'rotate(-4deg)',
            zIndex: 3,
            borderRadius: '2px',
          }}
        />

        {/* Photo Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: isCarouselMode ? 'clamp(280px, 40vw, 360px)' : 'clamp(260px, 32vw, 320px)',
            borderRadius: '8px',
            overflow: 'hidden',
            background: moment.bgGradient || 'radial-gradient(circle, #2d133b, #120a1f)',
          }}
        >
          <img
            src={moment.image}
            alt={moment.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              display: 'block',
              transition: 'transform 0.45s ease',
              transformOrigin: 'center 15%',
            }}
            onError={(e) => {
              // Graceful fallback to artistic gradient if missing
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Subtle Hover Overlay with Magnifying Glass */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              padding: '10px',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                color: '#FFF8F3',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(5px)',
                padding: '3px 8px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Maximize2 size={11} /> Tap to zoom
            </span>
          </div>
        </div>

        {/* Handwritten Polaroid Caption */}
        <div
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.2rem',
            color: '#341542',
            textAlign: 'center',
            marginTop: '8px',
            fontWeight: 600,
          }}
        >
          {moment.tag}
        </div>
      </motion.div>

      {/* ─── TITLE & SUBTITLE ─── */}
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.25rem, 1.9vw, 1.6rem)',
          color: 'var(--warm-ivory)',
          marginBottom: '0.25rem',
          lineHeight: 1.3,
        }}
      >
        {moment.title}
      </h3>

      <p
        style={{
          fontSize: '0.82rem',
          color: 'rgba(255,248,243,0.65)',
          fontStyle: 'italic',
          marginBottom: '1rem',
        }}
      >
        {moment.subtitle}
      </p>

      {/* ─── SPECIAL ANIMATED SOUNDWAVE FOR MILESTONE 02 (MIDNIGHT CALLS) ─── */}
      {moment.hasSoundwave && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.5rem 0.9rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(205, 187, 255, 0.08)',
            border: '1px solid rgba(205, 187, 255, 0.25)',
            marginBottom: '1rem',
          }}
        >
          <Volume2 size={16} color="#CDBBFF" />
          <span style={{ fontSize: '0.75rem', color: '#CDBBFF', fontWeight: 600 }}>
            Late Night Whispers Equalizer:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginLeft: 'auto' }}>
            {[18, 28, 12, 34, 22, 38, 16, 26, 32, 14].map((height, i) => (
              <motion.div
                key={i}
                animate={{ height: [height * 0.4, height, height * 0.4] }}
                transition={{
                  duration: 0.8 + (i % 4) * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
                style={{
                  width: '3px',
                  borderRadius: '2px',
                  background: 'linear-gradient(to top, #6D4CC2, #FF83B8)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── MAIN NARRATIVE / IN-PLACE EDIT ─── */}
      {isEditing ? (
        <div style={{ marginBottom: '1.2rem' }}>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0,0,0,0.5)',
              border: '1.5px solid var(--champagne-gold)',
              color: 'var(--warm-ivory)',
              fontSize: '0.92rem',
              outline: 'none',
              boxSizing: 'border-box',
              resize: 'vertical',
              fontFamily: 'inherit',
              lineHeight: 1.6,
            }}
          />
          <button
            className="btn-secondary"
            onClick={() => onSaveEdit(editText)}
            style={{
              marginTop: '0.5rem',
              fontSize: '0.78rem',
              padding: '0.4rem 0.95rem',
              background: 'linear-gradient(135deg, #FFE0A0, #FF83B8)',
              color: '#0B0B20',
              fontWeight: 600,
              border: 'none',
              borderRadius: 'var(--radius-xl)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <Check size={13} style={{ marginRight: 5 }} />
            Save Personalized Memory
          </button>
        </div>
      ) : (
        <p
          className="body-md"
          style={{
            lineHeight: 1.75,
            color: 'rgba(255,248,243,0.92)',
            marginBottom: '1.2rem',
            fontSize: '0.94rem',
          }}
        >
          {moment.story}
        </p>
      )}

      {/* ─── SACHIN'S INTIMATE HANDWRITTEN REFLECTION PLAQUE ─── */}
      <div
        style={{
          padding: '0.95rem 1.25rem',
          background: 'rgba(255,255,255,0.035)',
          borderRadius: 'var(--radius-sm)',
          borderLeft: `3.5px solid ${moment.color}`,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.25)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.92rem',
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: 'var(--warm-ivory)',
          }}
        >
          "{moment.sachinNote}"
        </p>
        <span
          style={{
            display: 'block',
            textAlign: 'right',
            marginTop: '0.45rem',
            fontSize: '1rem',
            fontFamily: 'var(--font-script)',
            color: 'var(--rose-pink)',
            letterSpacing: '0.04em',
          }}
        >
          — Forever Your Sachin ❤️
        </span>
      </div>
    </div>
  );
}
