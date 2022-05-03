import Figure, {Dot, randomFigure} from "./Figure";
import {expect} from "vitest";

it('randomFigure returns a new figure', () => {
    expect(randomFigure()).to.be.instanceof(Figure)
})

it('contains dots', () => {
    const dots = [[new Dot(1, 1)]]
    const figure = new Figure(dots)
    expect(figure.turns).to.eq(dots)
})

it('copies a figure deeply', () => {
    const figure = new Figure([[new Dot(1, 1)]])
    const copy = figure.deepCopy()
    expect(copy).to.not.eq(figure)
    expect(copy).to.deep.eq(figure)
})

it('moves', () => {
    const figure = new Figure([[new Dot(1, 1), new Dot(2, 2)]])
    const movedFigure = figure.move(-1, +2)
    expect(movedFigure.dots).to.deep.eq([new Dot(0, 3), new Dot(1, 4)])
})

it('turns', () => {
    const turn1 = [new Dot(2, 2)]
    const turn2 = [new Dot(7, 7)]
    const figure = new Figure([[new Dot(1, 1)], turn1, turn2])
    expect(figure.turn().dots).to.deep.eq(turn1)
    expect(figure.turn().dots).to.deep.eq(turn2)
})

it('turns after moving', () => {
    const turn = [new Dot(2, 2)]
    const figure = new Figure([[new Dot(1, 1)], turn])
    figure.move(1, 2)
    figure.move(2, 3)
    expect(figure.turn().dots).to.deep.eq([new Dot(5, 7)])
})