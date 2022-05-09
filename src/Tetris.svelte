<script lang="ts">
    import DrawBoard from "./DrawBoard.svelte";
    import Figure, {Dot, randomFigure} from "./Figure";
    import {removeFilledRow} from "./Board";

    const height = 20
    const width = 10
    let board = Array(height).fill([]).map(() => Array(width).fill(' '))
    let figure: Figure, oldFigure: Figure

    issueNewFigure()

    function handleKey(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowLeft':
                return moveLeft()
            case 'ArrowRight':
                return moveRight()
            case 'ArrowDown':
                return fastDown()
            case '29':
                return pause()
            case 'ArrowUp': {
                figure = figure.turn()
                console.log('turned', figure.deepCopy(), oldFigure.deepCopy())
            }
        }
    }

    function moveLeft() {
        if (figure.dots.every(d => d.x > 0))
            figure = figure.move(-1)
    }

    function moveRight() {
        if (figure.dots.every(d => d.x < width - 1))
            figure = figure.move(+1)
    }

    let fastTimer: any
    function fastDown() {
        clearInterval(fastTimer)
        fastTimer = setInterval(() => figure = figure.move(0, +1), 50)
    }

    setInterval(() => figure = figure.move(0, +1), 1000)

    function pause() {

    }

    $: processStep(figure)

    function processStep(figure: Figure) {
        clear(oldFigure)
        removeFilledRow(board)
        if (figure.dots.some(d => d.y >= height || board[d.y][d.x] !== ' ')) {
            clearInterval(fastTimer)
            figure.move(0, -1)
            issueNewFigure()
        } else {
            oldFigure = figure.deepCopy()
        }
        draw(figure.dots)
    }

    function issueNewFigure() {
        figure = randomFigure()
        draw(figure.dots)
        oldFigure = figure.deepCopy()
    }

    function clear(f: Figure) {
        f.dots.forEach(d => board[d.y][d.x] = ' ')
    }

    function draw(f: Dot[]) {
        f.forEach(d => board[d.y][d.x] = '.')
    }
</script>

<svelte:window on:keydown={handleKey}/>

<DrawBoard {board}/>
{JSON.stringify(figure)}


