const { setColor } = require('../../../colorStore');
const { getColor } = require('../../../colorStore');

let storedColor = '';

function getColor() {
    return storedColor;
}

function setColor(newColor) {
    storedColor = newColor;
}

module.exports = { getColor, setColor };
