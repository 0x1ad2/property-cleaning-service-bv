import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Award, Shield, Users, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Parallax } from "../components/Parallax";
import RevealOnScroll from "../components/RevealOnScroll";
import MagneticButton from "../components/MagneticButton";
import FloatingBlob from "../components/FloatingBlob";

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingBlob
        color="from-blue-500/30 to-sky-400/30"
        size={600}
        top="-10%"
        left="-10%"
        duration={25}
      />
      <FloatingBlob
        color="from-teal-500/20 to-blue-400/20"
        size={400}
        bottom="-5%"
        right="-5%"
        duration={20}
      />

      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, willChange: "transform" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-teal-900/95 mix-blend-multiply" />
        <img
          src="/images/optimized/Office Building Hall.webp"
          alt="Commerciële schoonmaak"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: textY, opacity, willChange: "transform, opacity" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-6"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-sky-300" />
            <span className="text-sm text-white/90 font-medium">
              Premium Schoonmaakdiensten
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
        >
          Professionele Commerciële
          <br />
          <span className="bg-gradient-to-r from-sky-300 via-teal-300 to-blue-300 bg-clip-text text-transparent">
            Schoonmaakdiensten
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Betrouwbare, professionele schoonmaak voor kantoren, industriële
          panden en commerciële ruimtes door heel Nederland
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="https://fillout.com/t/YOUR_FORM_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-2xl shadow-blue-900/50"
            strength={0.2}
          >
            Offerte Aanvragen
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>

          <MagneticButton
            href="/diensten"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            strength={0.15}
          >
            Onze Diensten
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "Kantoorgebouwen",
      image: "Office Lobby.webp",
      desc: "Professionele schoonmaak voor kantoren en bedrijfspanden",
    },
    {
      title: "Medische Faciliteiten",
      image: "Medical Facility.webp",
      desc: "Schoonmaak voor zorginstellingen",
    },
    {
      title: "Horeca",
      image: "Hospitality Venue.webp",
      desc: "Handhaaf de hoogste normen voor uw gasten",
    },
    {
      title: "Sportscholen",
      image: "Gym Cleaning.webp",
      desc: "Hygiënische schoonmaak voor sportfaciliteiten",
    },
    {
      title: "Industrieel",
      image: "Event Space.webp",
      desc: "Schoonmaak voor industriële faciliteiten",
    },
    {
      title: "Retail",
      image: "Retail Store.webp",
      desc: "Houd uw winkelomgeving schoon voor klanten",
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      <FloatingBlob
        color="from-blue-400/10 to-teal-400/10"
        size={500}
        top="10%"
        right="-10%"
        duration={30}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-strong mb-4">
            Wij maken verschillende soorten objecten schoon
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Hieronder vindt u een overzicht van de soorten objecten die wij
            schoonmaken
          </p>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <RevealOnScroll key={service.title} delay={idx * 0.1}>
              <Parallax speed={0.95}>
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
                      src={`/images/optimized/${service.image}`}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div className="absolute inset-0 bg-gradient-to-t from-teal-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </Parallax>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const reasons = [
    {
      icon: Shield,
      title: "Gecertificeerde Professionals",
      desc: "Onze team bestaat uit gecertificeerde professionals die altijd op hoog niveau blijven.",
    },
    {
      icon: Award,
      title: "Kwaliteit is onze prioriteit",
      desc: "Consistente hoogwaardige resultaten bij elke dienst",
    },
    {
      icon: Users,
      title: "Getraind Team",
      desc: "Ervaren personeel met voortdurende professionele training",
    },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-strong mb-4">
            Waarom Voor Ons Kiezen
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Wij zijn toegewijd aan het leveren van uitzonderlijke
            schoonmaakdiensten met professionaliteit en betrouwbaarheid
          </p>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {reasons.map((reason, idx) => (
            <RevealOnScroll key={reason.title} delay={idx * 0.15}>
              <motion.div
                className="text-center group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-shadow duration-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <reason.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-strong mb-3">
                  {reason.title}
                </h3>
                <p className="text-muted leading-relaxed">{reason.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y, willChange: "transform" }}
      >
        <img
          src="/images/optimized/Employees Loading Van.webp"
          alt="Ons team"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-teal-900/90" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Op zoek naar professionele schoonmaak die écht het verschil maakt?
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Vraag vandaag nog een gratis offerte aan en ontdek waarom bedrijven
            Property Cleaning Service B.V. vertrouwen
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <MagneticButton
            href="https://fillout.com/t/YOUR_FORM_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-900 font-bold text-lg rounded-xl hover:bg-blue-50 transition-colors shadow-2xl shadow-blue-900/50"
            strength={0.25}
          >
            Offerte Aanvragen
            <ArrowRight className="w-6 h-6" />
          </MagneticButton>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <CTA />
    </>
  );
}
