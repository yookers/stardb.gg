<script>
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';
	import { Icon, User } from 'svelte-hero-icons';
	import { Menu } from 'lucide-svelte';
	import { sidebarState } from './store';

	function toggleSidebar() {
		if ($sidebarState === 'closed' || $sidebarState === 'collapsed') {
			sidebarState.set('expanded');
		} else {
			sidebarState.set('closed');
		}
	}
</script>

<header
	class="fixed left-0 top-0 z-10 flex h-16 w-full items-center justify-between border-b-2 border-galaxy_purple-750 bg-space_dark duration-300 hover:border-galaxy_purple-650"
>
	<div class="flex">
		<button
			class="ml-4 flex h-8 w-8 items-center justify-center rounded-lg text-off_white hover:translate-y-0.5 hover:text-galaxy_purple-250 md:hidden"
			aria-label="Toggle Sidebar"
			on:click={toggleSidebar}
		>
			<Menu class="h-6 w-6" />
		</button>
		<a
			href="/"
			aria-label="Home Page"
			class="flex items-center space-x-2 stroke-off_white pl-3 text-off_white hover:translate-y-0.5 hover:stroke-galaxy_purple-250 hover:text-galaxy_purple-250 md:pl-5"
		>
			<Logo class="w-5 overflow-visible fill-off_white stroke-[7]" />
			<p class="hidden font-dm_sans text-2xl tracking-tighter md:block">stardb.gg</p>
		</a>
	</div>

	<a
		href="/login"
		aria-label="Login Page"
		class="mr-4 flex h-8 items-center justify-center space-x-2 rounded-lg border-2 border-transparent bg-galaxy_purple-550 px-2 text-off_white hover:border-off_white"
	>
		<Icon src={User} solid class="h-4 w-4 " />

		{#if $page.data.user}
			<p class="truncate text-sm font-bold">{$page.data.user.username}</p>
		{:else}
			<p class="text-sm font-bold">Login</p>
		{/if}
	</a>
</header>
