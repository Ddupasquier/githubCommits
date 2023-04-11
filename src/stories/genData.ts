const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomContributionData = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    let startDate = new Date(currentYear, 0, 1);
    let totalContributions = 0;

    const weeks = [];

    while (startDate.getFullYear() === currentYear) {
        const contributionDays = [];

        for (let i = 0; i < 7; i++) {
            const contributionCount = getRandomInt(0, 20);
            totalContributions += contributionCount;

            const contributionDay = {
                date: startDate.toISOString().split('T')[0],
                contributionCount: contributionCount,
            };

            contributionDays.push(contributionDay);
            startDate.setDate(startDate.getDate() + 1);
        }

        const week = {
            contributionDays: contributionDays,
        };

        weeks.push(week);
    }

    const commitData = {
        weeks: weeks,
        totalContributions: totalContributions,
    };

    const contributionCalendar = {
        totalContributions: totalContributions,
        weeks: weeks,
        commitData: commitData,
    };

    return contributionCalendar;
}
