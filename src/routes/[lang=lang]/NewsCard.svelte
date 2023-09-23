<script lang="ts">
	import { PUBLIC_CDN_RES_API_URL } from '$env/static/public';
	import { ArrowUpRight, BellRing } from 'lucide-svelte';
</script>

<div
	class="overflow-clip rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750 text-off_white transition-all duration-300 hover:border-galaxy_purple-600 sm:hover:translate-y-1"
>
	<!-- Card Title -->

	<div class="flex items-center space-x-4 px-5 py-2 sm:py-3">
		<BellRing class="h-5 w-5" />
		<h2 class="text-xl font-bold">News</h2>
	</div>

	<!-- Card Content-->
	<div class="flex flex-col justify-center bg-galaxy_purple-700 px-6 pb-3 pt-2 text-left">
		<div class="flex space-x-5">
			<div class="relative flex">
				<div class="w-[3px] bg-galaxy_purple-300"></div>
				<div class="absolute -left-[7px] flex items-center space-x-3">
					<div class="h-4 w-4 shrink-0 rounded-full bg-galaxy_purple-300"></div>
					<p class="shrink-0 text-xs">2023-09-05</p>
				</div>
			</div>

			<div class="space-y-3 pt-6 text-sm md:text-base">
				<div class="flex items-center space-x-2">
                    <img class="h-5 w-5" src={`${PUBLIC_CDN_RES_API_URL}/img/jade-currency-small.webp`} alt="Jade Icon" />
					<p class="font-bold">Oneiric Shard Giveaway - Achievement Marathon</p>
				</div>
				<p>
					<span class="font-bold">StarDB.GG's</span> discord server is hosting an achievement marathon for server members. Several
					Oneiric Shard prizes will be given out based on the user's official total achievements.
				</p>
				<div class="flex">
					<a
						class="group flex items-center space-x-1 font-bold text-galaxy_purple-200 underline hover:text-galaxy_purple-300"
						href="https://discord.gg/chives"
						aria-label="Discord invite link"
						target="_blank"
						rel="noopener noreferrer"
					>
						<p>Click here to join</p>
						<ArrowUpRight class="mt-0.5 h-5 w-5 group-hover:-translate-y-0.5" />
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
