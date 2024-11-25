import { google } from 'googleapis';
import { GaxiosResponse } from 'gaxios';
import credentials from '../secret/jp-credentials';
import { formatSheet, getSheetRange, getSheetHeadersRange } from '../lib/util';
import type { SheetData } from '../../../types/globals';
import type { sheets_v4 } from 'googleapis';

// Authenticate using a service account
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
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
 * returns usable data as json
 * @param {string} spreadsheetId
 * @param {string[] | string} range
 * @returns {Promise<SheetData>}
 */
export async function getSheetData(rangeKeys: string | null, spreadsheetId: string = sheetId): Promise<SheetData> {
  try {
    const range = getSheetRange(rangeKeys);
    return await (range.length > 1
      ? getSheet(spreadsheetId, range[0])
      : getSheetBatch(spreadsheetId, range)
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * fetches a single sheet from a google sheet
 * @param {string} spreadsheetId 
 * @param {string} range 
 * @returns {Promise<SheetData>}
 */
async function getSheet(spreadsheetId: string, range: string): Promise<SheetData> {
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

    const responseData: SheetData = {
      spreadsheetId,
      sheets: []
    }

    if (response.data.values.length) {
      responseData.sheets.push(formatSheet(response.data));
    }

    return responseData;
  } catch (error) {
    console.error(error);
    throw (error);
  }
}

/**
 * fetches multiple sheets from a google sheet
 * @param {string} spreadsheetId
 * @param {string[]} ranges
 * @returns {Promise<SheetData>}
 */
async function getSheetBatch(spreadsheetId: string, ranges: string[]): Promise<SheetData> {
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

    const responseData: SheetData = {
      spreadsheetId,
      sheets: []
    }

    if (response.data.valueRanges.length) {
      response.data.valueRanges.forEach((vRange: sheets_v4.Schema$ValueRange) => {
        responseData.sheets.push(formatSheet(vRange as { range?: string; values: string[][] }));
      });
    }

    return responseData;
  } catch (error) {
    console.error(error);
    throw (error);
  }
}

/**
 * i want to use the headers to know how to format the data to append to a sheet
 * ideally we get this and set it into the config object and then we updated it whenever a column is added
 * get the header values for a given sheet
 * @param {string} page 
 * @returns string[] // string of header values
 */
export async function getSheetHeaders(page: string): Promise<string[]> {
  const headersRange = getSheetHeadersRange(page);
  const response: SheetData = await getSheet(page, headersRange)
  console.log('getSheetHeaders response:', response);
  return ['test'];
}

/**
 * add data as a new entry
 * @param {string} spreadsheetId
 * @param {string} range
 * @param {string[]} data
 * @returns {Promise<Response>}
 */
export async function append(spreadsheetId: string, range: string, data: string[]): Promise<Response> {
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

