<script lang="ts">
	import { goto } from '$app/navigation';
	import { locale } from '$store';
	import NitroBanner from '$components/NitroBanner.svelte';
	import Logo from '../Logo.svelte';

	const titlesText = {
		chs: 'StarDB.GG - 星穹铁道工具以及排名',
		cht: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		de: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		en: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		es: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		fr: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		id: 'StarDB,GG - Peralatan dan Papan Peringkat Honkai: Star Rail',
		jp: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		kr: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		pt: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		ru: 'StarDB.GG - Инструменты для Honkai: Star Rail и таблица лидеров',
		th: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard',
		vi: 'StarDB.GG - Honkai: Star Rail Tools and Leaderboard'
	} as any;

	const descriptionsText = {
		chs: '最棒的星穹铁道网站，我们提供最好的排名，帮助你查看你拥有和缺少的成就，各种指南以及很多有用的工具',
		cht: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		de: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		en: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		es: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		fr: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		id: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		jp: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		kr: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		pt: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		ru: 'Лучший сайт для отслеживания достижений с таблицами лидеров для Honkai: Star Rail. Инструменты, руководства и тир листы сообщества.',
		th: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.',
		vi: 'The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists.'
	} as any;
</script>

<svelte:head>
	<title>StarDB.GG - Honkai: Star Rail Tools and Leaderboard</title>
	<meta name="description" content={descriptionsText[$locale]} />
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stardb.gg" />
	<meta property="og:title" content={titlesText[$locale]} />
	<meta property="og:description" content={descriptionsText[$locale]} />
	<meta property="og:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://stardb.gg" />
	<meta name="twitter:title" content={titlesText[$locale]} />
	<meta name="twitter:description" content={descriptionsText[$locale]} />
	<meta name="twitter:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />

	<link rel="canonical" href="https://stardb.gg" />
</svelte:head>

<main class="relative flex h-full flex-col items-center justify-center px-4 text-off_white lg:px-20">
	<a href="https://ko-fi.com/stardb" aria-label="Ko-fi link" target="_blank" rel="noopener noreferrer">
		<img class="absolute right-4 top-4 h-auto w-56 rounded-lg" src="/images/kofi-button.webp" alt="Ko-fi icon" />
	</a>

	<div class="flex items-center space-x-3 stroke-galaxy_purple-250 py-8 sm:space-x-4 md:py-16">
		<Logo class="w-10 overflow-visible fill-none stroke-[8] sm:w-12 md:w-24" />
		<p class="select-none font-dm_sans text-5xl tracking-tighter text-galaxy_purple-250 sm:text-6xl md:text-8xl">stardb.gg</p>
	</div>

	<NitroBanner />

	<div class="flex space-x-2">
		<a class="absolute bottom-3 left-4 text-sm hover:text-galaxy_purple-250 md:left-20" href="/{$locale}/privacy-policy"
			>Privacy Policy</a
		>
		<span data-ccpa-link="1"></span>
	</div>
</main>
