<script lang="ts">
	let isScreenExpanded = false;
</script>

<main
	class="flex w-full flex-col justify-center space-x-0 px-4 text-off_white sm:px-6 lg:px-24
    {isScreenExpanded ? 'xl:flex-row xl:space-x-6 xl:px-6' : 'xl:items-center'}"
>
	<!-- Column 1 -->
	<div
		class="w-full text-lg xl:text-xl
    {isScreenExpanded ? 'xl:w-[550px] xl:pt-28' : 'xl:w-[1100px]'}"
	></div>

	<!-- Column 2 -->
	<div class="flex w-full flex-col space-y-4 py-4 sm:space-y-6 sm:py-6 xl:w-[1100px]">
		<div class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750">
			<div class="flex items-center justify-between px-5 py-2 sm:py-3"></div>
		</div>
	</div>
</main>
