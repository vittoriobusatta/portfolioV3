import { Star } from "assets/icons";
import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MaskText, setTitles } from "utils/utils";

function AboutProject({ projects, language }) {
  const { title, subtitle, about, images } = projects.aboutproject;
  const { placeholder } = projects;

  const projectAbout = useRef([]);
  const subtle = useRef([]);
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    gsap.set(subtle.current.children, { y: "100%", opacity: 0 });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(subtle.current.children, {
              y: 0,
              opacity: 1,
              ease: "power4.out",
              delay: 0.2,
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(projectAbout.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="projects__about" ref={projectAbout}>
      <div className="projects__about__head">
        <div
          className="projects__subtitle"
          ref={(el) => {
            subtle.current = el;
          }}
        >
          <Star />
          {setTitles({
            phrases: subtitle[language],
            headingLevel: 4,
          })}
        </div>
        {setTitles({
          phrases: title[language],
          headingLevel: 3,
          className: "projects__title",
        })}
        <MaskText phrases={about[language]} />
      </div>
      <div
        className="projects__about__body"
        style={{
          "--placeholder": projects.color,
        }}
      >
        {Object.values(images).map((item, index) => (
          <div
            className={`projects__about__body__inner ${
              !imageLoaded ? "projects__about__body__inner--loaded" : ""
            }`}
            key={index}
          >
            <Image
              className="projects__about__body__inner__image"
              src={item.src}
              alt={item.alt}
              width={385}
              height={481}
              onLoadingComplete={() => setImageLoaded(false)}
              priority
              placeholder="blur"
              blurDataURL={placeholder}
            />
            <div className="placeholder" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutProject;
