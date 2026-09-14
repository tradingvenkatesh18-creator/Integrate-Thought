import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import KineticGrid from './KineticGrid';

export default function AboutHeroSection({ onNavigate }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textHeight, setTextHeight] = useState(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const videoRef = useRef(null);
  const textBlockRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    return () => clearTimeout(timer);
  }, []);

  // Monitor text height and desktop breakpoint so video height always equals text height
  useEffect(() => {
    const updateDimensions = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (textBlockRef.current) {
        setTextHeight(textBlockRef.current.offsetHeight);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (textBlockRef.current) {
      resizeObserver.observe(textBlockRef.current);
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleScrollToStory = (e) => {
    e.preventDefault();
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToMethodology = (e) => {
    e.preventDefault();
    const el = document.getElementById('principles') || document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#eef4fa] text-slate-950 pt-36 sm:pt-42 lg:pt-48 pb-20 sm:pb-28 border-b border-slate-200/80 select-none"
    >
      {/* Interactive KineticGrid Canvas Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <KineticGrid
          className="!absolute inset-0 w-full h-full"
          spacing={64}
          dotSize={2}
          gridStroke={1}
          gridOpacity={0.18}
          repulsion={5}
          radius={60}
          stiffness={1.0}
          damping={0.09}
          clickIntensity={30}
          trailIntensity={0.15}
          backgroundColor="#eef4fa"
          lineColor="#cbd5e1"
          dotColor="#94a3b8"
          hoverColor="#0284c7"
        />
      </div>

      {/* Scoped CSS for Fraunces Serif, Satoshi Sans, Blend Masking & Transitions */}
      <style>{`
        .font-fraunces {
          font-family: 'Fraunces', Georgia, 'Times New Roman', serif !important;
          font-feature-settings: "liga" 1, "calt" 1;
        }

        .font-satoshi {
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        .font-jetbrains {
          font-family: 'JetBrains Mono', 'Courier New', monospace !important;
        }

        @keyframes heroFadeScale {
          0% {
            opacity: 0;
            transform: scale(1.02) translateY(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .hero-headline-animate {
          animation: heroFadeScale 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .studio-primary-cta {
          position: relative;
          overflow: hidden;
          background-color: #020617;
          color: #ffffff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .studio-primary-cta:hover {
          background-color: #1e293b;
        }

        /* Dissolve all borders seamlessly with the background */
        .hero-video-mask-x {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.08) 5%,
            rgba(0, 0, 0, 0.45) 15%,
            rgba(0, 0, 0, 0.9) 26%,
            black 36%,
            black 78%,
            rgba(0, 0, 0, 0.85) 86%,
            rgba(0, 0, 0, 0.4) 93%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.08) 5%,
            rgba(0, 0, 0, 0.45) 15%,
            rgba(0, 0, 0, 0.9) 26%,
            black 36%,
            black 78%,
            rgba(0, 0, 0, 0.85) 86%,
            rgba(0, 0, 0, 0.4) 93%,
            transparent 100%
          );
        }

        .hero-video-mask-y {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.1) 4%,
            rgba(0, 0, 0, 0.5) 12%,
            rgba(0, 0, 0, 0.9) 22%,
            black 30%,
            black 70%,
            rgba(0, 0, 0, 0.9) 78%,
            rgba(0, 0, 0, 0.5) 88%,
            rgba(0, 0, 0, 0.1) 96%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.1) 4%,
            rgba(0, 0, 0, 0.5) 12%,
            rgba(0, 0, 0, 0.9) 22%,
            black 30%,
            black 70%,
            rgba(0, 0, 0, 0.9) 78%,
            rgba(0, 0, 0, 0.5) 88%,
            rgba(0, 0, 0, 0.1) 96%,
            transparent 100%
          );
        }
      `}</style>

      {/* Main Layout Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
          
          {/* ======================================================== */}
          {/* LEFT SIDE (6 Cols): Pure Text & CTAs - NO BOX CONTAINERS */}
          {/* ======================================================== */}
          <div
            ref={textBlockRef}
            className="lg:col-span-6 text-left space-y-6 sm:space-y-7 z-20 pr-0 lg:pr-4"
          >
            {/* 1. Eyebrow Tag: Clean, borderless, no box */}
            <div className="inline-flex items-center gap-2.5 font-jetbrains text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
              <span>About Integrate Thought</span>
            </div>

            {/* 2. Main Headline in Fraunces Serif: Bold, confident, Left-aligned */}
            <h1 className="font-fraunces hero-headline-animate text-3xl sm:text-4xl lg:text-5xl xl:text-[3.35rem] font-bold text-slate-950 tracking-tight leading-[1.12]">
              We build production systems.{' '}
              <span className="block text-slate-950">
                And the engineers who build them.
              </span>
            </h1>

            {/* 3. Subheadline in Satoshi: Clean sans-serif, Left-aligned */}
            <p className="font-satoshi text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              A dual-engine studio where enterprise AI meets apprenticeship-level training.
              One engine executes robust production software; the other sharpens the craftsmen behind it.
            </p>

            {/* 4. CTA Row: Primary & Secondary Left-aligned */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={handleScrollToMethodology}
                className="studio-primary-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-satoshi font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md active:scale-95 cursor-pointer bg-slate-950 hover:bg-slate-800 text-white"
              >
                <span>Explore Our Methodology</span>
                <ArrowRight className="w-4 h-4 text-slate-300 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleScrollToStory}
                className="font-satoshi text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 tracking-wide inline-flex items-center gap-1.5 transition-colors cursor-pointer py-2"
              >
                <span>Meet the Team</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE (6 Cols): Video - ALL BORDERS DISSOLVED        */}
          {/* Seamlessly melted into background on top, bottom, left, right */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 w-full relative z-10 lg:-ml-16 xl:-ml-24 lg:w-[calc(100%+4rem)] xl:w-[calc(100%+6rem)] lg:-my-6">
            <div
              className="relative w-full overflow-hidden hero-video-mask-x"
              style={{
                height: isDesktop && textHeight ? `${textHeight + 48}px` : '400px',
              }}
            >
              <div className="relative w-full h-full hero-video-mask-y">
                {/* Infinite Looping Hero Video */}
                <video
                  ref={videoRef}
                  src="/about-hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover select-none pointer-events-none"
                  style={{ objectPosition: '35% center' }}
                />

                {/* Dissolve Feather Overlays into #eef4fa canvas */}
                {/* 1. Left Edge Blend (Facing the text) */}
                <div
                  className="absolute inset-y-0 left-0 w-1/3 pointer-events-none z-10"
                  style={{
                    background:
                      'linear-gradient(to right, #eef4fa 0%, rgba(238, 244, 250, 0.85) 12%, rgba(238, 244, 250, 0.25) 45%, transparent 100%)',
                  }}
                />

                {/* 2. Right Edge Dissolve */}
                <div
                  className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
                  style={{
                    background:
                      'linear-gradient(to left, #eef4fa 0%, rgba(238, 244, 250, 0.75) 30%, transparent 100%)',
                  }}
                />

                {/* 3. Top Edge Dissolve */}
                <div
                  className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
                  style={{
                    background:
                      'linear-gradient(to bottom, #eef4fa 0%, rgba(238, 244, 250, 0.75) 30%, transparent 100%)',
                  }}
                />

                {/* 4. Bottom Edge Dissolve */}
                <div
                  className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-10"
                  style={{
                    background:
                      'linear-gradient(to top, #eef4fa 0%, rgba(238, 244, 250, 0.75) 30%, transparent 100%)',
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


