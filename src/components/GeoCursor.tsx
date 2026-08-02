import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GeoCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('a') ||
          target.closest('button'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Small Glowing Green Ball Cursor */}
      <motion.div
        className="fixed bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#00ff66,0_0_5px_#00ff66]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovered ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 40, mass: 0.1 }}
        style={{ left: 0, top: 0, width: 12, height: 12 }}
      />
    </div>
  );
}
