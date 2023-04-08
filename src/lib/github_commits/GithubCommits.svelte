<script lang="ts">
	import { onMount } from 'svelte';
	import { load } from './getCommits';

	import Week from './Week.svelte';

	export let gitToken: string;
	export let color: string = '#bb35dc';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let background: string = 'rgba(255, 255, 255, .5)';

	let commitData: ContributionData;

	onMount(async () => {
		const allWeeks = await load(gitToken);
		commitData = allWeeks;
	});

	const sizeValues: Record<typeof size, string> = {
		small: '7px',
		medium: '12px',
		large: '20px'
	};
</script>

<div class="calendar" {...$$restProps} style="background: {background};">
	{#if commitData}
		{#each commitData.weeks as week}
			<Week {week} {color} size={sizeValues[size]} />
		{/each}
	{/if}
</div>

<style>
	.calendar {
		display: flex;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
		width: fit-content;
		padding: 10px;
		border-radius: 0.5rem;
	}
	.day {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		border-radius: 2px;
		opacity: 0;
		cursor: pointer;
		transition: transform 0.3s;
	}
	.day:hover {
		transform: scale(1.5);
	}
	.day[data-count='0'] {
		opacity: 0;
	}
	.day[data-count='1'] {
		opacity: 1;
		filter: brightness(0.4);
	}
	.day[data-count='2'] {
		opacity: 1;
		filter: brightness(0.6);
	}
	.day[data-count='3'] {
		opacity: 1;
		filter: brightness(0.8);
	}
	.day[data-count='4'] {
		opacity: 1;
		filter: brightness(1);
	}
	p {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: black;
		margin: 0;
		padding: 0;
	}
</style>
