import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";

function Slideshow({
    thubnails,
    projects
}) {
  const [currentImage, setCurrentImage] = useState(thubnails?.[0] ?? null);
  const [selected, setSelected] = useState(0);

  const handleImageSelect = (image, index) => {
    setCurrentImage(image);
    setSelected(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (selected === thubnails.length - 1) {
        setCurrentImage(thubnails[0]);
        setSelected(0);
      } else {
        setCurrentImage(thubnails[selected + 1]);
        setSelected(selected + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selected]);
  
  return (
    <div className="slideshow__container">
      <div className="slideshow__banner">
        {thubnails.map((item, index) => (
          <Fragment key={item.id}>
            {currentImage ? (
              <Image
                className="slideshow__banner__image"
                src={item.src}
                alt={item.alt}
                width={958}
                height={511}
                priority
                style={
                  currentImage === item
                    ? {
                        opacity: 1,
                        clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
                        transform: `translateX(${selected * -100}%)`,
                      }
                    : {
                        opacity: 0,
                        clipPath:
                          "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
                      }
                }
              />
            ) : null}
          </Fragment>
        ))}
      </div>
      <ul className="slideshow__list" style={{ color: projects.color2 }}>
        <div
          className="slideshow__list__border"
          style={{
            "--borderTranslateY": `${selected * 100}%`,
            "--borderTranslateX": `${selected * 100}%`,
            "--thubnailsWidth": `${100 / thubnails.length}%`,
            "--thubnailsHeight": `${100 / thubnails.length}%`,
          }}
        />
        {thubnails.map((item, index) => (
          <li
            key={item.id}
            className={`slideshow__thubnails class${index}`}
            style={{
              backgroundImage: `url(${item.src})`,
              backgroundClip: "content-box",
            }}
            onClick={() => handleImageSelect(item, index)}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default Slideshow;
