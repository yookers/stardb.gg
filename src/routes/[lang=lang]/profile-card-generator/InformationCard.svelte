<script lang="ts">
	import { Pencil } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';

	let showCard = true;
</script>

<BaseCard label="Information" title="Information">
	<div slot="icon">
		<Pencil class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="pb-2 pt-4">
		<div class="flex flex-col space-y-3 text-sm sm:text-base">
			<div class="space-y-3 border-b-2 border-galaxy_purple-600 px-6 pb-3">
				<p>
					Our card generator syncs with the game's API to reflect the current support characters on your account, offering you a
					profile card that's always up to date.
				</p>
			</div>
			<div class="space-y-3 px-6">
				<p>
					<span class="font-bold">Please note:</span> Account changes may take up to 5 minutes to reflect due to API synchronization.
				</p>
			</div>
		</div>
	</div>
</BaseCard>
