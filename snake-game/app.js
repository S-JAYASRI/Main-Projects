const gameBoard = document.getElementById("game-board");
const context = gameBoard.getContext("2d");//drawing color filling
let scoreText = document.getElementById("score-val");

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

//random food
let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;
let started = false;

//initial co ordinates
let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];

window.addEventListener("keydown",keyPress) 

startGame();

//display snake food
function startGame() {
    context.fillStyle = "rgba(0, 0, 0, 0.906)";
    //fillRect(Xstart,Ystart,Width,Height);
    context.fillRect(0,0,WIDTH,HEIGHT);
    //snake food;
    createFood();
    displayFood();
    drawSnake();
    // moveSnake();
    // clearBoard()
    // drawSnake();
    // nextTick();
}

function clearBoard() {
    context.fillStyle = "rgba(0, 0, 0, 0.906)";
    context.fillRect(0,0,WIDTH,HEIGHT);
}

//food created
function createFood() {
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

//draw food;
function displayFood() {
    context.fillStyle = "red";
    context.fillRect(foodX,foodY,UNIT,UNIT);//fact of 25
    console.log("working")
};

//create snake;
function drawSnake() {
    context.fillStyle = "olivedrab";
    context.strokeStyle = "rgba(0, 0, 0, 0.906)";
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    });

}

//snake head part adding
function moveSnake() {
    const head = {x:snake[0].x+xVel,y:snake[0].y+yVel}
    snake.unshift(head); //to add head to the snake;
    if(snake[0].x == foodX && snake[0].y == foodY) {
        createFood();
        score += 1; //score added;
        scoreText.textContent = score;
    } else {
        snake.pop(); //will remove tail 
    }
}

//snake moving ;
function nextTick() {

    if(active) {
        setTimeout(()=> {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        
        },300);
    }       
    else {
        clearBoard();
        context.font = "bold 30px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over..!",WIDTH/2,HEIGHT/2);
    }
}

function keyPress(event) {
    if(!started) {
        started = true;
        nextTick();
        
    }
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    //snake control left and right moving
    switch(true) {
        //left key pressed not going right side;
        case(event.keyCode == LEFT && xVel !=UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        //right key pressed not going left side;
        case(event.keyCode == RIGHT && xVel !=-UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        //up key pressed not going down side;
        case(event.keyCode == UP && yVel != UNIT):
            xVel = 0;
            yVel = -UNIT;
            break;
        //down key pressed not going up side;
        case(event.keyCode == DOWN && yVel != -UNIT):
            xVel = 0;
            yVel = UNIT;
            break;
    }
}

function checkGameOver() {
    switch(true) {
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
            active = false;
            break;
        
    }
}