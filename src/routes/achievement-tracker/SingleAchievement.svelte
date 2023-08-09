<script lang="ts">
	import { PUBLIC_RES_API_URL } from '$env/static/public';
	import type { Achievement } from '$types';

	export let achievement: Achievement;
	export let handleSingleToggleCompletion: (achievement: Achievement) => void;
</script>

<div
	class="relative rounded-xl border-2 z-[1] text-xs sm:text-sm overflow-hidden transition-all duration-300 hover:scale-102
    {achievement.completed
		? 'bg-galaxy_purple-650 hover:bg-galaxy_purple-750 border-galaxy_purple-650 hover:border-galaxy_purple-750'
		: 'bg-galaxy_purple-800 hover:bg-galaxy_purple-750 border-galaxy_purple-650'}"
>
	<div
		class="absolute -z-[1] h-full {achievement.completed
			? 'bg-galaxy_purple-550/30'
			: 'bg-galaxy_purple-700/30'}"
		style="width: {achievement.percent * 100}%"
	></div>
	<button
		class="w-full pt-3"
		on:click={() => handleSingleToggleCompletion(achievement)}
		aria-label="Toggle Achievement Completion"
	>
		<div class="flex justify-between px-5">
			<p
				class="text-left font-bold text-sm md:text-base pr-2"
				class:line-through={achievement.completed}
			>
				{achievement.name}
			</p>

			<div class="flex space-x-3 items-center justify-center">
				<p class="font-bold textsm md:text-base">{achievement.percent * 100}%</p>
				<div
					class="h-6 w-6 rounded-lg border-2 shrink-0 border-galaxy_purple-900/70"
					class:bg-neon_green={achievement.completed}
				></div>
			</div>
		</div>
	</button>

	<div class="px-4 pb-3 pt-2">
		<p class="px-1">{achievement.description}</p>

		<div class="flex space-x-2 md:space-x-3 pt-4 font-extrabold">
			{#if achievement.version}
				<div
					class="flex items-center justify-center rounded-full h-6 w-14 bg-galaxy_purple-750 text-off_white"
				>
					<p>V{achievement.version}</p>
				</div>
			{/if}
			{#if achievement.hidden}
				<div
					class="flex h-6 w-16 items-center justify-center rounded-full bg-galaxy_purple-300 text-galaxy_purple-700"
				>
					<p>Hidden</p>
				</div>
			{/if}
			{#if achievement.difficulty}
				<div
					class="flex h-6 w-16 items-center justify-center rounded-full text-galaxy_purple-800"
					class:bg-neon_green={achievement.difficulty === 'easy'}
					class:bg-neon_yellow={achievement.difficulty === 'medium'}
					class:bg-neon_pink={achievement.difficulty === 'hard'}
				>
					<p class="capitalize">
						{#if achievement.difficulty === 'medium'}
							Med.
						{:else}
							{achievement.difficulty}
						{/if}
					</p>
				</div>
			{/if}
			{#if achievement.jades}
				<div
					class="flex h-6 w-16 items-center justify-center space-x-1.5 rounded-full bg-galaxy_purple-800 text-galaxy_purple-150"
				>
					<p>{achievement.jades}</p>
					<img
						class="h-4 w-4"
						src={`${PUBLIC_RES_API_URL}/img/jade-currency-small.webp`}
						alt="Jade Icon"
					/>
				</div>
			{/if}
		</div>
	</div>
</div>
