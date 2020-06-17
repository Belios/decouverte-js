

let pawn = document.querySelector('#pawn');
let moveBy = 10;

window.addEventListener('load', () => {
    pawn.style.position = 'absolute';
    pawn.style.left = 0;
    pawn.style.top = 0;
});


window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            pawn.style.left = parseInt(pawn.style.left) - moveBy + 'px';
            break;
        case 'ArrowRight':
            pawn.style.left = parseInt(pawn.style.left) + moveBy + 'px';
            break;
        case 'ArrowUp':
            pawn.style.top = parseInt(pawn.style.top) - moveBy + 'px';
            break;
        case 'ArrowDown':
            pawn.style.top = parseInt(pawn.style.top) + moveBy + 'px';
            break;
    }
});
