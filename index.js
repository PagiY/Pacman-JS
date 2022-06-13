//to build
//have JS display the world -- done
//have the pacman move up and down --done
//create brick object which has all the properties of bricks from getBoundingClientRect()

//world building; 0-empty, 1-coin, 2-brick
var world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]

//pacman position; initial position displayed
var pacman = {
    x: 28,
    y: 28,
    direction: "right",
}

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
            
        }

        output += "</div>"
    }

    document.getElementById('world').innerHTML = output;

    const bricks = document.getElementsByClassName("brick")

    for (let i = 0; i < bricks.length; i++) {
        let item = bricks[i];
        console.log(item.getBoundingClientRect())
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

        if((pacman.x + velocity) === 50){
            console.log('50!')
        }
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