<script>
	import { createEventDispatcher } from 'svelte';

	export let letter;
	export let state;

	const dispatch = createEventDispatcher();
</script>

<button class={state} 
		class:one-and-half={letter === "ENTER" || letter === "DEL"} 
		on:click={dispatch('click', letter)}>
			{letter}
</button>

<style>
	button {
		flex: 1;
		margin-right: 6px;
		background-color: #d3d6da;
		color: black;
		font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
		font-weight: bold;
		border-radius: 4px;
		height: 58px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: capitalize;
		border: none;
		cursor: pointer;
	}

	.one-and-half {
		flex: 1.5;
	}

	.absent {
		background-color: #787c7e;
		color: white;
	}

	.correct {
		background-color: #6AAA6A;
		color: white;
	}

	.present {
		background-color: #c9b458;
		color: white;
	}
</style>