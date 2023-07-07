<script>
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import './app.css';
	import { isSidebarExpanded, mobileSidebarToggle } from './store.js';

	import { onMount } from 'svelte';
	import { partytownSnippet } from '@builder.io/partytown/integration';

	// Add the Partytown script to the DOM head
	let scriptEl;
	onMount(() => {
		if (scriptEl) {
			scriptEl.textContent = partytownSnippet();
		}
	});
</script>

<svelte:head>
	<script>
		// Config options
		// Forward the necessary functions to the web worker layer
		partytown = {
			forward: ['dataLayer.push'],
			resolveUrl: (url) => {
				const siteUrl = 'https://stardb.gg/gtm.js?';
				if (url.hostname === 'www.googletagmanager.com') {
					const proxyUrl = new URL(`${siteUrl}`);

					const gtmId = new URL(url).searchParams.get('id');
					gtmId && proxyUrl.searchParams.append('id', gtmId);

					return proxyUrl;
				} else if (url.hostname === 'www.google-analytics.com') {
					const proxyUrl = new URL(`${siteUrl}`);

					return proxyUrl;
				}
				return url;
			}
		};
	</script>

	<script bind:this={scriptEl}></script>

	<script type="text/partytown">
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-WTLKQQV');
	</script>
</svelte:head>

<main class="flex h-screen flex-col">
	<Sidebar />
	<div
		class="flex-grow pt-16 duration-300 {$isSidebarExpanded ? 'md:pl-48' : 'md:pl-16'}"
		on:touchstart={() => mobileSidebarToggle && mobileSidebarToggle.set(false)}
	>
		<Header />
		<!-- Main content needs to account for header height and sidebar width. -->
		<slot />
	</div>
</main>
