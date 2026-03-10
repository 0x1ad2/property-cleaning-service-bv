import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Type declaration for Google Analytics gtag function
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string,
      config?: Record<string, any>,
    ) => void;
  }
}

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  canonical?: string;
}

export default function SEO({
  title = "Property Cleaning Service B.V. - Professionele Schoonmaakdiensten",
  description = "Property Cleaning Service B.V. levert professioneel schoonmaakwerk voor vastgoedbeheerders, verhuurders, VvE's en short-stay verhuur in heel Nederland. Betrouwbaar, strak georganiseerd en altijd op tijd.",
  image = "https://www.propertycleaningservice.nl/og-image.jpg",
  type = "website",
  canonical,
}: SEOProps) {
  const location = useLocation();
  const url = `https://www.propertycleaningservice.nl${location.pathname}`;
  const canonicalUrl = canonical || url;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "Property Cleaning Service B.V.", true);
    updateMetaTag("og:locale", "nl_NL", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);
  }, [title, description, image, type, url, canonicalUrl]);

  // Track page views with Google Analytics
  useEffect(() => {
    // Only track if gtag is available (Google Analytics is loaded)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-5NCWT0986H", {
        page_path: location.pathname + location.search + location.hash,
      });
    }
  }, [location]);

  return null;
}
