import Image from "next/image";
import React from "react";

function CarouselControls({ data, slideCurrent, navigate, handleImageSelect }) {
  return (
    <div className="carousel__controls">
      <button
        className="carousel__controls__button"
        onClick={() => navigate(slideCurrent - 1)}
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
            fill={data[slideCurrent]?.color}
          />
        </svg>
      </button>
      <div className="carousel__controls__container">
        {data.map((item, index) => (
          <div
            className={`carousel__controls__container__thumbs ${
              slideCurrent === index ? "carousel__controls__container__thumbs--active" : ""
            }`}
            key={index}
            style={{
              backgroundColor: data[slideCurrent]?.color,
            }}
            onClick={() => handleImageSelect(item, index)}
          >
            <Image src={item.logo?.src} alt="salut" height={15} width={15} />
          </div>
        ))}
      </div>

      <button
        className="slideshow__controls__button"
        onClick={() => navigate(slideCurrent + 1)}
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
            fill={data[slideCurrent]?.color}
          />
        </svg>
      </button>
    </div>
  );
}

export default CarouselControls;
