<script>
	export let achievements;
	export let onToggle;

	const toggleCompletion = (achievement) => {
		onToggle(achievement, achievements);
	};
</script>

{#each achievements as achievement (achievement.id)}
	<div class="flex flex-col space-y-2">
		<p>{achievement.title}</p>
		<p>{achievement.description}</p>
		{#if achievement.completed}
			<p>Completed!</p>
		{/if}
		<button class="bg-galaxy_purple-600" on:click={() => toggleCompletion(achievement)}>
			Mark as {achievement.completed ? 'incomplete' : 'completed'}
		</button>
	</div>
{/each}
