<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		if (window['nitroAds']) {
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
				//demo: true
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
				//demo: true
			});
		}
	});
</script>

<div id="stardb-banner" class="hidden px-2 py-2 md:block"></div>

<div id="stardb-mobile-banner" class="px-2 py-2 md:hidden"></div>
