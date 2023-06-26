<script>
	export let player;
	const ASSETS_URL = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
</script>

<div class="rounded-lg shadow-lg p-4 bg-space_dark text-white_warm border-2 border-purple_highlight">
	<div class="flex items-center">
		<img class="h-10 w-10 rounded-full" src={ASSETS_URL + player.avatar_icon} alt={player.name} />
		<div class="ml-4">
			<div class="text-lg font-semibold">{player.name}</div>
			<div class="text-sm">Level {player.level}</div>
		</div>
	</div>
	<div class="mt-2">
		<div>Achievements: {player.achievement_count}</div>
		<div>Characters Owned: {player.character_count}</div>
		<div>Last Updated: {player.timestamp}</div>
	</div>
</div>
