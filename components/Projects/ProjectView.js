import { Star } from "assets/icons";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import Slideshow from "./Slideshow/Slideshow";

function ProjectView({ language, projects }) {
  const { title, subtitle, about } = projects.viewproject;
  const thubnails = Object.values(projects.viewproject.images);

  const projectView = useRef(null);
  const subtle = useRef([]);

  useEffect(() => {
    gsap.set(subtle.current.children, { y: "100%", opacity: 0 });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === true) {
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

    observer.observe(projectView.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="projects__view" ref={projectView}>
      <div
        className="projects__subtitle"
        ref={(el) => {
          subtle.current = el;
        }}
      >
        <Star />
        <h4>{subtitle[language]}</h4>
      </div>
      <h3 className="projects__title">{title[language]}</h3>
      <p className="projects__description">{about[language]}</p>
      <div className="projects__view__slideshow">
        <Slideshow thubnails={thubnails} projects={projects}/>
      </div>
    </div>
  );
}

export default ProjectView;
