<script lang="ts">
	const PUBLIC_SERVER_API_URL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import UserInfo from './UserInfo.svelte';
	import SearchAchievementCard from './SearchAchievementCard.svelte';
	import SeriesCard from './SeriesCard.svelte';
	import StatisticsCard from './StatisticsCard.svelte';
	import FilterCard from './FilterCard.svelte';
	import SingleAchievement from './SingleAchievement.svelte';
	import GroupAchievement from './GroupAchievement.svelte';
	import { lazyScroll } from './LazyScroll';
	import { Award, ArrowUpFromLine, Loader2, RefreshCw } from 'lucide-svelte';
	import type {
		Achievement,
		AchievementGroup,
		Series,
		SeriesSummary,
		SeriesData,
		SelectedSeries
	} from '$types';
	import { AchievementDifficulty } from '$types';

	// `data` also contains the same information as $page.data
	export let data;
	let achievementsData: Series[] = data.achievementsData ?? [];
	let seriesData: SeriesData = data.seriesData ?? {
		series: [],
		total_achievement_count: 0,
		current_achievement_count: 0,
		total_jade_count: 0,
		current_jade_count: 0
	};

	let selectedSeries: SelectedSeries = 'Show All';
	let showCompleted = true;
	let showIncomplete = true;
	let showHidden = true;
	let selectedDifficulty = AchievementDifficulty.ALL;
	let searchQuery = '';

	// Lazy loading
	let filteredAchievements: AchievementGroup[];
	let shownAchievements: AchievementGroup[];
	const LOAD_COUNT = 20;
	let shownCount = LOAD_COUNT;
	let loadMoreElement: HTMLElement | null = null;
	let observer: { disconnect: () => void } | null = null;

	onMount(() => {
		// If user is not logged in, get the completed achievements from local storage
		if (!data.user) {
			const completedAchievements: number[] = JSON.parse(
				localStorage.getItem('completed_achievements') || '[]'
			);

			achievementsData.forEach((series: Series) => {
				const seriesSummary = seriesData.series.find(
					(s: SeriesSummary) => s.name === series.series
				);

				if (!seriesSummary) {
					return;
				}

				series.achievements.forEach((group: AchievementGroup) => {
					group.achievements.forEach((achievement: Achievement) => {
						if (completedAchievements.includes(achievement.id)) {
							achievement.completed = true;
							group.completed_group_id = achievement.id;
							seriesSummary.current_achievement_count++;
							seriesSummary.current_jade_count += achievement.jades;
							seriesData.current_achievement_count++;
							seriesData.current_jade_count += achievement.jades;
						}
					});
				});
			});
			// onMount is not refreshing the data for some reason, so we need to manually update the reactive variables
			achievementsData = [...achievementsData];
		}
	});

	// Server/local storage
	async function storeServerData(achievement: Achievement) {
		try {
			const method = achievement.completed ? 'PUT' : 'DELETE';
			const response = await fetch(
				`${PUBLIC_SERVER_API_URL}/users/me/achievements/${achievement.id}`,
				{ method }
			);

			if (!response.ok) {
				throw new Error('Failed to update achievement');
			}
		} catch (error) {
			console.error(error);
		}
	}

	function storeLocalData(achievement: Achievement, previouslyCompleted: boolean) {
		let completedAchievements: number[] = JSON.parse(
			localStorage.getItem('completed_achievements') || '[]'
		);

		if (achievement.completed) {
			completedAchievements.push(achievement.id);
		} else if (previouslyCompleted) {
			completedAchievements = completedAchievements.filter((id) => id !== achievement.id);
		}

		localStorage.setItem('completed_achievements', JSON.stringify(completedAchievements));
	}

	function updateAchievementAndJadeCount(achievement: Achievement, increment: boolean) {
		// Find the corresponding series
		const series = seriesData.series.find((s) => s.name === achievement.series_name);

		if (series) {
			const jades = achievement.jades || 0;

			if (increment) {
				series.current_achievement_count++;
				series.current_jade_count += jades;

				seriesData.current_achievement_count++;
				seriesData.current_jade_count += jades;
			} else {
				series.current_achievement_count--;
				series.current_jade_count -= jades;

				seriesData.current_achievement_count--;
				seriesData.current_jade_count -= jades;
			}
		}
	}

	async function handleSingleToggleCompletion(achievement: Achievement) {
		const previouslyCompleted = achievement.completed ?? true;
		achievement.completed = !achievement.completed;

		updateAchievementAndJadeCount(achievement, !previouslyCompleted);

		if (data.user) {
			await storeServerData(achievement);
		} else {
			storeLocalData(achievement, previouslyCompleted);
		}

		// Makes achievements reactive
		achievementsData = [...achievementsData];
	}

	async function handleGroupToggleCompletion(group: AchievementGroup, achievement: Achievement) {
		let previouslyCompleted = achievement.completed ?? true;
		// If the clicked achievement is already completed
		if (achievement.completed) {
			achievement.completed = false;
			group.completed_group_id = undefined;
			updateAchievementAndJadeCount(achievement, false);
			storeLocalData(achievement, true);
		} else {
			// If there is a completed achievement in the group, set it to incomplete
			if (group.completed_group_id) {
				const completedAchievement = group.achievements.find(
					(a) => a.id === group.completed_group_id
				);

				if (completedAchievement) {
					completedAchievement.completed = false;
					previouslyCompleted = true;

					if (data.user) {
						await storeServerData(completedAchievement);
					} else {
						storeLocalData(completedAchievement, true);
					}
				}
			}

			// Set the clicked achievement to completed
			achievement.completed = true;
			group.completed_group_id = achievement.id;
			// Only update the counts if there was no previously completed achievement
			if (!previouslyCompleted) {
				updateAchievementAndJadeCount(achievement, true);
			}
		}

		// Handle server/local storage based on user presence
		if (data.user) {
			await storeServerData(achievement);
		} else {
			storeLocalData(achievement, previouslyCompleted);
		}
		// Makes achievements reactive
		achievementsData = [...achievementsData];
	}

	function flattenAchievements(data: Series[]): AchievementGroup[] {
		let flatList: AchievementGroup[] = [];
		data.forEach((item) => {
			item.achievements.forEach((group) => {
				flatList.push(group);
			});
		});
		return flatList;
	}

	function combinedFilters(
		achievements: Series[],
		showCompleted: boolean,
		showIncomplete: boolean,
		series: SelectedSeries,
		query: string,
		difficulty: AchievementDifficulty,
		showHidden: boolean
	): Series[] {
		const lowercaseQuery = query.toLowerCase();
		return achievements
			.filter((item) => series === 'Show All' || item.series === series.name)
			.map((item) => ({
				...item,
				achievements: item.achievements.filter((achievementGroup) =>
					achievementGroup.achievements.some((achievement) => {
						const matchesCompletion =
							achievement.completed || achievementGroup.completed_group_id
								? showCompleted
								: showIncomplete;
						const matchesQuery = !query || achievement.name.toLowerCase().includes(lowercaseQuery);
						const matchesDifficulty =
							difficulty === AchievementDifficulty.ALL || achievement.difficulty === difficulty;
						const matchesHidden = showHidden || !achievement.hidden;
						return matchesCompletion && matchesQuery && matchesDifficulty && matchesHidden;
					})
				)
			}));
	}

	function resetFilters() {
		showCompleted = true;
		showIncomplete = true;
		showHidden = true;
		selectedDifficulty = AchievementDifficulty.ALL;
		searchQuery = '';
	}

	$: filteredAchievements = flattenAchievements(
		combinedFilters(
			achievementsData,
			showCompleted,
			showIncomplete,
			selectedSeries,
			searchQuery,
			selectedDifficulty,
			showHidden
		)
	);

	$: shownAchievements = filteredAchievements.slice(0, shownCount);

	// Intersection Observer lazy loading
	function resetLazyScroll() {
		shownCount = LOAD_COUNT;
	}

	function loadMore() {
		// Load more achievements when the observer detects the 'load more' element
		shownCount += LOAD_COUNT;
	}

	$: {
		if (loadMoreElement) {
			if (observer) {
				observer.disconnect();
			}
			observer = lazyScroll(loadMore, loadMoreElement);
		}
	}
