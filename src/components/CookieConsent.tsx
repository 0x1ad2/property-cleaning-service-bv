import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cookie } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const loadGoogleAnalytics = () => {
    // Replace GA_MEASUREMENT_ID with your actual Google Analytics ID
    const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    `;
    document.head.appendChild(script2);
  };

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);

      // Load analytics if consented
      if (saved.analytics) {
        loadGoogleAnalytics();
      }
    }
  }, []);

  const acceptAll = () => {
    const newPrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(newPrefs);
    localStorage.setItem("cookie-consent", JSON.stringify(newPrefs));
    setShowBanner(false);
    loadGoogleAnalytics();
  };

  const acceptNecessary = () => {
    const newPrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPrefs);
    localStorage.setItem("cookie-consent", JSON.stringify(newPrefs));
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
    if (preferences.analytics) {
      loadGoogleAnalytics();
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <Cookie className="w-6 h-6 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-strong mb-2">
                    Wij gebruiken cookies
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    Wij gebruiken cookies om uw ervaring te verbeteren en onze
                    website te analyseren. Noodzakelijke cookies zijn altijd
                    actief. U kunt uw voorkeuren hieronder aanpassen.
                  </p>
                </div>
                <button
                  onClick={acceptNecessary}
                  className="text-muted hover:text-strong transition-colors"
                  aria-label="Sluiten"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-not-allowed opacity-60">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-4 h-4 rounded border-border"
                  />
                  <div>
                    <div className="text-sm font-semibold text-strong">
                      Noodzakelijke cookies
                    </div>
                    <div className="text-xs text-muted">
                      Vereist voor de werking van de website
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        analytics: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-border"
                  />
                  <div>
                    <div className="text-sm font-semibold text-strong">
                      Analytische cookies
                    </div>
                    <div className="text-xs text-muted">
                      Helpen ons de website te verbeteren
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        marketing: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-border"
                  />
                  <div>
                    <div className="text-sm font-semibold text-strong">
                      Marketing cookies
                    </div>
                    <div className="text-xs text-muted">
                      Voor gepersonaliseerde advertenties
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Alles accepteren
                </button>
                <button
                  onClick={savePreferences}
                  className="flex-1 px-6 py-3 bg-background text-strong font-semibold rounded-lg hover:bg-gray-200 transition-colors border border-border"
                >
                  Voorkeuren opslaan
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-6 py-3 text-muted hover:text-strong font-medium transition-colors"
                >
                  Alleen noodzakelijke
                </button>
              </div>

              <div className="mt-4 text-center">
                <a
                  href="/files/privacy-verklaring.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-700 hover:text-blue-800 underline"
                >
                  Lees ons privacybeleid
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
