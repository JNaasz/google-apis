import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import credentials from '../../../secret/dtrw-credentials';

const auth = new GoogleAuth({
	credentials,
	scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});
const calendar = google.calendar({ version: 'v3', auth });

async function getCalendarEvents() {
  const response = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: new Date().toISOString(), // Only future events
    maxResults: 10, // Fetch upcoming events
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items;

	return events;
}

async function getNextEvent() {
	const events = await getCalendarEvents();
	const nextEvent = events.find(event => event.hasOwnProperty('location'));
	return nextEvent || null;
}

export {
	getCalendar,
	getCalendarEvents,
	getNextEvent,
}