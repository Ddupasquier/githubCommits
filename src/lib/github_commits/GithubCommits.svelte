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
		padding: 5px;
		border-radius: 0.5rem;
	}
</style>
