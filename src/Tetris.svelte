<script lang="ts">
    import DrawBoard from "./DrawBoard.svelte";
    import Figure, {Dot, randomFigure} from "./Figure";
    import Board from "./Board";

    let board = new Board()
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
            case 'Shift':
                return pauseGame()
            case 'ArrowUp': {
                figure = figure.turn()
            }
        }
    }

    function moveLeft() {
        if (figure.dots.every(d => d.x > 0))
            figure = figure.move(-1)
    }

    function moveRight() {
        if (figure.dots.every(d => d.x < board.width - 1))
            figure = figure.move(+1)
    }

    let fastTimer: any
    let commonTimer: any

    function fastDown() {
        clearInterval(fastTimer)
        fastTimer = setInterval(() => figure = figure.move(0, +1), 50)
    }

    function startGameTimer() {
        commonTimer = setInterval(() => figure = figure.move(0, +1), 1000)
    }

    startGameTimer()

    function pauseGame() {
        clearInterval(fastTimer)
        if (commonTimer) {
            clearInterval(commonTimer)
            commonTimer = undefined
        } else {
            startGameTimer()
        }
    }

    $: processStep(figure)

    function processStep(figure: Figure) {
        clear(oldFigure)
        board.removeFilledRows()
        if (figure.dots.some(d => d.y >= board.height || board.cells[d.y][d.x] !== ' ')) {
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
        f.dots.forEach(d => board.cells[d.y][d.x] = ' ')
    }

    function draw(f: Dot[]) {
        f.forEach(d => board.cells[d.y][d.x] = '.')
    }
</script>

<svelte:window on:keydown={handleKey}/>

<DrawBoard {board}/>


