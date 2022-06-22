import {gameobjects} from './gameobjects.js';

let keys = {
    'checkkey': '',
}

class Controller {
    constructor() {
        
    }

    keyPressTrue(e){

        switch(e.keyCode){
            case 38:
                keys.checkkey = 'up'
                break;
            case 37:
                keys.checkkey = 'left'
                break;
            case 39:
                keys.checkkey = 'right'
                break;
            case 40:
                keys.checkkey = 'down'
                break;
         }

         gameobjects.pacman.updateStates();
      
    }

}

export {Controller, keys};