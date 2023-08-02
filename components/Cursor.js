import React, { useContext, useEffect, useRef, useState } from "react";
import { GeneralContext } from "store/context";
import { gsap } from "gsap";

function Cursor() {
  const [data, setData] = useState([]);
  const { slideCurrent } = useContext(GeneralContext);
  const bigBallRef = useRef(null);
  const smallBallRef = useRef(null);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((resdata) => setData(resdata[slideCurrent].color))
      .catch((err) => setErreur(err.message));
  }, [slideCurrent]);

  function onMouseMove(e) {
    const bigBall = bigBallRef.current;
    const smallBall = smallBallRef.current;

    if (bigBall && smallBall) {
      gsap.to(bigBall, {
        duration: 0.4,
        x: e.clientX - 15,
        y: e.clientY - 15,
      });
      gsap.to(smallBall, {
        duration: 0.1,
        x: e.clientX - 3,
        y: e.clientY - 3,
      });
    }
  }

  function onMouseHover() {
    const bigBall = bigBallRef.current;

    if (bigBall) {
      gsap.to(bigBall, {
        duration: 0.3,
        scale: 1.7,
      });
    }
  }

  function onMouseHoverOut() {
    const bigBall = bigBallRef.current;

    if (bigBall) {
      gsap.to(bigBall, {
        duration: 0.3,
        scale: 1,
      });
    }
  }

  useEffect(() => {
    const bigBall = bigBallRef.current;
    const smallBall = smallBallRef.current;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseHover);
    document.addEventListener("mouseup", onMouseHoverOut);
    document.addEventListener("mouseenter", () => {
      bigBall.style.opacity = 1;
      smallBall.style.opacity = 1;
    });
    document.addEventListener("mouseleave", () => {
      bigBall.style.opacity = 0;
      smallBall.style.opacity = 0;
    });
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.addEventListener("mousedown", onMouseHover);
      document.addEventListener("mouseup", onMouseHoverOut);
      document.removeEventListener("mouseenter", () => {
        bigBall.style.opacity = 1;
        smallBall.style.opacity = 1;
      });
      document.removeEventListener("mouseleave", () => {
        bigBall.style.opacity = 0;
        smallBall.style.opacity = 0;
      });
    };
  }, []);

  return (
    <div className="cursor" style={{ "--color": data }}>
      <div className="cursor__ball cursor__ball--big" ref={bigBallRef}></div>
      <div
        className="cursor__ball cursor__ball--small"
        ref={smallBallRef}
      ></div>
    </div>
  );
}

export default Cursor;
