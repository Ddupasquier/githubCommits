export const weekday = (date: string): string => {
    const [year, month, day] = date.split('-').map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'UTC' }).format(utcDate);
};

export const getDataCount = (contributionCount: number): number => {
    if (contributionCount >= 8) {
        return 8;
    }
    return contributionCount + 1;
}

export const formatDate = (date: string): string => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date));
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    return `${month} ${day}, ${year}`;
}

export const getDisplayedMonths = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const shortMonthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    return [
        ...shortMonthNames.slice(currentMonth),
        ...shortMonthNames.slice(0, currentMonth),
        shortMonthNames[currentMonth]
    ];
}