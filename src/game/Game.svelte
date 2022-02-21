
<script>
	import { getContext } from 'svelte';

	import Board from './board/Board.svelte';
	import Keyboard from './keyboard/Keyboard.svelte';
	import Popup from './Popup.svelte';
	import { currentRow, correctWord } from './stores.js';

	const { open } = getContext('simple-modal');

	let gameOver = false;

	const showGameOverScreen = (message) => open(Popup, { message});

	let rows = ["", "", "", "", "", ""];

	function handleKey(keyPressed) {
		if (gameOver) return;

		if (isLetter(keyPressed) && rows[$currentRow].length < 5) {
			rows[$currentRow] = rows[$currentRow] + keyPressed;
		} else if (keyPressed === "BACKSPACE" && rows[$currentRow].length > 0) {
			rows[$currentRow] = rows[$currentRow].slice(0, -1);
		} else if (keyPressed === "ENTER" && rows[$currentRow].length === 5) {
			if (rows[$currentRow] === $correctWord) {
				gameOver = true;
				currentRow.update(n => n + 1);
				showGameOverScreen("🎉 You win!🍾");
			} else if ($currentRow === 5) {
				gameOver = true;
				currentRow.update(n => n + 1);
				showGameOverScreen("Better luck next time")
			} else {
				currentRow.update(n => n + 1);
			}
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