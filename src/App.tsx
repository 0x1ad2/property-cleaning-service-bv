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
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <SEO />
        <StructuredData type="Organization" />
        <StructuredData type="LocalBusiness" />
        <ScrollToTop />
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
