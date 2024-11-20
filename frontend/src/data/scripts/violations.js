import fs from "fs";

const STATUS_OPTIONS = ["paid", "cancelled", "not_sent", "sent"];
const LOCATIONS = ["TX001", "TX002", "IL003"];
const LICENSE_PLATES = ["ABC123", "XYZ789", "DEF456", "GHI789", "JKL012", "MNO345"];

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const addMinutesToDate = (date, minutes) => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
};

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export function createViolations(config) {
  return Array.from({ length: config.count }, (_, i) => {
    const date = randomDate(config.dateRange.start, config.dateRange.end);
    const sessionDuration = randomBetween(config.sessionDurationRange.min, config.sessionDurationRange.max);

    return {
      id: i + 1,
      status: randomFromArray(STATUS_OPTIONS),
      location_code: randomFromArray(LOCATIONS),
      date: date.toISOString(),
      session_start: date.toISOString(),
      session_end: addMinutesToDate(date, sessionDuration).toISOString(),
      license_plate: randomFromArray(LICENSE_PLATES),
      ticket_amount: randomBetween(config.ticketAmountRange.min, config.ticketAmountRange.max),
      transaction_id: Math.random() > 0.5 ? randomBetween(1000, 9999) : undefined,
    };
  });
}

// Example usage:
const violations = createViolations({
  count: 700,
  dateRange: {
    start: new Date("2023-01-01"),
    end: new Date("2023-12-31"),
  },
  sessionDurationRange: { min: 30, max: 240 },
  ticketAmountRange: { min: 25, max: 150 },
});

fs.writeFile(
  "/Users/levisherman/Documents/coding-projects/projects/parking-dashboard/frontend/src/data/violations.json",
  JSON.stringify(violations, null, 2),
  (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File has been written successfully.");
    }
  },
);
