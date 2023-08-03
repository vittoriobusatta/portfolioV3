import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import CarouselControls from "./CarouselControls";
import { GeneralContext } from "store/context";
import { gsap } from "gsap";
import CarouselImage from "./CarouselImage";

const bannedTitles = ["decortakaz"];

const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
const lerp = (start, target, amount) => start * (1 - amount) + target * amount;

const Slideshow = ({ data }) => {
  const planes = useRef([]);
  const [planes1, setPlanes1] = useState([]);
  const [planes2, setPlanes2] = useState([]);

  const { language } = useContext(GeneralContext);
  const { slideCurrent, setSlideCurrent } = useContext(GeneralContext);

  const slideIndex = slideCurrent?.index;
  const planesCurrent = planes.current[slideCurrent?.index];

  useEffect(() => {
    if (slideCurrent && planes.current[slideCurrent.index]) {
      setPlanes1([
        planes.current[slideCurrent.index].children[0].children[0],
        planes.current[slideCurrent.index].children[2].children[0],
      ]);

      setPlanes2([
        planes.current[slideCurrent.index].children[1].children[0],
        planes.current[slideCurrent.index].children[3].children[0],
      ]);
    }
  }, [planes.current, slideCurrent?.index,planesCurrent]);

  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const handleMouseMove = useCallback(
    (e) => {
      const { movementX, movementY } = e;
      xForce += movementX * speed;
      yForce += movementY * speed;

      if (requestAnimationFrameId == null) {
        requestAnimationFrameId = requestAnimationFrame(animate);
      }
    },
    [planes1, planes2]
  );

  const throttledMouseMove = throttle(handleMouseMove, 1000 / 60);

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
      <ul className="sliders">
        {data.map((item, index) => {
          const { thumbnail, name, path, color, color2 } = item;

          const nameWords = [
            ...new Set(
              name
                .split(" ")
                .map((word) =>
                  word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
                )
            ),
          ];
          const itemReadyToView =
            slideCurrent.id ===
            data.find((item) => item.readytoview === false)?.id;

          const isBannedTitle = bannedTitles.some((bannedTitle) =>
            path.toLowerCase().includes(bannedTitle)
          );

          const itemClassName = `sliders__items ${
            slideIndex === index ? "sliders__items--active" : ""
          }`;

          const totalThumbnails = thumbnail ? Object.keys(thumbnail).length : 0;

          const linkText =
            !itemReadyToView && language === "fr"
              ? "Lire le projet"
              : !itemReadyToView
              ? "Read the case"
              : language === "fr"
              ? "Bientôt disponible"
              : "Soon available";

          return (
            <li
              className={itemClassName}
              key={index}
              onMouseMove={(e) => {
                throttledMouseMove(e);
              }}
              ref={(el) => (planes.current[index] = el)}
              style={{
                "--color": color,
                "--color2": color2,
                "--placeholder": color,
              }}
            >
              {Array.from({ length: 4 }, (_, i) => i + 1).map((index) => {
                return (
                  <CarouselImage
                    key={index}
                    name={name}
                    src={thumbnail?.[`thumb${index}`]?.src || "placeholder"}
                    totalThumbnails={totalThumbnails}
                    index={index}
                    path={path}
                  />
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
                <div className="hidden">
                  <Link href={`/projects/${path}`}>{linkText}</Link>
                </div>
              </div>
              <div className="sliders__items__thumbs__7">
                <div className="hidden">
                  <h3>Type</h3>
                </div>
                <div className="hidden">
                  <p>{item.type[language] ? item.type[language] : item.type}</p>
                </div>
              </div>
              <div className="sliders__items__thumbs__8">
                <div className="hidden">
                  <h3>Date</h3>
                </div>
                <div className="hidden">
                  <p>{item.date[language]}</p>
                </div>
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
