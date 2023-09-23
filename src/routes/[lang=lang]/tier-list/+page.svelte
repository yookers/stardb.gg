<script lang="ts">
	import { PUBLIC_CDN_RES_API_URL } from '$env/static/public';
	import InformationCard from './InformationCard.svelte';
	import StatisticsCard from './StatisticsCard.svelte';
	import FilterCard from './FilterCard.svelte';
	import MiniSearchCharacters from './MiniSearchCharacters.svelte';
	import type { CharacterElement, TierListCharacter } from '$types';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { Maximize2, Minimize2, Swords } from 'lucide-svelte';

	export let data;
	const tierListCharacters = data.tierListEntries as TierListCharacter[];
	const totalVotes = data.totalVotes as number;
	const sextiles = data.sextiles as [number, number, number, number, number];

	type Rank = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';
	type RankGroup = {
		[key in Rank]: TierListCharacter[];
	};
	const ranks: Rank[] = ['S+', 'S', 'A', 'B', 'C', 'D'];

	let searchQuery = '';
	let showDetailed = true;
	let filteredCharacters = tierListCharacters;
	let isScreenExpanded = true;

	const elementBgColorVariants: Record<CharacterElement, string> = {
		Physical: 'bg-element_physical',
		Fire: 'bg-element_fire',
		Ice: 'bg-element_ice',
		Wind: 'bg-element_wind',
		Lightning: 'bg-element_lightning',
		Quantum: 'bg-element_quantum',
		Imaginary: 'bg-element_imaginary'
	};

	const elementBorderColorVariants: Record<CharacterElement, string> = {
		Physical: 'border-element_physical',
		Fire: 'border-element_fire',
		Ice: 'border-element_ice',
		Wind: 'border-element_wind',
		Lightning: 'border-element_lightning',
		Quantum: 'border-element_quantum',
		Imaginary: 'border-element_imaginary'
	};

	const getSextileRank = (character: TierListCharacter): Rank => {
		const { average } = character;
		if (average >= sextiles[4]) return 'S+';
		if (average >= sextiles[3]) return 'S';
		if (average >= sextiles[2]) return 'A';
		if (average >= sextiles[1]) return 'B';
		if (average >= sextiles[0]) return 'C';
		return 'D';
	};

	function groupByRank(characters: TierListCharacter[], rankFn: (character: TierListCharacter) => Rank): RankGroup {
		const grouped: RankGroup = {
			'S+': [],
			S: [],
			A: [],
			B: [],
			C: [],
			D: []
		};

		ranks.forEach((rank) => {
			grouped[rank] = characters.filter((character) => rankFn(character) === rank);
		});

		return grouped;
	}

	function searchCharacters(query: string) {
		if (query === '') {
			return tierListCharacters;
		}

		filteredCharacters = tierListCharacters.filter((character) => {
			return character.character_name.toLowerCase().includes(query.toLowerCase());
		});

		return filteredCharacters;
	}

	$: characterRankGrouped = Object.entries(groupByRank(searchCharacters(searchQuery), getSextileRank));
</script>

