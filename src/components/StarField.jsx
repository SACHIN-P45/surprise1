import { useMemo } from 'react';

/**
 * StarField — Animated twinkling star background
 * Creates a layered parallax star field using pure CSS
 */
export default function StarField({ density = 60 }) {
  const stars = useMemo(() => {
    const arr = [];
    const animTypes = ['twinkleFast', 'twinkle', 'twinkleSlow'];
    for (let i = 0; i < density; i++) {
      arr.push({
        id: i,
        x: Math.round(Math.random() * 100),
        y: Math.round(Math.random() * 100),
        size: Number((Math.random() * 1.8 + 0.6).toFixed(1)),
        opacity: Number((Math.random() * 0.6 + 0.3).toFixed(2)),
        anim: animTypes[i % 3],
        duration: (3 + (i % 4)).toFixed(1),
        delay: ((i % 5) * 0.8).toFixed(1),
      });
    }
    return arr;
  }, [density]);

  return (
    <div
      className="starfield"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        contain: 'strict',
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'opacity',
        }}
      >
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill="#E8E0FF"
            opacity={star.opacity}
            style={{
              animation: `${star.anim} ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
