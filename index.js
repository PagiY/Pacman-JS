//to build
//have JS display the world -- done
//have the pacman move up and down --done
//create brick object which has all the properties of bricks from getBoundingClientRect()

//pacman position; initial position displayed
var pacman = {
    x: 28,
    y: 28,
    direction: "right",
}

function getRandomNumber(min, max){

    min = Math.floor(min);
    
    max = Math.floor(max);
    
    let result = Math.floor(Math.random() * (max - min + 1) + min);
    
    console.log(result);
    
    return result;
}

var row = getRandomNumber(10, 20);
var col = getRandomNumber(10, 20);

function generateEmptyMaze(){
    let maze = []

    for(let i = 0; i < row; i++){

        

        maze.push([]);

        for(let j = 0; j < col; j++){

            if(i === 0 || i === row - 1 || j === 0 || j === col - 1){
                
                maze[i].push(2);

            }
            else{
                maze[i].push(0);
            }

        }
    }

    return maze;
}

let world = generateEmptyMaze()
// let world = [
    
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,2,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
// ]
//    [2,2,2,2,2,2,2,2,2,2,2,2],
//    [2,0,2,0,0,0,0,0,0,0,0,2],
//    [2,0,2,0,0,0,0,0,0,0,0,2],
//    [2,0,2,2,2,2,0,0,0,0,0,2],
//    [2,0,0,0,0,0,0,0,0,0,0,2],
//    [2,2,2,2,2,2,2,2,2,2,2,2]
//] 

//= generateEmptyMaze()

function randomizedBFS(){
    
    init_row = getRandomNumber(1, row - 2);
    init_col = getRandomNumber(1, col - 2);

//world[init_width][init_height] = 3


    world[init_row][init_col] = 3

    let top_neighbor = init_row - 1;
    let down_neighbor = init_row + 1;
    let left_neighbor = init_col - 1;
    let right_neighbor = init_col + 1;

    console.log(`Top Neighbor: ${top_neighbor}`)


    
}


//randomizedBFS()

//display the world
function displayWorld(){
    var output = '';

    for(var i = 0; i < world.length; i++){

        output += "<div class = 'row'>"

        for(var j = 0; j < world[i].length; j++){
            
            if(world[i][j] === 0){
                output += "<div class = 'empty'></div>"
            }
            else if(world[i][j] === 1){
                output += "<div class = 'coin'></div>"
            }
            else if(world[i][j] === 2){
                output += "<div class = 'brick'></div>"
            }
            else{
                output += "<div class = 'visited'></div>"
            }
            
            
        }

        output += "</div>"
    }

    document.getElementById('world').innerHTML = output;

    const empty = document.getElementsByClassName("empty")
    let index = getRandomNumber(0, empty.length - 1)
    let rect = empty[index].getBoundingClientRect();
    pacman.x = rect.x
    pacman.y = rect.y

}

const bricks = document.getElementsByClassName("brick");

function isColliding(object){
    
    if(object === 'brick'){
        //loop through all bricks and compute 
        for(let i = 0; i < bricks.length; i++){
            let rect = bricks[i].getBoundingClientRect()

            //i want to check their distances by logging
            // console.log(`Pacman x: ${Math.trunc(pacman.x)}`)
            // console.log(`rect.x - rect.width:${Math.trunc((rect.x - rect.width))}`)
            // console.log(`rect.x + rect.width:${Math.trunc(rect.x + rect.width)}`)
            // console.log('\n')
            // console.log(`Pacman y: ${Math.trunc(pacman.y)}`)
            // console.log(`rect.y - rect.height:${Math.trunc(rect.y - rect.height)}`)
            // console.log(`rect.y + rect.height:${Math.trunc(rect.y + rect.height)}`)
            // console.log('\n')

            if (Math.trunc(pacman.x) > Math.trunc(rect.x - rect.width) && Math.trunc(pacman.x) < Math.trunc(rect.x + rect.width)
            && (Math.trunc(pacman.y) > Math.trunc(rect.y - rect.height) && Math.trunc(pacman.y) < Math.trunc(rect.y + rect.height))){
                //force pacman position? TODO: smoothen force position. Something to do with velocity
                if(pacman.direction === 'right'){
                    pacman.x = (rect.x - rect.width);
                }
                else if(pacman.direction === 'left'){
                
                    pacman.x = (rect.x + rect.width);
                }
                else if(pacman.direction ==='up'){
                    pacman.y = (rect.y + rect.height); 
                    
                }
                else if(pacman.direction === 'down'){
                    pacman.y = (rect.y - rect.height);
                }   
                
                return true;
            }

        }       

        return false;
    }

    else if(object ==='coin'){

    }
    
        
}



function displayPacman(){

    document.getElementById("pacman").style.backgroundImage = "url('assets/pacman-"+ pacman.direction+".gif')";

    document.getElementById("pacman").style.left = pacman.x + "px";
    document.getElementById("pacman").style.top  = pacman.y + "px";


}

displayWorld()
displayPacman()

//velocity; i think it should be speed?
var velocity = 3;

//user keys
document.onkeydown = function(e){
    if(e.keyCode === 40){ //down

        if(!isColliding('brick')){
            pacman.y = pacman.y + velocity;
            pacman.direction = "down";
        }
        
    }

    else if(e.keyCode === 38){ //up

        if(!isColliding('brick')){
            pacman.y = pacman.y - velocity;
            pacman.direction = "up";
        }

    }

    else if(e.keyCode === 39){ // right

        if(!isColliding('brick')){
            pacman.x = pacman.x + velocity;
            pacman.direction = "right";
        }

    }

    else if(e.keyCode === 37){ //left

        if(!isColliding('brick')){
            pacman.x = pacman.x - velocity;
            pacman.direction = "left";
        }

    }

    displayPacman();

}

setInterval()