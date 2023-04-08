export const weekday = (date: string): string => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));
}

export const getDataCount = (contributionCount: number): number => {
    if (contributionCount >= 8) {
        return 8;
    }
    return contributionCount + 1;
}

// take in a date and return it in mm-dd-yyyy format, with the month being the name of the month
export const formatDate = (date: string): string => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date));
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    return `${month} ${day}, ${year}`;
}