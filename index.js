
let w = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2,1],
    [1,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,3,2,2,1,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,1,1,5,1,1,2,2,2,2,2,2,2,1],
    [1,2,2,2,1,4,4,4,1,2,2,2,2,2,2,2,1],
    [1,2,2,2,1,4,4,4,1,2,2,2,2,2,2,2,1],
    [1,2,2,2,1,1,1,1,1,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

]


let worlds = {
    1 : [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1]
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],

    2 : [
        []
    ],

    3 : [
        []
    ],

    4 : [
        []
    ],

    5 : [ 
        []
    ]
}

let world = w;


let pacman = {
    x: 1,
    y: 1,
    v: 1,
}

//states = [normal, wait, moveOut, eaten, chase];
//status = [normal, scared];

let ghosts = {
    blinky : {
        x: 1,
        y: 1,
        v: 1,
        speed: 1000,        
        state: 'normal',
        status: 'normal' ,
        curDir: '',         
    },
    clyde : {
        x: 1,
        y: 1,
        v: 1,
        speed: 1000,
        state: 'wait',
        status: 'normal',
        curDir: ''          
    },
    inky : {
        x: 1,
        y: 1,
        v: 1,
        speed: 1000,
        state: 'wait',
        status: 'normal',
        curDir: ''
    },
    pinky : {
        x: 1,
        y: 1,
        v: 1,
        speed: 1000,
        state: 'wait',
        status: 'normal',
        curDir: ''
    }
}

let directions = ['up', 'down', 'left', 'right'];
let keyPressed = 'right';


function displayWorld(){

    let output = "";

    for(let i = 0; i < world.length; i++){
    
        output += "<div class = 'row'>";

        for(let j = 0; j < world[i].length; j++){
            
            
            if(world[i][j] == 0){
                output += "<div class = 'empty'></div>";
            }
            else if(world[i][j]== 1) {
                output += "<div class = 'brick'></div>";
            }
            else if(world[i][j]== 2){
                output += "<div class = 'coin'></div>";
            }
            else if(world[i][j] === 3){
                output += "<div class = 'cherry'></div>";
            }
            else if(world[i][j] === 4){
                output += "<div class = 'cage'></div>";
            }
            else if(world[i][j] === 5){
                output += "<div class = 'gate'></div>";
            }
        }
        
        output += "</div>";
    }
    

    document.getElementById('world').innerHTML = output;
}

//initializations function call
displayWorld();
initGhosts();
initPacmanPosition();


//user keys and collision detection
document.onkeydown = function(e){

    let checkX;
    let checkY;
    let invalid_key = false;

    switch(e.keyCode){
        case 38:
            checkY = pacman.y - pacman.v;
            checkX = pacman.x
            break;
        case 37:
            checkY = pacman.y;
            checkX = pacman.x - pacman.v
            break;
        case 39:
            checkY = pacman.y;
            checkX = pacman.x + pacman.v; 
            break;
        case 40:
            checkY = pacman.y + pacman.v;
            checkX = pacman.x
            break;
        default:
            invalid_key = true;
            console.log('Invalid key!')
        
    }

    
    if(checkCollision(checkX, checkY, true) && !invalid_key){   //if no collision, proceed
        switch(e.keyCode){
            case 38:
                keyPressed = 'up';
                pacman.y -= pacman.v;
                break;
            case 37:
                keyPressed = 'left';
                pacman.x -= pacman.v;
                break;
            case 39:
                keyPressed = 'right';
                pacman.x += pacman.v;
                break;
            case 40:
                keyPressed = 'down';
                pacman.y += pacman.v;
                break;
        }
        displayWorld();
        displayPacman();
    }
    

}

//initialization functions
function initPacmanPosition(){
    let empties = document.getElementsByClassName("coin");

    let index = Math.floor(Math.random() * empties.length);

    let empty = empties[index].getBoundingClientRect()

    let x = empty.x / 20;
    let y = empty.y / 20;

    pacman.x = x;
    pacman.y = y;

    world[y][x] = 0;

    displayWorld();
    displayPacman();
}

