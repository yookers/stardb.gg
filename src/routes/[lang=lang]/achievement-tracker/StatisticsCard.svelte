<script lang="ts">
	import { LineChart } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';
	import type { SeriesData } from '$types';

	export let seriesData: SeriesData;
	let showCard = false;
</script>

<BaseCard label="Statistics" title="Statistics">
	<div slot="icon">
		<LineChart class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="pb-3 pt-4">
		<div class="flex flex-col items-center justify-center font-bold">
			<p class="pb-1 text-6xl text-galaxy_purple-350 md:text-7xl">{seriesData.user_count}</p>
			<p class="line-clamp-1 text-xl font-medium">
				<span class="font-bold text-galaxy_purple-350">Tracked</span> accounts
			</p>
		</div>
	</div>
</BaseCard>
