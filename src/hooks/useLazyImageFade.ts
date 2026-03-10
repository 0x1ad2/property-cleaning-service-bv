import { useEffect, useRef } from "react";

/**
 * Hook to fade in lazy-loaded images smoothly
 * Prevents flickering when images load
 */
export function useLazyImageFade() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    // If image is already loaded (cached)
    if (img.complete) {
      img.classList.add("loaded");
      return;
    }

    // Wait for image to load
    const handleLoad = () => {
      img.classList.add("loaded");
    };

    img.addEventListener("load", handleLoad);

    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, []);

  return imageRef;
}
