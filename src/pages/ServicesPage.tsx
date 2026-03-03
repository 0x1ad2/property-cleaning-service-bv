import { motion } from "motion/react";
import { CheckCircle2, Sparkles, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/optimized/Industrial Vacuum Usage.webp"
          alt="Professionele schoonmaakapparatuur"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-strong/95 via-strong/80 to-strong/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl"
        >
          Uitgebreide Schoonmaakoplossingen
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-xl text-white/90 max-w-2xl leading-relaxed mb-8"
        >
          Van dagelijks onderhoud tot grondige reiniging, wij bieden op maat
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
      title: "Kantoorschoonmaak",
      image: "Office Lobby.webp",
      features: [
        "Dagelijkse conciërgediensten",
        "Bureau en werkplek reiniging",
        "Keuken en pauzeruimte onderhoud",
        "Toilet sanitatie",
        "Vloerverzorging en stofzuigen",
      ],
    },
    {
      title: "Medische Faciliteiten",
      image: "Medical Room.webp",
      features: [
        "Ziekenhuiswaardige desinfectie",
        "Onderzoekskamer sanitatie",
        "Wachtruimte onderhoud",
        "Biohazard afvalverwerking",
        "Naleving van gezondheidsnormen",
      ],
    },
    {
      title: "Retail & Horeca",
      image: "Retail Store.webp",
      features: [
        "Klantgerichte ruimte reiniging",
        "Display en schap onderhoud",
        "Vloer polijsten en verzorging",
        "Raam en glas reiniging",
        "Service buiten openingstijden beschikbaar",
      ],
    },
    {
      title: "Industriële Panden",
      image: "School Interior.webp",
      features: [
        "Magazijnvloer reiniging",
        "Apparatuur gebied onderhoud",
        "Laadperron reiniging",
        "Hoog plafond ontstoffing",
        "Veiligheidscompliant procedures",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">Onze Diensten</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Professionele schoonmaakoplossingen voor elk type commerciële
            faciliteit
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
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
      title: "Milieuvriendelijke Producten",
      desc: "Wij gebruiken milieuveilige schoonmaakproducten die effectief en duurzaam zijn",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">
            Waarom Onze Diensten Opvallen
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-sky-400 flex items-center justify-center mb-6 shadow-md">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-strong mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-strong mb-6">
          Klaar Om Te Beginnen?
        </h2>
        <p className="text-xl text-muted mb-8">
          Neem vandaag nog contact met ons op voor een gratis adviesgesprek en
          op maat gemaakt schoonmaakplan
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
        >
          Gratis Offerte Aanvragen
        </Link>
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
