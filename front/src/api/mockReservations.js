const mockReservations = [];

export function submitReservation(reservation) {
  const newReservation = {
    id: mockReservations.length + 1,
    createdAt: new Date().toISOString(),
    ...reservation,
  };

  mockReservations.push(newReservation);

  return Promise.resolve({
    status: "success",
    data: newReservation,
  });
}

export function getReservations() {
  return Promise.resolve({
    status: "success",
    data: mockReservations,
  });
}
