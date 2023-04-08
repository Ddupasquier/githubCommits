interface ContributionDay {
	date: string;
	contributionCount: number;
}

interface ContributionWeek {
	contributionDays: ContributionDay[];
}

interface OrganizedContributionWeek {
	days: (ContributionDay | null)[];
	contributionCount: number;
}


interface ContributionData {
	totalContributions: number;
	weeks: OrganizedContributionWeek[];
}
