<script>
	export let letter;
	export let state; //empty, correct, present, absent
</script>

<div class={`tile ${state}`}>{letter}</div>

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