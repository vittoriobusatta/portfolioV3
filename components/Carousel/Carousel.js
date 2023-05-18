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

  const itemFalse = data.find((item) => item.readytoview === false);

  const verifyItemUnavailable = slideCurrent === itemFalse?.id;

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
            {[1, 2, 3, 4].map((index) => (
              <div className={`sliders__items__thumbs__${index}`} key={index}>
                <div className="hidden">
                  <Image
                    className={`sliders__items__image ${
                      !loaded ? "sliders__items__image--loaded" : ""
                    } ${
                      verifyItemUnavailable
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
            ${
              verifyItemUnavailable
                ? "sliders__items__thumbs__6--unavailable"
                : ""
            }
            `}
            >
              <Link href={`/projects/${item.path}`}>
                {!verifyItemUnavailable
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
        data={data}
        slideCurrent={slideCurrent}
        setSlideCurrent={setSlideCurrent}
        navigate={navigate}
      />
    </div>
  );
};

export default Slideshow;
