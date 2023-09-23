<script lang="ts">
    import BaseCard from '$components/BaseCard.svelte';
	import { LineChart, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let statisticsData: any[];

	// Statistics carousel
	let index = 0;

	function nextCard() {
		if (index < statisticsData.length - 1) index++;
		else index = 0;
	}

	function prevCard() {
		if (index > 0) index--;
		else index = statisticsData.length - 1;
	}
</script>

<BaseCard label="Statistics" title="Statistics">
	<div slot="icon">
		<LineChart class="h-5 w-5 text-off_white" />
	</div>
    <div slot="content" class="pt-4 pb-3">
        <div class="relative flex w-full items-center justify-center">
            <button class="absolute left-8 flex h-10 w-10 items-center justify-center" on:click={prevCard}>
                <ChevronLeft class="h-6 w-6 text-off_white lg:h-8 lg:w-8" />
            </button>

            <div
                class="flex flex-col text-center font-bold"
                class:text-galaxy_purple-350={statisticsData[index].region === 'Total'}
                class:text-neon_yellow={statisticsData[index].region === 'NA'}
                class:text-neon_pink={statisticsData[index].region === 'EU'}
                class:text-neon_green={statisticsData[index].region === 'ASIA'}
                class:text-neon_blue={statisticsData[index].region === 'CN'}
            >
                {#key statisticsData[index].region}
                    <p class="pb-1 text-6xl md:text-7xl" in:fly={{ y: 10, duration: 300, easing: cubicInOut }}>
                        {statisticsData[index].count}
                    </p>
                {/key}
                <p class="line-clamp-1 text-xl">
                    {statisticsData[index].region} <span class="font-medium text-off_white">players</span>
                </p>
            </div>

            <button class="absolute right-8 flex h-10 w-10 items-center justify-center" on:click={nextCard}>
                <ChevronRight class="h-6 w-6 text-off_white lg:h-8 lg:w-8" />
            </button>
        </div>
    </div>
</BaseCard>
