export const years: string[] = ["2023"];

export const weeks: string[] = Array.from({ length: 4 }, (_, i) => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1 + i * 7);
    const endDate = new Date(today.getFullYear(), today.getMonth(), 7 + i * 7);
    return `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`;
});

export const currentMonth = new Date().toLocaleString("default", { month: "long" });
export const currentYear = "2023";
export const currentWeekIndex = Math.min(Math.floor(new Date().getDate() / 7), 3);
export const currentWeek = weeks[currentWeekIndex];
