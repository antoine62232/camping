export const mockAvailabilityData = {
  1: {
    '2025-12-05': 'dispo',
    '2025-12-06': 'indispo',
    '2025-12-07': 'dispo',
  },
  2: {
    '2025-12-05': 'dispo',
    '2025-12-06': 'dispo',
    '2025-12-07': 'indispo',
  },
  3: {
    '2025-12-05': 'dispo',
    '2025-12-06': 'dispo',
    '2025-12-07': 'dispo',
  }
};

export function checkAvailability(arrivalDate, departureDate, accommodationId) {
  if (!arrivalDate || !departureDate || !accommodationId) return false;
  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);
  const oneDayMs = 1000 * 60 * 60 * 24;

  for (let day = arrival.getTime(); day < departure.getTime(); day += oneDayMs) {
    const dateStr = new Date(day).toISOString().slice(0, 10);
    if (
      !mockAvailabilityData[accommodationId] ||
      mockAvailabilityData[accommodationId][dateStr] !== 'dispo'
    ) {
      return false;
    }
  }
  return true; 
}
