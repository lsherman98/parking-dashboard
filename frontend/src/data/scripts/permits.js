import fs from 'fs';

const STATUS_OPTIONS = ['active', 'requested', 'expired'];
const LOCATIONS = ["TX001", "TX002", "IL003"];;

const generateRandomLicensePlate = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  return `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}`;
};

const generateRandomName = () => {
  const names = ['John Smith', 'Jane Doe', 'Bob Johnson', 'Alice Williams', 'David Brown'];
  return names[Math.floor(Math.random() * names.length)];
};

const generateRandomEmail = (name) => {
  const domains = ['example.com', 'test.org', 'mail.com'];
  const cleanName = name.toLowerCase().replace(' ', '.');
  return `${cleanName}@${domains[Math.floor(Math.random() * domains.length)]}`;
};

const generateRandomPhone = () => {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
};

const getWeightedStatus = () => {
  const rand = Math.random();
  if (rand < 0.7) return 'active';
  if (rand < 0.85) return 'requested';
  return 'expired';
};

export const generatePermits = (
  count,
  dateRange,
) => {
  return Array.from({ length: count }, (_, index) => {
    const name = generateRandomName();
    const startDate = new Date(
      dateRange.min.getTime() + Math.random() * (dateRange.max.getTime() - dateRange.min.getTime())
    );
    const endDate = new Date(startDate.getTime() + [30, 90, 180][Math.floor(Math.random() * 3)] * 24 * 60 * 60 * 1000)

    return {
      id: index + 1,
      status: getWeightedStatus(),
      location_code: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
      license_plate: generateRandomLicensePlate(),
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      name,
      email: generateRandomEmail(name),
      phone: generateRandomPhone(),
    };
  });
};

// Usage example:
const permits = generatePermits(
  100,
  { min: new Date(2023, 0, 1), max: new Date(2023, 11, 31) }, 
);
fs.writeFile('/Users/levisherman/Documents/coding-projects/projects/parking-dashboard/frontend/src/data/permits.json', JSON.stringify(permits, null, 2), (err) => {
  if (err) throw err;
  console.log('Permits data has been saved!');
});