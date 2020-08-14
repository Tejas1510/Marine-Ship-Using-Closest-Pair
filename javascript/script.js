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

    ctx.fillStyle = 'green';

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

function closestPair() {

    pauseAnimation();

    // Calculate closest pair
    var minDistance = Number.MAX_VALUE;
    var closestShips = [null, null];

    function calculateDistance(ship1,ship2){
        return Math.sqrt((ship1.xPosition - ship2.xPosition)**2 + (ship1.yPosition - ship2.yPosition)**2);
    }

    for (let i = 0; i < totalShips; i++) {
        for (let j = i+1; j < totalShips; j++) {
            
            if (!(ships[i].xPosition >= destinationX &&
                ships[i].yPosition <= destinationY &&
                ships[j].xPosition >= destinationX &&
                ships[j].yPosition <= destinationY)){

                var distance = calculateDistance(ships[i], ships[j]);
                if ( distance < minDistance) {
                    closestShips[0] = ships[i];
                    closestShips[1] = ships[j];
                    minDistance = distance;
                }
            }

        }
    }

    // Animate the Closest Ships
    ctx.fillStyle = 'red';

    ctx.beginPath();
    ctx.arc(closestShips[0].xPosition, closestShips[0].yPosition, 5, 0 * Math.PI, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(closestShips[1].xPosition, closestShips[1].yPosition, 5, 0 * Math.PI, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(closestShips[0].xPosition, closestShips[0].yPosition);
    ctx.lineTo(closestShips[1].xPosition, closestShips[1].yPosition);
    ctx.stroke();   

}