import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Eye, ChevronDown, MapPin, Compass } from 'lucide-react';
import { memories } from '../data/loveWorldData';
import PhotoLightbox from '../components/PhotoLightbox';
import FloatingPetals from '../components/FloatingPetals';

/**
 * Chapter 04 — Our Dream Museum (AI Love Portraits Edition)
 *
 * Designed specifically for Sachin & Samithra:
 * Distance has kept real cameras apart for now, so these AI portraits represent
 * their imagined moments, dream dates, and future promises together.
 *
 * Features:
 * - Ultra-luxury romantic collectible dream cards
 * - Direct mapping to Sachin's code-configured images in `public/images/memories/`
 * - Elegant fallback canvas with animated stars and typography if an image is loading/pending
 * - In-browser live preview helper so Sachin can test local files before committing
 * - Interactive heart reactions with counter
 * - Full-screen dream card lightbox
 */
export default function MemoryMuseum() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [likedMemories, setLikedMemories] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());

  // Prepare cards with design system themes
  const cards = memories.map((mem) => ({
    ...mem,
    displaySrc: mem.src,
    theme: {
      accent: mem.accentColor || '#FF83B8',
      artGradient: mem.artGradient || 'linear-gradient(135deg, #1b0a2a 0%, #3e1b5b 50%, #6d2d7d 100%)',
      icon: mem.icon || '✨',
    },
  }));

  const filteredCards = cards;

  const toggleLike = (id, e) => {
    e.stopPropagation();
    const next = new Set(likedMemories);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setLikedMemories(next);
  };



  const scrollToNext = () => {
    const el = document.getElementById('chapter-moments');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="chapter-section bg-midnight-galaxy"
      id="chapter-museum"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3.5rem, 6vw, 6rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FloatingPetals count={12} />



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
            border: '1px solid rgba(255, 224, 160, 0.45)',
            boxShadow: '0 0 24px rgba(109,76,194,0.35)',
            color: 'var(--champagne-gold)',
            fontSize: '0.85rem',
            padding: '0.45rem 1.25rem',
          }}
        >
          <Sparkles size={14} style={{ marginRight: 7, color: '#FFE0A0' }} />
          Our Cherished Love Portraits
        </span>
      </motion.div>

      {/* ─── MAIN TITLE ─── */}
      <motion.h2
        className="heading-lg"
        style={{
          fontFamily: 'var(--font-serif)',
          textAlign: 'center',
          marginBottom: '0.8rem',
          background: 'linear-gradient(135deg, #FFF8F3 0%, #FFE0A0 45%, #FF83B8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          zIndex: 10,
          lineHeight: 1.2,
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
        }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Visions of Us — Frames of Our Heart
      </motion.h2>

      {/* ─── ROMANTIC DEDICATION BANNER (SACHIN'S HEARTFELT STORY) ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        viewport={{ once: true }}
        style={{
          maxWidth: '780px',
          width: '100%',
          margin: '0 auto 2.2rem auto',
          padding: '1.25rem 1.75rem',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(23,16,46,0.85) 0%, rgba(45,24,80,0.65) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 224, 160, 0.3)',
          boxShadow: '0 16px 45px rgba(0,0,0,0.45), 0 0 35px rgba(255,131,184,0.15)',
          zIndex: 10,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
          <span style={{ fontSize: '1.2rem' }}>💌</span>
          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--champagne-gold)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            A Tender Truth From Sachin
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.08rem)',
            color: 'var(--warm-ivory)',
            lineHeight: 1.7,
            fontStyle: 'italic',
            marginBottom: '0.5rem',
          }}
        >
          “Samithra, every single frame of us is a piece of heaven. From sitting side by side on campus to watching the golden sunset by the water, holding you close and seeing your radiant smile in pink, black, and royal purple... being with you is the greatest gift of my life. These photos are not just memories; they are proof that my heart belongs entirely to you.”
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.6rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,224,160,0.15)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--soft-lavender)' }}>
            ✨ Touch any portrait card to view full screen or cherish as a favorite
          </span>
          <span style={{ fontFamily: 'var(--font-script)', color: 'var(--rose-pink)', fontSize: '1.1rem' }}>
            — With all my love, Sachin ❤️
          </span>
        </div>
      </motion.div>

      {/* ─── STATUS BAR (FAVORITES COUNTER) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginBottom: '2.5rem',
          zIndex: 10,
        }}
      >
        {/* Liked count badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.15rem',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(23,16,46,0.7)',
            border: '1px solid rgba(255,131,184,0.3)',
            fontSize: '0.82rem',
            color: 'var(--warm-ivory)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
          }}
        >
          <Heart size={15} color="#FF83B8" fill={likedMemories.size > 0 ? '#FF83B8' : 'none'} />
          <span>
            {likedMemories.size === 0
              ? 'Tap hearts to cherish your favourite dreams'
              : `${likedMemories.size} of ${cards.length} Dreams Cherished`}
          </span>
        </div>
      </motion.div>

      {/* ─── LUXURY DREAM CARDS GRID ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(330px, 100%), 1fr))',
          gap: '2rem',
          maxWidth: '1160px',
          width: '100%',
          zIndex: 10,
          marginBottom: '3rem',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card, idx) => {
            const isLiked = likedMemories.has(card.id);

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={{ y: -8 }}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() => setLightboxIndex(idx)}
                className="dream-card-item"
              >
                {/* 3D Glassmorphism Luxury Card Shell */}
                <div
                  className="glass-card-premium"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-lg)',
                    border: isLiked
                      ? '1.5px solid rgba(255,131,184,0.7)'
                      : '1.5px solid rgba(255,224,160,0.3)',
                    boxShadow: isLiked
                      ? '0 18px 45px rgba(255,131,184,0.3), 0 0 25px rgba(255,131,184,0.2)'
                      : '0 16px 45px rgba(0,0,0,0.65)',
                    transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(180deg, rgba(23,16,46,0.92) 0%, rgba(11,11,32,0.96) 100%)',
                  }}
                >
                  {/* ── CARD TOP BAR (Badge + Category + Like) ── */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1.15rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderBottom: '1px solid rgba(205,187,255,0.1)',
                      zIndex: 3,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--champagne-gold)',
                          background: 'rgba(255,224,160,0.12)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 6,
                          border: '1px solid rgba(255,224,160,0.25)',
                        }}
                      >
                        {card.cardBadge || `DREAM 0${card.id}`}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: card.accentColor,
                          fontWeight: 500,
                        }}
                      >
                        {card.categoryLabel}
                      </span>
                    </div>

                    {/* Heart button */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={(e) => toggleLike(card.id, e)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: isLiked ? 'rgba(255,131,184,0.25)' : 'rgba(23,16,46,0.7)',
                        border: isLiked ? '1px solid #FF83B8' : '1px solid rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                      title={isLiked ? 'Cherished in your heart' : 'Mark as favorite dream'}
                    >
                      <Heart
                        size={15}
                        color={isLiked ? '#FF83B8' : '#FFF8F3'}
                        fill={isLiked ? '#FF83B8' : 'none'}
                      />
                    </motion.button>
                  </div>

                  {/* ── CARD VISUAL PORTRAIT STAGE ── */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 4.8',
                      position: 'relative',
                      overflow: 'hidden',
                      background: card.artGradient,
                    }}
                  >
                    {/* The Image */}
                    <img
                      src={card.displaySrc}
                      alt={card.title}
                      loading="eager"
                      onError={() => {
                        setFailedImages((prev) => new Set(prev).add(card.id));
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        display: failedImages.has(card.id) ? 'none' : 'block',
                        transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    />

                    {/* Fallback Canvas: ONLY displayed if image fails to load */}
                    {failedImages.has(card.id) && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '1.5rem',
                          textAlign: 'center',
                          background: card.artGradient,
                        }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -6, 0],
                            scale: [1, 1.08, 1],
                          }}
                          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                          style={{
                            fontSize: '3.2rem',
                            marginBottom: '0.4rem',
                            filter: `drop-shadow(0 0 20px ${card.accentColor})`,
                          }}
                        >
                          {card.icon}
                        </motion.div>

                        <span
                          style={{
                            fontSize: '0.88rem',
                            color: card.accentColor,
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                          }}
                        >
                          {card.title}
                        </span>

                        <span
                          style={{
                            fontSize: '0.74rem',
                            color: 'var(--warm-ivory)',
                            opacity: 0.8,
                            marginTop: '0.35rem',
                            maxWidth: '240px',
                            lineHeight: 1.4,
                          }}
                        >
                          AI Dream Portrait • Sachin & Samithra
                        </span>

                        <span
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--champagne-gold)',
                            marginTop: '0.5rem',
                            background: 'rgba(0,0,0,0.4)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-xl)',
                            border: '1px solid rgba(255,224,160,0.2)',
                          }}
                        >
                          Code path: {card.src}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── CARD STORY & INSCRIPTION PLAQUE ── */}
                  <div
                    style={{
                      padding: '1.25rem 1.35rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      textAlign: 'left',
                    }}
                  >
                    {/* Location & Date */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        marginBottom: '0.45rem',
                        fontSize: '0.72rem',
                        color: 'var(--soft-lavender)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: card.accentColor }}>
                        <MapPin size={12} />
                        {card.dreamLocation}
                      </span>
                      <span style={{ opacity: 0.75 }}>{card.date}</span>
                    </div>

                    {/* Card Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.22rem',
                        color: 'var(--warm-ivory)',
                        marginBottom: '0.45rem',
                        lineHeight: 1.3,
                      }}
                    >
                      {card.title}
                    </h3>

                    {/* Romantic Quote */}
                    <p
                      style={{
                        fontSize: '0.86rem',
                        color: 'rgba(255,248,243,0.85)',
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                        marginBottom: '0.65rem',
                      }}
                    >
                      “{card.quote}”
                    </p>

                    {/* Sachin's personal note */}
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--soft-lavender)',
                        lineHeight: 1.5,
                        opacity: 0.8,
                        marginBottom: '1rem',
                      }}
                    >
                      {card.message}
                    </p>

                    {/* Card Footer Bar */}
                    <div
                      style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid rgba(205,187,255,0.12)',
                        fontSize: '0.76rem',
                        color: 'var(--champagne-gold)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Eye size={13} />
                        Enlarge Card
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-script)',
                          color: 'var(--rose-pink)',
                          fontSize: '0.98rem',
                        }}
                      >
                        — Sachin & Samithra
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ─── FULL-SCREEN DREAM CARD LIGHTBOX ─── */}
      {lightboxIndex >= 0 && (
        <PhotoLightbox
          images={filteredCards}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* ─── PROGRESSION LINK TO CHAPTER 05 ─── */}
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
            gap: '0.35rem',
            fontSize: '0.82rem',
            opacity: 0.8,
            transition: 'opacity 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
        >
          <span>Continue to Little Moments, Big Feelings</span>
          <ChevronDown size={18} />
        </button>
      </motion.div>

      <style>{`
        .dream-card-item:hover .glass-card-premium {
          border-color: rgba(255, 224, 160, 0.65) !important;
          box-shadow: 0 20px 50px rgba(255, 131, 184, 0.25), 0 0 30px rgba(109, 76, 194, 0.3) !important;
        }
      `}</style>
    </section>
  );
}
