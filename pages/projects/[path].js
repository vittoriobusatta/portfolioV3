import Head from "next/head";
import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import { GeneralContext } from "store/context";
import Image from "next/image";
import { Star } from "assets/icons";
import ProjectHead from "@/components/Projects/ProjectHead";
import Typography from "@/components/Projects/Typography";
import AboutProject from "@/components/Projects/AboutProject";
import ProjectView from "@/components/Projects/ProjectView";
import data from "../../public/db.json";
import { motion } from "framer-motion";

export default function Product({ projects }) {
  const { language } = useContext(GeneralContext);

  const [logoColor, setColor2] = useState(projects.color2);
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

  // let [nextproject, setNextproject] = useState(data[0]);

  // useEffect(() => {
  //   const index = data.findIndex((project) => project.id === projects.id);
  //   if (index === data.length - 1) {
  //     setNextproject(data[0]);
  //   } else {
  //     setNextproject(data[index + 1]);
  //   }
  // }, [projects, data]);

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

      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="projects"
        style={{
          backgroundColor: projects.color2,
          "--color": projects.color,
          "--color2": projects.color2,
          "--placeholder": projects.placeholder,
          "--paragraph": projects.paragraph,
        }}
      >
        <ProjectHead projects={projects} button={button} language={language} />

        <div className="projects__content">
          {projects.aboutproject && (
            <AboutProject projects={projects} language={language} />
          )}
          {projects.viewproject && (
            <ProjectView projects={projects} language={language} />
          )}
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
            <Typography
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
      </motion.section>
      {/* <section
        className="projects__next"
        style={{
          "--color": projects.color,
          "--color2": projects.color2,
        }}
      >
        <Link href={`/projects/${nextproject.id}`}>
          <h1>{language === "en" ? "Next project" : "Projet suivant"}</h1>
        </Link>
      </section> */}
    </>
  );
}

export async function getStaticProps({ params }) {
  // const res = await axios.get("http://localhost:3000/api/database/db");
  // const data = await res.data;
  const { path } = params;
  let projects = data.find((item) => item.path === path);
  return { props: { projects } };
}

export async function getStaticPaths() {
  // const res = await axios.get("http://localhost:3000/api/database/db");
  // const data = await res.data;
  const paths = data.map((item) => ({
    params: { path: item.path.toString() },
  }));
  return { paths, fallback: false };
}
