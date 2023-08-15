<script lang="ts">
	import { Icon, ChartBar, DocumentCheck, CircleStack, FaceSmile, BookOpen } from 'svelte-hero-icons';
	import { sidebarState, currentInterface } from './store';
	import { SidebarState, DeviceInterface } from '$types';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	// Functions to toggle sidebar state
	const expandSidebar = () => {
		if ($sidebarState === SidebarState.COLLAPSED) {
			sidebarState.set(SidebarState.EXPANDED);
		}
	};

	const collapseSidebar = () => {
		if ($sidebarState === SidebarState.EXPANDED) {
			sidebarState.set(SidebarState.COLLAPSED);
		}
	};

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			collapseSidebar();
		}
	}

	// Handle mobile view
	let isMobileView: boolean;
	$: {
		if ($currentInterface === DeviceInterface.MOBILE) {
			sidebarState.set(SidebarState.CLOSED);
			isMobileView = true;
		} else {
			sidebarState.set(SidebarState.COLLAPSED);
			isMobileView = false;
		}
	}
</script>

{#if isMobileView && $sidebarState === SidebarState.EXPANDED}
	<div
		class="fixed left-0 top-0 z-[9] h-full w-full bg-galaxy_purple-800 opacity-50"
		on:click={() => {
			sidebarState.set(SidebarState.CLOSED);
		}}
		on:keydown={handleKeyDown}
		role="button"
		tabindex="0"
	/>
{/if}

{#if !isMobileView || $sidebarState === SidebarState.EXPANDED}
	<!-- Prevent sidebar from expanding when viewport is too small -->
	<div
		class="fixed left-0 top-0 z-10 flex h-full w-16 items-center whitespace-nowrap pt-16 font-bold duration-300"
		class:w-16={$sidebarState === SidebarState.COLLAPSED}
		class:w-48={$sidebarState === SidebarState.EXPANDED}
		transition:slide={{ axis: 'x', duration: 300 }}
	>
		<!-- Sidebar content -->
		<div
			class="flex h-full w-full flex-col border-r-2 border-galaxy_purple-750 bg-space_dark pb-4 pt-20 text-galaxy_purple-300/80 hover:border-galaxy_purple-650 md:h-4/5 md:rounded-r-2xl md:border-b-2 md:border-t-2"
			role="navigation"
			aria-label="Sidebar"
			on:mouseenter={() => {
				if (!isMobileView) expandSidebar();
			}}
			on:mouseleave={() => {
				if (!isMobileView) collapseSidebar();
			}}
		>
			<div class="flex flex-col space-y-4 overflow-y-auto overflow-x-hidden">
				<!-- Leaderboard icon-->
				<a
					href="/leaderboard"
					class="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-galaxy_purple-650 hover:text-off_white"
					class:text-off_white={$page.url.pathname === '/leaderboard'}
					on:click={() => {
						if (isMobileView) {
							sidebarState.set(SidebarState.CLOSED);
						}
					}}
				>
					<div>
						<Icon src={ChartBar} solid class="h-6 w-6" />
					</div>
					<div class="transition-opacity duration-200 {$sidebarState === SidebarState.EXPANDED ? 'opacity-100' : 'opacity-0'}">
						<p>Leaderboard</p>
					</div>
				</a>
				<!-- Achievement tracker icon -->
				<a
					href="/achievement-tracker"
					class="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-galaxy_purple-650 hover:text-off_white"
					class:text-off_white={$page.url.pathname === '/achievement-tracker'}
					on:click={() => {
						if (isMobileView) {
							sidebarState.set(SidebarState.CLOSED);
						}
					}}
				>
					<div>
						<Icon src={DocumentCheck} solid class="h-6 w-6" />
					</div>
					<div class="transition-opacity duration-200 {$sidebarState === SidebarState.EXPANDED ? 'opacity-100' : 'opacity-0'}">
						<p>Tracker</p>
					</div>
				</a>
				<!-- Database icon -->
				<a
					href="/database"
					class="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-galaxy_purple-650 hover:text-off_white"
					class:text-off_white={$page.url.pathname === '/database'}
					on:click={() => {
						if (isMobileView) {
							sidebarState.set(SidebarState.CLOSED);
						}
					}}
				>
					<div>
						<Icon src={CircleStack} solid class="h-6 w-6" />
					</div>
					<div class="transition-opacity duration-200 {$sidebarState === SidebarState.EXPANDED ? 'opacity-100' : 'opacity-0'}">
						<p>Database</p>
					</div>
				</a>
				<!-- Profile icon-->
				<a
					href="/profile-card-generator"
					class="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-galaxy_purple-650 hover:text-off_white"
					class:text-off_white={$page.url.pathname === '/profile-card-generator'}
					on:click={() => {
						if (isMobileView) {
							sidebarState.set(SidebarState.CLOSED);
						}
					}}
				>
					<div>
						<Icon src={FaceSmile} solid class="h-6 w-6" />
					</div>
					<div class="transition-opacity duration-200 {$sidebarState === SidebarState.EXPANDED ? 'opacity-100' : 'opacity-0'}">
						<p>Profile Card</p>
					</div>
				</a>
				<!-- Articles icon-->
				<a
					href="/articles"
					class="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-galaxy_purple-650 hover:text-off_white"
					class:text-off_white={$page.url.pathname === '/articles'}
					on:click={() => {
						if (isMobileView) {
							sidebarState.set(SidebarState.CLOSED);
						}
					}}
				>
					<div>
						<Icon src={BookOpen} solid class="h-6 w-6" />
					</div>
					<div class="transition-opacity duration-200 {$sidebarState === SidebarState.EXPANDED ? 'opacity-100' : 'opacity-0'}">
						<p>Articles</p>
					</div>
				</a>
			</div>
		</div>
	</div>
{/if}
