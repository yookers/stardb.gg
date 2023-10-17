<script lang="ts">
	const PUBLIC_SERVER_API_URL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	import { PUBLIC_CDN_RES_API_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { Trophy, Minimize2, Maximize2, ChevronDown, ChevronUp, RefreshCw } from 'lucide-svelte';
	import { locale } from '$store';
	import SearchPlayerCard from './SearchPlayerCard.svelte';
	import AddPlayerCard from './AddPlayerCard.svelte';
	import StatisticsCard from './StatisticsCard.svelte';
	import FilterCard from './FilterCard.svelte';
	import PopUpMessage from '$components/PopUpMessage.svelte';
	import NitroBanner from '$components/NitroBanner.svelte';
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
	let searchQuery = '';
	let playerUID = '';
	let isScreenExpanded = true;
	let addPlayerDisplay = false; // Display the return value from addPlayerUID() without triggering reactivity

	function setRegion(region: string) {
		regionFilter = region;
		let queryParams = `page=1`;
		if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
		if (searchQuery) queryParams += `&query=${searchQuery}`;

		goto(`/${$locale}/leaderboard?${queryParams}`, { noScroll: true });
	}

	// World or Region ranking
	function setRanking(ranking: string) {
		rankingFilter = ranking;
	}

	function searchByName(query: string) {
		let queryParams = `page=1`;
		if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
		if (query) queryParams += `&query=${query}`;

		goto(`/${$locale}/leaderboard?${queryParams}`, { noScroll: true });
	}

	function searchByUID(query: string) {
		goto(`/${$locale}/leaderboard?uid=${query}`, { noScroll: true });
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
			if (searchQuery) queryParams += `&query=${searchQuery}`;

			goto(`/${$locale}/leaderboard?${queryParams}`, { noScroll: true });
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			let queryParams = `page=${currentPage - 1}`;
			if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
			if (searchQuery) queryParams += `&query=${searchQuery}`;

			goto(`/${$locale}/leaderboard?${queryParams}`, { noScroll: true });
		}
	}

	function resetLeaderboard() {
		searchQuery = '';
		playerUID = '';
		goto(`/${$locale}/leaderboard?`, { noScroll: true, replaceState: true });
	}

	$: {
		if (!data.error) {
			if (!addPlayerDisplay) {
				currentPage = Number($page.url.searchParams.get('page')) || 1;
				playerScores = data.playerScores;
				queryCount = data.queryCount || playerScores.length;
				statisticsData = data.regionCount ? data.regionCount : statisticsData;
				regionFilter = $page.url.searchParams.get('region') || 'all';
				searchQuery = $page.url.searchParams.get('query') || '';
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
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stardb.gg/leaderboard" />
	<meta property="og:title" content="Achievement Leaderboard - Honkai: Star Rail - StarDB.GG" />
	<meta
		property="og:description"
		content="Discover the top players of Honkai: Star Rail at StarDB.GG. Explore our comprehensive leaderboard, spanning every region, and see where you rank!"
	/>
	<meta property="og:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://stardb.gg/leaderboard" />
	<meta name="twitter:title" content="Achievement Leaderboard - Honkai: Star Rail - StarDB.GG" />
	<meta
		name="twitter:description"
		content="Discover the top players of Honkai: Star Rail at StarDB.GG. Explore our comprehensive leaderboard, spanning every region, and see where you rank!"
	/>
	<meta name="twitter:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />

	<link rel="canonical" href="https://stardb.gg/leaderboard" />
</svelte:head>

<main
	class="flex w-full flex-col justify-center space-x-0 space-y-3 px-2 text-off_white sm:space-y-4 sm:px-6 lg:px-20
    {isScreenExpanded ? 'xl:flex-row xl:space-x-4 xl:space-y-6 xl:px-6' : 'xl:items-center xl:space-y-4'}"
>
	<!-- Column 1 -->
	<div
		class="w-full text-lg lg:text-xl
    {isScreenExpanded ? 'xl:w-side xl:pt-40' : 'xl:w-main'}"
	>
		<h1
			class="pb-2 pl-2 pt-4 text-xl font-bold sm:pb-3 md:text-3xl"
			in:fly={{ y: 20, duration: 300, delay: 150, easing: cubicInOut }}
		>
			Achievement Leaderboard
		</h1>
		<h2 class="pb-2 pl-2 text-xs sm:pb-3 md:text-sm" in:fly={{ y: 20, duration: 300, delay: 250, easing: cubicInOut }}>
			Discover the top players of Honkai: Star Rail at <span class="font-bold">StarDB.GG</span>. Explore our comprehensive
			leaderboard, spanning every region, and see where you rank!
		</h2>
		<!-- Sticky top-16 + pt-4 = top-20 -->
		<div class="top-20 space-y-3 sm:space-y-4 xl:sticky">
			<SearchPlayerCard {searchByName} {searchByUID} />
			<AddPlayerCard addPlayerUID={handleAddPlayer} />
			<StatisticsCard {statisticsData} />
		</div>
	</div>

	<!-- Column 2 -->
	<div class="relative flex w-full flex-col space-y-3 pb-4 sm:space-y-4 sm:pb-6 xl:w-main">
		<FilterCard {regionFilter} {rankingFilter} {setRegion} {setRanking} {queryCount} {displayStart} {displayEnd} />

		<!-- Pagination buttons -->
		<div class="fixed bottom-16 right-8 z-[3] flex select-none flex-col items-center space-y-2 rounded-xl">
			<button
				class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 hover:scale-105 hover:bg-galaxy_purple-450 md:h-14 md:w-14"
				aria-label="Previous page"
				on:click={prevPage}
				><ChevronUp class="h-8 w-8 md:h-10 md:w-10" />
			</button>
			<p class="text-center text-2xl font-bold md:text-3xl">{currentPage}</p>
			<button
				class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 hover:scale-105 hover:bg-galaxy_purple-450 md:h-14 md:w-14"
				aria-label="Next page"
				on:click={nextPage}><ChevronDown class="h-8 w-8 md:h-10 md:w-10" /></button
			>
		</div>

		<NitroBanner />

		<!-- Leaderboard-->
		<div
			class="rounded-xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750 transition-all duration-300 hover:border-galaxy_purple-650"
		>
			<div class="flex items-center justify-between px-5 py-2 sm:py-3">
				<div class="flex items-center space-x-4">
					<Trophy class="h-5 w-5 text-off_white" />
					<p class="text-xl font-bold">Leaderboard</p>
				</div>
				<div class="flex space-x-4">
					<button class="hover:scale-110" aria-label="Reset leaderboard filters" on:click={() => resetLeaderboard()}>
						<RefreshCw class="h-5 w-5 text-off_white hover:animate-spin" />
					</button>
					<button
						class="hidden hover:scale-110 xl:block"
						aria-label="{isScreenExpanded ? 'Minimize' : 'Expand'} leaderboard"
						on:click={() => (isScreenExpanded = !isScreenExpanded)}
					>
						{#if isScreenExpanded}
							<Minimize2 class="h-5 w-5 text-off_white" />
						{:else}
							<Maximize2 class="h-5 w-5 text-off_white" />
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
								class="cursor-pointer even:bg-galaxy_purple-800/90 hover:text-galaxy_purple-850"
								class:hover:bg-neon_yellow={player.region === 'na'}
								class:hover:bg-neon_pink={player.region === 'eu'}
								class:hover:bg-neon_green={player.region === 'asia'}
								class:hover:bg-neon_blue={player.region === 'cn'}
								in:fly={{ y: 30, easing: cubicInOut, duration: 400 }}
								on:click={() => goto(`/${$locale}/profile/${player.uid}`)}
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
										src={`${PUBLIC_CDN_RES_API_URL}/StarRailResWebp/${player.avatar_icon.replace(/\.png$/, '.webp')}`}
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
	<PopUpMessage messageType={MessageType.FAIL} messageContent={`Error searching for player`} />
{/if}

{#if addPlayerPromise}
	{#await addPlayerPromise}
		<PopUpMessage messageType={MessageType.LOADING} messageContent={`Attempting to add ${playerUID} ...`} />
	{:then}
		<PopUpMessage messageType={MessageType.SUCCESS} messageContent={`Successfully added ${playerUID}!`} />
	{:catch}
		<PopUpMessage messageType={MessageType.FAIL} messageContent={`Failed to add player`} />
	{/await}
{/if}
