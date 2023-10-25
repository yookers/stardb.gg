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
	<div slot="content" class="truncate px-3 pb-3 pt-4">
		<div class="flex w-full justify-between px-10 py-1.5 md:px-16 lg:px-20">
			<p>ID</p>
			<p class="font-semibold">{achievementData.id}</p>
		</div>

		<div class="flex w-full justify-between bg-galaxy_purple-700 px-10 py-1.5 md:px-16 lg:px-20">
			<p>Version</p>
			<p class="font-semibold">{achievementData.version}</p>
		</div>

		<div class="flex w-full justify-between px-10 py-1.5 md:px-16 lg:px-20">
			<p>Hidden</p>
			<p class="font-semibold">{achievementData.hidden ? 'Yes' : 'No'}</p>
		</div>

		<div class="flex w-full justify-between bg-galaxy_purple-700 px-10 py-1.5 md:px-16 lg:px-20">
			<p>Jade Value</p>
			<p class="font-semibold">{achievementData.jades}</p>
		</div>

		<div class="flex w-full justify-between px-10 py-1.5 md:px-16 lg:px-20">
			<p>% Obtained</p>
			<p class="font-semibold">{(achievementData.percent * 100).toFixed(4)}%</p>
		</div>
	</div>
</BaseCard>
