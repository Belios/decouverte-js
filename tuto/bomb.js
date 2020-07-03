let bombs = [];

for (var i = 0; i < 3; i++) {
bomb = document.createElement("div");
bomb.style.width = GRID_SIZE + "px";
bomb.style.height = GRID_SIZE + "px";
bomb.style.backgroundColor = "red";
bomb.style.backgroundSize = "contain";
bomb.style.position = "absolute";
bomb.style.zIndex = "100";
bomb.id = "bomb" + String(i);

bombs.push(bomb);
}

function createBomb(blockGrid) {
  if (!document.getElementById('bomb0')) {
    var bomb = bombs[0];
    bomb.style.left = String(x) + "px";
    bomb.style.top = String(y) + "px";
    bomb.x = x / GRID_SIZE;
    bomb.y = y / GRID_SIZE;

    blockGrid[bomb.x][bomb.y].through = false;
    blockGrid[bomb.x][bomb.y].bomb = true;
    document.getElementById('block').appendChild(bomb);
    console.log( x, y, bomb.x, bomb.y );
    setTimeout(function explode(){
      document.getElementById("bomb0").remove();
    blockGrid[bomb.x][bomb.y].through = false;
    blockGrid[bomb.x][bomb.y].bomb = true;
  }, 10000)

  }

}
