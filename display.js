"use strict";

import {Brick, Space, Coin, Pacman, Blinky, gameobjects, defaults} from './gameobjects.js'

let canvas;
let ctx;

function initialize(){
    canvas = document.getElementById("gamecanvas");

    if(canvas.getContext){
        ctx = canvas.getContext("2d");
    }
    
    createGameWorld();
    populateCoins();
    createCharacters();


    window.requestAnimationFrame(gameLoop);

}

let world = [
    ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '1', '0', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
    ['1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '1', '0', '1'],
    ['1', '0', '1', '0', '1', '0', '0', '0', '0', '0', '1', '0', '1'],
    ['1', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '1', '1', '0', '1'],
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
        brick.draw();
    })

    gameobjects.spaceList.forEach((space) => {
        space.draw();
    })

    
}

function createCharacters(){
    
    gameobjects.pacman = new Pacman(ctx, 20 + defaults.w / 2, 20 + defaults.h / 2)
    gameobjects.pacman.draw();
    
    gameobjects.blinky = new Blinky(ctx, 40, 40)
    gameobjects.blinky.draw();

}

function populateCoins(){
    gameobjects.spaceList.forEach((space) => {
        gameobjects.coinsList.push(new Coin(ctx, space.x + defaults.w / 2, space.y + defaults.h / 2));
    })

    gameobjects.coinsList.forEach((coin) =>{
        coin.draw();
    })

    console.log(gameobjects.coinsList)
    
}

function gameLoop(){

    
    ctx.clearRect(0,0,canvas.width, canvas.height);

    gameobjects.bricksList.forEach((brick) => {
        brick.draw()

    })

    gameobjects.spaceList.forEach((space) => {
        space.draw()
    })

    gameobjects.coinsList.forEach((coin) => {
        coin.draw()
    })

    gameobjects.pacman.draw();
    gameobjects.pacman.update();

    window.requestAnimationFrame(gameLoop);

}






export {initialize};