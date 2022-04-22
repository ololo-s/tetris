<script lang="ts">
  import Board from "./Board.svelte";

  let board = Array(20).fill([]).map(() => Array(10).fill(' '))
  let dot = {y: 0, x: 4}
  let oldDot = {...dot}

  function handleKey(e: KeyboardEvent) {
      switch (e.key) {
          case 'ArrowLeft': return moveLeft()
          case 'ArrowRight': return moveRight()
      }
  }

  function moveLeft () {
      dot.x--
  }

  function moveRight () {
      dot.x++
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