function initGhosts(){
    let ghs = document.getElementsByClassName("ghosts");
    let empties = document.getElementsByClassName("coin");
    let cages   = document.getElementsByClassName("cage");

    let cage_counter = 0
    for(let i = 0; i < ghs.length; i++){
        
        if(ghs[i].id === 'blinky'){
            let index = Math.floor(Math.random() * empties.length);
            let empty = empties[index].getBoundingClientRect()

            let x = empty.x / 20;
            let y = empty.y / 20;

            ghosts.blinky.x = x;
            ghosts.blinky.y = y;

            ghs[i].style.left = (x * 20) + "px";
            ghs[i].style.top = (y * 20) + "px";

        }
        else{
            
            //let index = Math.floor(Math.random() * cages.length);
            let cage = cages[cage_counter].getBoundingClientRect();

            let x = cage.x / 20;
            let y = cage.y / 20;

            ghs[i].style.left = (x * 20) + "px";
            
            if(ghs[i].id === "inky"){
                ghosts.inky.x = x;
                ghosts.inky.y = y + 1;
                ghs[i].style.top  = (ghosts.inky.y * 20) + "px";
                ghosts.inky.curDir = 'down';
            }
            else if(ghs[i].id === "pinky"){
                ghosts.pinky.x = x;
                ghosts.pinky.y = y;
                ghs[i].style.top  = (ghosts.pinky.y * 20) + "px";
                ghosts.pinky.curDir = 'up';
            }
            else if(ghs[i].id === "clyde"){
                ghosts.clyde.x = x;
                ghosts.clyde.y = y ;
                ghs[i].style.top  = (ghosts.clyde.y * 20) + "px";
                ghosts.clyde.curDir = 'up';
            }
            
            cage_counter+=1;
            
        }
        
    }
    displayWorld();

    //set initial direction for blinky
    randomValidDirection(ghosts.blinky);
    
}

function displayPacman(){
    //+ 50 for margin , could use better method...
    document.getElementById("pacman").style.left = (pacman.x * 20) + "px";
    document.getElementById("pacman").style.top = (pacman.y * 20) + "px";
 
    document.getElementById("pacman").style.backgroundImage = "url(assets/pacman-" + keyPressed + ".gif)";

}

function displayGhost(ghost, name){
    document.getElementById(name).style.left = (ghost.x * 20) + "px";
    document.getElementById(name).style.top = (ghost.y * 20) + "px";
    
    if(ghost.status === "scared"){
        document.getElementById(name).style.backgroundImage = "url(assets/pacman-art/ghosts/blue_ghost.png)";
    }
    else{
        document.getElementById(name).style.backgroundImage = "url(assets/pacman-art/ghosts/" + name + ".png)";
    }

}

//collision check
function checkCollision(checkX, checkY, isPacman){

    if(world[checkY][checkX] === 0){        //if space
        return true;
    }
    else if(world[checkY][checkX] === 1){   //if brick
        return false;
    }       
    else if(world[checkY][checkX] === 2){   //if coin
        if(isPacman){
            world[checkY][checkX] = 0;
        }
        return true;
    }
    else if(world[checkY][checkX] === 3){   //if cherry
        if(isPacman){
            world[checkY][checkX] = 0;
            triggerScaredStatus();
        }
        return true;
    }
    
    
}

//ghost movements
function moveGhost(ghost){
    switch(ghost.curDir){
        case 'up':
            ghost.y -= ghost.v;
            break;
        case 'left':
            ghost.x -= ghost.v;
            break;
        case 'right':
            ghost.x += ghost.v;
            break;
        case 'down':
            ghost.y += ghost.v;
            break;
    }
}

function randomValidDirection(ghost){
    let hasDir = false;
    //set initial direction for blinky
    while(!hasDir){
        //get random direction
        let directions = ['up', 'down', 'left', 'right']
        let index = Math.floor(Math.random() * directions.length);
        
        let checkX;
        let checkY;


        //check random directions' coordinates
        switch(directions[index]){
            case 'up':
                checkY = ghost.y - ghost.v;
                checkX = ghost.x
                break;
            case 'left':
                checkY = ghost.y;
                checkX = ghost.x - ghost.v
                break;
            case 'right':
                checkY = ghost.y;
                checkX = ghost.x + ghost.v; 
                break;
            case 'down':
                checkY = ghost.y + ghost.v;
                checkX = ghost.x;
                break;
        
        }

        if(checkCollision(checkX, checkY, false)){
            ghost.curDir = directions[index];
            hasDir = true;
        }
    }
}

function triggerScaredStatus(){

    let scaredTimer;

    scaredStatus(ghosts.blinky, true);
    scaredStatus(ghosts.clyde, true);
    scaredStatus(ghosts.inky, true);
    scaredStatus(ghosts.pinky, true);


    scaredTimer = setInterval(function(){
        ghosts.blinky.status = "normal";
        ghosts.inky.status = "normal";
        ghosts.pinky.status = "normal";
        ghosts.clyde.status = "normal";
    
        clearInterval(scaredTimer);
    }, 15000)

}


