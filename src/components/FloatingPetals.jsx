import { useMemo } from 'react';

/**
 * FloatingPetals — Animated falling rose petals
 */
export default function FloatingPetals({ count = 12 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      size: Math.random() * 12 + 8,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.4 + 0.2,
      rotate: Math.random() * 360,
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        contain: 'strict',
        clipPath: 'inset(0)',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            left: `${petal.left}%`,
            top: '-20px',
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            opacity: petal.opacity,
            animation: `fallingPetal ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          <svg
            viewBox="0 0 20 20"
            width={petal.size}
            height={petal.size}
            style={{ transform: `rotate(${petal.rotate}deg)` }}
          >
            <ellipse
              cx="10"
              cy="10"
              rx="6"
              ry="9"
              fill="rgba(255, 131, 184, 0.6)"
              transform="rotate(30, 10, 10)"
            />
            <ellipse
              cx="10"
              cy="10"
              rx="5"
              ry="8"
              fill="rgba(255, 214, 231, 0.4)"
              transform="rotate(-20, 10, 10)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
