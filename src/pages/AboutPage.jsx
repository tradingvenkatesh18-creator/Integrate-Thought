import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import KineticGrid from '../components/KineticGrid';
import BuildManifestoScroll from '../components/BuildManifestoScroll';
import DualEngineSection from '../components/DualEngineSection';
import HowWeThinkSection from '../components/HowWeThinkSection';
import AboutHeroSection from '../components/AboutHeroSection';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BorderBeam } from '@/registry/magicui/border-beam';
import { MagicCard } from '@/registry/magicui/magic-card';
import { NumberTicker } from '@/registry/magicui/number-ticker';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);

try {
  CustomEase.create('fadeUpEase', '0.16, 1, 0.3, 1');
} catch (e) {
  // ease already defined
}

import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Code2,
  Cpu,
  Layers,
  Bot,
  GraduationCap,
  Users,
  Briefcase,
  TrendingUp,
  Workflow,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Terminal,
  Compass,
  Zap,
  Building2,
  BookOpen,
  ChevronRight
} from 'lucide-react';

export default function AboutPage({ onNavigate, isPageRevealed = true }) {
  const heroSectionRef = useRef(null);
  const headlineRef = useRef(null);
  const underlineRef = useRef(null);
  const cardRef = useRef(null);

  // Section 03 Origin refs
  const originSectionRef = useRef(null);
  const archHeadlineRef = useRef(null);
  const originCardsRef = useRef(null);
  const tracingBeamLineRef = useRef(null);
  const tracingBeamGlowRef = useRef(null);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);

  // Section 05 Team Cards hover state for sibling blur effect
  const [hoveredMember, setHoveredMember] = useState(null);

  useEffect(() => {
    document.title = 'About Us | Integrate Thought — Digital Engineering & Academy';
    window.scrollTo(0, 0);

    if (!isPageRevealed) return;

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      if (archHeadlineRef.current) {
        gsap.set(archHeadlineRef.current.querySelectorAll('.arch-word'), { opacity: 1, y: 0, filter: 'none' });
      }
      if (tracingBeamLineRef.current) {
        gsap.set(tracingBeamLineRef.current, { scaleY: 1 });
      }
      if (dot1Ref.current) gsap.set(dot1Ref.current, { opacity: 1, scale: 1 });
      if (dot2Ref.current) gsap.set(dot2Ref.current, { opacity: 1, scale: 1 });
      if (dot3Ref.current) gsap.set(dot3Ref.current, { opacity: 1, scale: 1 });
      return;
    }

    if (window.lenis) {
      window.lenis.on('scroll', ScrollTrigger.update);
    }

    let split;
    let tl;
    let scrollTriggerInstance;
    let archScrollTrigger;
    let beamScrollTrigger;

    // Section 03 Origin — Word-by-word reveal of "It's an architecture failure."
    if (archHeadlineRef.current) {
      const words = archHeadlineRef.current.querySelectorAll('.arch-word');
      const archTween = gsap.fromTo(
        words,
        { opacity: 0, y: 14, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.45,
          stagger: 0.12,
          ease: 'fadeUpEase',
          scrollTrigger: {
            trigger: archHeadlineRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }
      );
      archScrollTrigger = archTween.scrollTrigger;
    }

    // Section 03 Origin — Tracing Beam scrubbed down the 3 cards & lighting dots
    if (originCardsRef.current && tracingBeamLineRef.current) {
      gsap.set(tracingBeamLineRef.current, { scaleY: 0, transformOrigin: 'top center' });
      if (tracingBeamGlowRef.current) {
        gsap.set(tracingBeamGlowRef.current, { opacity: 0, top: '0%' });
      }

      const beamTl = gsap.timeline({
        scrollTrigger: {
          trigger: originCardsRef.current,
          start: 'top 75%',
          end: 'bottom 65%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 1. Scrub the tracing beam line scaleY from 0 to 1
      beamTl.fromTo(
        tracingBeamLineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 2. Move glowing tracer head down with the beam
      if (tracingBeamGlowRef.current) {
        beamTl.fromTo(
          tracingBeamGlowRef.current,
          { opacity: 0, top: '0%' },
          { opacity: 1, top: '100%', ease: 'none', duration: 1 },
          0
        );
      }

      // 3. Light up Card 1 dot (Red) when beam reaches Card 1
      if (dot1Ref.current) {
        beamTl.to(
          dot1Ref.current,
          {
            scale: 1.35,
            opacity: 1,
            boxShadow: '0 0 16px rgba(239, 68, 68, 0.95), 0 0 4px #ef4444',
            duration: 0.15,
            ease: 'power2.out',
          },
          0.06
        );
      }

      // 4. Light up Card 2 dot (Sky Blue) when beam reaches Card 2
      if (dot2Ref.current) {
        beamTl.to(
          dot2Ref.current,
          {
            scale: 1.35,
            opacity: 1,
            boxShadow: '0 0 16px rgba(2, 132, 199, 0.95), 0 0 4px #0284c7',
            duration: 0.15,
            ease: 'power2.out',
          },
          0.48
        );
      }

      // 5. Light up Card 3 dot (Emerald Green) when beam reaches Card 3
      if (dot3Ref.current) {
        beamTl.to(
          dot3Ref.current,
          {
            scale: 1.35,
            opacity: 1,
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.95), 0 0 4px #10b981',
            duration: 0.15,
            ease: 'power2.out',
          },
          0.86
        );
      }

      beamScrollTrigger = beamTl.scrollTrigger;
    }

    // Sort triggers in DOM order and refresh so pin spacing from BuildManifestoScroll is accounted for
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    const refreshTimer1 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 150);

    const refreshTimer2 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      if (window.lenis) {
        window.lenis.off('scroll', ScrollTrigger.update);
      }
      if (split) split.revert();
      if (tl) tl.kill();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (archScrollTrigger) archScrollTrigger.kill();
      if (beamScrollTrigger) beamScrollTrigger.kill();
    };
  }, [isPageRevealed]);

  const [activePillar, setActivePillar] = useState('engineering');

  // Unified Team Members array matching editorial layout
  const TEAM_MEMBERS = [
    {
      name: 'Aravind Kamoju',
      role: 'CEO',
      fullTitle: 'Chief Executive Officer',
      image: '/team/aravind.jpg',
    },
    {
      name: 'Venkatesh',
      role: 'CTO',
      fullTitle: 'Chief Technology Officer',
      image: '/team/venkatesh.jpg',
    },
    {
      name: 'Manohar',
      role: 'OPERATIONS MANAGER',
      fullTitle: 'Operations Manager',
      image: null,
    },
    {
      name: 'Ravi Teja',
      role: 'DEVELOPMENT HEAD',
      fullTitle: 'Development Head',
      image: null,
    },
    {
      name: 'Aravindh',
      role: 'FULL STACK DEVELOPER',
      fullTitle: 'Full Stack Developer',
      image: '/team/aravindh.jpg',
    },
    {
      name: 'Surya Teja',
      role: 'BACKEND & AI DEVELOPER',
      fullTitle: 'Backend & AI Developer',
      image: '/team/surya.jpg',
    },
    {
      name: 'Sai Krishna',
      role: 'FULL STACK DEVELOPER',
      fullTitle: 'Full Stack Developer',
      image: '/team/saikrishna.jpg',
    },
  ];

  const CORE_PRINCIPLES = [
    {
      id: '01',
      title: 'Architecture Precedes Code',
      category: 'ENGINEERING DISCIPLINE',
      description:
        'We never write code in search of a problem. Every system begins by mapping operational physics, data bottlenecks, and user intent to build resilient solutions on 5-year horizons.',
      icon: Compass,
    },
    {
      id: '02',
      title: 'Pragmatic AI & High Leverage',
      category: 'APPLIED INTELLIGENCE',
      description:
        'We steer clear of superficial "AI wrapper" hype. We engineer private vector databases, deterministic RAG retrieval, and autonomous background triggers that reliably eliminate manual labor.',
      icon: Cpu,
    },
    {
      id: '03',
      title: 'Apprenticeship Over Abstract Theory',
      category: 'ACADEMY PHILOSOPHY',
      description:
        'Software cannot be learned purely from slide decks. In our training programs and internships, students write live pull requests, debug production issues, and learn real industry engineering.',
      icon: GraduationCap,
    },
    {
      id: '04',
      title: 'Measurable Operational Leverage',
      category: 'BUSINESS IMPACT',
      description:
        'Technology is only valuable if it moves the needle. We track our impact by operational velocity, eliminated clerical errors, and tangible growth across our 20+ client engagements.',
      icon: TrendingUp,
    },
  ];

  const CONVENTIONAL_ITEMS = [
    {
      title: 'Generic Templates',
      description: 'Reusing off-the-shelf themes with brittle code and low performance.',
    },
    {
      title: 'Superficial "AI"',
      description: 'Slapping generic ChatGPT wrappers onto websites without private data grounding.',
    },
    {
      title: 'Disconnected Silos',
      description: 'Leaving the client with 15 disjointed tools requiring manual clerical sync.',
    },
    {
      title: 'Theoretical Education',
      description: 'Bootcamps teaching syntax memorization without staging environments or real PRs.',
    },
  ];

  const INTEGRATE_THOUGHT_ITEMS = [
    {
      title: 'First-Principles Architecture',
      description: 'Bespoke React, Node, and Python engines tailored specifically to business physics.',
    },
    {
      title: 'Pragmatic RAG & Agents',
      description: 'Vector retrieval over your private business data, driving real operational automation.',
    },
    {
      title: 'Unified Ecosystem',
      description: 'Connecting websites, CRMs, order management, and telemetry into one frictionless pipeline.',
    },
    {
      title: 'Living Production Mentorship',
      description: 'Interns and students learn on genuine staging codebases, building authentic engineering muscle.',
    },
  ];

  const leftColumnVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 0.95,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.09,
        delayChildren: 0.08,
      },
    },
  };

  const rightColumnVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      boxShadow: 'inset 0 0 0 1px rgba(16, 185, 129, 0), 0 0 0px rgba(16, 185, 129, 0)',
    },
    visible: {
      opacity: 1,
      y: 0,
      boxShadow: 'inset 0 0 0 1.5px rgba(16, 185, 129, 0.38), 0 0 32px -4px rgba(16, 185, 129, 0.2)',
      transition: {
        duration: 0.65,
        delay: 0.1, // enters ~100ms later than left column
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.09,
        delayChildren: 0.2,
      },
    },
  };

  const comparisonRowVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const redXIconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      x: 0,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      scale: [0.6, 1.15, 1],
      x: [0, -3.5, 3.5, -2, 1.5, 0],
      rotate: [0, -7, 7, -4, 3, 0],
      transition: {
        duration: 0.48,
        ease: 'easeOut',
      },
    },
  };

  const greenCheckIconVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.35, 0.92, 1],
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };


  const REAL_PROJECTS = [
    {
      title: 'AVS Hospitals',
      category: 'Healthcare Infrastructure & Patient Experience',
      image: '/Hero-Images/avs-hospitals-hero.png',
      summary:
        'Engineered a modern, accessible digital presence and clinical workflow architecture for one of the region’s premier healthcare institutions.',
      deliverables: ['Custom Web Architecture', 'Fast Triage UX', 'Patient Portal'],
    },
    {
      title: 'Brim Burgers',
      category: 'Consumer Brand Platform & E-Commerce',
      image: '/Hero-Images/brim-burgers-hero.png',
      summary:
        'Delivered an ultra-responsive digital storefront with dynamic menus, localized routing, and conversion-optimized visual hierarchy.',
      deliverables: ['Brand Experience System', 'E-Commerce Flow', 'High-Performance UI'],
    },
    {
      title: 'AP Mohan',
      category: 'Corporate Enterprise Architecture',
      image: '/Hero-Images/ap-mohan-hero.png',
      summary:
        'Designed and deployed an authoritative digital presence highlighting multi-sector commercial operations with high-fidelity typography.',
      deliverables: ['Enterprise Platform', 'Content Engine', 'Scalable Cloud Hosting'],
    },
    {
      title: 'Dr. Rathod Clinic',
      category: 'Specialized Medical Services Portal',
      image: '/Hero-Images/dr-rathod-hero.png',
      summary:
        'Streamlined patient inquiry pathways, doctor credentials, and consultation booking interfaces for specialized medical practice.',
      deliverables: ['Responsive Web App', 'Direct Inquiry Logic', 'SEO Optimization'],
    },
  ];

  function CaseStudyCard({ project, index }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ['start end', 'center 58%'],
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0], { clamp: true });
    const y = useTransform(scrollYProgress, [0, 1], [28, 0], { clamp: true });
    const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.65, 0.9, 1], { clamp: true });

    const isCardInView = useInView(cardRef, { once: true, margin: '-50px' });

    return (
      <div
        ref={cardRef}
        style={{ perspective: '1200px' }}
        className="w-full h-full"
      >
        <motion.div
          style={{
            rotateX,
            y,
            opacity,
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full"
        >
          <motion.div
            whileHover={{ scale: 1.025, y: -4 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-slate-300/70 hover:border-slate-300 transition-shadow duration-300 group flex flex-col justify-between h-full cursor-pointer"
          >
            {/* Browser Viewport Frame for Genuine Screenshot */}
            <div className="bg-slate-100 border-b border-slate-200/80 p-3 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 truncate ml-2">
                {project.title.toLowerCase().replace(/\s+/g, '')}.com
              </div>
            </div>

            {/* Screenshot Container with strict aspect ratio */}
            <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} Interface`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </div>

            {/* Project Details */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-sky-600 uppercase">
                  {project.category}
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight font-sans">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {project.summary}
                </p>
              </div>

              {/* Tag pills with staggered delayed fade-in after card settles */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.35,
                      staggerChildren: 0.08,
                    },
                  },
                }}
                initial="hidden"
                animate={isCardInView ? 'visible' : 'hidden'}
                className="pt-4 border-t border-slate-100 flex flex-wrap gap-2"
              >
                {project.deliverables.map((item) => (
                  <motion.span
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 6, scale: 0.94 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#eef4fa] text-slate-900 font-sans select-none overflow-x-clip flex flex-col justify-between">
      <div>
        {/* Universal Navbar */}
        <Navbar activePage="About" onNavigate={onNavigate} />

        {/* ============================================================ */}
        {/* 01 — HERO: WARM ORGANIC STUDIO EDITORIAL                     */}
        {/* ============================================================ */}
        <AboutHeroSection onNavigate={onNavigate} />

        {/* ============================================================ */}
        {/* INTERACTIVE VALUE ARCHITECTURE SCROLL MANIFESTO */}
        {/* ============================================================ */}
        <BuildManifestoScroll isPageRevealed={isPageRevealed} />

        {/* ============================================================ */}
        {/* 02 — THE DUAL ENGINE MODEL: ZIG-ZAG ARCHITECTURE & SERVICES */}
        {/* ============================================================ */}
        <DualEngineSection onNavigate={onNavigate} />

        {/* ============================================================ */}
        {/* 03 — THE STORY: ORIGIN & THE PROBLEM */}
        {/* ============================================================ */}
        <section ref={originSectionRef} className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Bold Stance */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-32">
              <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                The Origin
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
                Most business friction isn’t a software deficit. <br />
                <span ref={archHeadlineRef} className="text-[#0284c7] inline-block">
                  <span className="arch-word inline-block mr-[0.25em] opacity-0 translate-y-3 font-extrabold">It’s</span>
                  <span className="arch-word inline-block mr-[0.25em] opacity-0 translate-y-3 font-extrabold">an</span>
                  <span className="arch-word inline-block mr-[0.25em] opacity-0 translate-y-3 font-extrabold">architecture</span>
                  <span className="arch-word inline-block opacity-0 translate-y-3 font-extrabold">failure.</span>
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                Businesses do not suffer because technology is scarce. They struggle because their tools,
                data, workflows, and talent are fragmented into isolated silos.
              </p>
            </div>

            {/* Right Column: Editorial Narrative with Tracing Beam */}
            <div ref={originCardsRef} className="lg:col-span-7 relative pl-8 sm:pl-10 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {/* Vertical Tracing Beam Track running down the left edge */}
              <div className="absolute left-2 sm:left-3 top-5 bottom-5 w-[2px] pointer-events-none z-10">
                {/* Background Rail Line */}
                <div className="w-full h-full bg-slate-200/90 rounded-full" />

                {/* Animated Scrubbed Tracing Beam Line */}
                <div
                  ref={tracingBeamLineRef}
                  className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-[#ef4444] via-[#0284c7] to-[#10b981] rounded-full origin-top shadow-[0_0_8px_rgba(2,132,199,0.5)]"
                  style={{ willChange: 'transform', transformOrigin: 'top center', transform: 'scaleY(0)' }}
                />

                {/* Leading Glowing Tracer Head */}
                <div
                  ref={tracingBeamGlowRef}
                  className="absolute -left-[4px] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#38bdf8,0_0_4px_#0284c7] border-2 border-sky-400 opacity-0 -translate-y-1/2"
                  style={{ willChange: 'top, opacity' }}
                />
              </div>

              {/* Card 1: The Problem We Observed in the Industry */}
              <div
                className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-red-200/80 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-base font-bold text-slate-950 font-sans flex items-center gap-2.5">
                  <span
                    ref={dot1Ref}
                    className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 opacity-40 scale-90 transition-all duration-200"
                  />
                  <span>The Problem We Observed in the Industry</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Companies were adopting dozens of disconnected SaaS subscriptions, cobbling together brittle
                  no-code patches, or buying superficial "AI wrappers" that crumbled as soon as real enterprise
                  complexity hit. Meanwhile, traditional academic courses were teaching outdated syntax completely
                  detached from modern full-stack workflows and production AI agents.
                </p>
              </div>

              {/* Card 2: The Decision to Integrate Thought with Execution */}
              <div
                className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-sky-200/80 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-base font-bold text-slate-950 font-sans flex items-center gap-2.5">
                  <span
                    ref={dot2Ref}
                    className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0 opacity-40 scale-90 transition-all duration-200"
                  />
                  <span>The Decision to Integrate Thought with Execution</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We founded <strong>Integrate Thought</strong> on a simple premise: to unite deep architectural thinking
                  with disciplined execution. Rather than building throwaway templates, we architect coherent digital
                  ecosystems. And rather than keeping our engineering knowledge behind closed doors, we turned our studio
                  into a living academy where aspiring developers learn real engineering by working on production code.
                </p>
              </div>

              {/* Card 3: Where We Stand Today */}
              <div
                className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-emerald-200/80 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-base font-bold text-slate-950 font-sans flex items-center gap-2.5">
                  <span
                    ref={dot3Ref}
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 opacity-40 scale-90 transition-all duration-200"
                  />
                  <span>Where We Stand Today</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Today, we have partnered with over <strong>20+ brands</strong>, delivered major flagship digital platforms
                  in healthcare, enterprise services, and retail, and helped our client partners achieve an average of <strong>3x
                  visibility and business growth</strong>. Simultaneously, our IT School cohorts have mentored passionate
                  developers through immersive, live-project internships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 04 — CORE PRINCIPLES: HOW WE THINK & BUILD */}
        {/* ============================================================ */}
        <HowWeThinkSection />

        {/* ============================================================ */}
        {/* 05 — THE TEAM: EDITORIAL TEAM GRID */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
          {/* Top Dashed Hairline Divider */}
          <div className="w-full border-t border-dashed border-slate-300/80 mb-12 sm:mb-16" />

          {/* 4-Column Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Col 1: Team Heading */}
            <div className="lg:col-span-3">
              <h2 className="text-xl sm:text-2xl font-sans font-medium text-slate-950 tracking-tight">
                Team
              </h2>
            </div>

            {/* Cols 2-4: Team Cards with Hover Blur Effect */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 sm:gap-x-7 lg:gap-x-8 gap-y-10 sm:gap-y-12">
              {TEAM_MEMBERS.map((member, index) => {
                const isHovered = hoveredMember === index;
                const isSiblingHovered = hoveredMember !== null && !isHovered;

                return (
                  <div
                    key={member.name}
                    onMouseEnter={() => setHoveredMember(index)}
                    onMouseLeave={() => setHoveredMember(null)}
                    className={cn(
                      "group cursor-pointer transition-all duration-300 ease-out",
                      isHovered && "scale-[1.02] opacity-100 z-10",
                      isSiblingHovered && "opacity-40 blur-[2px] scale-[0.98]",
                      hoveredMember === null && "opacity-100 blur-0 scale-100"
                    )}
                  >
                    {/* Aspect-Locked Portrait Frame */}
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70 shadow-2xs group-hover:shadow-lg group-hover:shadow-slate-200/60 transition-all duration-300">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200/90 p-6 select-none transition-transform duration-500 ease-out group-hover:scale-105">
                          <div className="w-20 h-20 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs flex items-center justify-center group-hover:border-sky-300 group-hover:shadow-md transition-all duration-300">
                            <span className="font-sans font-bold text-2xl text-slate-700 tracking-wider">
                              {member.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
                            {member.role}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Member Name & Role */}
                    <div className="mt-3 sm:mt-3.5 space-y-0.5">
                      <h3 className="text-sm sm:text-base font-bold text-slate-950 font-sans tracking-tight leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-slate-500 uppercase">
                        {member.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 06 — PROVEN WORK & IMPACT: REAL CASE STUDIES */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                Tangible Outcomes
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
                Real Work. Real Businesses. Real Results.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We measure our engineering not by abstract promises, but by the tangible digital systems
                we have deployed for our 20+ partner brands.
              </p>
            </div>

            <button
              onClick={() => onNavigate('Works')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer font-sans shrink-0 self-start md:self-auto"
            >
              <span>Explore All Case Studies</span>
              <ArrowUpRight className="w-4 h-4 text-sky-600" />
            </button>
          </div>

          {/* Verified Performance Metrics Strip */}
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
                <NumberTicker value={20} suffix="+" delay={0} duration={1.2} />
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mt-1">
                Brands Partnered
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
                <NumberTicker value={5} suffix="+" delay={0.08} duration={1.2} />
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mt-1">
                Flagship Systems Built
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0284c7] tracking-tight font-sans">
                <NumberTicker value={3} suffix="x" delay={0.16} duration={1.2} />
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mt-1">
                Avg. Visibility &amp; Growth
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight font-sans">
                <NumberTicker value={100} suffix="%" delay={0.24} duration={1.2} />
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mt-1">
                Applied Live Training
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REAL_PROJECTS.map((project, index) => (
              <CaseStudyCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 07 — ACADEMY FOCUS: TRAINING & INTERNSHIP OPPORTUNITIES */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-sky-300 font-bold tracking-wider uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>The Academy Wing</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
                Bridging the Gap Between Code Syntax and Production Engineering.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We believe the biggest tragedy in modern software education is teaching syntax without context.
                Through our <strong>IT School Training Programs</strong> and <strong>Practical Internship Tracks</strong>,
                we train students and graduates on the exact architectures, tools, and code standards used in our
                client systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                  <div className="text-sm font-bold text-white font-sans">Project-Driven Training</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Build real-world Full-Stack, Python, and AI automation applications rather than toy exercises.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                  <div className="text-sm font-bold text-white font-sans">Hands-On Internships</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Work on live staging environments, git branch workflows, and PR reviews alongside senior engineers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                  <div className="text-sm font-bold text-white font-sans">Career Acceleration</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Graduate with verifiable repositories, deployed applications, and real architectural competence.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('IT School')}
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer font-sans"
                >
                  Explore IT School &amp; Internships
                </button>
                <button
                  onClick={() => onNavigate('Contact')}
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer font-sans"
                >
                  Inquire About Upcoming Cohorts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 08 — WHY INTEGRATE THOUGHT: THE CONTRAST MATRIX */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              The Fundamental Difference
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
              Why Integrate Thought Stands Apart
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A direct comparison between conventional vendors and our unified engineering studio &amp; academy model.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
              {/* Left Side: Traditional Vendors */}
              <motion.div
                variants={leftColumnVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="p-8 sm:p-10 space-y-6 bg-slate-50/60"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-red-500 uppercase">
                    The Conventional Route
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 font-sans">
                    Traditional Agencies &amp; Bootcamps
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
                  {CONVENTIONAL_ITEMS.map((item) => (
                    <motion.li
                      key={item.title}
                      variants={comparisonRowVariants}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        variants={redXIconVariants}
                        className="text-red-500 font-bold mt-0.5 inline-block shrink-0 select-none text-sm"
                      >
                        ✕
                      </motion.span>
                      <span className="leading-relaxed">
                        <strong className="text-slate-900">{item.title}:</strong> {item.description}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Side: Integrate Thought */}
              <motion.div
                variants={rightColumnVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="p-8 sm:p-10 space-y-6 bg-white relative rounded-2xl md:rounded-none transition-shadow"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-600 uppercase">
                    Our Operational Model
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-950 font-sans">
                    Integrate Thought Studio &amp; Academy
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                  {INTEGRATE_THOUGHT_ITEMS.map((item) => (
                    <motion.li
                      key={item.title}
                      variants={comparisonRowVariants}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        variants={greenCheckIconVariants}
                        className="text-emerald-600 font-bold mt-0.5 inline-block shrink-0 select-none text-sm"
                      >
                        ✓
                      </motion.span>
                      <span className="leading-relaxed">
                        <strong className="text-slate-950">{item.title}:</strong> {item.description}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 09 — PURPOSEFUL CLOSING CTA */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-5xl mx-auto mb-20 text-center">
          <div className="bg-slate-950 text-white rounded-3xl p-10 sm:p-16 shadow-2xl space-y-6 relative overflow-hidden border border-slate-800/80">
            {/* Ambient Background Beams & Spotlights */}
            <BackgroundBeams className="pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans leading-tight">
                Let’s Build a Resilient System <br className="hidden sm:inline" />
                or Accelerate Your Technical Career.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal font-sans leading-relaxed">
                Whether you are looking to architect custom web applications and AI automations for your business,
                or looking to master modern full-stack development through our IT School, we are ready.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                {/* Primary Button with Perimeter Shimmer and Specular Hover Sheen */}
                <ShimmerButton
                  onClick={() => onNavigate('Contact')}
                  shimmerColor="#38bdf8"
                  background="#ffffff"
                  borderRadius="9999px"
                  shimmerDuration="3s"
                >
                  START A CLIENT PROJECT
                </ShimmerButton>

                {/* Secondary Button: Simple hover state only (background/border shift), strictly no shimmer */}
                <button
                  onClick={() => onNavigate('IT School')}
                  className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 font-bold text-xs tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer font-sans"
                >
                  APPLY FOR IT SCHOOL / INTERNSHIP
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Universal Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
