<script lang="ts">
	import { goto } from '$app/navigation';
	import { locale } from '$store';
	import translations from '$lib/translations/translations';
	import NitroBanner from '$components/NitroBanner.svelte';
	import Logo from '../Logo.svelte';
	const lang = $locale as 'de' | 'en' | 'es' | 'fr' | 'id' | 'jp' | 'kr' | 'pt' | 'ru' | 'th' | 'vi' | 'chs' | 'cht';
</script>

<svelte:head>
	<title>{translations[lang].title}</title>
	<meta name="description" content={translations[lang].description} />
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stardb.gg" />
	<meta property="og:title" content={translations[lang].title} />
	<meta property="og:description" content={translations[lang].description} />
	<meta property="og:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://stardb.gg" />
	<meta name="twitter:title" content={translations[lang].title} />
	<meta name="twitter:description" content={translations[lang].description} />
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
