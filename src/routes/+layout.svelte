<script lang="ts">
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import './app.css';
	import { DeviceInterface } from '$types';
	import { sidebarState, currentInterface } from '$store';
	import { SidebarState } from '$types';
	import { fly } from 'svelte/transition';

	import { partytownSnippet } from '@builder.io/partytown/integration';

	export let data;
	let deviceWidth: number;

	$: if (deviceWidth > 1536) {
		currentInterface.set(DeviceInterface.DESKTOP_2XL);
	} else if (deviceWidth > 1280) {
		currentInterface.set(DeviceInterface.DESKTOP_XL);
	} else if (deviceWidth > 1024) {
		currentInterface.set(DeviceInterface.DESKTOP);
	} else if (deviceWidth > 768) {
		currentInterface.set(DeviceInterface.TABLET);
	} else {
		currentInterface.set(DeviceInterface.MOBILE);
	}
</script>

<svelte:head>
	<script>
		// Config options
		// Forward the necessary functions to the web worker layer
		partytown = {
			forward: ['dataLayer.push'],
			resolveUrl: (url) => {
				const siteUrl = 'https://stardb.gg';

				if (url.hostname === 'www.googletagmanager.com') {
					const proxyUrl = new URL(`${siteUrl}/gtm.js`);
					const gtmId = new URL(url).searchParams.get('id');
					gtmId && proxyUrl.searchParams.append('id', gtmId);
					return proxyUrl;
				} else if (url.hostname === 'www.google-analytics.com') {
					const proxyUrl = new URL(`${siteUrl}/ga`);
					return proxyUrl;
				}
				return url;
			}
		};
	</script>

	{@html '<script>' + partytownSnippet() + '</script>'}

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

<svelte:window bind:innerWidth={deviceWidth} />

<main class="flex h-screen flex-col font-inter">
	<Sidebar />
	<Header />

	<!-- Main content needs to account for header height and sidebar width. -->
	{#key data.currentPath}
		<div
			class="flex-grow bg-space_dark pt-16 duration-300 {$sidebarState === SidebarState.EXPANDED ? 'md:pl-48' : 'md:pl-16'}"
			in:fly={{ y: -30, duration: 200, delay: 100 }}
		>
			<slot />
		</div>
	{/key}
</main>
