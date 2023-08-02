import Image from "next/image";
import Arrow from "./Arrow";

function CarouselControls({ data, slideCurrent, setSlideCurrent }) {
  const handleImageSelect = (id, index) => {
    setSlideCurrent({
      id,
      index,
    });
    window.localStorage.setItem("slideCurrent", index);
  };

  const navigate = (id, index) => {
    if (index < 0) {
      index = data.length - 1;
    } else if (index >= data.length) {
      index = 0;
    }
    setSlideCurrent({
      id,
      index,
    });
  };

  return (
    <div className="controls">
      <button
        className="controls__button"
        onClick={() => navigate(data[slideCurrent]?.id, slideCurrent - 1)}
      >
        {Arrow("left", data[slideCurrent]?.color)}
      </button>
      <div className="controls__container">
        {data.map((item, index) => {
          const { path, id } = item;
          return (
            <button
              className={`controls__container__thumbs ${
                slideCurrent === index
                  ? "controls__container__thumbs--active"
                  : ""
              }`}
              key={index}
              style={{
                backgroundColor: data[slideCurrent]?.color,
              }}
              onClick={() => handleImageSelect(id, index)}
            >
              <Image
                src={`/assets/${path}/logo.svg`}
                alt={`${item.name} - Logo`}
                height={15}
                width={15}
              />
            </button>
          );
        })}
      </div>

      <button
        className="controls__button"
        onClick={() => navigate(data[slideCurrent]?.id, slideCurrent + 1)}
      >
        {Arrow("right", data[slideCurrent]?.color)}
      </button>
    </div>
  );
}

export default CarouselControls;
