function drawIt() {
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;

var ctx;
var canvas;

var paddlex;
var paddleh;
var paddlew;

var rightDown = false;
var leftDown = false;

var bricks;//BRICKS
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

const radius=10;
const WIDTH=450;
const HEIGHT=450;
var canvasMinX;
var canvasMaxX;

function init() {
canvas=document.getElementById('canvas');
ctx = canvas.getContext('2d');
return setInterval(draw, 10); //klic funkcije draw vsakih 10 ms; 
}
function init_paddle() {
  paddleh = 10;
  paddlew = 80;
  paddlex = (WIDTH / 2)-paddlew/2;
}


//TIPKOVNICA
document.onkeydown=function(evt) {

  if (evt.keyCode == 39){
	rightDown = true;
	console.log("right down", rightDown);
  }
  else if (evt.keyCode == 37){
	leftDown = true;
  }
}

document.onkeyup=function(evt) {
  if (evt.keyCode == 39)
rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
//MIŠKA
function init_mouse() {
	//canvasMinX = canvas.offset().left;
	canvasMinX = document.getElementById('canvas').offsetleft;
	canvasMaxX = canvasMinX + WIDTH;
}
document.onMouseMove=function(evt) {
	if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
	paddlex = evt.pageX - canvasMinX;
	}
}

function initbricks() { //inicializacija opek - polnjenje v tabelo
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}

function clear() {
ctx.clearRect(0,0,WIDTH,HEIGHT);
}

function circle() {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	x += dx;
	y += dy;
}

function rect(){
	ctx.rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
	ctx.fillStyle = "black";
	ctx.fill();
}

function draw() {
	clear();
	circle();
  
	if (rightDown&&paddlex<(WIDTH-paddlew)) paddlex += 5;
	else if (leftDown&&paddlex>0) paddlex -= 5;

	rect();

	//riši opeke
	for (i=0; i < NROWS; i++) {
	for (j=0; j < NCOLS; j++) {
		if (bricks[i][j] == 1) {
			ctx.rect((j * (BRICKWIDTH + PADDING)) + PADDING,(i * (BRICKHEIGHT + PADDING)) + PADDING,BRICKWIDTH, BRICKHEIGHT);
			ctx.fillStyle = "black";
			ctx.fill();
		}
	}
	}
	


	if (x + dx > WIDTH-radius || x + dx < 0+radius)
	dx = -dx;
	if (y + dy < 0+radius)
	dy = -dy;
	else if (y + dy > HEIGHT-radius) {
	if (x > paddlex && x < paddlex + paddlew)
	  dy = -dy;
	else
	  clearInterval();
	}
	x += dx;
	y += dy;
}
initbricks();
init_mouse();
init_paddle();
init();
}