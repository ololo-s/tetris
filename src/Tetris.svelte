<script lang="ts">
    import DrawBoard from "./DrawBoard.svelte";
    import Figure, {randomFigure} from "./Figure";
    import Board from "./Board";
    import Score from "./Score.svelte";

    let board = new Board()
    let figure: Figure, oldFigure: Figure
    export let score: number = 0

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
        score += board.removeFilledRows() * 10
        if (board.isInvalidPosition(figure)) {
            clearInterval(fastTimer)
            figure.move(0, -1)
            score += 1
            issueNewFigure()
        } else {
            oldFigure = figure.deepCopy()
        }
        board = board.draw(figure)
    }

    function issueNewFigure() {
        figure = randomFigure()
        if (board.isInvalidPosition(figure)) {
            return gameOver()
        }
        board.draw(figure)
        oldFigure = figure.deepCopy()
    }

    function gameOver() {
        pauseGame()
        alert(`Game over, score: ${score}. Press OK to start again`)
        startGameTimer()
        score = 0
        board = new Board()
    }
</script>

<svelte:options accessors/>
<svelte:window on:keydown={handleKey}/>

<DrawBoard {board}/>
<Score {score}/>

