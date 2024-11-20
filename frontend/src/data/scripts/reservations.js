import fs from "fs";

const STATUSES = ["paid", "failed", "refunded"];
const LOCATIONS = ["TX001", "TX002", "IL003"];
const LICENSE_PLATES = ["ABC123", "XYZ789", "DEF456", "GHI789", "JKL012"];

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomDate = (range) => {
  const start = range.start.getTime();
  const end = range.end.getTime();
  return new Date(start + Math.random() * (end - start));
};

const generateReservation = (id, dateRange, rateRange, taxRange, serviceFeeRange) => {
  const date = randomDate(dateRange);
  const sessionEnd = new Date(date.getTime() + randomBetween(1, 10) * 3600000);
  const hours = Math.ceil((sessionEnd.getTime() - date.getTime()) / 3600000);
  const rate = randomBetween(rateRange.min, rateRange.max);
  const tax = randomBetween(taxRange.min, taxRange.max);
  const serviceFee = randomBetween(serviceFeeRange.min, serviceFeeRange.max);

  // Use random number to weight towards 'paid' status
  const statusRandom = Math.random();
  const status = statusRandom < 0.8 ? "paid" : STATUSES[randomBetween(1, 2)];

  return {
    id,
    status,
    location_code: LOCATIONS[randomBetween(0, LOCATIONS.length - 1)],
    license_plate: LICENSE_PLATES[randomBetween(0, LICENSE_PLATES.length - 1)],
    date: date.toISOString().split("T")[0],
    session_start: date.toISOString().split("T")[1].slice(0, 5),
    session_end: sessionEnd.toISOString().split("T")[1].slice(0, 5),
    rate,
    hours,
    phone_number: `+1${randomBetween(200, 999)}${randomBetween(100, 999)}${randomBetween(1000, 9999)}`,
    total: rate * hours + tax + serviceFee,
    tax,
    service_fee: serviceFee,
  };
};

export const generateReservations = (
  count,
  dateRange,
  rateRange = { min: 3, max: 20 },
  taxRange = { min: 2, max: 5 },
  serviceFeeRange = { min: 1, max: 3 },
) => {
  return Array.from({ length: count }, (_, i) => generateReservation(i + 1, dateRange, rateRange, taxRange, serviceFeeRange));
};

const reservations = generateReservations(500, { start: new Date(2023, 0, 1), end: new Date(2023, 11, 31) });

fs.writeFile(
  "/Users/levisherman/Documents/coding-projects/projects/parking-dashboard/frontend/src/data/reservations.json",
  JSON.stringify(reservations, null, 2),
  (err) => {
    if (err) throw err;
    console.log("Reservations data has been saved!");
  },
);
