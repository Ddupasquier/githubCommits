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

export async function load(gitToken: string): Promise<ContributionData> {
    try {
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

        const { data } = await response.json();

        const organizeWeeks = (dailyContributions: ContributionDay[]): OrganizedContributionWeek[] => {
            const weeks: OrganizedContributionWeek[] = [];
            let currentWeek: (ContributionDay | null)[] = Array(7).fill(null);
            let currentWeekCount = 0;

            for (const day of dailyContributions) {
                const dateObj = new Date(day.date);
                const dayOfWeek = dateObj.getDay();

                currentWeek[dayOfWeek] = day;
                currentWeekCount += day.contributionCount;

                if (dayOfWeek === 6) {
                    weeks.push({ days: currentWeek, contributionCount: currentWeekCount });
                    currentWeek = Array(7).fill(null);
                    currentWeekCount = 0;
                }
            }

            if (currentWeek.some(day => day !== null)) {
                weeks.push({ days: currentWeek, contributionCount: currentWeekCount });
            }

            return weeks;
        };

        if (data) {
            const weeks = data.viewer.contributionsCollection.contributionCalendar.weeks;
            const dailyContributions = weeks.flatMap((week: ContributionWeek) => week.contributionDays);
            const organizedWeeks = organizeWeeks(dailyContributions);

            return {
                totalContributions: data.viewer.contributionsCollection.contributionCalendar.totalContributions,
                weeks: organizedWeeks,
            };
        } else {
            throw new Error('Failed to load data');
        }
    } catch (error) {
        console.error('Error fetching commit history data:', error);
        return {
            totalContributions: 0,
            weeks: [],
        };
    }
}
