import {gameobjects} from './gameobjects.js';

let keys = {
    'left'  : {pressed: false},
    'up'    : {pressed: false},
    'right' : {pressed: false},
    'down'  : {pressed: false},
    'currentkey': '',
    'checkkey': '',
    'nextkey': '',
}

class Controller {
    constructor() {
        
    }
    
    updateKey(){
        keys.currentkey = keys.nextkey;
        
    }

    keyPressTrue(e){

        switch(e.keyCode){
            case 38:
                
                keys.checkkey = 'up'
                keys.up.pressed = true;
                break;
            case 37:
                keys.checkkey = 'left'
                keys.left.pressed = true;
                break;
            case 39:
                keys.checkkey = 'right'
                keys.right.pressed = true;
                break;
            case 40:
                keys.checkkey = 'down'
                keys.down.pressed = true;
                break;
         }

         gameobjects.pacman.updateStates();
      
    }

    keyPressFalse(e){
        switch(e.keyCode){
            case 38:
                keys.up.pressed = false;
                break;
            case 37:
                keys.left.pressed = false;
                break;
            case 39:
                keys.right.pressed = false;
                break;
            case 40:
                keys.down.pressed = false;
                break;
         } 
    }
}

export {Controller, keys};