export class Dot {
    constructor(
        public x: number,
        public y: number,
    ) {}
}

function deepCopyDots(dots: Dot[], shiftX = 0, shiftY = 0) {
    return dots.map(d => new Dot(d.x + shiftX, d.y + shiftY))
}

export class Figure {
    constructor(
        public turns: Dot[][],
        public dots: Dot[] = deepCopyDots(turns[0])
    ) {}

    private shiftX = 0
    private shiftY = 0
    private lastTurnIndex = 0

    deepCopy(): Figure {
        return new Figure(this.turns, deepCopyDots(this.dots))
    }

    move(x: number, y: number = 0): Figure {
        this.dots.forEach(d => {d.x += x; d.y += y})
        this.shiftX += x;
        this.shiftY += y;
        return this
    }

    turn(): Figure {
        this.lastTurnIndex++
        if (this.lastTurnIndex >= this.turns.length) this.lastTurnIndex = 0
        this.dots = deepCopyDots(this.turns[this.lastTurnIndex], this.shiftX, this.shiftY)
        return this
    }
}

export default Figure

const figures: Figure[] = [
    new Figure([[new Dot(4, 0), new Dot(5, 0), new Dot(4, 1),  new Dot(5, 1)]]), //квадрат

    new Figure([[new Dot(3, 0), new Dot(4, 0), new Dot(5, 0), new Dot(6, 0)],
        [new Dot(4, 0), new Dot(4, 1), new Dot(4, 2), new Dot(4, 3)]]), // палка

    new Figure([[new Dot(5, 0), new Dot(4, 1), new Dot(5, 1), new Dot(6, 1)], //торт
            [new Dot(5, 0), new Dot(4, 1), new Dot(5, 1), new Dot(5, 2)], //1лев
            [new Dot(4, 0), new Dot(5, 0), new Dot(6, 0), new Dot(5, 1)], //2лев-2пр
            [new Dot(5, 0), new Dot(5, 1), new Dot(6, 1), new Dot(5, 2)]]),//3лев-1пр

    new Figure([[new Dot(4, 0), new Dot(4, 1), new Dot(4, 2), new Dot(5, 2)], //L
            [new Dot(6, 0), new Dot(4, 1), new Dot(5, 1), new Dot(6, 1)], //1лев
            [new Dot(4, 0), new Dot(5, 0), new Dot(5, 1), new Dot(5, 2)], //2лев-2пр
            [new Dot(4, 0), new Dot(5, 0), new Dot(6, 0), new Dot(6, 1)],]),

    new Figure([[new Dot(5, 0), new Dot(6, 0), new Dot(4, 1), new Dot(5, 1)], //Z
            [new Dot(4, 0), new Dot(4, 1), new Dot(5, 1), new Dot(5, 2)]]) //лев-пр
]

export function randomFigure(): Figure {
    return figures[Math.floor(Math.random() * figures.length)].deepCopy()
}
