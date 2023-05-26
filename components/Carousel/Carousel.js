import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CarouselControls from "./CarouselControls";
import { GeneralContext } from "store/context";

const Slideshow = ({ data }) => {
  const slideContainerRef = useRef(null);
  const slideWrapperRef = useRef(null);
  const { language } = useContext(GeneralContext);
  const [loaded, setLoaded] = useState(true);
  const { slideCurrent, setSlideCurrent } = useContext(GeneralContext);

  const itemReadyToView =
    slideCurrent === data.find((item) => item.readytoview === false)?.id;

  const dataAvailable = data.filter((item) => item.available === true);

  return (
    <div
      className="landing__carousel"
      style={{
        backgroundColor: dataAvailable[slideCurrent]?.color2,
      }}
    >
      <ul className="sliders" ref={slideWrapperRef}>
        {dataAvailable.map((item, index) => (
          <li
            className={`sliders__items ${
              slideCurrent === index ? "sliders__items--active" : ""
            }`}
            key={index}
            ref={slideContainerRef}
            style={{
              "--color": item.color,
              "--color2": item.color2,
              "--placeholder": item.color,
            }}
          >
            {[1, 2, 3, 4].map((index) => (
              <div className={`sliders__items__thumbs__${index}`} key={index}>
                <div className="hidden relative">
                  <Image
                    className={`sliders__items__image ${
                      !loaded ? "sliders__items__image--loaded" : ""
                    } ${
                      itemReadyToView
                        ? "sliders__items__image--unavailable"
                        : ""
                    }`}
                    onLoadingComplete={() => setLoaded(false)}
                    src={item.thumbnail?.[`img${index}`].src}
                    alt={item.thumbnail?.[`img${index}`].alt}
                    width={1920}
                    height={173}
                    priority
                  />
                  <div className="placeholder"></div>
                </div>
              </div>
            ))}
            <div
              className="hidden sliders__items__thumbs__5"
              style={{
                marginBottom: "44px",
              }}
            >
              <h1 className="slide__title">{item.name}</h1>
            </div>
            <div
              className={`sliders__items__thumbs__6
            ${itemReadyToView ? "sliders__items__thumbs__6--unavailable" : ""}
            `}
            >
              <Link href={`/projects/${item.path}`}>
                {!itemReadyToView
                  ? language === "fr"
                    ? "Lire le projet"
                    : "Read the case"
                  : language === "fr"
                  ? "Bientôt disponible"
                  : "Soon available"}
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <CarouselControls
        data={dataAvailable}
        slideCurrent={slideCurrent}
        setSlideCurrent={setSlideCurrent}
      />
    </div>
  );
};

export default Slideshow;
