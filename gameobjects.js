import {keys} from './controller.js';

let defaults = {
    w: 20,
    h: 20,
    r: 9,
    v: 0.5
}

let directions = {
    up: null,
    down: null,
    left: null,
    right: null
}

let gameobjects = {
    bricksList: [],
    spaceList: [],
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

class Space extends GameObject { 
    constructor(ctx, x, y){
        super(ctx, x, y);
        this.width = defaults.w;
        this.height = defaults.h;
        
    }

    draw(){    
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
    }

}

class Pacman extends GameObject{
    constructor(ctx, x, y){
        super(ctx, x, y);
        this.r = defaults.r;
        this.vx = 0;
        this.vy = 0;

        this.curSpace = null;

        this.states = {
            moving: '',
            nextMove: '',
        }
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
        this.ctx.closePath();

    }

    update(){
       // console.log(directions)
        console.log(this.states)
        this.x += this.vx;
        this.y += this.vy;

        this.getCurSpace();
        this.checkDirections();
        this.executeMovementState();
        this.checkNextMove();

    }


    updateStates(){
        if(keys.checkkey === 'up' && directions.up){
            //making sure pacman is centered since even if the directions are true, pacman will get stuck 
            //because he's not centered
            if(Math.abs((this.curSpace.x + 10) - this.x) <= 1 - defaults.v){
                this.states.moving = 'up';
                this.states.nextMove = '';
                
            }

        }
        else if(keys.checkkey === 'down' && directions.down){
            if(Math.abs((this.curSpace.x + 10) - this.x) <= 1 - defaults.v){
                this.states.moving = 'down'
                this.states.nextMove = '';
                
            }
 
        }
        else if(keys.checkkey === 'left' && directions.left){
            
            if(Math.abs((this.curSpace.y + 10) - this.y) <= 1 - defaults.v){
                this.states.moving = 'left'
                this.states.nextMove = '';
                
            }
        }
        else if(keys.checkkey === 'right' && directions.right){
            if(Math.abs((this.curSpace.y + 10) - this.y) <= 1 - defaults.v){
                this.states.moving = 'right'
                this.states.nextMove = '';
            }
           
        }
     
        this.states.nextMove = keys.checkkey;
        
        
    }

    //keep checking next move
    checkNextMove(){
        if(this.states.nextMove === 'right' && directions.right){
            if(Math.abs((this.curSpace.y + 10) - this.y) <= 1 - defaults.v){
                this.changeToNextMove();
            }
        }
        else if(this.states.nextMove === 'left' && directions.left){
            if(Math.abs((this.curSpace.y + 10) - this.y) <= 1 - defaults.v){
                this.changeToNextMove();
            }
        }
        else if(this.states.nextMove === 'up' && directions.up){
            if(Math.abs((this.curSpace.x + 10) - this.x) <= 1 - defaults.v){
                this.changeToNextMove();
            }
        }
        else if(this.states.nextMove === 'down' && directions.down){
            if(Math.abs((this.curSpace.x + 10) - this.x) <= 1 - defaults.v){
                this.changeToNextMove();
            }
        }
    }


    //get the space pacman is currently on
    getCurSpace(){
        for(let i = 0; i < gameobjects.spaceList.length; i++){
            let space = gameobjects.spaceList[i];
            if(this.checkCollisions(space, 0)){
                this.curSpace = space;
                break;
            }
        }
     
    }

    //check all four directions if passable or not
    checkDirections(){
        let testX = this.curSpace.x;
        let testY = this.curSpace.y;

        for(let i = 0; i < gameobjects.bricksList.length; i++){
            let brick = gameobjects.bricksList[i];
            //console.log(brick)
            if(testX - 20 === brick.x && testY === brick.y){
                //directions.left = brick;
                directions.left = false;
            }
            else if(testX + 20 === brick.x && testY === brick.y){
                //directions.right = brick;
                directions.right = false;
            }
            else if(testX === brick.x && testY + 20 === brick.y){
                //directions.down = brick;
                directions.down = false;
            }
            else if(testX === brick.x && testY - 20 === brick.y){
                //directions.up = brick;
                directions.up = false;
            }
        }

        for(let i = 0; i < gameobjects.spaceList.length; i++){
            let space = gameobjects.spaceList[i];
            if(testX - 20 === space.x && testY === space.y){
                //directions.left = space;
                directions.left = true;
            }
            else if(testX + 20 === space.x && testY === space.y){
                //directions.right = space;
                directions.right = true;
            }
            else if(testX === space.x && testY + 20 === space.y){
                //directions.down = space;
                directions.down = true;
            }
            else if(testX === space.x && testY - 20 === space.y){
                //directions.up = space;
                directions.up = true; 
            }
        }

       // console.log(directions)
    }
    
    //movement velocity controls
    executeMovementState(){
        for(let i = 0; i < gameobjects.bricksList.length; i++){
            let brick = gameobjects.bricksList[i];

            if(this.checkCollisions(brick, 0)){
                this.stop();
                break;
            }
            else{
                if(this.states.moving === 'up'){
                    this.vy = defaults.v * -1;
                    this.vx = 0;
                }
                else if(this.states.moving === 'down'){
                    this.vy = defaults.v * 1;
                    this.vx = 0;
                }
                else if(this.states.moving === 'right'){
                    this.vx = defaults.v * 1;
                    this.vy = 0;
                }
                else if(this.states.moving === 'left'){
                    this.vx = defaults.v * -1;
                    this.vy = 0;
                }
            }
        }


    }

    //stop and change next move
    stop(){
        this.vx = 0;
        this.vy = 0;

        this.changeToNextMove();
    }

    //change current movement state to next state
    changeToNextMove(){
        if(this.states.nextMove !== ''){
            this.states.moving = this.states.nextMove;
            this.states.nextMove = '';
        }
        else{
            this.states.moving = '';
            this.states.nextMove = '';
        }
    }

    //circle - rectangle collision detection
    checkCollisions(object, r){
        let testX = this.x;
        let testY = this.y;

        if(this.x < object.x){  
            testX = object.x;
        }                            
        else if(this.x > (object.x + object.width)){
            testX = object.x + object.width;
        } 
        if(this.y < object.y){
            testY = object.y;
        }                          
        else if(this.y > (object.y + object.height)){
            testY = object.y + object.width;
        }      

        let distX = (this.x + this.vx) - testX ;
        let distY = (this.y + this.vy) - testY ;
        let distance = Math.sqrt((distX * distX) + (distY * distY)) ;

        if(distance <= this.r + r  ){
            
            return true
        }
       
        return false
    }


}

export {Brick, Pacman, Space, gameobjects, defaults};