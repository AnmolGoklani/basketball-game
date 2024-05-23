var score = 0;

var lastMousepos = { x: 0, y: 0 };

var canvas = new Canvas2D();
var bball = new Ball();
function gameinit(){
      
     LoadAssets();
     gameLoop();

}

function gameLoop() {
    update();
    render();
    bball.maintainScore();
    //console.log(score);
    requestAnimationFrame(gameLoop);
}

function update() {
    bball.update();
}

function render() {
    canvas.clear();
    canvas.drawImage(sprites.ball , { x: bball._position.x, y: bball._position.y  } , 2*bball._radius, 2*bball._radius);
    canvas.drawImage(sprites.net , { x: 0.7*canvas.width, y: canvas.height/4 }, canvas.width*0.4 , canvas.height*0.75);

    bball.renderArrow();

    canvas.printScore();
    

    // canvas._canvasContext.beginPath();
    // canvas._canvasContext.rect(0, 0, canvas.width, canvas.height/4);
    // canvas._canvasContext.fillStyle = 'black';
    // canvas._canvasContext.fill();

    // canvas._canvasContext.beginPath();
    // canvas._canvasContext.rect(0, canvas.height/2, canvas.width, canvas.height/2);
    // canvas._canvasContext.fillStyle = 'green';
    // canvas._canvasContext.fill();

}

function getMousePosition(event) {
    
    const rect = canvas._canvas.getBoundingClientRect();
    
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    return { x: x, y: y };
}


canvas._canvas.addEventListener('click', function(event) {
    const mousePos = getMousePosition(event);
    console.log('Mouse position:', mousePos);
    
});



bball.addEventListeners();


