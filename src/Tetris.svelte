<script lang="ts">
    import Board from "./Board.svelte";
    import Figure, {Dot} from "./Figure";

    let figures: Figure[] = [
        [{x: 4, y: 0}, {x: 5, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}], //квадрат

        [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}], // палка        // [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 4, y: 3}], палка перевер

        // [{x: 5, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}], //торт
        // [{x: 5, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 5, y: 2}], //торт 1влево
        // [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 5, y: 1}], //торт 2 влево/2вправо
        // [{x: 5, y: 0}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 5, y: 2}], //торт 3 влево/1 вправо


        // [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 5, y: 2}], // L
        // [{x: 6, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}], // L 1 влево
        // [{x: 4, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}], // L 2 влево/ 2 вправо
        // [{x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 6, y: 1}], // L 3 влево/ 1 вправо


        // [{x: 5, y: 0}, {x: 6, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}] //z
        // [{x: 4, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 5, y: 2}] //z 1 влево/1 вправо

    ]


    let figureId = 0
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

    function randomFigure(): Figure {
        figureId = Math.floor(Math.random() * figures.length)
        return figures[figureId]
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


