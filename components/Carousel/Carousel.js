import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CarouselControls from "./CarouselControls";
import { GeneralContext } from "store/context";
import { gsap } from "gsap";

const bannedTitles = ["decortakaz"];

const Slideshow = ({ data }) => {
  const slideWrapperRef = useRef(null);
  const planes = useRef([]);
  const [planes1, setPlanes1] = useState([]);
  const [planes2, setPlanes2] = useState([]);
  const { language } = useContext(GeneralContext);
  const [loaded, setLoaded] = useState(true);
  const { slideCurrent, setSlideCurrent } = useContext(GeneralContext);

  const slideIndex = slideCurrent?.index;

  const itemReadyToView =
    slideCurrent.id === data.find((item) => item.readytoview === false)?.id;

  useEffect(() => {
    if (planes.current[slideIndex]) {
      setPlanes1([
        planes.current[slideIndex].children[0].children[0],
        planes.current[slideIndex].children[2].children[0],
      ]);

      setPlanes2([
        planes.current[slideIndex].children[1].children[0],
        planes.current[slideIndex].children[3].children[0],
      ]);
    }
  }, [planes.current, slideIndex]);

  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(planes1, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(planes2, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  return (
    <div
      className="landing__carousel"
      style={{
        backgroundColor: data[slideIndex]?.color2,
      }}
    >
      <ul className="sliders" ref={slideWrapperRef}>
        {data.map((item, index) => {
          const { thumbnail, name, path, color, color2 } = item;
          const nameWords = [
            ...new Set(
              item?.name
                .split(" ")
                .map((word) =>
                  word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
                )
            ),
          ];

          const isBannedTitle = bannedTitles.some((bannedTitle) =>
            path.toLowerCase().includes(bannedTitle)
          );

          const itemClassName = `sliders__items ${
            slideIndex === index ? "sliders__items--active" : ""
          }`;

          return (
            <li
              className={itemClassName}
              key={index}
              // onMouseMove={(e) => {
              //   manageMouseMove(e);
              // }}
              ref={(el) => (planes.current[index] = el)}
              style={{
                "--color": color,
                "--color2": color2,
                "--placeholder": color,
              }}
            >
              {Array.from({ length: 4 }, (_, i) => i + 1).map((index) => {
                const thumbnailImage = thumbnail?.[`thumb${index}`];
                const { src } = thumbnailImage || {
                  src: "placeholder",
                };
                const { path, name } = item;
                const isSvg = src && src.includes(".svg");
                const srcImage = `/assets/${path}/${src}${
                  isSvg ? "" : ".webp"
                }`;

                return (
                  <div
                    className={`sliders__items__thumbs sliders__items__thumbs__${index}`}
                    key={index}
                  >
                    <div className="sliders__items__thumbs__content hidden relative">
                      <Image
                        className={`sliders__items__image ${
                          !loaded ? "sliders__items__image--loaded" : ""
                        }`}
                        onLoadingComplete={() => setLoaded(false)}
                        src={srcImage}
                        alt={`${name} - ${index + 1} of ${
                          thumbnail ? Object.keys(thumbnail).length : 0
                        }`}
                        width={1920}
                        height={173}
                        priority
                      />
                      <div className="placeholder" />
                    </div>
                  </div>
                );
              })}
              <div className="hidden sliders__items__thumbs__5">
                <h1 className="slide__title">
                  {isBannedTitle ? (
                    <div>{name}</div>
                  ) : (
                    <>
                      {nameWords.map((word, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              "--index": index,
                            }}
                          >
                            {word}
                            {index < nameWords.length - 1 && " "}{" "}
                          </div>
                        );
                      })}
                    </>
                  )}
                </h1>
              </div>
              <div
                className={`sliders__items__thumbs__6
            ${itemReadyToView ? "sliders__items__thumbs__6--unavailable" : ""}
            `}
              >
                <Link href={`/projects/${path}`}>
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
          );
        })}
      </ul>
      <CarouselControls
        data={data}
        slideCurrent={slideIndex}
        setSlideCurrent={setSlideCurrent}
      />
    </div>
  );
};

export default Slideshow;
