<script lang="ts">
	import { ListFilter, ChevronDown, ChevronUp, ArrowDownWideNarrow } from 'lucide-svelte';
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { AchievementDifficulty } from '$types';

	export let showCompleted: boolean;
	export let showIncomplete: boolean;
	export let showHidden: boolean;
	export let selectedDifficulty: AchievementDifficulty;
	export let filterLength: number;
	export let sortOrder: 'default' | 'ascending' | 'descending';
	let showCard = true;

	function toggleSortOrder() {
		if (sortOrder === 'default') {
			sortOrder = 'ascending';
		} else if (sortOrder === 'ascending') {
			sortOrder = 'descending';
		} else {
			sortOrder = 'default';
		}
	}
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-650 bg-galaxy_purple-700 pt-3
    transition-all duration-300 hover:scale-102 hover:bg-galaxy_purple-700/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
		<div class="flex items-center justify-between px-5 pb-3">
			<div class="flex items-center space-x-4">
				<ListFilter class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Filter</p>
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
		<div class="flex flex-col pt-2" transition:slide={{ duration: 300, easing: cubicInOut }}>
			<div class="flex flex-col space-y-3 px-5 pb-3 text-sm md:text-base">
				<div
					class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:items-center font-bold overflow-auto"
				>
					<div class="flex space-x-2">
						<button
							class="w-20 h-8 rounded-full border-2 flex-shrink-0 items-center justify-center
                            {selectedDifficulty === AchievementDifficulty.ALL
								? 'bg-galaxy_purple-400 text-galaxy_purple-750 border-transparent'
								: 'bg-galaxy_purple-750 text-galaxy_purple-400 border-galaxy_purple-400 hover:text-galaxy_purple-750 hover:bg-galaxy_purple-400'}"
							on:click={() => (selectedDifficulty = AchievementDifficulty.ALL)}
						>
							<p>All</p>
						</button>
						<button
							class="w-20 h-8 rounded-full border-2 flex-shrink-0 items-center justify-center
                        {selectedDifficulty === AchievementDifficulty.EASY
								? 'bg-neon_green text-galaxy_purple-750 border-transparent'
								: 'bg-galaxy_purple-750 text-neon_green border-neon_green hover:text-galaxy_purple-750 hover:bg-neon_green'}"
							on:click={() => (selectedDifficulty = AchievementDifficulty.EASY)}
						>
							<p>Easy</p>
						</button>
						<button
							class="w-20 h-8 rounded-full border-2 flex-shrink-0 items-center justify-center
                        {selectedDifficulty === AchievementDifficulty.MEDIUM
								? 'bg-neon_yellow text-galaxy_purple-750 border-transparent'
								: 'bg-galaxy_purple-750 text-neon_yellow border-neon_yellow hover:text-galaxy_purple-750 hover:bg-neon_yellow'}"
							on:click={() => (selectedDifficulty = AchievementDifficulty.MEDIUM)}
						>
							<p>Med.</p>
						</button>
						<button
							class="w-20 h-8 rounded-full border-2 flex-shrink-0 items-center justify-center
                        {selectedDifficulty === AchievementDifficulty.HARD
								? 'bg-neon_pink text-galaxy_purple-750 border-transparent'
								: 'bg-galaxy_purple-750 text-neon_pink border-neon_pink hover:text-galaxy_purple-750 hover:bg-neon_pink'}"
							on:click={() => (selectedDifficulty = AchievementDifficulty.HARD)}
						>
							<p>Hard</p>
						</button>
					</div>
					<div class="text-galaxy_purple-650 text-lg px-3 hidden md:block">|</div>
					<button
						class="w-24 h-8 rounded-full border-2 flex-shrink-0 items-center justify-center
                        {showHidden
							? 'bg-galaxy_purple-300 text-galaxy_purple-750 border-transparent'
							: 'bg-galaxy_purple-750 text-galaxy_purple-300 border-galaxy_purple-300'}"
						on:click={() => (showHidden = !showHidden)}
					>
						<p>Hidden</p>
					</button>
				</div>

				<div
					class="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-2.5 font-bold"
				>
					<div class="flex items-center space-x-2.5">
						<button
							class="relative flex-shrink-0 flex h-8 w-14 border-2 select-none items-center rounded-full text-center font-bold
                            {showCompleted
								? 'bg-galaxy_purple-550 border-galaxy_purple-300'
								: 'bg-galaxy_purple-700 border-galaxy_purple-300'}"
							aria-label="Toggle Show Completed Achievements"
							on:click={() => (showCompleted = !showCompleted)}
						>
							<span
								class="absolute flex h-6 w-6 items-center justify-center rounded-full bg-galaxy_purple-200 text-galaxy_purple-700 duration-300
                            {showCompleted ? 'left-[26px]' : 'left-0.5'}"
							>
							</span>
						</button>
						<p class="pr-4">Completed</p>
					</div>
					<div class="flex justify-between flex-col space-y-3 sm:space-y-0 sm:flex-row w-full">
						<div class="flex items-center space-x-2.5">
							<button
								class="relative flex-shrink-0 flex h-8 w-14 border-2 select-none items-center rounded-full text-center font-bold
                            {showIncomplete
									? 'bg-galaxy_purple-550 border-galaxy_purple-300'
									: 'bg-galaxy_purple-700 border-galaxy_purple-300'}"
								aria-label="Toggle Show Incomplete Achievements"
								on:click={() => (showIncomplete = !showIncomplete)}
							>
								<span
									class="absolute flex h-6 w-6 items-center justify-center rounded-full bg-galaxy_purple-200 text-galaxy_purple-700 duration-300
                            {showIncomplete ? 'left-[26px]' : 'left-0.5'}"
								>
								</span>
							</button>
							<p>Incomplete</p>
						</div>
						<button
							class="relative w-44 h-8 rounded-full bg-galaxy_purple-800"
							aria-label="Toggle Sort Order"
							on:click={() => toggleSortOrder()}
						>
							<div class="flex items-center justify-center">
								<ArrowDownWideNarrow class="absolute left-4 w-4 h-4" />
								{#key sortOrder}
									<p
										class="pl-4 capitalize"
										in:slide={{ axis: 'y', duration: 200, easing: cubicInOut }}
									>
										{sortOrder} %
									</p>
								{/key}
							</div>
						</button>
					</div>
				</div>
			</div>
			<div class="border-t-2 border-galaxy_purple-650/95">
				{#key filterLength}
					<p class="px-6 py-2 text-sm">
						Filtering <span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}
							>{filterLength}</span
						> Achievements
					</p>
				{/key}
			</div>
		</div>
	{/if}
</div>
