import type Figure from "./Figure"

export default class Board {
    constructor(
        public height = 20,
        public width = 10,
        public cells: string[][] = Array(height).fill([]).map(() => Array(width).fill(' '))
    ) {}

    removeFilledRows() {
        for (let i = 0; i < this.height; i++) {
            if (this.cells[i].every(d => d === '.')) {
                this.cells.copyWithin(1, 0, i)
                this.cells[0] = this.cells[0].map(() => ' ')
            }
        }
    }

    draw(f: Figure, c = '.') {
        f.dots.forEach(d => this.cells[d.y][d.x] = c)
    }

    clear(f: Figure) {
        this.draw(f, ' ')
    }

    isInvalidPosition(f: Figure) {
        return f.dots.some(d => d.y >= this.height || this.cells[d.y][d.x] !== ' ')
    }
}
