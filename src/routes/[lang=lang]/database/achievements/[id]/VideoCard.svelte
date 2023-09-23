<script lang="ts">
	import { Youtube } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';

	export let videoURL: string;

	function formatURL(url: string) {
		const videoID = url.split('/').pop();
		return `https://www.youtube-nocookie.com/embed/${videoID}?rel=0&enablejsapi=1`;
	}
</script>

<BaseCard label="Video guide" title="Video Guide">
	<div slot="icon">
		<Youtube class="h-5 w-5 text-off_white" />
	</div>
    <div slot="content" class="p-1.5 sm:p-3">
        <!-- (pb-[56.25%]) 16:9 Aspect ratio  -->
			<div class="relative flex w-full pb-[56.25%]">
				<iframe
					class="absolute left-0 h-full w-full rounded-xl border-2 border-galaxy_purple-650"
					src={formatURL(videoURL)}
					title="Video guide on how to obtain the achievement"
					frameborder="0"
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
					allowfullscreen
				></iframe>
			</div>
    </div>
</BaseCard>
