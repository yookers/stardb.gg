<script lang="ts">
	const PUBLIC_SERVER_API_URL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	import { PUBLIC_RES_API_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { Trophy, Minimize2, Maximize2, ChevronDown, ChevronUp, RefreshCw } from 'lucide-svelte';
	import SearchPlayerCard from './SearchPlayerCard.svelte';
	import AddPlayerCard from './AddPlayerCard.svelte';
	import StatisticsCard from './StatisticsCard.svelte';
	import FilterCard from './FilterCard.svelte';
	import PopupMessage from './PopupMessage.svelte';
	import { MessageType } from '$types';

	export let data;
	let currentPage = 1;
	const paginationLimit = 25;
	let queryCount = 1;
	let maxPages = 1;
	let displayStart = 1;
	let displayEnd = 1;
	let playerScores: any[] = [];
	let statisticsData: any[] = [];
	let regionFilter = 'all'; // 'all', 'na', 'eu', 'asia', 'cn'
	let rankingFilter = 'World'; // 'World' or 'Region'
	let query = '';
	let playerUID = '';
	let isScreenExpanded = true;
	let addPlayerDisplay = false; // Display the return value from addPlayerUID() without triggering reactivity

	function setRegion(region: string) {
		regionFilter = region;
		let queryParams = `page=1`;
		if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
		if (query) queryParams += `&query=${query}`;

		goto(`/leaderboard?${queryParams}`, { noScroll: true });
	}

	// World or Region ranking
	function setRanking(ranking: string) {
		rankingFilter = ranking;
	}

	function searchByName(query: string) {
		let queryParams = `page=1`;
		if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
		if (query) queryParams += `&query=${query}`;

		goto(`/leaderboard?${queryParams}`, { noScroll: true });
	}

	function searchByUID(query: string) {
		goto(`/leaderboard?uid=${query}`, { noScroll: true });
	}

	// Await block display
	let addPlayerPromise: Promise<void>;
	async function handleAddPlayer(uid: string) {
		playerUID = uid;
		addPlayerPromise = addPlayerUID(uid);
	}

	async function addPlayerUID(uid: string) {
		const url = `${PUBLIC_SERVER_API_URL}/scores/achievements/${uid}`;
		try {
			const response = await fetch(url, {
				method: 'PUT'
			});

			if (!response.ok) {
				throw new Error();
			}
			const data = await response.json();
			addPlayerDisplay = true;
			playerScores = [data];
			currentPage = 1;
			queryCount = 1;
			return;
		} catch (error) {
			throw new Error();
		}
	}

	// Leaderboard Pagination
	function nextPage() {
		if (currentPage < maxPages) {
			// noScroll prevents the page from scrolling to the top
			let queryParams = `page=${currentPage + 1}`;
			if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
			if (query) queryParams += `&query=${query}`;

			goto(`/leaderboard?${queryParams}`, { noScroll: true });
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			let queryParams = `page=${currentPage - 1}`;
			if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
			if (query) queryParams += `&query=${query}`;

			goto(`/leaderboard?${queryParams}`, { noScroll: true });
		}
	}

	function resetLeaderboard() {
		goto(`/leaderboard?`, { noScroll: true, replaceState: true });
	}

	$: {
		if (!data.error) {
			if (!addPlayerDisplay) {
				currentPage = Number($page.url.searchParams.get('page')) || 1;
				playerScores = data.playerScores;
				queryCount = data.queryCount || playerScores.length;
				statisticsData = data.regionCount ? data.regionCount : statisticsData;
				regionFilter = $page.url.searchParams.get('region') || 'all';
				query = $page.url.searchParams.get('query') || '';
			}
			// Calculate max pages
			maxPages = Math.ceil(queryCount / paginationLimit);

			// Calculate items currently displaying
			displayStart = queryCount > 0 ? (currentPage - 1) * paginationLimit + 1 : 0;
			displayEnd = Math.min(currentPage * paginationLimit, queryCount);

			// Reset addPlayerUID() display
			addPlayerDisplay = false;
		}
	}
</script>

<svelte:head>
	<title>Achievement Leaderboard - Honkai: Star Rail - StarDB.GG</title>
	<meta
		name="description"
		content="Discover the top players of Honkai: Star Rail at StarDB.GG. Explore our comprehensive leaderboard, spanning every region, and see where you rank!"
	/>
</svelte:head>

<main
	class="flex w-full flex-col justify-center space-x-0 px-4 text-off_white sm:px-6 lg:px-24
    {isScreenExpanded ? 'xl:flex-row xl:space-x-6 xl:px-6' : 'xl:items-center'}"
>
	<!-- Column 1 -->
	<div
		class="w-full text-lg lg:text-xl
    {isScreenExpanded ? 'xl:w-[550px] xl:pt-40' : 'xl:w-[1100px]'}"
	>
		<h1 class="pb-3 pt-6 text-2xl font-bold md:text-3xl">Achievement Leaderboard</h1>
		<!-- Sticky top-16 + pt-6 = top-[88px]-->
		<div class="top-[88px] space-y-4 sm:space-y-6 xl:sticky">
			<SearchPlayerCard {searchByName} {searchByUID} />
			<AddPlayerCard addPlayerUID={handleAddPlayer} />
			<StatisticsCard {statisticsData} />
		</div>
	</div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col space-y-4 sm:space-y-6 py-4 sm:py-6 xl:w-[1100px]">
		<FilterCard {regionFilter} {rankingFilter} {setRegion} {setRanking} {queryCount} {displayStart} {displayEnd} />

		<!-- Pagination buttons -->
		<div class="fixed bottom-16 right-8 z-[3] flex select-none flex-col items-center space-y-2 rounded-xl">
			<button
				class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 hover:scale-105 hover:bg-galaxy_purple-450 md:h-14 md:w-14"
				aria-label="Previous Page"
				on:click={prevPage}
				><ChevronUp class="h-8 w-8 md:h-10 md:w-10" />
			</button>
			<p class="text-center text-2xl font-bold md:text-3xl">{currentPage}</p>
			<button
				class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 hover:scale-105 hover:bg-galaxy_purple-450 md:h-14 md:w-14"
				aria-label="Next Page"
				on:click={nextPage}><ChevronDown class="h-8 w-8 md:h-10 md:w-10" /></button
			>
		</div>

		<!-- Leaderboard-->
		<div class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750 pt-3 transition-all duration-300">
			<div class="flex items-center justify-between px-5 pb-3">
				<div class="flex items-center space-x-4">
					<Trophy class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
					<p class="text-xl font-bold lg:text-2xl">Leaderboard</p>
				</div>
				<div class="flex space-x-4">
					<button class="hover:scale-110" aria-label="Reset Leaderboard Filters" on:click={() => resetLeaderboard()}>
						<RefreshCw class="h-5 w-5 text-off_white hover:animate-spin lg:h-6 lg:w-6" />
					</button>
					<button
						class="hidden hover:scale-110 xl:block"
						aria-label="Expand/Minimize Leaderboard"
						on:click={() => (isScreenExpanded = !isScreenExpanded)}
					>
						{#if isScreenExpanded}
							<Minimize2 class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
						{:else}
							<Maximize2 class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
						{/if}
					</button>
				</div>
			</div>
			<div class="flex px-2 pb-3 pt-2 md:px-6">
				<table class="w-full table-fixed border-collapse text-left text-xs sm:text-sm">
					<thead class="sticky top-[62px] z-[2] bg-galaxy_purple-750 text-galaxy_purple-250">
						<th class="w-8 py-2 pl-4 text-center md:w-16 md:pl-6">Rank</th>
						<!-- Region indicator -->
						<th class="hidden w-6 py-2 md:table-cell" scope="col" abbr="Region Indicator" />
						<!-- Player avatar -->
						<th class="w-14 py-2 pl-10 sm:w-20 sm:pl-11 md:w-40 md:pl-16 xl:w-44">Name</th>
						<th class="hidden w-28 truncate px-2 py-2 sm:table-cell md:w-full">Signature</th>
						<th class="hidden w-16 truncate px-2 py-2 text-center xl:table-cell">Level</th>
						<th class="sm:w-30 w-10 truncate px-4 py-2 text-center md:w-40">Achievements</th>
					</thead>
					<tbody>
						{#each playerScores as player (player.uid)}
							<tr
								class="cursor-pointer even:bg-galaxy_purple-800/90 hover:text-space_dark"
								class:hover:bg-neon_yellow={player.region === 'na'}
								class:hover:bg-neon_pink={player.region === 'eu'}
								class:hover:bg-neon_green={player.region === 'asia'}
								class:hover:bg-neon_blue={player.region === 'cn'}
								in:fly={{ y: 30, easing: cubicInOut, duration: 400 }}
								on:click={() => goto(`/profile/${player.uid}`)}
							>
								<td class="py-4 pl-4 text-center font-bold md:pl-6">
									{#if rankingFilter === 'World'}
										{player.global_rank}
									{:else}
										{player.regional_rank}
									{/if}
								</td>
								<td class="hidden px-4 py-4 md:table-cell">
									<!-- Region indicator -->
									<div
										class="h-2 w-2 rounded-full"
										class:bg-neon_yellow={player.region === 'na'}
										class:bg-neon_pink={player.region === 'eu'}
										class:bg-neon_green={player.region === 'asia'}
										class:bg-neon_blue={player.region === 'cn'}
									/>
								</td>
								<td class="flex items-center py-4 font-bold md:pl-3">
									<img
										class="mr-3 h-7 w-7 rounded-full border-2 sm:mr-4 md:h-9 md:w-9 md:border-galaxy_purple-750"
										class:border-neon_yellow={player.region === 'na'}
										class:border-neon_pink={player.region === 'eu'}
										class:border-neon_green={player.region === 'asia'}
										class:border-neon_blue={player.region === 'cn'}
										src={`${PUBLIC_RES_API_URL}/StarRailRes/${player.avatar_icon}`}
										alt="{player.name}'s Avatar Icon"
									/>
									<p class="truncate">{player.name}</p></td
								>
								<td class="hidden truncate px-2 py-4 italic sm:table-cell">{player.signature}</td>
								<td class="hidden px-2 py-4 text-center font-bold xl:table-cell">{player.level}</td>
								<td class="px-2 py-4 text-center font-bold">{player.achievement_count}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</main>

{#if data.error}
	<PopupMessage messageType={MessageType.FAIL} messageContent={`Error Searching for Player.`} />
{/if}

{#if addPlayerPromise}
	{#await addPlayerPromise}
		<PopupMessage messageType={MessageType.LOADING} messageContent={`Attempting to Add ${playerUID} ...`} />
	{:then}
		<PopupMessage messageType={MessageType.SUCCESS} messageContent={`Successfully Added ${playerUID}!`} />
	{:catch}
		<PopupMessage messageType={MessageType.FAIL} messageContent={`Failed to Add Player.`} />
	{/await}
{/if}
