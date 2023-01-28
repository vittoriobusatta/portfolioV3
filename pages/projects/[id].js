import Head from "next/head";
import React, { useContext, useEffect, useRef, useState } from "react";
import fs from "fs";
import Header from "@/components/Header";
import { LanguageContext } from "utils/translate";

export default function Product({ projects }) {
  // const paths = data.map((item) => ({
  //   params: { path: item.path.toString() },
  // }));

  // let path = paths.find((item) => item.params.path === projects.path);

  const [color2, setColor2] = useState(projects.color2);

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

  const { language } = useContext(LanguageContext);

  console.log(projects.date[language]);

  return (
    <>
      <Head>
        <title>{projects.name} | Vittorio Busatta</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header color2={color2} />

      <section
        className="projects"
        style={{ backgroundColor: projects.background }}
      >
        <div
          style={{ backgroundColor: projects.color, color: projects.color2 }}
          className="projects__landing"
          ref={button}
        >
          <h1 className="projects__landing__title">{projects.name}</h1>
          <h1>{[projects.date[language]]}</h1>
        </div>
        <div className="projects__content"></div>
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
