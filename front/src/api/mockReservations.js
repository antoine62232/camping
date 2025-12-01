const mockReservations = [];

export function submitReservation(reservation) {
  mockReservations.push(reservation);
  return Promise.resolve({ status: 'success', data: reservation });
}

export function getReservations() {
  return Promise.resolve(mockReservations);
}