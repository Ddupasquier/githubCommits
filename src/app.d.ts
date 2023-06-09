type ContributionDay = {
	date: string;
	contributionCount: number;
};

type Week = {
	contributionDays: ContributionDay[];
}

type CommitData = {
	weeks: Week[];
	totalContributions: number;
};

type ContributionCalendar = {
	totalContributions: number;
	weeks: Week[];
	commitData: CommitData;
};

type ContributionsCollection = {
	contributionCalendar: ContributionCalendar;
};

type Viewer = {
	contributionsCollection: ContributionsCollection;
};

type GraphQLResponseData = {
	viewer: Viewer;
};

type GraphQLResponse = {
	data: GraphQLResponseData;
};

interface RepositoryNode {
	name: string;
	url: string;
}

interface RepositoryData {
	nodes: RepositoryNode[];
}

interface ViewerData {
	repositories: RepositoryData;
}

interface RecentRepositoriesResponse {
	viewer: ViewerData;
}