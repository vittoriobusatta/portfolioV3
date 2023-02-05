import Head from "next/head";
import React, { useContext, useEffect, useRef, useState } from "react";
import fs from "fs";
import Header from "@/components/Header";
import { LanguageContext } from "utils/translate";
import Image from "next/image";
import { Star } from "assets/icons";
import gsap from "gsap";
import Link from "next/link";

export default function Product({ projects, data }) {
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

  let [nextproject, setNextproject] = useState(data[0]);

  useEffect(() => {
    const index = data.findIndex((project) => project.id === projects.id);
    if (index === data.length - 1) {
      setNextproject(data[0]);
    } else {
      setNextproject(data[index + 1]);
    }
  }, [projects, data]);

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
          "--placeholder": projects.placeholder,
          "--paragraph": projects.paragraph,
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
                      className="placeholder"
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
          {projects.brandingproject && (
            <div className="projects__branding">
              <div className="projects__typography__subtitle">
                <Star />
                <h4>{projects.brandingproject.subtitle[language]}</h4>
              </div>
              <div className="projects__bar"></div>
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
          )}
          {projects.typographyproject && (
            <Typo
              typo={projects.typographyproject}
              language={language}
              name={projects.path}
              typographyproject={projects.typographyproject}
            />
          )}
        </div>
        {projects.otherproject && (
          <div className="projects__other">
            <Image
              src={projects.otherproject.images.src}
              alt={projects.otherproject.images.alt}
              width={1512}
              height={1612}
              priority
            />
          </div>
        )}
      </section>
      <section
        className="projects__next"
        style={{
          "--color": projects.color,
          "--color2": projects.color2,
        }}
      >
        <Link href={`/projects/${nextproject.id}`}>
          <h1>{language === "en" ? "Next project" : "Projet suivant"}</h1>
        </Link>
      </section>
    </>
  );
}

function Typo({ typo, name, language, typographyproject }) {
  const typoArray = Object.entries(typo.details).map(([key, value]) => value);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTypo = typoArray[currentIndex];

  const handleCircleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) =>
        currentIndex === typoArray.length - 1 ? 0 : currentIndex + 1
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  let key = Object.keys(currentTypo.src[language]);
  let value = Object.values(currentTypo.src[language]);

  const projectTypography = useRef(null);

  return (
    <>
      <div className="projects__typography" ref={projectTypography}>
        <div className="projects__typography__subtitle">
          <Star />
          <h4>{typographyproject.subtitle[language]}</h4>
        </div>
        <div className="projects__bar"></div>
        <div className="projects__typography__content">
          <div className="projects__typography__inner">
            <div className="projects__typography__image">
              <Image
                className={`projects__typography__vector 
            projects__typography__vector__${name}`}
                src={currentTypo.vector.src}
                alt={currentTypo.vector.alt}
                width={570}
                height={55}
                priority
              />
            </div>
            {typoArray.length > 1 && (
              <div className="projects__typography__circles">
                {typoArray.map((item, index) => (
                  <div
                    key={item.id}
                    className={
                      index === currentIndex
                        ? "projects__typography__button projects__typography__button--active"
                        : "projects__typography__button"
                    }
                    onClick={() => handleCircleClick(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="projects__typography__details">
            <span className="projects__typography__info">
              <p>{key[0]}</p>
              <p>{value[0]}</p>
            </span>
            <span className="projects__typography__info">
              <p>{key[1]}</p>
              <p>{value[1]}</p>
            </span>
          </div>
        </div>
      </div>
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
