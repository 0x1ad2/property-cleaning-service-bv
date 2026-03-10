import { motion } from "motion/react";
import { Parallax } from "./Parallax";
import RevealOnScroll from "./RevealOnScroll";
import { useLazyImageFade } from "../hooks/useLazyImageFade";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: {
    title: string;
    image: string;
    desc: string;
  };
  delay: number;
}

export default function ServiceCard({ service, delay }: ServiceCardProps) {
  const imgRef = useLazyImageFade();

  return (
    <RevealOnScroll delay={delay}>
      <Parallax speed={0.95}>
        <Link to={`/diensten`}>
          <motion.div
            className="group relative h-96 rounded-3xl overflow-hidden shadow-xl"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                ref={imgRef}
                src={`/images/optimized/${service.image}`}
                alt={service.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/95 via-blue-600/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.div className="absolute inset-0 bg-gradient-to-t from-green-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white/80 text-sm transition-opacity duration-500 delay-100">
                {service.desc}
              </p>
            </div>
          </motion.div>
        </Link>
      </Parallax>
    </RevealOnScroll>
  );
}
