import React, { createContext, useEffect, useState } from "react";

export const GeneralContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr");
  const [slideCurrent, setSlideCurrent] = useState(0);

  useEffect(() => {
    const localLanguage = window.localStorage.getItem("language");
    if (localLanguage) {
      setLanguage(localLanguage);
    }

    const localSlideCurrent = window.localStorage.getItem("slideCurrent");
    if (localSlideCurrent) {
      setSlideCurrent(Number(localSlideCurrent));
    }

    const browserLanguage =
      navigator.language || navigator.userLanguage || "fr";

    if (browserLanguage.startsWith("en")) {
      setLanguage("en");
    } else {
      setLanguage("fr");
    }
  }, []);

  return (
    <GeneralContext.Provider
      value={{ language, setLanguage, slideCurrent, setSlideCurrent }}
    >
      {children}
    </GeneralContext.Provider>
  );
};