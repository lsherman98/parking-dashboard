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

export const states = [
  { label: "Alabama", value: "alabama" },
  { label: "Alaska", value: "alaska" },
  { label: "Arizona", value: "arizona" },
  { label: "Arkansas", value: "arkansas" },
  { label: "California", value: "california" },
  { label: "Colorado", value: "colorado" },
  { label: "Connecticut", value: "connecticut" },
  { label: "Delaware", value: "delaware" },
  { label: "Florida", value: "florida" },
  { label: "Georgia", value: "georgia" },
  { label: "Hawaii", value: "hawaii" },
  { label: "Idaho", value: "idaho" },
  { label: "Illinois", value: "illinois" },
  { label: "Indiana", value: "indiana" },
  { label: "Iowa", value: "iowa" },
  { label: "Kansas", value: "kansas" },
  { label: "Kentucky", value: "kentucky" },
  { label: "Louisiana", value: "louisiana" },
  { label: "Maine", value: "maine" },
  { label: "Maryland", value: "maryland" },
  { label: "Massachusetts", value: "massachusetts" },
  { label: "Michigan", value: "michigan" },
  { label: "Minnesota", value: "minnesota" },
  { label: "Mississippi", value: "mississippi" },
  { label: "Missouri", value: "missouri" },
  { label: "Montana", value: "montana" },
  { label: "Nebraska", value: "nebraska" },
  { label: "Nevada", value: "nevada" },
  { label: "New Hampshire", value: "new_hampshire" },
  { label: "New Jersey", value: "new_jersey" },
  { label: "New Mexico", value: "new_mexico" },
  { label: "New York", value: "new_york" },
  { label: "North Carolina", value: "north_carolina" },
  { label: "North Dakota", value: "north_dakota" },
  { label: "Ohio", value: "ohio" },
  { label: "Oklahoma", value: "oklahoma" },
  { label: "Oregon", value: "oregon" },
  { label: "Pennsylvania", value: "pennsylvania" },
  { label: "Rhode Island", value: "rhode_island" },
  { label: "South Carolina", value: "south_carolina" },
  { label: "South Dakota", value: "south_dakota" },
  { label: "Tennessee", value: "tennessee" },
  { label: "Texas", value: "texas" },
  { label: "Utah", value: "utah" },
  { label: "Vermont", value: "vermont" },
  { label: "Virginia", value: "virginia" },
  { label: "Washington", value: "washington" },
  { label: "West Virginia", value: "west_virginia" },
  { label: "Wisconsin", value: "wisconsin" },
  { label: "Wyoming", value: "wyoming" },
];
