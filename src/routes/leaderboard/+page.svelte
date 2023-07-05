<script>
	export let data;
	import { Icon, Bars3BottomLeft, ChevronUp, ChevronDown } from 'svelte-hero-icons';
	import LeaderboardCard from './LeaderboardCard.svelte';
	import AddPlayer from './AddPlayer.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { searchResults } from '../store.js';

	// Player card variables
	let showCard = false;
	let selectedPlayer = null;
	let selectedRegion = 'all';
	let cardPosition = { x: 0, y: 0 };
	let mouseThrottle = false;

	// Add player notification variables
	let showNotification = false;
	let notificationType = '';

	// Leaderboard variables
	let searchData, filteredData, leaderboardSlice, totalPlayers, rowCount, startRank, endRank;
	let currentLeaderboardPage = 1;
	let maxLeaderboardPage;
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

	function resetLeaderboardView() {
		selectedRegion = 'all';
		currentLeaderboardPage = 1;
	}

	function updateAddPlayerNotification(event) {
		if (event.detail.notificationType === 'success') {
			notificationType = 'success';
			showNotification = true;
			resetLeaderboardView();
			searchData = event.detail.data;
		} else if (event.detail.notificationType === 'error') {
			notificationType = 'error';
			showNotification = true;
		}
		setTimeout(() => {
			showNotification = false;
		}, 2500);
	}

	searchResults.subscribe((results) => {
		if (results !== null) {
			searchData = results;
		} else {
			searchData = data.leaderboardData;
		}
		resetLeaderboardView();
	});

	onMount(() => {
		// Get the page number from the URL query string
		const urlParams = new URLSearchParams(window.location.search);
		const page = urlParams.get('page');
		if (page) {
			maxLeaderboardPage = Math.ceil(totalPlayers / rowsPerPage);
			const pageNumber = parseInt(page, 10);
			currentLeaderboardPage = Math.min(maxLeaderboardPage, Math.max(1, pageNumber));
		}
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
	<meta name="description" content="StarDB.gg - Achievement Leaderboard" />
</svelte:head>

<div class="flex justify-center">
	<div class="flex flex-col text-white_warm">
		<!-- Region filter section -->
		<div class="flex justify-between space-x-6 py-6 pl-16 pr-16 md:pr-24">
			<div class="flex flex-col space-y-2">
				<p class="line-clamp-1 pl-1 text-sm font-bold">Region Filter</p>
				<div class="hidden space-x-2 md:flex">
					<button
						class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-purple_highlight text-lg font-extrabold hover:bg-purple_highlight hover:text-space_dark {selectedRegion ===
						'all'
							? 'bg-purple_highlight text-space_dark'
							: 'text-purple_highlight'}"
						aria-label="Filter by ALL regions"
						on:click={() => setRegionFilter('all')}
					>
						<p>ALL</p>
					</button>
					<button
						class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-neon_yellow text-lg font-extrabold hover:bg-neon_yellow hover:text-space_dark {selectedRegion ===
						'na'
							? 'bg-neon_yellow text-space_dark'
							: 'text-neon_yellow'}"
						aria-label="Filter by NA region"
						on:click={() => setRegionFilter('na')}
					>
						<p>NA</p>
					</button>
					<button
						class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-neon_pink text-lg font-extrabold hover:bg-neon_pink hover:text-space_dark {selectedRegion ===
						'eu'
							? 'bg-neon_pink text-space_dark'
							: 'text-neon_pink'}"
						aria-label="Filter by EU region"
						on:click={() => setRegionFilter('eu')}
					>
						<p>EU</p>
					</button>
					<button
						class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-neon_green text-lg font-extrabold hover:bg-neon_green hover:text-space_dark {selectedRegion ===
						'asia'
							? 'bg-neon_green text-space_dark'
							: 'text-neon_green'}"
						aria-label="Filter by ASIA region"
						on:click={() => setRegionFilter('asia')}
					>
						<p>ASIA</p>
					</button>
					<button
						class="flex h-8 w-16 items-center justify-center rounded-lg border-2 border-neon_blue text-lg font-extrabold hover:bg-neon_blue hover:text-space_dark {selectedRegion ===
						'cn'
							? 'bg-neon_blue text-space_dark'
							: 'text-neon_blue'}"
						aria-label="Filter by CN region"
						on:click={() => setRegionFilter('cn')}
					>
						<p>CN</p>
					</button>
				</div>
				<div class="md:hidden">
					<select
						class="h-8 w-full rounded-lg pl-2 text-lg font-extrabold text-space_dark"
						bind:value={selectedRegion}
						on:change={(e) => setRegionFilter(e.currentTarget.value)}
						class:bg-purple_highlight={selectedRegion === 'all'}
						class:bg-neon_yellow={selectedRegion === 'na'}
						class:bg-neon_pink={selectedRegion === 'eu'}
						class:bg-neon_green={selectedRegion === 'asia'}
						class:bg-neon_blue={selectedRegion === 'cn'}
					>
						<option value="all" class="bg-purple_highlight font-extrabold">ALL</option>
						<option value="na" class="bg-neon_yellow font-extrabold">NA</option>
						<option value="eu" class="bg-neon_pink font-extrabold">EU</option>
						<option value="asia" class="bg-neon_green font-extrabold">ASIA</option>
						<option value="cn" class="bg-neon_blue font-extrabold">CN</option>
					</select>
				</div>
			</div>
			<!-- Add player by UID section -->
			<div class="flex flex-col space-y-2">
				<p class="pl-1 text-sm font-bold">Add Player UID</p>
				<AddPlayer on:addplayer={updateAddPlayerNotification} />
			</div>
		</div>
		<!-- Leaderboard section -->
		<div class="flex justify-center">
			<div class="mt-0.5 flex flex-col py-6 text-sm font-bold">
				<p class="pb-2">Rank</p>
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
			<div class="just flex-col px-4 md:px-6">
				<div class="rounded-lg border-2 border-purple_highlight bg-space_light px-4 py-6 md:px-6">
					<table class="w-52 table-fixed text-left text-sm sm:w-[410px] md:w-[510px] lg:w-[800px]">
						<thead>
							<tr>
								<!-- Region indicator -->
								<th class="w-3 md:w-5" />
								<th class="w-6 pb-2 md:w-12">Name</th>
								<th class="hidden truncate px-2 pb-2 sm:table-cell sm:w-8 md:w-28 lg:w-36"
									>Signature</th
								>
								<th class="hidden w-8 truncate px-2 pb-2 text-center lg:table-cell">Level</th>
								<th class="w-6 truncate px-2 pb-2 text-left md:w-14 md:text-center">Achievements</th
								>
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
									on:click={() => navigateToPlayerProfile(player.uid)}
									on:mouseenter={(event) => handleMouseEnter(event, player)}
									on:mousemove={handleMouseMove}
									on:mouseleave={handleMouseLeave}
								>
									<td class="px-5">
										<!-- Region indicator -->
										<div
											class="h-2 w-2 rounded-full"
											class:bg-neon_yellow={player.region === 'na'}
											class:bg-neon_pink={player.region === 'eu'}
											class:bg-neon_green={player.region === 'asia'}
											class:bg-neon_blue={player.region === 'cn'}
										/>
									</td>
									<td class="truncate py-4 font-bold md:pl-0">{player.name}</td>
									<td class="hidden truncate px-2 py-4 italic sm:table-cell">{player.signature}</td>
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
				<div class="py-4 pl-4 text-sm md:pl-6">
					<p>
						Showing <span class="font-bold">{startRank}</span> -
						<span class="font-bold">{endRank}</span>
						of <span class="font-bold">{totalPlayers}</span> players
					</p>
				</div>
			</div>
			<!-- Pagination buttons -->
			<div class="flex-col space-y-3 pt-10">
				<button
					class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-purple_highlight bg-space_light text-white hover:bg-purple_highlight md:h-12 md:w-12"
					aria-label="Previous page on leaderboard"
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
					class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-purple_highlight bg-space_light text-white hover:bg-purple_highlight md:h-12 md:w-12"
					aria-label="Next page on leaderboard"
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

<!-- Player add notification -->
{#if showNotification}
	<div class="flex justify-center">
		<div
			class="fixed bottom-20 flex w-64 justify-center rounded-lg p-2 font-bold text-space_dark md:w-96 {notificationType ===
			'success'
				? 'bg-neon_green'
				: 'bg-neon_pink'}"
			transition:fly={{ y: 40, easing: cubicInOut, duration: 400 }}
		>
			{#if notificationType === 'success'}
				Sucessfully added player to leaderboard!
			{:else}
				Failed to add player to leaderboard.
			{/if}
		</div>
	</div>
{/if}

<!-- Leaderboard hover profile card -->
{#if showCard}
	<div
		class="fixed left-0 top-0"
		style="transform: translate({cardPosition.x}px, {cardPosition.y}px);"
	>
		<LeaderboardCard player={selectedPlayer} />
	</div>
{/if}
