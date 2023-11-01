<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		window['nitroAds'].createAd('stardb-video-float', {
			refreshLimit: 0,
			refreshTime: 30,
			format: 'floating',
			report: {
				enabled: true,
				icon: true,
				wording: 'Report Ad',
				position: 'bottom-right-side'
			},
		});
	});
</script>
