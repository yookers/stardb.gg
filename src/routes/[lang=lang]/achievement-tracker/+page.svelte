<script lang="ts">
	const PUBLIC_SERVER_API_URL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	import { PUBLIC_CDN_RES_API_URL } from '$env/static/public';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import UserInfo from './UserInfo.svelte';
	// import SearchAchievementCard from './SearchAchievementCard.svelte';
	import SeriesCard from './SeriesCard.svelte';
	import StatisticsCard from './StatisticsCard.svelte';
	import FilterCard from './FilterCard.svelte';
	import SingleAchievement from './SingleAchievement.svelte';
	import GroupAchievement from './GroupAchievement.svelte';
	import PopUpMessage from '$components/PopUpMessage.svelte';
	import MiniSearchAchievements from './MiniSearchAchievements.svelte';
	import NitroBanner from '$components/NitroBanner.svelte';
	import { lazyScroll } from './LazyScroll';
	import { Award, Minimize2, Maximize2, ArrowUp, Loader2, RefreshCw } from 'lucide-svelte';
	import { AchievementDifficulty, MessageType } from '$types';
	import { browser } from '$app/environment';
	import type { TrackerAchievement, AchievementGroup, Series, SeriesSummary, SeriesData, SelectedSeries } from '$types';

	// `data` also contains the same information as $page.data
	export let data;
	let achievementsData = data.achievementsData as Series[];
	let seriesData = data.seriesData as SeriesData;
	let selectedSeries: SelectedSeries = 'Show All';
	let showCompleted = true;
	let showIncomplete = true;
	let showHidden = true;
	let selectedDifficulty = AchievementDifficulty.ALL;
	let searchQuery = '';
	let sortOrder: 'default' | 'ascending' | 'descending' = 'default';
	let selectedVersions = new Set<string>();
	let isScreenExpanded = true;
	let userInfoShown = true;
	let popUpMessageType = MessageType.NONE;

	onMount(() => {
		showCompleted = JSON.parse(localStorage.getItem('showCompleted') || 'true');
		showIncomplete = JSON.parse(localStorage.getItem('showIncomplete') || 'true');
		selectedSeries = JSON.parse(localStorage.getItem('selectedSeries') || '"Show All"');
		selectedVersions = new Set(JSON.parse(localStorage.getItem('selectedVersions') || '[]'));
		selectedDifficulty = JSON.parse(localStorage.getItem('selectedDifficulty') || '"all"');
		showHidden = JSON.parse(localStorage.getItem('showHidden') || 'true');
		sortOrder = JSON.parse(localStorage.getItem('sortOrder') || '"default"');
	});

	// Lazy loading
	let filteredAchievements: AchievementGroup[];
	let shownAchievements: AchievementGroup[];
	const LOAD_COUNT = 20;
	let shownCount = LOAD_COUNT;
	let loadMoreElement: HTMLElement | null = null;
	let observer: { disconnect: () => void } | null = null;

	function loadFromLocalStorage() {
		// If user is not logged in, get the completed achievements from local storage
		const completedAchievements: number[] = JSON.parse(localStorage.getItem('completed_achievements') || '[]');
		achievementsData.forEach((series: Series) => {
			const seriesSummary = seriesData.series.find((s: SeriesSummary) => s.name === series.series);
			if (!seriesSummary) {
				return;
			}
			series.achievement_groups.forEach((group: AchievementGroup) => {
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
			const response = await fetch(`${PUBLIC_SERVER_API_URL}/users/me/achievements/completed/${achievement.id}`, { method });

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
		versions: Set<string>,
		query: string,
		difficulty: AchievementDifficulty,
		showHidden: boolean
	): Series[] {
		const lowercaseQuery = query.toLowerCase();
		return achievements
			.filter((item) => series === 'Show All' || item.series === series.name)
			.map((item) => ({
				achievements: item.achievement_groups.filter((achievementGroup) =>
					achievementGroup.achievements.some((achievement) => {
						const matchesCompletion =
							achievement.completed || achievementGroup.completed_group_id ? showCompleted : showIncomplete;
						const matchesVersion = versions.size === 0 || versions.has(achievement.version || '');
						const matchesQuery =
							!query ||
							achievement.name.toLowerCase().includes(lowercaseQuery) ||
							achievement.description.toLowerCase().includes(lowercaseQuery);
						const matchesDifficulty = difficulty === AchievementDifficulty.ALL || achievement.difficulty === difficulty;
						const matchesHidden = showHidden || !achievement.hidden;
						return matchesCompletion && matchesVersion && matchesQuery && matchesDifficulty && matchesHidden;
					})
				),
				...item
			}));
	}

	function resetFilters() {
		showCompleted = true;
		showIncomplete = true;
		showHidden = true;
		selectedDifficulty = AchievementDifficulty.ALL;
		selectedVersions.clear();
		selectedVersions = selectedVersions;
		searchQuery = '';
		sortOrder = 'default';

		localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
		localStorage.setItem('showIncomplete', JSON.stringify(showIncomplete));
		localStorage.setItem('showHidden', JSON.stringify(showHidden));
		localStorage.setItem('selectedDifficulty', JSON.stringify(selectedDifficulty));
		localStorage.setItem('selectedVersions', JSON.stringify(Array.from(selectedVersions)));
		localStorage.setItem('sortOrder', JSON.stringify(sortOrder));
	}

	$: {
		achievementsData = data.achievementsData as Series[];
		seriesData = data.seriesData as SeriesData;
	}

	// Had to separate this from the above $: block because it was getting run twice
	$: {
		// If user is not logged in, get the completed achievements from local storage
		if (browser && !data.user) {
			loadFromLocalStorage();
		}
	}

	$: {
		// Hacky way to prevent filteredAchievements from running when coming back from a snapshot (ie. user comes back from the database)
		// TODO: Replace with pagination in the future
		filteredAchievements = sortByPercent(
			flattenAchievements(
				combinedFilters(
					achievementsData,
					showCompleted,
					showIncomplete,
					selectedSeries,
					selectedVersions,
					searchQuery,
					selectedDifficulty,
					showHidden
				)
			),
			sortOrder
		);
		shownAchievements = filteredAchievements.slice(0, shownCount);
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
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stardb.gg/achievement-tracker" />
	<meta property="og:title" content="Achievement Tracker - Honkai: Star Rail - StarDB.GG" />
	<meta
		property="og:description"
		content="The best achievement tracker for Honkai: Star Rail, complete with guides, videos, cultural references and player stats."
	/>
	<meta property="og:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://stardb.gg/achievement-tracker" />
	<meta name="twitter:title" content="Achievement Tracker - Honkai: Star Rail - StarDB.GG" />
	<meta
		name="twitter:description"
		content="The best achievement tracker for Honkai: Star Rail, complete with guides, videos, cultural references and player stats."
	/>
	<meta name="twitter:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />

	<link rel="canonical" href="https://stardb.gg/achievement-tracker" />
</svelte:head>

<main
	class="flex w-full flex-col justify-center space-x-0 space-y-3 px-2 text-off_white sm:space-y-4 sm:px-6 lg:px-20
    {isScreenExpanded ? 'xl:flex-row xl:space-x-4 xl:space-y-6 xl:px-6' : 'xl:items-center xl:space-y-4'}"
>
	<!-- Column 1 -->
	<div
		class="w-full text-lg xl:text-xl
    {isScreenExpanded ? 'xl:w-side xl:pt-28' : 'xl:w-main'}"
	>
		<h1
			class="pb-2 pl-2 pt-4 text-xl font-bold sm:pb-3 md:text-3xl"
			in:fly={{ y: 20, duration: 300, delay: 150, easing: cubicInOut }}
		>
			Achievement Tracker
		</h1>
		<h2 class="pb-2 pl-2 text-xs sm:pb-3 md:text-sm" in:fly={{ y: 20, duration: 300, delay: 250, easing: cubicInOut }}>
			Use the best achievement tracker for Honkai: Star Rail at <span class="font-bold">StarDB.GG</span>. Complete with guides,
			videos, cultural references and player stats.
		</h2>
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
	<div class="flex w-full flex-col space-y-3 pb-[50vh] sm:space-y-4 xl:w-main">
		<FilterCard
			bind:showCompleted
			bind:showIncomplete
			bind:showHidden
			bind:selectedDifficulty
			bind:sortOrder
			bind:selectedVersions
			versionList={seriesData.versions}
			filterLength={filteredAchievements.length}
		/>
		<MiniSearchAchievements bind:searchQuery />

		<NitroBanner />

		<!-- Achievement tracker -->
		<div
			class="rounded-xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750 transition-all duration-300 hover:border-galaxy_purple-650"
		>
			<div class="flex flex-wrap items-center justify-between gap-y-2 px-5 py-2 sm:py-3">
				<div class="flex items-center space-x-4 pr-2">
					<Award class="h-5 w-5 text-off_white" />
					<p class="text-xl font-bold">Achievements</p>
				</div>
				<div class="flex space-x-4">
					<button class="hover:scale-110" aria-label="Reset achievement filters" on:click={() => resetFilters()}>
						<RefreshCw class="h-5 w-5 text-off_white hover:animate-spin" />
					</button>
					<button
						class="hidden hover:scale-110 xl:block"
						aria-label="{isScreenExpanded ? 'Minimize' : 'Expand'} leaderboard"
						on:click={() => (isScreenExpanded = !isScreenExpanded)}
					>
						{#if isScreenExpanded}
							<Minimize2 class="h-5 w-5 text-off_white" />
						{:else}
							<Maximize2 class="h-5 w-5 text-off_white" />
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
					<img class="h-3 w-3" src={`${PUBLIC_CDN_RES_API_URL}/img/jade-currency-small.webp`} alt="Jade Icon" />
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
