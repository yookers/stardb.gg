<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { UserPlus, LineChart, Trophy, ChevronDown, ChevronUp } from 'lucide-svelte';
	import SearchPlayerCard from './SearchPlayerCard.svelte';
	import StatisticsCard from './StatisticsCard.svelte';
	import FilterCard from './FilterCard.svelte';

	export let data;
	let currentPage;
	let playerScores;
	let carouselData;
	let regionFilter = 'all'; // 'all', 'na', 'eu', 'asia', 'cn'
	let rankingFilter = 'World'; // 'World' or 'Region'
	let query = '';

	// Region filter
	function setRegion(region) {
		regionFilter = region;
		let queryParams = `page=1`;
		if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
		if (query) queryParams += `&query=${query}`;

		goto(`/leaderboard?${queryParams}`, { noScroll: true });
	}

	function setRanking(ranking) {
		rankingFilter = ranking;
	}

	// Search by name
	function handleNameSearch(e) {
		e.preventDefault();
		let queryParams = `page=1`;
		if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
		if (query) queryParams += `&query=${query}`;

		goto(`/leaderboard?${queryParams}`, { noScroll: true });
	}

	// Search by UID

	// Pagination
	function nextPage() {
		// noScroll prevents the page from scrolling to the top
		let queryParams = `page=${currentPage + 1}`;
		if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
		if (query) queryParams += `&query=${query}`;

		goto(`/leaderboard?${queryParams}`, { noScroll: true });
	}

	function prevPage() {
		if (currentPage > 1) {
			let queryParams = `page=${currentPage - 1}`;
			if (regionFilter && regionFilter !== 'all') queryParams += `&region=${regionFilter}`;
			if (query) queryParams += `&query=${query}`;

			goto(`/leaderboard?${queryParams}`, { noScroll: true });
		}
	}

	$: {
		currentPage = Number($page.url.searchParams.get('page')) || 1;
		playerScores = data.playerScores;
		carouselData = data.regionCount;
		regionFilter = $page.url.searchParams.get('region') || 'all';
		query = $page.url.searchParams.get('query') || '';
	}
</script>

<svelte:head>
	<title>Achievement Leaderboard - Honkai Star Rail - StarDB.gg</title>
	<meta
		name="description"
		content="StarDB.gg's leaderboard tracks the highest ranked Honkai Star Rail players across every region. View their player profiles."
	/>
</svelte:head>

<div
	class="flex w-full flex-col justify-center space-x-0 px-6 text-off_white lg:px-24 xl:flex-row xl:space-x-6 xl:px-6"
>
	<!-- Column 1 -->
	<div class="w-full text-lg lg:text-xl xl:w-[540px] xl:pt-48">
		<div class="sticky top-16 space-y-6 pt-6">
			<SearchPlayerCard />
			<div
				class="rounded-2xl border-2 border-galaxy_purple-550 bg-galaxy_purple-600 py-3
            transition-all duration-300 hover:pb-12"
			>
				<div class="flex items-center space-x-4 border-b-2 border-galaxy_purple-550 px-5 pb-3">
					<UserPlus class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
					<p class="text-xl font-bold lg:text-2xl">Add Player</p>
				</div>
			</div>
			<div
				class="rounded-2xl border-2 border-galaxy_purple-600 bg-galaxy_purple-650 py-3
        transition-all duration-300 hover:pb-12"
			>
				<div class="flex items-center space-x-4 border-b-2 border-galaxy_purple-600 px-5 pb-3">
					<LineChart class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
					<p class="text-xl font-bold lg:text-2xl">Statistics</p>
				</div>
				<StatisticsCard {carouselData} />
			</div>
		</div>
	</div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col justify-center space-y-6 py-6 xl:w-[1100px] xl:justify-start">
		<FilterCard {regionFilter} {rankingFilter} onSetRegion={setRegion} onSetRanking={setRanking} />

		<div class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750 pt-3 transition-all duration-300 hover:translate-y-0.5 hover:bg-galaxy_purple-750/95">
			<div class="flex items-center space-x-4 px-5 pb-3">
				<Trophy class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Leaderboard</p>
			</div>

			<div class="flex px-2 md:px-6 pb-3 pt-2">
				<table class="w-full table-fixed text-left text-sm">
					<thead class="sticky top-[62px] z-[2] bg-galaxy_purple-750 text-galaxy_purple-250">
						<!-- Region indicator -->
						<th class="w-8 py-2 pl-4 md:w-14 md:pl-6">Rank</th>
						<th class="w-8 py-2 sm:w-10" />
						<th class="w-20 py-2 md:w-28 md:pl-2 lg:w-32 xl:w-40">Name</th>
						<th class="hidden truncate px-2 py-2 sm:table-cell">Signature</th>
						<th class="hidden w-16 truncate px-2 py-2 text-center xl:table-cell">Level</th>
						<th class="w-24 truncate px-4 py-2 text-center sm:w-40">Achievements</th>
					</thead>
					<tbody>
						{#each playerScores as player (player.uid)}
							<tr
								class="cursor-pointer even:bg-galaxy_purple-800/90 hover:text-space_dark"
								class:hover:bg-neon_yellow={player.region === 'na'}
								class:hover:bg-neon_pink={player.region === 'eu'}
								class:hover:bg-neon_green={player.region === 'asia'}
								class:hover:bg-neon_blue={player.region === 'cn'}
								in:fly={{ y: 40, easing: cubicInOut, duration: 400 }}
							>
								<td class="py-4 pl-4 text-center font-bold md:pl-6">
									{#if rankingFilter === 'World'}
										{player.global_rank}
									{:else}
										{player.regional_rank}
									{/if}
								</td>
								<td class="px-4 py-4">
									<!-- Region indicator -->
									<div
										class="h-2 w-2 rounded-full"
										class:bg-neon_yellow={player.region === 'na'}
										class:bg-neon_pink={player.region === 'eu'}
										class:bg-neon_green={player.region === 'asia'}
										class:bg-neon_blue={player.region === 'cn'}
									/>
								</td>
								<td class="truncate py-4 font-bold md:pl-2">{player.name}</td>
								<td class="hidden truncate px-2 py-4 italic sm:table-cell">{player.signature}</td>
								<td class="hidden px-2 py-4 text-center font-bold xl:table-cell">{player.level}</td>
								<td class="px-2 py-4 text-center font-bold">{player.achievement_count}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div
				class="fixed bottom-16 right-8 z-[2] flex select-none flex-col items-center space-y-2 rounded-xl"
			>
				<button
					class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-galaxy_purple-700 bg-galaxy_purple-600 hover:scale-105 hover:bg-galaxy_purple-550 md:h-14 md:w-14"
					on:click={prevPage}
					><ChevronUp class="h-8 w-8 md:h-10 md:w-10" />
				</button>
				<p class="text-center text-2xl font-bold md:text-3xl">{currentPage}</p>
				<button
					class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-galaxy_purple-700 bg-galaxy_purple-600 hover:scale-105 hover:bg-galaxy_purple-550 md:h-14 md:w-14"
					on:click={nextPage}><ChevronDown class="h-8 w-8 md:h-10 md:w-10" /></button
				>
			</div>
		</div>
	</div>
</div>
