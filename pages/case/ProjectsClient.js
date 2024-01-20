import { useRouter } from "next/router";
import { motion } from "framer-motion";
import ProjectHead from "@/components/Projects/ProjectHead";
import AboutProject from "@/components/Projects/AboutProject";
import ProjectView from "@/components/Projects/ProjectView";
import Transition from "utils/transitions";
import Head from "next/head";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "@/components/Header";
import { GeneralContext } from "store/context";
import Image from "next/image";

function ProjectsClient({ project, data }) {
  const { language } = useContext(GeneralContext);
  const [logoColor, setColor2] = useState(project.color2);

  const button = useRef(null);
  const router = useRouter();

  const projectsPath = data.map((item) => item.path);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === false) {
          setColor2(project.color);
        } else return setColor2(project.color2);
      });
    });

    observer.observe(button.current);
    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   const handleScrollToBottom = () => {
  //     const bottom =
  //       Math.ceil(window.innerHeight + window.scrollY) >=
  //       document.documentElement.scrollHeight - 20;
  //     if (bottom) {
  //       const index = projectsPath.indexOf(project.path);
  //       const nextProjectIndex =
  //         index < projectsPath.length - 1 ? index + 1 : 0;
  //       const nextProject = projectsPath[nextProjectIndex];
  //       setTimeout(() => {
  //         router.push(`/projects/${nextProject}`);
  //       }, 500);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScrollToBottom);
  //   return () => window.removeEventListener("scroll", handleScrollToBottom);
  // }, [projectsPath, project.path, router]);

  const { path } = project;

  return (
    <Fragment>
      <Head>
        <title>{project.name} | Vittorio Busatta</title>
        <meta name="description" content={project.introduction} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={project.color} />
      </Head>

      <Header
        logoColor={logoColor}
        color={project.color}
        color2={project.color2}
      />

      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="project"
        style={{
          backgroundColor: project.color2,
          "--color": project.color,
          "--color2": project.color2,
          "--placeholder": project.placeholder,
          "--paragraph": project.paragraph,
        }}
      >
        <ProjectHead project={project} button={button} language={language} />
        <div className="projects__content">
          {project.aboutproject && (
            <AboutProject project={project} language={language} />
          )}
          {project.viewproject && (
            <ProjectView project={project} language={language} />
          )}
        </div>
        {project.otherproject && (
          <div className="projects__other">
            <Image
              src={`/assets/${path}/${project.otherproject.images.src}.webp`}
              alt={project.otherproject.images.alt}
              width={1512}
              height={1612}
              priority
            />
          </div>
        )}
      </motion.section>
    </Fragment>
  );
}

export default Transition(ProjectsClient);
