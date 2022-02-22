<script>
	import BoardRow from './BoardRow.svelte';

	export let rows;
	export function shakeRow(rowNumber) {
		boardRows[rowNumber].shake();
	}

	let boardRows = [];
</script>

<div class="board-container">
	<div class="board">
		{#each rows as row, i}
			<BoardRow bind:this={boardRows[i]} row={row} rowIndex={i} />
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