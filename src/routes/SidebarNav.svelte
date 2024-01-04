<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { sidebarState } from '$store';
	import { SidebarState } from '$types';
	import { locale } from '$store';

	export let path: string;
	export let name: string;
	export let isMobileView: boolean;
	export let includeLocale: boolean = true;
	export let subCategories: { path: string; name: string; includeLocale: boolean }[] = [];

	let subDropdownOpen = false;

	$: {
		if ($sidebarState === SidebarState.COLLAPSED) subDropdownOpen = false;
	}
</script>

<div>
	<a
		href={includeLocale ? `/${$locale}${path}` : `${path}`}
		class="flex w-full flex-col py-2 pl-5 pr-2 hover:bg-galaxy_purple-650 hover:text-off_white"
		class:text-off_white={$page.url.pathname.startsWith(path)}
		on:click={() => {
			if (isMobileView) {
				sidebarState.set(SidebarState.CLOSED);
			}
		}}
	>
		<div class="flex items-center justify-between">
			<!-- Icon -->
			<div class="flex shrink-0 gap-x-3">
				<slot />

				<div
					class="flex items-center gap-x-2 transition-opacity duration-200 {$sidebarState === SidebarState.EXPANDED
						? 'opacity-100'
						: 'opacity-0'}"
				>
					<p>{name}</p>
				</div>
			</div>

			{#if subCategories.length > 0}
				<button class="h-full w-8 flex justify-center"
					on:click={(event) => {
						// Prevent navigation when clicking on the dropdown button
						event.preventDefault();
                        event.stopPropagation();
						subDropdownOpen = !subDropdownOpen;
					}}
				>
					{#if subDropdownOpen}
						<ChevronUp class="h-6 w-6" />
					{:else}
						<ChevronDown class="h-6 w-6" />
					{/if}
				</button>
			{/if}
		</div>
	</a>

	{#if subDropdownOpen}
		<div class="flex w-full flex-col space-y-0.5 pt-1">
			{#each subCategories as { path, name, includeLocale }}
				<a
					href={includeLocale ? `/${$locale}${path}` : `${path}`}
					class="w-full py-2 pl-14 pr-3 hover:bg-galaxy_purple-650 hover:text-off_white"
					class:text-off_white={$page.url.pathname.startsWith(path)}
					on:click={() => {
						if (isMobileView) {
							sidebarState.set(SidebarState.CLOSED);
						}
					}}
				>
					<p>{name}</p>
				</a>
			{/each}
		</div>
	{/if}
</div>
