import {expect} from "vitest";
import Board from "./Board";

it('removes filled row from board', () => {
    const board = new Board(3, 2, Array(3).fill([]).map(() => Array(2).fill(' ')))
    board.cells[0][1] = '.'
    board.cells[1].fill('.')
    board.cells[2][0] = '.'

    board.removeFilledRows()

    expect(board.cells).to.have.length(3)
    expect(board.cells[0].join('')).to.eq('  ')
    expect(board.cells[1].join('')).to.eq(' .')
    expect(board.cells[2].join('')).to.eq('. ')
})

it('removes filled rows from board', () => {
    const board = new Board(3, 2, Array(3).fill([]).map(() => Array(2).fill('.')))

    board.removeFilledRows()

    expect(board.cells[0].every(d => d === ' ')).to.true
    expect(board.cells[1].every(d => d === ' ')).to.true
    expect(board.cells[2].every(d => d === ' ')).to.true
})