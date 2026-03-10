import { motion } from "motion/react";
import { CheckCircle2, Sparkles, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/RevealOnScroll";

function Hero() {
  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/optimized/Industrial Vacuum Usage.webp"
          alt="Professionele schoonmaakapparatuur"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-strong/95 via-strong/80 to-strong/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl mt-16"
        >
          Uitgebreide Schoonmaakoplossingen
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-xl text-white/90 max-w-2xl leading-relaxed mb-8"
        >
          Van dagelijks schoonmaak tot grondige reiniging, wij bieden op maat
          gemaakte schoonmaakdiensten afgestemd op de specifieke behoeften van
          uw faciliteit.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
          >
            Offerte Aanvragen
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesList() {
  const services = [
    {
      title: "Woningontruiming",
      image: "Home Emptying.webp",
      features: [
        "Leeghalen van de woning: Het verwijderen van meubels, huisraad, gordijnen, lampen en vloerbedekking.",
        "Sorteren en recyclen: Inboedel wordt gesorteerd in herbruikbare spullen (donatie/verkoop) en afval.",
        "Milieubewuste afvalverwerking: Het afvoeren van afval naar erkende stortplaatsen.",
        "Leeghalen van overige ruimtes: Schuren, kelders, zolders en garages ontruimen.",
      ],
    },
    {
      title: "Opleveringswerkzaamheden",
      image: "Home Cleanup.webp",
      features: [
        "Bezemschoon opleveren: De woning stofvrij en netjes achterlaten.",
        "Verwijderen van vloeren en wandbekleding: Laminaat, tapijt, zeil, behang en schroeven in muren verwijderen.",
        "Schoonmaak: Het reinigen van keuken, badkamer en toilet.",
        "Kleine herstelwerkzaamheden: Gaatjes in de muren dichten, schilderen of plafonds witten.",
      ],
    },
    {
      title: "Kantoor reiniging",
      image: "Office Lobby.webp",
      features: [
        "Dagelijkse conciërgediensten",
        "Bureau en werkplek reiniging",
        "Keuken en pauzeruimte schoonmaak",
        "Toilet sanitatie",
        "Vloerverzorging en stofzuigen",
        "Koffie machine reiniging",
        "Raam en glas reiniging",
      ],
    },
    {
      title: "Praktijk reiniging",
      image: "Medical Office.webp",
      features: [
        "Toilet sanitatie",
        "Vloerverzorging en stofzuigen",
        "Wand en plafond reiniging",
        "Keuken en pauzeruimte schoonmaak",
        "Wachtkamer reiniging",
      ],
    },
    {
      title: "Retail & Horeca reiniging",
      image: "Retail Store.webp",
      features: [
        "Klantgerichte ruimte reiniging",
        "Display en schap schoonmaak",
        "Vloer verzorging en grondige reiniging",
        "Service buiten openingstijden beschikbaar",
      ],
    },
    {
      title: "Industriële reiniging",
      image: "School Interior.webp",
      features: [
        "Magazijnvloer reiniging",
        "Apparatuur gebied schoonmaak",
        "Laadperron reiniging",
        "Hoog plafond ontstoffing",
      ],
    },
    {
      title: "Particulier",
      image: "Bedroom.webp",
      features: [
        "Interieur schoonmaak",
        "Sanitair",
        "Vloeroppervlaktes",
        "Glasbewassing",
      ],
    },
    {
      title: "Glasbewassing",
      image: "Glass Cleaning.webp",
      features: [
        "Glasreiniging van raam, spiegels, dakzilvering en andere oppervlakken",
        "Strepproducten en handzuigers om afvalstof te verwijderen",
        "Professionele afwerking voor een helder en glanzend uitzicht",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">Onze Diensten</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Professionele schoonmaakoplossingen voor elk type commerciële
            faciliteit
          </p>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <RevealOnScroll key={service.title} delay={idx * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={`/images/optimized/${service.image}`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-strong mb-4">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: Sparkles,
      title: "Hoogwaardige Producten",
      desc: "Wij gebruiken hoogwaardige schoonmaakproducten die effectief, duurzaam en veilig zijn",
    },
    {
      icon: Shield,
      title: "Gecertificeerd & Verzekerd",
      desc: "Volledig gelicentieerd, verzekerd en gescreende schoonmaakprofessionals",
    },
    {
      icon: Clock,
      title: "Flexibele Planning",
      desc: "Beschikbaar voor dag-, avond- of weekendschoonmaak passend bij uw schema",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">
            Waarom Onze Diensten Opvallen
          </h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <RevealOnScroll key={benefit.title} delay={idx * 0.1}>
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
                  <benefit.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-strong mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted leading-relaxed">{benefit.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <h2 className="text-4xl font-bold text-strong mb-6">
            Laat uw ruimten glanzen
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-muted mb-8">
            Neem contact op om uw kantoor of faciliteit in zijn volle glorie te
            houden. We bieden een gratis adviesgesprek en op maat gemaakt
            schoonmaakplan aan.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
          >
            Offerte Aanvragen
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <ServicesList />
      <Benefits />
      <CTA />
    </>
  );
}
