<script>
	import { Loader2, Check, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let messageType; // 'loading', 'success', 'fail'
	export let messageContent;

	$: {
		if (messageType === 'success' || messageType === 'fail') {
			setTimeout(() => {
				messageType = null;
			}, 2000);
		}
	}
</script>

<div class="flex justify-center">
	{#if messageType === 'loading'}
		<div
			class="fixed bottom-24 flex h-14 w-96 items-center justify-center space-x-4 rounded-full bg-galaxy_purple-250 text-galaxy_purple-550 md:w-[500px] lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<Loader2 class="h-7 w-7 animate-spin  md:h-8 md:w-8" />
			<p class="text-base font-bold md:text-lg">
				{messageContent}
			</p>
		</div>
	{:else if messageType === 'success'}
		<div
			class="fixed bottom-24 flex h-14 w-96 items-center justify-center space-x-4 rounded-full bg-[#87FCE0] text-[#039A82] md:w-[500px] lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<Check class="h-7 w-7 md:h-8 md:w-8" />
			<p class="text-base font-bold md:text-lg">
				{messageContent}
			</p>
		</div>
	{:else if messageType === 'fail'}
		<div
			class="fixed bottom-24 flex h-14 w-96 items-center justify-center space-x-4 rounded-full bg-[#FF8ECF] text-[#9E3073] md:w-[500px] lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<X class="h-7 w-7  md:h-8 md:w-8" />
			<p class="text-base font-bold md:text-lg">
				{messageContent}
			</p>
		</div>
	{/if}
</div>
