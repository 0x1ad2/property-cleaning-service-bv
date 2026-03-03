import { motion } from "motion/react";
import { Award, Users, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/optimized/Branded Company Van.webp"
          alt="Property Cleaning Service BV"
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
          15+ Jaar Betrouwbare Commerciële Schoonmaak
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-xl text-white/90 max-w-2xl leading-relaxed"
        >
          Property Cleaning Service BV levert al sinds onze oprichting
          betrouwbare, professionele schoonmaakdiensten aan bedrijven door heel
          Nederland.
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
            <div className="w-12 h-1 bg-blue-700 mb-6" />
            <h2 className="text-4xl font-bold text-strong mb-6">
              Onze Toewijding Aan Excellentie
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Wij zijn Property Cleaning Service BV gestart met een eenvoudige
              missie: bedrijven voorzien van betrouwbare, professionele
              schoonmaakdiensten waarop ze kunnen vertrouwen. Door de jaren heen
              zijn we gegroeid van een kleine lokale onderneming tot een
              dienstverlener voor klanten door heel Nederland.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Ons succes is gebouwd op consistentie, kwaliteit en persoonlijke
              service. Elke klant krijgt een toegewijde accountmanager die hun
              specifieke behoeften begrijpt en ervoor zorgt dat deze normen elke
              keer worden gehaald.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Wij investeren in ons team door middel van voortdurende training,
              gebruiken milieuvriendelijke producten en handhaven de hoogste
              veiligheidsnormen. Wanneer u kiest voor Property Cleaning Service
              BV, kiest u voor een partner die zich inzet voor de netheid van uw
              faciliteit en uw gemoedsrust.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
            >
              Werk Met Ons Samen
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    {
      icon: Award,
      title: "Kwaliteit Voorop",
      desc: "Wij maken nooit concessies aan de kwaliteit van ons werk. Elke klus wordt volgens de hoogste normen voltooid.",
    },
    {
      icon: Users,
      title: "Getrainde Professionals",
      desc: "Ons team ontvangt voortdurende training en certificering om up-to-date te blijven met best practices in de branche.",
    },
    {
      icon: TrendingUp,
      title: "Betrouwbare Service",
      desc: "Wij zijn altijd op tijd en leveren consistente resultaten waarop u kunt vertrouwen.",
    },
    {
      icon: Shield,
      title: "Volledig Verzekerd",
      desc: "Volledige aansprakelijkheidsdekking en gescreend personeel voor uw gemoedsrust.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">Onze Waarden</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            De principes die alles wat we doen begeleiden
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-700 to-sky-400 flex items-center justify-center shadow-md">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-strong mb-3">
                {value.title}
              </h3>
              <p className="text-muted leading-relaxed">{value.desc}</p>
            </motion.div>
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
