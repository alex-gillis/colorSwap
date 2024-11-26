let storedColor = '';

function getColor() {
    return storedColor;
}

function setColor(newColor) {
    storedColor = newColor;
}

module.exports = { getColor, setColor };
