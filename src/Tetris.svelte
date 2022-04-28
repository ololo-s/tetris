<script lang="ts">
    import Board from "./Board.svelte";
    import Figure, {Dot, randomFigure} from "./Figure";

    const height = 20
    const width = 10
    let board = Array(height).fill([]).map(() => Array(width).fill(' '))
    let figure: Figure, oldFigure: Figure
    issueNewFigure()

    function deepCopy(figure: Figure): Figure {
        return figure.map(d => ({...d}))
    }

    function changeFigure(each: (d: Dot) => void) {
        figure.forEach(each)
        figure = figure
    }

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
        if (figure.every(d => d.x > 0))
            changeFigure(d => d.x--)
    }

    function moveRight() {
        if (figure.every(d => d.x < width - 1))
            changeFigure(d => d.x++)
    }

    let fastTimer: any
    function fastDown() {
        fastTimer = setInterval(() => changeFigure(d => d.y++), 50)
    }

    setInterval(() => changeFigure(d => d.y++), 1000)

    $: processStep(figure)

    function processStep(figure: Figure) {
        clear(oldFigure)
        if (figure.some(d => d.y >= height || board[d.y][d.x] !== ' ')) {
            clearInterval(fastTimer)
            figure.forEach(d => d.y--)
            issueNewFigure()
        } else {
            oldFigure = deepCopy(figure)
        }
        draw(figure)
    }

    function issueNewFigure() {
        figure = deepCopy(randomFigure())
        draw(figure)
        oldFigure = deepCopy(figure)
    }

    function clear(f: Figure) {
        f.forEach(d => board[d.y][d.x] = ' ')
    }

    function draw(f: Dot[]) {
        f.forEach(d => board[d.y][d.x] = '.')
    }
</script>

<svelte:window on:keydown={handleKey}/>

<Board {board}/>
{JSON.stringify(figure)}


