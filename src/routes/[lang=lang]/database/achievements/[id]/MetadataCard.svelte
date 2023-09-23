<script lang="ts">
	import { Braces } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';
	import type { DatabaseAchievement } from '$types';

	export let achievementData: DatabaseAchievement;
	let showCard = false;
</script>

<BaseCard label="Metadata" title="Metadata">
	<div slot="icon">
		<Braces class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="space-y-2 truncate px-12 pb-3 pt-4">
		<div class="flex w-full items-baseline justify-between">
			<p class="font-normal">ID</p>
			<div class="mx-3 w-full border border-dashed border-galaxy_purple-550"></div>
			<p>{achievementData.id}</p>
		</div>

		<div class="flex w-full items-baseline justify-between">
			<p class="font-normal">Version</p>
			<div class="mx-3 w-full border border-dashed border-galaxy_purple-550"></div>
			<p>{achievementData.version}</p>
		</div>

		<div class="flex w-full items-baseline justify-between">
			<p class="font-normal">Hidden</p>
			<div class="mx-3 w-full border border-dashed border-galaxy_purple-550"></div>
			<p>{achievementData.hidden ? 'Yes' : 'No'}</p>
		</div>

		<div class="flex w-full items-baseline justify-between">
			<p class="font-normal">Jade Value</p>
			<div class="mx-3 w-full border border-dashed border-galaxy_purple-550"></div>
			<p>{achievementData.jades}</p>
		</div>

		<div class="flex w-full items-baseline justify-between">
			<p class="font-normal">% Obtained</p>
			<div class="mx-3 w-full border border-dashed border-galaxy_purple-550"></div>
			<p>{(achievementData.percent * 100).toFixed(4)}%</p>
		</div>
	</div>
</BaseCard>
