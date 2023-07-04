<script>
	import { PUBLIC_CLIENT_API_URL } from '$env/static/public';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let notificationType = '';
	let uid = '';

	async function addPlayerUID() {
		const requestOptions = {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uid: parseInt(uid, 10) })
		};

		try {
			const response = await fetch(PUBLIC_CLIENT_API_URL, requestOptions);
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
</script>

<div>
	<input class="text-black" type="text" bind:value={uid} />
	<button on:click={addPlayerUID}>Add</button>
</div>