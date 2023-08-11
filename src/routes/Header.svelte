<script>
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';
	import { Icon, User } from 'svelte-hero-icons';
	import { Menu } from 'lucide-svelte';
	import { sidebarState } from './store';
	import { SidebarState } from '$types';

	function toggleSidebar() {
		if ($sidebarState === SidebarState.CLOSED || $sidebarState === SidebarState.COLLAPSED) {
			sidebarState.set(SidebarState.EXPANDED);
		} else {
			sidebarState.set(SidebarState.CLOSED);
		}
	}
</script>

<header
	class="fixed left-0 top-0 z-10 flex h-16 w-full items-center justify-between border-b-2 border-galaxy_purple-750 bg-space_dark duration-300 hover:border-galaxy_purple-650"
>
	<div class="flex items-center">
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
			class="flex items-center space-x-1.5 stroke-off_white ml-3 text-off_white hover:translate-y-0.5 hover:stroke-galaxy_purple-250 hover:text-galaxy_purple-250 md:pl-5"
		>
			<Logo class="w-5 overflow-visible fill-off_white stroke-[7]" />
			<p class="hidden font-dm_sans text-2xl tracking-tighter md:block">stardb.gg</p>
		</a>
	</div>

	<div class="flex items-center">
		<a
			href="https://discord.gg/chives"
			aria-label="Discord Invite Link"
			target="_blank"
			rel="noopener noreferrer"
			class="mr-4 h-8 w-8 flex justify-center items-center"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 127.14 96.36"
				class="h-6 w-6 fill-off_white hover:fill-galaxy_purple-250 hover:translate-y-0.5 md:h-7 md:w-7"
			>
				<path
					d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
				/>
			</svg>
		</a>
		<a
			href="/login"
			aria-label="Login Page"
			class="relative mr-4 flex h-8 items-center justify-center space-x-2 rounded-lg border-2 border-transparent bg-galaxy_purple-550 px-2 text-off_white hover:border-off_white"
		>
			<Icon src={User} solid class="h-4 w-4 " />

			{#if $page.data.user}
				<p class="truncate text-sm font-bold">{$page.data.user.username}</p>
			{:else}
				<p class="text-sm font-bold">Login</p>
			{/if}
			<div class="absolute w-full h-48 bg-galaxy_purple-500 hidden"></div>
		</a>
	</div>
</header>
