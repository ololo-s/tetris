<script lang="ts">
    import DrawBoard from "./DrawBoard.svelte";
    import Figure, {randomFigure} from "./Figure";
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
        if (board.hasSpaceOnLeft(figure))
            figure = figure.move(-1)
    }

    function moveRight() {
        if (board.hasSpaceOnRight(figure))
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
        board = board.clear(oldFigure)
        board = board.removeFilledRows()
        if (board.isInvalidPosition(figure)) {
            clearInterval(fastTimer)
            figure.move(0, -1)
            issueNewFigure()
        } else {
            oldFigure = figure.deepCopy()
        }
        board = board.draw(figure)
    }

    function issueNewFigure() {
        figure = randomFigure()
        board.draw(figure)
        oldFigure = figure.deepCopy()
    }
</script>

<svelte:window on:keydown={handleKey}/>

<DrawBoard {board}/>


