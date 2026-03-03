import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({
  children,
  speed = 0.5,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${(1 - speed) * 100}%`],
  );
  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: smoothY, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  depth?: "background" | "content" | "foreground";
  className?: string;
}

export function ParallaxLayer({
  children,
  depth = "content",
  className = "",
}: ParallaxLayerProps) {
  const speeds = {
    background: 0.5,
    content: 1,
    foreground: 1.1,
  };

  return (
    <Parallax speed={speeds[depth]} className={className}>
      {children}
    </Parallax>
  );
}
