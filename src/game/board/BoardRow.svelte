<script>
    import { correctWord, currentRow } from '../stores';
    export let row;
    export let rowIndex;

    let correctWordArr;
    correctWord.subscribe(val => correctWordArr = val.split(""));

    let currentRowValue;
    currentRow.subscribe(value => currentRowValue = value);

    $: letterArr = row.padEnd(5, ' ').split('');
</script>

<div class="row">
    {#each letterArr as letter}
        <div class="tile">{letter}</div>    
    {/each}
</div>

<style>
    .row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 5px;
        height: 5em;
        margin-bottom: 5px;
    }

    .tile {
        border: 2px solid #d3d6da;
        width: 3em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        line-height: 2rem;
        font-weight: bold;
        vertical-align: middle;
        box-sizing: border-box;
        color: black;
        text-transform: uppercase;
        user-select: none;
    }
</style>