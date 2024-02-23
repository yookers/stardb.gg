<script lang="ts">
	import BaseCard from '$components/BaseCard.svelte';
	import { LineChart, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { locale } from '$store';

	export let statisticsData: any[];

	// Statistics carousel
	let index = 0;

	function nextCard() {
		if (index < statisticsData.length - 1) index++;
		else index = 0;
	}

	function prevCard() {
		if (index > 0) index--;
		else index = statisticsData.length - 1;
	}

	const statisticsText = {
		chs: '统计',
		cht: '統計',
		de: 'Statistiken',
		en: 'Statistics',
		es: 'Estadísticas',
		fr: 'Statistiques',
		id: 'Statistik',
		jp: '統計',
		kr: '통계',
		pt: 'Estatísticas',
		ru: 'Статистика',
		th: 'สถิติ',
		vi: 'Thành tích'
	} as any;

	const statisticsDataText = {
		Total: {
			chs: '总共<span class="font-medium text-off_white">玩家</span>',
			cht: '所有<span class="font-medium text-off_white">玩家</span>',
			de: '<span class="font-medium text-off_white">Spieler</span> gesamt',
			en: 'Total <span class="font-medium text-off_white">Players</span>',
			es: '<span class="font-medium text-off_white">Jugadores</span> Totales',
			fr: '<span class="font-medium text-off_white">Joueurs</span> Totaux',
			id: 'Total <span class="font-medium text-off_white">Pemain</span>',
			jp: '全<span class="font-medium text-off_white">プレイヤー</span>',
			kr: '전체 <span class="font-medium text-off_white">플레이어</span>',
			pt: 'Todos <span class="font-medium text-off_white">os Jogadores</span>',
			ru: 'Всего <span class="font-medium text-off_white">Игроков</span>',
			th: '<span class="font-medium text-off_white">ผู้เล่น</span>ทั้งหมด',
			vi: 'Tổng <span class="font-medium text-off_white">người chơi</span>'
		},
		NA: {
			chs: '美服<span class="font-medium text-off_white">玩家</span>',
			cht: '美服<span class="font-medium text-off_white">玩家</span>',
			de: 'NA <span class="font-medium text-off_white">Spieler</span>',
			en: 'NA <span class="font-medium text-off_white">Players</span>',
			es: '<span class="font-medium text-off_white">Jugadores de</span> NA',
			fr: '<span class="font-medium text-off_white">Joueurs</span> NA',
			id: '<span class="font-medium text-off_white">Pemain</span> NA',
			jp: 'アメリカの<span class="font-medium text-off_white">プレイヤー</span>',
			kr: '북미 <span class="font-medium text-off_white">플레이어</span>',
			pt: '<span class="font-medium text-off_white">Jogadores</span> NA',
			ru: '<span class="font-medium text-off_white">Игроки</span> Северной Америки',
			th: '<span class="font-medium text-off_white">ผู้เล่น</span> NA',
			vi: '<span class="font-medium text-off_white">Người chơi máy chủ</span> America'
		},
		EU: {
			chs: '欧服<span class="font-medium text-off_white">玩家</span>',
			cht: '歐服<span class="font-medium text-off_white">玩家</span>',
			de: 'EU <span class="font-medium text-off_white">Spieler</span>',
			en: 'EU <span class="font-medium text-off_white">Players</span>',
			es: '<span class="font-medium text-off_white">Jugadores de</span> EU',
			fr: '<span class="font-medium text-off_white">Joueurs</span> EU',
			id: '<span class="font-medium text-off_white">Pemain</span> EU',
			jp: 'ヨーロッパの<span class="font-medium text-off_white">プレイヤー</span>',
			kr: '유럽 <span class="font-medium text-off_white">플레이어</span>',
			pt: '<span class="font-medium text-off_white">Jogadores</span> EU',
			ru: '<span class="font-medium text-off_white">Игроки</span> Европы',
			th: '<span class="font-medium text-off_white">ผู้เล่น</span> EU',
			vi: '<span class="font-medium text-off_white">Người chơi máy chủ</span> Europe'
		},
		ASIA: {
			chs: '亚服<span class="font-medium text-off_white">玩家</span>',
			cht: '亞服<span class="font-medium text-off_white">玩家</span>',
			de: 'ASIA <span class="font-medium text-off_white">Spieler</span>',
			en: 'ASIA <span class="font-medium text-off_white">Players</span>',
			es: '<span class="font-medium text-off_white">Jugadores de</span> ASIA',
			fr: '<span class="font-medium text-off_white">Joueurs</span> ASIA',
			id: '<span class="font-medium text-off_white">Pemain</span> ASIA',
			jp: 'アジアの<span class="font-medium text-off_white">プレイヤー</span>',
			kr: '아시아 <span class="font-medium text-off_white">플레이어</span>',
			pt: '<span class="font-medium text-off_white">Jogadores</span> ASIA',
			ru: '<span class="font-medium text-off_white">Игроки</span> Азии',
			th: '<span class="font-medium text-off_white">ผู้เล่น</span> ASIA',
			vi: '<span class="font-medium text-off_white">Người chơi máy chủ</span> Asia'
		},
		CN: {
			chs: '国服<span class="font-medium text-off_white">玩家</span>',
			cht: '國服<span class="font-medium text-off_white">玩家</span>',
			de: 'CN <span class="font-medium text-off_white">Spieler</span>',
			en: 'CN <span class="font-medium text-off_white">Players</span>',
			es: '<span class="font-medium text-off_white">Jugadores de</span> CN',
			fr: '<span class="font-medium text-off_white">Joueurs</span> CN',
			id: '<span class="font-medium text-off_white">Pemain</span> CN',
			jp: '中国の<span class="font-medium text-off_white">プレイヤー</span>',
			kr: '중국 <span class="font-medium text-off_white">플레이어</span>',
			pt: '<span class="font-medium text-off_white">Jogadores</span> CN',
			ru: '<span class="font-medium text-off_white">Игроки</span> Китая',
			th: '<span class="font-medium text-off_white">ผู้เล่น</span> CN',
			vi: '<span class="font-medium text-off_white">Người chơi máy chủ</span> Trung Quốc'
		}
	} as any;
</script>

<BaseCard label={statisticsText[$locale]} title={statisticsText[$locale]}>
	<div slot="icon">
		<LineChart class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="pb-3 pt-4">
		<div class="relative flex w-full items-center justify-center">
			<button class="absolute left-8 flex h-10 w-10 items-center justify-center" on:click={prevCard}>
				<ChevronLeft class="h-6 w-6 text-off_white lg:h-8 lg:w-8" />
			</button>

			<div
				class="flex flex-col text-center font-bold"
				class:text-galaxy_purple-350={statisticsData[index].region === 'Total'}
				class:text-neon_yellow={statisticsData[index].region === 'NA'}
				class:text-neon_pink={statisticsData[index].region === 'EU'}
				class:text-neon_green={statisticsData[index].region === 'ASIA'}
				class:text-neon_blue={statisticsData[index].region === 'CN'}
			>
				{#key statisticsData[index].region}
					<p class="pb-1 text-6xl md:text-7xl" in:fly={{ y: 10, duration: 300, easing: cubicInOut }}>
						{statisticsData[index].count}
					</p>
				{/key}
				<p class="line-clamp-1 text-xl">
					{@html statisticsDataText[statisticsData[index].region][$locale]}
				</p>
			</div>

			<button class="absolute right-8 flex h-10 w-10 items-center justify-center" on:click={nextCard}>
				<ChevronRight class="h-6 w-6 text-off_white lg:h-8 lg:w-8" />
			</button>
		</div>
	</div>
</BaseCard>
