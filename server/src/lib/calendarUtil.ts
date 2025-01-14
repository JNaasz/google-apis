import type { CalendarEventTime } from "../../../types/globals";

function formatDate(dateStr: string): CalendarEventTime | null {

	// Create a Date object and ensure it's valid
	const date = new Date(dateStr);
	if (isNaN(date.getTime())) {
    console.error('Invalid Date');
		return null;
}

	const optionsTime: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
	const time = new Intl.DateTimeFormat('en-US', optionsTime)
		.format(date);

	const optionsWeekDay: Intl.DateTimeFormatOptions = { weekday: 'short' };
	const weekDay = new Intl.DateTimeFormat('en-US', optionsWeekDay)
		.format(date);


	const optionsDay: Intl.DateTimeFormatOptions = { day: 'numeric' };
	const day = new Intl.DateTimeFormat('en-US', optionsDay).format(date);

	const optionsShortMonth: Intl.DateTimeFormatOptions = { month: 'short' };
	const month = new Intl.DateTimeFormat('en-US', optionsShortMonth)
		.format(date);

	return { time, weekDay, month, day };
}

export {
	formatDate,
}