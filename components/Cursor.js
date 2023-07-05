import { gsap } from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GeneralContext } from "store/context";

function Cursor() {
  const cursorBig = useRef(null);
  const cursorSmall = useRef(null);

  const [data, setData] = useState([]);
  const { slideCurrent } = useContext(GeneralContext);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((resdata) => setData(resdata[slideCurrent]))
      .catch((err) => setErreur(err.message));
  }, []);

  useEffect(() => {
    const cursorBigRef = cursorBig.current;
    const cursorSmallRef = cursorSmall.current;

    if (!cursorBigRef || !cursorSmallRef) return;

    const links = document.querySelectorAll("a");
    const buttons = document.querySelectorAll("button");
    const select = document.querySelectorAll("select");
    const controlers = document.querySelectorAll(
      ".controls__container__thumbs"
    );
    const thumbnails = document.querySelectorAll(".slideshow__thubnails");
    const withHover = [
      ...links,
      ...buttons,
      ...controlers,
      ...thumbnails,
      ...select,
    ];

    function onMouseMove(e) {
      cursorSmallRef.style.opacity = 1;
      gsap.to(cursorBigRef, {
        duration: 0.4,
        x: e.clientX - 18,
        y: e.clientY - 18,
      });
      gsap.to(cursorSmallRef, {
        duration: 0.1,
        x: e.clientX - 4,
        y: e.clientY - 4,
      });
    }

    function onMouseHover() {
      gsap.to(cursorBigRef, {
        duration: 0.3,
        scale: 1.5,
      });
    }

    function onMouseHoverOut() {
      gsap.to(cursorBigRef, {
        duration: 0.3,
        scale: 1,
      });
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseHover);
    document.addEventListener("mouseup", onMouseHoverOut);
    document.addEventListener("mouseenter", () => {
      cursorBigRef.style.opacity = 1;
      cursorSmallRef.style.opacity = 1;
    });
    document.addEventListener("mouseleave", () => {
      cursorBigRef.style.opacity = 0;
      cursorSmallRef.style.opacity = 0;
    });

    withHover.forEach((element) => {
      element.addEventListener("mouseover", onMouseHover);
      element.addEventListener("mouseout", onMouseHoverOut);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseHover);
      document.removeEventListener("mouseup", onMouseHoverOut);
      document.removeEventListener("mouseenter", () => {
        cursorBigRef.style.opacity = 1;
        cursorSmallRef.style.opacity = 1;
      });
      document.removeEventListener("mouseleave", () => {
        cursorBigRef.style.opacity = 0;
        cursorSmallRef.style.opacity = 0;
      });

      withHover.forEach((element) => {
        element.removeEventListener("mouseover", onMouseHover);
        element.removeEventListener("mouseout", onMouseHoverOut);
      });
    };
  }, [cursorBig, cursorSmall]);

  return (
    <div
      className="custom-cursor"
      style={{
        "--color": data.color,
      }}
    >
      <div
        id="cursor-big"
        ref={cursorBig}
        className="custom-cursor__ball custom-cursor__ball--big"
      ></div>
      <div
        id="cursor-small"
        ref={cursorSmall}
        className="custom-cursor__ball custom-cursor__ball--small"
      ></div>
    </div>
  );
}

export default Cursor;
