import React, { createContext, useEffect, useState } from "react";

export const GeneralContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr");
  const [slideCurrent, setSlideCurrent] = useState({
    id: 0,
    index: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slideCurrent = window.localStorage.getItem("slideCurrent");
      if (slideCurrent) {
        setSlideCurrent({
          id: 0,
          index: parseInt(slideCurrent),
        });
      }
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
