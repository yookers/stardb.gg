<script>
	export let player;
	const ASSETS_URL = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
</script>

<div
	class="rounded-lg border-2 border-purple_highlight bg-gradient-to-r from-space_dark to-space_light p-4 text-white_warm shadow-lg"
>
	<div class="flex items-center">
		<img class="h-12 w-12 rounded-full" src={ASSETS_URL + player.avatar_icon} alt={player.name} />
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
