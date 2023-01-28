import React, { useContext } from "react";
import { Logo } from "assets/icons";
import Link from "next/link";
import { LanguageContext } from "utils/translate";

function Header({ color2 }) {
  const { language } = useContext(LanguageContext);
  const { setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    window.localStorage.setItem("language", e.target.value);
  };

  return (
    <header>
      <Link href="/">
        <Logo color2={color2} />
      </Link>
      <select onChange={handleLanguageChange} value={language}>
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
    </header>
  );
}

export default Header;
