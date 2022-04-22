<script lang="ts">
    import Board from "./Board.svelte";

    interface Dot {x: number, y: number}

    const height = 20
    const width = 10
    let board = Array(height).fill([]).map(() => Array(width).fill(' '))

    const newDot: Dot = {y: 0, x: 4}
    let dot: Dot = {...newDot}
    let oldDot: Dot = {...dot}

    function handleKey(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowLeft':
                return moveLeft()
            case 'ArrowRight':
                return moveRight()
            case 'ArrowDown':
                return fastDown()
        }
    }

    function moveLeft() {
        dot.x--
        if (dot.x < 0) dot.x = 0
    }

    function moveRight() {
        dot.x++
        if (dot.x >= width) dot.x--
    }

    let fastTimer: any
    function fastDown() {
        fastTimer = setInterval(() => dot.y++, 50)
    }

    setInterval(() => dot.y++, 1000)

    $: {
        handleDotFinalPosition(dot)
        drawDot(dot)
    }

    function handleDotFinalPosition(d: Dot) {
        if (d.y >= height || board[d.y][d.x] != ' ') {
            clearInterval(fastTimer)
            d.y--
            dot = oldDot = {...newDot}
        }
    }

    function drawDot(dot: Dot) {
        board[oldDot.y][oldDot.x] = ' '
        board[dot.y][dot.x] = '.'
        oldDot = {...dot}
    }
</script>

<svelte:window on:keydown={handleKey}/>

<Board {board}/>
{JSON.stringify(dot)}