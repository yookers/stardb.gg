<script>
	export let player;
	const ASSETS_URL = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
</script>

<div class="bg-white rounded shadow-lg p-4 dark-mode">
	<div class="flex items-center">
		<img class="h-10 w-10 rounded-full" src={ASSETS_URL + player.avatar_icon} alt={player.name} />
		<div class="ml-4">
			<div class="text-lg font-semibold">{player.name}</div>
			<div class="text-sm text-gray-500">Level {player.level}</div>
		</div>
	</div>
	<div class="mt-2">
		<div>Achievements: {player.achievement_count}</div>
		<div>Characters Owned: {player.character_count}</div>
		<div>Last Updated: {player.timestamp}</div>
	</div>
</div>

<style lang="postcss">
	/* Tailwind dark mode styles */
	.dark-mode {
		@apply bg-gray-900 text-gray-200;
	}
</style>
