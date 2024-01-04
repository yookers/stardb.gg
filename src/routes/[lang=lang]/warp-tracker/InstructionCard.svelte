<script lang="ts">
	import { Pencil, ArrowUpRight, Clipboard } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';

	let showCard = true;

	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<BaseCard label="Instructions" title="Instructions">
	<div slot="icon">
		<Pencil class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="pb-3 pt-4">
		<div class="flex flex-col space-y-3 text-sm sm:text-base">
			<div class="space-y-3 px-6 pb-3">
				<ol class="space-y-3">
					<li>
						<span class="font-bold">Step 1:</span> Verify that your UID is listed on the StarDB Leaderboard.
					</li>
					<li>
						<span class="font-bold">Step 2:</span> Start Honkai: Star Rail on your PC and navigate to your warp records.
					</li>
					<li>
						<span class="font-bold">Step 3:</span> Open Windows PowerShell. You can do this by searching for 'PowerShell' in the
						Windows search bar.
					</li>
					<li>
						<span class="font-bold">Step 4:</span> Copy and paste the following command into PowerShell and press enter:
						<div class="space-y-2">
							<p>For Global Server players, copy and execute the following command:</p>
							<div class="flex justify-between w-80 rounded-sm bg-galaxy_purple-250 py-2 pl-3 font-mono text-sm text-galaxy_purple-800">
								<p>iwr -useb stardb.gg/warp | iex</p>
								<button class="mr-3" on:click={() => copyToClipboard('iwr -useb stardb.gg/warp | iex')}>
									<Clipboard class="h-5 w-5"></Clipboard>
								</button>
							</div>

                            <p>For CN Server players, copy and execute the following command:</p>
                            <div class="flex justify-between w-80 rounded-sm bg-galaxy_purple-250 py-2 pl-3 font-mono text-sm text-galaxy_purple-800">
								<p>iwr -useb stardb.gg/warp_cn | iex</p>
								<button class="mr-3" on:click={() => copyToClipboard('iwr -useb stardb.gg/warp_cn | iex')}>
									<Clipboard class="h-5 w-5"></Clipboard>
								</button>
							</div>
						</div>
					</li>
                    <li>
                        <span class="font-bold">Step 5:</span> Paste the output below. It may take a few minutes for your warps to be imported.
                    </li>
				</ol>
			</div>
		</div>
	</div>
</BaseCard>
