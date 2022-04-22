<script lang="ts">
  import Board from "./Board.svelte";

  let board = Array(20).fill([]).map(() => Array(10).fill(' '))
  let dot = {y: 0, x: 4}
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
      if (dot.x >= board[0].length) dot.x = board[0].length - 1
  }

  function fastDown() {
      setInterval (() => dot.y++, 50)
  }

  setInterval(() => {
      dot.y++
  }, 1000)

  $: {
      board[oldDot.y][oldDot.x] = ' '
      board[dot.y][dot.x] = '.'
      oldDot = {...dot}
  }
</script>

<svelte:window on:keydown={handleKey}/>

<Board {board}/>
