<script lang="ts">
	import { PUBLIC_RES_API_URL } from '$env/static/public';
	import { Database, ArrowUpRight } from 'lucide-svelte';
	import type { TrackerAchievement, AchievementGroup } from '$types';

	export let achievementGroup: AchievementGroup;
	export let handleGroupToggleCompletion: (group: AchievementGroup, achievement: TrackerAchievement) => void;
</script>

<div class="space-y-2 rounded-xl border-2 border-galaxy_purple-650 p-2 transition-all duration-300 hover:scale-102">
	{#each achievementGroup.achievements as achievement}
		<div
			class="relative z-[1] rounded-xl border-2 border-transparent text-xs sm:text-sm
    {achievement.completed
				? 'bg-galaxy_purple-650 hover:border-galaxy_purple-650 hover:bg-galaxy_purple-750'
				: 'bg-galaxy_purple-800 hover:border-galaxy_purple-650 hover:bg-galaxy_purple-750'}"
		>
			<div
				class="absolute -z-[1] h-full bg-galaxy_purple-600/30 {achievement.completed
					? 'bg-galaxy_purple-550/30'
					: 'bg-galaxy_purple-700/30'}"
				style="width: {achievement.percent * 100}%"
			></div>
			<button
				class="w-full pt-3"
				on:click={() => handleGroupToggleCompletion(achievementGroup, achievement)}
				aria-label="Toggle achievement completion"
			>
				<div class="flex justify-between px-5">
					<p class="pr-2 text-left text-sm font-bold md:text-base" class:line-through={achievement.completed}>
						{achievement.name}
					</p>

					<div class="flex items-center justify-center space-x-4">
						<p class="textsm font-bold md:text-base">{(achievement.percent * 100).toFixed(2)}%</p>
						<div
							class="h-6 w-6 shrink-0 rounded-lg border-2 border-galaxy_purple-900/70"
							class:bg-neon_green={achievement.completed}
							class:bg-galaxy_purple-700={achievementGroup.completed_group_id &&
								achievementGroup.completed_group_id !== achievement.id}
						></div>
					</div>
				</div>
			</button>

			<div class="px-4 pb-2.5 pt-2">
				<p class="px-1">{achievement.description}</p>

				<div class="flex justify-between space-x-1 overflow-x-auto pt-4 sm:space-x-2">
					<div class="flex space-x-1 font-extrabold sm:space-x-2 md:space-x-3">
						{#if achievement.version}
							<div class="flex h-6 w-14 items-center justify-center rounded-full bg-galaxy_purple-750 text-off_white">
								<p>V{achievement.version}</p>
							</div>
						{/if}
						{#if achievement.hidden}
							<div class="flex h-6 w-16 items-center justify-center rounded-full bg-galaxy_purple-300 text-galaxy_purple-700">
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
								<img class="h-4 w-4" src={`${PUBLIC_RES_API_URL}/img/jade-currency-small.webp`} alt="Jade Icon" />
							</div>
						{/if}
					</div>
					<a
						href="/database/achievements/{achievement.id}"
						class="group flex items-center text-off_white hover:text-galaxy_purple-250"
                        aria-label={`View the achievement "${achievement.name}" in the database`}
					>
						<Database class="h-4 w-4 sm:h-5 sm:w-5" />
						<ArrowUpRight class="h-6 w-6 group-hover:-translate-y-0.5" />
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>
