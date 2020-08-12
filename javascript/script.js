// Javascript goes here

const totalShips = 10, canvasHeight = 500, canvasWidth = 500;
const destinationX = 460, destinationY = 20, space = 10;

// Ship class
class Ship {
    constructor(xPosition, yPosition) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.slope = (destinationY - yPosition) / (destinationX - xPosition);
        this.incrementX = 1 / Math.sqrt(1 + this.slope ** 2);
        this.incrementY = this.slope / Math.sqrt(1 + this.slope ** 2);
    }
}

// Array of ships
var ships = []


// Accessing canvas object
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var startAnimation;
var isAnimationOn = false;

window.onload = newAnimation();

// Animation function
function animate() {

    ctx.fillStyle = '#42a7f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';

    for (let i = 0; i < totalShips; i++) {
        ctx.beginPath();
        ctx.arc(ships[i].xPosition, ships[i].yPosition, 5, 0 * Math.PI, 2 * Math.PI);
        ctx.fill();
    }

    ctx.fillStyle = 'black';

    ctx.fillRect(destinationX, destinationY, 20, 20);

    for (let i = 0; i < totalShips; i++) {
        if (ships[i].xPosition < destinationX || ships[i].yPosition > destinationY) {
            ships[i].xPosition += ships[i].incrementX;
            ships[i].yPosition += ships[i].incrementY;
        }
    }
}

// Pause Animation
function pauseAnimation() {

    clearInterval(startAnimation);
    isAnimationOn = false;

}

// Play Animation
function playAnimation() {

    if (!isAnimationOn) {
        startAnimation = setInterval(animate, 30);
        isAnimationOn = true;
    }

}

// Start Animation
function newAnimation() {

    pauseAnimation();
    // Assigning random coordinates to ships
    for (let i = 0; i < totalShips; i++) {
        var x = Math.random() * (destinationX - space) + space;
        var y = Math.random() * (canvasHeight - destinationY - space) + destinationY;
        ships[i] = (new Ship(x, y));
    }

    animate();

}