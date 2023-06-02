
const food = new Image();
food.src = "";
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

//отрисовка змеи
var snakeX = blockSize * 5; //начало отрисовки на пересечении 5-го столбца и 5-ой строки
var snakeY = blockSize * 5;

var velocityX = 0;//скорость по оси X
var velocityY = 0;//скорость по оси Y

var snakeBody = [];

var foodX; // координаты еды
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("snake");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");  //позволяет рисовать на поле

    placeFood();
    document.addEventListener("keyup", changeDirection);//отслеживает нажатие на клавиши-стрелки
    setInterval(update, 1000/6);//повторяет вызов
}

function changeDirection(e)
{
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;//движение вертикально вверх
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;//движение вертикально вниз
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;//движение горизонтально влево
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;//движение горизонтально вправо
    }
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle = "YellowGreen";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = "FireBrick";
    context.fillRect(foodX, foodY, blockSize, blockSize); //рисует еду

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];//перемещает сегменты тела на место предыдущих сегментов
    }
    context.fillStyle = "OliveDrab";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); //рисует голову змеи
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //условия окончания игры:
    if (snakeX < 0 || snakeX > columns*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over");
    }

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over"); 
        }
    }


}

function placeFood(){  //функция, задающая рандомные координаты еде
    foodX = Math.floor(Math.random() * columns) * blockSize; //Math.random() генерирует число от 0 до 1, Math.floor округляет результат умножения. (0-19)
    foodY = Math.floor(Math.random() * rows) * blockSize;
}