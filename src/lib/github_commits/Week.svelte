<script lang="ts">
	import Day from './Day.svelte';

	export let week: OrganizedContributionWeek;
	export let color: string;
	export let size: string;
    export let gap: number;
</script>

<div class="week" style="gap: {gap}px">
	{#each week.days as day}
		{#if day && day.contributionCount}
			<Day {day} {color} {size} />
		{:else}
			<div class="day" style="width: {size}; height: {size};" />
		{/if}
	{/each}
</div>

<style>
	.week {
		display: flex;
        flex-direction: column;
		background-color: transparent;
	}
</style>
