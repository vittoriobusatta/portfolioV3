import { Star } from "assets/icons";
import Image from "next/image";
import React from "react";

function Branding({ projects, language }) {
  return (
    <div className="projects__branding">
      <div className="typography__head">
        <div className="typography__head__subtitle">
          <Star />
          <h4>{projects.brandingproject.subtitle[language]}</h4>
        </div>
        <div className="typography__head__bar" />
      </div>
      <div className="projects__branding__image">
        <Image
          src={projects.brandingproject.images.src}
          alt={projects.brandingproject.images.alt}
          width={1512}
          height={1612}
          priority
        />
      </div>
      <div className="projects__branding__details">
        <p>{projects.brandingproject.description[language]}</p>
      </div>
    </div>
  );
}

export default Branding;
