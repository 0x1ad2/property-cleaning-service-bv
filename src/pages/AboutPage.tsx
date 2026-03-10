import { motion } from "motion/react";
import { Award, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/RevealOnScroll";

function Hero() {
  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/optimized/Branded Company Van.webp"
          alt="Property Cleaning Service B.V."
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-strong/95 via-strong/80 to-strong/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl"
        >
          Wie zijn wij?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-xl text-white/90 max-w-2xl leading-relaxed"
        >
          Property Cleaning Service B.V. is een bedrijf dat zich richt op het
          leveren van betrouwbare, kwalitatief hoge schoonmaakdiensten aan
          bedrijven die hun werkplek willen laten glanzen.
        </motion.p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="/images/optimized/Employees Loading Van.webp"
              alt="Ons team"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <RevealOnScroll>
              <div className="w-12 h-1 bg-blue-700 mb-6" />
              <h2 className="text-4xl font-bold text-strong mb-6">
                Onze Toewijding Aan Excellentie
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="text-lg text-muted leading-relaxed mb-6">
                Wij zijn Property Cleaning Service B.V. gestart met een
                eenvoudige missie: bedrijven voorzien van betrouwbare,
                professionele schoonmaakdiensten waarop ze kunnen vertrouwen.
                Ons succes is gebouwd op consistentie, kwaliteit en persoonlijke
                service.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-lg text-muted leading-relaxed mb-6">
                Wij investeren in ons team door middel van voortdurende
                training, gebruiken hoogwaardige producten en handhaven de
                hoogste veiligheidsnormen. Wanneer u kiest voor Property
                Cleaning Service B.V., kiest u voor een partner die zich inzet
                voor de netheid van uw objecten.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
              >
                Neem contact op
              </Link>
            </RevealOnScroll>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Values() {
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
          <h2 className="text-4xl font-bold text-strong mb-6">
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

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <Values />
    </>
  );
}
