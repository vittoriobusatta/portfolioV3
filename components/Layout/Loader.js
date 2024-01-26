import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

function Loader() {
  const year = new Date().getFullYear();

  const themeColor = "#fff";

  let container = useRef(null);
  let elements = useRef([]);

  let circle = useRef(null);
  let firstSpan = useRef(null);
  let secondSpan = useRef(null);
  let thirdSpan = useRef(null);
  let overlay = useRef(null);

  useEffect(() => {
    const onLoad = () => {
      gsap.fromTo(
        container.current,
        { opacity: 1, y: 0 + "%", skewY: 0 + "deg" },
        {
          duration: 1.8,
          ease: "expo.out",
          delay: 4.4,
          y: -110 + "%",
          skewY: 2.5 + "deg",
        }
      );
      gsap.fromTo(
        overlay.current,
        {
          clipPath: "circle(0%",
        },
        {
          delay: 3.4,
          duration: 1,
          ease: "Expo.easeInOut",
          clipPath: "circle(100%",
          opacity: 1,
        }
      );
      gsap.fromTo(
        circle.current,
        {
          y: 100 + "%",
        },
        {
          delay: 1,
          y: 0,
          ease: "expo.out",
          opacity: 1,
        }
      );

      gsap.fromTo(
        elements.current,
        {
          y: 20,
        },
        {
          opacity: 1,
          delay: (i) => 1 + i * 0.1,
          ease: "power2.out",
          y: 0,
        }
      );

      gsap.fromTo(
        firstSpan.current,
        {
          y: 200 + "%",
        },
        {
          delay: 2.4,
          y: 0,
          opacity: 1,
        }
      );
      gsap.fromTo(
        secondSpan.current,
        {
          y: 200 + "%",
        },
        {
          delay: 2.5,
          y: 0,
          opacity: 1,
        }
      );
      gsap.fromTo(
        thirdSpan.current,
        {
          y: 200 + "%",
        },
        {
          delay: 2.8,
          y: 0,
          opacity: 1,
        }
      );
    };
    onLoad();
  }, []);

  return (
    <div
      id="loader"
      ref={container}
      style={{
        "--theme-color": themeColor,
      }}
    >
      <div className="loader__overlay" ref={overlay} />
      <div className="loader__content">
        <div className="loader__circle">
          <div className="loader__circle__bounce" ref={circle} />
        </div>
        <svg
          width="379"
          height="566"
          viewBox="0 0 379 566"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M67.8672 129.016H60.4141V166H30.3203V29.9453H68.0078C76.6328 29.9453 83.3359 32.5469 88.1172 37.75C92.9453 42.9062 95.3594 50.0781 95.3594 59.2656V97.8672C95.3594 107.102 92.8984 114.602 87.9766 120.367C83.1016 126.133 76.3984 129.016 67.8672 129.016ZM60.9766 103.773C63.2734 103.773 64.4219 102.109 64.4219 98.7812V60.1797C64.4219 56.8047 63.2734 55.1172 60.9766 55.1172H60.4141V103.773H60.9766Z"
            ref={(el) => (elements.current[0] = el)}
            fill={themeColor}
          />
          <path
            d="M192.383 28.6094C203.633 28.6094 211.977 31.375 217.414 36.9062C222.852 42.4375 225.57 51.2969 225.57 63.4844V132.602C225.57 144.789 222.852 153.625 217.414 159.109C211.977 164.547 203.633 167.266 192.383 167.266C181.555 167.266 173.375 164.523 167.844 159.039C162.359 153.508 159.617 144.695 159.617 132.602V63.4844C159.617 51.3906 162.359 42.5547 167.844 36.9766C173.375 31.3984 181.555 28.6094 192.383 28.6094ZM194.562 140.969V55.1172C194.562 53.1953 193.883 52.2344 192.523 52.2344C191.211 52.2344 190.555 53.1953 190.555 55.1172V140.969C190.555 142.797 191.164 143.711 192.383 143.711C193.836 143.711 194.562 142.797 194.562 140.969Z"
            ref={(el) => (elements.current[1] = el)}
            fill={themeColor}
          />
          <path
            d="M358.977 166H327.617L325.016 120.086H322.414V166H292.32V29.9453H329.164C338.773 29.9453 345.852 32.2187 350.398 36.7656C354.945 41.3125 357.219 47.7578 357.219 56.1016V89.0781C357.219 96.1094 355.602 101.781 352.367 106.094L358.977 166ZM322.414 97.7266H323.117C325.32 97.7266 326.422 95.5234 326.422 91.1172V60.3203C326.422 56.8516 325.32 55.1172 323.117 55.1172H322.414V97.7266Z"
            ref={(el) => (elements.current[2] = el)}
            fill={themeColor}
          />
          <path
            d="M117.883 204.945V229.977H104.805V341H74.8516V230.117H61.4219V204.945H117.883Z"
            ref={(el) => (elements.current[3] = el)}
            fill={themeColor}
          />
          <path
            d="M215.102 229.977L195.414 230.117V259.648L213.836 259.508V283.273H195.414V341H165.32V204.945L215.102 204.805V229.977Z"
            ref={(el) => (elements.current[4] = el)}
            fill={themeColor}
          />
          <path
            d="M294.383 203.609C305.633 203.609 313.977 206.375 319.414 211.906C324.852 217.438 327.57 226.297 327.57 238.484V307.602C327.57 319.789 324.852 328.625 319.414 334.109C313.977 339.547 305.633 342.266 294.383 342.266C283.555 342.266 275.375 339.523 269.844 334.039C264.359 328.508 261.617 319.695 261.617 307.602V238.484C261.617 226.391 264.359 217.555 269.844 211.977C275.375 206.398 283.555 203.609 294.383 203.609ZM296.562 315.969V230.117C296.562 228.195 295.883 227.234 294.523 227.234C293.211 227.234 292.555 228.195 292.555 230.117V315.969C292.555 317.797 293.164 318.711 294.383 318.711C295.836 318.711 296.562 317.797 296.562 315.969Z"
            ref={(el) => (elements.current[5] = el)}
            fill={themeColor}
          />
          <path
            d="M32.4141 427.828H50.1328V453H2.32031V316.945H32.4141V427.828Z"
            ref={(el) => (elements.current[6] = el)}
            fill={themeColor}
          />
          <path
            d="M119.32 385.945H149.414V522H119.32V385.945Z"
            ref={(el) => (elements.current[7] = el)}
            fill={themeColor}
          />
          <path
            d="M248.383 384.609C259.633 384.609 267.977 387.375 273.414 392.906C278.852 398.438 281.57 407.297 281.57 419.484V488.602C281.57 500.789 278.852 509.625 273.414 515.109C267.977 520.547 259.633 523.266 248.383 523.266C237.555 523.266 229.375 520.523 223.844 515.039C218.359 509.508 215.617 500.695 215.617 488.602V419.484C215.617 407.391 218.359 398.555 223.844 392.977C229.375 387.398 237.555 384.609 248.383 384.609ZM250.562 496.969V411.117C250.562 409.195 249.883 408.234 248.523 408.234C247.211 408.234 246.555 409.195 246.555 411.117V496.969C246.555 498.797 247.164 499.711 248.383 499.711C249.836 499.711 250.562 498.797 250.562 496.969Z"
            ref={(el) => (elements.current[8] = el)}
            fill={themeColor}
          />
          <path
            d="M374.133 490.43V522H346.148V490.43H374.133Z"
            ref={(el) => (elements.current[9] = el)}
            fill={themeColor}
          />
        </svg>
        <div className="loader__details">
          <div className="loader__details__row">
            <span ref={firstSpan}>vittorio busatta</span>
          </div>
          <div className="loader__details__row">
            <span ref={secondSpan}>Creative Developer & Designer</span>
          </div>
          <div className="loader__details__row">
            <span ref={thirdSpan}>© {year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
