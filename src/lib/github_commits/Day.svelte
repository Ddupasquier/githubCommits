<script lang="ts">
	import { weekday, formatDate, getDataCount } from './utils';

	export let color: string;
	export let size: string;
	export let day: ContributionDay;
</script>

<div class="day-wrapper">
	<div
		class="day"
		style="background: {color}; width: {size}; height: {size};"
		data-count={getDataCount(day.contributionCount)}
	/>
	<div class="tooltip">
		{day.contributionCount} contributions on {weekday(day.date)}, {formatDate(day.date)}
	</div>
</div>

<style>
	.day-wrapper {
		position: relative;
		display: inline-block;
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

	.day-wrapper:hover .day {
		transform: scale(1.5);
		z-index: 2;
	}
	.day[data-count='0'] {
		opacity: 0;
	}
	.day[data-count='1'] {
		opacity: 1;
		filter: brightness(0.3);
	}
	.day[data-count='2'] {
		opacity: 1;
		filter: brightness(0.4);
	}
	.day[data-count='3'] {
		opacity: 1;
		filter: brightness(0.5);
	}
	.day[data-count='4'] {
		opacity: 1;
		filter: brightness(0.6);
	}

	.day[data-count='5'] {
		opacity: 1;
		filter: brightness(0.7);
	}

	.day[data-count='6'] {
		opacity: 1;
		filter: brightness(0.8);
	}

	.day[data-count='7'] {
		opacity: 1;
		filter: brightness(0.9);
	}

	.day[data-count='8'] {
		opacity: 1;
		filter: brightness(1);
	}

	.tooltip {
		display: none;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 600;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		bottom: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
		z-index: 3;
	}

	.day-wrapper:hover .tooltip {
		display: block;
	}
</style>
