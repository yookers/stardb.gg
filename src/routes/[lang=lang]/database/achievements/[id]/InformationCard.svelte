<script lang="ts">
	import { Pencil, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import BaseCard from '$components/BaseCard.svelte';
	import type { DatabaseAchievement } from '$types';

	export let achievementData: DatabaseAchievement;
	let showCard = true;
</script>

<BaseCard label="Information" title="Information">
	<div slot="icon">
		<Pencil class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="space-y-3 font-bold pb-3 pt-4">
			<div class="flex w-full flex-col px-6">
				<p>Description:</p>
				<p class="font-normal">{@html achievementData.description.replace(/\\n/g, '<br>')}</p>
			</div>

			<div class="flex w-full flex-col border-t-2 border-galaxy_purple-600 px-6 pt-2">
				<p>How to Obtain:</p>
				{#if achievementData.comment}
					<p class="font-normal">{achievementData.comment}</p>
				{:else}
					<p class="font-normal">Either trivial to obtain, extremely new, or not yet updated with specific instructions.</p>
				{/if}
			</div>

			<div class="flex w-full flex-col border-t-2 border-galaxy_purple-600 px-6 pt-2">
				<p>Reference:</p>
				{#if achievementData.reference}
					<p class="font-normal">{achievementData.reference}</p>
				{:else}
					<p class="font-normal">
						Missing or no specific pop-cultural reference.
						<!--  If you have a suggestion, please leave your comment below. -->
					</p>
				{/if}
			</div>
		</div>
</BaseCard>
