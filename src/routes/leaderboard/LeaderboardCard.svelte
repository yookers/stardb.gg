<script>
	export let player;
	const ASSETS_URL = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';

	const date = new Date(player.timestamp);
	// Get day, month, year
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();
	// Get the time in 12-hour format
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours %= 12;
	hours = hours || 12;
	// Final date format
	const formattedDate = `${hours}:${minutes
		.toString()
		.padStart(2, '0')}${ampm} ${month} ${day}, ${year}`;
</script>

<div
	class="rounded-lg border-2 border-purple_highlight bg-space_dark p-4 text-white_warm shadow-lg"
>
	<div class="flex items-center">
		<img class="h-12 w-12 rounded-full" src={ASSETS_URL + player.avatar_icon} alt={player.name} />
		<div class="ml-4">
			<div class="text-lg font-semibold">{player.name}</div>
			<div class="text-sm">Level {player.level}</div>
		</div>
	</div>
	<div class="mt-2">
		<div>Characters Owned: {player.character_count}</div>
		<div>Last Updated: {formattedDate}</div>
	</div>
</div>
