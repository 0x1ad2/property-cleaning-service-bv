import { useEffect } from "react";

interface StructuredDataProps {
  type: "Organization" | "LocalBusiness" | "Service" | "WebPage";
  data?: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const getStructuredData = () => {
      const baseData = {
        "@context": "https://schema.org",
      };

      switch (type) {
        case "Organization":
          return {
            ...baseData,
            "@type": "Organization",
            name: "Property Cleaning Service B.V.",
            url: "https://www.propertycleaningservice.nl",
            logo: "https://www.propertycleaningservice.nl/logo.png",
            description:
              "Professionele schoonmaakdiensten voor commerciële panden in Nederland",
            email: "info@propertycleaningservice.nl",
            address: {
              "@type": "PostalAddress",
              addressCountry: "NL",
              addressLocality: "Nederland",
            },
            sameAs: [],
            ...data,
          };

        case "LocalBusiness":
          return {
            ...baseData,
            "@type": "LocalBusiness",
            "@id": "https://www.propertycleaningservice.nl/#organization",
            name: "Property Cleaning Service B.V.",
            image: "https://www.propertycleaningservice.nl/logo.png",
            url: "https://www.propertycleaningservice.nl",
            telephone: "+31687213245",
            email: "info@propertycleaningservice.nl",
            priceRange: "€€",
            address: {
              "@type": "PostalAddress",
              addressCountry: "NL",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "52.3676",
              longitude: "4.9041",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "08:00",
                closes: "18:00",
              },
            ],
            ...data,
          };

        case "Service":
          return {
            ...baseData,
            "@type": "Service",
            serviceType: "Commerciële Schoonmaakdiensten",
            provider: {
              "@type": "Organization",
              name: "Property Cleaning Service B.V.",
              url: "https://www.propertycleaningservice.nl",
            },
            areaServed: {
              "@type": "Country",
              name: "Nederland",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Schoonmaakdiensten",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Kantoorschoonmaak",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Industriële Schoonmaak",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Medische Faciliteiten",
                  },
                },
              ],
            },
            ...data,
          };

        case "WebPage":
          return {
            ...baseData,
            "@type": "WebPage",
            name: "Property Cleaning Service B.V.",
            description:
              "Professionele schoonmaakdiensten voor commerciële panden",
            url: "https://www.propertycleaningservice.nl",
            inLanguage: "nl-NL",
            ...data,
          };

        default:
          return baseData;
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(getStructuredData());
    script.id = `structured-data-${type}`;

    // Remove existing script if present
    const existing = document.getElementById(script.id);
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [type, data]);

  return null;
}
