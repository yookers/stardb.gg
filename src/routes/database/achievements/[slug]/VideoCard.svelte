<script lang="ts">
	import { Youtube, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let videoURL: string;
	let showCard = true;

	function formatURL(url: string) {
		const videoID = url.split('/').pop();
		return `https://www.youtube-nocookie.com/embed/${videoID}?&modestbranding=1&rel=0&enablejsapi=1`;
	}
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-650 bg-galaxy_purple-700
    transition-all duration-300 hover:scale-102 hover:bg-galaxy_purple-700/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="{showCard ? 'Hide' : 'Show'} sample card">
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
			<div class="flex items-center space-x-4">
				<Youtube class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Video Guide</p>
			</div>

			{#if showCard}
				<ChevronUp class="h-6 w-6 text-off_white lg:h-7 lg:w-7" />
			{:else}
				<ChevronDown class="h-6 w-6 text-off_white lg:h-7 lg:w-7" />
			{/if}
		</div>
	</button>
	<!-- Card Content-->
	{#if showCard}
		<div class="flex items-center justify-start px-3 pb-3 pt-2" transition:slide={{ duration: 300, easing: cubicInOut }}>
			<!-- (pb-[56.25%]) 16:9 Aspect ratio  -->
			<div class="relative flex w-full pb-[56.25%]">
				<iframe
					class="absolute left-0 h-full w-full rounded-xl border-2 border-galaxy_purple-650"
					src={formatURL(videoURL)}
					title="Video guide for the achievement"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>
	{/if}
</div>
