import { motion } from "motion/react";
import { ArrowRight, Award, Shield, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/optimized/Office Building Hall.webp"
          alt="Commerciële schoonmaak"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-strong/90 via-strong/70 to-strong/50" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Professionele Commerciële
          <br />
          <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            Schoonmaakdiensten
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Betrouwbare, professionele schoonmaak voor kantoren, industriële
          panden en commerciële ruimtes door heel Nederland
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30"
          >
            Offerte Aanvragen
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/diensten"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          >
            Onze Diensten
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { number: "15+", label: "Jaar Ervaring" },
    { number: "500+", label: "Tevreden Klanten" },
    { number: "50+", label: "Teamleden" },
    { number: "24/7", label: "Ondersteuning" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="text-center"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-sky-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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
      title: "Retail Ruimtes",
      image: "Retail Store.webp",
      desc: "Houd uw winkelomgeving schoon voor klanten",
    },
    {
      title: "Medische Faciliteiten",
      image: "Medical Facility.webp",
      desc: "Gespecialiseerde schoonmaak voor zorginstellingen",
    },
    {
      title: "Horeca",
      image: "Hospitality Venue.webp",
      desc: "Handhaaf de hoogste normen voor uw gasten",
    },
    {
      title: "Sportscholen & Fitness",
      image: "Gym Cleaning.webp",
      desc: "Hygiënische schoonmaak voor sportfaciliteiten",
    },
    {
      title: "Evenementenlocaties",
      image: "Event Space.webp",
      desc: "Voor en na evenement schoonmaakdiensten",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">
            Wij Werken Met Alle Soorten Faciliteiten
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Van kantoren tot medische faciliteiten, wij bieden gespecialiseerde
            schoonmaakdiensten op maat voor uw branche
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={`/images/optimized/${service.image}`}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-strong via-strong/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/80 text-sm">{service.desc}</p>
              </div>
            </motion.div>
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
      title: "Volledig Verzekerd",
      desc: "Volledige aansprakelijkheidsdekking en gecertificeerde professionals",
    },
    {
      icon: Award,
      title: "Kwaliteit Gegarandeerd",
      desc: "Consistente hoogwaardige resultaten bij elke dienst",
    },
    {
      icon: Users,
      title: "Getraind Team",
      desc: "Ervaren personeel met voortdurende professionele training",
    },
    {
      icon: TrendingUp,
      title: "Bewezen Track Record",
      desc: "15+ jaar dienstverlening aan bedrijven door heel Nederland",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">
            Waarom Voor Ons Kiezen
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Wij zijn toegewijd aan het leveren van uitzonderlijke
            schoonmaakdiensten met professionaliteit en betrouwbaarheid
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-700 to-sky-400 flex items-center justify-center shadow-lg">
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-strong mb-2">
                {reason.title}
              </h3>
              <p className="text-muted">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/optimized/Employees Loading Van.webp"
          alt="Ons team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/90" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Klaar Om Professionele Schoonmaak Te Ervaren?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Vraag vandaag nog een gratis offerte aan en ontdek waarom bedrijven
          Property Cleaning Service BV vertrouwen
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          Gratis Offerte Aanvragen
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <CTA />
    </>
  );
}
