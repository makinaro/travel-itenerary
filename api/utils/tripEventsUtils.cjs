import { getToken } from "../../src/services/auth";

const API_BASE_URL = 'http://localhost:3000';

export const fetchTripEvents = async (tripId, userId) => {
  if (!tripId) {
    throw new Error('tripId is undefined');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/trips/${tripId}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getToken()}`,
      },
    });
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

export const createTripEvent = async (userId, tripId, event, token) => {
  const eventStartTime = new Date(event.start_time);
  const eventEndTime = new Date(event.end_time);
  const tripStartDate = new Date(tripId.start_date);
  const tripEndDate = new Date(tripId.end_date);

  // Validate that event times are within trip dates
  if (eventStartTime < tripStartDate || eventEndTime > tripEndDate) {
    throw new Error('Event dates must be within the trip dates');
  }

  const response = await fetch(`${API_BASE_URL}/users/${userId}/trips/${tripId}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to create trip event:', response.status, response.statusText, errorData);
    if (response.status === 403 && errorData.message === "Invalid token") {
      console.error('Token is invalid. Please check the token or re-authenticate.');
    }
    throw new Error('Failed to create trip event');
  }

  return await response.json();
};

export const updateTripEvent = async (userId, updatedEventData, token) => {
  const { trip_event_id, trip_id, start_time, end_time, title, collaborators } = updatedEventData;

  // Fetch trip details to get trip start and end dates
  const tripResponse = await fetch(`${API_BASE_URL}/users/${userId}/trips/${trip_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
  });

  if (!tripResponse.ok) {
    const errorData = await tripResponse.json();
    console.error('Failed to fetch trip details:', tripResponse.status, tripResponse.statusText, errorData);
    throw new Error('Failed to fetch trip details');
  }

  const tripData = await tripResponse.json();
  const { start_date: tripStartDate, end_date: tripEndDate } = tripData;

  // Validate that event times are within trip dates
  if (start_time < tripStartDate || end_time > tripEndDate) {
    throw new Error('Event dates must be within the trip dates');
  }

  const eventToUpdate = { start_time, end_time, title, collaborators };

  const response = await fetch(`${API_BASE_URL}/users/${userId}/trips/${trip_id}/events/${trip_event_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
    body: JSON.stringify(eventToUpdate),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to update trip event:', response.status, response.statusText, errorData);
    throw new Error('Failed to update trip event');
  }

  return await response.json();
};

export const deleteTripEvent = async (userId, tripId, eventId, token) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/trips/${tripId}/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete trip event');
  }
  return response.json();
};
