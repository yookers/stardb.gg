<script lang="ts">
	import { ListFilter } from 'lucide-svelte';
    import BaseCard from '$components/BaseCard.svelte';

	export let showDetailed: boolean;
	let showCard = true;
</script>

<BaseCard label="Filter" title="Filter">
	<div slot="icon">
		<ListFilter class="h-5 w-5 text-off_white" />
	</div>
    <div slot="content" class="px-5 pt-4 pb-3">
        <div class="flex items-center space-x-2.5 font-bold">
            <button
                class="relative flex h-8 w-14 flex-shrink-0 select-none items-center rounded-full border-2 text-center font-bold
                {showDetailed
                    ? 'border-galaxy_purple-300 bg-galaxy_purple-550'
                    : 'border-galaxy_purple-300 bg-galaxy_purple-700'}"
                aria-label="{showDetailed ? 'Hide' : 'Show'} completed achievements"
                on:click={() => (showDetailed = !showDetailed)}
            >
                <span
                    class="absolute flex h-6 w-6 items-center justify-center rounded-full bg-galaxy_purple-200 text-galaxy_purple-700 duration-300
                {showDetailed ? 'left-[26px]' : 'left-0.5'}"
                >
                </span>
            </button>
            <p class="pr-4" class:text-galaxy_purple-300={!showDetailed}>Show details</p>
        </div>
    </div>
</BaseCard>
