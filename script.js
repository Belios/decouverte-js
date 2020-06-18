
//
// let pawn = document.querySelector('#pawn');
// let moveBy = 40;
//
// window.addEventListener('load', () => {
//     pawn.style.position = 'absolute';
//     pawn.style.left = 0;
//     pawn.style.top = 0;
// });
//
//
// window.addEventListener('keyup', (e) => {
//     switch (e.key) {
//         case 'ArrowLeft':
//             pawn.style.left = parseInt(pawn.style.left) - moveBy + 'px';
//             break;
//         case 'ArrowRight':
//             pawn.style.left = parseInt(pawn.style.left) + moveBy + 'px';
//             break;
//         case 'ArrowUp':
//             pawn.style.top = parseInt(pawn.style.top) - moveBy + 'px';
//             break;
//         case 'ArrowDown':
//             pawn.style.top = parseInt(pawn.style.top) + moveBy + 'px';
//             break;
//     }
// });


// var ctx = null;
// var tileW = 40, tileH = 40;
// var mapW = 10, mapH = 10;
//
// var currentSecond = 0,
//     frameCount = 0,
//     framesLastSecond = 0;
//
// var gameMap = [
//         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//         1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//         1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//         1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//         1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//         1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//         1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//         1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//         1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
// ];
//
// window.onload = function()
// {
//       ctx = document.getElementById('game').getContext('2d');
//       requestAnimationFrame(drawGame);
//       ctx.font = "bold 10pt sans-serif";
// };
//
// function drawGame() {
//
//     if(ctx==null) { return; }
//
//     var sec = Math.floor(Date.now()/1000);
//     if(sec!=currentSecond)
//     {
//           currentSecond = sec;
//           framesLastSecond = frameCount;
//           frameCount = 1;
//     }
//       else { frameCount++; }
//
//       for (var y = 0; y < mapH ; ++y) {
//
//           for (var x = 0; x < mapW ; ++x) {
//
//               switch (gameMap[((y*mapW)+x)]) {
//
//                 case 0:
//                         ctx.fillStyle = "#999999";
//                         break;
//                 default:
//                         ctx.fillStyle = "#eeeeee";
//
//               }
//                 ctx.fillRect(x*tileW, y*tileH), tileW, tileH)
//           }
//       }
//         ctx.fillStyle = "#ff0000";
//         ctx.fillText("FPS: " + frameLastSecond, 10, 20);
//
//         requestAnimationFrame(drawGame);
// }


const EMPTY_CELL = ".";
const BOMB_CELL  = "O";

function fillGrid(grid){
    const col_max = grid[0].length;
    return grid.fill(BOMB_CELL.repeat(col_max));
}

function iterateGrid(grid){
    let explosions = []; // storing row and col indeces
    for(let row = 0; row < grid.length; row++){
        let newRow = "";
        for(let col = 0; col < grid[row].length; col ++){
            const char = grid[row][col];
            let newChar = char;
            switch(char){
                case "0":
                    newChar = "3";
                    break;
                case "1":
                    explosions.push([row, col]);
                    break;
                case "2":
                    newChar = "1";
                    break;
                case "3":
                    newChar = "2";
            }
            newRow += newChar;
        }
        grid[row] = newRow;
    }
    // handle exploding bombs
    if(explosions.length){
        // using array as queue
        for(const [row, col] of explosions) explodeBomb(grid, row, col);
    }
    return grid;
}

function replaceCharAt(string, char, index){
    return string.slice(0,index) + char + string.slice(index + 1);
}

function explodeBomb(grid, row, col){
    const row_max = grid.length;
    const col_max = grid[0].length;
    // center
    grid[row] = replaceCharAt(grid[row], "0", col);

    // up
    if(row - 1 >= 0) grid[row - 1] = replaceCharAt(grid[row - 1], "0", col);

    // down
    if(row + 1 < row_max) grid[row + 1] = replaceCharAt(grid[row + 1], "0", col);

    // left
    if(col - 1 >= 0) grid[row] = replaceCharAt(grid[row], "0", col - 1);

    // right
    if(col + 1 < col_max) grid[row] = replaceCharAt(grid[row], "0", col + 1);
}

function formatGrid(grid, format){
    for(let row = 0; row < grid.length; row++){
        if(format === "output"){
            // replace non-0 with bombs, and 0's with empty cell
            grid[row] = grid[row].replace(/[^0]/g, BOMB_CELL).replace(/0/g,EMPTY_CELL);
        }else{
            const bomb_cell_re  = new RegExp(BOMB_CELL,"g");
            const empty_cell_re = new RegExp("\\" + EMPTY_CELL,"g");
            // replace bomb cell with 2s, and empty cells with 0s
            grid[row] = grid[row].replace(bomb_cell_re, 2).replace(empty_cell_re,0);
        }
    }
    return grid;
}

function bomberMan(n, grid) {
    if(n === 1) return grid;

    // if even, return filled grid
    if (n % 2 === 0) return fillGrid(grid);

    // using numbers (different format) to track when bombs will explode
    grid = formatGrid(grid); // O(n * m)
    grid = iterateGrid(grid); // O(n * m)

    // remove repeated cycles
    n -= 2
    n %= 4

    while(n){ // O(4)
        grid = iterateGrid(grid); // O(n * m)
        n--;
    }

    // reformat back to original "." and "O"
    grid = formatGrid(grid, "output"); // O(n * m)

    return grid;
}
