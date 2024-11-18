import fs from 'fs';

const STATUSES = ['paid', 'pending', 'refunded', 'failed', 'cancelled', 'violation'];
const LOCATIONS = ["TX001", "TX002", "IL003"];

const randomBetween = (min, max) => {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

const generateRandomPlate = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  return `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}`;
};

const generateTransaction = (id, config) => {
  const date = new Date(
    config.dateRange.start.getTime() + 
    Math.random() * (config.dateRange.end.getTime() - config.dateRange.start.getTime())
  );

  const baseRate = randomBetween(config.fees.baseRate.min, config.fees.baseRate.max);
  const tax = randomBetween(config.fees.tax.min, config.fees.tax.max);
  const cityTax = config.fees.cityTax 
    ? randomBetween(config.fees.cityTax.min, config.fees.cityTax.max)
    : undefined;
  const countyTax = config.fees.countyTax
    ? randomBetween(config.fees.countyTax.min, config.fees.countyTax.max)
    : undefined;
  const serviceFee = randomBetween(config.fees.serviceFee.min, config.fees.serviceFee.max);
  const paymentGatewayFee = randomBetween(
    config.fees.paymentGatewayFee.min,
    config.fees.paymentGatewayFee.max
  );
  const hours = Math.floor(Math.random() * 5) + 1;

  const total = (baseRate * hours) + tax + (cityTax || 0) + (countyTax || 0) + serviceFee + paymentGatewayFee;

  return {
    id,
    status: Math.random() > 0.9 ? STATUSES[Math.floor(Math.random() * STATUSES.length)] : 'paid',
    location_code: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
    date: date.toISOString(),
    hours,
    transaction_id: Math.floor(Math.random() * 1000000),
    license_plate: generateRandomPlate(),
    email: Math.random() > 0.3 ? `user${id}@example.com` : undefined,
    cellphone: Math.random() > 0.3 ? `555${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}` : undefined,
    name: Math.random() > 0.3 ? `User ${id}` : undefined,
    base_rate: baseRate,
    tax,
    city_tax: cityTax,
    county_tax: countyTax,
    service_fee: serviceFee,
    payment_gateway_fee: paymentGatewayFee,
    total,
  };
};

export const generateTransactions = (count, config) => {
  return Array.from({ length: count }, (_, i) => generateTransaction(i + 1, config));
};

// Usage example:
const config = {
  dateRange: {
    start: new Date('2023-01-01'),
    end: new Date('2023-12-31')
  },
  fees: {
    baseRate: { min: 2, max: 6 },
    tax: { min: 0.5, max: 2 },
    cityTax: { min: 0.25, max: 1 },
    countyTax: { min: 0.25, max: 1 },
    serviceFee: { min: 1, max: 3 },
    paymentGatewayFee: { min: 0.3, max: 0.9 }
  }
};
const transactions = generateTransactions(10000, config);
fs.writeFile('/Users/levisherman/Documents/coding-projects/projects/parking-dashboard/frontend/src/data/transactions.json', JSON.stringify(transactions, null, 2), (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File has been written successfully.');
  }
});