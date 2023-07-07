<script>
	import { PUBLIC_SERVER_API_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let username = '';
	let password = '';
	let showNotification = false;
	let messageType = 'error'; // 'success' or 'error'

	async function register() {
		const payload = {
			username,
			password
		};
		try {
			const response = await fetch(`${PUBLIC_SERVER_API_URL}/users/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				messageType = 'success';
				updateRegisterPlayerNotification();
				goto('/leaderboard');
			} else {
				messageType = 'error';
				updateRegisterPlayerNotification();
			}
		} catch (err) {
			messageType = 'error';
			updateRegisterPlayerNotification();
		}
	}

	function updateRegisterPlayerNotification() {
		if (messageType === 'success') {
			showNotification = true;
		} else if (messageType === 'error') {
			showNotification = true;
		}
		setTimeout(() => {
			showNotification = false;
		}, 2500);
	}
</script>

<svelte:head>
	<title>Login - StarDB.gg</title>
	<meta name="description" content="Login Page for StarDB.gg" />
</svelte:head>

<div class="flex h-full flex-col items-center justify-center pb-16">
	<div class="flex flex-col space-y-4">
		<p class="pl-2 text-3xl font-bold text-white_warm">Login to account</p>
		<div
			class="w-full max-w-lg rounded-lg border-2 border-purple_highlight bg-space_light p-10 text-sm md:text-base"
		>
			<form class="flex flex-col items-center text-white_warm" on:submit|preventDefault={register}>
				<div class="space-y-6 rounded-md shadow-sm">
					<div>
						{#if username.length > 32}
							<p class="font-bold text-neon_pink">Username exceeds limit</p>
						{/if}
						<p class="flex justify-between pb-2">Username</p>
						<input
							class="h-10 w-64 rounded-md border-2 border-space_gray bg-space_dark px-3 text-sm text-white_warm focus:border-purple_highlight focus:outline-none md:w-96 md:text-base"
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
							<p>Password</p>
							<a href="/request-token">
								<p class="font-bold text-dim_green hover:text-neon_green">Forgot Password?</p>
							</a>
						</div>
						<input
							class="h-10 w-64 rounded-md border-2 border-space_gray bg-space_dark px-3 text-sm text-white_warm focus:border-purple_highlight focus:outline-none md:w-96 md:text-base"
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
						class="mt-6 h-8 w-64 rounded-md bg-purple_highlight text-sm font-bold hover:bg-dim_purple md:w-96"
						type="submit"
						aria-label="Login"
					>
						Login
					</button>
				</div>
			</form>
		</div>
		<a href="/register">
			<p class="pl-2 text-white_warm">
				Don't have an account? <span class="font-bold text-purple_highlight underline"
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
			'success'
				? 'bg-neon_green'
				: 'bg-neon_pink'}"
			transition:fly={{ y: 40, easing: cubicInOut, duration: 400 }}
		>
			{#if messageType === 'success'}
				Sucessfully logged in!
			{:else}
				Failed to login.
			{/if}
		</div>
	</div>
{/if}
