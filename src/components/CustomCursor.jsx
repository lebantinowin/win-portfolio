import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer trailing ring - slower spring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Inner dot - fast spring
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 1000, mass: 0.1 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 1000, mass: 0.1 });

  const [isHovering, setIsHovering] = useState(false);
  const [touchTrails, setTouchTrails] = useState([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    // ── Desktop: Mouse tracking ──
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // ── Mobile: Touch tracking ──
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (!touch) return;

      const id = trailIdRef.current++;
      const x = touch.clientX;
      const y = touch.clientY;

      setTouchTrails(prev => [...prev, { id, x, y }]);

      // Remove trail particle after animation
      setTimeout(() => {
        setTouchTrails(prev => prev.filter(t => t.id !== id));
      }, 600);
    };

    const handleTouchEnd = () => {
      // Trails will self-clean via timeout
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* ── Desktop Cursor (hidden on touch devices) ── */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border-2 border-primary hidden md:block"
        style={{
          x: springX,
          y: springY,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.3 : 0.6,
          backgroundColor: isHovering ? 'var(--color-primary)' : 'transparent',
          transition: 'scale 0.2s ease-out, background-color 0.2s ease-out, opacity 0.2s ease-out'
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        style={{ x: dotX, y: dotY }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-primary"
          style={{ opacity: isHovering ? 0 : 1, transition: 'opacity 0.2s ease-out' }}
        />
      </motion.div>

      {/* ── Mobile Touch Trails ── */}
      {touchTrails.map((trail) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[9999] rounded-full md:hidden"
          initial={{ opacity: 0.7, scale: 1, x: trail.x - 10, y: trail.y - 10 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            width: 20,
            height: 20,
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
          }}
        />
      ))}
    </>
  );
}
