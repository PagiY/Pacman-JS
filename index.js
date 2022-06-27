
let w = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,2,0,0,1,1,1,0,1],
    [1,0,0,0,2,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,3,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]

]

let worlds = {
    1 : [
        []
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
            
        }
        output += "</div>";
    }

    document.getElementById('world').innerHTML = output;
   //document.getElementById('container').innerHTML = output += "<div id = 'pacman' class = 'pacman'></div>"
}

displayWorld();

let keyPressed = 'right';
document.onkeydown = function(e){

    let checkX;
    let checkY;

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
        
    }

    
    
    if(checkCollision(checkX, checkY)){
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
        displayPacman();
        displayWorld();
    }
    

}


let pacman = {
    x: 1,
    y: 1,
    v: 1,
}


function initPacman(){
    let empties = document.getElementsByClassName("empty");

    let index = Math.floor(Math.random() * empties.length);

    let empty = empties[index].getBoundingClientRect()

    startTop = empty.top;
    startLeft = empty.left;

    document.getElementById("pacman").style.left = empty.left + "px";
    document.getElementById("pacman").style.top = empty.top + "px";

}

function displayPacman(){
    //+ 50 for margin , could use better method
    document.getElementById("pacman").style.left = (pacman.x * 20) + 50 + "px";
    document.getElementById("pacman").style.top = (pacman.y * 20) + "px";
 
    document.getElementById("pacman").style.backgroundImage = "url(assets/pacman-" + keyPressed + ".gif)"

}

function checkCollision(checkX, checkY){

    if(world[checkY][checkX] === 0){
       return true;
    }
    else if(world[checkY][checkX] === 1){
       return false;
    }
    else if(world[checkY][checkX] === 2){
        world[checkY][checkX] = 0
        return true;
    }
    else if(world[checkY][checkX] === 3){
        world[checkY][checkX] = 0
        return true;
    }
    
}

displayPacman();


