import {keys} from './controller.js';

let defaults = {
    w: 20,
    h: 20,
    r: 9,
    v: 0.5
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

        this.gotoY = 0;
        this.gotoX = 0;

        this.states = {
            moving: '',
            nextMove: '',
            valid: true,
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
        //console.log(this.states)
        this.x += this.vx;
        this.y += this.vy;

        this.executeState();
        
        
        //this.checkNextMove();

    }


    updateStates(){
    
        if(keys.checkkey === 'up'){
            this.states.moving = 'up';
        }

        else if(keys.checkkey === 'down'){
            this.states.moving = 'down';
        }

    }

    executeState(){
        if(this.states.moving === 'up'){
            if(this.loopBrickCollisions(0, 'top')){
                this.stop();
            }
            else{
                this.vy = defaults.v * -1;
                this.vx = 0;    
            }

            //for next move 
            for(let i = 0; i < gameobjects.spaceList.length; i++){
                let space = gameobjects.spaceList[i];
                //check for spaces at the top of pacman
                if(this.checkCollisions(space, 0) === 'top'){
                    // if the current y position is within the center of the space
                    if(this.y >= (space.y + (space.width / 2)) || this.y <= (space.y + (space.width / 2))){
                       //console.log(space.y + (space.width / 2))
                       if(!this.checkRectCollisions(space)){
                            //this.y = space.y + (space.width / 2)
                            this.gotoY = space.y + (space.width / 2)
                           
                       }
                       
                       
                      // console.log(space)
                    }
                   
                }
            }

            if(Math.abs(this.gotoY - this.y) <= 0.5){
                this.y = this.gotoY;
            }
        }
        else if(this.states.moving === 'down'){
            for(let i = 0; i < gameobjects.bricksList.length; i++){
                let brick = gameobjects.bricksList[i];
                if(this.checkCollisions(brick, 0) === 'bottom'){
                    this.stop();
                    break;
                }
                else{
                    this.vy = defaults.v * 1;
                    this.vx = 0;
                }
            }
        }
    }

    stop(){
        this.vx = 0;
        this.vy = 0;
    }

    loopBrickCollisions(r, collision_side){

        for(let i = 0; i < gameobjects.bricksList.length; i++){
            let brick = gameobjects.bricksList[i];
            if(this.checkCollisions(brick, r) === collision_side){
                return true;
            }
        }

        return false;
    }

    checkCollisions(brick, r){
        let testX = this.x;
        let testY = this.y;
        let collision_side = '';

        if(this.x < brick.x){
            testX = brick.x;
            collision_side = 'right';   //right of pacman; left of brick
        }                            
        else if(this.x > (brick.x + brick.width)){
            testX = brick.x + brick.width;
            collision_side = 'left';    //left of pacman; right of brick
        } 
        if(this.y < brick.y){
            testY = brick.y;
            collision_side = 'bottom'; //bottom of pacman; top of brick
        }                          
        else if(this.y > (brick.y + brick.height)){
            testY = brick.y + brick.width;
            collision_side = 'top';    //top of pacman; bottom of brick
        }      

        let distX = (this.x + this.vx) - testX ;
        let distY = (this.y + this.vy) - testY ;
        let distance = Math.sqrt((distX * distX) + (distY * distY)) ;

        if(distance <= this.r + r  ){
            
            return collision_side
        }
       
        return ''
    }

    checkRectCollisions(space){
        
        let rightEdge = space.x + space.w + 2;

        for(let i = 0; i < gameobjects.bricksList.length; i++){
            let brick = gameobjects.bricksList[i];
            //right brick check; if true; then cannot pass to the right;
            if((space.x) + 20 === brick.x && space.y === brick.y){ 
                return true;
            }
        }
        return false;
        //console.log(false)
    }


}

export {Brick, Pacman, Space, gameobjects, defaults};