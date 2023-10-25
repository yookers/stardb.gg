<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		window['nitroAds'].createAd('stardb-banner', {
			refreshLimit: 20,
			refreshTime: 30,
			format: 'anchor',
			anchor: 'bottom',
			anchorPersistClose: false,
			report: {
				enabled: true,
				icon: true,
				wording: 'Report Ad',
				position: 'top-right'
			},
			mediaQuery: '(min-width: 1025px), (min-width: 320px) and (max-width: 767px)'
		});
	});
</script>

<div class="stardb-banner"></div>
