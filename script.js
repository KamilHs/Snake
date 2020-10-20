const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Intial Speed
let speed = 1;

let scale = 20;


const cols = Math.floor(canvas.width / scale);
const rows = Math.floor(canvas.height / scale);

//Coords of Snake
let sx = 0
let sy = 0

const snake = new Snake(sx, sy);

//Coords of food
let ax = 0;
let ay = 0;

newFood();


//Velocities
let vx = speed;
let vy = 0;

let score = 0;

let cooldown = false;

let cx = scale - speed;
let cy = 0;



let interval

function game() {

    interval = setInterval(draw, 1000 / 60);
}

function draw() {
    if (vy == 0) {
        cy = 0;
        cx = scale - speed;
        if (vx < 0) {
            cx *= -1;
        }
    }
    else {
        cx = 0;
        cy = scale - speed;
        if (vy < 0) {
            cy *= -1;
        }
    }

    cooldown = false;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(ax, ay, scale, scale);


    sx += vx + cx;
    sy += vy + cy;

    ctx.fillStyle = 'white';

    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake.array[i].x, snake.array[i].y, scale, scale);
    }

    teleport();

    if (snake.eat(ax, ay)) {
        snake.grow(sx, sy);
        newFood();
        score++;
        updateScore();
    }

    if (snake.checkCollision()) {
        clearInterval(interval);
    }
    snake.update(sx, sy);

}

function newFood() {
    ax = Math.floor((canvas.width - scale) * Math.random() / 20) * 20;
    ay = Math.floor((canvas.height - scale) * Math.random() / 20) * 20;

    if (snake.array.includes({ ax, ay })) {
        newFood();
    }
}

function teleport() {
    if (sx >= canvas.width) {
        sx = 0;
    }
    else if (sx + scale <= 0) {
        sx = (canvas.width - canvas.width % scale) - scale;
    }
    if (sy >= canvas.height) {
        sy = 0;
    }
    else if (sy + scale <= 0) {
        sy = (canvas.height - canvas.height % scale) - scale;
    }
}


document.addEventListener('keydown', function (e) {
    if (cooldown) {
        return false;
    }
    switch (e.keyCode) {
        case 37:
            if (!(vx > 0)) {
                vx = -speed;
                vy = 0;
            }
            break;
        case 38:
            if (!(vy > 0)) {
                vx = 0;
                vy = -speed;
            }
            break;
        case 39:
            if (!(vx < 0)) {
                vx = speed;
                vy = 0;
            }
            break;
        case 40:
            if (!(vy < 0)) {
                vx = 0;
                vy = speed;
            }
            break;
        default:
            break;
    }
    cooldown = true;
})


game();

function updateScore() {
    document.querySelector('#score').textContent = "Score: " + score;
}