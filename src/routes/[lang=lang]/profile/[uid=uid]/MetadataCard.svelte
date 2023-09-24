<script lang="ts">
	import BaseCard from '$components/BaseCard.svelte';
	import type { MihomoPlayer } from '$types';
	import { Braces } from 'lucide-svelte';

	export let playerData: MihomoPlayer;
</script>

<BaseCard label="Metadata" title="Metadata">
	<div slot="icon">
		<Braces class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="truncate px-3 pb-3 pt-4">
		<div class="flex w-full justify-between px-10 py-1.5 md:px-16 lg:px-20">
			<p>UID:</p>
			<p class="font-semibold">{playerData.uid}</p>
		</div>

		<div class="flex w-full justify-between bg-galaxy_purple-700 px-10 py-1.5 md:px-16 lg:px-20">
			<p>Trailblazer Level:</p>
			<p class="font-semibold">{playerData.level}</p>
		</div>

		<div class="flex w-full justify-between px-10 py-1.5 md:px-16 lg:px-20">
			<p>Equilibrium Level:</p>
			<p class="font-semibold">{playerData.world_level}</p>
		</div>

		<div class="flex w-full justify-between bg-galaxy_purple-700 px-10 py-1.5 md:px-16 lg:px-20">
			<p>Characters Owned:</p>
			<p class="font-semibold">{playerData.space_info.avatar_count}</p>
		</div>

		<div class="flex w-full justify-between px-10 py-1.5 md:px-16 lg:px-20">
			<p>Friend Count:</p>
			<p class="font-semibold">{playerData.friend_count}</p>
		</div>

		<div class="flex w-full justify-between bg-galaxy_purple-700 px-10 py-1.5 md:px-16 lg:px-20">
			<p>Lightcone Count:</p>
			<p class="font-semibold">{playerData.space_info.light_cone_count}</p>
		</div>

		<div class="flex w-full flex-wrap justify-between px-10 py-1.5 sm:flex-nowrap md:px-16 lg:px-20">
			<p>Avatar Icon Name:</p>
			<p class="font-semibold">{playerData.avatar.name}</p>
		</div>

		<div class="flex w-full justify-between bg-galaxy_purple-700 px-10 py-1.5 md:px-16 lg:px-20">
			<p>Avatar Icon ID:</p>
			<p class="font-semibold">{playerData.avatar.id}</p>
		</div>

		<div class="flex w-full flex-wrap justify-between px-10 py-1.5 sm:flex-nowrap md:px-16 lg:px-20">
			<p>Memory of Chaos Floor:</p>
			<p class="font-semibold">{playerData.space_info.challenge_data.maze_group_id}</p>
		</div>

		<div class="flex w-full flex-wrap justify-between bg-galaxy_purple-700 px-10 py-1.5 sm:flex-nowrap md:px-16 lg:px-20">
			<p>Regular Memory Floor:</p>
			<p class="font-semibold">{playerData.space_info.challenge_data.maze_group_index}</p>
		</div>
	</div>
</BaseCard>
