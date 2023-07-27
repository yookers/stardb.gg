<script lang="ts">
	import Logo from './Logo.svelte';
	let m = { x: 0, y: 0 };

	function handleMove(event: MouseEvent) {
		m.x = (window.innerWidth / 2 - event.clientX) / 30;
		m.y = (window.innerHeight / 2 - event.clientY) / 30;
	}
</script>

<svelte:head>
	<title>StarDB.gg - Leaderboards and Tools for Honkai Star Rail</title>
	<meta
		name="description"
		content="View the top ranked players and builds in Honkai Star Rail. Featuring a leaderboard, smart achievement tracker, and player card generator."
	/>
</svelte:head>

<div
	class="flex h-full flex-col items-center justify-center text-off_white"
	on:pointermove={handleMove}
>
	<div
		class="flex items-center space-x-4 stroke-galaxy_purple-250 py-12 font-dm_sans text-5xl tracking-tighter text-galaxy_purple-250 md:text-8xl"
	>
		<Logo class="w-12 overflow-visible fill-none stroke-[8] md:w-24" />
		<p class="select-none">stardb.gg</p>
	</div>
	<div
		class="relative flex h-36 w-64 justify-center overflow-clip rounded-2xl border-2 border-galaxy_purple-250 md:w-[600px]"
	>
		<img
			src="images/galaxy/galaxy-small.webp"
			alt="Galaxy background"
			class="absolute -top-16 opacity-20 blur-sm"
			style="transform: translate3d({m.x}px, {m.y}px, 0) scale(1.8);"
		/>
	</div>
</div>
