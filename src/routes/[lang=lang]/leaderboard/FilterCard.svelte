<script lang="ts">
	import BaseCard from '$components/BaseCard.svelte';
	import { ListFilter } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { locale } from '$store';
	import translations from '$lib/translations/translations';

	const lang = $locale as 'de' | 'en' | 'es' | 'fr' | 'id' | 'jp' | 'kr' | 'pt' | 'ru' | 'th' | 'vi' | 'chs' | 'cht';

	export let regionFilter: string;
	export let rankingFilter: string;
	export let setRegion: (region: string) => void;
	export let setRanking: (ranking: string) => void;
	export let queryCount: number;
	export let displayStart: number;
	export let displayEnd: number;
</script>

<BaseCard label={translations[lang].filter} title={translations[lang].filter}>
	<div slot="icon">
		<ListFilter class="h-5 w-5 text-off_white" />
	</div>

	<div slot="content" class="pt-4">
		<div
			class="flex flex-col space-x-0 space-y-3 px-5 pb-3 text-base md:flex-row md:justify-between md:space-x-2 md:space-y-0 lg:text-lg"
		>
			<div class="flex flex-wrap gap-2 gap-y-3">
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-galaxy_purple-400 font-extrabold text-galaxy_purple-400 hover:bg-galaxy_purple-400 hover:text-space_dark"
					class:bg-galaxy_purple-400={regionFilter === 'all'}
					class:bg-galaxy_purple-750={regionFilter !== 'all'}
					class:text-space_dark={regionFilter === 'all'}
					aria-label="Filter by ALL regions"
					on:click={() => setRegion('all')}
				>
					<p>{translations[lang].all}</p>
				</button>
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_yellow bg-galaxy_purple-750 font-extrabold text-neon_yellow hover:bg-neon_yellow hover:text-space_dark"
					class:bg-neon_yellow={regionFilter === 'na'}
					class:text-space_dark={regionFilter === 'na'}
					aria-label="Filter by NA region"
					on:click={() => setRegion('na')}
				>
					<p>{translations[lang].na}</p>
				</button>
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_pink bg-galaxy_purple-750 font-extrabold text-neon_pink hover:bg-neon_pink hover:text-space_dark"
					class:bg-neon_pink={regionFilter === 'eu'}
					class:text-space_dark={regionFilter === 'eu'}
					aria-label="Filter by EU region"
					on:click={() => setRegion('eu')}
				>
					<p>{translations[lang].eu}</p>
				</button>
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_green bg-galaxy_purple-750 font-extrabold text-neon_green hover:bg-neon_green hover:text-space_dark"
					class:bg-neon_green={regionFilter === 'asia'}
					class:text-space_dark={regionFilter === 'asia'}
					aria-label="Filter by ASIA region"
					on:click={() => setRegion('asia')}
				>
					<p>{translations[lang].asia}</p>
				</button>
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_blue bg-galaxy_purple-750 font-extrabold text-neon_blue hover:bg-neon_blue hover:text-space_dark"
					class:bg-neon_blue={regionFilter === 'cn'}
					class:text-space_dark={regionFilter === 'cn'}
					aria-label="Filter by CN region"
					on:click={() => setRegion('cn')}
				>
					<p>{translations[lang].cn}</p>
				</button>
			</div>
			<div
				class="relative flex h-10 w-40 select-none items-center rounded-full bg-galaxy_purple-200 text-sm font-bold text-galaxy_purple-700"
			>
				<button class="h-full w-20 px-4" aria-label="Set search type to World" on:click={() => setRanking('World')}
					>{translations[lang].world}</button
				>
				<button class="h-full w-20 px-4" aria-label="Set search type to Region" on:click={() => setRanking('Region')}
					>{translations[lang].region}</button
				>
				<span
					class="absolute flex h-8 w-20 items-center justify-center rounded-full bg-galaxy_purple-700 text-galaxy_purple-200 duration-300
                {rankingFilter === 'World' ? 'left-1' : 'left-[calc(50%-4px)]'}"
				>
					{rankingFilter === 'World' ? translations[lang].world : translations[lang].region}
				</span>
			</div>
		</div>
		<div class="border-t-2 border-galaxy_purple-600">
			{#key queryCount}
				<p class="px-6 py-2 text-sm">
					<span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}
						>{displayStart} <span class="font-normal">-</span>
						{displayEnd} <span class="font-normal">/</span>
						{queryCount}</span
					>
				</p>
			{/key}
		</div>
	</div>
</BaseCard>
