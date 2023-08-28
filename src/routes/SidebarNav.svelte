<script lang="ts">
	import { page } from '$app/stores';
	import { sidebarState } from '$store';
	import { SidebarState } from '$types';

	export let path: string;
	export let name: string;
	export let isMobileView: boolean;
</script>

<a
	href={path}
	class="flex w-full items-center space-x-4 px-5 py-2 hover:bg-galaxy_purple-650 hover:text-off_white"
	class:text-off_white={$page.url.pathname.startsWith(path)}
	on:click={() => {
		if (isMobileView) {
			sidebarState.set(SidebarState.CLOSED);
		}
	}}
>
	<div>
		<!-- Icon -->
		<slot />
	</div>
	<div class="transition-opacity duration-200 {$sidebarState === SidebarState.EXPANDED ? 'opacity-100' : 'opacity-0'}">
		<p>{name}</p>
	</div>
</a>
