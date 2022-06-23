import {keys} from './controller.js';

let defaults = {
    w: 20,
    h: 20,
    r: 9,
    v: 0.5,
    blinky_v: 0.5
}

let gameobjects = {
    bricksList: [],
    spaceList: [],
    coinsList: [],
    pacman: null,
    blinky: null,
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

class Coin extends GameObject{
    constructor(ctx, x, y){
        super(ctx, x, y);
        this.r = 1.5;
        this.accessible = true;
    }

    draw(){
        if(this.accessible){
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgb(210,180,140)';
            this.ctx.fill();
            this.ctx.closePath();
        }
        else{
            this.ctx.fillStyle = 'rgba(210,180,140, 0)';
            this.ctx.fill();
        }
        

    }

    remove(){
        this.accessible = false;
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

        this.directions = {
            up: null,
            down: null,
            left: null,
            right: null
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
       // console.log(this.states)
        this.x += this.vx;                  //x velocity + xpos
        this.y += this.vy;                  //y velocity + ypos

        this.getCurSpace();                 //get the current space pacman is currently in
        this.checkDirections();             //check all four directions where pacman can move
        this.executeMovementState();        //default movement state: moving to where this.states.moving is currently heading
        this.checkNextMove();               //keep checking for next move and execute next move once a window for movement is available
        this.checkCoins();                  //check for coins

    }


    updateStates(){
        if(keys.checkkey === 'up' && this.directions.up){
            //making sure pacman is centered since even if the directions are true, pacman will get stuck 
            //because he's not centered
            if(Math.abs((this.curSpace.x + 10) - this.x) <= 1 - defaults.v){
                this.states.moving = 'up';
                this.states.nextMove = '';
                
            }

        }
        else if(keys.checkkey === 'down' && this.directions.down){
            if(Math.abs((this.curSpace.x + 10) - this.x) <= 1 - defaults.v){
                this.states.moving = 'down'
                this.states.nextMove = '';
                
            }
 
        }
        else if(keys.checkkey === 'left' && this.directions.left){
            
            if(Math.abs((this.curSpace.y + 10) - this.y) <= 1 - defaults.v){
                this.states.moving = 'left'
                this.states.nextMove = '';
                
            }
        }
        else if(keys.checkkey === 'right' && this.directions.right){
            if(Math.abs((this.curSpace.y + 10) - this.y) <= 1 - defaults.v){
                this.states.moving = 'right'
                this.states.nextMove = '';
            }
           
        }
     
        this.states.nextMove = keys.checkkey;
        
        
    }

    //keep checking next move
    checkNextMove(){
        if(this.states.nextMove === 'right' && this.directions.right){
            if(Math.abs((this.curSpace.y + 10) - this.y) <= 1 - defaults.v){
                this.changeToNextMove();
            }
        }
        else if(this.states.nextMove === 'left' && this.directions.left){
            if(Math.abs((this.curSpace.y + 10) - this.y) <= 1 - defaults.v){
                this.changeToNextMove();
            }
        }
        else if(this.states.nextMove === 'up' && this.directions.up){
            if(Math.abs((this.curSpace.x + 10) - this.x) <= 1 - defaults.v){
                this.changeToNextMove();
            }
        }
        else if(this.states.nextMove === 'down' && this.directions.down){
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
                this.directions.left = false;
            }
            else if(testX + 20 === brick.x && testY === brick.y){
                //directions.right = brick;
                this.directions.right = false;
            }
            else if(testX === brick.x && testY + 20 === brick.y){
                //directions.down = brick;
                this.directions.down = false;
            }
            else if(testX === brick.x && testY - 20 === brick.y){
                //directions.up = brick;
                this.directions.up = false;
            }
        }

        for(let i = 0; i < gameobjects.spaceList.length; i++){
            let space = gameobjects.spaceList[i];
            if(testX - 20 === space.x && testY === space.y){
                //directions.left = space;
                this.directions.left = true;
            }
            else if(testX + 20 === space.x && testY === space.y){
                //directions.right = space;
                this.directions.right = true;
            }
            else if(testX === space.x && testY + 20 === space.y){
                //directions.down = space;
                this.directions.down = true;
            }
            else if(testX === space.x && testY - 20 === space.y){
                //directions.up = space;
                this.directions.up = true; 
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

    checkCoins(){
        let distX;
        let distY;
        let dist;
        let coin;
        for(let i = 0; i < gameobjects.coinsList.length; i++){
            coin = gameobjects.coinsList[i];
            if(!coin.accessible){
                continue;
            }
            distX = coin.x - this.x;
            distY = coin.y - this.y;
            
            dist = Math.sqrt((distX * distX) + (distY * distY))
            if(dist <= this.r){
                coin.remove();
            }
        }

        
    }


}

class Blinky extends GameObject{
    constructor(ctx, x, y){
        super(ctx, x, y);
        this.width = defaults.w ;
        this.height = defaults.h ;
        this.vx = 0;
        this.vy = 0;
        this.x += 1
        this.y += 1
        this.curSpace = null

        this.directions = {
            up: null,
            down: null,
            left: null,
            right: null
        }

        this.states = {
            moving: null,
            nextMove: null,
        }

        this.dirArr = Object.keys(this.directions)
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.getCurSpace();
        
        console.log(this.states)
        this.sensePacman();
        this.checkDirections();
        this.executeMovementState();
    }

    draw(){    
        this.ctx.fillStyle = 'rgb(255, 0, 0)';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
    }

    randomState(){
        let index = Math.floor(Math.random() * this.dirArr.length);
        let movement = this.dirArr[index]

        //this.states.moving = movement;
        //console.log(this.states.moving)
        
    }


    //get the space blinky is currently on
    getCurSpace(){
        for(let i = 0; i < gameobjects.spaceList.length; i++){
            let space = gameobjects.spaceList[i];
            
            if(this.checkCollisions(space, 0)){
                this.curSpace = space;
                //console.log(space)
                break;
            }
        }
     
    }

       // movement velocity controls
       executeMovementState(){
        for(let i = 0; i < gameobjects.bricksList.length; i++){
            let brick = gameobjects.bricksList[i];

            if(this.checkCollisions(brick, 0)){
                this.stop();
                break;
            }
            else{
                if(this.states.moving === 'up'){
                    this.vy = defaults.blinky_v * -1;
                    this.vx = 0;
                }
                else if(this.states.moving === 'down'){
                    this.vy = defaults.blinky_v * 1;
                    this.vx = 0;
                }
                else if(this.states.moving === 'right'){
                    this.vx = defaults.blinky_v * 1;
                    this.vy = 0;
                }
                else if(this.states.moving === 'left'){
                    this.vx = defaults.blinky_v * -1;
                    this.vy = 0;
                }
            }
        }


    }

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
           // this.randomState();
            //this.states.moving = '';
            //this.states.nextMove = '';
        }
    }

    //rect and rect collisions
    checkCollisions(object){
        if(this.x + this.width -1.5>= object.x &&
           this.x <= object.x + object.width &&
           this.y + this.height -1.5>= object.y &&
           this.y <= object.y + object.height){
            
                return true;
        }

        return false
    }

    //check all four directions if passable or not
    checkDirections(){
        let testX = this.curSpace.x;
        let testY = this.curSpace.y;

        for(let i = 0; i < gameobjects.bricksList.length; i++){
            let brick = gameobjects.bricksList[i];
            if(testX - 20 === brick.x && testY === brick.y){
                this.directions.left = false;
            }
            else if(testX + 20 === brick.x && testY === brick.y){
                this.directions.right = false;
            }
            else if(testX === brick.x && testY + 20 === brick.y){
                this.directions.down = false;
            }
            else if(testX === brick.x && testY - 20 === brick.y){
                this.directions.up = false;
            }
        }

        for(let i = 0; i < gameobjects.spaceList.length; i++){
            let space = gameobjects.spaceList[i];
            if(testX - 20 === space.x && testY === space.y){
                this.directions.left = true;
            }
            else if(testX + 20 === space.x && testY === space.y){
                this.directions.right = true;
            }
            else if(testX === space.x && testY + 20 === space.y){
                this.directions.down = true;
            }
            else if(testX === space.x && testY - 20 === space.y){
                this.directions.up = true; 
            }
        }
    }

    sensePacman(){
        let dist = this.pacmanDistance();
   
        if(dist <= gameobjects.pacman.r){
            //pacman caught; gameover;
        }
        else if(dist <= 30){
            //follow
        }
    }

    followPacman(){

    }

    pacmanDistance(){
        let testX = gameobjects.pacman.x
        let testY = gameobjects.pacman.y;
    
        if(gameobjects.pacman.x < this.x){  
            testX = this.x;
        }                            
        else if(gameobjects.pacman.x > (this.x + this.width)){
            testX = this.x + this.width;
        } 

        if(gameobjects.pacman.y < this.y){
            testY = this.y;
        }                          
        else if(gameobjects.pacman.y > (this.y + this.height)){
            testY = this.y + this.height;
        }      
    
        let distX = gameobjects.pacman.x - testX ;
        let distY = gameobjects.pacman.y - testY ;
        let distance = Math.sqrt((distX * distX) + (distY * distY)) ;
        
        return distance;
        // if(distance <= gameobjects.pacman.r ){
        //     //pacman caught
        //    // return true
        // }
           
        //return false
    }


}
export {Brick, Space, Coin, Pacman, Blinky, gameobjects, defaults};