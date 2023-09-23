<script lang="ts">
	import { Pencil, ArrowUpRight } from 'lucide-svelte';
    import BaseCard from '$components/BaseCard.svelte';

	let showCard = true;
</script>

<BaseCard label="Information" title="Information">
	<div slot="icon">
		<Pencil class="h-5 w-5 text-off_white" />
	</div>
    <div slot="content" class="pt-4 pb-3">
        <div class="flex flex-col space-y-3 text-sm sm:text-base">
            <div class="space-y-3 border-b-2 border-galaxy_purple-600 px-6 pb-3">
                <p>
                    This list caters to <span class="font-bold">F2P</span> and
                    <span class="font-bold">Light Spenders</span> - 5-star units are displayed at

                    <span class="font-bold">Eidolon 0</span>, and 4-star units at <span class="font-bold">Eidolon 4</span>.
                </p>
                <div class="flex">
                    <a
                        class="group flex items-center space-x-1 font-bold text-galaxy_purple-250 underline hover:text-galaxy_purple-350"
                        href="/tier-list/vote"
                    >
                        <p>Click here to vote</p>
                        <ArrowUpRight class="mt-0.5 h-5 w-5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
            <div class="space-y-3 px-6">
                <p>
                    <span class="font-bold italic">Variance:</span><br /> A high variance suggests a broad range of opinions regarding a
                    character, whereas a low variance indicates a general consensus.
                </p>
                <p>
                    <span class="font-bold italic">95% Confidence Interval:</span><br /> This range indicates where one can be 95% confident
                    that the character's true rank lies. For example, if a character has a rating of +/- 2, their realistic rank could be
                    between 'S' and 'B'.
                </p>
            </div>
        </div>
    </div>
</BaseCard>
