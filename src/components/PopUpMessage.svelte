<script lang="ts">
	import { Loader2, Check, X } from 'lucide-svelte';
	//import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { MessageType } from '$types';

	export let messageType: MessageType; // 'LOADING', 'SUCCESS', 'FAIL'
	export let messageContent: string;

	//const dispatch = createEventDispatcher();

	$: {
		if (messageType === MessageType.SUCCESS || messageType === MessageType.FAIL) {
			setTimeout(() => {
				messageType = MessageType.NONE;
				//dispatch('messageTypeChange', messageType); // Dispatch the event
			}, 2000);
		}
	}
</script>

<div class="flex justify-center px-4">
	{#if messageType !== MessageType.NONE}
		<div
			class="fixed bottom-24 z-[4] flex h-14 w-full items-center justify-center space-x-4 md:w-[500px] md:rounded-full lg:w-[800px]
            {messageType === MessageType.LOADING
				? 'bg-galaxy_purple-250 text-galaxy_purple-550'
				: messageType === MessageType.SUCCESS
					? 'bg-[#87FCE0] px-4 text-[#039A82]'
					: messageType === MessageType.FAIL
						? 'bg-[#FF8ECF] px-4 text-[#9E3073]'
						: ''}"
			transition:fly={{ y: 70, easing: cubicInOut, duration: 400 }}
		>
			{#if messageType === MessageType.LOADING}
				<Loader2 class="h-7 w-7 animate-spin  md:h-8 md:w-8" />
			{:else if messageType === MessageType.SUCCESS}
				<Check class="h-7 w-7 md:h-8 md:w-8" />
			{:else if messageType === MessageType.FAIL}
				<X class="h-7 w-7 md:h-8 md:w-8" />
			{/if}
			<p class="text-sm font-bold sm:text-base md:text-lg">
				{messageContent}
			</p>
		</div>
	{/if}
</div>
