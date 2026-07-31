import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex items-center justify-center p-6 select-none">
      {/* Floating 3D card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="relative w-80 h-96 md:w-96 md:h-[480px] rounded-[32px] glass-card p-4 flex flex-col justify-between cursor-pointer overflow-hidden shadow-luxury hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Soft gloss shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/40 pointer-events-none" />

        {/* Profile Image Frame */}
        <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-slate-900/50 border border-slate-800/85" style={{ transform: 'translateZ(30px)' }}>
          <img
            src="/profile.png"
            alt="Potnuru Samita"
            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            draggable="false"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};
