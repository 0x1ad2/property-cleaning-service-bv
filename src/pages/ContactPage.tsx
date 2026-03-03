import { motion } from "motion/react";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

function Hero() {
  return (
    <section className="relative h-[400px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/optimized/Office Building Hall.webp"
          alt="Neem contact op"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-strong/95 via-strong/85 to-strong/70" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
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
      title: "Telefoon",
      value: "+31 6 12 34 56 78",
      href: "tel:+31612345678",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={item.href ? "group" : ""}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block bg-background rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-muted mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base font-bold text-strong">
                    {item.value}
                  </p>
                </a>
              ) : (
                <div className="bg-background rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-sky-400 flex items-center justify-center mb-4 shadow-md">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-muted mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base font-bold text-strong">
                    {item.value}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Bedankt voor uw bericht! We nemen binnen 24 uur contact met u op.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-strong mb-4">
            Vraag Een Gratis Offerte Aan
          </h2>
          <p className="text-lg text-muted">
            Vul onderstaand formulier in en we nemen binnen 24 uur contact met u
            op
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-strong mb-2">
                  Naam *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Uw naam"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-strong mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="uw@email.nl"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-strong mb-2">
                  Telefoon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="+31 6 ..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-strong mb-2">
                  Bedrijf
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Uw bedrijf"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-strong mb-2">
                Bericht *
              </label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                placeholder="Vertel ons over uw schoonmaakbehoeften..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30"
            >
              Bericht Versturen
            </button>
          </form>
        </motion.div>
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
