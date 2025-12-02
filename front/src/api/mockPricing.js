const basePrices = {
  1: 50.0, 
  2: 40.0, 
  3: 30.0, 
};

const supplementAdult = 10.0;
const supplementChild = 5.0;

const optionsPrices = {
  wifi: 5.0,
  parking: 7.0,
  animal: 8.0,
};

function getNumberOfNights(arrivalDate, departureDate) {
  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.floor((departure - arrival) / msPerDay));
}

export function simulatePrice(reservationData) {
  const nights = getNumberOfNights(reservationData.arrivalDate, reservationData.departureDate);

  if (nights === 0) {
    return {
      total: 0,
      breakdown: [],
      message: 'La date de départ doit être après la date d’arrivée.',
    };
  }

  const basePrice = basePrices[reservationData.accommodationId] || 0;

  const baseTotal = basePrice * nights;
  const adultsTotal = supplementAdult * reservationData.adults * nights;
  const childrenTotal = supplementChild * reservationData.children * nights;

  const optionsTotal = (reservationData.options || [])
    .reduce((sum, opt) => sum + (optionsPrices[opt] || 0) * nights, 0);

  const total = baseTotal + adultsTotal + childrenTotal + optionsTotal;

  return {
    total,
    breakdown: [
      { label: 'Prix base hébergement', amount: baseTotal },
      { label: 'Supplément adultes', amount: adultsTotal },
      { label: 'Supplément enfants', amount: childrenTotal },
      { label: 'Options', amount: optionsTotal },
    ],
    nights,
  };
}