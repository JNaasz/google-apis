import sheetConfig from './config';
import type { Sheet, SheetItem } from '../../../types/globals';

/**
 * builds an array of sheed ids for fetch request
 * @param {string[] | null} pages
 * @returns {string[]} //['Sheet1!A1:D5', 'Sheet2!A1:D5'];
 */
function getSheetRange(pages: string | null): string[] {
	let rangeList = pages === null
		? Object.values(sheetConfig)
		: pages.split(',').map(page => sheetConfig[page]);

	const sheetRange = rangeList
		.map(config => `${config.sheetName}!${config.columns}`);

	return sheetRange;
}

/**
 * Convert the csv response data to a more usable structure
 * @param {ValueRange} data
 * @returns {Sheet}
 */
function formatSheet({ range, values }: { range?: string | undefined; values: string[][] }): Sheet {
  const sheet: Sheet = {
    name: "",
    items: []
  };

  // Extract the name from the range by splitting at the "!"
  sheet.name = range?.split("!")[0] || '';

  const [headers] = values.slice(0, 1);
  const items: SheetItem[] = values.slice(1).map((row) => buildSheetItem(row, headers));

  sheet.items = items;
  return sheet;
}

/**
 * Convert the csv response data to a more usable structure
 * @param {string[]} row
 * @param {string[]} headers
 * @returns {SheetItem}
 */
function buildSheetItem(row: string[], headers: string[]): SheetItem {
  return headers.reduce((acc: SheetItem, header, i) => {
    acc[header] = row[i]; // Assign row values to corresponding headers
    return acc;
  }, {} as SheetItem);
}

export {
	formatSheet,
	buildSheetItem,
	getSheetRange,
}
