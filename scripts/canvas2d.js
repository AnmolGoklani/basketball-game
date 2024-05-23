function Canvas2D() {
  
    this._canvas = document.getElementById('myCanvas');
    this._canvasContext = this._canvas.getContext('2d');
    this.width = this._canvas.offsetWidth;
    this.height = this._canvas.offsetHeight;
    
}

Canvas2D.prototype.clear = function() {
   this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

// Canvas2D.prototype.drawImage = function( image , position ){

//    this._canvasContext.drawImage(image, position.x, position.y);

// }

Canvas2D.prototype.drawImage = function( image , position , width , height){

    this._canvasContext.drawImage(image, position.x, position.y, width, height);
 
 }

Canvas2D.prototype.drawArrow = function(mousePos){
    //console.log('anmol');
    var ballCenterX = bball._position.x + bball._radius;
    var ballCenterY = bball._position.y + bball._radius;
    const v = {x: (mousePos.x - ballCenterX) * Math.sqrt(5/(-mousePos.y + ballCenterY)), y: -2*Math.sqrt(5*(-mousePos.y + ballCenterY))};
    var t = 0;
    var newpos = {};

    // this._canvasContext.beginPath();
    //     this._canvasContext.rect(200,200,100,100);
    //     this._canvasContext.fillStyle = 'black';
    //     this._canvasContext.fill();

 
    while(t <= (-v.y/5)){

        
        //console.log('anmol1');
        newpos = {x: ballCenterX + v.x*t, y: ballCenterY + v.y*t + 5*t*t};
        this._canvasContext.beginPath();
        this._canvasContext.arc(newpos.x, newpos.y, 2, 0, 2 * Math.PI);
        this._canvasContext.fillStyle = 'black';
        this._canvasContext.fill();


        t+=0.2;
    }

    newpos = { x: newpos.x -3.5 , y: newpos.y + 3};

    var arrowHeadSize = 10;
    var arrowHeadAngle = Math.PI / 6;
    var arrowHeadX = newpos.x + arrowHeadSize * Math.cos(arrowHeadAngle);
    var arrowHeadY = newpos.y + arrowHeadSize * Math.sin(arrowHeadAngle);
    var arrowHeadX2 = newpos.x + arrowHeadSize * Math.cos(-arrowHeadAngle);
    var arrowHeadY2 = newpos.y + arrowHeadSize * Math.sin(-arrowHeadAngle);

    this._canvasContext.beginPath();
    this._canvasContext.moveTo(newpos.x, newpos.y);
    this._canvasContext.lineTo(arrowHeadX, arrowHeadY);
    this._canvasContext.lineTo(arrowHeadX2, arrowHeadY2);
    this._canvasContext.closePath();
    this._canvasContext.fillStyle = 'black';
    this._canvasContext.fill();

}


Canvas2D.prototype.printScore = function(){
    var s = String(score);
    s = "SCORE : " + s;
    this._canvasContext.fillText(s,20,20 ,100);
}
