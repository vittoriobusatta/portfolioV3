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
  }, []);

  return (
    <GeneralContext.Provider
      value={{ language, setLanguage, slideCurrent, setSlideCurrent }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
