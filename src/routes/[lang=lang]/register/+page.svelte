<script lang="ts">
	const apiURL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
    import { locale } from '$store';
	import { goto } from '$app/navigation';
	import { MessageType } from '$types';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { Lock } from 'lucide-svelte';

	let username = '';
	let password = '';
	let confirmPassword = '';
	let email = '';
	let showNotification = false;
	let messageType: MessageType;
	let importLocalAchievements = false;
	let agreeToTerms = false;

	export let form: ActionData;

	export const snapshot = {
		capture: () => [username, password, confirmPassword, email, importLocalAchievements, agreeToTerms],
		restore: (value) => {
			username = value[0];
			password = value[1];
			confirmPassword = value[2];
			email = value[3];
			importLocalAchievements = value[4];
			agreeToTerms = value[5];
		}
	};

	async function putLocalAchievements() {
		const completedAchievements: number[] = JSON.parse(localStorage.getItem('completed_achievements') ?? '[]');
		try {
			const response = await fetch(`${apiURL}/users/me/achievements`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(completedAchievements)
			});
			if (!response.ok) {
				notifyUser(MessageType.ERROR);
			}
			notifyUser(MessageType.SUCCESS);
			goto(`/${$locale}/achievement-tracker`);
		} catch (error) {
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

	$: if (form?.status === 200) {
		putLocalAchievements();
	} else if (form?.serverError) {
		notifyUser(MessageType.ERROR);
	}
</script>

<svelte:head>
	<title>Register Account - StarDB.GG</title>
	<meta name="description" content="Register for an account on StarDB.GG in order to track your achievements." />
</svelte:head>

<main class="flex h-full flex-col items-center justify-center py-8">
	<div class="flex w-full flex-col space-y-4 px-4 sm:px-12 md:w-[600px] md:px-0">
		<div class="flex items-center text-off_white">
			<Lock class="mr-2 hidden h-7 w-7 shrink-0 sm:block" />
			<p class="pl-2 text-3xl font-bold">Register an account</p>
		</div>
		<div
			class="w-full rounded-xl border-2 border-galaxy_purple-650 bg-galaxy_purple-750 text-sm hover:border-galaxy_purple-700 md:text-base"
		>
			<form class="flex flex-col items-center text-off_white" method="POST" use:enhance>
				<div class="flex w-full flex-col space-y-6 px-8 pb-8 pt-8 md:px-10">
					<div class="flex w-full flex-col">
						{#if form?.usernameTaken}
							<p class="animate-wiggle font-bold text-neon_pink duration-200">Username is taken</p>
						{/if}
						{#if username.length > 32}
							<p class="font-bold text-neon_pink">Username exceeds limit</p>
						{/if}
						<div class="flex w-full items-center justify-between pb-2">
							<p>Username <span class="text-neon_pink" class:hidden={username !== ''}>*</span></p>
							<p class="text-xs italic">Max 32 characters</p>
						</div>
						<input
							class="h-10 w-full items-center rounded-md border-2 border-galaxy_purple-650 bg-space_dark px-3 text-sm text-off_white focus:border-galaxy_purple-600 focus:outline-none md:text-base"
							type="text"
							name="username"
							id="username"
							autocomplete="username"
							aria-label="Username"
							required
							bind:value={username}
						/>
					</div>
					<div class="flex w-full flex-col">
						{#if password.length > 64}
							<p class=" font-bold text-neon_pink">Password exceeds limit</p>
						{/if}
						<div class="flex w-full items-center justify-between pb-2">
							<p>Password <span class="text-neon_pink" class:hidden={password !== ''}>*</span></p>
							<p class="text-xs italic">Max 64 characters</p>
						</div>
						<input
							class="h-10 w-full rounded-md border-2 border-galaxy_purple-650 bg-space_dark px-3 text-sm text-off_white focus:border-galaxy_purple-600 focus:outline-none md:text-base"
							type="password"
							name="password"
							id="password"
							autocomplete="new-password"
							aria-label="Password"
							required
							bind:value={password}
						/>
					</div>
					<div class="flex w-full flex-col">
						{#if password !== confirmPassword}
							<p class=" font-bold text-neon_pink">Passwords do not match</p>
						{/if}
						<p class="pb-2">
							Confirm Password <span class="text-neon_pink" class:hidden={confirmPassword !== ''}>*</span>
						</p>
						<input
							class="h-10 w-full rounded-md border-2 border-galaxy_purple-650 bg-space_dark px-3 text-sm text-off_white focus:border-galaxy_purple-600 focus:outline-none md:text-base"
							type="password"
							name="confirm-password"
							id="confirm-password"
							aria-label="Confirm Password"
							required
							bind:value={confirmPassword}
						/>
					</div>
					<div class="flex w-full flex-col">
						{#if email.length > 64}
							<p class=" font-bold text-neon_pink">Email exceeds limit</p>
						{/if}
						<div class="flex w-full items-center justify-between pb-2">
							<p>Email (Optional)</p>
							<p class="text-xs italic">Max 64 characters</p>
						</div>
						<input
							class="h-10 w-full rounded-md border-2 border-galaxy_purple-650 bg-space_dark px-3 text-sm text-off_white focus:border-galaxy_purple-600 focus:outline-none md:text-base"
							type="email"
							name="email"
							id="email"
							aria-label="Email Address"
							bind:value={email}
						/>
						<p class="w-full pt-2 text-xs font-bold">The optional email is used for resetting password</p>
					</div>
				</div>
				<div class="w-full space-y-3 border-t-2 border-galaxy_purple-650 px-10 py-6 text-sm">
					<div class="flex items-center space-x-3">
						<input
							class="h-4 w-4 rounded-full border-2 border-galaxy_purple-300"
							class:bg-neon_green={importLocalAchievements}
							type="checkbox"
							name="importLocalAchievements"
							aria-label="Import local achievements from tracker"
							bind:checked={importLocalAchievements}
						/>
						<p>Import local achievements from tracker</p>
					</div>
					<div class="flex items-center space-x-3">
						<input
							class="h-4 w-4 rounded-full border-2 border-galaxy_purple-300"
							class:bg-neon_green={agreeToTerms}
							type="checkbox"
							aria-label="Agree to Privacy Policy"
							required
							bind:checked={agreeToTerms}
						/>
						<p>
							I agree to the <a href="/privacy-policy" class="font-bold text-galaxy_purple-200 underline">Privacy Policy</a> of
							StarDB.GG <span class="text-neon_pink" class:hidden={agreeToTerms}>*</span>
						</p>
					</div>
					<div>
						<button
							class="mt-4 h-8 w-full rounded-md bg-purple_highlight text-sm font-bold hover:bg-galaxy_purple-500"
							type="submit"
							aria-label="Register"
						>
							Register
						</button>
					</div>
				</div>
			</form>
		</div>
		<p class="pl-2 text-off_white">
			Have an account already? <a href="/{$locale}/login" class="font-bold text-galaxy_purple-400 underline hover:text-galaxy_purple-300"
				>Login here!</a
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
				Sucessfully registered user!
			{:else}
				Failed to register user.
			{/if}
		</div>
	</div>
{/if}
