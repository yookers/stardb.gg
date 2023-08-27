<script lang="ts">
	const PUBLIC_SERVER_API_URL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	import { PUBLIC_RES_API_URL } from '$env/static/public';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { afterUpdate, onMount } from 'svelte';
	import UserInfo from './UserInfo.svelte';
	// import SearchAchievementCard from './SearchAchievementCard.svelte';
	import SeriesCard from './SeriesCard.svelte';
	import StatisticsCard from './StatisticsCard.svelte';
	import FilterCard from './FilterCard.svelte';
	import SingleAchievement from './SingleAchievement.svelte';
	import GroupAchievement from './GroupAchievement.svelte';
	import PopUpMessage from '$components/PopUpMessage.svelte';
	import MiniSearchAchievements from './MiniSearchAchievements.svelte';
	import { lazyScroll } from './LazyScroll';
	import { Award, Minimize2, Maximize2, ArrowUp, Loader2, RefreshCw } from 'lucide-svelte';
	import { AchievementDifficulty, MessageType } from '$types';
	import { languages } from '../store';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { TrackerAchievement, AchievementGroup, Series, SeriesSummary, SeriesData, SelectedSeries } from '$types';

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

	let snapshotScroll: number;
	let isSnapshot = false;

	onMount(async () => {
		// Get languages from server and cache them
		if (get(languages).length === 0) {
			const response = await fetch(`${PUBLIC_SERVER_API_URL}/languages`);
			const languageData = await response.json();
			languages.set(languageData);
		}
		selectedLanguageName = $languages.find((lang) => lang.id === selectedLanguageID)?.name ?? 'English';
	});

	// Keep a snapshot when user navigates back from the achievements database
	export const snapshot = {
		capture: () => [
			selectedSeries,
			showCompleted,
			showIncomplete,
			showHidden,
			selectedDifficulty,
			searchQuery,
			sortOrder,
			shownCount,
			window.scrollY
		],
		restore: (value) => {
			selectedSeries = value[0];
			showCompleted = value[1];
			showIncomplete = value[2];
			showHidden = value[3];
			selectedDifficulty = value[4];
			searchQuery = value[5];
			sortOrder = value[6];
			shownCount = value[7];
			snapshotScroll = value[8];
		}
	};

	afterUpdate(() => {
		if (snapshotScroll) {
			isSnapshot = true;
			window.scrollTo(0, snapshotScroll);
			snapshotScroll = 0;
		}
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
				group.achievements.forEach((achievement: TrackerAchievement) => {
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
	async function storeServerData(achievement: TrackerAchievement) {
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

	function storeLocalData(achievement: TrackerAchievement, action: 'ADD' | 'REMOVE' = 'ADD') {
		let completedAchievements: number[] = JSON.parse(localStorage.getItem('completed_achievements') || '[]');

		if (achievement.completed) {
			completedAchievements.push(achievement.id);
		} else if (action === 'REMOVE') {
			completedAchievements = completedAchievements.filter((id) => id !== achievement.id);
		}

		localStorage.setItem('completed_achievements', JSON.stringify(completedAchievements));
	}

	function updateAchievementAndJadeCount(achievement: TrackerAchievement, increment: boolean) {
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
		// Makes achievements reactive, optimistic UI update
		achievementsData = [...achievementsData];
	}

	async function handleSingleToggleCompletion(achievement: TrackerAchievement) {
		const previouslyCompleted = achievement.completed ?? true;
		achievement.completed = !achievement.completed;
		updateAchievementAndJadeCount(achievement, !previouslyCompleted);

		try {
			if (data.user) {
				await storeServerData(achievement);
			} else {
				storeLocalData(achievement, previouslyCompleted ? 'REMOVE' : 'ADD');
			}
		} catch (error) {
			// Rollback UI change on error
			achievement.completed = previouslyCompleted;
			updateAchievementAndJadeCount(achievement, previouslyCompleted);
		}
	}

	// updateAchievementAndJadeCount automatically updates the achievementsData
	async function handleGroupToggleCompletion(group: AchievementGroup, achievement: TrackerAchievement) {
		let previouslyCompleted = achievement.completed ?? true;
		const previouslyCompletedGroupID = group.completed_group_id;
		// If the clicked achievement is already completed
		if (achievement.completed) {
			achievement.completed = false;
			group.completed_group_id = undefined;
			updateAchievementAndJadeCount(achievement, false);

			try {
				if (data.user) {
					await storeServerData(achievement);
				} else {
					storeLocalData(achievement, 'REMOVE');
				}
			} catch (error) {
				// Rollback UI change on error
				achievement.completed = true;
				group.completed_group_id = previouslyCompletedGroupID;
				updateAchievementAndJadeCount(achievement, true);
			}
		} else {
			// Set the clicked achievement to completed
			achievement.completed = true;
			group.completed_group_id = achievement.id;

			// If there is a completed achievement in the group, set it to incomplete
			const previouslyCompletedAchievement = group.achievements.find((a) => a.id === previouslyCompletedGroupID);
			if (previouslyCompletedAchievement) {
				previouslyCompletedAchievement.completed = false;
				storeLocalData(previouslyCompletedAchievement, 'REMOVE');
			}

			// Only update the counts if there was no previously completed achievement
			if (!previouslyCompletedGroupID) {
				updateAchievementAndJadeCount(achievement, true);
			} else {
				// Makes achievements reactive, optimistic UI update
				achievementsData = [...achievementsData];
			}

			try {
				if (data.user) {
					await storeServerData(achievement);
				} else {
					storeLocalData(achievement, 'ADD');
				}
			} catch (error) {
				// Rollback UI change on error
				achievement.completed = previouslyCompleted;
				if (previouslyCompletedAchievement) {
					previouslyCompletedAchievement.completed = true;
					group.completed_group_id = previouslyCompletedGroupID;
					// Makes achievements reactive, optimistic UI update
					achievementsData = [...achievementsData];
				} else {
					group.completed_group_id = undefined;
					updateAchievementAndJadeCount(achievement, previouslyCompleted);
				}
			}
		}
	}

	function changeLanguage(language: string) {
		selectedSeries = 'Show All';
		goto(`/achievement-tracker?lang=${language}`, { noScroll: true, replaceState: true });
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

	$: {
		// Hacky way to prevent filteredAchievements from running when coming back from a snapshot (ie. user comes back from the database)
		// TODO: Replace with pagination in the future
		if (!isSnapshot) {
			filteredAchievements = sortByPercent(
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
			shownAchievements = filteredAchievements.slice(0, shownCount);
		}
		isSnapshot = false;
	}

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
	<link rel="canonical" href="https://stardb.gg/achievement-tracker" />
</svelte:head>

<main
	class="flex w-full flex-col justify-center space-x-0 space-y-3 px-2 text-off_white sm:space-y-4 sm:px-6 lg:px-24
    {isScreenExpanded ? 'xl:flex-row xl:space-x-4 xl:space-y-6 xl:px-6' : 'xl:items-center xl:space-y-4'}"
>
	<!-- Column 1 -->
	<div
		class="w-full text-lg xl:text-xl
    {isScreenExpanded ? 'xl:w-side xl:pt-28' : 'xl:w-main'}"
	>
		<h1 class="pb-2 pl-2 pt-4 text-xl font-bold sm:pb-3 md:text-3xl">Achievement Tracker</h1>
		<!-- Sticky top-16 + pt-4 = top-20 -->
		<div class={userInfoShown ? 'pb-3 sm:pb-4' : ''}>
			<UserInfo on:closedInfo={() => (userInfoShown = false)} user={data.user?.username} />
		</div>
		<div class="top-20 space-y-3 sm:space-y-4 xl:sticky">
			<!-- <SearchAchievementCard bind:searchQuery /> -->
			<SeriesCard {seriesData} {resetLazyScroll} bind:selectedSeries />
			<StatisticsCard {seriesData} />
		</div>
	</div>

	<!-- Column 2 -->
	<div class="xl:w-main flex w-full flex-col space-y-3 pb-4 sm:space-y-4 sm:pb-6">
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
		<MiniSearchAchievements bind:searchQuery />

		<div class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750">
			<div class="flex flex-wrap items-center justify-between gap-y-2 px-5 py-2 sm:py-3">
				<div class="flex items-center space-x-4 pr-2">
					<Award class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
					<p class="text-xl font-bold lg:text-2xl">Achievements</p>
				</div>
				<div class="flex space-x-4">
					<button class="hover:scale-110" aria-label="Reset achievement filters" on:click={() => resetFilters()}>
						<RefreshCw class="h-5 w-5 text-off_white hover:animate-spin lg:h-6 lg:w-6" />
					</button>
					<button
						class="hidden hover:scale-110 xl:block"
						aria-label="{isScreenExpanded ? 'Minimize' : 'Expand'} leaderboard"
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
			<div
				class="sticky top-16 z-[2] flex justify-between bg-galaxy_purple-750 px-8 pb-1 pt-0.5 text-sm font-bold sm:hidden md:px-12"
			>
				<div class="flex items-center space-x-1">
					<p class="">
						{seriesData.current_achievement_count} <span class="font-medium">/ {seriesData.total_achievement_count}</span>
					</p>
					<Award class="h-3 w-3" />
				</div>
				<div class="flex items-center space-x-1">
					<p>{seriesData.current_jade_count} <span class="font-medium">/ {seriesData.total_jade_count}</span></p>
					<img class="h-3 w-3" src={`${PUBLIC_RES_API_URL}/img/jade-currency-small.webp`} alt="Jade Icon" />
				</div>
			</div>
			<div class="flex justify-between px-8 pb-2 text-sm font-bold md:px-12">
				<p>Name</p>
				<p>% Players Obtained</p>
			</div>
			<div class="space-y-1.5 px-2 pb-3 sm:px-3 md:space-y-3 md:px-6 md:pb-6">
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
	class="fixed bottom-16 right-8 z-[3] rounded-xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 hover:bg-galaxy_purple-450"
>
	<button
		class="flex h-12 w-12 items-center justify-center rounded-lg md:h-14 md:w-14"
		aria-label="Scroll to top"
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
	>
		<ArrowUp class="h-7 w-7 text-off_white md:h-9 md:w-9" />
	</button>
</div>

<PopUpMessage bind:messageType={popUpMessageType} messageContent={'Server did not respond, please try again later'} />
