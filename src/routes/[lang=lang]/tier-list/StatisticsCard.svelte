<script lang="ts">
	import { LineChart } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';

	export let totalVotes: number;
	let showCard = false;
</script>

<BaseCard label="Statistics" title="Statistics">
	<div slot="icon">
		<LineChart class="h-5 w-5 text-off_white" />
	</div>
    <div slot="content" class="pt-4 pb-3">
        <div class="flex flex-col items-center justify-center font-bold">
            <p class="pb-1 text-6xl text-galaxy_purple-350 md:text-7xl">{totalVotes}</p>
            <p class="line-clamp-1 text-xl font-medium">
                <span class="font-bold text-galaxy_purple-350">Total</span> voters
            </p>
        </div>
    </div>
</BaseCard>
