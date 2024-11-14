import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import credentials from '../secret/dtrw-credentials';
import type { CalEvent } from '../../../types/globals';

const auth = new GoogleAuth({
	credentials,
	scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});
const calendar = google.calendar({ version: 'v3', auth });

const CALENDAR_ID = '0de52els08rqabtjushrhgpbjo@group.calendar.google.com';

/**
 * Gets the events from a specified google calendar
 * @returns {Promise<CalEvent[] | []>}
 */
async function getCalendarEvents(): Promise<CalEvent[]> {
  const response = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: new Date().toISOString(), // Only future events
    maxResults: 10, // Fetch upcoming events
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events: CalEvent[] = response.data.items || [];

	return events;
}

/**
 * returns the first event that has a locaiton
 * @returns {Promise<CalEvent | null>}
 */
async function getNextEvent(): Promise<CalEvent | null> {
	const events = await getCalendarEvents();
	const nextEvent = events?.find(event => event.hasOwnProperty('location'));
	return nextEvent || null;
}

export {
	getCalendarEvents,
	getNextEvent,
}