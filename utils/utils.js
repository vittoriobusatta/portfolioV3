import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export const setTitles = ({ phrases, headingLevel, className }) => {
  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0",
      transition: {
        duration: 0.85,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const HeadingComponent = `h${headingLevel}`;

  return (
    <HeadingComponent className={className ? className : null} ref={ref}>
      {phrases?.map((phrase, index) => (
        <div key={index} className="hidden">
          <motion.p
            custom={index}
            variants={animation}
            initial="initial"
            animate={inView ? "enter" : ""}
          >
            {phrase}
          </motion.p>
        </div>
      ))}
    </HeadingComponent>
  );
};

export function MaskText({ phrases }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const animationMobile = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <span ref={ref} className="projects__description">
      {isMobile ? (
        <motion.p
          custom={0}
          variants={animationMobile}
          initial="initial"
          animate={inView ? "enter" : ""}
        >
          {phrases}
        </motion.p>
      ) : (
        phrases.map((phrase, index) => (
          <div key={index} className="hidden">
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              animate={inView ? "enter" : ""}
            >
              {phrase}
            </motion.p>
          </div>
        ))
      )}
    </span>
  );
}

export const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

export const getPiramidalIndex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );
