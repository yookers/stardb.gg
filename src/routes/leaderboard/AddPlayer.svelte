<script>
	import { PUBLIC_SERVER_API_URL } from '$env/static/public';
	import { createEventDispatcher } from 'svelte';
	import { Icon, Plus } from 'svelte-hero-icons';

	const dispatch = createEventDispatcher();
	let notificationType = '';
	let uid = '';

	async function addPlayerUID() {
		// Check if UID is 9 digits number
		if (!/^\d{9}$/.test(uid)) {
			notificationType = 'error';
			dispatch('addplayer', {
				notificationType
			});
			return;
		}

		const requestOptions = {
			method: 'PUT',
			headers: {
				Accept: 'application/json'
			}
		};

		try {
			const response = await fetch(`${PUBLIC_SERVER_API_URL}/scores/${uid}`, requestOptions);
			const data = await response.json();
			if (response.ok) {
				notificationType = 'success';
				dispatch('addplayer', {
					notificationType: notificationType,
					data: [data]
				});
			} else {
				notificationType = 'error';
				dispatch('addplayer', {
					notificationType
				});
			}
		} catch (error) {
			console.error('Error fetching player data:', error);
			notificationType = 'error';
			dispatch('addplayer', {
				notificationType
			});
		}
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			addPlayerUID();
		}
	}
</script>

<div class="flex">
	<input
		class="h-8 w-28 overflow-hidden rounded-l-lg border-2 border-transparent bg-space_light pl-4 text-sm text-white_warm outline-none focus:border-purple_highlight sm:w-40 md:w-52"
		placeholder="Player UID"
		type="text"
		on:keydown={handleKeyDown}
		bind:value={uid}
	/>
	<button
		class="rounded-r-lg bg-purple_highlight px-1.5"
		aria-label="Add Player UID to leaderboard"
		on:click={addPlayerUID}
	>
		<Icon src={Plus} solid class="h-5 w-5 text-white_warm" />
	</button>
</div>
