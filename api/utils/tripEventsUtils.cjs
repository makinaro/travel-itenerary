const API_BASE_URL = 'http://localhost:3000';

export const fetchTripEvents = async (tripId) => {
  console.log('Fetching trip events for tripId:', tripId); // Log tripId
  if (!tripId) {
    throw new Error('tripId is undefined');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}/events`);
    if (!response.ok) {
      console.error('Failed to fetch trip events:', response.status, response.statusText);
      throw new Error('Failed to fetch trip events');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching trip events:', error);
    throw error;
  }
};

export const createTripEvent = async (tripId, event) => {
  const response = await fetch(`${API_BASE_URL}/trips/${tripId}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to create trip event');
  }
  return response.json();
};

export const updateTripEvent = async (tripId, eventId, event) => {
  const response = await fetch(`${API_BASE_URL}/trips/${tripId}/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to update trip event');
  }
  return response.json();
};

export const deleteTripEvent = async (tripId, eventId) => {
  const response = await fetch(`${API_BASE_URL}/trips/${tripId}/events/${eventId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete trip event');
  }
  return response.json();
};