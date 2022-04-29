import Figure, {Dot, randomFigure} from "./Figure";
import {expect} from "vitest";

it('randomFigure returns a new figure', () => {
    expect(randomFigure()).to.be.instanceof(Figure)
})

it('contains dots', () => {
    const dots = [new Dot(1, 1)]
    const figure = new Figure(dots)
    expect(figure.dots).to.eq(dots)
})

it('deepCopy copies a figure deeply', () => {
    const figure = new Figure([new Dot(1, 1)])
    const copy = figure.deepCopy()
    expect(copy).to.not.eq(figure)
    expect(copy).to.deep.eq(figure)
})

it('figure move', () => {
    const figure = new Figure([new Dot(1, 1), new Dot(2, 2)])
    const movedFigure = figure.move(-1, +2)
    expect(movedFigure.dots).to.deep.eq([new Dot(0, 3), new Dot(1, 4)])
})