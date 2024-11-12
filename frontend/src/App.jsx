import { useState, useEffect } from 'react';
import { Button } from './components/buttons/button';
import './App.css';

function App() {
  const [myColor, setColor] = useState('');
  const baseUrl  = 'http://localhost:8080';
 
  useEffect(() => { 
    async function getColor() {
    try {
        const response = await fetch(`${baseUrl}/get-color`);
        const data = await response.json();
        
        document.getElementById('result').innerText = setColor(data.string) || getColor;
    } catch (error) {
        console.error('Error retrieving color:', error);
        randomColor

    }
  }

    function randomColor() {
      let newColor = `#${Math.floor((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')}`;
      setColor(newColor);
    }

    getColor();
  }, []);

  return (
    <>
      <div 
        style={{ 
          backgroundColor: myColor 
        }}
        id='color-grp'
      >
        <Button color={myColor} setColor={setColor} baseUrl={baseUrl} />
      </div>
    </>
  );
}

export default App;
