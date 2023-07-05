import { Star } from "assets/icons";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import Slideshow from "./Slideshow/Slideshow";
import { MaskText, setTitles } from "utils/utils";

function ProjectView({ language, projects }) {
  const { title, subtitle, about } = projects.viewproject;

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
      <div className="projects__view__head">
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
      </div>
      <div className="projects__view__slideshow">
        <Slideshow projects={projects} />
      </div>
    </div>
  );
}

export default ProjectView;
