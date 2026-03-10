import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AnchorLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Parse the URL to get the path and hash
    const url = new URL(to, window.location.origin);
    const path = url.pathname;
    const hash = url.hash;

    // If we're on a different page, navigate first then scroll
    if (location.pathname !== path) {
      // Navigate to the page
      navigate(to);

      // Wait for page to load, then scroll to anchor
      setTimeout(() => {
        scrollToAnchor(hash);
      }, 300);
    } else {
      // If we're on the same page, just scroll to anchor
      scrollToAnchor(hash);
    }
  };

  const scrollToAnchor = (hash: string, attempt: number = 1) => {
    console.log(
      `AnchorLink: Attempting to scroll to hash: "${hash}" (attempt ${attempt})`,
    );

    // Debug: List all service-related IDs in the DOM
    if (attempt === 1) {
      const serviceElements = document.querySelectorAll(
        '[id*="retail"], [id*="horeca"], [id*="kantoor"], [id*="praktijk"], [id*="industri"], [id*="woning"], [id*="oplevering"], [id*="particulier"], [id*="glas"]',
      );
      console.log(
        `AnchorLink: Found service elements with IDs:`,
        Array.from(serviceElements).map((el) => el.id),
      );
    }

    if (hash) {
      const element = document.querySelector(hash);
      console.log(`AnchorLink: Found element:`, element);
      if (element) {
        const lenis = (
          window as {
            lenis?: {
              scrollTo: (y: number, options?: { offset?: number }) => void;
            };
          }
        ).lenis;
        const y = element.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for navbar

        console.log(`AnchorLink: Scrolling to position: ${y}`);
        if (lenis) {
          lenis.scrollTo(y, { offset: 0 });
        } else {
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      } else {
        console.log(`AnchorLink: Element not found for hash: "${hash}"`);
        // Retry a few times with increasing delays
        if (attempt < 5) {
          const delay = attempt * 200; // 200ms, 400ms, 600ms, 800ms
          console.log(`AnchorLink: Retrying in ${delay}ms...`);
          setTimeout(() => scrollToAnchor(hash, attempt + 1), delay);
        } else {
          console.log(`AnchorLink: Max retries reached for hash: "${hash}"`);
        }
      }
    }
  };

  // Handle initial page load with hash
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        scrollToAnchor(location.hash);
      }, 200);
    }
  }, [location.hash]);

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
