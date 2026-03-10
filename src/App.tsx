import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Layout from "./components/Layout";
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";
import CookieConsent from "./components/CookieConsent";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
// import ShopPage from "./pages/ShopPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Don't scroll to top if there's a hash (anchor navigation)
    if (hash) {
      console.log("ScrollToTop: Skipping scroll to top due to hash:", hash);
      return;
    }

    console.log("ScrollToTop triggered for:", pathname);

    // Add a small delay to ensure Lenis is initialized
    const scrollToTop = (attempt: number = 1) => {
      console.log(`ScrollToTop attempt ${attempt}`);

      const lenis = (
        window as {
          lenis?: {
            scrollTo: (y: number, options?: { immediate?: boolean }) => void;
          };
        }
      ).lenis;

      if (lenis) {
        console.log("Using Lenis scrollTo");
        lenis.scrollTo(0, { immediate: true });
      } else {
        console.log("Using native scrollTo");
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    // Try immediately first
    scrollToTop();

    // Try again after delays to ensure it works
    const timeout1 = setTimeout(() => scrollToTop(2), 50);
    const timeout2 = setTimeout(() => scrollToTop(3), 150);
    const timeout3 = setTimeout(() => scrollToTop(4), 300);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll>
        <SEO />
        <StructuredData type="Organization" />
        <StructuredData type="LocalBusiness" />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diensten" element={<ServicesPage />} />
            <Route path="/over-ons" element={<AboutPage />} />
            {/* <Route path="/shop" element={<ShopPage />} /> */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
        <CookieConsent />
      </SmoothScroll>
    </BrowserRouter>
  );
}
