<script lang="ts">
	import { onMount } from 'svelte';
	import { load } from './service';

	import Week from './Week.svelte';

	export let gitToken!: string;
	export let color: string = 'rgba(187, 53, 220)';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let background: string = 'rgba(187, 53, 220, .1)';
	export let gap: number = 2;
	export let hover: boolean = false;

	let commitData: CommitData;
	let error: string | null = null;

	onMount(async () => {
		try {
			const data = await load(gitToken);
			commitData = data;
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred.';
			}
		}
	});

	const sizeValues: Record<typeof size, string> = {
		small: '7px',
		medium: '12px',
		large: '20px'
	};
</script>

<div
	class="calendar"
	{...$$restProps}
	style="background: {background}; gap: {gap}px; border-radius: {gap}px"
	on:mouseenter={() => {
		if (hover) {
			gap = gap + 2;
		}
	}}
	on:mouseleave={() => {
		if (hover) {
			gap = gap - 2;
		}
	}}
>
	{#if error}
		<p>Error: {error}</p>
	{:else if commitData}
		{#each commitData.weeks as week}
			<Week {week} {color} size={sizeValues[size]} {gap} />
		{/each}
	{/if}
</div>

<style>
	.calendar {
		display: flex;
		grid-template-columns: repeat(7, 1fr);
		width: fit-content;
		padding: 5px;
		transition: gap 0.3s ease-in-out;
	}
</style>
