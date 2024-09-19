let color = document.getElementById("color");
let mainFrame = document.getElementById("main-frame");
let button = document.getElementById("button");
// hex decimal values divide 16 
let hexVal = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

console.log(randHexVal());

button.addEventListener("click", changeBg);

function changeBg() {
    let hexColor = "#";
    for(let i=1;i<=6;i++) {
        hexColor = hexColor + randHexVal();
    }
    // console.log(hexColor);
    mainFrame.style.backgroundColor = hexColor;
    color.innerHTML = hexColor;
}

function randHexVal() {
    let randIndex = Math.floor(Math.random()*16);
    return hexVal[randIndex]
}

