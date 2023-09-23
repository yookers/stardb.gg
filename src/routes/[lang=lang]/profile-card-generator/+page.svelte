<script lang="ts">
	const PUBLIC_SERVER_API_URL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	import InformationCard from './InformationCard.svelte';
	import CardSettingsCard from './CardSettingsCard.svelte';
	import PopUpMessage from '$components/PopUpMessage.svelte';
	import { MessageType } from '$types';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let cardImageSource = '';
	let cachedBlob: Blob | null = null;
	let generateCardPromise: Promise<void>;
	let isGeneratingCard = false;

	let playerUID = '';
	let showUID = true;
	let characterSelection = 1;
	let primaryColor = '';
	let secondaryColor = '';

	async function downloadImage() {
		if (cachedBlob) {
			const url = window.URL.createObjectURL(cachedBlob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'stardb-profile-card.png';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	}

	async function generateImage() {
		if (isGeneratingCard) {
			return; // Exit the function if a request is already in progress
		}

		// Check if either primaryColor or secondaryColor is provided but not both
		if ((primaryColor && !secondaryColor) || (!primaryColor && secondaryColor)) {
			throw new Error();
		}

		isGeneratingCard = true;

		let params = new URLSearchParams({
			uid: playerUID,
			...(characterSelection && { characterselection: (characterSelection - 1).toString() }), // Index starts at 0
			...(primaryColor && { primarycolor: primaryColor.replace('#', '') }),
			...(secondaryColor && { secondarycolor: secondaryColor.replace('#', '') }),
			showuid: showUID.valueOf().toString()
		});

		const cardGeneratorURL = `${PUBLIC_SERVER_API_URL}/generate?${params.toString()}`;

		try {
			const response = await fetch(cardGeneratorURL);
			if (!response.ok) {
				throw new Error();
			}
			cachedBlob = await response.blob();
			cardImageSource = window.URL.createObjectURL(cachedBlob);
		} catch (error) {
			throw new Error();
		} finally {
			isGeneratingCard = false; // Reset the flag after the request is complete or if it failed
		}
	}
</script>

<svelte:head>
	<title>Profile Card Generator - Honkai: Star Rail - StarDB.GG</title>
	<meta
		name="description"
		content="Generate a personalized card of your account on Honkai: Star Rail. Show off your units with their stats and relics."
	/>
	<link rel="canonical" href="" />
</svelte:head>

<main class="flex h-full w-full justify-center px-2 pb-4 pt-6 text-off_white sm:px-6 sm:pb-6 lg:px-20 xl:px-6">
	<div class="flex w-full flex-col md:w-main">
		<h1
			class="pb-2 pl-2 pt-4 text-xl font-bold sm:pb-3 md:text-3xl"
			in:fly={{ y: 20, duration: 300, delay: 150, easing: cubicInOut }}
		>
			Profile Card Generator
		</h1>
		<h2 class="pb-2 pl-2 text-xs sm:pb-3 md:text-sm" in:fly={{ y: 20, duration: 300, delay: 250, easing: cubicInOut }}>
			Welcome to <span class="font-bold">StarDB.GG's Profile Card Generator</span>, a tool that sets a new standard for
			aesthetic player profiles. Simply input your 9-digit UID and if you wish to personalize your card, add in a primary and
			secondary color in hex format. Want more privacy? You can also opt to hide your UID on the card.
		</h2>
		<div class="flex flex-col space-y-3 sm:space-y-4">
			<InformationCard />
			<CardSettingsCard bind:playerUID bind:showUID bind:characterSelection bind:primaryColor bind:secondaryColor />

			<div class="flex gap-x-2.5 pl-2 text-lg font-bold">
				<button
					class="h-10 rounded-full border-2 border-dim_green bg-dim_green px-3 text-galaxy_purple-800 hover:bg-neon_green sm:hover:translate-y-0.5"
					on:click={() => (generateCardPromise = generateImage())}
					disabled={isGeneratingCard}>Generate</button
				>
				{#if cachedBlob}
					<button
						class="h-10 rounded-full border-2 border-dim_blue bg-dim_blue px-3 text-galaxy_purple-800 hover:bg-neon_blue sm:hover:translate-y-0.5"
						on:click={downloadImage}>Download</button
					>
				{/if}
			</div>

			{#if cardImageSource}
				<div class="border-2 border-galaxy_purple-750 bg-galaxy_purple-800 p-2">
					<img src={cardImageSource} alt="{playerUID}'s profile card" />
				</div>
			{/if}
		</div>
	</div>
</main>

{#if generateCardPromise}
	{#await generateCardPromise}
		<PopUpMessage messageType={MessageType.LOADING} messageContent={`Generating card ...`} />
	{:then}
		<PopUpMessage messageType={MessageType.SUCCESS} messageContent={`Successfully generated!`} />
	{:catch}
		<PopUpMessage messageType={MessageType.FAIL} messageContent={`Failed to generate card.`} />
	{/await}
{/if}
