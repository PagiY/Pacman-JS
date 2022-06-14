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
randomizedBFS()

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

    let rect = empty[0].getBoundingClientRect();
    pacman.x = rect.x
    pacman.y = rect.y
    //for (let i = 0; i < empty.length; i++) {
    //     let item = empty[i];
    //    let rect = item.getBoundingClientRect()
    //    pacman.x = rect.x
    //    pacman.y = rect.y
    //}

}

function displayPacman(){

    document.getElementById("pacman").style.backgroundImage = "url('assets/pacman-"+ pacman.direction+".gif')";

    document.getElementById("pacman").style.left = pacman.x + "px";
    document.getElementById("pacman").style.top  = pacman.y + "px";

}

displayWorld()
displayPacman()

//velocity; i think it should be speed?
var velocity = 2;

//user keys
document.onkeydown = function(e){
    if(e.keyCode === 40){ //down
        pacman.y = pacman.y + velocity;
        pacman.direction = "down";
        displayPacman();
    }

    else if(e.keyCode === 38){ //up
        pacman.y = pacman.y - velocity;
        pacman.direction = "up";
        displayPacman();
    }

    else if(e.keyCode === 39){ // right

        pacman.x = pacman.x + velocity;
        pacman.direction = "right";
        displayPacman();
    }

    else if(e.keyCode === 37){ //left
        pacman.x = pacman.x - velocity;
        pacman.direction = "left";
        displayPacman();
    }

}