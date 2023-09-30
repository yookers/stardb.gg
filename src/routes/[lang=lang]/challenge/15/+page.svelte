<script lang="ts">
	import CellGrid from './CellGrid.svelte';

	let clues = Array(11).fill(false);

	function toggleClueComplete(index: number) {
		clues[index] = !clues[index];
	}
</script>

<div class="flex flex-col space-y-6 p-10 md:items-center">
	<h1 class="text-3xl font-bold text-off_white">Challenge #15</h1>

	<div class="grid grid-cols-[250px_repeat(3,200px)] grid-rows-[250px_repeat(3,200px)] gap-1">
		<div class="col-span-1 row-span-1"></div>
		<div class="relative col-span-1 row-span-1 bg-galaxy_purple-200">
			<p class="absolute flex w-full justify-center bg-galaxy_purple-700 py-1 text-lg font-bold text-off_white">Patroller</p>
			<div class="grid h-full grid-cols-5 divide-x font-medium">
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Asta</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Bronya</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Lynx</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Luocha</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Fu Xuan</p>
			</div>
		</div>

		<div class="relative col-span-1 row-span-1 bg-galaxy_purple-200">
			<p class="absolute flex w-full justify-center bg-galaxy_purple-700 py-1 text-lg font-bold text-off_white">Encounter</p>
			<div class="grid h-full grid-cols-5 divide-x font-medium">
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Voidranger: Eliminator</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Voidranger: Trampler</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Incineration Shadewalker</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Decaying Shadow</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Auromaton Direwolf</p>
			</div>
		</div>

		<div class="relative col-span-1 row-span-1 bg-galaxy_purple-200">
			<p class="absolute flex w-full justify-center bg-galaxy_purple-700 py-1 text-lg font-bold text-off_white">Location</p>
			<div class="grid h-full grid-cols-5 divide-x font-medium">
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Herta's Office</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Outlying Snow Plains</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Vagrant Shelter</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Svarog's Base</p>
				<p class="flex flex-col items-end justify-center pb-2" style="writing-mode: vertical-lr">Orphanage</p>
			</div>
		</div>

		<div class="col-span-1 row-span-1 bg-galaxy_purple-200">
			<div class="flex h-full">
				<p
					class="flex justify-center bg-galaxy_purple-700 px-1 text-lg font-bold text-off_white"
					style="writing-mode: vertical-lr"
				>
					Time of Day
				</p>
				<div class="grid w-full grid-rows-5 divide-y font-medium">
					<p class="flex items-center pl-2">Morning</p>
					<p class="flex items-center pl-2">Sunrise</p>
					<p class="flex items-center pl-2">Afternoon</p>
					<p class="flex items-center pl-2">Twilight</p>
					<p class="flex items-center pl-2">Night</p>
				</div>
			</div>
		</div>

		<div class="col-span-1 row-span-1">
			<CellGrid />
		</div>
		<div class="col-span-1 row-span-1">
			<CellGrid />
		</div>
		<div class="col-span-1 row-span-1">
			<CellGrid />
		</div>

		<div class="col-span-1 row-span-1 bg-galaxy_purple-200">
			<div class="flex h-full">
				<p
					class="flex justify-center bg-galaxy_purple-700 px-1 text-lg font-bold text-off_white"
					style="writing-mode: vertical-lr"
				>
					Location
				</p>
				<div class="grid w-full grid-rows-5 divide-y font-medium">
					<p class="flex items-center pl-2">Herta's Office</p>
					<p class="flex items-center pl-2">Outlying Snow Plains</p>
					<p class="flex items-center pl-2">Vagrant Shelter</p>
					<p class="flex items-center pl-2">Svarog's Base</p>
					<p class="flex items-center pl-2">Orphanage</p>
				</div>
			</div>
		</div>

		<div class="col-span-1 row-span-1">
			<CellGrid />
		</div>
		<div class="col-span-1 row-span-1">
			<CellGrid />
		</div>

		<div class="col-span-1 row-span-1"></div>

		<div class="col-span-1 row-span-1 bg-galaxy_purple-200">
			<div class="flex h-full">
				<p
					class="flex justify-center bg-galaxy_purple-700 px-1 text-lg font-bold text-off_white"
					style="writing-mode: vertical-lr"
				>
					Encounter
				</p>
				<div class="grid w-full grid-rows-5 divide-y font-medium">
					<p class="flex items-center pl-2">Voidranger: Eliminator</p>
					<p class="flex items-center pl-2">Voidranger: Trampler</p>
					<p class="flex items-center pl-2">Incineration Shadewalker</p>
					<p class="flex items-center pl-2">Decaying Shadow</p>
					<p class="flex items-center pl-2">Automaton Direwolf</p>
				</div>
			</div>
		</div>

		<div class="col-span-1 row-span-1">
			<CellGrid />
		</div>
	</div>

	<div class="flex w-side flex-col space-y-4 text-off_white">
		<p class="text-xl font-semibold text-off_white">Clues:</p>
		{#each ["The 5 people were the person patrolling Svarog's Base, the Afternoon patroller, the one who eliminated the Incineration Shadewalker, Fu Xuan, and the one who patrolled the Vagrant Shelter.", 'The Decaying Shadow was eliminated before the Voidranger: Trampler.', 'The Decaying Shadow was not found in the Vagrant Shelter.', "The Decaying Shadow was eliminated before Lynx's patrol.", "Of Fu Xuan and Herta's Office patroller, one patrolled at Night, and the other encountered an Automaton Direwolf.", 'The one who Patrolled Outlying Snow Plains was Fu Xuan.', 'Asta patrolled after Luocha.', 'The Voidranger: Trampler was not eliminated by Lynx.', "Svarog's Base was not patrolled by Luocha.", 'Either the Morning patroller or the Night patroller patrolled the Orphanage.', 'The Automaton Direwolf was eliminated by Asta.'] as section, index}
			<div class="mb-2 flex items-start">
				<button
					class="mr-3 mt-1.5 h-6 w-6 shrink-0 border-2 border-galaxy_purple-200 {clues[index] ? 'bg-galaxy_purple-200' : ''}"
					on:click={() => toggleClueComplete(index)}
				></button>
				<p>{section}</p>
			</div>
		{/each}
	</div>
</div>
