import { Star } from "assets/icons";
import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MaskText, setTitles } from "utils/utils";
import styled from "styled-components";
import { motion } from "framer-motion";

function AboutProject({ project, language }) {
  const { title, subtitle, about, images } = project.aboutproject;
  const { placeholder } = project;
  const { path } = project;

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
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="projects__about"
      ref={projectAbout}
    >
      <Head className="projects__about__head">
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
      </Head>
      <div
        className="projects__about__body"
        style={{
          "--placeholder": project.color,
        }}
      >
        {Object.values(images).map((item, index) => {
          const { src } = item;
          const isSvg = src.includes(".svg");
          return (
            <div
              className={`projects__about__body__inner ${
                !imageLoaded ? "projects__about__body__inner--loaded" : ""
              }`}
              key={index}
            >
              <Image
                className="projects__about__body__inner__image"
                src={`/assets/${path}/${src}${isSvg ? "" : ".webp"}`}
                alt={
                  `${project.name} - About Project - ` +
                  `${index + 1} of ${Object.values(images).length}`
                }
                width={385}
                height={481}
                onLoadingComplete={() => setImageLoaded(false)}
                priority
                placeholder="blur"
                blurDataURL={placeholder}
              />
              <div className="placeholder" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AboutProject;

const Head = styled.div`
  padding: 62px 5.5vw 0;
  @media screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: 0.4fr repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: fit-content;
    & > :first-child {
      grid-area: 2 / 1 / 3 / 2;
      padding-top: 8px;
    }
    & > :nth-child(2) {
      grid-area: 1 / 2 / 2 / 5;
      padding-left: min(3vw, 45px);
    }
    & > :nth-child(3) {
      grid-area: 2 / 2 / 4 / 5;
      padding-left: min(3vw, 45px);
    }
  }
`;
