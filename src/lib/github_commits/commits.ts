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

const isGraphQLResponse = (data: any): data is GraphQLResponse => {
    return (
        data &&
        data.data &&
        data.data.viewer &&
        data.data.viewer.contributionsCollection &&
        data.data.viewer.contributionsCollection.contributionCalendar &&
        Array.isArray(data.data.viewer.contributionsCollection.contributionCalendar.weeks) &&
        typeof data.data.viewer.contributionsCollection.contributionCalendar.totalContributions === 'number'
    );
}

export const loadCommits = async (gitToken: string): Promise<CommitData> => {
    const response = await fetch(GITHUB_GRAPHQL_API, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${gitToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!isGraphQLResponse(responseData)) {
        throw new Error('Invalid GraphQL response');
    }

    const contributionCalendar = responseData.data.viewer.contributionsCollection.contributionCalendar;
    const weeks = contributionCalendar.weeks;
    const totalContributions = contributionCalendar.totalContributions;

    let weeksArray: Week[] = [];

    for (const week of weeks) {
        weeksArray.push(week);
    }

    return { weeks: weeksArray, totalContributions };
}





