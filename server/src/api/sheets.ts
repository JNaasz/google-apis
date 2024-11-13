import { google } from 'googleapis';
import { GaxiosResponse } from 'gaxios';
import credentials from 'jp-credentials';
import { formatSheet, getSheetRange } from '../lib/util.js';
import type { SheetData } from '../../../types/globals.js';
import type { sheets_v4 } from 'googleapis';

// Authenticate using a service account
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const { sheetId } = credentials;

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
