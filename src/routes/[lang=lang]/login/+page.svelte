<script lang="ts">
	import { goto } from '$app/navigation';
	import { locale } from '$store';
	import { MessageType } from '$types';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { KeyRound } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const apiURL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	let username = '';
	let password = '';
	let token = '';
	let showNotification = false;
	let messageType: MessageType;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		token = urlParams.get('token') ?? '';
		if (token) {
			login();
		}
	});

	async function login() {
		let payload;

		if (token) {
			payload = { token };
		} else {
			payload = { username, password };
		}

		try {
			const response = await fetch(`${apiURL}/users/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				notifyUser(MessageType.SUCCESS);
				goto(`/${$locale}/achievement-tracker`, { invalidateAll: true });
			} else {
				notifyUser(MessageType.ERROR);
			}
		} catch (err) {
			notifyUser(MessageType.ERROR);
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
	<title>Login - StarDB.GG</title>
	<meta name="description" content="Login to your account on StarDB.GG." />
</svelte:head>

<main class="flex h-full flex-col items-center justify-center py-8">
	<div class="flex w-full flex-col space-y-4 px-4 sm:px-12 md:w-[600px] md:px-0">
		<div class="flex items-center text-off_white">
			<KeyRound class="mr-2 hidden h-7 w-7 shrink-0 sm:block" />
			<p class="pl-2 text-3xl font-bold">Login to account</p>
		</div>

		<div
			class="w-full rounded-xl border-2 border-galaxy_purple-650 bg-galaxy_purple-750 text-sm hover:border-galaxy_purple-600 md:text-base"
		>
			<form class="flex flex-col items-center text-off_white" on:submit|preventDefault={login}>
				<div class="flex w-full flex-col space-y-6 px-8 pb-8 pt-8 md:px-10">
					<div>
						{#if username.length > 32}
							<p class="font-bold text-neon_pink">Username exceeds limit</p>
						{/if}
						<p class="pb-2">
							Username <span class="text-neon_pink" class:hidden={username !== ''}>*</span>
						</p>
						<input
							class="h-10 w-full rounded-md border-2 border-galaxy_purple-650 bg-space_dark px-3 text-sm text-off_white focus:border-galaxy_purple-600 focus:outline-none md:text-base"
							type="text"
							name="username"
							id="username"
							autocomplete="username"
							aria-label="Username"
							required
							bind:value={username}
						/>
					</div>
					<div>
						{#if password.length > 64}
							<p class="font-bold text-neon_pink">Password exceeds limit</p>
						{/if}
						<div class="flex justify-between pb-2">
							<p>Password <span class="text-neon_pink" class:hidden={password !== ''}>*</span></p>
						</div>
						<input
							class="h-10 w-full rounded-md border-2 border-galaxy_purple-650 bg-space_dark px-3 text-sm text-off_white focus:border-galaxy_purple-600 focus:outline-none md:text-base"
							type="password"
							name="password"
							id="password"
							autocomplete="current-password"
							aria-label="Password"
							required
							bind:value={password}
						/>
					</div>
				</div>
				<div class="w-full border-t-2 border-galaxy_purple-650 px-10 py-6">
					<button
						class="mt-1 h-8 w-full rounded-md bg-purple_highlight text-sm font-bold hover:bg-galaxy_purple-500"
						type="submit"
						aria-label="Login"
					>
						Login
					</button>
				</div>
			</form>
		</div>
		<div class="flex flex-col space-y-1 pl-2">
			<p class=" text-off_white">
				Don't have an account? <a
					href="/{$locale}/register"
					class=" font-bold text-galaxy_purple-400 underline hover:text-galaxy_purple-300">Register here!</a
				>
			</p>
			<p class="font-bold text-dim_green">
				<a href="/{$locale}/request-token" class="hover:text-neon_green">Forgot Password? </a>
			</p>
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
				Sucessfully logged in!
			{:else}
				Failed to login.
			{/if}
		</div>
	</div>
{/if}
