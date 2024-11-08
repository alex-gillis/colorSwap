/* eslint-disable react/prop-types */
// import { useEffect } from "react";
import './button.css';

export function Button({ color, setColor }) {
  function randomColor() {
    let newColor = `#${Math.floor((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')}`;
    setColor(newColor); // Update color in the parent component
  }

  // useEffect(() => {
  //   randomColor(); // Set initial color on mount
  // }, [randomColor]);

  return (
    <div id="button-grp">
      <button id="button-btn" onClick={randomColor}>CLICK ME</button>
      <p id="button-txt">Hex Code: {color}</p>
    </div>
  );
}
