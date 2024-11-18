const states = ['FL', 'CA', 'NY', 'TX', 'IL', 'PA'];
const cities = ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Gainesville', 'Tallahassee'];
const streetNames = ['Main St', 'Oak Ave', 'Maple Rd', 'Cedar Ln', 'Pine Dr', 'Elm St'];

function generateLocationCode(index, statePrefix) {
  return `${statePrefix}${String(index + 1).padStart(3, '0')}`;
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateAddress() {
  const number = Math.floor(Math.random() * 9999) + 1;
  return `${number} ${getRandomItem(streetNames)}`;
}

function generateZipCode() {
  return String(Math.floor(Math.random() * 90000) + 10000);
}

function generateLocations(
  count = 7,
  minLotSize = 10,
  maxLotSize = 75
) {
  return Array.from({ length: count }, (_, i) => {
    const state = getRandomItem(states);
    return {
      id: i + 1,
      status: Math.random() > 0.2 ? 'active' : 'deactivated',
      location_code: generateLocationCode(i, state),
      address: generateAddress(),
      city: getRandomItem(cities),
      state,
      zip_code: generateZipCode(),
      lot_size: Math.floor(Math.random() * (maxLotSize - minLotSize + 1)) + minLotSize,
    };
  });
}

const testRun = async () => {
  const locations = generateLocations();
  console.log(locations);
};

testRun();
