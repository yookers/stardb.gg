<script lang="ts">
	import { Loader2, Check, X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { MessageType } from '$types';

	export let messageType: MessageType; // 'LOADING', 'SUCCESS', 'FAIL'
	export let messageContent: string;

	const dispatch = createEventDispatcher();

	$: {
		if (messageType === MessageType.SUCCESS || messageType === MessageType.FAIL) {
			setTimeout(() => {
				messageType = MessageType.NONE;
				dispatch('messageTypeChange', messageType); // Dispatch the event
			}, 2000);
		}
	}
</script>

<div class="flex justify-center px-4">
	{#if messageType === MessageType.LOADING}
		<div
			class="fixed bottom-24 z-[4] flex h-14 w-full items-center justify-center space-x-4 bg-galaxy_purple-250 px-4 text-galaxy_purple-550 md:w-[500px] md:rounded-full lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<Loader2 class="h-7 w-7 animate-spin  md:h-8 md:w-8" />
			<p class="text-sm font-bold sm:text-base md:text-lg">
				{messageContent}
			</p>
		</div>
	{:else if messageType === MessageType.SUCCESS}
		<div
			class="fixed bottom-24 z-[4] flex h-14 w-full items-center justify-center space-x-4 bg-[#87FCE0] px-4 text-[#039A82] md:w-[500px] md:rounded-full lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<Check class="h-7 w-7 md:h-8 md:w-8" />
			<p class="text-sm font-bold sm:text-base md:text-lg">
				{messageContent}
			</p>
		</div>
	{:else if messageType === MessageType.FAIL}
		<div
			class="fixed bottom-24 z-[4] flex h-14 w-full items-center justify-center space-x-4 bg-[#FF8ECF] px-4 text-[#9E3073] md:w-[500px] md:rounded-full lg:w-[800px]"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			<X class="h-7 w-7 md:h-8 md:w-8" />
			<p class="text-sm font-bold sm:text-base md:text-lg">
				{messageContent}
			</p>
		</div>
	{/if}
</div>
