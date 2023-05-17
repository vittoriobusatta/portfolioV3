import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { GeneralContext } from "store/context";
import CarouselControls from "./CarouselControls";

const Slideshow = ({ data }) => {
  const slideContainerRef = useRef(null);
  const slideWrapperRef = useRef(null);
  const { language } = useContext(GeneralContext);
  const { slideCurrent, setSlideCurrent } = useContext(GeneralContext);
  const [loaded, setLoaded] = useState(true);

  const navigate = (index) => {
    if (index < 0) {
      index = data.length - 1;
    } else if (index >= data.length) {
      index = 0;
    }
    setSlideCurrent(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      navigate(slideCurrent + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideCurrent]);

  return (
    <div
      className="landing__carousel"
      style={{
        backgroundColor: data[slideCurrent]?.color2,
      }}
    >
      <ul className="sliders" ref={slideWrapperRef}>
        {data.map((item, index) => (
          <li
            className={`sliders__items ${
              slideCurrent === index ? "sliders__items--active" : ""
            }`}
            key={index}
            ref={slideContainerRef}
            style={{
              "--color": item.color,
              "--color2": item.color2,
            }}
          >
            <div
              className="sliders__items__content"
              style={{
                "--placeholder": item.color,
              }}
            >
              <Image
                className={`sliders__items__content__image ${
                  !loaded ? "sliders__items__content__image--loaded" : ""
                } `}
                onLoadingComplete={() => setLoaded(false)}
                src={item.thumbnail.src}
                alt={item.thumbnail.alt}
                width={1920}
                height={173}
                priority
              />
              <div className="placeholder" />
            </div>
            <div
              className="hidden"
              style={{
                marginBottom: "76px",
              }}
            >
              <h1 className="slide__title">{item.name}</h1>
            </div>
            <Link href={`/projects/${item.path}`}>
              {language === "fr" ? "Lire le projet" : "Read the case"}
            </Link>
          </li>
        ))}
      </ul>
      <CarouselControls
        data={data}
        slideCurrent={slideCurrent}
        setSlideCurrent={setSlideCurrent}
        navigate={navigate}
      />
    </div>
  );
};

export default Slideshow;
