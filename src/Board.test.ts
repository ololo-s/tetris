import {expect} from "vitest";
import {removeFilledRow} from "./Board";

it('removes filled row from board', () => {
    const board = Array(3).fill([]).map(() => Array(3).fill(' '))
    board[0][1] = '.'
    board[1].fill('.')
    board[2][0] = '.'

    removeFilledRow(board)

    expect(board).to.have.length(3)
    expect(board[0].join('')).to.eq('   ')
    expect(board[1].join('')).to.eq(' . ')
    expect(board[2].join('')).to.eq('.  ')
})

it('removes filled rows from board', () => {
    const board = Array(3).fill([]).map(() => Array(2).fill('.'))
    removeFilledRow(board)
    expect(board[0].every(d => d == ' ')).to.true
    expect(board[1].every(d => d == ' ')).to.true
    expect(board[2].every(d => d == ' ')).to.true
})