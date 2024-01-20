import React, { Fragment } from "react";
import { motion } from "framer-motion";

function InnerPage({ children, style }) {
  const anim = (variants) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  };

  const slide = {
    initial: {
      top: "100vh",
    },
    enter: {
      top: "100vh",
    },
    exit: {
      top: "0",
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const perspective = {
    initial: {
      y: 0,
      scale: 1,
    },
    enter: {
      y: 0,
      scale: 1,
    },
    exit: {
      y: -100,
      scale: 0.9,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <section style={style}>
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "var(--color)",
          zIndex: 10,
          height: "100vh",
          width: "100vw",
        }}
        {...anim(slide)}
      />
      <motion.div {...anim(perspective)}>
        <motion.div>{children}</motion.div>
      </motion.div>
    </section>
  );
}

export default InnerPage;
