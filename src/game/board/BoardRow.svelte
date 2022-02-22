<script>
	import BoardTile from './BoardTile.svelte';
	import { correctWord, currentRow } from '../stores';
	export let row;
	export let rowIndex;
	export function shake() {
		tiles.forEach(tile => tile.shake());
	}

	let tiles = [];

	let correctWordArr = $correctWord.split("");

	$: letterArr = row.padEnd(5, ' ').split('');

	$: tileStates = letterArr.map((letter, index) => {
		if ($currentRow <= rowIndex) {
			return "empty";
		}

		if (correctWordArr[index] === letter) {
			return "correct";
		}

		//TODO: This is an oversimplification. Need to support multiple instances
		//of the same letter in the word.
		if (correctWordArr.includes(letter)) {
			return "present";
		}

		return "absent";
	});
</script>

<div class="row">
	{#each letterArr as letter, i}
		<BoardTile bind:this={tiles[i]} letter={letter} state={tileStates[i]} characterIndex={i} />
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
</style>