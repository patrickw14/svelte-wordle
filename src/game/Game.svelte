
<script>
	import { getContext } from 'svelte';

	import Board from './board/Board.svelte';
	import Keyboard from './keyboard/Keyboard.svelte';
	import Popup from './Popup.svelte';
	import { currentRow, correctWord, validGuesses } from './stores.js';

	const { open } = getContext('simple-modal');

	let gameOver = false;
	let gameBoard;
	let keysUsed = {};

	const showGameOverScreen = (message) => open(Popup, { message});

	let rows = ["", "", "", "", "", ""];

	function updateKeysUsed(guess) {
		guess.split("").forEach((l, i) => {
			if (!$correctWord.includes(l)) {
				keysUsed[l] = "absent";
			}

			if ($correctWord.charAt(i) === l) {
				keysUsed[l] = "correct";
			}

			if (!keysUsed[l]) {
				keysUsed[l] = "present";
			}
		})
	}

	function handleKey(keyPressed) {
		console.log("KEY PRESSED", keyPressed);
		if (gameOver) return;

		if (isLetter(keyPressed) && rows[$currentRow].length < 5) {
			rows[$currentRow] = rows[$currentRow] + keyPressed;
		} else if (keyPressed === "Backspace" && rows[$currentRow].length > 0) {
			rows[$currentRow] = rows[$currentRow].slice(0, -1);
		} else if (keyPressed === "Enter") {
			if (rows[$currentRow].length !== 5) {
				gameBoard.shakeRow($currentRow);
				return;
			}

			const guess = rows[$currentRow];
			if (!$validGuesses.includes(guess.toLowerCase())) {
				gameBoard.shakeRow($currentRow);
				return;
			}
			updateKeysUsed(guess);

			if (guess.toLowerCase() === $correctWord) {
				gameOver = true;
				currentRow.update(n => n + 1);
				setTimeout(() => showGameOverScreen("🎉 You win!🍾"), 2000);
			} else if ($currentRow === 5) {
				gameOver = true;
				currentRow.update(n => n + 1);
				setTimeout(() => showGameOverScreen("Better luck next time"), 2000);
			} else {
				currentRow.update(n => n + 1);
			}
		}
	}

	function isLetter(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	}
</script>

<div class="game">
	<Board bind:this={gameBoard} rows={rows} />
	<Keyboard on:key={(e) => handleKey(e.detail)} keysUsed={keysUsed} />
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