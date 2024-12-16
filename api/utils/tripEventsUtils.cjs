import { getToken } from "../../src/services/auth";

const API_BASE_URL = 'http://localhost:3000';

export const fetchTripEvents = async (tripId, userId) => {
  console.log('Fetching trip events for tripId:', tripId); // Log tripId
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
  console.log("Creating trip event with data:", { userId, tripId, event });
  console.log("Using token:", token);

  const eventStartTime = new Date(event.start_time);
  const eventEndTime = new Date(event.end_time);
  const tripStartDate = new Date(tripId.start_date);
  const tripEndDate = new Date(tripId.end_date);

  console.log("Event start time:", eventStartTime);
  console.log("Event end time:", eventEndTime);
  console.log("Trip start date:", tripStartDate);
  console.log("Trip end date:", tripEndDate);

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

  const responseData = await response.json();
  console.log("Trip event created successfully:", responseData);
  return responseData;
};

export const updateTripEvent = async (event, token) => {
  console.log("Updating trip event with data:", event);
  console.log("Using token:", token);

  const response = await fetch(`${API_BASE_URL}/events/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to update trip event:', response.status, response.statusText, errorData);
    if (response.status === 403 && errorData.message === "Invalid token") {
      console.error('Token is invalid. Please check the token or re-authenticate.');
    }
    throw new Error('Failed to update trip event');
  }

  const responseData = await response.json();
  console.log("Trip event updated successfully:", responseData);
  return responseData;
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
