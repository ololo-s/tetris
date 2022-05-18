import Tetris from "./Tetris.svelte";
import {render} from '@testing-library/svelte';
import {expect} from "vitest";
import {tick} from "svelte";

beforeEach(() => {
    vi.useFakeTimers()
})

afterEach(() => {
    vi.restoreAllMocks()
})

it('renders board and first figure', async () => {
    const {container} = render(Tetris)
    expect(container.textContent).to.contain('Score: 0')
    const cells = [...container.querySelectorAll('.cell')]
    expect(cells).to.have.length(200)
    vi.advanceTimersByTime(1000)
    expect(cells.some(cell => cell.classList.contains('color'))).to.be.true
})

it('game ending with the alert',  async () => {
    const alert = vi.spyOn(window, 'alert').mockReturnValue(undefined)

    const {component} = render(Tetris)
    expect(component.score).to.eq(0)

    for (let s = 0; s <= 400; s++) {
        vi.advanceTimersByTime(1000)
        await tick()
    }

    expect(component.score).toBeGreaterThan(0)
    expect(alert).toBeCalled()
    expect(alert['calls'][0][0]).to.match(/Game over, score: \d+. Press OK to start again/)
})
