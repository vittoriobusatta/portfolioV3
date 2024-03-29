import { motion } from "framer-motion";
import React from "react";

function ProjectHead({ project, button, language }) {
  const allowedKeys = ["type", "date", "role", "technologies"];
  const headList = Object.entries(project).filter(([key]) =>
    allowedKeys.includes(key)
  );

  return (
    <section className="projects__head" ref={button}>
      <div className="hidden">
        <motion.h1
          className="projects__head__title"
          initial={{
            y: "100%",
            skewY: 5,
          }}
          animate={{
            y: 0,
            skewY: 0,
            transition: {
              duration: 0.55,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.075,
            },
          }}
        >
          {project.name}
        </motion.h1>
      </div>
      <ul className="projects__head__list">
        {headList.map((item, index) => (
          <li key={index} className="projects__head__item">
            <div className="projects__head__item__inner">
              <div className="hidden">
                <motion.h4
                  initial={{
                    y: "100%",
                  }}
                  animate={{
                    y: 0,
                    transition: {
                      duration: 0.25,
                      ease: "easeOut",
                      delay: 0.1 * index,
                    },
                  }}
                >
                  {item[0]}
                </motion.h4>
              </div>
              <p>{item[1][language] ? item[1][language] : item[1]}</p>
            </div>
          </li>
        ))}
      </ul>
      {(project.link && (
        <a
          className="projects__head__link"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {language === "en" ? "Visit website" : "Voir le site"}
        </a>
      )) || (
        <a
          className="projects__head__link"
          // href={project.behance}
          target="_blank"
          rel="noopener noreferrer"
        >
          {language === "en" ? "Visit Behance" : "Voir le Behance"}
        </a>
      )}
    </section>
  );
}

export default ProjectHead;
