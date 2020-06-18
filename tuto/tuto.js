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


addWalls();

function addWalls() {
  for (var i = 0; i < 100; i++){
    var div = document.createElement('div')
  }
}
