
<script>
    import Board from './board/Board.svelte';
    import Keyboard from './keyboard/Keyboard.svelte';
    import { currentRow } from './stores.js';

    let rows = ["", "", "", "", "", ""];
    let currentRowValue;

    currentRow.subscribe(value => {
        currentRowValue = value;
    })

    function handleKey(keyPressed) {
        if (isLetter(keyPressed) && rows[currentRowValue].length < 5) {
            rows[currentRowValue] = rows[currentRowValue] + keyPressed;
        } else if (keyPressed === "BACKSPACE" && rows[currentRowValue].length > 0) {
            rows[currentRowValue] = rows[currentRowValue].slice(0, -1);
        } else if (keyPressed === "ENTER" && rows[currentRowValue].length === 5) {
            currentRow.update(n => n + 1);
        }
    }

    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }
</script>

<svelte:window on:keydown={(e) => handleKey(e.key.toUpperCase())} />

<div class="game">
    <Board rows={rows} />
    <Keyboard />
    <pre>{JSON.stringify(rows, null, 2)}</pre>
</div>

<style>
    .game {
        width: 100%;
        max-width: 500px;
        height: calc(100% - 40px);
        margin: 5em auto;
        display: flex;
        flex-direction: column;
    }
</style>    