import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50 px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8">
            <motion.h1
              className="text-9xl font-bold bg-gradient-to-r from-blue-700 to-sky-400 bg-clip-text text-transparent mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              404
            </motion.h1>
            <h2 className="text-3xl font-bold text-strong mb-4">
              Pagina niet gevonden
            </h2>
            <p className="text-lg text-muted max-w-md mx-auto">
              Sorry, de pagina die u zoekt bestaat niet of is verplaatst.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
            >
              <Home className="w-5 h-5" />
              Terug naar home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-strong font-semibold rounded-lg hover:bg-gray-100 transition-colors border border-border"
            >
              <ArrowLeft className="w-5 h-5" />
              Ga terug
            </button>
          </div>

          <div className="mt-12">
            <p className="text-sm text-muted mb-4">Populaire pagina's:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/diensten"
                className="px-4 py-2 bg-white text-strong text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors border border-border"
              >
                Diensten
              </Link>
              <Link
                to="/over-ons"
                className="px-4 py-2 bg-white text-strong text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors border border-border"
              >
                Over Ons
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 bg-white text-strong text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors border border-border"
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
