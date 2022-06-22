"use strict";

import {Brick, Pacman, gameobjects, defaults, Space} from './gameobjects.js'

let canvas;
let ctx;

function initialize(){
    canvas = document.getElementById("gamecanvas");

    if(canvas.getContext){
        ctx = canvas.getContext("2d");
    }
    
    createGameWorld();
    createPacman();

    window.requestAnimationFrame(gameLoop);

}

//30, 70, 110, 150, 190, ...
//this.x - [30, 70, 110, 140, or 170]
//compare and get smallest difference
//the result with smallest difference is the new position 
//
let world = [
    ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '1', '0', '1', '0', '1', '1', '0', '1', '1', '0', '1'],
    ['1', '0', '0', '0', '1', '0', '1', '1', '0', '1', '1', '0', '1'],
    ['1', '0', '1', '0', '1', '0', '1', '1', '0', '1', '1', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
]


function createGameWorld(){

    world.forEach((row, i) => {
        row.forEach((obj, j) => {
            if(obj === '1'){
                gameobjects.bricksList.push(new Brick(ctx, j * defaults.w, i * defaults.h))
            }
            else if(obj === '0'){
                gameobjects.spaceList.push(new Space(ctx, j * defaults.w, i * defaults.h))
            }
            
        })
    })
    
    gameobjects.bricksList.forEach((brick) => {
        brick.draw()
    })

    gameobjects.spaceList.forEach((space) => {
        space.draw()
    })

    
}

function createPacman(){
    
    gameobjects.pacman = new Pacman(ctx, 20 + defaults.w / 2, 20 + defaults.h / 2)
    gameobjects.pacman.draw();
    gameobjects.pacman.getCurSpace();
    gameobjects.pacman.checkDirections();

}

function gameLoop(){

    
    ctx.clearRect(0,0,canvas.width, canvas.height);
    gameobjects.pacman.draw();
    gameobjects.pacman.update();

    gameobjects.bricksList.forEach((brick) => {
        //gameobjects.pacman.detectCollision(brick)
        brick.draw()

    })

    gameobjects.spaceList.forEach((space) => {
        space.draw()
    })

    window.requestAnimationFrame(gameLoop);

}






export {initialize};