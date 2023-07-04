<script>
	import { Icon, Star, ChartBar, FaceSmile, DocumentCheck, BookOpen } from 'svelte-hero-icons';
	import { isSidebarExpanded } from './store.js';
	import { page } from '$app/stores';

	let hoveredItem = null;
	const MD_BREAKPOINT = 768; // Tailwind CSS md breakpoint
</script>

<!-- Prevent sidebar from expanding when viewport is too small -->
<div
	class="flex flex-col"
	aria-hidden="true"
	on:mouseenter={() => {
		if (window.innerWidth >= MD_BREAKPOINT) isSidebarExpanded.set(true);
	}}
	on:mouseleave={() => {
		if (window.innerWidth >= MD_BREAKPOINT) isSidebarExpanded.set(false);
	}}
>
	<!-- Sidebar -->
	<div
		class="fixed left-0 top-0 z-10 flex h-full flex-col overflow-x-hidden whitespace-nowrap border-r-2 border-purple_highlight bg-space_light font-bold text-space_gray duration-300 {$isSidebarExpanded
			? 'w-48'
			: 'w-16'}"
	>
		<!-- Logo -->
		<a href="/" class="flex">
			<div
				class="flex h-16 items-center space-x-4 whitespace-nowrap bg-purple_highlight px-5 py-2 duration-300 {$isSidebarExpanded
					? 'w-48'
					: 'w-16'}"
			>
				<div>
					<Icon src={Star} solid class="h-6 w-6 animate-spin-slow text-white_warm" />
				</div>
				<div
					class="transition-opacity duration-200 {$isSidebarExpanded ? 'opacity-100' : 'opacity-0'}"
				>
					<p class="text-2xl font-light tracking-wider text-white_warm">db.gg</p>
				</div>
			</div>
		</a>
		<div class="flex flex-col space-y-4 pt-48">
			<!-- Leaderboard icon-->
			<a href="/leaderboard" class:text-white_warm={$page.url.pathname === '/leaderboard'}>
				<div
					class="flex cursor-pointer items-center space-x-4 px-5 py-2 {hoveredItem === 'leaderboard'
						? 'bg-purple_highlight text-white_warm'
						: ''}"
					aria-hidden="true"
					on:mouseenter={() => (hoveredItem = 'leaderboard')}
					on:mouseleave={() => (hoveredItem = null)}
				>
					<div>
						<Icon src={ChartBar} solid class="h-6 w-6" />
					</div>
					<div
						class="transition-opacity duration-200 {$isSidebarExpanded
							? 'opacity-100'
							: 'opacity-0'}"
					>
						<p>Leaderboard</p>
					</div>
				</div>
			</a>
			<!-- Profile icon-->
			<a href="/profile-card" class:text-white_warm={$page.url.pathname === '/profile-card'}>
				<div
					class="flex cursor-pointer items-center space-x-4 px-5 py-2 {hoveredItem === 'profileCard'
						? 'bg-purple_highlight text-white_warm'
						: ''}"
					aria-hidden="true"
					on:mouseenter={() => (hoveredItem = 'profileCard')}
					on:mouseleave={() => (hoveredItem = null)}
				>
					<div>
						<Icon src={FaceSmile} solid class="h-6 w-6" />
					</div>
					<div
						class="transition-opacity duration-200 {$isSidebarExpanded
							? 'opacity-100'
							: 'opacity-0'}"
					>
						<p>Profile Card</p>
					</div>
				</div>
			</a>
			<!-- Achievement tracker icon -->
			<a
				href="/achievement-tracker"
				class:text-white_warm={$page.url.pathname === '/achievement-tracker'}
			>
				<div
					class="flex cursor-pointer items-center space-x-4 px-5 py-2 {hoveredItem ===
					'achievementTracker'
						? 'bg-purple_highlight text-white_warm'
						: ''}"
					aria-hidden="true"
					on:mouseenter={() => (hoveredItem = 'achievementTracker')}
					on:mouseleave={() => (hoveredItem = null)}
				>
					<div>
						<Icon src={DocumentCheck} solid class="h-6 w-6" />
					</div>
					<div
						class="transition-opacity duration-200 {$isSidebarExpanded
							? 'opacity-100'
							: 'opacity-0'}"
					>
						<p>Tracker</p>
					</div>
				</div>
			</a>
			<!-- Articles icon-->
			<a href="/articles" class:text-white_warm={$page.url.pathname === '/articles'}>
				<div
					class="flex cursor-pointer items-center space-x-4 px-5 py-2 {hoveredItem === 'articles'
						? 'bg-purple_highlight text-white_warm'
						: ''}"
					aria-hidden="true"
					on:mouseenter={() => (hoveredItem = 'articles')}
					on:mouseleave={() => (hoveredItem = null)}
				>
					<div>
						<Icon src={BookOpen} solid class="h-6 w-6" />
					</div>
					<div
						class="transition-opacity duration-200 {$isSidebarExpanded
							? 'opacity-100'
							: 'opacity-0'}"
					>
						<p>Articles</p>
					</div>
				</div>
			</a>
		</div>
	</div>
</div>
