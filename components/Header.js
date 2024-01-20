import React, { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "assets/icons";
import Link from "next/link";
import { GeneralContext } from "store/context";
import styled from "styled-components";

function Header({ logoColor, color, color2 }) {
  const { language } = useContext(GeneralContext);
  const [scrollTop, setScrollTop] = useState(0);
  const header = useRef(null);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.scrollY;
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

  const month = language === "en" ? "February" : "Février";

  const monthAvailable =
    language === "en"
      ? `Available from ${month}`
      : `Disponible à partir de ${month}`;

  // const availability =
  //   language === "en" ? "Available for work" : "Disponible pour mission";

  return (
    <header
      className="header"
      ref={header}
      style={{
        "--color": logoColor,
        "--color2": color,
      }}
    >
      <Link
        href="/"
        style={{
          flex: "1",
        }}
      >
        <Logo logoColor={logoColor} />
      </Link>
      <Status
        style={{
          flex: "2",
        }}
        className="header__status"
      >
        <span className="header__status__circle" />
        <p>{monthAvailable}</p>
      </Status>
      <Links
        style={{
          flex: "1",
        }}
      >
        <Link className="header__link" href="/works">
          Projets
        </Link>
        /
        <Link className="header__link" href="/contact">
          Contact
        </Link>
      </Links>
    </header>
  );
}

export default Header;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: var(--color);
  font-size: 12px;
  gap: 6px;
  & a {
    color: var(--color);
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Status = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
