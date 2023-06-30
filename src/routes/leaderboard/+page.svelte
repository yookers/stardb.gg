<script>
	export let data;
	import { Icon, Bars3BottomLeft, ChevronUp, ChevronDown } from 'svelte-hero-icons';
	import LeaderboardCard from './LeaderboardCard.svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { searchResults } from '../store.js';

	let showCard = false;
	let selectedPlayer = null;
	let selectedRegion = 'all';
	let cardPosition = { x: 0, y: 0 };

	let mouseThrottle = false;

	let searchData;
	let filteredData;
	let leaderboardSlice;
	let totalPlayers;
	let rowCount;
	let startRank;
	let endRank;

	let currentLeaderboardPage = 1;
	const rowsPerPage = 20;

	function navigateToPlayerProfile(uid) {
		goto(`/profile/${uid}`);
	}

	function handleMouseEnter(event, player) {
		showCard = true;
		selectedPlayer = player;
		updateCardPosition(event.clientX, event.clientY);
	}

	function handleMouseMove(event) {
		if (showCard && !mouseThrottle) {
			mouseThrottle = true;
			updateCardPosition(event.clientX, event.clientY);
			setTimeout(() => {
				mouseThrottle = false;
			}, 16); // About 60fps
		}
	}

	function setRegionFilter(region) {
		selectedRegion = region;
		currentLeaderboardPage = 1; // Reset page number
	}

	function updateCardPosition(cursorX, cursorY) {
		const halfViewportWidth = window.innerWidth / 2;
		const halfViewportHeight = window.innerHeight / 2;
		const cardWidth = 300;
		const cardHeight = 200;
		const offsetX = 10;
		const offsetY = 10;
		let positionX, positionY;
		// Determine horizontal position of the card
		if (cursorX >= halfViewportWidth) {
			// Display the card to the left of the cursor if the cursor is on the right half of the viewport
			positionX = cursorX - cardWidth - offsetX;
		} else {
			// Display the card to the right of the cursor if the cursor is on the left half of the viewport
			positionX = cursorX + offsetX;
		}
		// Determine vertical position of the card
		if (cursorY >= halfViewportHeight) {
			// Display the card above the cursor if the cursor is on the bottom half of the viewport
			positionY = cursorY - cardHeight - offsetY;
		} else {
			// Display the card below the cursor if the cursor is on the top half of the viewport
			positionY = cursorY + offsetY;
		}
		cardPosition = { x: positionX, y: positionY };
	}

	function handleMouseLeave() {
		showCard = false;
	}

	searchResults.subscribe((results) => {
		if (results !== null) {
			searchData = results;
		} else {
			searchData = data.leaderboardData;
		}
		currentLeaderboardPage = 1;
	});

	$: {
		// Filter by region if a region is selected.
		filteredData =
			selectedRegion === 'all'
				? searchData
				: searchData.filter((player) => player.region === selectedRegion);

		// Slice the data to display only the current page.
		leaderboardSlice = filteredData.slice(
			(currentLeaderboardPage - 1) * rowsPerPage,
			currentLeaderboardPage * rowsPerPage
		);

		totalPlayers = filteredData.length;
		rowCount = leaderboardSlice.length;
		startRank = (currentLeaderboardPage - 1) * rowsPerPage + 1;
		endRank = startRank + rowCount - 1;
	}
</script>

