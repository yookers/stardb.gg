<script lang="ts">
	import { X } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	let showCard = true;
	export let user: string | undefined;
	const dispatch = createEventDispatcher();

	function closedInfo() {
		showCard = false;
		dispatch('closedInfo');
	}
</script>

{#if showCard}
	<div
		class="mt-6 rounded-2xl border-2 pb-3 pt-2 text-galaxy_purple-800 transition-all
    duration-300 xl:mt-0 {user
			? 'border-dim_green bg-neon_green hover:bg-dim_green'
			: 'border-dim_pink bg-neon_pink hover:bg-dim_pink'}"
		transition:slide={{ duration: 300, easing: cubicInOut }}
	>
		<!-- Card Title -->
		<button class="w-full" on:click={closedInfo} aria-label="Show/Hide Card Toggle">
			<div class="flex items-center justify-between px-5">
				<div class="flex flex-col justify-center text-left text-xs sm:text-sm">
					{#if user}
						<p>
							You are currently logged in as <span class="font-bold">{user}</span>.
						</p>
						<p>Achievement data will be stored in the server.</p>
					{:else}
						<p>Currently storing completed achievements <span class="font-bold">locally</span>.</p>
						<p>Please login to save data on the server.</p>
					{/if}
				</div>
				<X class="h-6 w-6 text-galaxy_purple-800 hover:scale-110 lg:h-7 lg:w-7" />
			</div>
		</button>

		<!-- Card Content-->
	</div>
{/if}
