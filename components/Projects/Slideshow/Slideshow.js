import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";

function Slideshow({ projects }) {
  const slideshowImages = Object.values(projects.viewproject.images);
  const [currentImage, setCurrentImage] = useState(
    slideshowImages?.[0] ?? null
  );
  const [selected, setSelected] = useState(0);
  const { path } = projects;

  const handleImageSelect = (image, index) => {
    setCurrentImage(image);
    setSelected(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (selected === slideshowImages.length - 1) {
        setCurrentImage(slideshowImages[0]);
        setSelected(0);
      } else {
        setCurrentImage(slideshowImages[selected + 1]);
        setSelected(selected + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selected]);

  return (
    <div className="slideshow__container">
      <div className="slideshow__banner">
        {slideshowImages.map((item, index) => {
          const { src } = item;
          const isSvg = src.includes(".svg");
          return (
            <Fragment key={index}>
              {currentImage ? (
                <Image
                  className="slideshow__banner__image"
                  src={`/assets/${path}/${src}${isSvg ? "" : ".webp"}`}
                  alt={`${projects.name} - ${index + 1} of ${
                    slideshowImages.length
                  }`}
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
          );
        })}
      </div>
      <ul className="slideshow__list" style={{ color: projects.color2 }}>
        <div
          className="slideshow__list__border"
          style={{
            "--borderTranslateY": `${selected * 100}%`,
            "--borderTranslateX": `${selected * 100}%`,
            "--thubnailsWidth": `${100 / slideshowImages.length}%`,
            "--thubnailsHeight": `${100 / slideshowImages.length}%`,
          }}
        />
        {slideshowImages.map((item, index) => {
          const { src } = item;
          const isSvg = src.includes(".svg");
          return (
            <li
              key={item.id}
              className={`slideshow__thubnails class${index}`}
              style={{
                backgroundImage: `url(
                /assets/${path}/${src}${isSvg ? "" : ".webp"}
                `,
              }}
              onClick={() => handleImageSelect(item, index)}
            ></li>
          );
        })}
      </ul>
    </div>
  );
}

export default Slideshow;
