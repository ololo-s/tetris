<script lang="ts">
  import Board from "./Board.svelte";

  let board = Array(20).fill([]).map(() => Array(10).fill(' '))
  let dot = {y: 0, x: 5}



  // setInterval(() => {
  //     board[dot.y][dot.x] = ' '
  //     dot.y++
  //     board[dot.y][dot.x] = '.'
  // }, 1000)
</script>

<svelte:window on:keydown={e => console.log(e.key)}/>

<Board {board}/>

