<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import Key from './Key.svelte';

	export let keysUsed;

	const keys = [
		["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
		["a", "s", "d", "f", "g", "h", "j", "k", "l"],
		["z", "x", "c", "v", "b", "n", "m"]
	];

	function handleKey(key) {
		dispatch("key", key);
	}
</script>

<svelte:window on:keydown={(e) => handleKey(e.key)} />

<div class="keyboard">
	<div class="row">
		{#each keys[0] as keyLetter}
			<Key on:click={e => handleKey(e.detail)} letter={keyLetter} state={keysUsed[keyLetter]} />
		{/each}
	</div>
	<div class="row">
		<div class="space"></div>
		{#each keys[1] as keyLetter}
			<Key on:click={e => handleKey(e.detail)} letter={keyLetter} state={keysUsed[keyLetter]} />
		{/each}
		<div class="space"></div>
	</div>
	<div class="row">
		<Key on:click={e => handleKey("Enter")} letter={"ENTER"} />
		{#each keys[2] as keyLetter}
			<Key on:click={e => handleKey(e.detail)} letter={keyLetter} state={keysUsed[keyLetter]} />
		{/each}
		<Key on:click={e => handleKey("Backspace")} letter={"DEL"} />
	</div>
</div>

<style>
	.keyboard {
		height: 200px;
		margin-top: 1em;
	}

	.row {
		display: flex;
		width: 100%;
		margin: 0 auto 8px;
		touch-action: manipulation;
	}

	.space {
		flex: 0.5;
	}
</style>