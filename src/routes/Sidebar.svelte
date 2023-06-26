<script>
	import { Icon, ChartBar, FaceSmile, BookOpen } from 'svelte-hero-icons';
	let isExpanded = false;
	let hoveredItem = null;
</script>

<div
	aria-hidden="true"
	class="sticky top-0 h-screen bg-space_light font-bold overflow-hidden duration-300 border-r-2 border-purple_highlight {isExpanded
		? 'w-48'
		: 'w-16'}"
	on:mouseenter={() => (isExpanded = true)}
	on:mouseleave={() => (isExpanded = false)}
>
	<div class="flex flex-col pt-48 space-y-4 text-space_gray whitespace-nowrap">
		<!-- Leaderboard section-->
		<a href="/leaderboard">
			<div
				class="flex items-center px-5 py-2 space-x-4 cursor-pointer {hoveredItem === 'leaderboard'
					? 'bg-purple_highlight text-white_warm'
					: ''}"
				aria-hidden="true"
				on:mouseenter={() => (hoveredItem = 'leaderboard')}
				on:mouseleave={() => (hoveredItem = null)}
			>
				<div>
					<Icon src={ChartBar} solid class="w-6 h-6" />
				</div>
				<div class="transition-opacity duration-200 {isExpanded ? 'opacity-100' : 'opacity-0'}">
					<p>Leaderboard</p>
				</div>
			</div>
		</a>
		<!-- Profile card section-->
		<a href="/profile-card">
			<div
				class="flex items-center px-5 py-2 space-x-4 cursor-pointer {hoveredItem === 'profileCard'
					? 'bg-purple_highlight text-white_warm'
					: ''}"
				aria-hidden="true"
				on:mouseenter={() => (hoveredItem = 'profileCard')}
				on:mouseleave={() => (hoveredItem = null)}
			>
				<div>
					<Icon src={FaceSmile} solid class="w-6 h-6" />
				</div>
				<div class="transition-opacity duration-200 {isExpanded ? 'opacity-100' : 'opacity-0'}">
					<p>Profile Card</p>
				</div>
			</div>
		</a>
		<!-- Articles section-->
		<a href="/articles">
			<div
				class="flex items-center px-5 py-2 space-x-4 cursor-pointer {hoveredItem === 'articles'
					? 'bg-purple_highlight text-white_warm'
					: ''}"
				aria-hidden="true"
				on:mouseenter={() => (hoveredItem = 'articles')}
				on:mouseleave={() => (hoveredItem = null)}
			>
				<div>
					<Icon src={BookOpen} solid class="w-6 h-6" />
				</div>
				<div class="transition-opacity duration-200 {isExpanded ? 'opacity-100' : 'opacity-0'}">
					<p>Articles</p>
				</div>
			</div>
		</a>
	</div>
</div>
