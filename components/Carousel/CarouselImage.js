import Image from "next/image";
import { useState } from "react";

const CarouselImage = ({ name, src, totalThumbnails, index, path }) => {
  const isSvg = src && src.includes(".svg");
  const srcImage = `/assets/${path}/${src}${isSvg ? "" : ".webp"}`;
  const [loaded, setLoaded] = useState(true);

  return (
    <div className={`sliders__items__thumbs sliders__items__thumbs__${index}`}>
      <div className="sliders__items__thumbs__content hidden relative">
        <Image
          className={`sliders__items__image ${
            !loaded ? "sliders__items__image--loaded" : ""
          }`}
          onLoadingComplete={() => setLoaded(false)}
          src={srcImage}
          alt={`${name} - ${index + 1} of ${totalThumbnails}`}
          width={1920}
          height={173}
        />
        <div className="placeholder" />
      </div>
    </div>
  );
};

export default CarouselImage;
