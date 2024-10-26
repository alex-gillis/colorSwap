import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [myColor, setColor] = useState('Teal');

  useEffect(() => {
    
    function randomColor() {
      let newColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
      setColor(newColor)
    }

    randomColor();
  }, []);


  return (
    <>
      <div style={{ height: '100%', width: '100%', backgroundColor: myColor }}>
        
      </div>
    </>
  )
}

export default App
