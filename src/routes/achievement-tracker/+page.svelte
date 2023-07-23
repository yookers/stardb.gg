<script>
	import { fade, fly } from 'svelte/transition';
	import { slide } from 'svelte/transition';
	import Achievement from './Achievement.svelte';
	import { cubicInOut } from 'svelte/easing';

	// `data` also contains the same information as $page.data
	export let data;
	let achievements = data.achievementsData;
	let selectedSeries = achievements[0].name; // "I , Trailblazer"
	let showCompleted = false;
	let showIncomplete = true;

	const toggleCompletion = (achievement, group) => {
		// Update the completion status
		achievement.completed = !achievement.completed;

		// If marked as completed, mark all related achievements as completed
		if (achievement.completed) {
			group.forEach((a) => (a.completed = true));
		}

		achievements = [...achievements];
	};

    function nextPage() {
        if (currentPage < maxPage) {
            currentPage++;
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

	let pageSize = 10;
	let currentPage = 1;
    let maxPage;
	let pagedAchievements;
	$: {
		let start = (currentPage - 1) * pageSize;
		let end = start + pageSize;
		pagedAchievements = filteredAchievements.slice(start, end);
	}

	let filteredAchievements;
	$: {
		filteredAchievements = achievements
			.find((category) => category.name === selectedSeries)
			.achievements.filter((group) =>
				group.some(
					(achievement) =>
						(achievement.completed && showCompleted) || (!achievement.completed && showIncomplete)
				)
			);
        maxPage = Math.ceil(filteredAchievements.length / pageSize);
	}

    $: if (selectedSeries) {
        currentPage = 1; // Reset page number when changing series
    }
</script>

<svelte:head>
	<title>Achievement Tracker - StarDB.gg</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div
	class="flex w-full flex-col justify-center space-x-0 px-6 text-off_white lg:flex-row lg:space-x-6"
>
	<!-- Column 1 -->
	<div class="w-full text-lg lg:w-[540px] lg:pt-36 lg:text-xl">
		<div class="text-xl font-bold text-off_white">
			{#if data.user}
				<p>Logged in as {data.user.username}</p>
			{:else}
				<p>Not logged in</p>
			{/if}
		</div>

		<label for="seriesFilter" class="mb-2 block text-sm font-bold text-galaxy_purple-700"
			>Filter by series:</label
		>
		<select bind:value={selectedSeries} class="text-galaxy_purple-700">
			{#each achievements as category}
				<option value={category.name}>{category.name}</option>
			{/each}
		</select>

		<label>
			<input type="checkbox" bind:checked={showCompleted} /> Show completed achievements
		</label>

		<label>
			<input type="checkbox" bind:checked={showIncomplete} /> Show incomplete achievements
		</label>
	</div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col justify-center space-y-6 py-6 lg:w-[1100px] lg:justify-start">
		<button on:click={prevPage}>Previous</button>
		<button on:click={nextPage}>Next</button>
		{#each pagedAchievements as group (group[0].id)}
			<div out:slide={{ easing: cubicInOut, duration: 400 }}>
				<Achievement achievements={group} onToggle={toggleCompletion} />
			</div>
		{/each}
	</div>
</div>
