//to build
//have JS display the world -- done
//have the pacman move up and down

//0-empty, 1-coin, 2-brick

var world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],

]

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

}

function initialPacmanPosition(){
    
}



displayWorld()