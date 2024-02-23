<script lang="ts">
	import BaseCard from '$components/BaseCard.svelte';
	import { ListFilter } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { locale } from '$store';

	export let regionFilter: string;
	export let rankingFilter: string;
	export let setRegion: (region: string) => void;
	export let setRanking: (ranking: string) => void;
	export let queryCount: number;
	export let displayStart: number;
	export let displayEnd: number;

	let showCard = true;

	const filterText = {
		chs: '筛选',
		cht: '篩選',
		de: 'Filter',
		en: 'Filter',
		es: 'Filtrar',
		fr: 'Filtre',
		id: 'Sortir',
		jp: 'フィルター',
		kr: '필터',
		pt: 'Filtro',
		ru: 'Фильтр',
		th: 'ตัวกรอง',
		vi: 'Lọc'
	} as any;

	const allText = {
		chs: '全部',
		cht: '所有',
		de: 'Alle',
		en: 'ALL',
		es: 'TODOS',
		fr: 'TOUS',
		id: 'Semua',
		jp: '全',
		kr: '전체',
		pt: 'Todos',
		ru: 'ВСЕ',
		th: 'ทั้งหมด',
		vi: 'Tất cả'
	} as any;

	const naText = {
		chs: '美服',
		cht: '美服',
		de: 'NA',
		en: 'NA',
		es: 'NA',
		fr: 'NA',
		id: 'NA',
		jp: 'アメリカ',
		kr: '북미',
		pt: 'NA',
		ru: 'Америка',
		th: 'NA',
		vi: 'America'
	} as any;

	const euText = {
		chs: '欧服',
		cht: '歐服',
		de: 'EU',
		en: 'EU',
		es: 'EU',
		fr: 'EU',
		id: 'EU',
		jp: 'ヨーロッパ',
		kr: '유럽',
		pt: 'EU',
		ru: 'Европа',
		th: 'EU',
		vi: 'Europe'
	} as any;

	const asiaText = {
		chs: '亚服',
		cht: '亞服',
		de: 'ASIA',
		en: 'ASIA',
		es: 'ASIA',
		fr: 'ASIA',
		id: 'ASIA',
		jp: 'アジア',
		kr: '아시아',
		pt: 'ASIA',
		ru: 'Азия',
		th: 'ASIA',
		vi: 'Asia'
	} as any;

	const cnText = {
		chs: '国服',
		cht: '國服',
		de: 'CN',
		en: 'CN',
		es: 'CN',
		fr: 'CN',
		id: 'CN',
		jp: '中国',
		kr: '중국',
		pt: 'CN',
		ru: 'Китай',
		th: 'CN',
		vi: 'Trung Quốc'
	} as any;

	const worldText = {
		chs: '全球排名',
		cht: '全球排名',
		de: 'Welt',
		en: 'World',
		es: 'Mundo',
		fr: 'Monde',
		id: 'Dunia',
		jp: '世界',
		kr: '세계',
		pt: 'Global',
		ru: 'Мир',
		th: 'โลก',
		vi: 'Thế giới'
	} as any;

	const regionText = {
		chs: '地区排名',
		cht: '詞服器排名',
		de: 'Region',
		en: 'Region',
		es: 'Región',
		fr: 'Région',
		id: 'Wilayah',
		jp: '地域',
		kr: '지역',
		pt: 'Região',
		ru: 'Регион',
		th: 'ภูมิภาค',
		vi: 'Khu vực'
	} as any;
</script>

<BaseCard label={filterText[$locale]} title={filterText[$locale]}>
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
					<p>{allText[$locale]}</p>
				</button>
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_yellow bg-galaxy_purple-750 font-extrabold text-neon_yellow hover:bg-neon_yellow hover:text-space_dark"
					class:bg-neon_yellow={regionFilter === 'na'}
					class:text-space_dark={regionFilter === 'na'}
					aria-label="Filter by NA region"
					on:click={() => setRegion('na')}
				>
					<p>{naText[$locale]}</p>
				</button>
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_pink bg-galaxy_purple-750 font-extrabold text-neon_pink hover:bg-neon_pink hover:text-space_dark"
					class:bg-neon_pink={regionFilter === 'eu'}
					class:text-space_dark={regionFilter === 'eu'}
					aria-label="Filter by EU region"
					on:click={() => setRegion('eu')}
				>
					<p>{euText[$locale]}</p>
				</button>
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_green bg-galaxy_purple-750 font-extrabold text-neon_green hover:bg-neon_green hover:text-space_dark"
					class:bg-neon_green={regionFilter === 'asia'}
					class:text-space_dark={regionFilter === 'asia'}
					aria-label="Filter by ASIA region"
					on:click={() => setRegion('asia')}
				>
					<p>{asiaText[$locale]}</p>
				</button>
				<button
					class="flex h-10 w-28 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_blue bg-galaxy_purple-750 font-extrabold text-neon_blue hover:bg-neon_blue hover:text-space_dark"
					class:bg-neon_blue={regionFilter === 'cn'}
					class:text-space_dark={regionFilter === 'cn'}
					aria-label="Filter by CN region"
					on:click={() => setRegion('cn')}
				>
					<p>{cnText[$locale]}</p>
				</button>
			</div>
			<div
				class="relative flex h-10 w-40 select-none items-center rounded-full bg-galaxy_purple-200 text-sm font-bold text-galaxy_purple-700"
			>
				<button class="h-full w-20 px-4" aria-label="Set search type to World" on:click={() => setRanking('World')}
					>{worldText[$locale]}</button
				>
				<button class="h-full w-20 px-4" aria-label="Set search type to Region" on:click={() => setRanking('Region')}
					>{regionText[$locale]}</button
				>
				<span
					class="absolute flex h-8 w-20 items-center justify-center rounded-full bg-galaxy_purple-700 text-galaxy_purple-200 duration-300
                {rankingFilter === 'World' ? 'left-1' : 'left-[calc(50%-4px)]'}"
				>
					{rankingFilter === 'World' ? worldText[$locale] : regionText[$locale]}
				</span>
			</div>
		</div>
		<div class="border-t-2 border-galaxy_purple-600">
			{#key queryCount}
				<p class="px-6 py-2 text-sm">
					Filtering <span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}
						>{displayStart} <span class="font-normal">-</span>
						{displayEnd} <span class="font-normal">of</span>
						{queryCount}</span
					> Players
				</p>
			{/key}
		</div>
	</div>
</BaseCard>
