<script>
	import { PUBLIC_SERVER_API_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let username = '';
	let password = '';
	let confirmPassword = '';
	let email = '';
	let showNotification = false;
	let messageType = 'error'; // 'success' or 'error'

	async function register() {
		const payload = {
			username,
			password
		};
		if (email) {
			payload.email = email;
		}
		try {
			const response = await fetch(`${PUBLIC_SERVER_API_URL}/users/register`, {
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
	<title>Register Account - StarDB.gg</title>
	<meta name="description" content="Register an account for StarDB.gg" />
</svelte:head>

<div class="flex h-full flex-col items-center justify-center pb-8">
	<div class="flex flex-col space-y-4">
		<p class="pl-2 text-3xl font-bold text-white_warm">Register an account</p>
		<div
			class="w-full max-w-lg rounded-lg border-2 border-purple_highlight bg-space_light p-10 text-sm md:text-base"
		>
			<form class="flex flex-col items-center text-white_warm" on:submit|preventDefault={register}>
				<div class="space-y-6 rounded-md shadow-sm">
					<div>
						{#if username.length > 32}
							<p class="font-bold text-neon_pink">Username exceeds limit</p>
						{/if}
						<div class="flex w-64 justify-between pb-2 md:w-96">
							<p>Username</p>
							<p>Max 32 characters</p>
						</div>
						<input
							class="h-10 w-64 rounded-md border-2 border-space_gray bg-space_dark px-3 text-sm text-white_warm focus:border-purple_highlight focus:outline-none md:w-96 md:text-base"
							type="text"
							name="username"
							id="username"
							autocomplete="username"
							required
							bind:value={username}
						/>
					</div>
					<div>
						{#if password.length > 64}
							<p class=" font-bold text-neon_pink">Password exceeds limit</p>
						{/if}
						<div class="flex w-64 justify-between pb-2 md:w-96">
							<p>Password</p>
							<p>Max 64 characters</p>
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
					<div>
						{#if password !== confirmPassword}
							<p class=" font-bold text-neon_pink">Passwords do not match</p>
						{/if}
						<p class="pb-2">Confirm Password</p>
						<input
							class="h-10 w-64 rounded-md border-2 border-space_gray bg-space_dark px-3 text-sm text-white_warm focus:border-purple_highlight focus:outline-none md:w-96 md:text-base"
							type="password"
							name="confirm-password"
							id="confirm-password"
							required
							bind:value={confirmPassword}
						/>
					</div>
					<div>
						{#if email.length > 64}
							<p class=" font-bold text-neon_pink">Email exceeds limit</p>
						{/if}
						<div class="flex w-64 justify-between pb-2 md:w-96">
							<p>Email (Optional)</p>
							<p>Max 64 characters</p>
						</div>
						<input
							class="h-10 w-64 rounded-md border-2 border-space_gray bg-space_dark px-3 text-sm text-white_warm focus:border-purple_highlight focus:outline-none md:w-96 md:text-base"
							type="email"
							name="email"
							id="email"
							bind:value={email}
						/>
						<p class="w-64 pt-2 text-xs font-bold md:w-96">
							The optional email is used for resetting password
						</p>
					</div>
				</div>

				<div>
					<button
						class="mt-6 h-8 w-64 rounded-md bg-purple_highlight text-sm font-bold hover:bg-dim_purple md:w-96"
						type="submit"
						aria-label="Register"
					>
						Register
					</button>
				</div>
			</form>
		</div>
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
				Sucessfully registered user!
			{:else}
				Failed to register user.
			{/if}
		</div>
	</div>
{/if}
