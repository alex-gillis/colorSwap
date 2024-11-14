/* eslint-disable react/prop-types */
// import { useEffect } from "react";
import './button.css';

export function Button({ color, setColor, baseUrl }) {
  
  async function storeColor(newColor) {

    try {
        const response = await fetch(`${baseUrl}/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ string: newColor })
        });
        
        const result = await response.text();
        document.getElementById('result').innerText = result;
    } catch (error) {
        console.error('Error storing color:', error);
    }
  }

  function randomColor() {
    let newColor = `#${Math.floor((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')}`;
    setColor(newColor);
    storeColor(newColor);
  }


  return (
    <div id="button-grp">
      <button id="button-btn" onClick={randomColor}>CLICK ME</button>
      <p id="button-txt">Hex Code: {color}</p>
    </div>
  );
}
