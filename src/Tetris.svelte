<script lang="ts">
  import Board from "./Board.svelte";

  const height = 20
  const width = 10
  let board = Array(height).fill([]).map(() => Array(width).fill(' '))

  const newDot = {y: 0, x: 4}
  let dot = {...newDot}
  let oldDot = {...dot}

  function handleKey(e: KeyboardEvent) {
      switch (e.key) {
          case 'ArrowLeft': return moveLeft()
          case 'ArrowRight': return moveRight()
          case 'ArrowDown': return fastDown()
      }
  }

  function moveLeft() {
      dot.x--
      if (dot.x < 0) dot.x = 0
  }

  function moveRight() {
      dot.x++
      if (dot.x >= width) dot.x--
  }

  function fastDown() {
      const timer = setInterval(() => {
          dot.y++
          if (dot.y >= height) clearInterval(timer)
      }, 50)
  }

  setInterval(() => dot.y++, 1000)

  $: if (dot.y >= height) {
      dot.y--
      oldDot = dot = {...newDot}
  }

  $: {
      board[oldDot.y][oldDot.x] = ' '
      board[dot.y][dot.x] = '.'
      oldDot = {...dot}
  }
</script>

<svelte:window on:keydown={handleKey}/>

<Board {board}/>
{JSON.stringify(dot)}