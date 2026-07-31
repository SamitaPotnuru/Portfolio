import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds loading
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // Wait for transition animation
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-content-center h-screen w-screen overflow-hidden"
          exit={{
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-transparent noise-bg opacity-[0.02]" />

          {/* Floating animated blobs */}
          <div className="absolute top-[20%] left-[20%] w-96 h-96 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 filter blur-3xl opacity-40 animate-pulse" />
          <div className="absolute bottom-[20%] right-[20%] w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-50 to-indigo-50 filter blur-3xl opacity-30 animate-pulse" />

          {/* Center 3D cube emulation container */}
          <div className="flex flex-col items-center z-10">
            {/* Spinning isometric glass box */}
            <div className="relative w-24 h-24 mb-10 perspective-1000">
              <motion.div
                className="w-full h-full border border-indigo-200/60 rounded-2xl glass-card flex items-center justify-center shadow-lg"
                animate={{
                  rotateY: [0, 180, 360],
                  rotateX: [15, -15, 15],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-xl font-bold font-space bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PS
                </div>
              </motion.div>
            </div>

            {/* Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-space font-bold tracking-widest text-slate-800 uppercase"
            >
              Potnuru Samita
            </motion.h1>
            <p className="text-xs font-mono tracking-widest text-slate-400 mt-2">
              CREATIVE ENGINEERING • AI/ML • VLSI
            </p>

            {/* Progress Percentage */}
            <div className="mt-12 text-5xl font-space font-light text-slate-900 tabular-nums">
              {progress}%
            </div>

            {/* Premium Loader Bar */}
            <div className="w-64 h-[2px] bg-slate-100 rounded-full mt-6 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Interactive hint */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="mt-20 text-[10px] tracking-widest font-mono text-slate-400"
            >
              PREPARING DYNAMIC EXPERIENCE...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
