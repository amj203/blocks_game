// Abdulrazzak Jouhar

import { gameBoard, increaseSpeed } from "./game.js"
import { fillBlock, endLifeSpane, obstacleLeft, obstacleRight, cantRotate, checkForWin, printGrid, emptyGrid } from "./grid.js"
import { getInputDirection } from "./input.js"
import { sound } from "./sound.js"

let first = true
let score = 0
let nextBlock = random()
let scoreText = document.getElementById('score')
let smallGrid = document.getElementById('next-block')
const PROPRS = [{w:2, h:2, color:"crimson", rot:0}, {w:5,h:2,color:"plum",rot:1}, {w:1,h:5,color:"blue",rot:2}, {w:4,h:4,color:"green",rot:0}, {w:3, h:5, color:"dodgerblue",rot:2}, {w:5, h:1, color:"lightslategray",rot:1}]

class Block {
    constructor(x,y,w,h,color,rot) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
        this.rot = rot
    }
}

let blocks = []
let Nblocks = []

createNewBlock(nextBlock)

export function update() {
    var block = blocks[blocks.length-1]

    if (endLifeSpane(block.x,block.y,block.w,block.h)) {
        draw(1)
        fillBlock(block.x,block.y,block.w,block.h)
        let result = checkForWin()
        if (result != 0) handleWin(result)
        if (result == 0) {
            let tempSound = new sound('./static/tetrisFall.wav')
            tempSound.play()
            setTimeout(() => {tempSound.stop()}, 200)
        }
        createNewBlock(nextBlock)
        return
    }
    blocks[blocks.length-1].y++
}

export function updateX() {
    const blockDir = getInputDirection()
    var block = blocks[blocks.length-1]

    if (blockDir == 2) {
        if (endLifeSpane(block.x,block.y,block.w,block.h)) return
        block.y++ 
        return
    } else if (blockDir == 3) {
        swapBlock()
        return
    }

    if ((obstacleLeft(block.x,block.y,block.h) && blockDir == -1) || (obstacleRight(block.x,block.y,block.w,block.h) && blockDir == 1)) return
    blocks[blocks.length-1].x += blockDir
}

export function draw(fixed = 0) {

    const x = blocks.length-1
    
    if (!first) {
        var elms = document.querySelectorAll("[id='not']");
        elms.forEach((elm) => {
            try {
                elm.parentNode.removeChild(elm)
            } catch {}
        })
    }

    for (let i = 0; i < blocks[x].h; i++) {

        for (let z = 0; z < blocks[x].w; z++) {

            const blockElement = document.createElement('div')
            blockElement.style.gridRowStart = blocks[x].y + i
            blockElement.style.gridColumnStart = blocks[x].x + z
            blockElement.style.backgroundColor = blocks[x].color
            blockElement.classList.add('block')
            if (fixed == 1) {
                blockElement.setAttribute('id', 'fixed')
            }else {
                blockElement.setAttribute('id', 'not')
            }
            gameBoard.appendChild(blockElement)
        }
    }

    first = false
}

function drawBlock(block) {

    for (let i = 0; i < block.h; i++) {

        for (let z = 0; z < block.w; z++) {

            const blockElement = document.createElement('div')
            blockElement.style.gridRowStart = block.y + i
            blockElement.style.gridColumnStart = block.x + z
            blockElement.style.backgroundColor = block.color
            blockElement.classList.add('block')
            blockElement.setAttribute('id', 'fixed')
            gameBoard.appendChild(blockElement)
        }
    }
}

function createNewBlock(index) {
    blocks.push(new Block(11-Math.floor(PROPRS[index].w/2),1,PROPRS[index].w,PROPRS[index].h,PROPRS[index].color,PROPRS[index].rot))
    nextBlock = random()
    createNNewBlock(nextBlock)
    displayNextBlock()
}

function createNNewBlock(index) {
    Nblocks.push(new Block(3-Math.floor(PROPRS[index].w/2),1,PROPRS[index].w,PROPRS[index].h,PROPRS[index].color,PROPRS[index].rot))
}

function swapBlock() {
    let block = blocks[blocks.length-1]
    let tempX = block.x, tempY = block.y, tempW = block.w, tempH = block.h
    switch (block.rot) {
        case 0:
            return
        case 1:
            block.w = tempH
            block.h = tempW
            block.y = tempY - Math.floor(tempW/2)
            block.x = tempX + Math.floor(tempW/2)
            if (tempH > 2) block.x--
            if (cantRotate(block.x,block.y,block.w,block.h)) {
                block.w = tempW
                block.h = tempH
                block.y = tempY
                block.x = tempX
                break
            }
            block.rot++
            break
        case 2:
            block.x = tempX - Math.floor(tempH/2)
            block.y = tempY + Math.floor(tempH/2)
            block.w = tempH
            block.h = tempW
            if (tempW > 2) block.x++
            if (cantRotate(block.x,block.y,block.w,block.h)) {
                block.w = tempW
                block.h = tempH
                block.x = tempX
                block.y = tempY
                break
            }
            block.rot--
            break
        default:
            break
    }
}

function handleWin(arr) {

    let arrlen = arr.length
    
    for (let i = 0; i < arrlen; i++) {

        console.log(arr[i] + ' a win line')

        gameBoard.innerHTML = ''
        emptyGrid()

        for (let z = 0; z < blocks.length; z++) {

            const block = blocks[z]

            if (block == 'empty') continue
    
            if (block.y-1 < arr[i]) {

                if ((block.y-1) + (block.h-1) < arr[i]) {
                    block.y++
                } else {
                    block.y++
                    block.h--
                }

            } else if (block.y-1 == arr[i]) {
                
                if (block.h > 1) {
                    block.y++
                    block.h--
                } else {
                    blocks[z] = 'empty'
                    continue
                }

            }

            fillBlock(block.x,block.y,block.w,block.h)
            drawBlock(block)
            console.log(blocks)
        }

        addScore()
        increaseSpeed()
        printGrid()
        let tempSound = new sound('./static/tetrisWinSound.mp3')
        tempSound.play()
        setTimeout(() => {tempSound.stop()}, 700)
    }
}

function addScore() {
    score+=10
    scoreText.innerHTML = 'score: ' + score
}

function random() {
    return Math.floor(Math.random() * 6)
}

function displayNextBlock() {

    smallGrid.innerHTML = ''
    let block = Nblocks[Nblocks.length-1]

    for (let i = 0; i < block.h; i++) {

        for (let z = 0; z < block.w; z++) {

            const blockElement = document.createElement('div')
            blockElement.style.gridRowStart = block.y + i
            blockElement.style.gridColumnStart = block.x + z
            blockElement.style.backgroundColor = block.color
            blockElement.classList.add('block')
            blockElement.setAttribute('id', 'fixed')
            smallGrid.appendChild(blockElement)
        }
    }
}