import React from "react";
import "../sass/styles.scss";
import { LanguageProvider } from "utils/translate";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
    </>
  );
}

export default MyApp;
