import React from "react";
import "../sass/styles.scss";
import { LanguageProvider } from "utils/translate";
import Lenis from "@studio-freight/lenis";
import Loader from "@/components/Loader";

function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
  return (
    <>
      <LanguageProvider>
        {/* <Loader /> */}
        <Component {...pageProps} />
      </LanguageProvider>
    </>
  );
}

export default MyApp;
