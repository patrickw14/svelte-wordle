<script>
	import Game from './game/Game.svelte';
</script>

<header>Patrick's Wordle</header>

<main>
	<Game />
</main>

<style>
	header {
		font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
   		font-weight: 700;
    	font-size: 37px;
    	line-height: 100%;
    	letter-spacing: 0.01em;
    	text-align: center;
    	left: 0;
    	right: 0;
    	pointer-events: none;
	}
</style>