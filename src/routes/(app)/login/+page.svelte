<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { invalidateAll } from '$app/navigation';
	import { MessageType } from '$types';

	const apiURL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	let username = '';
	let password = '';
	let showNotification = false;
	let messageType: MessageType;

	async function login() {
		const payload = {
			username,
			password
		};
		try {
			const response = await fetch(`${apiURL}/users/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
				credentials: 'include'
			});

			if (response.ok) {
				notifyUser(MessageType.SUCCESS);
				invalidateAll();
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
	<title>Login - StarDB.gg</title>
	<meta name="description" content="Login Page for StarDB.gg" />
</svelte:head>

<div class="flex h-full flex-col items-center justify-center pb-16">
	<div class="flex flex-col space-y-4">
		<p class="pl-2 text-3xl font-bold text-off_white">Login to account</p>
		<div
			class="w-full max-w-lg rounded-xl border-2 border-galaxy_purple-650 bg-galaxy_purple-750 p-10 text-sm hover:border-galaxy_purple-600 md:text-base"
		>
			<form class="flex flex-col items-center text-off_white" on:submit|preventDefault={login}>
				<div class="space-y-6">
					<div>
						{#if username.length > 32}
							<p class="font-bold text-neon_pink">Username exceeds limit</p>
						{/if}
						<p class="pb-2">
							Username <span class="text-neon_pink" class:hidden={username !== ''}>*</span>
						</p>
						<input
							class="h-10 w-64 rounded-md border-2 border-galaxy_purple-650 bg-space_dark px-3 text-sm text-off_white focus:border-galaxy_purple-600 focus:outline-none md:w-96 md:text-base"
							type="text"
							name="username"
							id="username"
							autocomplete="nickname"
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
							<a href="/request-token">
								<p class="font-bold text-dim_green hover:text-neon_green">Forgot Password?</p>
							</a>
						</div>
						<input
							class="h-10 w-64 rounded-md border-2 border-galaxy_purple-650 bg-space_dark px-3 text-sm text-off_white focus:border-galaxy_purple-600 focus:outline-none md:w-96 md:text-base"
							type="password"
							name="password"
							id="password"
							required
							bind:value={password}
						/>
					</div>
				</div>

				<div>
					<button
						class="mt-6 h-8 w-64 rounded-md bg-purple_highlight text-sm font-bold hover:bg-galaxy_purple-500 md:w-96"
						type="submit"
						aria-label="Login"
					>
						Login
					</button>
				</div>
			</form>
		</div>
		<a href="/register">
			<p class="pl-2 text-off_white">
				Don't have an account? <span
					class="font-bold text-galaxy_purple-400 underline hover:text-galaxy_purple-300"
					>Register here!</span
				>
			</p>
		</a>
	</div>
</div>

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
