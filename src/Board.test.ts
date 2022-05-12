import {expect} from "vitest";
import Board from "./Board";
import Figure, {Dot} from "./Figure";


it('removes filled row from board', () => {
    const board = new Board(3, 2)
    board.cells[0][1] = '.'
    board.cells[1].fill('.')
    board.cells[2][0] = '.'

    expect(board.removeFilledRows()).to.eq(1)

    expect(board.cells).to.have.length(3)
    expect(board.cells[0].join('')).to.eq('  ')
    expect(board.cells[1].join('')).to.eq(' .')
    expect(board.cells[2].join('')).to.eq('. ')
})

it('removes filled rows from board', () => {
    const board = new Board(3, 2, Array(3).fill([]).map(() => Array(2).fill('.')))

    expect(board.removeFilledRows()).to.eq(3)

    expect(board.cells[0].every(d => d === ' ')).to.true
    expect(board.cells[1].every(d => d === ' ')).to.true
    expect(board.cells[2].every(d => d === ' ')).to.true
})

it('draws and clear figure from board', () => {
    const board = new Board(5, 5)
    const figure = new Figure([[new Dot(2, 0), new Dot(3, 0)]])

    board.draw(figure)

    expect(board.cells[0][2]).to.eq('.')
    expect(board.cells[0][3]).to.eq('.')

    board.clear(figure)

    expect(board.cells[0][2]).to.eq(' ')
    expect(board.cells[0][3]).to.eq(' ')
})

it('checks whether figure is outside the height of a board', () => {
    const board = new Board(2, 2)
    expect(board.isInvalidPosition(new Figure([[new Dot(0, 0), new Dot(1, 1)]]))).to.be.false
    expect(board.isInvalidPosition(new Figure([[new Dot(0, 2), new Dot(1, 1)]]))).to.be.true
    expect(board.isInvalidPosition(new Figure([[new Dot(0, 0), new Dot(1, 3)]]))).to.be.true
})

it('figures do overlap', () => {
    const board = new Board(2, 2)
    board.cells[0][0] = '.'

    expect(board.isInvalidPosition(new Figure([[new Dot(0, 0), new Dot(1, 0)]]))).to.be.true
    expect(board.isInvalidPosition(new Figure([[new Dot(0, 1), new Dot(1, 1)]]))).to.be.false
})

it('figures are within the left and right borders', () => {
    const board = new Board(2, 2)

    expect(board.hasSpaceOnLeft(new Figure([[new Dot(0, 0)]]))).to.be.false
    expect(board.hasSpaceOnLeft(new Figure([[new Dot(-1, 0)]]))).to.be.false
    expect(board.hasSpaceOnLeft(new Figure([[new Dot(1, 0)]]))).to.be.true

    expect(board.hasSpaceOnRight(new Figure([[new Dot(1, 1)]]))).to.be.false
    expect(board.hasSpaceOnRight(new Figure([[new Dot(2, 0)]]))).to.be.false
    expect(board.hasSpaceOnRight(new Figure([[new Dot(0, 0)]]))).to.be.true
})