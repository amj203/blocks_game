// Abdulrazzak Jouhar 2021

import {update as updateBlock, draw as drawBlock, updateX as updateXD} from './blocks.js'
import { checkIfLose } from './grid.js'
import { checkIfTyped } from './input.js'
import { sound } from './sound.js'

export let gameBoard = document.getElementById('game-board')
let pauseButton = document.getElementById('pause')
let paused = false
let gameSpeed = 1
let lastRender = 0
let mainSound = new sound('./static/tetrisMainSound.mp3')
mainSound.play()

window.requestAnimationFrame(main)

function main(currentTime) {

    if (paused) return

    if (checkIfLose()) {
        let loseSound = new sound('./static/tetrisLoseSound.wav')
        mainSound.stop()
        loseSound.play()
        setTimeout(() => {
            loseSound.stop()
            if (confirm('you lost -_- ( Do you want to restart ?? )')) {
                window.location = window.location
            } else {
                window.location = 'https://www.google.com/search?q=how+to+not+be+a+coward'
            }
        }, 790)
        return
    }

    window.requestAnimationFrame(main)


    if (checkIfTyped()) {
        updateX()
        draw()
    }
    
    const sinceLastRender = (currentTime - lastRender) / 1000
    if (sinceLastRender < 1 / gameSpeed) return
    
    lastRender = currentTime
    
    update()
    draw()
}

function update() {
    updateBlock()
}

function updateX() {
    updateXD()
}

function draw() {
    drawBlock()
}

export function pauseGame() {
    if (paused) {
        paused = false
        pauseButton.innerHTML = 'pause' 
        mainSound.play()
        requestAnimationFrame(main)
    } else {
        paused = true
        mainSound.stop()
        pauseButton.innerHTML = 'resume'
    }
}

pauseButton.addEventListener('click', () => {
    pauseGame()
})

export function increaseSpeed() {
    gameSpeed+=0.5
    console.log(gameSpeed)
}
