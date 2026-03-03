import { motion } from "motion/react";

interface FloatingBlobProps {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  blur?: number;
  opacity?: number;
  duration?: number;
}

export default function FloatingBlob({
  color = "from-blue-500/20 to-sky-400/20",
  size = 400,
  top,
  left,
  right,
  bottom,
  blur = 60,
  opacity = 0.6,
  duration = 20,
}: FloatingBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${color} pointer-events-none`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        filter: `blur(${blur}px)`,
        opacity,
        willChange: "transform",
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
