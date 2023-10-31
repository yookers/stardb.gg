<script lang="ts">
	import { PUBLIC_CDN_RES_API_URL } from '$env/static/public';
	import InformationCard from './InformationCard.svelte';
	import FilterCard from './FilterCard.svelte';
	import MiniSearchWarps from './MiniSearchWarps.svelte';
	import languages from '$lib/languages.json';
	import { locale } from '$store';
	import type { WarpData, WarpItem } from '$types';
	import { Maximize2, Minimize2, Dices, ChevronUp, ChevronDown } from 'lucide-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	export let data;

	let warpData = data.warpData as WarpData;
	let uid = data.uid as string;
	let paginatedWarps: WarpItem[];

	const ietf = languages.find((lang) => lang.id === $locale)?.ietf;

	let bannerType: 'standard' | 'departure' | 'special' | 'lc' | 'all' = 'all';
	let warpType: 'light_cone' | 'character' | 'all' = 'all';
	let warpRarity: (3 | 4 | 5)[] = [3, 4, 5];
	let sortOrder: 'ascending' | 'descending' = 'descending';
	let searchQuery = '';

	let currentPage = 1;
	let itemsPerPage = 50;
	let totalPages: number;
	let displayStart: number;
	let displayEnd: number;

	let isScreenExpanded = true;

	function filterWarps(
		warpData: WarpData,
		warpType: 'light_cone' | 'character' | 'all',
		bannerType: 'standard' | 'departure' | 'special' | 'lc' | 'all',
		warpRarity: (3 | 4 | 5)[],
		sortOrder: 'ascending' | 'descending',
		searchQuery: string
	): WarpItem[] {
		let warps = [];

		if (bannerType === 'all') {
			warps = [...warpData.standard, ...warpData.departure, ...warpData.special, ...warpData.lc];
		} else {
			warps = [...warpData[bannerType]];
		}

		const filtered = warps.filter((warp) => {
			const matchesWarpType = warpType === 'all' || warp.type === warpType;
			const matchesRarity = warpRarity.length === 0 || warpRarity.includes(warp.rarity);
			const matchesSearchQuery = warp.name.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesWarpType && matchesRarity && matchesSearchQuery;
		});

		return filtered.sort((a, b) => {
			const dateA = new Date(a.timestamp).getTime();
			const dateB = new Date(b.timestamp).getTime();

			if (dateA !== dateB) {
				return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
			} else {
				return a.id.localeCompare(b.id);
			}
		});
	}

	function convertTimestamp(timestamp: string): string {
		const date = new Date(timestamp);
		const formattedDate = new Intl.DateTimeFormat(ietf, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
		return formattedDate;
	}

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	$: filteredWarps = filterWarps(warpData, warpType, bannerType, warpRarity, sortOrder, searchQuery);
	$: {
		paginatedWarps = filteredWarps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
		totalPages = Math.ceil(filteredWarps.length / itemsPerPage);
		displayStart = (currentPage - 1) * itemsPerPage + 1;
		displayEnd = currentPage * itemsPerPage > filteredWarps.length ? filteredWarps.length : currentPage * itemsPerPage;
	}
</script>

<svelte:head>
	<title>Warp Tracker - Honkai: Star Rail - StarDB.GG</title>
	<meta
		name="description"
		content="Explore and analyze Honkai: Star Rail player warps on StarDB.GG! Discover the luckiest pulls and identify the top spenders in the game."
	/>
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stardb.gg/warp-tracker/{uid}" />
	<meta property="og:title" content="Warp Tracker - Honkai: Star Rail - StarDB.GG" />
	<meta
		property="og:description"
		content="Explore and analyze Honkai: Star Rail player warps on StarDB.GG! Discover the luckiest pulls and identify the top spenders in the game."
	/>
	<meta property="og:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://stardb.gg/warp-tracker/{uid}" />
	<meta name="twitter:title" content="Warp Tracker - Honkai: Star Rail - StarDB.GG" />
	<meta
		name="twitter:description"
		content="Explore and analyze Honkai: Star Rail player warps on StarDB.GG! Discover the luckiest pulls and identify the top spenders in the game."
	/>
	<meta name="twitter:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />

	<link rel="canonical" href="https://stardb.gg/warp-tracker/{uid}" />
</svelte:head>

<div
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
			Warp Viewer
		</h1>
		<h2 class="pb-2 pl-2 text-xs sm:pb-3 md:text-sm" in:fly={{ y: 20, duration: 300, delay: 250, easing: cubicInOut }}>
			View the latest warps of players for Honkai: Star Rail at <span class="font-bold">StarDB.GG</span>. Compare how lucky or
			unlucky you are, and find out who the biggest whale is!
		</h2>
		<!-- Sticky top-16 + pt-4 = top-20 -->
		<div class="top-20 space-y-3 sm:space-y-4 xl:sticky"></div>
	</div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col space-y-3 pb-4 text-off_white sm:space-y-4 sm:pb-6 xl:w-main">
		<FilterCard
			bind:bannerType
			bind:warpType
			bind:warpRarity
			bind:sortOrder
			{displayStart}
			{displayEnd}
			filterLength={filteredWarps.length}
		/>
		<MiniSearchWarps bind:searchQuery />

		<!-- Pagination buttons -->
		<div class="fixed bottom-16 right-8 z-[3] flex select-none flex-col items-center space-y-2 rounded-xl">
			<button
				class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 hover:scale-105 hover:bg-galaxy_purple-450 md:h-14 md:w-14"
				aria-label="Previous page"
				on:click={() => goToPage(currentPage - 1)}
				disabled={currentPage === 1}
				><ChevronUp class="h-8 w-8 md:h-10 md:w-10" />
			</button>
			<p class="text-center text-2xl font-bold md:text-3xl">{currentPage}</p>
			<button
				class="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 hover:scale-105 hover:bg-galaxy_purple-450 md:h-14 md:w-14"
				aria-label="Next page"
				on:click={() => goToPage(currentPage + 1)}
				disabled={currentPage === totalPages}><ChevronDown class="h-8 w-8 md:h-10 md:w-10" /></button
			>
		</div>

		<!-- Warp List -->
		<div class="space-y-2 rounded-xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750">
			<div class="flex flex-wrap items-center justify-between px-5 py-2 sm:py-3">
				<div class="flex items-center space-x-4 pr-2">
					<Dices class="h-5 w-5 text-off_white" />
					<p class="text-xl font-bold">Warp List</p>
				</div>
				<div class="flex space-x-4">
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

			<div class="grid grid-cols-1 gap-2 px-2 pb-2 sm:grid-cols-2 sm:px-5 sm:pb-3">
				{#each paginatedWarps as warps}
					<div
						class="col-span-1 flex h-16 items-center overflow-clip rounded-lg border-2 border-galaxy_purple-650 bg-galaxy_purple-750 transition-all duration-150 hover:border-galaxy_purple-700 hover:bg-galaxy_purple-800 sm:hover:translate-y-1"
						in:fly={{ y: 40, duration: 400, easing: cubicInOut }}
					>
						<div
							class="z-[1] h-full w-3"
							class:bg-neon_blue={warps.rarity === 3}
							class:bg-galaxy_purple-400={warps.rarity === 4}
							class:bg-neon_yellow={warps.rarity === 5}
						></div>
						{#if warps.type === 'light_cone'}
							<img
								class="h-24 w-24 shrink-0 -translate-x-4"
								src="{PUBLIC_CDN_RES_API_URL}/StarRailResWebp/image/light_cone_preview/{warps.item_id}.webp"
								alt=""
							/>
						{:else if warps.type === 'character'}
							<img
								class="h-24 w-24 shrink-0 -translate-x-4"
								src="{PUBLIC_CDN_RES_API_URL}/StarRailResWebp/icon/character/{warps.item_id}.webp"
								alt=""
							/>
						{/if}
						<div class="flex flex-col truncate pr-2">
							<p class="truncate text-sm font-bold sm:text-base">{warps.name}</p>
							<p class="text-xs">{convertTimestamp(warps.timestamp)}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
