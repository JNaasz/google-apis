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

}

export type { SheetData, Sheet, SheetItem };

