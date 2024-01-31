<script lang="ts">
	import { PUBLIC_SERVER_API_URL } from '$env/static/public';
	import { MessageType } from '$types';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let password: string;
	let showNotification = false;
	let messageType: MessageType;

	async function submit() {
		let response = await fetch(`${PUBLIC_SERVER_API_URL}/users/me/password`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		});

		if (response.ok) {
			notifyUser(MessageType.SUCCESS);
		} else {
			notifyUser(MessageType.ERROR);
		}

		password = '';
	}

	const notifyUser = (type: MessageType) => {
		messageType = type;
		showNotification = true;
		setTimeout(() => {
			showNotification = false;
		}, 2500);
	};
</script>

<main class="flex h-full w-full justify-center px-2 pb-4 text-off_white sm:px-6 sm:pb-6 lg:px-20 xl:px-6">
	<div class="flex w-full flex-col py-2 md:w-main">
		<div class="flex items-center space-x-3 pb-3 pl-2 pt-4 sm:pt-6 md:space-x-4">
			<div class="">
				<h1 class="text-xl font-bold md:text-3xl">Account</h1>
				<h2 class="text-base text-galaxy_purple-150 md:text-lg">Set a new password</h2>
			</div>
		</div>
		<div class="flex flex-col space-y-3 sm:space-y-4">
			<div class="flex gap-x-3">
				<input
					class="h-8 w-full bg-off_white text-galaxy_purple-700"
					type="password"
					required
					placeholder="Password"
					bind:value={password}
				/>
				<button
					class="text-white w-8 rounded-xl bg-galaxy_purple-650 px-4 py-2 text-sm font-bold hover:bg-galaxy_purple-600"
					on:click={submit}
				></button>
			</div>
		</div>
	</div>
</main>

<!-- Registration status nofication -->
{#if showNotification}
	<div class="flex justify-center">
		<div
			class="fixed bottom-20 flex w-96 justify-center rounded-lg p-2 text-base font-bold text-space_dark {messageType ===
			MessageType.SUCCESS
				? 'bg-neon_green'
				: 'bg-neon_pink'}"
			transition:fly={{ y: 40, easing: cubicInOut, duration: 400 }}
		>
			{#if messageType === MessageType.SUCCESS}
				Sucessfully set password!
			{:else}
				Error setting password.
			{/if}
		</div>
	</div>
{/if}