</script>

<svelte:head>
	<title>Achievement Tracker - StarDB.gg</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div
	class="flex w-full flex-col justify-center space-x-0 px-4 sm:px-6 lg:px-24 xl:px-6 text-off_white xl:flex-row xl:space-x-6 overflow-y"
>
	<!-- Column 1 -->
	<div class="w-full text-lg xl:w-[550px] xl:pt-36 xl:text-xl">
		<UserInfo user={data.user?.username} />
		<div class="xl:sticky top-16 space-y-6 pt-6">
			<SearchAchievementCard bind:searchQuery />
			<SeriesCard {seriesData} {resetLazyScroll} bind:selectedSeries />
			<StatisticsCard {seriesData} />
		</div>
	</div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col space-y-6 py-6 xl:w-[1100px]">
		<FilterCard
			bind:showCompleted
			bind:showIncomplete
			bind:showHidden
			bind:selectedDifficulty
			filterLength={filteredAchievements.length}
		/>

		<div class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750 pt-3">
			<div class="flex items-center justify-between px-5 pb-3">
				<div class="flex items-center space-x-4">
					<Award class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
					<p class="text-xl font-bold lg:text-2xl">Achievements</p>
				</div>
				<button
					class="hover:scale-110"
					aria-label="Reset Achievement Filters"
					on:click={() => resetFilters()}
				>
					<RefreshCw class="h-5 w-5 text-off_white hover:animate-spin lg:h-6 lg:w-6" />
				</button>
			</div>
			<div class="px-8 sticky flex justify-between text-sm font-bold top-16 z-[2]"></div>

			<div class="px-8 text-sm pb-2 flex justify-between font-bold">
				<p>Name</p>
				<p>% Players Obtained</p>
			</div>
			<div class="px-3 pb-3 md:px-6 md:pb-6 space-y-2 md:space-y-3 min-h-[96px]">
				{#each shownAchievements as achievementGroup (achievementGroup.achievements[0]?.id)}
					<div transition:fly={{ y: 40, duration: 300, easing: cubicInOut }}>
						{#if achievementGroup.achievements.length === 1 && achievementGroup.achievements[0]}
							<SingleAchievement
								achievement={achievementGroup.achievements[0]}
								{handleSingleToggleCompletion}
							/>
						{:else}
							<GroupAchievement {achievementGroup} {handleGroupToggleCompletion} />
						{/if}
					</div>
				{/each}
				{#if shownCount < filteredAchievements.length}
					<div bind:this={loadMoreElement} class="flex justify-center items-center">
						<Loader2 class="w-7 h-7 text-galaxy_purple-600 animate-spin" />
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<div
	class="fixed bottom-16 right-8 z-[3] hover:scale-105 bg-galaxy_purple-550 border-2 border-galaxy_purple-500 rounded-xl hover:bg-galaxy_purple-450"
>
	<button
		class="w-12 h-12 md:h-14 md:w-14 rounded-lg flex justify-center items-center"
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
	>
		<ArrowUpFromLine class="h-7 w-7 md:h-9 md:w-9 text-off_white" />
	</button>
</div>
