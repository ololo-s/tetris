export function removeFilledRow(board: string[][]) {
    for (let y = 0; y < board.length; y++) {
        if (board[y].every(d => d === '.')) {
            board.copyWithin(1, 0, y)
            board[0] = board[0].map(d => ' ')
        }
    }
}
