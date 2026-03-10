import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./motion.css";
import App from "./App.tsx";

// Global lazy image fade-in handler
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;

        const handleLoad = () => {
          requestAnimationFrame(() => {
            img.classList.add("loaded");
          });
        };

        const handleError = () => {
          img.classList.add("loaded");
        };

        // If already loaded (cached)
        if (img.complete && img.naturalHeight !== 0) {
          requestAnimationFrame(() => {
            img.classList.add("loaded");
          });
        } else {
          img.addEventListener("load", handleLoad, { once: true });
          img.addEventListener("error", handleError, { once: true });
        }

        imageObserver.unobserve(img);
      }
    });
  });

  // Observe all lazy images on page load and mutations
  const observeLazyImages = () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      imageObserver.observe(img);
    });
  };

  // Initial observation
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeLazyImages);
  } else {
    observeLazyImages();
  }

  // Observe dynamically added images
  const mutationObserver = new MutationObserver(() => {
    observeLazyImages();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
