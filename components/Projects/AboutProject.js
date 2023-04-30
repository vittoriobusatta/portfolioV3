import { Star } from "assets/icons";
import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

function AboutProject({
  projects,
  language,
}) {
  const { title, subtitle, about, images } = projects.aboutproject;
  const {placeholder} = projects

  const projectAbout = useRef([]);
  const subtle = useRef([]);

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
          <h4>{subtitle[language]}</h4>
        </div>
        <h3 className="projects__title">
          {title[language]}
        </h3>
        <p className="projects__description">
          {about[language]}
        </p>
      </div>
      <div
        className="projects__about__images"
        style={{
          "--placeholder": placeholder,
        }}
      >
        {Object.values(images).map((item, index) => (
          <div className="projects__about__images__inner" key={index}>
            <Image
              className="image"
              src={item.src}
              alt={item.alt}
              width={385}
              height={481}
              priority
              placeholder="blur"
              blurDataURL={placeholder}
            />
            <div
              style={{
                "--placeholder": placeholder,
              }}
              className="placeholder"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutProject;
