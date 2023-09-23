<script lang="ts">
	import { ListFilter, ChevronDown, ChevronUp, ArrowDownWideNarrow } from 'lucide-svelte';
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { AchievementDifficulty } from '$types';
	import BaseCard from '$components/BaseCard.svelte';

	export let showCompleted: boolean;
	export let showIncomplete: boolean;
	export let showHidden: boolean;
	export let selectedDifficulty: AchievementDifficulty;
	export let filterLength: number;
	export let sortOrder: 'default' | 'ascending' | 'descending';
    export let selectedVersions: string[] = [];
	export let versionList: string[];

	let showCard = true;
	let showVersionDropdown = false;

	function toggleVersion(version: string) {
		if (selectedVersions.includes(version)) {
			selectedVersions = selectedVersions.filter((v) => v !== version);
		} else {
			selectedVersions = [...selectedVersions, version];
		}
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

<BaseCard label="Filter" title="Filter">
	<div slot="icon">
		<ListFilter class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="pt-4">
		<div class="flex flex-col space-y-3 px-5 pb-3 text-sm md:text-base">
			<!-- space-y-1.5 and pb-1.5 to center and accomodate the horizontal scrollbar -->
			<div class="flex flex-col space-y-3 overflow-auto font-bold md:flex-row md:items-center md:space-y-0">
				<div class="flex flex-wrap gap-x-2 gap-y-3">
					<button
						class="h-8 w-20 flex-shrink-0 items-center justify-center rounded-full border-2
                    {selectedDifficulty === AchievementDifficulty.ALL
							? 'border-transparent bg-galaxy_purple-400 text-galaxy_purple-750'
							: 'border-galaxy_purple-400 bg-galaxy_purple-750 text-galaxy_purple-400 hover:bg-galaxy_purple-400 hover:text-galaxy_purple-750'}"
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
				<div class="hidden px-3 text-lg text-galaxy_purple-600 md:block">|</div>
				<div class="flex space-x-2">
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
			</div>

			<div class="flex flex-col space-y-3 font-bold sm:flex-row sm:items-center sm:space-x-2.5 sm:space-y-0">
				<div class="flex items-center space-x-2.5">
					<button
						class="relative flex h-8 w-14 flex-shrink-0 select-none items-center rounded-full border-2 text-center font-bold
                    {showCompleted
							? 'border-galaxy_purple-300 bg-galaxy_purple-550'
							: 'border-galaxy_purple-300 bg-galaxy_purple-700'}"
						aria-label="{showCompleted ? 'Hide' : 'Show'} completed achievements"
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
							aria-label="{showIncomplete ? 'Hide' : 'Show'} incomplete achievements"
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
			<div class="flex flex-wrap justify-between gap-x-6 gap-y-3 font-bold">
				<button
					class="relative h-8 w-44 rounded-full bg-galaxy_purple-750"
					aria-label="Toggle sort order"
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

				<div class="flex flex-wrap gap-x-6 gap-y-3">
					<div class="flex items-center space-x-2.5">
						<div class="relative">
							<!-- Button to toggle dropdown -->
							<button on:click={() => (showVersionDropdown = !showVersionDropdown)} class="border p-2">
								Select Versions
							</button>

							<!-- Dropdown content -->
							{#if showVersionDropdown}
								<div class="mt-2 w-64 rounded border p-4">
									<ul>
										{#each versionList as version}
											<li>
												<label class="inline-flex items-center">
													<input type="checkbox" class="form-checkbox" on:change={() => toggleVersion(version)} />
													<span class="ml-2">{version}</span>
												</label>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="border-t-2 border-galaxy_purple-600">
			{#key filterLength}
				<p class="px-6 py-2 text-sm">
					Filtering <span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}>{filterLength}</span> Achievements
				</p>
			{/key}
		</div>
	</div>
</BaseCard>
