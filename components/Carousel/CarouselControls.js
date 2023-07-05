import Image from "next/image";
import Arrow from "./Arrow";
import { useEffect } from "react";

function CarouselControls({ data, slideCurrent, setSlideCurrent }) {
  const handleImageSelect = (index) => {
    setSlideCurrent(index);
    window.localStorage.setItem("slideCurrent", index);
  };

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
    <div className="controls">
      <button
        className="controls__button"
        onClick={() => navigate(slideCurrent - 1)}
      >
        {Arrow("left", data[slideCurrent]?.color)}
      </button>
      <div className="controls__container">
        {data.map((item, index) => {
          const { path } = item;
          return (
            <div
            className={`controls__container__thumbs ${
              slideCurrent === index
                ? "controls__container__thumbs--active"
                : ""
            }`}
            key={index}
            style={{
              backgroundColor: data[slideCurrent]?.color,
            }}
            onClick={() => handleImageSelect(index)}
          >
            <Image
              src={`/assets/${path}/logo.svg`}
              alt={`${item.name} - Logo`}
              height={15}
              width={15}
            />
          </div>
          )
        }
        )}
          
      </div>

      <button
        className="controls__button"
        onClick={() => navigate(slideCurrent + 1)}
      >
        {Arrow("right", data[slideCurrent]?.color)}
      </button>
    </div>
  );
}

export default CarouselControls;