//enemy states 
function normalState(ghost){
    
    //scan  
    let checkX;
    let checkY;
    
    switch(ghost.curDir){
        case 'up':
            checkY = ghost.y - ghost.v;
            checkX = ghost.x
            break;
        case 'left':
            checkY = ghost.y;
            checkX = ghost.x - ghost.v
            break;
        case 'right':
            checkY = ghost.y;
            checkX = ghost.x + ghost.v; 
            break;
        case 'down':
            checkY = ghost.y + ghost.v;
            checkX = ghost.x
            break;
        
    }
    
    if(checkCollision(checkX, checkY, false)){
        moveGhost(ghost);
    }
    else{
        
        let newDir = [];
        for(let i = 0; i < directions.length; i++){
            if(directions[i] === ghost.curDir){
                continue;
            }
            else{
                newDir.push(directions[i]);
            }
        }
        //let directions = ['up', 'down', 'left', 'right']
        let index = Math.floor(Math.random() * newDir.length);
        
        ghost.curDir = newDir[index];
    
    }
}

function chaseState(){
    //TODO: follow pacman only when within the same x or y 
}

function scaredStatus(ghost, transitioning){
    //TODO: reverse direction and slow down movement while in this state

    if(transitioning){

        if(ghost.curDir === 'up'){
            //check reverse direction if passable
            let checkX = ghost.x;
            let checkY = ghost.y + 1;
            if(checkCollision(checkX, checkY, false)){
                ghost.curDir = 'down';
            }
        }
        else if(ghost.curDir === 'down'){
            //check reverse direction if passable
            let checkX = ghost.x;
            let checkY = ghost.y - 1;
            if(checkCollision(checkX, checkY, false)){
                ghost.curDir = 'up';
            }
        }
        else if(ghost.curDir === 'right'){
            //check reverse direction if passable
            let checkX = ghost.x - 1;
            let checkY = ghost.y;
            if(checkCollision(checkX, checkY, false)){
                ghost.curDir = 'left';
            }
        }
        else if(ghost.curDir === 'left'){
            //check reverse direction if passable
            let checkX = ghost.x + 1;
            let checkY = ghost.y;
            if(checkCollision(checkX, checkY, false)){
                ghost.curDir = 'right';
            }
        }
        else{
            //if all else fails, choose random direction
            randomValidDirection(ghost);
        }
          
    }

    ghost.status = "scared";

}

function eatenState(){
    //TODO: A* pathfinding: move fast back to cage
}

function waitState(ghost){
    if(ghost.curDir === 'down'){
        ghost.curDir = 'up';
    }
    else if(ghost.curDir === 'up'){
        ghost.curDir = 'down';
    }
    moveGhost(ghost)
}   

function toNormalState(){
   
}

function moveOutofWaitState(ghost){
    //pathfind up to gate + y-1 then go back to normal
}

//enemy states controllers
function moveBlinky(){
    
    if(ghosts.blinky.state === 'normal'){
        ghosts.blinky.speed = 500;
        normalState(ghosts.blinky);
    }


    displayGhost(ghosts.blinky, "blinky");
}

function moveClyde(){
    if(ghosts.clyde.state === 'normal'){
        ghosts.clyde.speed = 500;
        normalState(ghosts.clyde);
    }
    else if(ghosts.clyde.state === 'wait'){
        ghosts.clyde.speed = 500;   //speed when in wait state
        waitState(ghosts.clyde);
    }


    displayGhost(ghosts.clyde, "clyde");
    
}

function moveInky(){
    if(ghosts.inky.state === 'normal'){
        ghosts.inky.speed = 500;
        normalState(ghosts.inky);
    }
    else if(ghosts.inky.state === 'wait'){
        ghosts.inky.speed = 500;
        waitState(ghosts.inky);
    }
 

    displayGhost(ghosts.inky, "inky");

}

function movePinky(){
    if(ghosts.pinky.state === 'normal'){
        ghosts.clyde.speed = 500;
        normalState(ghosts.pinky);
    }
    else if(ghosts.pinky.state === 'wait'){
        ghosts.clyde.speed = 500;
        waitState(ghosts.pinky);
    }


    displayGhost(ghosts.pinky, "pinky");

}



function intervalController(){
    setInterval(moveBlinky, ghosts.blinky.speed);
    setInterval(moveClyde,  ghosts.clyde.speed);
    setInterval(moveInky,   ghosts.inky.speed);
    setInterval(movePinky,  ghosts.pinky.speed);


}

intervalController();