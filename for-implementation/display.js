"use strict";

import {Brick, Space, Coin, Pacman, Blinky, gameobjects, defaults} from './gameobjects.js'
import {worlds} from './worlds.js';

let canvas;
let ctx;

function initialize(){
    canvas = document.getElementById("gamecanvas");

    if(canvas.getContext){
        ctx = canvas.getContext("2d");
    }
    
    initializeWorld();

    window.requestAnimationFrame(gameLoop);

}

function initializeWorld(){

    let world = worlds[1];

    //get data from world array
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
    
    //draw bricks
    gameobjects.bricksList.forEach((brick) => {
        brick.draw();
    })
    //draw spaces
    gameobjects.spaceList.forEach((space) => {
        space.draw();
    })

    //add coins to spaces
    gameobjects.spaceList.forEach((space) => {
        gameobjects.coinsList.push(new Coin(ctx, space.x + defaults.w / 2, space.y + defaults.h / 2));
    })

    //draw coins
    gameobjects.coinsList.forEach((coin) =>{
        coin.draw();
    })

    //assign blinky to a random space
    gameobjects.blinky = new Blinky(ctx, 60 + defaults.w / 2 , 120 + defaults.h/2)
    gameobjects.blinky.randomState();
    gameobjects.blinky.draw();

    //characters
    gameobjects.pacman = new Pacman(ctx, 20 + defaults.w / 2, 20 + defaults.h / 2)
    gameobjects.pacman.draw();

    

}


let start;
let elapsed;
function gameLoop(timeStamp){
    
    if(start == undefined){
        start = timeStamp;
    }

    elapsed = timeStamp - start;

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

    let randInt = Math.floor(Math.random() * 3);
    let secs = randInt * 1000
     // Stop the animation after 2 seconds
    // if(secs === 0){
    //     gameobjects.blinky.randomState();
    // }
    //console.log(secs)    
    // if(elapsed % secs >= secs - 50 && elapsed % secs <= secs - 50){
    //     gameobjects.blinky.randomState();
    // }

    gameobjects.pacman.draw();
    gameobjects.blinky.draw();

    
    gameobjects.pacman.update();
    gameobjects.blinky.update();

    window.requestAnimationFrame(gameLoop);

}

// setInterval(() => {
//    gameobjects.blinky.randomState();
//    //gameobjects.blinky.update();
// }, 2000);





export {initialize};