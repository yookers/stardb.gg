<script lang="ts">
	import { Pencil, ArrowUpRight } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';
	import translations from '$lib/translations/translations';
	import { locale } from '$store';
	const lang = $locale as 'de' | 'en' | 'es' | 'fr' | 'id' | 'jp' | 'kr' | 'pt' | 'ru' | 'th' | 'vi' | 'chs' | 'cht';

	let showCard = true;
</script>

<BaseCard label="Information" title="Information">
	<div slot="icon">
		<Pencil class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="pb-3 pt-4">
		<div class="flex flex-col space-y-3 text-sm sm:text-base">
			<div class="space-y-3 border-b-2 border-galaxy_purple-600 px-6 pb-3">
				<p>
					{@html translations[lang].community_tier_list_information}
				</p>
				<div class="flex">
					<a
						class="group flex items-center space-x-1 font-bold text-galaxy_purple-250 underline hover:text-galaxy_purple-350"
						href="/tier-list/vote"
					>
						<p>{translations[lang].click_here_to_vote}</p>
						<ArrowUpRight class="mt-0.5 h-5 w-5 group-hover:-translate-y-0.5" />
					</a>
				</div>
			</div>
			<div class="space-y-3 px-6">
				<p>
					{@html translations[lang].community_tier_list_variance}
				</p>
				<p>
					{@html translations[lang].community_tier_list_95_confidence}
				</p>
			</div>
		</div>
	</div>
</BaseCard>
