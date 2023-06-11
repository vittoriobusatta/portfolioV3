import { Star } from "assets/icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function Typography({ typo, name, language, typographyproject }) {
  const typoArray = Object.entries(typo.details).map(([key, value]) => value);

  const projectTypography = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTypo = typoArray[currentIndex];

  let key = Object.keys(currentTypo.src[language]);
  let value = Object.values(currentTypo.src[language]);

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

  return (
    <>
      <div className="typography" ref={projectTypography}>
        <div className="typography__head">
          <div className="typography__head__subtitle">
            <Star />
            <h4>{typographyproject.subtitle[language]}</h4>
          </div>
          <div className="typography__head__bar" />
        </div>
        <div className="typography__body">
          <div className="typography__content">
            <Image
              className={`typography__content__vector typography__content__vector__${name}`}
              src={currentTypo.vector.src}
              alt={currentTypo.vector.alt}
              width={570}
              height={55}
              priority
            />
            {typoArray.length > 1 && (
              <div className="typography__circles">
                {typoArray.map((item, index) => (
                  <div
                    key={index}
                    className={
                      index === currentIndex
                        ? "typography__circles__button typography__circles__button--active"
                        : "typography__circles__button"
                    }
                    onClick={() => handleCircleClick(index)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="typography__details">
            <span className="typography__details__info">
              <p>{key[0]}</p>
              <p>{value[0]}</p>
            </span>
            <span className="typography__details__info">
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
