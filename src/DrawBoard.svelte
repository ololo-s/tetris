<script lang="ts">
    export let board: string[][]
</script>

<div class="field">
  {#each board as row}
    <div class="row">
      {#each row as cell}
        <div class="cell" class:color={cell != ' '}></div>
      {/each}
    </div>
  {/each}
</div>

<style>
    .row {
        display: flex;
    }

    .field {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        padding: 20px;
        background-color: #82bb60;
        max-width: 50%;
    }

    .cell {
        border: 1px solid #d9d8d8;
        height: 18px;
        width: 18px;
    }

    .cell.color {
        background-color: #457927;
        box-shadow: inset 0px 0px 2px 3px #559430;
    }
</style>