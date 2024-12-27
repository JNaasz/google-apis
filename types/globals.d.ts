// shared between src and api
declare global {
	interface SheetData {
		spreadsheetId: string;
		sheets: Sheet[];
	}
	
	interface Sheet {
		// TODO: add sheet headers to Sheet
		name: string;
		items: SheetItem[];
		headers: string[];
	}
	
	interface SheetItem {
		Date: string;
		Duration: number;
		Place: string;
		Comment: string;
		Person: string;
		[key: string]: string | number;
	}

	interface CalEvent {
		id?: string | null;
		status?: string | null;
		htmlLink?: string | null;
		created?: string | null;
		updated?: string | null;
		summary?: string | null;
		description?: string | null;
		location?: string | null;
		start?: EventDateTime;
		end?: EventDateTime;
		recurrence?: string[] | null;
		date?: CalendarEventTime;
	}
}

interface EventDateTime {
  date?: string | null;
  dateTime?: string | null;
  timeZone?: string | null;
}

interface CalendarEventTime {
	time: string;
	day: string;
	month: string;
}

export type { SheetData, Sheet, SheetItem, CalEvent, CalendarEventTime };
