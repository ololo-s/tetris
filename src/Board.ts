import type Figure from "./Figure"

export default class Board {
    constructor(
        public height = 20,
        public width = 10,
        public cells: string[][] = Array(height).fill([]).map(() => Array(width).fill(' ')),
    ) {
    }

    removeFilledRows(): number {
        let rowCount = 0
        for (let i = 0; i < this.height; i++) {
            if (this.cells[i].every(d => d === '.')) {
                rowCount++
                this.cells.copyWithin(1, 0, i)
                this.cells[0] = this.cells[0].map(() => ' ')
            }
        }
        return rowCount
    }

    draw(f: Figure, c = '.') {
        f.dots.forEach(d => this.cells[d.y][d.x] = c)
        return this
    }

    clear(f: Figure) {
        return this.draw(f, ' ')
    }

    isInvalidPosition(f: Figure) {
        return f.dots.some(d => d.y >= this.height || this.cells[d.y][d.x] !== ' ')
    }

    hasSpaceOnLeft(f: Figure) {
        return f.dots.every(d => d.x > 0)
    }

    hasSpaceOnRight(f: Figure) {
        return f.dots.every(d => d.x < this.width - 1)
    }
}
