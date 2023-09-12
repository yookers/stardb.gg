<script lang="ts">
	import { Icon, ChartBar, Fire, DocumentCheck, CircleStack, FaceSmile, BookOpen } from 'svelte-hero-icons';
	import { sidebarState, currentInterface } from '$store';
	import { SidebarState, DeviceInterface } from '$types';
	import SidebarNav from './SidebarNav.svelte';
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
		class="fixed left-0 top-0 z-[9] h-full w-full bg-galaxy_purple-800 opacity-70"
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
		class="fixed left-0 top-0 z-10 flex h-full items-center whitespace-nowrap pt-16 font-bold duration-300"
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
				<!-- Leaderboard icon -->
				<SidebarNav path="/leaderboard" name="Leaderboard" {isMobileView}>
					<Icon src={ChartBar} solid class="h-6 w-6" />
				</SidebarNav>

				<!-- Tier list icon -->
				<SidebarNav path="/tier-list" name="Tier List" {isMobileView}>
					<Icon src={Fire} solid class="h-6 w-6" />
				</SidebarNav>

				<!-- Achievement tracker icon -->
				<SidebarNav path="/achievement-tracker" name="Tracker" {isMobileView}>
					<Icon src={DocumentCheck} solid class="h-6 w-6" />
				</SidebarNav>

				<!-- Profile card generator icon -->
				<SidebarNav path="/profile-card-generator" name="Profile Card" {isMobileView}>
					<Icon src={FaceSmile} solid class="h-6 w-6" />
				</SidebarNav>

				<!-- Database icon -->
				<SidebarNav path="/database" name="Database" {isMobileView}>
					<Icon src={CircleStack} solid class="h-6 w-6" />
				</SidebarNav>

				<!-- Articles icon -->
				<SidebarNav path="/articles/" name="Articles" {isMobileView}>
					<Icon src={BookOpen} solid class="h-6 w-6" />
				</SidebarNav>
			</div>
		</div>
	</div>
{/if}
