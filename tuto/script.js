const H_GRID = 24;
const V_GRID = 16;
const GRID_SIZE = 40;

const WINDOW_WIDTH = H_GRID * GRID_SIZE;
const WINDOW_HEIGHT = V_GRID * GRID_SIZE;

var board = document.getElementById('board');
board.style.width = WINDOW_WIDTH;
board.style.height = WINDOW_HEIGHT;

var pawn = document.getElementById('pawn'),
  stylepawn = pawn.style,
  x = 0,
  y = 0;











var blockGrid = [];
for (var i = 0; i < H_GRID; i++) {
  blockGrid.push([]);
  for (var j = 0; j < V_GRID; j++) {
    let block = document.createElement("div");
    block.style.width = "40px";
    block.style.height = "40px";
    block.style.display = "flex";
    block.style.position = "absolute";

    if (random100() > 90) {
      block.style.backgroundColor = "black";
      block.through = false;
    } else {
      block.style.backgroundColor = "green";
      block.through = true;
    }

    block.style.marginLeft = (i * GRID_SIZE).toString() + "px";
    block.style.marginTop = (j * GRID_SIZE).toString() + "px";

    document.getElementById("board").appendChild(block);
    blockGrid[i].push(block);
  }
}





var ennemylist = []
for (var i = 0; i < 100; i++) {
  let ennemy = document.createElement('div');

let x = 0;
let y = 0;
while (!blockGrid[x][y].through || (x === 0 && y ===0)) {
x = Math.floor(Math.random() * (H_GRID))
y = Math.floor(Math.random() * (V_GRID))
}
blockGrid[x][y].through = false;
  ennemy.ennemyX = x;
  ennemy.ennemyY = y;
  ennemy.direction = "right";



  ennemy.id = "ennemy" + String(i);
  ennemy.style.width = "40px";
  ennemy.style.height = "40px";
  ennemy.style.position = "absolute";
  ennemy.style.backgroundColor = "yellow";
  ennemy.style.backgroundSize = "contain";
  ennemy.style.left = String(ennemy.ennemyX * GRID_SIZE) + "px";
  ennemy.style.top = String(ennemy.ennemyY * GRID_SIZE) + "px";
  ennemy.style.zIndex = "95";
  board.appendChild(ennemy);




  ennemylist.push(ennemy)
}
//blockGrid[10][10].style.backgroundColor = "blue";

var frame = 0;

function loop() {
  if (frame === 60) {
    for (var i = 0; i < ennemylist.length; i++) {
      let ennemy = ennemylist[i];
      let ennemyX = ennemy.ennemyX
      let ennemyY = ennemy.ennemyY
      let direction = ennemy.direction
      blockGrid[ennemyX][ennemyY].through = true ;
      switch (direction) {
        case "left":
          if (ennemyY > 0 && blockGrid[ennemyX][ennemyY - 1].through)
            ennemyY--;
          break;

        case "right":

          if (ennemyX < H_GRID - 1 && blockGrid[ennemyX + 1][ennemyY].through)
            ennemyX++;
          break;

        case "up":
          console.log(ennemyY)
          if (ennemyY < V_GRID - 1 && blockGrid[ennemyX][ennemyY + 1].through)

            ennemyY++;
          break;

        case "down":
          if (ennemyX > 0 && blockGrid[ennemyX - 1][ennemyY].through)
            ennemyX--;
          break;
      }
      ennemy.style.left = String(ennemyX * GRID_SIZE) + 'px';
      ennemy.style.top = String(ennemyY * GRID_SIZE) + 'px';

      let random = random100();

      if (random < 25) {
        direction = "left";
      }

      if (random >= 25 && random < 50) {
        direction = "right";
      }

      if (random >= 50 && random < 75) {
        direction = "up";
      }

      if (random > 75) {
        direction = "down";
      }

      ennemy.ennemyX = ennemyX
      ennemy.ennemyY = ennemyY
      ennemy.direction = direction
      blockGrid[ennemyX][ennemyY].through = false ;
    }

    frame = 0;
  }
  frame++;

  window.requestAnimationFrame(loop);

}

window.requestAnimationFrame(loop);









document.onkeydown = function(event) {
  var event = event || window.event,
    keyCode = event.keyCode;
  switch (keyCode) {
    // Up
    case 38:
      if (y > 0 && blockGrid[x][y - 1].through)
        y--; // ou y-=40;
      break;
      // Right
    case 39:
      if (x < H_GRID - 1 && blockGrid[x + 1][y].through)
        x++;
      break;
      // Down
    case 40:
      if (y < H_GRID - 1 && blockGrid[x][y + 1].through)
        y++;
      break;
      // Left
    case 37:
      if (x > 0 && blockGrid[x - 1][y].through)
        x--;
      break;

        case 32:
      //if (!blockGrid[x / GRID_SIZE][y / GRID_SIZE].bomb) {
        createBomb(blockGrid);
      //}
      break;
      default: return;
  }
  stylepawn.left = String(x * GRID_SIZE) + 'px';
  stylepawn.top = String(y * GRID_SIZE) + 'px';
}

function randomColor() {
  return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function random100() {
  return Math.floor(Math.random() * 100);
}
