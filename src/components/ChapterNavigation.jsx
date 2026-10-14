import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { chapters } from '../data/loveWorldData';

/**
 * ChapterNavigation — Persistent chapter menu with progress
 */
export default function ChapterNavigation({ currentChapter, onNavigate, visible }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Once the gate is unlocked, Chapter 1 is hidden; active chapters are Chapters 2-12
  const activeChapters = chapters.filter((c) => c.id !== 'gate');
  const currentIndex = activeChapters.findIndex((c) => c.id === currentChapter);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progress = ((safeIndex + 1) / activeChapters.length) * 100;

  if (!visible) return null;

  return (
    <>
      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(109, 76, 194, 0.15)',
          zIndex: 'var(--z-nav)',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--romantic-violet), var(--rose-pink))',
            borderRadius: '0 2px 2px 0',
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
          top: '3px',
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.25rem',
          zIndex: 'var(--z-nav)',
          background: 'linear-gradient(180deg, rgba(11,11,32,0.9) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      >
        {/* Prev button */}
        <button
          onClick={() => safeIndex > 0 && onNavigate(activeChapters[safeIndex - 1].id)}
          disabled={safeIndex <= 0}
          aria-label="Previous chapter"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(109, 76, 194, 0.15)',
            border: '1px solid rgba(205,187,255,0.15)',
            color: 'var(--soft-lavender)',
            fontSize: '0.75rem',
            opacity: safeIndex <= 0 ? 0.3 : 1,
            transition: 'all 0.3s ease',
            cursor: safeIndex <= 0 ? 'default' : 'pointer',
          }}
        >
          <ChevronLeft size={14} />
          <span className="nav-label">Prev</span>
        </button>

        {/* Chapter indicator + menu toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open chapter menu"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(109, 76, 194, 0.15)',
            border: '1px solid rgba(205,187,255,0.15)',
            color: 'var(--soft-lavender)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <Menu size={14} />
          <span className="nav-label">
            Ch {activeChapters[safeIndex]?.number || safeIndex + 2}/12
          </span>
        </button>

        {/* Next button */}
        <button
          onClick={() =>
            safeIndex < activeChapters.length - 1 && onNavigate(activeChapters[safeIndex + 1].id)
          }
          disabled={safeIndex >= activeChapters.length - 1}
          aria-label="Next chapter"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(109, 76, 194, 0.15)',
            border: '1px solid rgba(205,187,255,0.15)',
            color: 'var(--soft-lavender)',
            fontSize: '0.75rem',
            opacity: safeIndex >= activeChapters.length - 1 ? 0.3 : 1,
            transition: 'all 0.3s ease',
            cursor: safeIndex >= activeChapters.length - 1 ? 'default' : 'pointer',
          }}
        >
          <span className="nav-label">Next</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Full chapter menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{ alignItems: 'flex-start', paddingTop: '5vh' }}
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-premium"
              style={{ maxWidth: '480px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--warm-ivory)',
                  }}
                >
                  Chapters
                </h2>
                <button
                  className="btn-close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{ width: 36, height: 36 }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {activeChapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onNavigate(ch.id);
                      setMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background:
                        ch.id === currentChapter
                          ? 'rgba(109, 76, 194, 0.25)'
                          : 'rgba(255,255,255,0.03)',
                      border:
                        ch.id === currentChapter
                          ? '1px solid rgba(205,187,255,0.3)'
                          : '1px solid transparent',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background:
                          idx <= safeIndex
                            ? 'linear-gradient(135deg, var(--romantic-violet), var(--rose-pink))'
                            : 'rgba(109,76,194,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {ch.number}
                    </span>
                    <span
                      style={{
                        fontSize: '0.9rem',
                        color:
                          ch.id === currentChapter ? 'var(--warm-ivory)' : 'rgba(255,248,243,0.6)',
                      }}
                    >
                      {ch.title}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
