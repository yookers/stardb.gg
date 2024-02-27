<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import translations from '$lib/translations/translations';
	import { locale } from '$store';

	const lang = $locale as 'de' | 'en' | 'es' | 'fr' | 'id' | 'jp' | 'kr' | 'pt' | 'ru' | 'th' | 'vi' | 'chs' | 'cht';
</script>

<main class="flex h-full justify-center px-2 pb-4 text-off_white sm:px-6 sm:pb-6 lg:px-20 xl:px-6">
	<div class="flex w-main flex-col items-center">
		<div class="flex py-2">
			<a
				class="group flex items-center space-x-1 font-bold text-galaxy_purple-200 underline hover:text-galaxy_purple-300"
				href="/tier-list"
			>
				<p>{translations[lang].go_back_to_the_tier_list}</p>
				<ArrowUpRight class="mt-0.5 h-5 w-5 group-hover:-translate-y-0.5" />
			</a>
		</div>
		<iframe
			class="h-full w-full"
			title="Tier List Voting Form"
			src="https://docs.google.com/forms/d/e/1FAIpQLSclNF3CzlF5ipKFh29lINGz-603Fawu-IZ2zmGhMsoCNByVAA/viewform?embedded=true"
			frameborder="0"
			marginheight="0"
			marginwidth="0">{translations[lang].loading}</iframe
		>
	</div>
</main>