<svelte:head>
	<title>Community Tier List - Honkai: Star Rail - StarDB.GG</title>
	<meta
		name="description"
		content="Discover the most up-to-date tier list based on the current meta for Honkai: Star Rail, aggregated from player votes. StarDB.GG is your source for data-driven game insights."
	/>
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stardb.gg/tier-list" />
	<meta property="og:title" content="Community Tier List - Honkai: Star Rail - StarDB.GG" />
	<meta
		property="og:description"
		content="Discover the most up-to-date tier list based on the current meta for Honkai: Star Rail, aggregated from player votes. StarDB.GG is your source for data-driven game insights."
	/>
	<meta property="og:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://stardb.gg/tier-list" />
	<meta name="twitter:title" content="Community Tier List - Honkai: Star Rail - StarDB.GG" />
	<meta
		name="twitter:description"
		content="Discover the most up-to-date tier list based on the current meta for Honkai: Star Rail, aggregated from player votes. StarDB.GG is your source for data-driven game insights."
	/>
	<meta name="twitter:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />

	<link rel="canonical" href="https://stardb.gg/tier-list" />
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
			Community Tier List
		</h1>
		<h2 class="pb-2 pl-2 text-xs sm:pb-3 md:text-sm" in:fly={{ y: 20, duration: 300, delay: 250, easing: cubicInOut }}>
			Welcome to <span class="font-bold">StarDB.GG's Tier List</span>; a ranking created by the community. Results are based on
			player votes in the current meta, making it a true reflection of the community's opinion.
		</h2>

		<!-- Sticky top-16 + pt-4 = top-20 -->
		<div class="top-20 space-y-3 sm:space-y-4 xl:sticky">
			<InformationCard />
			<StatisticsCard {totalVotes} />
		</div>
	</div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col space-y-3 pb-4 sm:space-y-4 sm:pb-6 xl:w-main">
		<FilterCard bind:showDetailed />
		<MiniSearchCharacters bind:searchQuery />

		<div class="space-y-2 rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750">
			<div class="flex flex-wrap items-center justify-between px-5 py-2 sm:py-3">
				<div class="flex items-center space-x-4 pr-2">
					<Swords class="h-5 w-5 text-off_white" />
					<p class="text-xl font-bold">Tier List</p>
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
			<div class="space-y-2 px-2 pb-2 sm:px-3 sm:pb-3">
				{#each characterRankGrouped as [rankLabel, sextileRankGroup]}
					<div class="flex flex-col md:flex-row">
						<div
							class="w-full shrink-0 rounded-t-2xl md:w-14 md:rounded-l-2xl md:rounded-tr-none md:py-3"
							class:bg-[#EF47A2]={rankLabel === 'S+'}
							class:bg-[#EF476F]={rankLabel === 'S'}
							class:bg-[#FFD166]={rankLabel === 'A'}
							class:bg-[#06D6A0]={rankLabel === 'B'}
							class:bg-[#20A6D2]={rankLabel === 'C'}
							class:bg-[#1E61C6]={rankLabel === 'D'}
						>
							<h2 class="text-center text-2xl font-extrabold text-galaxy_purple-800">{rankLabel}</h2>
						</div>

						<div
							class="flex w-full flex-wrap gap-x-3 gap-y-3 rounded-b-2xl border-b-2 border-l-2 border-r-2 border-galaxy_purple-650 bg-galaxy_purple-800 p-5 hover:bg-galaxy_purple-750 md:rounded-r-2xl md:rounded-bl-none md:border-l-0 md:border-t-2"
						>
							{#each sextileRankGroup as character (character.character)}
								<div
									class="flex h-auto w-24 flex-col text-xs md:w-28 md:text-sm"
									transition:fly={{ y: 40, duration: 400, easing: cubicInOut }}
								>
									<div class="relative flex-col font-bold text-galaxy_purple-800">
										<img
											class="h-24 w-24 rounded-xl border-[3px] md:h-28 md:w-28 {elementBorderColorVariants[
												character.character_element_id
											]}"
											src="{PUBLIC_CDN_RES_API_URL}/StarRailResWebp/icon/character/{character.character}.webp"
											alt="{character.character} icon"
										/>
										<p class="absolute top-0 px-2 {elementBgColorVariants[character.character_element_id]}">
											E{character.eidolon}
										</p>
										<div
											class="absolute bottom-0 flex px-2 {elementBgColorVariants[character.character_element_id]} {showDetailed
												? 'w-full justify-center'
												: 'right-0'} "
										>
											{#if showDetailed}
												<p in:fly={{ y: 10, duration: 300, easing: cubicInOut }}>
													{character.average.toFixed(2)} ± {character.confidence_interval_95.toFixed(2)}
												</p>
											{:else}
												<p in:fly={{ y: 10, duration: 300, easing: cubicInOut }}>{character.average.toFixed(2)}</p>
											{/if}
										</div>
									</div>
									<div class="flex flex-col pl-1 pt-0.5">
										<div class="flex space-x-1.5">
											<div
												class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
												class:bg-neon_yellow={character.character_rarity === 5}
												class:bg-galaxy_purple-400={character.character_rarity === 4}
											></div>
											<p class="h-full text-sm font-bold">
												{character.character_name}
											</p>
										</div>
										{#if showDetailed}
											<div class="flex justify-between" in:fly={{ y: 20, duration: 300, easing: cubicInOut }}>
												<p>Variance:</p>
												<p class="font-bold">{character.variance.toFixed(2)}</p>
											</div>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>
