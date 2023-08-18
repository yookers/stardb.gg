<script lang="ts">
	let isScreenExpanded = false;
</script>

<main
	class="flex w-full flex-col justify-center space-x-0 px-4 text-off_white sm:px-6 lg:px-24
    {isScreenExpanded ? 'xl:flex-row xl:space-x-6 xl:px-6' : 'xl:items-center'}"
>
	<!-- Column 1 -->
	<div
		class="w-full pt-4 text-lg sm:pt-6 xl:text-xl
    {isScreenExpanded ? 'xl:w-side xl:pt-28' : 'xl:w-main'}"
	></div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col space-y-4 py-4 sm:space-y-6 sm:py-6 xl:w-main">
		<div class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750">
			<div class="flex items-center justify-between px-5 py-2 sm:py-3"></div>
		</div>
	</div>
</main>
