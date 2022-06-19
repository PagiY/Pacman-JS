import {keys} from './controller.js';

let defaults = {
    w: 20,
    h: 20,
    r: 10
}

let gameobjects = {
    bricksList: [],
    pacman: null,
}

class GameObject {
    constructor(ctx, x, y){
        this.ctx = ctx
        this.x = x  //xpos
        this.y = y  //ypos
        
    }
}

class Brick extends GameObject { 
    constructor(ctx, x, y){
        super(ctx, x, y);
        this.width = defaults.w;
        this.height = defaults.h;
        
    }

    draw(){    
        this.ctx.fillStyle = 'rgb(0, 0, 255)';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
    }

}

class Pacman extends GameObject{
    constructor(ctx, x, y){
        super(ctx, x, y);
        this.r = 10;
        this.vx = 0;
        this.vy = 0;

        this.isColliding = false;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.isColliding ? 'white' : 'yellow';
        this.ctx.fill();
        this.ctx.closePath();
    }

    update(){

        this.x += this.vx;
        this.y += this.vy;

        this.stop(); 
        
        
        this.move(); 
        
        this.isColliding = false;
        
    }

    stop(){
        this.vx = 0;
        this.vy = 0;
    }

    move(){
        if(keys.up.pressed){
            for(let i = 0; i < gameobjects.bricksList.length; i++){
                let brick = gameobjects.bricksList[i];
                if(this.detectCollision_(brick, 0, -1)){
                    this.vy = 0;
                    break;
                }
                else{
                    this.vy = -1;
                }
            }
            
        }
        else if(keys.down.pressed){
            for(let i = 0; i < gameobjects.bricksList.length; i++){
                let brick = gameobjects.bricksList[i];
                if(this.detectCollision_(brick, 0, 1)){
                    this.vy = 0;
                    break;
                }
                else{
                    this.vy = 1;
                }
            }
           
        }
        else if(keys.left.pressed){

            for(let i = 0; i < gameobjects.bricksList.length; i++){
                let brick = gameobjects.bricksList[i];
                if(this.detectCollision_(brick, -1, 0)){
                    this.vx = 0;
                    break;
                }
                else{
                    this.vx = -1;
                }
            }

            
        }
        else if(keys.right.pressed){
            for(let i = 0; i < gameobjects.bricksList.length; i++){
                let brick = gameobjects.bricksList[i];
                if(this.detectCollision_(brick, 1,0)){
                    this.vx = 0;
                    break;
                }
                else{
                    this.vx = 1;
                }
            }

        }
    }

    detectCollision(brick){
        let testX = this.x;
        let testY = this.y;

        if(this.x < brick.x)                            testX = brick.x;
        else if(this.x > (brick.x + brick.width))       testX = brick.x + brick.width;
        if(this.y < brick.y)                            testY = brick.y;
        else if(this.y > (brick.y + brick.height))      testY = brick.y + brick.width;

        let distX = (this.x + this.vx) - testX;
        let distY = (this.y + this.vy) - testY
        let distance = Math.sqrt((distX * distX) + (distY * distY)) ;

        if(distance < this.r){
            this.isColliding = true;
            //this.vx = 0;
            //this.vy = 0;
            return true;
        }

    }

    detectCollision_(brick, vx, vy){
        let testX = this.x;
        let testY = this.y;

        if(this.x < brick.x)                            testX = brick.x;
        else if(this.x > (brick.x + brick.width))       testX = brick.x + brick.width;
        if(this.y < brick.y)                            testY = brick.y;
        else if(this.y > (brick.y + brick.height))      testY = brick.y + brick.width;

        let distX = (this.x + vx) - testX;
        let distY = (this.y + vy) - testY;
        let distance = Math.sqrt((distX * distX) + (distY * distY)) ;

        if(distance < this.r){
            this.isColliding = true;
            //this.vx = 0;
            //this.vy = 0;
            return true;
        }



    }

}

export {Brick, Pacman, gameobjects, defaults}
