<script lang="ts">
	import { ListFilter, ChevronDown, ChevronUp, ArrowDownWideNarrow } from 'lucide-svelte';
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { AchievementDifficulty } from '$types';
	import { languages } from '../store';
	import type { Language } from '$types';

	export let showCompleted: boolean;
	export let showIncomplete: boolean;
	export let showHidden: boolean;
	export let selectedDifficulty: AchievementDifficulty;
	export let filterLength: number;
	export let sortOrder: 'default' | 'ascending' | 'descending';
	export let selectedLanguageName: string;
	export let changeLanguage: (language: string) => void;

	let showCard = true;

	function handleChangeLanguage(language: Language) {
		selectedLanguageName = language.name;
		changeLanguage(language.id);
	}

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
	class="z-[4] rounded-2xl border-2 border-galaxy_purple-650 bg-galaxy_purple-700 pt-3
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
				<div class="flex flex-col space-y-3 overflow-auto font-bold md:flex-row md:items-center md:space-y-0">
					<div class="flex space-x-2">
						<button
							class="h-8 w-20 flex-shrink-0 items-center justify-center rounded-full border-2
                            {selectedDifficulty === AchievementDifficulty.ALL
								? 'border-transparent bg-galaxy_purple-400 text-galaxy_purple-800'
								: 'border-galaxy_purple-400 bg-galaxy_purple-750 text-galaxy_purple-400 hover:bg-galaxy_purple-400 hover:text-galaxy_purple-800'}"
							on:click={() => (selectedDifficulty = AchievementDifficulty.ALL)}
						>
							<p>All</p>
						</button>
						<button
							class="h-8 w-20 flex-shrink-0 items-center justify-center rounded-full border-2
                        {selectedDifficulty === AchievementDifficulty.EASY
								? 'border-transparent bg-neon_green text-galaxy_purple-750'
								: 'border-neon_green bg-galaxy_purple-750 text-neon_green hover:bg-neon_green hover:text-galaxy_purple-750'}"
							on:click={() => (selectedDifficulty = AchievementDifficulty.EASY)}
						>
							<p>Easy</p>
						</button>
						<button
							class="h-8 w-20 flex-shrink-0 items-center justify-center rounded-full border-2
                        {selectedDifficulty === AchievementDifficulty.MEDIUM
								? 'border-transparent bg-neon_yellow text-galaxy_purple-750'
								: 'border-neon_yellow bg-galaxy_purple-750 text-neon_yellow hover:bg-neon_yellow hover:text-galaxy_purple-750'}"
							on:click={() => (selectedDifficulty = AchievementDifficulty.MEDIUM)}
						>
							<p>Med.</p>
						</button>
						<button
							class="h-8 w-20 flex-shrink-0 items-center justify-center rounded-full border-2
                        {selectedDifficulty === AchievementDifficulty.HARD
								? 'border-transparent bg-neon_pink text-galaxy_purple-750'
								: 'border-neon_pink bg-galaxy_purple-750 text-neon_pink hover:bg-neon_pink hover:text-galaxy_purple-750'}"
							on:click={() => (selectedDifficulty = AchievementDifficulty.HARD)}
						>
							<p>Hard</p>
						</button>
					</div>
					<div class="hidden px-3 text-lg text-galaxy_purple-650 md:block">|</div>
					<button
						class="h-8 w-24 flex-shrink-0 items-center justify-center rounded-full border-2
                        {showHidden
							? 'border-transparent bg-galaxy_purple-300 text-galaxy_purple-750'
							: 'border-galaxy_purple-300 bg-galaxy_purple-750 text-galaxy_purple-300'}"
						on:click={() => (showHidden = !showHidden)}
					>
						<p>Hidden</p>
					</button>
				</div>

				<div class="flex flex-col space-y-3 font-bold sm:flex-row sm:items-center sm:space-x-2.5 sm:space-y-0">
					<div class="flex items-center space-x-2.5">
						<button
							class="relative flex h-8 w-14 flex-shrink-0 select-none items-center rounded-full border-2 text-center font-bold
                            {showCompleted
								? 'border-galaxy_purple-300 bg-galaxy_purple-550'
								: 'border-galaxy_purple-300 bg-galaxy_purple-700'}"
							aria-label="Toggle Show Completed Achievements"
							on:click={() => (showCompleted = !showCompleted)}
						>
							<span
								class="absolute flex h-6 w-6 items-center justify-center rounded-full bg-galaxy_purple-200 text-galaxy_purple-700 duration-300
                            {showCompleted ? 'left-[26px]' : 'left-0.5'}"
							>
							</span>
						</button>
						<p class="pr-4" class:text-galaxy_purple-300={!showCompleted}>Completed</p>
					</div>
					<div class="flex w-full flex-col justify-between space-y-3 sm:flex-row sm:space-y-0">
						<div class="flex items-center space-x-2.5">
							<button
								class="relative flex h-8 w-14 flex-shrink-0 select-none items-center rounded-full border-2 text-center font-bold
                            {showIncomplete
									? 'border-galaxy_purple-300 bg-galaxy_purple-550'
									: 'border-galaxy_purple-300 bg-galaxy_purple-700'}"
								aria-label="Toggle Show Incomplete Achievements"
								on:click={() => (showIncomplete = !showIncomplete)}
							>
								<span
									class="absolute flex h-6 w-6 items-center justify-center rounded-full bg-galaxy_purple-200 text-galaxy_purple-700 duration-300
                            {showIncomplete ? 'left-[26px]' : 'left-0.5'}"
								>
								</span>
							</button>
							<p class:text-galaxy_purple-300={!showIncomplete}>Incomplete</p>
						</div>
					</div>
				</div>
				<div class="flex justify-between space-x-2 font-bold">
					<button
						class="relative h-8 w-44 rounded-full bg-galaxy_purple-800"
						aria-label="Toggle Sort Order"
						on:click={() => toggleSortOrder()}
					>
						<div class="flex items-center justify-center">
							<ArrowDownWideNarrow class="absolute left-4 h-4 w-4" />
							{#key sortOrder}
								<p class="pl-4 capitalize" in:slide={{ axis: 'y', duration: 200, easing: cubicInOut }}>
									{sortOrder} %
								</p>
							{/key}
						</div>
					</button>
					<div class="group relative flex h-8 w-32 sm:w-36">
						<button class="flex w-full items-center justify-center overflow-x-hidden rounded-lg bg-galaxy_purple-800 px-1">
							{#if selectedLanguageName}
								<p class="line-clamp-1">{selectedLanguageName}</p>
							{/if}
						</button>
						<nav
							tabindex="-1"
							class="absolute left-0 top-full hidden overflow-hidden rounded-lg border-galaxy_purple-750 bg-galaxy_purple-800 transition-all group-focus-within:flex group-focus-within:translate-y-1 group-focus-within:flex-col"
							class:border-2={$languages.length > 0}
						>
							{#each $languages as language}
								<button
									class="px-4 py-2 text-left hover:bg-galaxy_purple-200 hover:text-galaxy_purple-750 {language.name ===
									selectedLanguageName
										? 'bg-galaxy_purple-200 text-galaxy_purple-750'
										: ''}"
									on:click={() => handleChangeLanguage(language)}><p>{language.name}</p></button
								>
							{/each}
						</nav>
					</div>
				</div>
			</div>
			<div class="border-t-2 border-galaxy_purple-650/95">
				{#key filterLength}
					<p class="px-6 py-2 text-sm">
						Filtering <span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}>{filterLength}</span> Achievements
					</p>
				{/key}
			</div>
		</div>
	{/if}
</div>
