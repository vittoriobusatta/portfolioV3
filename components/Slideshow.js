import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

const Slideshow = ({ data }) => {
  const slideContainerRef = useRef(null);
  const slideWrapperRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState([]);
  const [slideTotal, setSlideTotal] = useState(data.length);

  const navigate = (index) => {
    if (index < 0) {
      index = data.length - 1;
    } else if (index >= data.length) {
      index = 0;
    }
    setCurrent(index);
  };

  useEffect(() => {
    setCurrentSlide(slideContainerRef.current);
  }, [current]);

  return (
    <div className="slideshow">
      <div className="slides" ref={slideWrapperRef}>
        {data.map((item, index) => (
          <div
            className={`slide ${current === index ? "slide--active" : ""}`}
            key={index}
            ref={slideContainerRef}
            style={{
              "--color": item.color,
              "--color2": item.color2,
            }}
          >
            <h1 className="slide__title">{item.name}</h1>
            <Link href={`/projects/${item.path}`}>Read the case</Link>
          </div>
        ))}
      </div>
      <div className="slideshow__controls">
        <button
          className="slideshow__controls__button"
          onClick={() => navigate(current - 1)}
        >
          Prev
        </button>
        <button
          className="slideshow__controls__button"
          onClick={() => navigate(current + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
