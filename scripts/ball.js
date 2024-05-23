const Board = {position: {x: 933, y: 218}, width: 30, height: 240};

function Ball(){
    this._position = { x: 0, y: 0 };
    this._acceleration = { x: 0, y: 0 };
    this._velocity = { x: 0, y: 0 };

    this.reset();

    this._radius = 28;
    this._isDragging = false;
    this._isBouncing = false;
    this._counter = 0;
}


Ball.prototype.addEventListeners = function(){
    canvas._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvas._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
}


Ball.prototype.reset = function(){

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

        this.checkCollisionWithBoard();

        this._counter++;
        if(this._counter >= 100){
            this.reset();
        }
    }
    
    this._velocity.x += this._acceleration.x;
    this._velocity.y += this._acceleration.y;
    this._position.x += this._velocity.x;
    this._position.y += this._velocity.y;
    
}

Ball.prototype.checkCollisionWithBoard = function() {
    const ballCenterX = this._position.x + this._radius;
    const ballCenterY = this._position.y + this._radius;

    // Calculate the nearest point on the rectangle to the ball's center
    const nearestX = Math.max(Board.position.x, Math.min(ballCenterX, Board.position.x + Board.width));
    const nearestY = Math.max(Board.position.y, Math.min(ballCenterY, Board.position.y + Board.height));

    // Calculate the distance between the ball's center and the nearest point
    const distanceX = ballCenterX - nearestX;
    const distanceY = ballCenterY - nearestY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Check if the distance is less than or equal to the ball's radius
    if (distance <= this._radius) {
        // Calculate the normal vector (normalized)
        const normalX = distanceX / distance;
        const normalY = distanceY / distance;

        // Calculate the relative velocity in terms of the normal direction
        const velocityDotNormal = this._velocity.x * normalX + this._velocity.y * normalY;

        // Calculate the velocity components in the direction of the normal and tangential
        const vxNormal = velocityDotNormal * normalX;
        const vyNormal = velocityDotNormal * normalY;
        const vxTangential = this._velocity.x - vxNormal;
        const vyTangential = this._velocity.y - vyNormal;

        // Apply restitution (elasticity) to the normal component of the velocity
        const restitution = 0.8; // Coefficient of restitution
        const vxNormalAfterCollision = -vxNormal * restitution;
        const vyNormalAfterCollision = -vyNormal * restitution;

        // The tangential component remains the same (no energy loss tangentially)
        this._velocity.x = vxNormalAfterCollision + vxTangential;
        this._velocity.y = vyNormalAfterCollision + vyTangential;

        // Adjust the ball's position to prevent it from sticking into the board
        const overlap = this._radius - distance;
        this._position.x += overlap * normalX;
        this._position.y += overlap * normalY;
    }
}


Ball.prototype.onMouseDown = function(event){   
    if(!this._isBouncing){
        this._isDragging = true;
    }
}

Ball.prototype.onMouseUp = function(event){
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

Ball.prototype.onMouseMove = function(event){
    if(this._isDragging){
        const mousePos = getMousePosition(event);
        if(mousePos.y < this._position.y + this._radius){
            render();
            canvas.drawArrow({x: 500, y: 100});
            // canvas.drawArrow(mousePos);
            
        }        
    }
}