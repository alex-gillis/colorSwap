import './button.css';

// eslint-disable-next-line react/prop-types
export function Button({ color, setColor, baseUrl }) {
    async function storeColor(newColor) {
        try {
            const response = await fetch(`${baseUrl}/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ string: newColor }),
                credentials: 'include', // Ensure cookies are sent with the request
            });
    
            if (!response.ok) {
                const result = await response.json();
                console.error('Error storing color:', result.error);
                alert(result.error); // Show error to the user
                return;
            } else {
                setColor(newColor);
            }
    
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Error storing color:', error);
        }
    }    

    function randomColor() {
        const newColor = `#${Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, '0')}`;
        storeColor(newColor); 
    }

    return (
        <div id="button-grp">
            <button id="button-btn" onClick={randomColor}>
                CLICK ME
            </button>
            <p id="button-txt">Hex Code: {color}</p>
        </div>
    );
}
