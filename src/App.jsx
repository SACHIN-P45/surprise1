import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChapterNavigation from './components/ChapterNavigation';
import StarField from './components/StarField';
import MusicControl from './components/MusicControl';

// Chapters
import SecretGate from './chapters/SecretGate';
import BeautifulWorld from './chapters/BeautifulWorld';
import BirthdayCelebration from './chapters/BirthdayCelebration';
import MemoryMuseum from './chapters/MemoryMuseum';
import MemoryJourney from './chapters/MemoryJourney';
import NicknameWorld from './chapters/NicknameWorld';
import FeelingsGarden from './chapters/FeelingsGarden';
import SecretLoveVault from './chapters/SecretLoveVault';
import FantasyWorld from './chapters/FantasyWorld';
import ForeverUniverse from './chapters/ForeverUniverse';
import LoveLetter from './chapters/LoveLetter';
import GrandFinale from './chapters/GrandFinale';

import { chapters } from './data/loveWorldData';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('gate');

  // Strictly lock scrolling until the golden key is turned
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
    };
  }, [hasEntered]);

  // Scroll spy to update current chapter as user scrolls (active only after unlocking)
  useEffect(() => {
    if (!hasEntered) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const id = entry.target.id.replace('chapter-', '');
          setCurrentChapter(id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0.3],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    chapters.forEach((ch) => {
      const el = document.getElementById(`chapter-${ch.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasEntered]);

  const handleNavigate = (chapterId) => {
    // Only allow navigation after gate is unlocked with the key
    if (!hasEntered && chapterId !== 'gate') {
      return;
    }
    setCurrentChapter(chapterId);
    const element = document.getElementById(`chapter-${chapterId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Called strictly after Chapter 01 golden key unlock animation finishes
  const handleEnterWorld = () => {
    setHasEntered(true);
    setCurrentChapter('beautiful-world');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReplay = () => {
    setCurrentChapter('beautiful-world');
    const element = document.getElementById('chapter-beautiful-world');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      {/* Background Starfield across whole universe */}
      <StarField density={120} />

      {/* Chapter Navigation appears strictly after gate is unlocked */}
      <ChapterNavigation
        currentChapter={currentChapter}
        onNavigate={handleNavigate}
        visible={hasEntered}
      />

      {/* Floating Ambient Music Control (activates strictly once inside) */}
      <MusicControl hasEntered={hasEntered} />

      <main>
        {/* Chapter 01 — The Secret Gate (Locked entrance): Completely removed once door is opened */}
        {!hasEntered && (
          <SecretGate onEnter={handleEnterWorld} />
        )}

        {/* Chapters 02–12: Displayed once the door is opened */}
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Chapter 02 — A Beautiful World */}
            <BeautifulWorld />

            {/* Chapter 03 — Happy Birthday, Samithra */}
            <BirthdayCelebration />

            {/* Chapter 04 — Our Memory Museum */}
            <MemoryMuseum />

            {/* Chapter 05 — Little Moments, Big Feelings */}
            <MemoryJourney />

            {/* Chapter 06 — Seven Names, One Favourite Person */}
            <NicknameWorld />

            {/* Chapter 07 — The Garden of Feelings */}
            <FeelingsGarden />

            {/* Chapter 08 — The Secret Love Vault */}
            <SecretLoveVault />

            {/* Chapter 09 — If I Could Give You the World */}
            <FantasyWorld />

            {/* Chapter 10 — Our Forever Universe */}
            <ForeverUniverse />

            {/* Chapter 11 — A Letter from Sachin */}
            <LoveLetter />

            {/* Chapter 12 — The Grand Final Surprise */}
            <GrandFinale onReplay={handleReplay} />
          </motion.div>
        )}
      </main>
    </div>
  );
}
