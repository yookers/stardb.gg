<script lang="ts">
	import InstructionCard from './InstructionCard.svelte';
	import PopUpMessage from '$components/PopUpMessage.svelte';
	import { MessageType } from '$types';
	import { goto } from '$app/navigation';
	import { locale } from '$store';

	const apiURL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	let warpURL: string;
	let importStatus: 'pending' | 'running' | 'finished' | 'failed';
	let gachaType: 'standard' | 'departure' | 'special' | 'lc';
	let warpCount: number;
	let pollingInterval: NodeJS.Timeout;

	async function postWarpsImport(url: string) {
		try {
			const response = await fetch(`${apiURL}/warps-import`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url })
			});
			if (response.ok) {
				const data = await response.json();
				startPolling(data.uid);
			} else {
				console.error('Failed to start import:', response.status);
			}
		} catch (error) {
			console.error('Error posting warps import:', error);
		}
	}

	function startPolling(uid: number) {
		let uidsString = localStorage.getItem('uids');

		if (uidsString == null) {
			uidsString = '[]';
		}

		const uids = new Set(JSON.parse(uidsString));

		uids.add(uid);

		localStorage.setItem('uids', JSON.stringify(Array.from(uids)));

		pollingInterval = setInterval(async () => {
			try {
				const response = await fetch(`${apiURL}/warps-import/${uid}`);
				const data = await response.json();

				if (response.ok) {
					importStatus = data.status;
					gachaType = data.gacha_type;
					warpCount = data[gachaType];

					if (importStatus === 'finished') {
						clearInterval(pollingInterval);
						goto(`/warps/${uid}`);
						// Handle the finished state, e.g., display results
					}
				} else {
					console.error('Failed to get import status:', response.status);
				}
			} catch (error) {
				console.error('Error polling warps import:', error);
			}
		}, 1000); // Poll every 1 second
	}
</script>

<svelte:head>
	<title>Warp Tracker for Honkai: Star Rail | stardb.gg</title>
	<meta
		name="description"
		content="The best warp tracker for Honkai: Star Rail. Import your warp history and view your pity counter."
	/>
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stardb.gg/warp-tracker" />
	<meta property="og:title" content="Warp Tracker for Honkai: Star Rail | stardb.gg" />
	<meta
		property="og:description"
		content="The best warp tracker for Honkai: Star Rail. Import your warp history and view your pity counter."
	/>
	<meta property="og:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://stardb.gg/warp-tracker" />
	<meta name="twitter:title" content="Warp Tracker for Honkai: Star Rail | stardb.gg" />
	<meta
		name="twitter:description"
		content="The best warp tracker for Honkai: Star Rail. Import your warp history and view your pity counter."
	/>
	<meta name="twitter:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />

	<link rel="canonical" href="https://stardb.gg/warp-tracker" />
</svelte:head>

<main class="flex h-full w-full justify-center px-2 pb-4 text-off_white sm:px-6 sm:pb-6 lg:px-20 xl:px-6">
	<div class="flex w-full flex-col py-2 md:w-main">
		<div class="flex items-center space-x-3 pb-3 pl-2 pt-4 sm:pt-6 md:space-x-4">
			<div class="">
				<h1 class="text-xl font-bold md:text-3xl">Warp Tracker</h1>
				<h2 class="text-base text-galaxy_purple-150 md:text-lg">Import your warps here.</h2>
			</div>
		</div>
		<div class="flex flex-col space-y-2">
			<InstructionCard />

			<span>Import from PowerShell</span>
			<div class="flex gap-x-3">
				<input class="w-full bg-off_white text-galaxy_purple-700" type="text" required bind:value={warpURL} />
				<button
					class="text-white h-fit w-fit rounded-xl bg-galaxy_purple-650 px-4 py-2 text-sm font-bold hover:bg-galaxy_purple-600"
					on:click={() => postWarpsImport(warpURL)}>Import</button
				>
			</div>
		</div>
	</div>
</main>

{#if importStatus === 'pending'}
	<PopUpMessage
		messageType={MessageType.LOADING}
		messageContent="Currently importing {warpCount} {gachaType} warps... Please wait."
	/>
{:else if importStatus === 'finished'}
	<PopUpMessage messageType={MessageType.SUCCESS} messageContent="Successfully imported warps!" />
{:else if importStatus === 'failed'}
	<PopUpMessage messageType={MessageType.ERROR} messageContent="Failed to import warps. Please try again." />
{/if}
