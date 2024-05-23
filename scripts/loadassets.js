var sprites = {};
function LoadAssets(){
    
    function loadsprite(filename){

     let image = new Image();
     image.src = filename;
     return image;

    }

    sprites.ball = loadsprite("assets/basketball.png");
    sprites.net = loadsprite("assets/net.png");

}