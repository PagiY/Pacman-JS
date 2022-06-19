 import {gameobjects} from './gameobjects.js';

class Controller {
    constructor() {
       
    }

    move(e){
        
        switch(e.keyCode){
            case 38:
                console.log('up');
                gameobjects.pacman.y -= 2;
                break;
            case 37:
                console.log('left');
                gameobjects.pacman.x -= 2;
                break;
            case 39:
                console.log('right');
                gameobjects.pacman.x += 2;
                break;
            case 40:
                console.log('down');
                gameobjects.pacman.y += 2;
                break;
        }
      
    }
}


export default {Controller};