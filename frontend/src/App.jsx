import { useState, useEffect } from 'react';
import { Button } from './components/buttons/button';
import './App.css';

function App() {
    const [myColor, setColor] = useState('');
    const [error, setError] = useState(null); // State to manage errors
    const baseUrl = 'http://localhost:8080';

    useEffect(() => {
        async function getColor() {
            try {
                const response = await fetch(`${baseUrl}/get-color/`, {
                    method: 'GET',
                    credentials: 'include', // Ensures cookies are sent
                });
                

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error || 'An error occurred.');
                    return;
                }

                const data = await response.json();
                setColor(data.string || '');
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error retrieving color:', error);
                setError('Unable to retrieve color. Please try again.');
            }
        }

        getColor();
    }, []);

    return (
        <>
            <div
                style={{
                    backgroundColor: myColor,
                }}
                id="color-grp"
            >
                <Button color={myColor} setColor={setColor} baseUrl={baseUrl} error={error} />
            </div>
        </>
    );
}

export default App;
