import Head from "next/head";
import React, { useContext, useEffect, useRef, useState } from "react";
import fs from "fs";
import Header from "@/components/Header";
import { LanguageContext } from "utils/translate";
import Image from "next/image";
import { Star } from "assets/icons";
import gsap from "gsap";

export default function Product({ projects }) {
  const { language } = useContext(LanguageContext);

  const thubnails = Object.values(projects.viewproject.images);
  const imageBanner = Object.values(projects.viewproject.images);
  const landingList = Object.entries(projects).filter(
    ([key]) =>
      key === "type" ||
      key === "date" ||
      key === "role" ||
      key === "technologies"
  );

  const [logoColor, setColor2] = useState(projects.color2);
  const [currentImage, setCurrentImage] = useState(thubnails[0]);
  const [selected, setSelected] = useState(0);

  const button = useRef(null);
  const aboutImagesContainer = useRef(null);
  const projectView = useRef(null);
  const projectAbout = useRef(null);
  const projectTypography = useRef(null);
  const projectMobile = useRef(null);
  const charsAbout = useRef([]);
  const charsView = useRef([]);
  const subtitle1 = useRef([]);
  const subtitle2 = useRef([]);

  const handleImageSelect = (image, index) => {
    setCurrentImage(image);
    setSelected(index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === false) {
          setColor2(projects.color);
        } else return setColor2(projects.color2);
      });
    });

    observer.observe(button.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.set(charsAbout.current, { y: 100, opacity: 0 });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === true) {
            gsap.to(aboutImagesContainer.current.children[0].children[0], {
              scale: 1,
            });
            gsap.to(aboutImagesContainer.current.children[1].children[0], {
              scale: 1,
              delay: 0.1,
            });
          }
        });
      },
      { threshold: 0.7 }
    );

    observer.observe(aboutImagesContainer.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.set(charsAbout.current, { y: 100, opacity: 0 });
    gsap.set(subtitle1.current.children, { y: "100%", opacity: 0 });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === true) {
            charsAbout.current.forEach((char, index) => {
              gsap.to(char, {
                y: 0,
                opacity: 1,
                delay: index * 0.03,
              });
            });
            gsap.to(subtitle1.current.children, {
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

  useEffect(() => {
    gsap.set(charsView.current, { y: 100, opacity: 0 });
    gsap.set(subtitle2.current.children, { y: "100%", opacity: 0 });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            charsView.current.forEach((char, index) => {
              gsap.to(char, {
                y: 0,
                opacity: 1,
                delay: index * 0.03,
              });
            });
            gsap.to(subtitle2.current.children, {
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

    observer.observe(projectView.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{projects.name} | Vittorio Busatta</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={projects.color} />
      </Head>

      <Header
        logoColor={logoColor}
        color={projects.color}
        color2={projects.color2}
      />

      <section
        className="projects"
        style={{
          backgroundColor: projects.background,
          "--color": projects.color,
          "--color2": projects.color2,
        }}
      >
        <div className="projects__landing" ref={button}>
          <h1 className="landing__title">{projects.name}</h1>
          <ul className="landing__list">
            {landingList.map((item, index) => (
              <li key={index} className="landing__item">
                <div className="landing__item__inner">
                  <h4>{item[0]}</h4>
                  <p>{item[1][language] ? item[1][language] : item[1]}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            className="landing__link"
            href={projects.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website
          </a>
        </div>
        <div className="projects__content">
          <div className="projects__about" ref={projectAbout}>
            <div className="projects__about__head">
              <div
                className="projects__subtitle"
                ref={(el) => {
                  subtitle1.current = el;
                }}
              >
                <Star />
                <h4>{projects.aboutproject.subtitle[language]}</h4>
              </div>
              <h3 className="projects__title">
                {Object.entries(projects.aboutproject.title[language]).map(
                  (item, index) => (
                    <span
                      className="projects__title__char"
                      key={index}
                      ref={(el) => {
                        charsAbout.current[index] = el;
                      }}
                    >
                      {item[1]}
                    </span>
                  )
                )}
              </h3>
              <p className="projects__description">
                {projects.aboutproject.about[language]}
              </p>
            </div>
            <div
              className="projects__about__images"
              ref={aboutImagesContainer}
              style={{
                "--placeholder": projects.placeholder,
              }}
            >
              {Object.values(projects.aboutproject.images).map(
                (item, index) => (
                  <div className="projects__about__images__inner" key={index}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={385}
                      height={481}
                      priority
                    />
                    <div
                      style={{
                        "--placeholder": projects.placeholder,
                      }}
                      className="projects__about__images__placeholder"
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="projects__view" ref={projectView}>
            <div
              className="projects__subtitle"
              ref={(el) => {
                subtitle2.current = el;
              }}
            >
              <Star />
              <h4>{projects.viewproject.subtitle[language]}</h4>
            </div>
            <h3 className="projects__title">
              {Object.entries(projects.viewproject.title[language]).map(
                (item, index) => (
                  <span
                    className="projects__title__char"
                    key={index}
                    ref={(el) => {
                      charsView.current[index] = el;
                    }}
                  >
                    {item[1]}
                  </span>
                )
              )}
            </h3>
            <p className="projects__description">
              {projects.viewproject.about[language]}
            </p>
            <div className="projects__view__slideshow">
              <div className="slideshow__container">
                <div className="slideshow__banner">
                  {imageBanner.map((item, index) => (
                    <>
                      {currentImage ? (
                        <Image
                          key={item.id}
                          className="slideshow__banner__image"
                          src={item.src}
                          alt={item.alt}
                          width={958}
                          height={511}
                          priority
                          style={
                            currentImage === item
                              ? {
                                  opacity: 1,
                                  clipPath:
                                    "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                  transform: `translateX(${selected * -100}%)`,
                                }
                              : {
                                  opacity: 0,
                                  clipPath:
                                    "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                                }
                          }
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <ul
                  className="slideshow__list"
                  style={{ color: projects.color2 }}
                >
                  <div
                    className="slideshow__list__border"
                    style={{
                      "--borderTranslateY": `${selected * 100}%`,
                      "--borderTranslateX": `${selected * 100}%`,
                      "--thubnailsWidth": `${100 / thubnails.length}%`,
                      "--thubnailsHeight": `${100 / thubnails.length}%`,
                    }}
                  />
                  {thubnails.map((item, index) => (
                    <li
                      key={item.id}
                      className="slideshow__thubnails"
                      style={{
                        backgroundImage: `url(${item.src})`,
                        backgroundClip: "content-box",
                      }}
                      onClick={() => handleImageSelect(item, index)}
                    ></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {projects.typographyproject && (
            <div className="projects__typography" ref={projectTypography}>
              <div className="projects__typography__inner">
                <Image
                  className="projects__typography__vector"
                  src={projects.typographyproject.vector.src}
                  alt={projects.typographyproject.vector.alt}
                  width={570}
                  height={55}
                  priority
                />
                <div className="projects__typography__source">
                  {Object.entries(
                    projects.typographyproject.source[language]
                  ).map((item, index) => (
                    <div className="projects__typography__details">
                      <span className="projects__typography__key" key={index}>
                        {item[0]}
                      </span>
                      <span className="projects__typography__value" key={index}>
                        {item[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* {projects.colorproject && (
            <div className="projects__color" ref={projectColor}>
              <div className="projects__color__inner">
                <Image
                  className="projects__color__vector"
                  src={projects.colorproject.vector.src}
                  alt={projects.colorproject.vector.alt}
                  width={1512}
                  height={1612}
                  priority
                />
              </div>
            </div>
          )} */}
        </div>
        {projects.otherproject && (
          <div className="projects__other">
            <Image
              className="projects__other__vector"
              src={projects.otherproject.image.src}
              alt={projects.otherproject.image.alt}
              width={1512}
              height={1612}
              priority
            />
          </div>
        )}
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const data = await JSON.parse(fs.readFileSync("./public/db.json", "utf-8"));
  const { id } = params;
  let projects = data.find((item) => item.id === parseInt(id));
  return { props: { data, projects } };
}

export async function getStaticPaths() {
  const data = await JSON.parse(fs.readFileSync("./public/db.json", "utf-8"));
  const paths = data.map((item) => ({
    params: { id: item.id.toString() },
  }));
  return { paths, fallback: false };
}