<svelte:head>
	<title>Achievement Leaderboard</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="flex w-full justify-center">
	<div class="flex flex-col text-white_warm">
		<!-- Region filter section -->
		<div class="flex space-x-2 py-6 pl-28">
			<Icon src={Bars3BottomLeft} class="h-8 w-8 text-white_warm" />
			<button
				class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-purple_highlight text-lg font-extrabold hover:bg-purple_highlight hover:text-space_dark {selectedRegion ===
				'all'
					? 'bg-purple_highlight text-space_dark'
					: 'text-purple_highlight'}"
				on:click={() => setRegionFilter('all')}
			>
				<p>ALL</p>
			</button>
			<button
				class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-neon_yellow text-lg font-extrabold hover:bg-neon_yellow hover:text-space_dark {selectedRegion ===
				'na'
					? 'bg-neon_yellow text-space_dark'
					: 'text-neon_yellow'}"
				on:click={() => setRegionFilter('na')}
			>
				<p>NA</p>
			</button>
			<button
				class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-neon_pink text-lg font-extrabold hover:bg-neon_pink hover:text-space_dark {selectedRegion ===
				'eu'
					? 'bg-neon_pink text-space_dark'
					: 'text-neon_pink'}"
				on:click={() => setRegionFilter('eu')}
			>
				<p>EU</p>
			</button>
			<button
				class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-neon_green text-lg font-extrabold hover:bg-neon_green hover:text-space_dark {selectedRegion ===
				'asia'
					? 'bg-neon_green text-space_dark'
					: 'text-neon_green'}"
				on:click={() => setRegionFilter('asia')}
			>
				<p>ASIA</p>
			</button>
			<button
				class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-neon_blue text-lg font-extrabold hover:bg-neon_blue hover:text-space_dark {selectedRegion ===
				'cn'
					? 'bg-neon_blue text-space_dark'
					: 'text-neon_blue'}"
				on:click={() => setRegionFilter('cn')}
			>
				<p>CN</p>
			</button>
		</div>
		<!-- Leaderboard section -->
		<div class="flex pl-6">
			<div class="mt-0.5 flex flex-col py-6 text-sm font-bold">
				<p class="pb-2.5">Rank</p>
				{#each leaderboardSlice as player (player.uid)}
					<div class="py-4 text-right" in:fly={{ y: 40, easing: cubicInOut, duration: 400 }}>
						{#if selectedRegion !== 'all'}
							{player.regional_rank}
						{:else}
							{player.global_rank}
						{/if}
					</div>
				{/each}
			</div>
			<!-- Main leaderboard content -->
			<div class="just flex-col px-6">
				<div class="rounded-lg border-2 border-purple_highlight bg-space_light p-6">
					<table
						class="w-full max-w-xl table-fixed overflow-visible text-left text-sm md:max-w-4xl"
					>
						<thead>
							<tr>
								<th class="w-6 md:w-12" />
								<!-- Region indicator -->
								<th class="w-20 px-2 pb-2 md:w-32">Name</th>
								<th class="hidden w-auto truncate px-2 pb-2 md:table-cell">Signature</th>
								<th class="hidden w-24 truncate px-2 pb-2 text-center lg:table-cell">Level</th>
								<th class="w-20 truncate px-2 pb-2 text-center md:w-32">Achievements</th>
							</tr>
						</thead>
						<tbody>
							{#each leaderboardSlice as player (player.uid)}
								<tr
									class="cursor-pointer even:bg-space_dark hover:text-space_dark"
									class:hover:bg-neon_yellow={player.region === 'na'}
									class:hover:bg-neon_pink={player.region === 'eu'}
									class:hover:bg-neon_green={player.region === 'asia'}
									class:hover:bg-neon_blue={player.region === 'cn'}
									in:fly={{ y: 40, easing: cubicInOut, duration: 400 }}
								>
									<!-- 	on:click={() => navigateToPlayerProfile(player.uid)}
									    on:mouseenter={(event) => handleMouseEnter(event, player)}
									    on:mousemove={handleMouseMove}
									    on:mouseleave={handleMouseLeave} -->

									<td class="pl-5">
										<!-- Region indicator -->
										<div
											class="h-2 w-2 rounded-full"
											class:bg-neon_yellow={player.region === 'na'}
											class:bg-neon_pink={player.region === 'eu'}
											class:bg-neon_green={player.region === 'asia'}
											class:bg-neon_blue={player.region === 'cn'}
										/>
									</td>
									<td class="truncate px-2 py-4 font-bold">{player.name}</td>
									<td class="hidden truncate px-2 py-4 italic md:table-cell">{player.signature}</td>
									<td class="hidden px-2 py-4 text-center font-bold lg:table-cell"
										>{player.level}</td
									>
									<td class="px-2 py-4 text-center font-bold">{player.achievement_count}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<!-- Footer information -->
				<div class="py-4 pl-6 text-sm">
					<p>
						Showing <span class="font-bold">{startRank}</span> -
						<span class="font-bold">{endRank}</span>
						of <span class="font-bold">{totalPlayers}</span> players
					</p>
				</div>
			</div>
			<!-- Pagination buttons -->
			<div class="flex flex-col space-y-3 pr-8 pt-10">
				<button
					class="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-purple_highlight bg-space_light text-white hover:bg-purple_highlight"
					on:click={() => {
						if (currentLeaderboardPage > 1) currentLeaderboardPage--;
					}}
				>
					<Icon src={ChevronUp} mini class="h-6 w-6 text-white_warm" />
				</button>
				<div class="flex justify-center text-xl font-bold">
					<p>{currentLeaderboardPage}</p>
				</div>
				<button
					class="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-purple_highlight bg-space_light text-white hover:bg-purple_highlight"
					on:click={() => {
						if (currentLeaderboardPage * rowsPerPage < filteredData.length)
							currentLeaderboardPage++;
					}}
				>
					<Icon src={ChevronDown} mini class="h-6 w-6 text-white_warm" />
				</button>
			</div>
		</div>
	</div>
</div>

{#if showCard}
	<div
		class="fixed left-0 top-0"
		style="transform: translate({cardPosition.x}px, {cardPosition.y}px);"
	>
		<LeaderboardCard player={selectedPlayer} />
	</div>
{/if}
