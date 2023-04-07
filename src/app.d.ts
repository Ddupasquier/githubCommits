
interface ContributionDay {
	date: string;
	contributionCount: number;
}

interface ContributionWeek {
	contributionDays: ContributionDay[];
}

interface ContributionData {
	[x: string]: any;
	viewer: {
		contributionsCollection: {
			contributionCalendar: {
				totalContributions: number;
				weeks: ContributionWeek[];
			};
		};
	};
}