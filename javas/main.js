function drawIt() {
	var x = 200;
	var y = 200;
	var dx = 1;
	var dy = 2;

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

	var tocke; 
	
	var sekunde;
	var sekundeI;
	var minuteI;
	var intTimer;
	var izpisTimer;
	var start=false;
	var running=false;
	var interval;
	var vsotaBrick;
	
	function randomLevel(){
		console.log("randomLevel");
		NROWS = Math.floor(Math.random() * 5)+2;
		NCOLS = Math.floor(Math.random() * 5)+2;
		PADDING = 5;
		BRICKWIDTH = (WIDTH/NCOLS) - PADDING;
		BRICKHEIGHT = Math.floor(Math.random() * 20)+15;
		
		bricks = new Array(NROWS);
		for (i=0; i < NROWS; i++) {
			bricks[i] = new Array(NCOLS);
			for (j=0; j < NCOLS; j++) {
				bricks[i][j] = Math.floor(Math.random() * 3)+1;
			}
		}
	}
	//timer
	function timer(){
		//console.log("Timer");
		if(start){
			console.log("InsideTimer");
			sekunde++;

			sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
			minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
			izpisTimer = minuteI + ":" + sekundeI;

			$("#cas").html(izpisTimer);
		}
		else{
			//console.log("ElseTmer");
			sekunde=0;
			//izpisTimer = "00:00";
			$("#cas").html(izpisTimer);
		}
	}

	function init() {
		console.log("init");
		if(start){
			sekunde = 0;
			izpisTimer = "00:00";
			intTimer = setInterval(timer, 1000);

			canvas=document.getElementById('canvas');
			ctx = canvas.getContext('2d');
			tocke = 0;
			$("#tocke").html(tocke);
			console.log("call draw");
			return setInterval(draw, 10); //klic funkcije draw vsakih 10 ms; 
		}
		//console.log("lelo");
	}
	
	function init_paddle() {
		console.log("init_paddle");
		paddleh = 10;
		paddlew = 80;
		paddlex = (WIDTH / 2)-paddlew/2;
	}

	
	
	//MIŠKA
	function init_mouse() {
		canvasMinX = $("#canvas").offset().left;
		canvasMaxX = canvasMinX + WIDTH;
	}
	function onMouseMove(evt) {
		if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
			paddlex = evt.pageX - canvasMinX - (paddlew/2);
		}
	}

	function initbricks() { //inicializacija opek - polnjenje v tabelo
		console.log("bricks");
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
		//console.log("clear");
		ctx.clearRect(0,0,WIDTH,HEIGHT);
	}

	function circle() {
		//console.log("circle");
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = "#000000";
		ctx.fill();
		x += dx;
		y += dy;

	}
	
	function restartOne(){
		console.log("restart");
		x = 150;
		y = 150;
		dx = 1;
		dy = 2;
		rightDown=false;
		leftDown=false;
		start=false;
		running=false;
		clearInterval(interval);
		clearInterval(intTimer);
	}
	
	function rect(){
		//console.log("rect");
		ctx.fillStyle = "#000000";
		ctx.fillRect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
	}
	function victory(){
		ctx.fillStyle = "#000000";
		ctx.font="20px Heebo";
		ctx.fillText('ZMAGAL SI! PRITISNI SPACE ZA PONOVNO IGRO!',5,225);
	}
	
	function draw() {
		//console.log("draw");
			//console.log(dy);
			//console.log(dx);
			clear();
			circle();
		  
			if (rightDown){
				if((paddlex+paddlew) < WIDTH){
					paddlex += 5;
				}
				else{
					paddlex=WIDTH-paddlew;
				}
			}
			else if (leftDown){
				if(paddlex>0){ 
					paddlex -= 5;
				}
				else{
					paddlex=0;
				}
			}
			rect();

			//riši opeke
			for (i=0; i < NROWS; i++) {
				for (j=0; j < NCOLS; j++) {
					vsotaBrick=vsotaBrick+bricks[i][j];
					//console.log("Bricsk");
					if (bricks[i][j] >= 1) {
						if(bricks[i][j] == 1){
							ctx.fillStyle = "#FF0000";
							//console.log("Red");
						}
						else if(bricks[i][j] == 2){
							ctx.fillStyle = "#00FF00";
							//console.log("Green");
						}
						else if(bricks[i][j] == 3){
							ctx.fillStyle = "#0000FF";
							//console.log("Blue");
						}
						else{
							ctx.fillStyle = "#FFFF00";
							//console.log("Else");
						}
						ctx.fillRect((j * (BRICKWIDTH + PADDING)) + PADDING,(i * (BRICKHEIGHT + PADDING)) + PADDING,BRICKWIDTH, BRICKHEIGHT);	
					}
				}
			}
			
			rowheight = BRICKHEIGHT + PADDING; //Smo zadeli opeko?
			colwidth = BRICKWIDTH + PADDING;
			row = Math.floor(y/rowheight);
			col = Math.floor(x/colwidth);
			//Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več

			if (y - radius < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
				console.log(y);
				dy = -dy; 
				bricks[row][col] = 0;
				tocke += 1; //v primeru, da imajo opeko večjo utež lahko prištevate tudi npr. 2 ali 3; pred tem bi bilo smiselno dodati še kakšen pogoj, ki bi signaliziral mesta opek, ki imajo višjo vrednost
				//console.log(tocke);
				$("#tocke").html(tocke);
			}
			else if(y - radius < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] > 1){
				dy = -dy; 
				bricks[row][col] = bricks[row][col]-1;
			}
			if(vsotaBrick<=0){
				clear();
				victory();
				restartOne();
			}
			else{
				vsotaBrick=0;
				if (x + dx > WIDTH-radius || x + dx < 0+radius){
					dx = -dx;
				}
				if (y + dy < 0+radius){
					dy = -dy;
				}
				else if (y > HEIGHT-radius) {	
					if (x > paddlex && x < paddlex+paddlew && y>HEIGHT-paddleh-2*radius){
						dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
						dy = -dy;
					}
					else{
						start=false;
						restartOne();
					}
					x += dx;
					y += dy;
				}
			}
		
	}
	//Tipkovnica
	document.addEventListener('keydown', event => {
		if (event.code === 'Space') {
			if(!running){
				running=true;
				start=true;
				$(document).mousemove(onMouseMove);
				//initbricks();
				randomLevel();
				init_mouse();
				init_paddle();
				interval=init();

			}
		}
		else if(event.keyCode == 39){
			rightDown = true;
			//console.log("right down", rightDown);
		}
		else if(event.keyCode == 82){
			clear();
			victory();
			restartOne();
			//console.log("right down", rightDown);
		}
		else if (event.keyCode == 37){
			leftDown = true;
			//console.log("right down", rightDown);
		}
	})
	document.addEventListener('keyup', event => {
		if (event.code === 'Space') {

		}
		else if(event.keyCode == 39){
			rightDown = false;
			//console.log("right down", rightDown);
		}
		else if (event.keyCode == 37){
			leftDown = false;
			//console.log("right down", rightDown);
		}
	})	
}