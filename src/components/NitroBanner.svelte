<script lang="ts">
	import { onMount } from 'svelte';
	let adLoaded = false;

	onMount(() => {
		window['nitroAds'].createAd('stardb-banner', {
			refreshLimit: 20,
			refreshTime: 30,
			renderVisibleOnly: false,
			refreshVisibleOnly: true,
			sizes: [['728', '90']],
			report: {
				enabled: true,
				icon: true,
				wording: 'Report Ad',
				position: 'top-right'
			}
		});

		window['nitroAds'].createAd('stardb-mobile-banner', {
			refreshLimit: 20,
			refreshTime: 30,
			renderVisibleOnly: false,
			refreshVisibleOnly: true,
			sizes: [
				['320', '50'],
				['300', '50']
			],
			report: {
				enabled: true,
				icon: true,
				wording: 'Report Ad',
				position: 'top-right'
			}
		});

		if (window['nitroAds'].queue.length === 0) {
			adLoaded = true;
		}
	});
</script>

{#if adLoaded}
	<div id="stardb-banner" class="hidden md:block"></div>

	<div id="stardb-mobile-banner" class="md:hidden"></div>
{/if}
