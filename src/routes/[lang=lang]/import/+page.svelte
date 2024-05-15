<script lang="ts">
	import PopUpMessage from '$components/PopUpMessage.svelte';
	import { MessageType } from '$types';

	const apiURL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	let input = '';
	let scannerStatus: '' | 'finished' | 'failed';

	async function postScannerImport() {
		try {
			const response = await fetch(`${apiURL}/users/me/import`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: input
			});

			if (response.ok) {
				scannerStatus = 'finished';
			} else {
				scannerStatus = 'failed';
			}
		} catch (error) {
			scannerStatus = 'failed';
		}
	}
</script>

<main class="flex h-full w-full justify-center px-2 pb-4 text-off_white sm:px-6 sm:pb-6 lg:px-20 xl:px-6">
	<div class="flex w-full flex-col py-2 md:w-main">
		<div class="flex items-center space-x-3 pb-3 pl-2 pt-4 sm:pt-6 md:space-x-4">
			<div class="">
				<h1 class="text-xl font-bold md:text-3xl">Import</h1>
				<h2 class="text-base text-galaxy_purple-150 md:text-lg">Import here.</h2>
			</div>
		</div>

		<div class="flex flex-col space-y-2">
			<span class="pt-8"
				>Import from <a class="text-purple_highlight" href="https://github.com/juliuskreutz/stardb-exporter" target="_blank"
					>Stardb Exporter</a
				></span
			>
			<p class="text-sm text-neon_pink">
				Warning: Importing from exporter will overwrite your current saved achievements and books.
			</p>
			<div class="flex gap-x-3 text-space_dark">
				<input type="text" bind:value={input} />
				<button
					class="text-white h-fit w-fit rounded-xl bg-galaxy_purple-650 px-4 py-2 text-sm font-bold hover:bg-galaxy_purple-600"
					on:click={postScannerImport}>Import</button
				>
			</div>
		</div>
	</div>
</main>

{#if scannerStatus === 'finished'}
	<PopUpMessage messageType={MessageType.SUCCESS} messageContent="Successfully imported!" />
{:else if scannerStatus === 'failed'}
	<PopUpMessage messageType={MessageType.FAIL} messageContent="Failed to import." />
{/if}
