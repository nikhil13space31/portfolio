import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaterRipples() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let lastSpawnTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Spawn a ripple every 60ms to create a smooth trail
      if (now - lastSpawnTime > 60) {
        lastSpawnTime = now;
        setRipples((prev) => [
          ...prev.slice(-15), // Keep max 15 ripples at a time to prevent lag
          { x: e.clientX, y: e.clientY, id: now },
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.5, scale: 0, borderWidth: '2px' }}
            animate={{ opacity: 0, scale: 2.5, borderWidth: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute w-16 h-16 border-primary rounded-full mix-blend-screen"
            style={{ left: r.x - 32, top: r.y - 32 }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((item) => item.id !== r.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
