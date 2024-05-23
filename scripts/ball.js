const board = new Obstacle(993,218,30,240);
const net1 = new Obstacle(802,360,10,40);
const net2 = new Obstacle(905,370,35,55);

function Ball(){
    this._position = { x: 0, y: 0 };
    this._acceleration = { x: 0, y: 0 };
    this._velocity = { x: 0, y: 0 };

    this.reset();

    this._radius = 28;
    this._isDragging = false;
    this._isBouncing = false;
    this._counter = 0;
    this._isShotDone = false;
}


Ball.prototype.addEventListeners = function(){
    canvas._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvas._canvas.addEventListener('mousemove', updatemousepos);
}


Ball.prototype.reset = function(){

    if(!this._isShotDone) score = 0;

    this._isShotDone = false;
    this._isBouncing = false;
    this._counter = 0;
    this._position.x = Math.ceil(Math.random()*710) + 5;
    this._position.y = Math.ceil(Math.random()*485) + 215;
    this._acceleration.y = 0;
    this._acceleration.x = 0;
    this._velocity.x = 0;
    this._velocity.y = 0;
}

Ball.prototype.update = function(){
    
    if(this._isBouncing){

        this.checkCollisionWithobstacles();

        this._counter++;
        if(this._counter >= 190){
            this.reset();
        }
    }
    
    this._velocity.x += this._acceleration.x;
    this._velocity.y += this._acceleration.y;
    this._position.x += this._velocity.x;
    this._position.y += this._velocity.y;
    
}

Ball.prototype.checkCollisionWithobstacles = function(){
    this.checkCollisionWithobstacle(board);
    this.checkCollisionWithobstacle(net1);
    this.checkCollisionWithobstacle(net2);
    this.checkCollisionWithGround();
}

Ball.prototype.checkCollisionWithobstacle = function(obstacle) {
    const ballCenterX = this._position.x + this._radius;
    const ballCenterY = this._position.y + this._radius;

    const nearestX = Math.max(obstacle.position.x, Math.min(ballCenterX, obstacle.position.x + obstacle.width));
    const nearestY = Math.max(obstacle.position.y, Math.min(ballCenterY, obstacle.position.y + obstacle.height));

    const distanceX = ballCenterX - nearestX;
    const distanceY = ballCenterY - nearestY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance <= this._radius) {

        const normalX = distanceX / distance;
        const normalY = distanceY / distance;

        const velocityDotNormal = this._velocity.x * normalX + this._velocity.y * normalY;

        const vxNormal = velocityDotNormal * normalX;
        const vyNormal = velocityDotNormal * normalY;
        const vxTangential = this._velocity.x - vxNormal;
        const vyTangential = this._velocity.y - vyNormal;

        const vxNormalAfterCollision = -vxNormal * 0.8;
        const vyNormalAfterCollision = -vyNormal * 0.8;

        // The tangential component remains the same (no energy loss tangentially)
        this._velocity.x = vxNormalAfterCollision + vxTangential;
        this._velocity.y = vyNormalAfterCollision + vyTangential;

        // Adjust the ball's position to prevent it from sticking into the board
        const overlap = this._radius - distance;
        this._position.x += overlap * normalX;
        this._position.y += overlap * normalY;
    }
}


Ball.prototype.checkCollisionWithGround = function() {
    if (this._position.y + 2*this._radius >= canvas._canvas.height) {
    
        this._velocity.y = -this._velocity.y * 0.8;
    
        const overlap = this._position.y + 2*this._radius - canvas._canvas.height;
        this._position.y -= overlap;
    }
}


Ball.prototype.onMouseDown = function(event){   
    if(!this._isBouncing){
        this._isDragging = true;
        lastMousepos = getMousePosition(event);
        //canvas.drawImage(sprites.ball , { x: 300, y: 100  } , 2*this._radius, 2*this._radius);
    }
}

Ball.prototype.onMouseUp = function(event){
    //canvas.drawImage(sprites.ball , { x: 300, y: 100  } , 2*this._radius, 2*this._radius);
    if(this._isDragging){
        const mousePos = getMousePosition(event);
        this._isDragging = false;
        ballCenterY = this._position.y + this._radius;
        ballCenterX = this._position.x + this._radius;
        if(mousePos.y < ballCenterY)
        {
            this._isBouncing = true;
            this._acceleration.y = 0.04*10;
            this._acceleration.x = 0;
            this._velocity.x = 0.2*(mousePos.x - ballCenterX) * Math.sqrt(5/(-mousePos.y + ballCenterY));
            this._velocity.y = - 0.2 * 2*Math.sqrt(5*(-mousePos.y + ballCenterY));
        }
        // const g = 10; // Acceleration due to gravity
        // const h_max = mousePos.y - this._position.y; // Desired maximum height
        // this._velocity.y = Math.sqrt(2 * g * h_max); // Initial vertical velocity

        // // Adjust the horizontal velocity based on the desired maximum height
        // const t_max = this._velocity.y / g; // Time to reach maximum height
        // this._velocity.x = (mousePos.x - this._position.x) / t_max;
    }
}

updatemousepos = function(event){
    lastMousepos = getMousePosition(event);
}




Ball.prototype.renderArrow = function(event){
    if(this._isDragging){
        if(lastMousepos.y < this._position.y + this._radius){
            canvas.drawArrow(lastMousepos);
        }
    }
}

Ball.prototype.maintainScore = function(){
    if(this._isBouncing && !this._isShotDone){
        const ballCenterX = this._position.x + this._radius;
        const ballCenterY = this._position.y + this._radius;
       

        if(ballCenterY > 375 && ballCenterY < 390 && ballCenterX > 812 && ballCenterX < 900){
            score++;
            this._isShotDone = true;
        }
    }
}