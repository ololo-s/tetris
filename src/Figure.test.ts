import Figure, {randomFigure} from "./Figure";

it('randomFigure returns a new figure', () => {
    expect(randomFigure()).to.be.instanceof(Figure)
})
