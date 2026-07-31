import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'text' | 'click'>('default');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = target.closest('a, button, [role="button"], input, textarea, select');
      const isCard = target.closest('.card, .glass-card');
      const isText = target.closest('h1, h2, h3, p, span, li');

      if (isClickable) {
        setCursorType('hover');
      } else if (isCard) {
        setCursorType('hover');
      } else if (isText) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = () => setCursorType('click');
    const handleMouseUp = () => setCursorType('hover');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Glow Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border border-indigo-400 bg-indigo-50/10 mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'hover' ? 1.8 : cursorType === 'click' ? 0.9 : cursorType === 'text' ? 0.4 : 1,
          borderColor: cursorType === 'hover' ? '#2563EB' : '#4F46E5',
          backgroundColor: cursorType === 'hover' ? 'rgba(37, 99, 235, 0.05)' : 'rgba(79, 70, 229, 0.02)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-indigo-600 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'hover' ? 0.5 : cursorType === 'click' ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 20 }}
      />
    </>
  );
};
