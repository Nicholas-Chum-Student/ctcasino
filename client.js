const themes = {
    "green": 'rgb(35, 228, 99)',
    "purple": 'rgb(151, 41, 255)',
    "blue": 'rgb(0, 140, 255)',
    "yellow": 'rgb(255, 213, 0)',
    "white": 'rgb(225, 225, 225)',
    "red": 'rgb(252, 45, 45)',
    "orange": 'rgb(252, 121, 45)'
}

const startTheme = 'green'

function parseRGB(rgbString) {
    const matches = rgbString.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (!matches) return null;
    return {
        r: parseInt(matches[1], 10),
        g: parseInt(matches[2], 10),
        b: parseInt(matches[3], 10),
    };
}

function rgbToString({ r, g, b }) {
    return `rgb(${r}, ${g}, ${b})`;
}

function adjustBrightness(rgb, amount) {
    return {
        r: Math.min(255, Math.max(0, rgb.r + amount)),
        g: Math.min(255, Math.max(0, rgb.g + amount)),
        b: Math.min(255, Math.max(0, rgb.b + amount)),
    };
}

let theme = ""

function setTheme(itheme) {
    theme = itheme;
    document.documentElement.style.setProperty('--main-color', themes[theme]);
    Array.from(document.getElementsByTagName('canvas')).forEach((cvs) => {
        const cellCtx = cvs.getContext('2d');
        cellCtx.fillStyle = createBlobPattern();
        cellCtx.fillRect(0, 0, cvs.width, cvs.height);
    });
}

function createBlobPattern() {
    const blobCanvas = document.createElement('canvas');
    blobCanvas.width = 300;
    blobCanvas.height = 300;
    const blobCtx = blobCanvas.getContext('2d');
    blobCtx.fillStyle = themes[theme];
    blobCtx.fillRect(0, 0, 300, 300);

    function drawBlob(x, y, radius, color) {
        blobCtx.beginPath();
        blobCtx.arc(x, y, radius, 0, 2 * Math.PI);
        blobCtx.fillStyle = color;
        blobCtx.filter = 'blur(12px)';
        blobCtx.fill();
        blobCtx.filter = 'none';
    }
    const themeColor = parseRGB(themes[theme])
    const colors = [rgbToString(adjustBrightness(themeColor, 30)), rgbToString(adjustBrightness(themeColor, 15)), rgbToString(adjustBrightness(themeColor, -15)), rgbToString(adjustBrightness(themeColor, -30))];
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * blobCanvas.width;
        const y = Math.random() * blobCanvas.height;
        const radius = Math.random() * 40 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        drawBlob(x, y, radius, color);
    }

    return blobCtx.createPattern(blobCanvas, 'repeat');
}

let matchStarted = false;
let multi = 0
let balance = 0
let bet = 0
let clicked = 1
let onclickFunctions = [];
const bombs = 3;
const cells = [];

function cashOut() {
    balance += multi * bet;
    document.getElementById('betbtn').disabled = false
    document.getElementById('maxbetbtn').disabled = false;
    document.getElementById('cashout').disabled = true
    document.getElementById('cashmoney').innerHTML = '$' + Number(balance.toFixed(2)).toLocaleString()
}

function generateMatch(ibet) {
    if (matchStarted) return;
    matchStarted = true;
    bet = ibet
    multi = 1
    document.getElementById('betbtn').disabled = true;
    document.getElementById('maxbetbtn').disabled = true;
    document.getElementById('cashout').disabled = false
    document.getElementById
    document.querySelector('#grid > div').innerHTML = '';
    let currentBombs = bombs;
    let bombCoords = [];
    for (let x = 0; x < currentBombs; x++) {
        bombCoords.push(Math.max(0, Math.min(36, Math.round(Math.random() * 36))));
    }
    for (let i = 0; i < 36; i++) {
        let cell = document.createElement('div');
        cell.innerHTML = "$"
        if (currentBombs > 0 && bombCoords.includes(i)) {
            cell.innerHTML = "💣"
            currentBombs--;
        }
        let cvs = document.createElement('canvas');
        cvs.width = 100;
        cvs.height = 100;
        const cellCtx = cvs.getContext('2d');

        cellCtx.fillStyle = createBlobPattern();
        cellCtx.fillRect(0, 0, cvs.width, cvs.height);

        cell.appendChild(cvs);
        document.querySelector('#grid > div').appendChild(cell);

        cells.push([cell, cvs]);
    }
    cells.forEach((cell) => {
        const clickFunction = function () {
            clicked++;
            cell[0].className = 'hide';
            cell[1].className = 'hide';
            cell[0].onclick = null;
            multi = Math.round(Math.pow(clicked, 1.05) * 1000) / 1000
            document.getElementById('matchstat').innerHTML = Number(multi.toFixed(2)).toLocaleString() + 'x - $' + Number((multi * bet).toFixed(2)).toLocaleString()
            if (cell[0].innerHTML.includes("$")) return;
            document.getElementById('matchstat').innerHTML = "0x - $0"
            multi = 0
            clicked = 1
            cells.forEach((cell) => {
                cell[0].className = 'hide';
                cell[1].className = 'hide';
                cell[0].onclick = null;
            });
            onclickFunctions = [];
            matchStarted = false;
            cashOut();
        };

        onclickFunctions.push(clickFunction);
        cell[0].onclick = clickFunction;
    });
}

document.getElementById('cashout').onclick = function () {
    if (!matchStarted) return;
    cashOut();
    multi = 0
    clicked = 1
    cells.forEach((cell) => {
        cell[0].className = 'hide';
        cell[1].className = 'hide';
        cell[0].onclick = null;
    });
    onclickFunctions = [];
    matchStarted = false;
};

document.getElementById('betbtn').onclick = function () {
    let betam = Number(document.getElementById('betnum').value)
    if (!betam || matchStarted || betam < 0 || betam > balance) return;
    balance -= betam
    document.getElementById('cashmoney').innerHTML = '$' + Number(balance.toFixed(2)).toLocaleString()
    document.getElementById('matchstat').innerHTML = "1x - $" + Number(betam.toFixed(2)).toLocaleString()
    generateMatch(betam)
}

document.getElementById('maxbetbtn').onclick = function () {
    let betam = balance
    if (!betam || matchStarted || betam > balance) return;
    balance -= betam
    document.getElementById('cashmoney').innerHTML = '$' + Number(balance.toFixed(2)).toLocaleString()
    document.getElementById('matchstat').innerHTML = "1x - $" + Number(betam.toFixed(2)).toLocaleString()
    generateMatch(betam)
}

setTheme(startTheme)
generateMatch(100)


for (let child of document.getElementById('themes').children) {
    if (child.tagName === 'BUTTON') {
        child.onclick = function () {
            setTheme(child.id)
        }
    }
}

/*
let btn = document.createElement('button')
btn.innerHTML = "DELETE BOMBS"
document.getElementById('winnings').appendChild(btn)
btn.onclick = function() {
    document.querySelectorAll('#grid>div>div').forEach((cell) => {if (cell.innerHTML.includes('💣')) cell.style.display = 'none';})
}
*/
