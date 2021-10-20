// Abdulrazzak Jouhar

import { pauseGame } from "./game.js"

let inputDirection = 0
let keyDown = false

window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'ArrowLeft':
            inputDirection = -1
            keyDown = true
            break
        case 'ArrowRight':
            inputDirection = 1
            keyDown = true
            break
        case 'ArrowDown':
            inputDirection = 2
            keyDown= true
            break
        case ' ':
            inputDirection = 3
            keyDown = true
            break
        case 'Enter':
            pauseGame()
            break
        default:
            break
    }
})

export function getInputDirection() {
    return inputDirection
}

export function checkIfTyped() {
    if (keyDown) {
        keyDown = false
        return true
    } else {
        return false
    }
}