<script lang="ts">
	import { onMount } from 'svelte';

	import { X } from 'lucide-svelte';
	import { locale } from '$store';

	let uid: number | null;
	let uids: Set<number> = new Set([]);

	function addUid() {
		if (uid == null || isNaN(uid)) {
			uid = null;
			return;
		}

		let uidsString = localStorage.getItem('uids');

		if (uidsString == null) {
			uidsString = '[]';
		}

		uids = new Set(JSON.parse(uidsString));

		uids.add(uid);

		localStorage.setItem('uids', JSON.stringify(Array.from(uids)));

		uid = null;
	}

	function deleteUid(uid: number) {
		console.log(uids);

		uids.delete(uid);
		uids = uids;

		localStorage.setItem('uids', JSON.stringify(Array.from(uids)));
	}

	onMount(() => {
		let uidsString = localStorage.getItem('uids');

		if (uidsString == null) {
			uidsString = '[]';
		}

		uids = new Set(JSON.parse(uidsString));
	});
</script>

<svelte:head>
	<title></title>
	<meta name="description" content="" />
	<link rel="canonical" href="" />
</svelte:head>

<main class="flex h-full w-full justify-center px-2 pb-4 text-off_white sm:px-6 sm:pb-6 lg:px-20 xl:px-6">
	<div class="flex w-full flex-col py-2 md:w-main">
		<div class="flex items-center space-x-3 pb-3 pl-2 pt-4 sm:pt-6 md:space-x-4">
			<div class="">
				<h1 class="text-xl font-bold md:text-3xl">Warp Viewer</h1>
				<h2 class="text-base text-galaxy_purple-150 md:text-lg">Add UID shortcuts below</h2>
			</div>
		</div>
		<div class="flex flex-col space-y-3 sm:space-y-4">
			{#each uids as uid}
				<p class="flex items-center space-x-4">
					<span>{uid}:</span>
					<a class="underline" href="/warps/{uid}" target="_blank">Viewer</a>
					<a class="underline" href="/{$locale}/warp-viewer/{uid}" target="_blank">Beta Viewer</a>
					<button on:click={() => deleteUid(uid)}><X /></button>
				</p>
			{/each}
			<div class="flex gap-x-3">
				<input class="h-8 w-full bg-off_white text-galaxy_purple-700" type="number" required bind:value={uid} />
				<button
					class="text-white w-8 rounded-xl bg-galaxy_purple-650 px-4 py-2 text-sm font-bold hover:bg-galaxy_purple-600"
					on:click={() => addUid()}
				></button>
			</div>
		</div>
	</div>
</main>
