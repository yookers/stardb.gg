<script>
	import { Icon, Star, ChartBar, FaceSmile, DocumentCheck, BookOpen } from 'svelte-hero-icons';
	import { isSidebarExpanded, mobileSidebarToggle } from './store.js';
	import { page } from '$app/stores';

	const MD_BREAKPOINT = 768; // Tailwind CSS md breakpoint
	let windowWidth;
</script>

<!-- Prevent sidebar from expanding when viewport is too small -->
<div
	bind:clientWidth={windowWidth}
	class="flex flex-col"
	role="navigation"
	aria-label="Sidebar"
	on:mouseenter={() => {
		if (window.innerWidth >= MD_BREAKPOINT) isSidebarExpanded.set(true);
	}}
	on:mouseleave={() => {
		if (window.innerWidth >= MD_BREAKPOINT) isSidebarExpanded.set(false);
		else mobileSidebarToggle.set(false);
	}}
>
	<!-- Sidebar -->
	<div
		class="fixed left-0 top-0 z-10 hidden h-full overflow-x-hidden whitespace-nowrap border-r-2 border-purple_highlight bg-space_light font-bold text-space_gray duration-300"
		class:md:w-16={!$isSidebarExpanded}
		class:md:w-48={$isSidebarExpanded}
		class:hidden={windowWidth < MD_BREAKPOINT && !$mobileSidebarToggle}
		class:w-48={$mobileSidebarToggle}
	>
		<!-- Logo -->
		<a href="/" class="flex">
			<button
				class="flex h-16 w-full items-center space-x-4 whitespace-nowrap bg-purple_highlight px-5 py-2 duration-300"
				on:click={() => {
					mobileSidebarToggle.set(false);
				}}
			>
				<div>
					<Icon src={Star} solid class="h-6 w-6 animate-spin-slow text-white_warm" />
				</div>
				<div
					class="transition-opacity duration-200 {$isSidebarExpanded || $mobileSidebarToggle
						? 'opacity-100'
						: 'opacity-0'}"
				>
					<p class="text-2xl font-light tracking-wider text-white_warm">db.gg</p>
				</div>
			</button>
		</a>
		<div class="flex flex-col space-y-4 pt-48">
			<!-- Leaderboard icon-->
			<a href="/leaderboard" class:text-white_warm={$page.url.pathname === '/leaderboard'}>
				<button
					class="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-purple_highlight hover:text-white_warm"
					on:click={() => {
						mobileSidebarToggle.set(false);
					}}
				>
					<div>
						<Icon src={ChartBar} solid class="h-6 w-6" />
					</div>
					<div
						class="transition-opacity duration-200 {$isSidebarExpanded || $mobileSidebarToggle
							? 'opacity-100'
							: 'opacity-0'}"
					>
						<p>Leaderboard</p>
					</div>
				</button>
			</a>
			<!-- Profile icon-->
			<a href="/profile-card" class:text-white_warm={$page.url.pathname === '/profile-card'}>
				<button
					class="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-purple_highlight hover:text-white_warm"
					on:click={() => {
						mobileSidebarToggle.set(false);
					}}
				>
					<div>
						<Icon src={FaceSmile} solid class="h-6 w-6" />
					</div>
					<div
						class="transition-opacity duration-200 {$isSidebarExpanded || $mobileSidebarToggle
							? 'opacity-100'
							: 'opacity-0'}"
					>
						<p>Profile Card</p>
					</div>
				</button>
			</a>
			<!-- Achievement tracker icon -->
			<a
				href="/achievement-tracker"
				class:text-white_warm={$page.url.pathname === '/achievement-tracker'}
			>
				<button
					class="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-purple_highlight hover:text-white_warm"
					on:click={() => {
						mobileSidebarToggle.set(false);
					}}
				>
					<div>
						<Icon src={DocumentCheck} solid class="h-6 w-6" />
					</div>
					<div
						class="transition-opacity duration-200 {$isSidebarExpanded || $mobileSidebarToggle
							? 'opacity-100'
							: 'opacity-0'}"
					>
						<p>Tracker</p>
					</div>
				</button>
			</a>
			<!-- Articles icon-->
			<a
				href="/articles"
				class:text-white_warm={$page.url.pathname === '/articles'}
				on:click={() => {
					mobileSidebarToggle.set(false);
				}}
			>
				<div
					class="flex cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-purple_highlight hover:text-white_warm"
				>
					<div>
						<Icon src={BookOpen} solid class="h-6 w-6" />
					</div>
					<div
						class="transition-opacity duration-200 {$isSidebarExpanded || $mobileSidebarToggle
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
