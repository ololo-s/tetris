export class Dot {
    constructor(
        public x: number,
        public y: number,
    ) {}
}

export class Figure {
    public dots: Dot[]
    constructor(public turns: Dot[][]) {
        this.dots = this.turns[0]
    }

    shiftX = 0
    shiftY = 0
    lastTurnIndex = 0

    deepCopy(): Figure {
        return new Figure(this.turns.map(dots => dots.map(d => new Dot(d.x, d.y))))
    }

    move(x: number, y: number = 0): Figure {
        this.dots.forEach(d => {d.x += x; d.y += y})
        this.shiftX += x;
        this.shiftY += y;
        return this.deepCopy()
    }

    turn(): Figure {
        this.lastTurnIndex++
        if (this.lastTurnIndex >= this.turns.length) this.lastTurnIndex = 0
        this.dots = this.turns[this.lastTurnIndex]
        this.dots.forEach(d => {d.x += this.shiftX; d.y += this.shiftY})
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
