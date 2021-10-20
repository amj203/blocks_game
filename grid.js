// Abdulrazzak Jouhar

let grid = new Array(31).fill(0).map(() => new Array(22).fill(0))
grid[30].fill(1)
console.log(grid)


export function fillBlock(x,y,w,h) {

    // console.log(x + ' ' + y + ' ' + w + ' ' + h)

    for (let i = y-1; i < y + h - 1; i++) {
        for (let z = x-1; z < x + w - 1; z++) {
            grid[i][z] = 1
        }
    }

    // console.log(grid)
}

export function endLifeSpane(x,y,w,h) {

    // console.log(x + ' ' + y + ' ' + w + ' ' + h)

    for (let i = x; i < x + w; i++) {
        if (grid[y+h-1][i-1] == 1) return true
    }

    return false
}

export function obstacleLeft(x,y,h) {
    if (x <= 1) return true
    for (let i = y-1; i < y + h; i++) {
        if (grid[i][x-2] == 1) return true
    }

    return false
}

export function obstacleRight(x,y,w,h) {
    if (x + w -1 >= 22) return true
    for (let i = y-1; i < y + h; i++) {
        if (grid[i][x+w-1] == 1) return true
    }

    return false
}

export function cantRotate(x,y,w,h) {



    for (let i = x; i < x + w; i++) {
        for (let z = y; z < y + h; z++) {
            if (grid[z-1][i-1] == 1 || i > 22 || i < 1) return true
        }
    }

    return false
}

export function checkIfLose() {
    for (let index = 0; index < grid[0].length; index++) {
        if (grid[0][index] == 1) return true
    }

    return false
}

export function checkForWin() {

    let lines = []

    for (let index = 0; index < grid.length-1; index++) {
        const line = grid[index];
        let space = false

        for (let i = 0; i < line.length; i++) {
            const cell = line[i];
            
            if (cell == 0) {
                space = true
                break  
            } 
        }

        if (!space) lines.push(index)
    }

    if (lines.length == 0) {
        return 0
    }

    console.log(grid)
    return lines
}

export function printGrid() {
    console.log(grid)
}

export function emptyGrid() {
    grid.forEach(line => {
        line.fill(0)
    })

    grid[30].fill(1)
}