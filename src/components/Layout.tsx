import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/diensten", label: "Diensten" },
    { href: "/over-ons", label: "Over Ons" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Property Cleaning Service B.V."
              className="h-10 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-bold text-md text-strong leading-tight">
                Property Cleaning Service
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-blue-700"
                    : "text-muted hover:text-strong"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="h-0.5 bg-blue-700 mt-1"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <a
              href="https://fillout.com/t/YOUR_FORM_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-md shadow-blue-700/30"
            >
              Offerte Aanvragen
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-muted hover:text-blue-700 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-muted hover:bg-background"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://fillout.com/t/YOUR_FORM_ID"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors text-center"
              >
                Offerte Aanvragen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-strong text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.svg"
                alt="Property Cleaning Service B.V."
                className="h-10 w-auto brightness-0 invert"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">
                  Property Cleaning Service
                </span>
                <span className="text-xs text-white/70">B.V.</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Professionele schoonmaakdiensten voor commerciële panden door heel
              Nederland.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Diensten</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/diensten"
                  className="text-white/70 hover:text-sky-400 transition-colors"
                >
                  Kantoorschoonmaak
                </Link>
              </li>
              <li>
                <Link
                  to="/diensten"
                  className="text-white/70 hover:text-sky-400 transition-colors"
                >
                  Huisarts & Tandarts Praktijken
                </Link>
              </li>
              <li>
                <Link
                  to="/diensten"
                  className="text-white/70 hover:text-sky-400 transition-colors"
                >
                  Retail & Horeca
                </Link>
              </li>
              <li>
                <Link
                  to="/diensten"
                  className="text-white/70 hover:text-sky-400 transition-colors"
                >
                  Industriële Panden
                </Link>
              </li>
              <li>
                <Link
                  to="/diensten"
                  className="text-white/70 hover:text-sky-400 transition-colors"
                >
                  Particuliere Woningen
                </Link>
              </li>
              <li>
                <Link
                  to="/diensten"
                  className="text-white/70 hover:text-sky-400 transition-colors"
                >
                  Glasbewassing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Bedrijf</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/over-ons"
                  className="text-white/70 hover:text-sky-400 transition-colors"
                >
                  Over Ons
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-sky-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>info@propertycleaningservice.nl</li>
            </ul>
            <a
              href="https://fillout.com/t/YOUR_FORM_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-6 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-md"
            >
              Offerte Aanvragen
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/50">
          <p>
            {new Date().getFullYear()} Property Cleaning Service B.V. Alle
            rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
