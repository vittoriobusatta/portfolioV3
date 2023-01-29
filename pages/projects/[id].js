import Head from "next/head";
import React, { useContext, useEffect, useRef, useState } from "react";
import fs from "fs";
import Header from "@/components/Header";
import { LanguageContext } from "utils/translate";
import Image from "next/image";
import { Star } from "assets/icons";

export default function Product({ projects }) {
  // const paths = data.map((item) => ({
  //   params: { path: item.path.toString() },
  // }));

  // let path = paths.find((item) => item.params.path === projects.path);

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const [logoColor, setColor2] = useState(projects.color2);
  const { language } = useContext(LanguageContext);

  const button = useRef(null);

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

  const landingList = Object.entries(projects).filter(
    ([key]) =>
      key === "type" ||
      key === "date" ||
      key === "role" ||
      key === "technologies"
  );

  const thubnails = Object.values(projects.viewproject.images);

  const [currentImage, setCurrentImage] = useState(thubnails[0]);
  const [selected, setSelected] = useState(0);

  const handleImageSelect = (image, index) => {
    setCurrentImage(image);
    setSelected(index);
  };

  

  return (
    <>
      <Head>
        <title>{projects.name} | Vittorio Busatta</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        logoColor={logoColor}
        color={projects.color}
        color2={projects.color2}
      />

      <section
        className="projects"
        style={{ backgroundColor: projects.background }}
      >
        <div
          className="projects__landing"
          ref={button}
          style={{ backgroundColor: projects.color, color: projects.color2 }}
        >
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
        </div>
        <div className="projects__content" style={{ color: projects.color }}>
          <div className="projects__about">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Star />
              <h4 className="projects__about__subtitle">
                {projects.aboutproject.subtitle[language]}
              </h4>
            </div>
            <h3 className="projects__about__title">
              {projects.aboutproject.title[language]}
            </h3>
            <p className="projects__about__description">
              {projects.aboutproject.about[language]}
            </p>
            <div className="projects__about__images">
              <Image
                src={projects.aboutproject.images.img1.src}
                alt={projects.aboutproject.images.img1.alt}
                width={385}
                height={481}
                priority
              />
              <Image
                src={projects.aboutproject.images.img2.src}
                alt={projects.aboutproject.images.img2.alt}
                width={385}
                height={481}
                priority
              />
            </div>
          </div>
          <div className="projects__view" style={{ color: projects.color }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Star />
              <h4 className="projects__about__subtitle">
                {projects.viewproject.subtitle[language]}
              </h4>
            </div>
            <h3 className="projects__about__title">
              {projects.viewproject.title[language]}
            </h3>
            <p className="projects__about__description">
              {projects.viewproject.about[language]}
            </p>
            <div className="projects__view__slideshow">
              <div className="slideshow__container">
                <div className="slideshow__banner">
                  {currentImage ? (
                    <Image
                      src={currentImage.src}
                      alt={currentImage.alt}
                      width={958}
                      height={511}
                    />
                  ) : null}
                </div>
                <ul
                  className="slideshow__list"
                  style={{ color: projects.color2 }}
                >
                  <div
                    className="slideshow__list__border"
                    style={{
                      transform:
                        screenWidth > 576
                          ? `translateY(${selected * 100}%)`
                          : `translateX(${selected * 100}%)`,
                      borderColor: projects.color,
                      width: screenWidth > 576 ? "100%" : `${100 / thubnails.length}%`,
                      height: screenWidth > 576 ? `${100 / thubnails.length}%` : "100%" ,
                    }}
                  />
                  {thubnails.map((item, index) => (
                    <li
                      key={index}
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
        </div>
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
