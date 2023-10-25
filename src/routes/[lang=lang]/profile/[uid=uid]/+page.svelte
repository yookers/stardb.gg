<script lang="ts">
	import MetadataCard from './MetadataCard.svelte';
	import CharactersCard from './CharactersCard.svelte';
	import { PUBLIC_CDN_RES_API_URL } from '$env/static/public';
	import type { MihomoPlayer, MihomoCharacterData, ProfileDetails } from '$types';

	export let data;
	const playerData = data.playerData as MihomoPlayer;
	const charactersData = data.charactersData as MihomoCharacterData[];
	const profileDetails = data.profileDetails as ProfileDetails;
	const parsedNickname = stripHtmlTags(playerData.nickname);

	function lastUpdatedTimeAgo(updated_at: string): string {
		// Parse the given date string into a Date object
		const updatedAtDate = new Date(updated_at);

		// Get the current time
		const now = new Date();
		now.setTime(now.getTime() + now.getTimezoneOffset() * 60 * 1000);

		// Calculate the difference in minutes
		let diffInMinutes = Math.floor((now.getTime() - updatedAtDate.getTime()) / (1000 * 60));

		if (diffInMinutes < 60) {
			return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
		}
		// If difference is less than 24 hours (1440 minutes in a day)
		else if (diffInMinutes < 1440) {
			const hours = Math.floor(diffInMinutes / 60);
			return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
		}
		// If difference is less than 30 days (assuming average month size)
		else if (diffInMinutes < 43200) {
			const days = Math.floor(diffInMinutes / 1440);
			return `${days} day${days !== 1 ? 's' : ''} ago`;
		}
		// If difference is more than a month
		else {
			const months = Math.floor(diffInMinutes / 43200);
			return `${months} month${months !== 1 ? 's' : ''} ago`;
		}
	}

	function stripHtmlTags(input: string): string {
		return input.replace(/<[^>]*>/g, '');
	}
</script>

<svelte:head>
	<title>{parsedNickname} HSR Profile - StarDB.gg</title>
	<meta
		name="description"
		content="Player profile of {parsedNickname} for Honkai: Star Rail. View their player ranking and unit builds."
	/>
	<link rel="canonical" href="https://stardb.gg/profile/{playerData.uid}" />
</svelte:head>

<main class="flex h-full w-full justify-center px-4 pb-4 text-off_white sm:px-6 sm:pb-6 lg:px-20 xl:px-6">
	<div class="flex w-full flex-col pt-4 md:w-main">
		<h2 class="pb-3 pl-2 text-2xl font-bold">{parsedNickname}</h2>
		<!-- 		<div class="flex items-center">
			<img
				class="h-16 w-16 rounded-full border-4"
				src="{PUBLIC_CDN_RES_API_URL}/StarRailResWebp/{playerData.avatar.icon.replace(/\.png$/, '.webp')}"
				alt="Avatar icon"
			/>
            <div>
                <h1>{parsedNickname}</h1>
                <p>UID: {playerData.uid}</p>
            </div>
		</div>
		<p>Top {(profileDetails.top_global * 100).toFixed(2)}%</p>
		<p>Top {(profileDetails.top_regional * 100).toFixed(2)}%</p>
		<p>Last Updated: {lastUpdatedTimeAgo(profileDetails.updated_at)}</p>
		<p>{stripHtmlTags(parsedNickname)}</p>
 -->
		<MetadataCard {playerData} />
	</div>
</main>
