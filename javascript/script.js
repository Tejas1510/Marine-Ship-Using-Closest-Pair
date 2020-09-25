// Javascript goes here

// Canvas
const totalShips = 10, canvasHeight = 500, canvasWidth = 500;
const space = 10;
const destination = [[460,20],[460,460]]

// Ship class
class Ship {
    constructor(xPosition, yPosition) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.speed = Math.random() *2+ 0.5;
        let ind = Math.random() < 0.5 ? 0 : 1;
        this.destinationX = destination[ind][0];
        this.destinationY = destination[ind][1];
        this.slope = (this.destinationY - yPosition) / (this.destinationX - xPosition);
        this.incrementX = this.speed / Math.sqrt(1 + this.slope ** 2);
        this.incrementY = (this.slope*this.speed) / Math.sqrt(1 + this.slope ** 2);
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

    ctx.fillRect(destination[0][0], destination[0][1], 20, 20);
    ctx.fillRect(destination[1][0], destination[1][1], 20, 20);

    for (let i = 0; i < totalShips; i++) {
        if (ships[i].incrementX>0) {
            if (ships[i].xPosition < ships[i].destinationX){
                ships[i].xPosition += ships[i].incrementX;
            }
        } else {
            if (ships[i].xPosition > ships[i].destinationX){
                ships[i].xPosition += ships[i].incrementX;
            }
        }

        if (ships[i].incrementY>0) {
            if (ships[i].yPosition < ships[i].destinationY){
                ships[i].yPosition += ships[i].incrementY;
            }
        } else {
            if (ships[i].yPosition > ships[i].destinationY){
                ships[i].yPosition += ships[i].incrementY;
            }
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
        var x = Math.random() * (destination[0][0] - space) + space;
        var y = Math.random() * (canvasHeight - destination[0][1] - space) + destination[0][1];
        ships[i] = (new Ship(x, y));
    }

    animate();

}

// Closest Pair function
function calculateClosestPair(ships) {

    pauseAnimation();

    // Calculate closest pair
    var minDistance = Number.MAX_VALUE;
    var closestShips = [null, null];
    var numberOfShips = ships.length;

    function calculateDistance(ship1,ship2){
        return Math.sqrt((ship1.xPosition - ship2.xPosition)**2 + (ship1.yPosition - ship2.yPosition)**2);
    }

    for (let i = 0; i < numberOfShips; i++) {
        for (let j = i+1; j < numberOfShips; j++) {
            
            if (!(ships[i].xPosition >= ships[i].destinationX &&
                ships[j].xPosition >= ships[i].destinationX )){

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

// Closest Pair (Calculate)
function closestPair(){
    calculateClosestPair(ships);
}

// Closest Pair (Select)
function selectedClosestPair(){
    animate();
    
    var x1,x2,y1,y2;

    x1=document.getElementById('x1').value;
    y1=document.getElementById('y1').value;
    x2=document.getElementById('x2').value;
    y2=document.getElementById('y2').value;

    // Animate square
    ctx.beginPath();
    ctx.rect(x1, y1, x2-x1, y2-y1);
    ctx.stroke();

    var selectedShips = [];

    for(let i=0; i<totalShips; i++){
        if (ships[i].xPosition>=x1 && ships[i].xPosition<=x2
            && ships[i].yPosition>=y1 && ships[i].yPosition<=y2){
            selectedShips.push(ships[i]);
        }
    }

    if (selectedShips.length>1){
        calculateClosestPair(selectedShips);
    }
}

function clearHighlights(){
    animate();
}
