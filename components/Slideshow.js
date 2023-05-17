import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { LanguageContext } from "utils/translate";

const Slideshow = ({ data }) => {
  const slideContainerRef = useRef(null);
  const slideWrapperRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState([]);
  const [slideTotal, setSlideTotal] = useState(data.length);
  const { language } = useContext(LanguageContext);
  const [loaded, setLoaded] = useState(true);

  const navigate = (index) => {
    if (index < 0) {
      index = data.length - 1;
    } else if (index >= data.length) {
      index = 0;
    }
    setCurrent(index);
  };

  useEffect(() => {
    setCurrentSlide(slideContainerRef.current);
  }, [current]);

  const handleImageSelect = (thumbs, index) => {
    setCurrent(index);
  };

  console.log(loaded);

  return (
    <div
      className="sliders"
      style={{
        backgroundColor: data[current]?.color2,
      }}
    >
      <div className="slides" ref={slideWrapperRef}>
        {data.map((item, index) => (
          <div
            className={`slide ${current === index ? "slide--active" : ""}`}
            key={index}
            ref={slideContainerRef}
            style={{
              "--color": item.color,
              "--color2": item.color2,
            }}
          >
            <div className="slide__content">
              <Image
                className={`slideshow__banner__image ${
                  !loaded ? "slideshow__banner__image--loaded" : ""
                } `}
                onLoadingComplete={() => setLoaded(false)}
                src={item.thumbnail.src}
                alt={item.thumbnail.alt}
                width={1920}
                height={173}
                priority
              />
            </div>
            <h1 className="slide__title">{item.name}</h1>
            <Link href={`/projects/${item.path}`}>
              {language === "fr" ? "Lire le projet" : "Read the case"}
            </Link>
          </div>
        ))}
      </div>
      <div className="slideshow__controls">
        <button
          className="slideshow__controls__button"
          onClick={() => navigate(current - 1)}
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.46515 13.2101C6.92455 13.6514 7.65035 13.6514 8.10975 13.2101C8.59568 12.7434 8.59611 11.9662 8.11068 11.4989L3.43725 7L8.11068 2.5011C8.59611 2.03381 8.59568 1.25663 8.10975 0.789865C7.65035 0.348589 6.92455 0.348588 6.46515 0.789865L0.473408 6.54527C0.21509 6.79339 0.21509 7.20661 0.473408 7.45473L6.46515 13.2101Z"
              fill={data[current]?.color}
            />
          </svg>
        </button>
        <div className="slideshow__controls__container">
          {data.map((item, index) => (
            <div
              className={`slides__thumbs ${
                current === index ? "slides__thumbs--active" : ""
              }`}
              key={index}
              style={{
                backgroundColor: data[current]?.color,
              }}
              onClick={() => handleImageSelect(item, index)}
            >
              <Image src={item.logo?.src} alt="salut" height={15} width={15} />
            </div>
          ))}
        </div>

        <button
          className="slideshow__controls__button"
          onClick={() => navigate(current + 1)}
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.53485 0.789865C2.07545 0.348588 1.34965 0.348588 0.89025 0.789865C0.404317 1.25663 0.403894 2.03381 0.889317 2.5011L5.56275 7L0.889317 11.4989C0.403893 11.9662 0.404317 12.7434 0.89025 13.2101C1.34965 13.6514 2.07545 13.6514 2.53485 13.2101L8.52659 7.45473C8.78491 7.20661 8.78491 6.79339 8.52659 6.54527L2.53485 0.789865Z"
              fill={data[current]?.color}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
