<script lang="ts">
	import { Loader2, Check, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { MessageType } from '$types';

	export let messageType: MessageType; // 'LOADING', 'SUCCESS', 'FAIL'
	export let messageContent: string;

	$: {
		if (messageType === MessageType.SUCCESS || messageType === MessageType.FAIL) {
			setTimeout(() => {
				messageType = MessageType.NONE;
			}, 2000);
		}
	}
</script>

<div class="flex justify-center">
	{#if messageType === MessageType.LOADING}
		<div
			class="fixed bottom-24 z-[4] flex h-14 w-96 items-center justify-center space-x-4 rounded-full bg-galaxy_purple-250 text-galaxy_purple-550 md:w-[500px] lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<Loader2 class="h-7 w-7 animate-spin  md:h-8 md:w-8" />
			<p class="text-sm font-bold sm:text-base md:text-lg">
				{messageContent}
			</p>
		</div>
	{:else if messageType === MessageType.SUCCESS}
		<div
			class="fixed bottom-24 z-[4] flex h-14 w-96 items-center justify-center space-x-4 rounded-full bg-[#87FCE0] text-[#039A82] md:w-[500px] lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<Check class="h-7 w-7 md:h-8 md:w-8" />
			<p class="text-sm font-bold sm:text-base md:text-lg">
				{messageContent}
			</p>
		</div>
	{:else if messageType === MessageType.FAIL}
		<div
			class="z[4] fixed bottom-24 flex h-14 w-96 items-center justify-center space-x-4 rounded-full bg-[#FF8ECF] text-[#9E3073] md:w-[500px] lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<X class="h-7 w-7  md:h-8 md:w-8" />
			<p class="text-sm font-bold sm:text-base md:text-lg">
				{messageContent}
			</p>
		</div>
	{/if}
</div>
