import { getSheetData } from './api/sheets';
import type { SheetData } from '../../types/globals';
import { getCalendarEvents, getNextEvent } from './api/calendar';

import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT) || 2000;
const hostname = '0.0.0.0';

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(cors({
  origin: 'http://localhost:3001' // Allow requests only from this origin
}));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/sheet-data', async (req, res) => {
  try {
    const response: SheetData = await getSheetData(null);
    res.send(response);
  } catch (error) {
    res.status(500).send('Error fetching data from Google Sheets');
  }
});

app.get('/sheet-data/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const response: SheetData = await getSheetData(type);
    res.send(response);
  } catch (error) {
    res.status(500).send('Error fetching data from Google Sheets');
  }
});

app.get('/calendar-events', async (req, res) => {
  console.log('lets get the calendar events');
  try {
    const response = await getCalendarEvents();
    res.send(response);
  } catch (error) {
    res.status(500).send('Error fetching events from Google Calendar');
  }
});

app.get('/calendar-next-event', async (req, res) => {
  console.log('lets get the calendar events');
  try {
    const response = await getNextEvent();
    res.send(response);
  } catch (error) {
    res.status(500).send('Error fetching events from Google Calendar');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});