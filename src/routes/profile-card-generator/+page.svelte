<script lang="ts">
	const PUBLIC_SERVER_API_URL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	import InformationCard from './InformationCard.svelte';
	import CardSettingsCard from './CardSettingsCard.svelte';
	import PopUpMessage from '$components/PopUpMessage.svelte';
	import { MessageType } from '$types';

	let cardImageSource = '';
	let cachedBlob: Blob | null = null;
	let generateCardPromise: Promise<void>;

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
			a.download = 'profile-card.png';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	}

	async function generateImage() {
		// Construct URL
		let params = new URLSearchParams({
			uid: playerUID,
			...(characterSelection && { characterselection: (characterSelection - 1).toString() }), // Index starts at 0
			...(primaryColor && { primarycolor: primaryColor.replace('#', '') }),
			...(secondaryColor && { secondarycolor: secondaryColor.replace('#', '') }),
			showuid: showUID.valueOf().toString()
			// add other optional parameters here
		});

		const cardGeneratorURL = `${PUBLIC_SERVER_API_URL}/generate?${params.toString()}`;

		const response = await fetch(cardGeneratorURL);
		if (!response.ok) {
			throw new Error();
		}

		cachedBlob = await response.blob();
		cardImageSource = window.URL.createObjectURL(cachedBlob);
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
		<div class="flex items-center space-x-3 pb-3 pl-2 md:space-x-4">
			<h1 class="text-xl font-bold md:text-3xl">Profile Card Generator</h1>
		</div>
		<div class="flex flex-col space-y-3 sm:space-y-4">
			<InformationCard />
			<CardSettingsCard bind:playerUID bind:showUID bind:characterSelection bind:primaryColor bind:secondaryColor />

			<div class="flex gap-x-2.5 pl-2 text-lg font-bold">
				<button
					class="h-10 rounded-full border-2 border-dim_green bg-neon_green px-3 text-galaxy_purple-800 sm:hover:scale-102"
					on:click={() => (generateCardPromise = generateImage())}>Generate</button
				>
				{#if cachedBlob}
					<button
						class="h-10 rounded-full border-2 border-dim_blue bg-neon_blue px-3 text-galaxy_purple-800 sm:hover:scale-102"
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
