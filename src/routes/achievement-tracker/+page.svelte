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
	import PopUpMessage from '$components/PopUpMessage.svelte';
	import { lazyScroll } from './LazyScroll';
	import { Award, Minimize2, Maximize2, ArrowUp, Loader2, RefreshCw } from 'lucide-svelte';
	import type { Achievement, AchievementGroup, Series, SeriesSummary, SeriesData, SelectedSeries } from '$types';
	import { AchievementDifficulty, MessageType } from '$types';
	import { languages } from '../store';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	// `data` also contains the same information as $page.data
	export let data;
	let achievementsData: Series[] = data.achievementsData ?? [];
	let seriesData: SeriesData = data.seriesData ?? {
		series: [],
		user_count: 0,
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
	let sortOrder: 'default' | 'ascending' | 'descending' = 'default';
	let selectedLanguageID = data.selectedLanguageID ?? 'en';
	let selectedLanguageName: string;
	let isScreenExpanded = true;
	let userInfoShown = true;
	let popUpMessageType = MessageType.NONE;

	// Lazy loading
	let filteredAchievements: AchievementGroup[];
	let shownAchievements: AchievementGroup[];
	const LOAD_COUNT = 20;
	let shownCount = LOAD_COUNT;
	let loadMoreElement: HTMLElement | null = null;
	let observer: { disconnect: () => void } | null = null;

	onMount(async () => {
		// Get languages from server and cache them
		if (get(languages).length === 0) {
			const response = await fetch(`${PUBLIC_SERVER_API_URL}/languages`);
			const languageData = await response.json();
			languages.set(languageData);
		}
		selectedLanguageName = $languages.find((lang) => lang.id === selectedLanguageID)?.name ?? 'English';
	});

	function loadFromLocalStorage() {
		// If user is not logged in, get the completed achievements from local storage
		const completedAchievements: number[] = JSON.parse(localStorage.getItem('completed_achievements') || '[]');
		achievementsData.forEach((series: Series) => {
			const seriesSummary = seriesData.series.find((s: SeriesSummary) => s.name === series.series);
			if (!seriesSummary) {
				return;
			}
			series.achievements.forEach((group: AchievementGroup) => {
				group.achievements.forEach((achievement: Achievement) => {
					if (completedAchievements.includes(achievement.id)) {
						achievement.completed = true;
						if (group.achievements.length > 1) {
							// If the achievement is part of a group
							group.completed_group_id = achievement.id;
						}
						seriesSummary.current_achievement_count++;
						seriesSummary.current_jade_count += achievement.jades;
						seriesData.current_achievement_count++;
						seriesData.current_jade_count += achievement.jades;
					}
				});
			});
		});
		// onMount is not refreshing the data for some reason, so we need to manually update the reactive variables
	}

	// Server/local storage
	async function storeServerData(achievement: Achievement) {
		try {
			const method = achievement.completed ? 'PUT' : 'DELETE';
			const response = await fetch(`${PUBLIC_SERVER_API_URL}/users/me/achievements/${achievement.id}`, { method });

			if (!response.ok) {
				popUpMessageType = MessageType.FAIL;
				throw new Error('Failed to update achievement');
			}
		} catch (error) {
			popUpMessageType = MessageType.FAIL;
			throw new Error('Failed to update achievement');
		}
	}

	function storeLocalData(achievement: Achievement, previouslyCompleted: boolean) {
		let completedAchievements: number[] = JSON.parse(localStorage.getItem('completed_achievements') || '[]');

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

		try {
			if (data.user) {
				await storeServerData(achievement);
			} else {
				storeLocalData(achievement, previouslyCompleted);
			}
		} catch (error) {
			console.error('Failed to update data:', error);

			// Rollback UI change
			achievement.completed = previouslyCompleted;
			updateAchievementAndJadeCount(achievement, previouslyCompleted);
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
				const completedAchievement = group.achievements.find((a) => a.id === group.completed_group_id);

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
		try {
			if (data.user) {
				await storeServerData(achievement);
			} else {
				storeLocalData(achievement, previouslyCompleted);
			}
		} catch (error) {
			// Rollback UI change on error
			if (previouslyCompleted) {
				achievement.completed = true;
			} else {
				achievement.completed = false;
				if (group.completed_group_id) {
					const completedAchievement = group.achievements.find((a) => a.id === group.completed_group_id);
					if (completedAchievement) {
						completedAchievement.completed = true;
					}
				}
				group.completed_group_id = previouslyCompleted ? achievement.id : undefined;
				updateAchievementAndJadeCount(achievement, previouslyCompleted);
			}
		}
		// Makes achievements reactive
		achievementsData = [...achievementsData];
	}

	function changeLanguage(language: string) {
		selectedSeries = 'Show All';
		goto(`/achievement-tracker?lang=${language}`, { noScroll: true });
	}

	function sortByPercent(achievementGroups: AchievementGroup[], sortOrder: 'default' | 'ascending' | 'descending') {
		if (sortOrder === 'default') {
			return achievementGroups;
		}

		return achievementGroups.sort((groupA, groupB) => {
			if (!groupA.achievements[0] || !groupB.achievements[0]) {
				return 0;
			}

			const totalPercentA = groupA.achievements.reduce((sum, achievement) => sum + achievement.percent, 0);
			const totalPercentB = groupB.achievements.reduce((sum, achievement) => sum + achievement.percent, 0);

			return sortOrder === 'ascending' ? totalPercentA - totalPercentB : totalPercentB - totalPercentA;
		});
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
							achievement.completed || achievementGroup.completed_group_id ? showCompleted : showIncomplete;
						const matchesQuery =
							!query ||
							achievement.name.toLowerCase().includes(lowercaseQuery) ||
							achievement.description.toLowerCase().includes(lowercaseQuery);
						const matchesDifficulty = difficulty === AchievementDifficulty.ALL || achievement.difficulty === difficulty;
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
		sortOrder = 'default';
	}

	$: {
		achievementsData = data.achievementsData ?? [];
		seriesData = data.seriesData ?? {
			series: [],
			user_count: 0,
			total_achievement_count: 0,
			current_achievement_count: 0,
			total_jade_count: 0,
			current_jade_count: 0
		};
		// If user is not logged in, get the completed achievements from local storage
		if (browser && !data.user) {
			loadFromLocalStorage();
		}
	}

	$: filteredAchievements = sortByPercent(
		flattenAchievements(
			combinedFilters(
				achievementsData,
				showCompleted,
				showIncomplete,
				selectedSeries,
				searchQuery,
				selectedDifficulty,
				showHidden
			)
		),
		sortOrder
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
	<title>Achievement Tracker - Honkai: Star Rail - StarDB.GG</title>
	<meta
		name="description"
		content="The best achievement tracker for Honkai: Star Rail, complete with guides, videos, cultural references and player stats."
	/>
</svelte:head>

<main
	class="flex w-full flex-col justify-center space-x-0 px-4 text-off_white sm:px-6 lg:px-24
    {isScreenExpanded ? 'xl:flex-row xl:space-x-6 xl:px-6' : 'xl:items-center'}"
>
	<!-- Column 1 -->
	<div
		class="w-full text-lg xl:text-xl
    {isScreenExpanded ? 'xl:w-[550px] xl:pt-28' : 'xl:w-[1100px]'}"
	>
		<h1 class="pb-3 pt-6 text-2xl font-bold md:text-3xl">Achievement Tracker</h1>
		<!-- Sticky top-16 + pt-6 = top-[88px]-->
		<div class={userInfoShown ? 'pb-4 sm:pb-6' : ''}>
			<UserInfo on:closedInfo={() => (userInfoShown = false)} user={data.user?.username} />
		</div>
		<div class="top-[88px] space-y-4 sm:space-y-6 xl:sticky">
			<SearchAchievementCard bind:searchQuery />
			<SeriesCard {seriesData} {resetLazyScroll} bind:selectedSeries />
			<StatisticsCard {seriesData} />
		</div>
	</div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col space-y-4 py-4 sm:space-y-6 sm:py-6 xl:w-[1100px]">
		<FilterCard
			bind:showCompleted
			bind:showIncomplete
			bind:showHidden
			bind:selectedDifficulty
			bind:sortOrder
			bind:selectedLanguageName
			filterLength={filteredAchievements.length}
			{changeLanguage}
		/>

		<div class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750 pt-3">
			<div class="flex items-center justify-between px-5 pb-3">
				<div class="flex items-center space-x-4">
					<Award class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
					<p class="text-xl font-bold lg:text-2xl">Achievements</p>
				</div>
				<div class="flex space-x-4">
					<button class="hover:scale-110" aria-label="Reset Achievement Filters" on:click={() => resetFilters()}>
						<RefreshCw class="h-5 w-5 text-off_white hover:animate-spin lg:h-6 lg:w-6" />
					</button>
					<button
						class="hidden hover:scale-110 xl:block"
						aria-label="Expand/Minimize Leaderboard"
						on:click={() => (isScreenExpanded = !isScreenExpanded)}
					>
						{#if isScreenExpanded}
							<Minimize2 class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
						{:else}
							<Maximize2 class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
						{/if}
					</button>
				</div>
			</div>

			<div class="flex justify-between px-8 pb-2 text-sm font-bold md:px-12">
				<p>Name</p>
				<p>% Players Obtained</p>
			</div>
			<div class="space-y-2 px-3 pb-3 md:space-y-3 md:px-6 md:pb-6">
				{#if filteredAchievements.length === 0}
					<p class="py-4 text-center text-4xl font-bold">(◕︿◕✿)</p>
				{/if}
				{#each shownAchievements as achievementGroup (achievementGroup.achievements[0]?.id)}
					<div in:fly={{ y: 40, duration: 400, easing: cubicInOut }}>
						{#if achievementGroup.achievements.length === 1 && achievementGroup.achievements[0]}
							<SingleAchievement achievement={achievementGroup.achievements[0]} {handleSingleToggleCompletion} />
						{:else}
							<GroupAchievement {achievementGroup} {handleGroupToggleCompletion} />
						{/if}
					</div>
				{/each}
				{#if shownCount < filteredAchievements.length}
					<div bind:this={loadMoreElement} class="flex items-center justify-center">
						<Loader2 class="h-7 w-7 animate-spin text-galaxy_purple-600" />
					</div>
				{/if}
			</div>
		</div>
	</div>
</main>

<div
	class="fixed bottom-16 right-8 z-[3] rounded-xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 hover:scale-105 hover:bg-galaxy_purple-450"
>
	<button
		class="flex h-12 w-12 items-center justify-center rounded-lg md:h-14 md:w-14"
		aria-label="Scroll to Top"
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
	>
		<ArrowUp class="h-7 w-7 text-off_white md:h-9 md:w-9" />
	</button>
</div>

<PopUpMessage
	bind:messageType={popUpMessageType}
	messageContent={'Server did not respond, please try again later'}
/>
