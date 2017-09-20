var c = 0;
var aiPos = 0;

function tick(){
  c++;
  document.getElementById("stepsDone").value = c;
  moveWall();
  checkCollision();
}

var tickInterval;

function runSimulation(state){
  if(state == 1){ //run the simulation
    if (c > 100){
      runSimulation('0'); //force stop after 100 steps
    } else {
      tickInterval = setInterval("tick();", 100); //tick every 100ms
    }
  } else { //stop the simulation
    clearInterval(tickInterval);
    c=0;
    document.getElementById("stepsDone").value = c;
    document.getElementById("wall").style.left = null;
    document.getElementById("wall").style.right = "0px";
    document.getElementById("ai").style.marginTop = "0px";
    aiPos = 0;
  }
}

function moveWall(){
  var wall = document.getElementById("wall");
  var debugTextArea = document.getElementById("debugTextArea");

  var getWallX = wall.offsetLeft;
  var getWallY = wall.offsetTop;

  debugTextArea.innerHTML += "["+c+"] Wall PosX: "+getWallX+" | Wall PosY: "+getWallY+"\n";
  debugTextArea.scrollTop = debugTextArea.scrollHeight;

  if (getWallX <=0){
    wall.style.left = null;
    wall.style.right = "0px";
  } else {
    getWallX -= 40;
    wall.style.left = getWallX + "px";
  }
}

function moveCar(direction){

  if (aiPos<0){aiPos=0;}
  if (aiPos>250){aiPos=250;}

  if(direction == "down"){
    aiPos += 10;
  } else {
    aiPos -= 10;
  }

  document.getElementById('ai').style.marginTop = aiPos + "px";
}

function checkCollision(){
  var getWallX = document.getElementById("wall").offsetLeft;
  var getWallY = document.getElementById("wall").offsetTop+100;

  var getAIX = document.getElementById("sensor_2").offsetLeft+500;
  var getAIY = document.getElementById("ai").offsetTop;

  if (getWallX < getAIX && getAIY < getWallY){
    moveCar('down');
  }
}
