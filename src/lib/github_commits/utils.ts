export const weekday = (date: string): string => {
    const day = new Date(date).getDay();
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));
}
