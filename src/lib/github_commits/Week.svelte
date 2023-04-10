<script lang="ts">
	import Day from './Day.svelte';

	export let week: Week;
	export let color: string;
	export let size: string;
	export let gap: number;

	const hasContributionDays = week && Array.isArray(week.contributionDays);
</script>

<div class="week" style="gap: {gap}px">
	{#if hasContributionDays}
		{#each week.contributionDays as day}
			{#if day && day.contributionCount}
				<Day {day} {color} {size} />
			{:else}
				<div class="day" style="width: {size}; height: {size};" />
			{/if}
		{/each}
	{:else}
		<p>Error: Invalid week data.</p>
	{/if}
</div>

<style>
	.week {
		display: flex;
		flex-direction: column;
		background-color: transparent;
	}
</style>
