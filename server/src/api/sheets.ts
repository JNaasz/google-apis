import { google } from 'googleapis';
import { GaxiosResponse } from 'gaxios';
import credentials from '../secret/jp-credentials';
import type { SheetData } from '../../../types/globals';
import type { sheets_v4 } from 'googleapis';
import { 
  formatGetResponse, 
  getSheetRange, 
  getSheetHeadersRange,
  setStoredHeaders,
  getStoredHeaders,
  formatDataForInsert,
} from '../lib/sheetUtil';

// Authenticate using a service account
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const { sheetId } = credentials;

interface Response {
  success: boolean;
  updatedCells?: number;
  error?: string;
}

/**
 * fetches sheet data as csv based on range input
 * returns usable data as json in type SheetData
 * @param {string} spreadsheetId
 * @param {string[] | string} range
 * @returns {Promise<SheetData>}
 */
export async function getSheetData(rangeKeys: string | null, spreadsheetId: string = sheetId): Promise<SheetData> {
  try {
    const range = getSheetRange(rangeKeys);
    const response = await (range.length > 1
      ? getSheet(spreadsheetId, range[0])
      : getSheetBatch(spreadsheetId, range)
    );
    return formatGetResponse(response, spreadsheetId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
* add data as a new entry
* checks sheet headers to format data then makes request
* @param {string} page
* @param {SheetItem} sheetItem
* @param {string|null} spreadsheetId
* @returns {Promise<Response>}
*/
export async function setSheetData(page: string, sheetItem: SheetItem, spreadsheetId: string = sheetId): Promise<Response> {
  // determine if we need to call to get getSheetHeaders
  const headers = await getSheetHeaders(page);
  const range = getSheetHeadersRange(page);
  const data =  formatDataForInsert(sheetItem, headers);
  const response = await append(data, range, spreadsheetId);
  return response;
}

/**
 * fetches a single sheet from a google sheet
 * @param {string} spreadsheetId 
 * @param {string} range 
 * @returns {Promise<GaxiosResponse>}
 */
async function getSheet(spreadsheetId: string, range: string): Promise<GaxiosResponse> {
  try {
    const response: GaxiosResponse = await new Promise((resolve, reject) => {
      sheets.spreadsheets.values.get(
        {
          spreadsheetId,
          range,
        },
        (err, res) => {
          if (err) reject('The API returned an error: ' + err);
          else if (!res) reject('The API returned with null or undefined response: ' + res);
          else resolve(res);
        }
      );
    });

    return response;
  } catch (error) {
    console.error(error);
    throw (error);
  }
}

/**
 * fetches multiple sheets from a google sheet
 * @param {string} spreadsheetId
 * @param {string[]} ranges
 * @returns {Promise<GaxiosResponse>}
 */
async function getSheetBatch(spreadsheetId: string, ranges: string[]): Promise<GaxiosResponse> {
  try {
    const response: GaxiosResponse = await new Promise((resolve, reject) => {
      sheets.spreadsheets.values.batchGet(
        {
          spreadsheetId,
          ranges,
        },
        (err, res) => {
          if (err) reject('The API returned an error: ' + err);
          else if (!res) reject('The API returned with null or undefined response: ' + res);
          else resolve(res);
        }
      );
    });

    return response;
  } catch (error) {
    console.error(error);
    throw (error);
  }
}

/**
 * get the header values for a given sheet
 * return stored headers if they exist or make sheet request to get headers
 * @param {string} page 
 * @returns {string[]}
 */
async function getSheetHeaders(page: string, spreadsheetId: string = sheetId): Promise<string[]> {
  const storedHeaders: string[] | null = getStoredHeaders(page);
  if (storedHeaders !== null) {
    return storedHeaders;
  }

  const headersRange = getSheetHeadersRange(page);
  const response: GaxiosResponse = await getSheet(spreadsheetId, headersRange)
  const headers = response.data.values[0];
  setStoredHeaders(page, headers);
  return headers;
}


/**
 * add data as a new entry
 * @param {string} spreadsheetId
 * @param {SheetData} data
 * @returns {Promise<Response>}
 */
async function append(data: string[], range: string, spreadsheetId: string): Promise<Response> {
  const requestBody = {
    values: [data], // Row data to append
  };

  try {
    const response: GaxiosResponse<sheets_v4.Schema$AppendValuesResponse> = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody,
    });

    if (response.data.updates?.updatedCells) {
      return { success: true, updatedCells: response.data.updates.updatedCells };
    }

    return { success: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * update existing data
 * 
 */
async function update() {

}

/**
 * modify structure of a sheet, ie add new column
 * 
 */
async function batchUpdate() {

}
