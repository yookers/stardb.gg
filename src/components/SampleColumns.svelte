<script lang="ts">
	let isScreenExpanded = true;
</script>

<main
	class="flex w-full flex-col justify-center space-x-0 space-y-3 px-2 text-off_white sm:space-y-4 sm:px-6 lg:px-20
{isScreenExpanded ? 'xl:flex-row xl:space-x-4 xl:space-y-6 xl:px-6' : 'xl:items-center xl:space-y-4'}"
>
	<!-- Column 1 -->
	<div
		class="w-full text-lg xl:text-xl
    {isScreenExpanded ? 'xl:w-side xl:pt-28' : 'xl:w-main'}"
	>
		<h1 class="pb-2 pl-2 pt-4 text-xl font-bold sm:pb-3 md:text-3xl">Title</h1>
	</div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col space-y-3 pb-4 sm:space-y-4 sm:pb-6 xl:w-main">
		<div class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750">
			<div class="flex items-center justify-between px-5 py-2 sm:py-3"></div>
		</div>
	</div>
</main>
