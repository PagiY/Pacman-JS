"use strict";

import {Brick, Pacman, gameobjects, defaults} from './gameobjects.js'

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

let world = [
    ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
]

function createGameWorld(){

    world.forEach((row, i) => {
        row.forEach((obj, j) => {
            if(obj === '1'){
                gameobjects.bricksList.push(new Brick(ctx, j * defaults.w, i * defaults.h))
            }
            
        })
    })
    
    gameobjects.bricksList.forEach((brick) => {
        brick.draw()
    })
}

function createPacman(){
    
    gameobjects.pacman = new Pacman(ctx, defaults.w / 2, defaults.h / 2)
    gameobjects.pacman.draw()

}

function gameLoop(){

    ctx.clearRect(0,0,canvas.width, canvas.height);
    gameobjects.pacman.update();
    
    gameobjects.bricksList.forEach((brick) => {
        brick.draw()
    })
    gameobjects.pacman.draw();

    window.requestAnimationFrame(gameLoop);

}






export {initialize};