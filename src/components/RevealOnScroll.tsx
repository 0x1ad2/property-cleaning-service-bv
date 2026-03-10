import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 40,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use a small delay to ensure DOM is fully painted before observing
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve after first intersection to prevent re-triggering
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -100px 0px",
        },
      );

      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 1,
        ...directionMap[direction],
      }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{
        willChange: isVisible ? "transform, opacity" : "auto",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  staggerDelay = 0.05,
  className = "",
}: {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <RevealOnScroll key={`stagger-${index}`} delay={index * staggerDelay}>
          {child}
        </RevealOnScroll>
      ))}
    </div>
  );
}
