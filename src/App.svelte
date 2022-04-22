<script lang="ts">
  import Tetris from "./Tetris.svelte";
</script>

<main>
  <h1>Tetris</h1>
  <Tetris/>
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
        max-width: 75%;
        background-color: #ddf5cf;
    }


    h1 {
        color: #457927;
        text-transform: uppercase;
        font-size: 3rem;
        font-weight: 600;
        line-height: 1.1;
        margin: 1rem auto;
        max-width: 14rem;
        text-shadow: #37422f 1px 2px;
        letter-spacing: 3px;
    }

    @media (min-width: 480px) {
        h1 {
            max-width: none;
        }
    }
</style>
