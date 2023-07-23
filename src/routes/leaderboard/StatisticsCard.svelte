<script>
    import { flip } from "svelte/animate";
    import { cubicInOut } from "svelte/easing";

	export let carouselData;

	// Statistics carousel
	let index = 0;

	function next() {
		if (index < carouselData.length - 1) index++;
		else index = 0;
	}

	function prev() {
		if (index > 0) index--;
		else index = carouselData.length - 1;
	}
</script>

<div class="flex items-center justify-center">
	<button class="rounded" on:click={prev}> Previous </button>
	<div class="mb-4">
		<p class="text-base text-gray-700">
			Player count: {carouselData[index].count}
		</p>
	</div>
	<button class="" on:click={next}> Next </button>
</div>
