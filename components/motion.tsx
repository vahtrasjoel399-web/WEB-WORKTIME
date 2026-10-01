"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Thin bar at the top showing scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/** Headline that reveals word by word from below a mask. */
export function SplitWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const show = reduced || inView;
  let i = 0;
  return (
    <span ref={ref} className={`split ${className}`}>
      {text.split("\n").map((line, li) => (
        <span className="split-line" key={li}>
          {line.split(" ").map((word) => {
            const d = delay + i++ * 0.06;
            return (
              <span className="split-mask" key={word + d}>
                <motion.span
                  className="split-word"
                  initial={reduced ? false : { y: "110%", rotate: 4 }}
                  animate={show ? { y: "0%", rotate: 0 } : undefined}
                  transition={{ duration: 0.9, delay: d, ease }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/** Card that tilts in 3D toward the cursor. */
export function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 160, damping: 18 });
  const sy = useSpring(y, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  return (
    <motion.div
      className={`tilt ${className}`}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => { x.set(0.5); y.set(0.5); }}
    >
      {children}
    </motion.div>
  );
}

/** Element that is pulled toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const x = useSpring(0, { stiffness: 220, damping: 15 });
  const y = useSpring(0, { stiffness: 220, damping: 15 });
  return (
    <motion.span
      className="magnetic"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

/** Hero product shot: starts tilted back in 3D and flattens as you scroll. */
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 15%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  return (
    <div ref={ref} className="hero-stage">
      <motion.div
        style={reduced ? undefined : { rotateX, scale, y, transformPerspective: 1600 }}
        initial={reduced ? false : { opacity: 0, y: 120 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Moves its children vertically at a different speed than the page. */
export function Parallax({ children, offset = 80, className = "" }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return <motion.div ref={ref} className={className} style={reduced ? undefined : { y }}>{children}</motion.div>;
}

/** Steps list where a progress line fills as you scroll through it. */
export function ScrollLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  return (
    <div ref={ref} className="steps">
      <div className="steps-track"><motion.i style={{ scaleY }} /></div>
      {children}
    </div>
  );
}

/** Soft glow that follows the cursor inside dark sections. */
export function Spotlight({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const bg = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(120,98,255,.16), transparent 70%)`;
  return (
    <section
      id={id}
      className={`spotlight ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
    >
      <motion.div className="spotlight-glow" style={{ background: bg }} />
      {children}
    </section>
  );
}
