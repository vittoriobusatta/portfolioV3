import { useRouter } from "next/router";
import ProjectHead from "@/components/Projects/ProjectHead";
import AboutProject from "@/components/Projects/AboutProject";
import ProjectView from "@/components/Projects/ProjectView";
import Head from "next/head";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "@/components/Layout/Header";
import { GeneralContext } from "store/context";
import Image from "next/image";
import InnerPage from "@/components/Layout/Inner";

function ProjectsClient({ project, data }) {
  if (!project) {
    return null;
  }

  const { language } = useContext(GeneralContext);
  const [logoColor, setColor2] = useState(project?.color2);

  const button = useRef(null);
  const router = useRouter();

  // const projectsPath = data.map((item) => item.path);

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

  const {
    path,
    name,
    introduction,
    color,
    color2,
    placeholder,
    paragraph,
    aboutproject,
    viewproject,
    otherproject,
  } = project || {};

  return (
    <Fragment>
      <Head>
        <title>{name} | Vittorio Busatta</title>
        <meta name="description" content={introduction} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={color} />
      </Head>

      <InnerPage
        className="project"
        style={{
          "--color": color,
          "--color2": color2,
          "--placeholder": placeholder,
          "--paragraph": paragraph,
          backgroundColor: color2,
        }}
      >
        <Header logoColor={logoColor} color={color} color2={color2} />
        <ProjectHead project={project} button={button} language={language} />
        <div className="projects__content">
          {aboutproject && (
            <AboutProject project={project} language={language} />
          )}
          {viewproject && <ProjectView project={project} language={language} />}
        </div>
        {otherproject && (
          <div className="projects__other">
            <Image
              src={`/assets/${path}/${otherproject?.images?.src}.webp`}
              alt={otherproject?.images?.alt}
              width={1512}
              height={1612}
              priority
            />
          </div>
        )}
      </InnerPage>
    </Fragment>
  );
}

export default ProjectsClient;
