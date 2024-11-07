// shared between src and api
declare global {
	interface SheetData {
		spreadsheetId: string;
		sheets: Sheet[];
	}
	
	interface Sheet {
		name: string;
		items: SheetItem[];
	}
	
	interface SheetItem {
		Date: string;
		Duration: number;
		Place: string;
		Comment: string;
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
	}
}

interface EventDateTime {
  date?: string | null;
  dateTime?: string | null;
  timeZone?: string | null;
}

export type { SheetData, Sheet, SheetItem, CalEvent };
