<script>
    import BoardRow from './BoardRow.svelte';

    export let rows;
</script>

<div class="board-container">
    <div class="board">
        {#each rows as row, i}
            <BoardRow row={row} rowIndex={i} />
        {/each}
    </div>
</div>

<style>
    .board-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        overflow: hidden;
    }

    .board {
        width: 500px;
        height: 510px;
    }
</style>