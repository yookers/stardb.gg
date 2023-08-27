<script lang="ts">
	import { PUBLIC_RES_API_URL } from '$env/static/public';
	import DescriptionCard from './DescriptionCard.svelte';
	import StatisticsCard from './StatisticsCard.svelte';
	import FilterCard from './FilterCard.svelte';
	import MiniSearchCharacters from './MiniSearchCharacters.svelte';
	import type { CharacterElement, TierListCharacter } from '$types';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

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
	let showDetailed = false;
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

	const elementTextColorVariants: Record<CharacterElement, string> = {
		Physical: 'text-element_physical',
		Fire: 'text-element_fire',
		Ice: 'text-element_ice',
		Wind: 'text-element_wind',
		Lightning: 'text-element_lightning',
		Quantum: 'text-element_quantum',
		Imaginary: 'text-element_imaginary'
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
	<title>Tier List - Honkai: Star Rail - StarDB.GG</title>
	<meta name="description" content="" />
	<link rel="canonical" href="https://stardb.gg/tier-list" />
</svelte:head>

<main
	class="flex w-full flex-col justify-center space-x-0 space-y-3 px-2 text-off_white sm:space-y-4 sm:px-6 lg:px-24
{isScreenExpanded ? 'xl:flex-row xl:space-x-4 xl:space-y-6 xl:px-6' : 'xl:items-center xl:space-y-4'}"
>
	<!-- Column 1 -->
	<div
		class="w-full text-lg lg:text-xl
    {isScreenExpanded ? 'xl:w-side xl:pt-40' : 'xl:w-main'}"
	>
		<div class="space-y-2 pb-3 sm:space-y-3 sm:pb-4">
			<h1 class="pl-2 pt-4 text-xl font-bold md:text-3xl">Community Tier List</h1>
			<DescriptionCard />
		</div>
		<!-- Sticky top-16 + pt-4 = top-20 -->
		<div class="top-20 space-y-3 sm:space-y-4 xl:sticky">
			<StatisticsCard {totalVotes} />
		</div>
	</div>

	<!-- Column 2 -->
	<div class="xl:w-main flex w-full flex-col space-y-3 pb-4 sm:space-y-4 sm:pb-6">
		<FilterCard bind:showDetailed />
		<MiniSearchCharacters bind:searchQuery />
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
					class="flex w-full flex-wrap gap-x-3 gap-y-3 rounded-b-2xl border-b-2 border-l-2 border-r-2 border-galaxy_purple-750 bg-galaxy_purple-800 p-6 hover:bg-galaxy_purple-800/90 md:rounded-r-2xl md:rounded-bl-none md:border-l-0 md:border-t-2"
				>
					{#each sextileRankGroup as character (character.character)}
						<div
							class="flex h-auto w-24 flex-col text-xs md:w-28 md:text-sm"
							transition:fly={{ y: 40, duration: 400, easing: cubicInOut }}
						>
							<div class="relative flex-col font-bold text-galaxy_purple-800">
								<img
									class="h-24 w-24 rounded-xl border-[3px] md:h-28 md:w-28 {elementBorderColorVariants[
										character.character_element
									]}"
									src="{PUBLIC_RES_API_URL}/StarRailResWebp/icon/character/{character.character}.webp"
									alt="{character.character} icon"
								/>
								<p class="absolute top-0 px-2 {elementBgColorVariants[character.character_element]}">
									E{character.eidolon}
								</p>
								<div
									class="absolute bottom-0 flex px-2 {elementBgColorVariants[character.character_element]} {showDetailed
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
</main>
