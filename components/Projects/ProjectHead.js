import React from "react";

function ProjectHead({ projects, button, language }) {
  const allowedKeys = ["type", "date", "role", "technologies"];
  const headList = Object.entries(projects).filter(([key]) =>
    allowedKeys.includes(key)
  );

  return (
    <div className="projects__head" ref={button}>
      <h1 className="head__title">{projects.name}</h1>
      <ul className="head__list">
        {headList.map((item, index) => (
          <li key={index} className="head__item">
            <div className="head__item__inner">
              <h4>{item[0]}</h4>
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
