import { useState, useEffect } from 'react';
import { Button } from './components/buttons/button';
import './App.css';

function App() {
  const [myColor, setColor] = useState('Teal');

  useEffect(() => {
    function randomColor() {
      let newColor = `#${Math.floor((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')}`;
      setColor(newColor);
    }

    randomColor(); // Set initial random color
  }, []);

  return (
    <>
      <div 
        style={{ 
          backgroundColor: myColor 
        }}
        id='color-grp'
      >
        {/* Pass setColor down as a prop to Button */}
        <Button color={myColor} setColor={setColor} />
      </div>
    </>
  );
}

export default App;
