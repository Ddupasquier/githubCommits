<script lang="ts">
	import { Popover } from 'mysvelte-ui';
	import { onMount } from 'svelte';

	export let gitToken: string;
	export let color: string = '#bb35dc';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let background: string = 'rgba(255, 255, 255, .5)';

	let commitData: ContributionData;
	let numWeeks: number | string = 0;

	const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
	const query = `
	query {
		viewer {
			contributionsCollection {
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							date
							contributionCount
						}
					}
				}
			}
		}
	}
	`;

	async function load(): Promise<ContributionData> {
		try {
			const token = gitToken;
			const headers = {
				Authorization: `bearer ${token}`,
				'Content-Type': 'application/json'
			};

			const response = await fetch(GITHUB_GRAPHQL_API, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ query })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();
			const data = json.data;

			if (data) {
				const weeks = data.viewer.contributionsCollection.contributionCalendar.weeks;
				const dailyContributions = weeks.flatMap((week: ContributionWeek) => week.contributionDays);

				return {
					viewer: {
						contributionsCollection: {
							contributionCalendar: {
								totalContributions:
									data.viewer.contributionsCollection.contributionCalendar.totalContributions,
								weeks: dailyContributions
							}
						}
					}
				};
			} else {
				throw new Error('Failed to load data');
			}
		} catch (error) {
			console.error('Error fetching commit history data:', error);
			return {
				viewer: {
					contributionsCollection: {
						contributionCalendar: {
							totalContributions: 0,
							weeks: []
						}
					}
				}
			};
		}
	}

	onMount(async () => {
		const data = await load();
		console.log(data);
		commitData = data;
		numWeeks = getNumWeeks(commitData.dailyContributions);
	});

	const sizeValues: Record<typeof size, string> = {
		small: '7px',
		medium: '12px',
		large: '20px'
	};

	function getNumWeeks(dailyContributions: string | any[]) {
		return Math.ceil(dailyContributions.length / 7);
	}
</script>

<div
	class="calendar"
	style="grid-template-columns: repeat({numWeeks}, 1fr); background-color: {background}"
	{...$$restProps}
>
	{#if commitData}
		{#each commitData.dailyContributions as { date, contributionCount }, i}
			<Popover direction="top">
				<div
					slot="trigger"
					class="day"
					data-count={Math.min(contributionCount, 4)}
					style="grid-row: {(i % 7) + 1}; grid-column: {Math.floor(i / 7) +
						1}; background: {color}; width: {sizeValues[size]}; height: {sizeValues[size]};"
				/>
				<p slot="content">
					<span class="tooltip">{contributionCount} commits</span>
					{date}
				</p>
			</Popover>
		{/each}
	{/if}
</div>

<style>
	.calendar {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(7, 1fr);
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
		transform: scale(1.1);
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
