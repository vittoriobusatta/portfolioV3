import { Star } from "assets/icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function Typography({ typo, name, language, typographyproject }) {
  const typoArray = Object.entries(typo.details).map(([key, value]) => value);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTypo = typoArray[currentIndex];

  const handleCircleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) =>
        currentIndex === typoArray.length - 1 ? 0 : currentIndex + 1
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  let key = Object.keys(currentTypo.src[language]);
  let value = Object.values(currentTypo.src[language]);

  const projectTypography = useRef(null);

  // typoArray.map((item, index) => (
  //   console.log(item)
  // ))

  return (
    <>
      <div className="projects__typography" ref={projectTypography}>
        <div className="projects__typography__subtitle">
          <Star />
          <h4>{typographyproject.subtitle[language]}</h4>
        </div>
        <div className="projects__bar"></div>
        <div className="projects__typography__content">
          <div className="projects__typography__inner">
            <div className="projects__typography__image">
              <Image
                className={`projects__typography__vector 
            projects__typography__vector__${name}`}
                src={currentTypo.vector.src}
                alt={currentTypo.vector.alt}
                width={570}
                height={55}
                priority
              />
            </div>
            {typoArray.length > 1 && (
              <div className="projects__typography__circles">
                {typoArray.map((item, index) => (
                  <div
                    key={index}
                    className={
                      index === currentIndex
                        ? "projects__typography__button projects__typography__button--active"
                        : "projects__typography__button"
                    }
                    onClick={() => handleCircleClick(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="projects__typography__details">
            <span className="projects__typography__info">
              <p>{key[0]}</p>
              <p>{value[0]}</p>
            </span>
            <span className="projects__typography__info">
              <p>{key[1]}</p>
              <p>{value[1]}</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Typography;
