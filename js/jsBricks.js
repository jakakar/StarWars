
function drawIt() {
var x;
var y;
var dx = 0;
var dy = 0;
var r = 18;
var f = 5;
var zivljenja = 3;
var totalScore = 0;
var tv;
var ctx;
var canvas;
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var pause=false;
var start=false;

//timer
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;




//nastavljanje slik
var imgball = document.getElementById("ball");
var imgpaddle = document.getElementById("paddle");
var imgbrick1 = document.getElementById("brick1");
var imgbrick2 = document.getElementById("brick2");
var imgbrick3 = document.getElementById("brick3");




//nastavljanje leve in desne tipke
function onKeyDown(evt) {
  if (evt.keyCode == 39) 
rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
  else if(evt.keyCode == 80){ //P  pause
		pause_game()
		}
else if(evt.keyCode == 32&&!start){
			dy=3;
			start=true;
		}
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) 
rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp); 




//nastavljanje miške
function init_mouse() {
  canvasMinX = $("canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
}


function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX -paddlew/2;
  }
}
$(document).mousemove(onMouseMove)



//inicializacija opek - polnjenje v tabelo
function initbricks() {	
  NROWS = 6;
  NCOLS = 5;
  PADDING = 1.5;
  //BRICKWIDTH = 73;
  BRICKWIDTH = (WIDTH/NCOLS) - PADDING;
  BRICKHEIGHT = 35;
  
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
		if(i==0)bricks[i][j] = 3;
		else if(i==1||i==2)bricks[i][j] = 2;
		else bricks[i][j] = 1;
    }
  }
}



function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  x=WIDTH/2;
  y=HEIGHT/2.51;
  tocke = 0;
  $("#tocke").html(tocke);
  $("#zivljenja").html(zivljenja);
  sekunde = 0;
  izpisTimer = "00:00";
  intTimer = setInterval(timer, 1000);
  return setInterval(draw, 10);
}



function circle(x,y,r) {
  /*ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();*/
  ctx.drawImage(imgball,x-r,y-r,2*r,2*r);
}



function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}



function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}



function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 25;
  paddlew = 90;
}


//timer
function timer(){
	if(start){
		sekunde++;

		sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
		minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
		izpisTimer = minuteI + ":" + sekundeI;
		$("#cas").html(izpisTimer);
	}else{
		sekunde=0;
		$("#cas").html(izpisTimer);
	}
}


function pause_game(){ //pause
		if(!pause){
		pause=true;
		clearInterval(drawInterval);
		clearInterval(intTimer);
		}
		
		else{
		pause=false;
			drawInterval=setInterval(draw, 10);
			intTimer=setInterval(timer, 1000);
		
		}
	}
	
function checkTable(){
	tv=0;
	for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      tv += bricks[i][j];
    }
	}
	
	if (tv==0)return true;
	else return false;
}



//END LIBRARY CODE
function draw() {
	clear();
	circle(x, y, r);
	
	//premik ploščice levo in desno
	if(rightDown){
		if((paddlex+paddlew) < WIDTH){
			paddlex += 5;
		}else{
			paddlex = WIDTH-paddlew;
		}
	}
	else if(leftDown){
		if(paddlex>0){
			paddlex -=5;
		}else{
			paddlex=0;
		}
	}
	
	
	
	ctx.drawImage(imgpaddle,paddlex,HEIGHT-paddleh,paddlew,paddleh);

	//riši opeke
	  for (i=0; i < NROWS; i++) {
		for (j=0; j < NCOLS; j++) {
		  if (bricks[i][j] == 1) {
			ctx.drawImage(imgbrick1, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		  }else if(bricks[i][j] == 2){
			ctx.drawImage(imgbrick2, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		  }
		  else if(bricks[i][j] == 3){
			ctx.drawImage(imgbrick3, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		  }
		}
	  }
	
	
	rowheight = BRICKHEIGHT + PADDING + f/2; //Smo zadeli opeko?
	colwidth = BRICKWIDTH + PADDING + f/2;
	row = Math.floor(y/rowheight);
	col = Math.floor(x/colwidth);
	//Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
	//štetje zadetih opek
	if (y < NROWS * rowheight && row >= 0 && col >= 0 &&( bricks[row][col] == 1 || bricks[row][col] == 2 || bricks[row][col] == 3)) {
		dy = -dy; 
		tocke += bricks[row][col];
		bricks[row][col] -= 1;
		$("#tocke").html(tocke);
	}
	
	
	if(checkTable()){
		zmaga();
	}
	
	//odboj
	if (x + dx > WIDTH - r|| x + dx < 0 + r)
		dx = -dx;
	
	if (y + dy < 0+r)
		dy = -dy;
	else if (y + dy > HEIGHT-(paddleh+f)&&y + dy < HEIGHT +dy -(paddleh+f)){
		if (x > paddlex && x < paddlex + paddlew){
			dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
			dy = -dy;
		if (y + dy > HEIGHT-(paddleh+f)&&y + dy < HEIGHT-(r+f)){ dx = -dx; dy = -dy;}}
	}
	else if (y + dy > HEIGHT-(r)) {
			if(zivljenja == 1)
				konec();
			else{
				zivljenja--;
				tocke-=3;
				$("#tocke").html(tocke);
				$("#zivljenja").html(zivljenja);
			}
			x=WIDTH/2;
			y=HEIGHT/3;
			dx=0;
		
	}
	
	x += dx;
	y += dy;
	
	
}
function zmaga()
	{
		start=false;
		clearInterval(intTimer);
		clearInterval(drawInterval);
		totalScore=Math.floor((tocke*1000)/sekunde);
		swal({
		  title: "you won!",
		  icon: "success",
		  text: "Score: "+totalScore,
		  button: "retry!",
		}).then((value) =>{
			location.reload();
		});
		x = 275;
		y = 150;
		dy=0;
		
	}

function konec()
	{
		$("#zivljenja").html("0");
		clearInterval(intTimer);
		clearInterval(drawInterval);
		swal({
		  title: "game over",
		  icon: "error",
		  button: "want to play again?",
		}).then((value) =>{
			location.reload();
		});
		dy=0;
	}



drawInterval=init();
init_paddle();
init_mouse();
initbricks();
}