import React from "react";
import "../sass/styles.scss";
import { LanguageProvider } from "store/context";
import Lenis from "@studio-freight/lenis";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
        <Cursor />
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath}/>
        </AnimatePresence>
      </LanguageProvider>
    </>
  );
}

export default MyApp;
