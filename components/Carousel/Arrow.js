function Arrow(direction, color) {
  let add;
  if (direction === "left") {
    add = "controls__button--left";
  } else {
    add = "controls__button--right";
  }
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={add}
    >
      <path
        d="M6.46515 13.2101C6.92455 13.6514 7.65035 13.6514 8.10975 13.2101C8.59568 12.7434 8.59611 11.9662 8.11068 11.4989L3.43725 7L8.11068 2.5011C8.59611 2.03381 8.59568 1.25663 8.10975 0.789865C7.65035 0.348589 6.92455 0.348588 6.46515 0.789865L0.473408 6.54527C0.21509 6.79339 0.21509 7.20661 0.473408 7.45473L6.46515 13.2101Z"
        fill={color}
      />
    </svg>
  );
}

export default Arrow;
