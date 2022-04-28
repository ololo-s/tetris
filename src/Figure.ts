export class Dot {
    constructor(
        public x: number,
        public y: number,
    ) {}
}

type Figure = Dot[]

export default Figure

const figures: Figure[] = [
    [{x: 4, y: 0}, {x: 5, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}], //квадрат

    [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}], // палка
    // [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 4, y: 3}], палка перевер

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

export function randomFigure(): Figure {
    return figures[Math.floor(Math.random() * figures.length)]
}
