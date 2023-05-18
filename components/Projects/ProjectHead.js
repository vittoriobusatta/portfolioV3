import { motion } from "framer-motion";
import React from "react";

function ProjectHead({ projects, button, language }) {
  const allowedKeys = ["type", "date", "role", "technologies"];
  const headList = Object.entries(projects).filter(([key]) =>
    allowedKeys.includes(key)
  );

  return (
    <div className="projects__head" ref={button}>
      <div className="hidden">
        <motion.h1
          className="head__title"
          initial={{
            y: "100%",
            skewY: 10,
          }}
          animate={{
            y: 0,
            skewY: 0,
            transition: {
              duration: 0.35,
              ease: "easeOut",
            },
          }}
        >
          {projects.name}
        </motion.h1>
      </div>
      <ul className="head__list">
        {headList.map((item, index) => (
          <li key={index} className="head__item">
            <div className="head__item__inner">
              <div className="hidden">
                <motion.h4
                  initial={{
                    y: "100%",
                    // skewY: 10,
                  }}
                  animate={{
                    y: 0,
                    // skewY: 0,
                    transition: {
                      duration: 0.25,
                      ease: "easeOut",
                      delay: 0.1 * index
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
      {projects.link && (
        <a
          className="head__link"
          href={projects.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {language === "en" ? "Visit website" : "Voir le site"}
        </a>
      )}
    </div>
  );
}

export default ProjectHead;
