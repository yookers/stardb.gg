<script>
	import { Icon, ChartBar, FaceSmile, BookOpen } from 'svelte-hero-icons';
	let isExpanded = false;
	let hoveredItem = null;
</script>

<div
	aria-label="Sidebar"
	aria-hidden="true"
	class="bg-space_light font-inter duration-300 overflow-hidden flex-shrink-0 {isExpanded ? 'w-48' : 'w-16'}"
	on:mouseenter={() => (isExpanded = true)}
	on:mouseleave={() => (isExpanded = false)}
>
	<div class="">
		<div
			class="flex flex-col min-h-screen justify-center space-y-4 text-space_gray whitespace-nowrap"
		>
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
					<p class="font-bold">Leaderboard</p>
				</div>
			</div>

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
					<p class="font-bold">Profile Card</p>
				</div>
			</div>

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
					<p class="font-bold">Articles</p>
				</div>
			</div>
		</div>
	</div>
</div>
