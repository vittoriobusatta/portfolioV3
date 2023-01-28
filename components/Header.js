import React, { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "assets/icons";
import Link from "next/link";
import { LanguageContext } from "utils/translate";

function Header({ logoColor, color, color2 }) {
  const { language } = useContext(LanguageContext);
  const { setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    window.localStorage.setItem("language", e.target.value);
  };

  const [scrollTop, setScrollTop] = useState(0);
  const header = useRef(null);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset;
      if (currentPosition > scrollTop) {
        header.current.style.top = "-100px";
      } else {
        header.current.style.top = "0";
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <header ref={header}>
      <Link href="/">
        <Logo logoColor={logoColor} />
      </Link>
      <select
        style={{
          backgroundColor: color,
          color: color2,
          border: `1px solid ${logoColor}`,
          borderRadius: "20px",
          padding: "4px"
        }}
        onChange={handleLanguageChange}
        value={language}
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
    </header>
  );
}

export default Header;
