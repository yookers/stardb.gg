<script>
	export let data;
	import LeaderboardCard from './LeaderboardCard.svelte';

	let showCard = false;
	let selectedPlayer = null;
	let cardPosition = { x: 0, y: 0 };

	function handleMouseEnter(event, player) {
		showCard = true;
		selectedPlayer = player;
		cardPosition = { x: event.clientX + 10, y: event.clientY + 10 };
	}

	function handleMouseMove(event) {
		if (showCard) {
			cardPosition = { x: event.clientX + 10, y: event.clientY + 10 };
		}
	}

	function handleMouseLeave() {
		showCard = false;
	}
</script>

<svelte:head>
	<title>Leaderboard</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="flex flex-col flex-grow min-h-screen font-inter text-white_warm">
	<p class="text-4xl font-bold text-center p-8">Leaderboard</p>
	<div class="card bg-purple_highlight">
		<div class="flex justify-center">
			<table class="text-center bg-space_light">
				<thead>
					<tr>
						<th></th>
						<th class="">Name</th>
						<th class="">Level</th>
						<th class="">Signature</th>
						<th class="">Number of Achievements</th>
					</tr>
				</thead>
				<tbody>
					{#each data.leaderboardData as player (player.uid)}
						<tr
							class="[&:nth-child(2n)]:bg-space_dark"
							on:mouseenter={(event) => handleMouseEnter(event, player)}
							on:mousemove={handleMouseMove}
							on:mouseleave={handleMouseLeave}
						>
							<td></td>
							<td class="">{player.name}</td>
							<td class="">{player.level}</td>
							<td class="text-left">{player.signature}</td>
							<td class="">{player.achievement_count}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

{#if showCard}
	<div
		class="profile-card fixed"
		style="transform: translate({cardPosition.x}px, {cardPosition.y}px);"
	>
		<LeaderboardCard player={selectedPlayer} />
	</div>
{/if}

<style lang="postcss">
	/* Custom styles */
	th,
	td {
		padding: 8px;
	}
	.profile-card {
		top: 0;
		left: 0;
		transform: translate(0, 0);
		transition: transform 0.1s ease-out;
	}
</style>
