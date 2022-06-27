//to build
//have JS display the world -- done
//have the pacman move up and down --done
//create brick object which has all the properties of bricks from getBoundingClientRect()
"use strict";

import {Controller} from './controller.js';
import {initialize} from './display.js';

const cont = new Controller();


document.onkeydown = function(e){
    cont.keyPress(e)
}

window.onload = initialize();





