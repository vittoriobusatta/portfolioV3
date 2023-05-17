import Image from "next/image";
import Arrow from "./Arrow";

function CarouselControls({ data, slideCurrent, navigate, setSlideCurrent }) {
  const handleImageSelect = (index) => {
    setSlideCurrent(index);
    window.localStorage.setItem("slideCurrent", index);
  };
  return (
    <div className="controls">
      <button
        className="controls__button"
        onClick={() => navigate(slideCurrent - 1)}
      >
        {Arrow("left", data[slideCurrent]?.color)}
      </button>
      <div className="controls__container">
        {data.map((item, index) => (
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
            <Image src={item.logo?.src} alt="salut" height={15} width={15} />
          </div>
        ))}
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
