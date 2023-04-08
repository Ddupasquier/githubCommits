<script lang="ts">
	import { Popover } from 'mysvelte-ui';
	import { weekday } from './utils';
	export let week: OrganizedContributionWeek;
	export let color: string;
	export let size: string;
</script>

<div class="week">
	{#each week.days as day}
		{#if day && day.contributionCount}
			<Popover direction="top">
				<div
					slot="trigger"
					class="day"
					style="background: {color}; width: {size}; height: {size};"
				/>
				<p slot="content">
					<span class="tooltip">{day.contributionCount} commits</span>
					{day.date} ({weekday(day.date)})
				</p>
			</Popover>
		{:else}
			<div class="day" style="width: {size}; height: {size};" />
		{/if}
	{/each}
</div>

<style>
	.week {
		display: grid;
		grid-template-rows: repeat(7, 1fr);
		grid-gap: 4px;
		background-color: transparent;
	}
</style>
