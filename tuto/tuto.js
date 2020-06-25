const H_GRID = 20;
const V_GRID = 20;
const GRID_SIZE = 40;

const WINDOW_WIDTH = H_GRID * GRID_SIZE;
const WINDOW_HEIGHT = V_GRID * GRID_SIZE;

let block = document.getElementById('block');
block.style.width = WINDOW_WIDTH;
block.style.height = WINDOW_HEIGHT;

let pawn = document.getElementById('pawn'),
  style = pawn.style,
  x = pawn.offsetLeft,
  y = pawn.offsetTop;

document.onkeydown = function(event){
  var event = event || window.event,
  keyCode = event.keyCode;
  switch(keyCode) {
    case 37:
    x = x - 40;
    if (x < 0) {
      x = 0;
    }
    break;

    case 38:
      y = y - 40;
      if (y < 0) {
        y = 0;
      }
      break;

    case 39:
      x = x + 40;
      if (x > 760) {
        x = 760;
      }
      break;

    case 40:
      y = y + 40;
      if (y > 760) {
        y = 760;
      }
      break;

  }
  style.left = String(x) + 'px';
  style.top = String(y) + 'px';
}


// addWalls();

// function addWalls() {
//   for (var i = 0; i < 100; i++){
//     var div = document.createElement('div')
//   }
// }

var blockGrid = [];
for(var i = 0; i < H_GRID; i++) {
  blockGrid.push([]);
  for(var j = 0; j < V_GRID; j++){

    let block = document.createElement("div");
    block.style.width = "40px";
    block.style.height = "40px";
    block.style.display = "flex";
    block.style.position = "absolute";
    if (random100() > 90) {
      block.style.backgroundColor = "black";
      block.through = false;
  }
    else {
      block.style.backgroundColor = "green";
      block.through = true;
  }
    block.style.marginLeft = (i * GRID_SIZE).toString() + "px";
    block.style.marginTop = (j * GRID_SIZE).toString() + "px";

    document.getElementById("block").appendChild(block);
    blockGrid[i].push(block);
  }
}

blockGrid[10][10].style.backgroundColor = "black";

document.onkeydown = function(event){
  var event = event || window.event,
  keyCode = event.keyCode;
  switch(keyCode) {
    case 37:
    x = x - GRID_SIZE;
    if (x < 0) {
      x = 0;
    }
    break;

    case 38:
      y = y - GRID_SIZE;
      if (y < 0) {
        y = 0;
      }
      break;

    case 39:
      x = x + GRID_SIZE;
      if (x > WINDOW_WIDTH - GRID_SIZE && blockGrid[ y / GRID_SIZE ][ x / GRID_SIZE + 1].through) {
        x = WINDOW_WIDTH - GRID_SIZE;
      }
      break;

    case 40:
      y = y + GRID_SIZE;
      if (y > WINDOW_HEIGHT - GRID_SIZE) {
        y = WINDOW_HEIGHT - GRID_SIZE;
      }
      break;

  }
  style.left = String(x) + 'px';
  style.top = String(y) + 'px';
}

function random100() {
return Math.floor(Math.random() * 100);
}
