import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import {
  ArrowUpRight
} from 'lucide-react';

import { SkillUniverse } from './components/SkillUniverse';


function App() {
  const loading = false;
  const [activeSection, setActiveSection] = useState('about');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loading]);

  // Mouse Move Listener for Spotlight Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll spy to active navigation indicators
  useEffect(() => {
    if (loading) return;
    const sections = ['about', 'education', 'internships', 'projects', 'skills', 'competitions', 'responsibility', 'achievements'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-slate-900 text-slate-400 min-h-screen selection:bg-teal-300 selection:text-teal-900 font-sans"
          >
            {/* Ambient Noise overlay */}
            <div className="noise-bg" />

            {/* Mouse Spotlight effect */}
            <div
              className="pointer-events-none fixed inset-0 z-30 transition duration-300 hidden lg:block"
              style={{
                background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
              }}
            />

            {/* In-page skip to content helper */}
            <a href="#content" className="absolute left-0 top-0 block -translate-x-full rounded bg-teal-400 px-4 py-3 text-sm font-bold uppercase tracking-widest text-teal-950 focus-visible:translate-x-0 z-50">
              Skip to Content
            </a>

            {/* FULL SCREEN CONTAINER: max-w-screen-2xl & padding adjustments */}
            <div className="mx-auto min-h-screen max-w-screen-2xl px-4 py-16 md:px-8 lg:px-12 lg:py-0">
              <div className="lg:flex lg:justify-between lg:gap-8">
                
                {/* ───────────────── LEFT SIDEBAR (STICKY HEADER) ───────────────── */}
                <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-center lg:gap-6 lg:py-12">
                  <div className="flex flex-col text-left">
                    {/* Title with hovering gradient text effect */}
                    <h1 className="text-6xl font-black tracking-tight text-slate-200 sm:text-7xl font-space">
                      <a href="/" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-teal-300 transition-all duration-500">
                        Potnuru Samita
                      </a>
                    </h1>
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
                      Full Stack Software Engineer
                    </h2>
                    <p className="mt-8 max-w-lg leading-relaxed text-slate-400 text-base md:text-lg text-justify">
                      I am a Software Developer, crafting high‑performance web applications, architecting scalable backend systems, and deploying intelligent cloud solutions that drive innovation and efficiency.
                    </p>

                    {/* Navigation Menu Links with glowing teal indicators for active state */}
                    <nav className="nav hidden lg:block" aria-label="In-page jump links">
                      <ul className="mt-10 w-max font-space">
                        {['about', 'education', 'internships', 'projects', 'skills', 'competitions', 'responsibility', 'achievements'].map((section) => {
                          const isActive = activeSection === section;
                          return (
                            <li key={section}>
                              <a
                                className={`group flex items-center py-2.5 ${isActive ? 'active' : ''}`}
                                href={`#${section}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                              >
                                <span className={`mr-4 h-px transition-all duration-300 motion-reduce:transition-none ${
                                  isActive
                                    ? 'w-16 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]'
                                    : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                                }`} />
                                <span className={`text-base font-bold uppercase tracking-widest transition-colors duration-300 ${
                                  isActive
                                    ? 'text-slate-100'
                                    : 'text-slate-500 group-hover:text-slate-200'
                                }`}>
                                  {section}
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>

                  {/* Interactive Social Connections with subtle hover shadows */}
                  <div className="flex flex-wrap gap-3.5 mt-10 items-center justify-start">
                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/samita-potnuru-073802259/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400/60 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>

                    {/* Resume PDF */}
                    <a
                      href="/POTNURUSAMITA.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Resume PDF"
                      className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400/60 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/SamitaPotnuru"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400/60 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>

                    {/* LeetCode */}
                    <a
                      href="https://leetcode.com/u/PotnuruSamita/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LeetCode"
                      className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400/60 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.111.696-1.744.696a2.285 2.285 0 0 1-1.611-.666L2.2 12.914a2.443 2.443 0 0 1 0-3.374l2.87-2.782a.574.574 0 0 1 .801.007l.852.825a.51.51 0 0 1-.004.732l-2.59 2.502a1.036 1.036 0 0 0 0 1.43l7.464 7.228a1.03 1.03 0 0 0 1.455 0l2.366-2.293a.573.573 0 0 1 .802.007l.852.825a.51.51 0 0 1-.005.73zm1.1-6.195l-7.464-7.23a1.03 1.03 0 0 0-1.455 0L5.917 6.8a.573.573 0 0 1-.802-.007l-.852-.826a.51.51 0 0 1 .005-.731l2.69-2.607c.466-.451 1.111-.696 1.744-.696a2.285 2.285 0 0 1 1.611.666L17.8 10.364a2.443 2.443 0 0 1 0 3.374l-2.87 2.782a.574.574 0 0 1-.801-.007l-.852-.825a.51.51 0 0 1 .004-.732l2.59-2.502a1.036 1.036 0 0 0 0-1.43z"/>
                        <path d="M7.411 11.537H16.59a.63.63 0 0 1 .63.63v.84a.63.63 0 0 1-.63.63H7.411a.63.63 0 0 1-.63-.63v-.84a.63.63 0 0 1 .63-.63z"/>
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/hey_samita/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400/60 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com/@Samita_P"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400/60 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>

                    {/* Mail */}
                    <a
                      href="mailto:samitapotnuru@gmail.com"
                      aria-label="Email"
                      className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400/60 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                      </svg>
                    </a>
                  </div>
                </header>

                {/* ───────────────── RIGHT SIDEBAR (SCROLLING CONTENT) ───────────────── */}
                <main id="content" className="pt-12 lg:w-[50%] lg:py-24 text-left">
                  
                  {/* ABOUT SECTION */}
                  <section id="about" className="mb-24 scroll-mt-16 md:mb-32 lg:mb-44 lg:scroll-mt-24" aria-label="About me">
                    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                      <p className="leading-relaxed text-base md:text-lg text-slate-400 text-justify">
                        I’m Samita Potnuru, a Full Stack Software Developer passionate about turning ideas into impactful digital experiences. I specialize in building high‑performance web applications, designing scalable backend systems, and deploying intelligent cloud solutions that empower users and businesses alike.
                      </p>
                      <p className="leading-relaxed text-base md:text-lg text-slate-400 text-justify">
                        Beyond code, I thrive on solving complex problems with creativity and precision. Whether it’s architecting microservices, optimizing databases, or crafting intuitive user interfaces, I bring a balance of technical depth and user‑centric design to every project.
                      </p>
                      <p className="leading-relaxed text-base md:text-lg text-slate-400 text-justify">
                        My journey includes hands‑on internships, academic projects, and real‑world collaborations that sharpened my skills in React.js, Node.js, Python, and cloud platforms. Each milestone reflects my drive to learn, adapt, and deliver solutions that make technology accessible and meaningful.
                      </p>
                      <p className="leading-relaxed text-base md:text-lg text-slate-400 text-justify">
                        ✨ What excites me most? Building systems that don’t just work — they inspire confidence, scale effortlessly, and leave a lasting impact.
                      </p>
                    </div>
                  </section>

                  {/* EDUCATION SECTION */}
                  <section id="education" className="mb-24 scroll-mt-16 md:mb-32 lg:mb-44 lg:scroll-mt-24" aria-label="Education">
                    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Education</h2>
                    </div>

                    <div>
                      <ol className="flex flex-col gap-14">
                        {/* B.Tech */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('edu-btech')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'edu-btech' ? null : 'edu-btech')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'edu-btech' || selectedItem === 'edu-btech') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="Graduating 2026">
                              2022 — 2026
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <span className="inline-flex items-baseline font-semibold leading-tight text-slate-200 text-lg md:text-xl font-space">
                                    B.Tech in Electronics & Communication Engineering
                                  </span>
                                </div>
                              </h3>
                              <p className="text-sm font-semibold text-teal-400 mt-1">Gandhi Institute of Technology and Management (GITAM) University</p>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'edu-btech' || selectedItem === 'edu-btech') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'edu-btech' || selectedItem === 'edu-btech') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 text-justify">
                                  <strong>CGPA:</strong> 8.98 / 10
                                </p>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* MPC */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('edu-mpc')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'edu-mpc' ? null : 'edu-mpc')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'edu-mpc' || selectedItem === 'edu-mpc') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="Completed 2022">
                              2020 — 2022
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <span className="inline-flex items-baseline font-semibold leading-tight text-slate-200 text-lg md:text-xl font-space">
                                    Intermediate (MPC)
                                  </span>
                                </div>
                              </h3>
                              <p className="text-sm font-semibold text-teal-400 mt-1">Sri Chaitanya College</p>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'edu-mpc' || selectedItem === 'edu-mpc') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'edu-mpc' || selectedItem === 'edu-mpc') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 text-justify">
                                  <strong>CGPA:</strong> 8.73 / 10
                                </p>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* SSC */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('edu-ssc')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'edu-ssc' ? null : 'edu-ssc')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'edu-ssc' || selectedItem === 'edu-ssc') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="Completed 2020">
                              2020
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <span className="inline-flex items-baseline font-semibold leading-tight text-slate-200 text-lg md:text-xl font-space">
                                    Secondary School Certificate (SSC)
                                  </span>
                                </div>
                              </h3>
                              <p className="text-sm font-semibold text-teal-400 mt-1">Amar School</p>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'edu-ssc' || selectedItem === 'edu-ssc') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'edu-ssc' || selectedItem === 'edu-ssc') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 text-justify">
                                  <strong>CGPA:</strong> 9.0 / 10
                                </p>
                              </motion.div>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </section>

                  {/* INTERNSHIPS SECTION */}
                  <section id="internships" className="mb-24 scroll-mt-16 md:mb-32 lg:mb-44 lg:scroll-mt-24" aria-label="Internships">
                    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Internships</h2>
                    </div>

                    <div>
                      <ol className="flex flex-col gap-14">
                        {/* IIT Madras */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('internship-iit-madras')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'internship-iit-madras' ? null : 'internship-iit-madras')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'internship-iit-madras' || selectedItem === 'internship-iit-madras') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="May 2025 to July 2025">
                              May — Jul 2025
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/iitminternship" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>Research Intern (Summer Fellowship Programme) · <span className="inline-block">IIT Madras<ArrowUpRight size={18} className="inline-block ml-0.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" /></span></span>
                                  </a>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'internship-iit-madras' || selectedItem === 'internship-iit-madras') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'internship-iit-madras' || selectedItem === 'internship-iit-madras') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 list-disc list-outside pl-4 flex flex-col gap-1.5 text-justify">
                                  <li>Designed a streaming IP core to compute log-power, perform dynamic peak detection, and generate histograms for frequency analysis.</li>
                                  <li>Implemented and optimized the architecture using Vitis HLS and Vivado 2024 on an FPGA development board.</li>
                                  <li>Improved hardware resource utilization and processing efficiency through architecture-level optimizations.</li>
                                </ul>
                                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                                  {['FPGA', 'Vitis HLS', 'Xilinx Vivado', 'Digital Design', 'Frequency Analysis'].map((tech) => (
                                    <li key={tech} className="rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold leading-5 text-teal-300">
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* IIT Hyderabad */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('internship-iit-hyderabad')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'internship-iit-hyderabad' ? null : 'internship-iit-hyderabad')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'internship-iit-hyderabad' || selectedItem === 'internship-iit-hyderabad') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="May 2024 to July 2024">
                              May — Jul 2024
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/iithinternship" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>Research Intern (SURE Programme) · <span className="inline-block">IIT Hyderabad<ArrowUpRight size={18} className="inline-block ml-0.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" /></span></span>
                                  </a>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'internship-iit-hyderabad' || selectedItem === 'internship-iit-hyderabad') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'internship-iit-hyderabad' || selectedItem === 'internship-iit-hyderabad') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 list-disc list-outside pl-4 flex flex-col gap-1.5 text-justify">
                                  <li>Implemented Python-based machine learning workflows using Google Colab for data processing and model experimentation.</li>
                                  <li>Performed data preprocessing, feature analysis, and model evaluation on research datasets.</li>
                                  <li>Studied BCZT ceramics, including synthesis techniques, electrical characteristics, and XRD analysis for material characterization.</li>
                                </ul>
                                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                                  {['Python', 'Machine Learning', 'Data Preprocessing', 'Material Characterization', 'XRD Analysis'].map((tech) => (
                                    <li key={tech} className="rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold leading-5 text-teal-300">
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </section>

                  {/* PROJECTS SECTION */}
                  <section id="projects" className="mb-24 scroll-mt-16 md:mb-32 lg:mb-44 lg:scroll-mt-24" aria-label="Selected projects">
                    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Projects</h2>
                    </div>

                    <div>
                      <ul className="flex flex-col gap-14">
                        {/* Project 1 */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('project-yatra')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'project-yatra' ? null : 'project-yatra')}
                        >
                          <div className="group relative flex flex-col gap-2 pb-1 transition-all">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'project-yatra' || selectedItem === 'project-yatra') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <div className="z-10 w-full">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/4TH-Year-Project" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>YatraAI - AI Powered Heritage Tourism Platform · 2026<svg className="w-5 h-5 inline-block ml-1.5 align-middle group-hover/link:text-teal-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>
                                  </a>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'project-yatra' || selectedItem === 'project-yatra') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'project-yatra' || selectedItem === 'project-yatra') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 list-disc pl-5 space-y-1 text-justify">
                                  <li>Developed a full-stack heritage tourism platform using React.js, TypeScript, TailwindCSS, Flask, and CNN.</li>
                                  <li>Built responsive user interfaces featuring monument recognition, multilingual AI assistance, interactive maps, and travel planning tools.</li>
                                  <li>Integrated Firebase Authentication, REST APIs, Leaflet Maps, and weather services to deliver real-time user experiences.</li>
                                  <li>Implemented AI-powered monument identification using CNN models with Groq AI integration for travel guidance.</li>
                                </ul>
                                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                                  {['React.js', 'TypeScript', 'TailwindCSS', 'Flask', 'CNN (Convolutional Neural Networks)', 'Firebase Auth', 'Leaflet Maps', 'Groq Llama-3 API', 'Image Classification', 'RESTful APIs'].map((tech) => (
                                    <li key={tech} className="rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold leading-5 text-teal-300">
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* Project 2 */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('project-productivity')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'project-productivity' ? null : 'project-productivity')}
                        >
                          <div className="group relative flex flex-col gap-2 pb-1 transition-all">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'project-productivity' || selectedItem === 'project-productivity') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <div className="z-10 w-full">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/DailyProductivity_AI_Tool" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>Daily Productivity Tracker · 2026<svg className="w-5 h-5 inline-block ml-1.5 align-middle group-hover/link:text-teal-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>
                                  </a>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'project-productivity' || selectedItem === 'project-productivity') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'project-productivity' || selectedItem === 'project-productivity') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 list-disc pl-5 space-y-1 text-justify">
                                  <li>Developed a full-stack productivity tracking application using React.js, Spring Boot, JWT Authentication, and PostgreSQL.</li>
                                  <li>Built responsive dashboards for task management, productivity analytics, and efficiency tracking with CRUD and REST API integration.</li>
                                  <li>Implemented secure user authentication, task filtering, and real-time performance metrics using React components and Spring Security.</li>
                                </ul>
                                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                                  {['React.js', 'Spring Boot', 'Spring Security', 'JWT Authentication', 'PostgreSQL', 'Hibernate ORM', 'RESTful API', 'Productivity Metrics', 'Data Persistence'].map((tech) => (
                                    <li key={tech} className="rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold leading-5 text-teal-300">
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* Project 3 */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('project-human-motion')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'project-human-motion' ? null : 'project-human-motion')}
                        >
                          <div className="group relative flex flex-col gap-2 pb-1 transition-all">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'project-human-motion' || selectedItem === 'project-human-motion') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <div className="z-10 w-full">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/HumanMotion" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>Real-Time Human Motion Classification · IIT Bhubaneswar<svg className="w-5 h-5 inline-block ml-1.5 align-middle group-hover/link:text-teal-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>
                                  </a>
                                </div>
                              </h3>
                              <div className="text-sm text-slate-500 font-mono mt-1">03/2025 – 05/2025</div>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'project-human-motion' || selectedItem === 'project-human-motion') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'project-human-motion' || selectedItem === 'project-human-motion') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-2 text-base md:text-lg leading-relaxed text-slate-400 list-disc pl-5 space-y-1 text-justify">
                                  <li>Developed and deployed an edge AI solution on ESP32 for real-time Parkinson’s disease detection using IMU sensor data.</li>
                                  <li>Built machine learning pipelines using Python and Google Colab, achieving 85% classification accuracy through signal processing and model optimization.</li>
                                </ul>
                                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                                  {['ESP32 Microcontroller', 'Python', 'Google Colab', 'MPU6050 IMU Sensor', 'Edge AI (TinyML)', 'Signal Processing', 'Time-Series Classification', "Parkinson's Detection"].map((tech) => (
                                    <li key={tech} className="rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold leading-5 text-teal-300">
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* Project 4 */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('project-smart-bridge')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'project-smart-bridge' ? null : 'project-smart-bridge')}
                        >
                          <div className="group relative flex flex-col gap-2 pb-1 transition-all">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'project-smart-bridge' || selectedItem === 'project-smart-bridge') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <div className="z-10 w-full">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/SmartBridge" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>Sustainable Bridge Construction (Smart Bridge Risk Mitigation)<svg className="w-5 h-5 inline-block ml-1.5 align-middle group-hover/link:text-teal-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>
                                  </a>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'project-smart-bridge' || selectedItem === 'project-smart-bridge') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'project-smart-bridge' || selectedItem === 'project-smart-bridge') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 text-justify">
                                  Structuring health tracking sensors for bridges utilizing strain gauges, accelerometer readings, and real-time wireless alert telemetry.
                                </p>
                                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                                  {['Arduino UNO', 'Strain Gauges', 'Load Cells', 'Telemetry Systems', 'Internet of Things (IoT)', 'Structural Health Monitoring', 'Real-time Telemetry'].map((tech) => (
                                    <li key={tech} className="rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold leading-5 text-teal-300">
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* Project 5 */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('project-gps-vehicle')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'project-gps-vehicle' ? null : 'project-gps-vehicle')}
                        >
                          <div className="group relative flex flex-col gap-2 pb-1 transition-all">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'project-gps-vehicle' || selectedItem === 'project-gps-vehicle') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <div className="z-10 w-full">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/GPS_GUIDED_GROUND_VEHICLE" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>GPS Guided Ground Vehicle<svg className="w-5 h-5 inline-block ml-1.5 align-middle group-hover/link:text-teal-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>
                                  </a>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'project-gps-vehicle' || selectedItem === 'project-gps-vehicle') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'project-gps-vehicle' || selectedItem === 'project-gps-vehicle') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 text-justify">
                                  Designed and built an autonomous ground vehicle utilizing GPS navigation, digital compass sensors, and motor driver telemetry for precise path tracking and target navigation.
                                </p>
                                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                                  {['Arduino Mega', 'NEO-6M GPS Module', 'HMC5883L Compass', 'Robotics Kinematics', 'Autonomous Path Planning', 'PID Control Algorithm', 'L298N Motor Driver'].map((tech) => (
                                    <li key={tech} className="rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold leading-5 text-teal-300">
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* Project 6 */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('project-earthquake-detector')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'project-earthquake-detector' ? null : 'project-earthquake-detector')}
                        >
                          <div className="group relative flex flex-col gap-2 pb-1 transition-all">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'project-earthquake-detector' || selectedItem === 'project-earthquake-detector') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <div className="z-10 w-full">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/EARTHQUAKE_DETECTOR_Using_ADXL335" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>Earthquake Detector Using ADXL335<svg className="w-5 h-5 inline-block ml-1.5 align-middle group-hover/link:text-teal-300 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>
                                  </a>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'project-earthquake-detector' || selectedItem === 'project-earthquake-detector') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'project-earthquake-detector' || selectedItem === 'project-earthquake-detector') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 text-justify">
                                  Developed an earthquake detection system utilizing an ADXL335 tri-axial accelerometer sensor to record seismic wave patterns, trigger alerts on threshold breaches, and coordinate alert signals.
                                </p>
                                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                                  {['ADXL335 Accelerometer', 'Arduino Nano', 'Seismic Detection', 'Hardware Interfacing', 'Vibration Analysis', 'Threshold Trigger Alert', 'Signal Processing'].map((tech) => (
                                    <li key={tech} className="rounded-full bg-teal-400/10 px-3.5 py-1 text-xs font-semibold leading-5 text-teal-300">
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* TECHNICAL SKILLS SECTION */}
                  <section id="skills" className="mb-24 scroll-mt-16 md:mb-32 lg:mb-44 lg:scroll-mt-24" aria-label="Technical skill universe">
                    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Skills</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                      <SkillUniverse />
                    </div>
                  </section>

                  {/* COMPETITIONS SECTION */}
                  <section id="competitions" className="mb-24 scroll-mt-16 md:mb-32 lg:mb-44 lg:scroll-mt-24" aria-label="Competitions">
                    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Competitions</h2>
                    </div>

                    <div>
                      <ul className="flex flex-col gap-14">
                        {/* Competition 1: CodeHer Hackathon */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('comp-codeher')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'comp-codeher' ? null : 'comp-codeher')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'comp-codeher' || selectedItem === 'comp-codeher') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="January 2025">
                              Jan 2025
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <a 
                                    className="inline-flex items-baseline font-semibold leading-tight text-slate-200 group/link text-lg md:text-xl font-space" 
                                    href="https://github.com/SamitaPotnuru/Attendance-Tracking-System" 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>CodeHer Hackathon · WLF<ArrowUpRight size={18} className="inline-block ml-0.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" /></span>
                                  </a>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'comp-codeher' || selectedItem === 'comp-codeher') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'comp-codeher' || selectedItem === 'comp-codeher') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 list-disc list-outside pl-4 flex flex-col gap-1.5 text-justify">
                                  <li>Built an attendance tracking solution.</li>
                                  <li>Secured 5th place.</li>
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* Competition 2: ICTIEE 2025 */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('comp-ictiee')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'comp-ictiee' ? null : 'comp-ictiee')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'comp-ictiee' || selectedItem === 'comp-ictiee') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="January 2025">
                              Jan 2025
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <span className="inline-flex items-baseline font-semibold leading-tight text-slate-200 text-lg md:text-xl font-space">
                                    ICTIEE 2025 · VNRVJIET, Hyderabad
                                  </span>
                                </div>
                              </h3>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'comp-ictiee' || selectedItem === 'comp-ictiee') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'comp-ictiee' || selectedItem === 'comp-ictiee') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 list-disc list-outside pl-4 flex flex-col gap-1.5 text-justify">
                                  <li>Presented IoT-based Sustainable Bridge.</li>
                                  <li>Recognized among top 20% of submissions.</li>
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* POSITIONS OF RESPONSIBILITY SECTION */}
                  <section id="responsibility" className="mb-24 scroll-mt-16 md:mb-32 lg:mb-44 lg:scroll-mt-24" aria-label="Positions of Responsibility">
                    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Responsibility</h2>
                    </div>

                    <div>
                      <ul className="flex flex-col gap-14">
                        {/* IETE Student Chapter */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('resp-iete')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'resp-iete' ? null : 'resp-iete')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'resp-iete' || selectedItem === 'resp-iete') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="October 2024 to March 2026">
                              Oct 2024 — Mar 2026
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <span className="inline-flex items-baseline font-semibold leading-tight text-slate-200 text-lg md:text-xl font-space">
                                    IETE Student Chapter · GITAM
                                  </span>
                                </div>
                              </h3>
                              <p className="text-sm font-semibold text-teal-400 mt-1">Core Member</p>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'resp-iete' || selectedItem === 'resp-iete') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'resp-iete' || selectedItem === 'resp-iete') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 text-justify">
                                  Contributed to student community engineering, technical events, workshops coordination, and academic knowledge exchange initiatives.
                                </p>
                              </motion.div>
                            </div>
                          </div>
                        </li>

                        {/* Entrepreneurs Club */}
                        <li 
                          className="mb-8 cursor-pointer select-none"
                          onMouseEnter={() => setHoveredItem('resp-eclub')}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => setSelectedItem(prev => prev === 'resp-eclub' ? null : 'resp-eclub')}
                        >
                          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                            <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${
                              (hoveredItem === 'resp-eclub' || selectedItem === 'resp-eclub') 
                                ? 'bg-slate-800/30 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] drop-shadow-lg' 
                                : ''
                            }`} />
                            <header className="z-10 mb-2 mt-1 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="October 2023 to December 2024">
                              Oct 2023 — Dec 2024
                            </header>
                            <div className="z-10 sm:col-span-6 text-left">
                              <h3 className="font-semibold leading-snug text-slate-200">
                                <div>
                                  <span className="inline-flex items-baseline font-semibold leading-tight text-slate-200 text-lg md:text-xl font-space">
                                    Entrepreneurs Club · GITAM
                                  </span>
                                </div>
                              </h3>
                              <p className="text-sm font-semibold text-teal-400 mt-1">Coordinator</p>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: (hoveredItem === 'resp-eclub' || selectedItem === 'resp-eclub') ? 'auto' : 0,
                                  opacity: (hoveredItem === 'resp-eclub' || selectedItem === 'resp-eclub') ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400 text-justify">
                                  Managed coordinates for entrepreneurial networking, ideation bootcamps, speaker sessions, and startup growth-focused student meetups.
                                </p>
                              </motion.div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* ACHIEVEMENTS SECTION */}
                  <section id="achievements" className="mb-24 scroll-mt-16 md:mb-32 lg:mb-44 lg:scroll-mt-24" aria-label="Achievements">
                    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Achievements</h2>
                    </div>
                    <div className="p-8 rounded-3xl glass-card bg-slate-800/20 text-left">
                      <h3 className="font-semibold text-lg md:text-xl font-space text-slate-200 mb-4">
                        Academic Achievement — ECE Department
                      </h3>
                      <ul className="text-base md:text-lg leading-relaxed text-slate-400 list-disc pl-5 space-y-2 text-justify">
                        <li>Ranked among the top 20% academically.</li>
                      </ul>
                    </div>
                  </section>


                  {/* ───────────────── FOOTER (COPYRIGHT Only) ───────────────── */}
                  <footer className="py-12 border-t border-slate-800">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                      <p>© 2026 Potnuru Samita. All rights reserved.</p>
                    </div>
                  </footer>

                </main>
              </div>
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
