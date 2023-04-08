<script lang="ts">
	import { getDataCount, formatDate } from './utils';
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
					data-count={getDataCount(day.contributionCount)}
				/>
				<p slot="content">
					<!-- <span class="tooltip">{day.contributionCount} commits</span>
					{day.date} ({weekday(day.date)}) -->
                    <!-- num contributions made on sunday of this date -->
                    {day.contributionCount} contributions on {weekday(day.date)}, {formatDate(day.date)}
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
		filter: brightness(.3);
	}
	.day[data-count='2'] {
		opacity: 1;
		filter: brightness(.4);
	}
	.day[data-count='3'] {
		opacity: 1;
		filter: brightness(.5);
	}
	.day[data-count='4'] {
		opacity: 1;
		filter: brightness(.6);
	}

    .day[data-count='5'] {
        opacity: 1;
        filter: brightness(.7);
    }

    .day[data-count='6'] {
        opacity: 1;
        filter: brightness(.8);
    }

    .day[data-count='7'] {
        opacity: 1;
        filter: brightness(.9);
    }

    .day[data-count='8'] {
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
