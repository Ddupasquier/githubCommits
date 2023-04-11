<script lang="ts">
	import { onMount } from 'svelte';
	import { load } from './service';
	import { getDisplayedMonths } from './utils';

	import Week from './Week.svelte';

	export let gitToken!: string;
	export let color: string = 'rgba(187, 53, 220)';
	export let size: 'small' | 'medium' | 'large' | number = 'medium';
	export let background: string = 'rgba(187, 53, 220, .1)';
	export let gap: number = 2;
	export let hover: boolean = false;
	export let key: boolean = true;
	export let months: boolean = true;
	export let weekdays: boolean = true;

	let commitData: CommitData;
	let error: string | null = null;
	let displayedMonths = getDisplayedMonths();

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

	const sizeValues: Record<string, string> = {
		small: '7px',
		medium: '12px',
		large: '20px'
	};

	$: sizeInPixels = typeof size === 'number' ? `${size}px` : sizeValues[size];
	$: dayStyles = `background: ${color}; width: ${sizeInPixels}; height: ${sizeInPixels};`;
	$: keyStyles = `gap: ${gap}px`;
	$: calendarStyles = `gap: ${gap}px;`;
	$: weekdaysStyles = `gap: ${sizeInPixels};`;
	$: wrapperStyles = `background: ${background}; border-radius: ${gap}px;`;
</script>

<div class="calendar-wrapper" style={wrapperStyles} {...$$restProps}>
	{#if weekdays}
		<div class="weekdays" style={weekdaysStyles}>
			<span> mon </span>
			<span> wed </span>
			<span> fri </span>
		</div>
	{/if}
	<div>
		{#if months}
			<div class="months">
				{#each displayedMonths as month}
					<div class="month">{month}</div>
				{/each}
			</div>
		{/if}
		<div
			class="calendar"
			style={calendarStyles}
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
					<Week {week} {color} size={sizeInPixels} {gap} />
				{/each}
			{/if}
		</div>
		{#if key}
			<div class="key" style={keyStyles}>
				Less
				<div class="day" style={dayStyles} data-count="1" />
				<div class="day" style={dayStyles} data-count="2" />
				<div class="day" style={dayStyles} data-count="3" />
				<div class="day" style={dayStyles} data-count="4" />
				<div class="day" style={dayStyles} data-count="5" />
				<div class="day" style={dayStyles} data-count="6" />
				<div class="day" style={dayStyles} data-count="7" />
				<div class="day" style={dayStyles} data-count="8" />
				More
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use 'sass:math';

	@mixin font-style {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 600;
		font-size: 12px;
		text-transform: uppercase;
	}

	.calendar {
		display: flex;
		grid-template-columns: repeat(7, 1fr);
		width: fit-content;
		transition: gap 0.3s ease-in-out;
	}

	.calendar-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: fit-content;
		height: fit-content;
		padding: 0.4rem 0.4rem;
	}

	.key {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0.4rem 0.4rem;
		box-sizing: border-box;
		width: 100%;
		@include font-style;
	}

	.months {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0.4rem 0.4rem;
		box-sizing: border-box;
		@include font-style;
	}

	.weekdays {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		padding: 0.2rem 0.4rem 0.2rem 0;
		@include font-style;
	}

	.key .day {
		border-radius: 2px;
	}

	.day {
		@for $i from 1 through 8 {
			&[data-count='#{$i}'] {
				@if $i == 1 {
					opacity: 0;
				} @else {
					opacity: 1;
					filter: brightness(#{0.5 + math.div($i - 2, 8)});
				}
			}
		}
	}
</style>
