import sheetConfig from './config';
import type { Sheet, SheetItem } from '../../../types/globals';
import { GaxiosResponse } from 'gaxios';
import type { sheets_v4 } from 'googleapis';

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
 * formats the sheet get response to SheetData
 * @param {GaxiosResponse} response 
 * @param {string} spreadsheetId 
 * @returns {SheetData}
 */
function formatGetResponse(response: GaxiosResponse, spreadsheetId: string): SheetData {
  const responseData: SheetData = {
    spreadsheetId,
    sheets: []
  }

  console.log('response.data:', response.data);

  if (response.data.valueRanges?.length) {
    response.data.valueRanges.forEach((vRange: sheets_v4.Schema$ValueRange) => {
      responseData.sheets.push(formatSheet(vRange as { range?: string; values: string[][] }));
    });
  } else if (response.data.values?.length) {
    responseData.sheets.push(formatSheet(response.data));
  }

  return responseData;
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

/**
 * get the range for the sheet headers
 * @param {string} page 
 * @returns {string} // sheet range
 */
function getSheetHeadersRange(page: string): string {
	return `${sheetConfig[page].sheetName}!1:1`;
}

/**
 * set the sheet headers to config
 * @param {string} page 
 * @param {string} headers
 * @returns {void}
 */
function setStoredHeaders(page: string, headers: string[]): void {
	sheetConfig[page].headers = headers;
}

/**
 * return the sheet headers from config
 * @param {string} page 
 * @returns {string[] | null}
 */
function getStoredHeaders(page: string): string[] | null {
	return sheetConfig[page].headers;
}

/**
 * converts object values to an ordered array
 * @param {SheetItem} sheetItem 
 * @param {string[]} headers 
 * @returns {string[]}
 */
function formatDataForInsert(sheetItem: SheetItem, headers: string[]): string[] {
  return headers.map(h => {
    if (sheetItem[h]) return sheetItem[h].toString()
    else return '';
  });
}

export {
  formatGetResponse,
	buildSheetItem,
	getSheetRange,
  getSheetHeadersRange,
  setStoredHeaders,
  getStoredHeaders,
  formatDataForInsert,
}
