<script lang="ts">
	import { locale } from '$store';
	import { MessageType } from '$types';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { Mail, Send, Info } from 'lucide-svelte';

	const apiURL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	let username = '';
	let errorMessage = '';
	let showNotification = false;
	let messageType: MessageType;

	async function requestToken() {
		try {
			const response = await fetch(`${apiURL}/users/auth/request-token`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: username })
			});
			if (response.ok) {
				notifyUser(MessageType.SUCCESS);
			}
		} catch (err) {}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			requestToken();
		}
	}

	const notifyUser = (type: MessageType) => {
		messageType = type;
		showNotification = true;
		setTimeout(() => {
			showNotification = false;
		}, 2500);
	};
</script>

<svelte:head>
	<title>Request OTP Token - StarDB.GG</title>
	<meta name="description" content="Forgot your password? Generate a OTP token sent to your email to login on StarDB.GG" />
</svelte:head>

<main class="flex h-full flex-col items-center justify-center py-8">
	<div class="flex w-full flex-col space-y-4 px-4 sm:px-12 md:w-[600px] md:px-0">
		<div class="flex items-center text-off_white">
			<Mail class="mr-2 hidden h-7 w-7 shrink-0 sm:block" />
			<p class="pl-2 text-3xl font-bold">Request email token</p>
		</div>
		<div>
			<div class="flex items-center space-x-2 px-2 pb-1 text-off_white">
				<Info class="h-4 w-4" />
				<p class="text-xs sm:text-sm">This only works if you registered with an optional email</p>
			</div>
			<div
				class="flex w-full rounded-xl border-2 border-galaxy_purple-650 bg-galaxy_purple-750 text-sm hover:border-galaxy_purple-600 md:text-base"
			>
				<input
					class="h-12 w-full rounded-l-xl border-y-2 border-l-2 border-transparent bg-galaxy_purple-150 px-5 text-base font-bold text-galaxy_purple-600 outline-none placeholder:text-galaxy_purple-600 hover:border-galaxy_purple-250 md:w-[600px] md:text-lg
        {errorMessage ? 'focus:border-neon_pink' : 'focus:border-galaxy_purple-250'}"
					type="text"
					id="search"
					placeholder="Enter your username"
					bind:value={username}
					on:keydown={handleKeyDown}
				/>
				<button
					class="rounded-r-xl bg-galaxy_purple-250 px-4 text-galaxy_purple-600 hover:scale-105"
					aria-label="Search player UID"
					on:click={requestToken}
				>
					<Send class="h-6 w-6 md:h-7 md:w-7" />
				</button>
			</div>
		</div>
		<p class="pl-2 text-off_white">
			Suddenly remember your password? <a
				href="/{$locale}/login"
				class="font-bold text-galaxy_purple-400 underline hover:text-galaxy_purple-300">Login here!</a
			>
		</p>
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
				Sucessfully sent to your email!
			{:else}
				Failed to send to your email.
			{/if}
		</div>
	</div>
{/if}
