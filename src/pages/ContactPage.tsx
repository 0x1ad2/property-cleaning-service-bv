import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";

function Hero() {
  return (
    <section className="relative h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/optimized/office-building-hall.webp"
          alt="Neem contact op"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-strong/95 via-strong/85 to-strong/70" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Neem Contact Op
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-xl text-white/90 max-w-2xl"
        >
          Klaar om professionele schoonmaak te ervaren? Neem contact met ons op
          voor een gratis offerte en adviesgesprek.
        </motion.p>
      </div>
    </section>
  );
}

function ContactInfo() {
  const info = [
    {
      icon: Phone,
      title: "Damiën",
      value: "(06) 87 21 32 45",
      href: "tel:+31687213245",
    },
    {
      icon: Phone,
      title: "Jordi",
      value: "(06) 10 88 90 80",
      href: "tel:+31610889080",
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "info@propertycleaningservice.nl",
      href: "mailto:info@propertycleaningservice.nl",
    },
    {
      icon: MapPin,
      title: "Werkgebied",
      value: "Landelijk - Nederland",
      href: null,
    },
    {
      icon: Clock,
      title: "Beschikbaarheid",
      value: "Ma-Vr 8:00 - 18:00",
      href: null,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map((item, idx) => (
            <RevealOnScroll key={item.title} delay={idx * 0.1}>
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
                  <item.icon className="w-10 h-10 text-white" />
                </motion.div>
                {item.href ? (
                  <a href={item.href} className="block">
                    <h3 className="text-sm font-semibold text-muted mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base font-bold text-strong">
                      {item.value}
                    </p>
                  </a>
                ) : (
                  <>
                    <h3 className="text-sm font-semibold text-muted mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base font-bold text-strong">
                      {item.value}
                    </p>
                  </>
                )}
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">
            Vraag Een Gratis Offerte Aan
          </h2>
          <p className="text-lg text-muted mb-8">
            Vul ons online formulier in en we nemen binnen 24 uur contact met u
            op
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-12 shadow-xl text-center"
          >
            <div className="max-w-md mx-auto">
              <p className="text-muted mb-8">
                Klik op de knop hieronder om ons offerteformulier in te vullen.
                We zorgen ervoor dat u zo snel mogelijk een passende offerte
                ontvangt.
              </p>
              <a
                href="https://forms.fillout.com/t/82QP886rAqus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30"
              >
                Open Offerteformulier
              </a>
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <Hero />
      <ContactInfo />
      <ContactForm />
    </>
  );
}
