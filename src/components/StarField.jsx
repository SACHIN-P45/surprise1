import { useMemo } from 'react';

/**
 * StarField — Animated twinkling star background
 * Creates a layered parallax star field using pure CSS
 */
export default function StarField({ density = 80 }) {
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < density; i++) {
      arr.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      });
    }
    return arr;
  }, [density]);

  return (
    <div className="starfield" aria-hidden="true">
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill="#E8E0FF"
            opacity={star.opacity}
            style={{
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
