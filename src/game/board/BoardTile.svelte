<script>
	export let letter;
	export let state; //empty, correct, present, absent
	export let characterIndex = 0;
	export async function shake() {
		animationState = "shake";
		await sleep(1000);
		animationState = "idle";
	}

	let prevLetter;
	let prevState;
	let animationState = "idle";

	let classState = state;

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	$: {
		if (prevLetter === " " && letter !== " ") {
			animationState = "pop";
			setTimeout(() => animationState = "idle", 100);
		}

		// I have no idea if it's safe to do stuff like this in Svelte reactive blocks...
		if (prevState === 'empty' && state !== 'empty') {
			sleep(150 * characterIndex)
				.then(() => {
					animationState = "flip-in";
					return sleep(500);
				})
				.then(() => {
					classState = state;
					animationState = "flip-out";
					return sleep(500);
				})
				.then(() => {
					animationState = "idle";
				});
		}
		prevState = state;
		prevLetter = letter;
	}
</script>

<div data-animation={animationState} class={`tile ${classState}`}>{letter}</div>

<style>
	.tile {
		width: 3em;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 2em;
		line-height: 2rem;
		font-weight: bold;
		vertical-align: middle;
		box-sizing: border-box;
		color: #fff;
		text-transform: uppercase;
		user-select: none;
	}

	.tile[data-animation='pop'] {
		animation-name: PopIn;
		animation-duration: 100ms;
	}

	@keyframes PopIn {
		from {
			transform: scale(0.8);
			opacity: 0;
		}

		40% {
			transform: scale(1.1);
			opacity: 1;
		}
	}

	.tile[data-animation='flip-in'] {
		animation-name: FlipIn;
		animation-duration: 500ms;
		animation-timing-function: ease-in;
	}

	@keyframes FlipIn {
		0% {
			transform: rotateY(0);
		}

		100% {
			transform: rotateY(90deg);
		}
	}

	.tile[data-animation='flip-out'] {
		animation-name: FlipOut;
		animation-duration: 500ms;
		animation-timing-function: ease-in;
	}

	@keyframes FlipOut {
		0% {
			transform: rotateY(90deg);
		}

		100% {
			transform: rotateY(0);
		}
	}

	.tile[data-animation='shake'] {
		animation-name: Shake;
		animation-duration: 1000ms;
		animation-timing-function: ease-in;
	}

	@keyframes Shake {
		10% {
			transform: translateX(-2px);
		}

		20% {
			transform: translateX(2px);
		}

		30% {
			transform: translateX(-3px);
		}

		40% {
			transform: translateX(3px);
		}

		50% {
			transform: translateX(-4px);
		}

		60% {
			transform: translateX(4px);
		}

		70% {
			transform: translateX(-3px);
		}

		80% {
			transform: translateX(3px);
		}

		90% {
			transform: translateX(-2px);
		}

		100% {
			transform: translateX(0);
		}
	}

	.empty {
		border: 2px solid #d3d6da;
		color: #000;
	}

	.correct {
		background-color: #6aaa64;
	}

	.present {
		background-color: #c9b458;
	}

	.absent {
		background-color: #787c7e;
	}
</style>