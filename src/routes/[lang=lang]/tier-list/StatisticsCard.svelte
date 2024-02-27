<script lang="ts">
	import { LineChart } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';
	import translations from '$lib/translations/translations';
	import { locale } from '$store';
	const lang = $locale as 'de' | 'en' | 'es' | 'fr' | 'id' | 'jp' | 'kr' | 'pt' | 'ru' | 'th' | 'vi' | 'chs' | 'cht';

	export let totalVotes: number;
	let showCard = false;
</script>

<BaseCard label="Statistics" title="Statistics">
	<div slot="icon">
		<LineChart class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="pb-3 pt-4">
		<div class="flex flex-col items-center justify-center font-bold">
			<p class="pb-1 text-6xl text-galaxy_purple-350 md:text-7xl">{totalVotes}</p>
			<p class="line-clamp-1 text-xl font-medium">
				{@html translations[lang].total_votes}
			</p>
		</div>
	</div>
</BaseCard>
