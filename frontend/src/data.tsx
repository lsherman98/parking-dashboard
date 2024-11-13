import { LocationItem } from "./types";

export const locations: LocationItem[] = [
  { value: "CH100", label: "CH100" },
  { value: "KY400", label: "KY400" },
];

export const years: string[] = ["2024", "2023", "2022"];
export const weeks: string[] = Array.from({ length: 4 }, (_, i) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1 + i * 7);
  const endDate = new Date(today.getFullYear(), today.getMonth(), 7 + i * 7);
  return `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`
});