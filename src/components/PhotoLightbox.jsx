import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Heart, Sparkles } from 'lucide-react';

/**
 * PhotoLightbox — Full-screen image & romantic exhibit viewer with navigation
 */
export default function PhotoLightbox({ images, currentIndex, onClose, onNavigate }) {
  const current = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) onNavigate(currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    },
    [onClose, handlePrev, handleNext]
  );

  if (!current) return null;

  const imgSrc = current.displaySrc || current.src;
  const theme = current.theme;

  return (
    <AnimatePresence>
      <motion.div
        className="overlay-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="dialog"
        aria-label="Photo lightbox"
        style={{ cursor: 'pointer', zIndex: 200 }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card-premium"
          style={{
            position: 'relative',
            maxWidth: '680px',
            width: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
            cursor: 'default',
            padding: '2rem',
            border: '1.5px solid rgba(255,224,160,0.4)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(109,76,194,0.3)',
            overflowY: 'auto',
          }}
        >
          {/* Close button */}
          <button
            className="btn-close"
            onClick={onClose}
            aria-label="Close lightbox"
            style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
          >
            <X size={18} />
          </button>

          {/* Image Stage */}
          <div
            style={{
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 15px 45px rgba(0,0,0,0.6)',
              border: '1px solid rgba(205, 187, 255, 0.2)',
              position: 'relative',
              background: theme ? theme.artGradient : 'linear-gradient(135deg, #17102e, #2d1850)',
              minHeight: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={imgSrc}
              alt={current.title || current.caption || 'Memory'}
              style={{
                width: '100%',
                maxHeight: '60vh',
                objectFit: 'contain',
                display: 'block',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />

            {/* If image fails or placeholder, theme art is visible underneath */}
            {theme && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                  background: theme.artGradient,
                  zIndex: -1,
                }}
              >
                <div style={{ fontSize: '4.5rem', marginBottom: '0.5rem' }}>{theme.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--warm-ivory)' }}>
                  {current.title}
                </h4>
                <p style={{ color: theme.accent, fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Exhibit #{current.id} • {current.date}
                </p>
              </div>
            )}
          </div>

          {/* Inscription & Intimate Note */}
          <div style={{ textAlign: 'center', maxWidth: '580px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              {current.cardBadge && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--champagne-gold)',
                    background: 'rgba(255,224,160,0.15)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 4,
                    border: '1px solid rgba(255,224,160,0.3)',
                  }}
                >
                  {current.cardBadge}
                </span>
              )}
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: theme ? theme.accent : 'var(--champagne-gold)',
                  fontWeight: 600,
                }}
              >
                {current.dreamLocation ? `📍 ${current.dreamLocation} • ${current.date}` : current.date}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                color: 'var(--warm-ivory)',
                margin: '0.3rem 0 0.75rem 0',
              }}
            >
              {current.title || current.caption}
            </h3>

            <div
              style={{
                padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(205,187,255,0.1)',
                marginBottom: '0.75rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  color: 'var(--warm-ivory)',
                  marginBottom: current.message && current.quote !== current.message ? '0.5rem' : 0,
                }}
              >
                "{current.quote || current.caption || current.message}"
              </p>
              {current.message && current.quote !== current.message && (
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--soft-lavender)',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(205,187,255,0.1)',
                    paddingTop: '0.5rem',
                    marginTop: '0.5rem',
                  }}
                >
                  {current.message}
                </p>
              )}
            </div>

            <p className="signature-text" style={{ textAlign: 'right', fontSize: '1.1rem' }}>
              — Forever Sachin & Samithra ❤️
            </p>
          </div>

          {/* Navigation Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '0.5rem',
            }}
          >
            <button
              className="btn-secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous exhibit"
              style={{ opacity: currentIndex === 0 ? 0.3 : 1, padding: '0.5rem 1.1rem' }}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <span style={{ fontSize: '0.85rem', color: 'var(--soft-lavender)', fontWeight: 500 }}>
              {currentIndex + 1} of {images.length}
            </span>

            <button
              className="btn-secondary"
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
              aria-label="Next exhibit"
              style={{
                opacity: currentIndex === images.length - 1 ? 0.3 : 1,
                padding: '0.5rem 1.1rem',
              }}
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
