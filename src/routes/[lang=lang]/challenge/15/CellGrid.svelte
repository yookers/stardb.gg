<script lang="ts">
	import { X, Check } from 'lucide-svelte';
	enum CellState {
		BLANK,
		X,
		CHECK
	}

	let grid = Array.from({ length: 5 }, () => Array(5).fill(CellState.BLANK));

	function toggleCell(i: number, j: number) {
		if (grid[i][j] === CellState.BLANK) {
			grid[i][j] = CellState.X;
		} else if (grid[i][j] === CellState.X) {
			grid[i][j] = CellState.CHECK;
		} else {
			grid[i][j] = CellState.BLANK;
		}
		grid = [...grid];
	}
</script>

<div class="grid h-full grid-cols-5 grid-rows-5 divide-x divide-y bg-galaxy_purple-350">
	{#each grid as row, i}
		{#each row as cell, j}
			<button
				class="col-span-1 row-span-1 flex h-full w-full items-center justify-center {i === 0 ? 'border-l border-t' : ''}"
				on:click={() => toggleCell(i, j)}
			>
				{#if cell === CellState.X}
					<X class="h-7 w-7 bg-neon_pink" />
				{:else if cell === CellState.CHECK}
					<Check class="h-7 w-7 bg-neon_green" />
				{/if}
			</button>
		{/each}
	{/each}
</div>
