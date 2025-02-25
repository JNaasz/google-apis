import { getSheetData, setSheetData } from './api/sheets';
import type { SheetData } from '../../types/globals';
import { getCalendarEvents, getNextEvent } from './api/calendar';

import express from 'express';
import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';

const app = express();
const port = Number(process.env.PORT) || 2000;
const hostname = '0.0.0.0';

// console.log(`Running in ${process.env.NODE_ENV || "development"} mode`);
// process.env.NODE_ENV not setting correctly
// const allowedOrigins = process.env.NODE_ENV === 'production'
//   ? ['https://www.detroitdowntownrunners.com']
//   : [
//       'http://localhost:3001',
//       'http://localhost:3000',
//       'http://localhost:5173',
//     ];

const allowedOrigins = ['https://www.detroitdowntownrunners.com'];

app.use(cors({
  origin: allowedOrigins
}));

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (!origin || allowedOrigins.includes(origin)) {
    return next();
  }

  res.status(403).json({ error: 'Forbidden: Origin not allowed' });
});

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/sheet-data', async (req: Request, res: Response) => {
  try {
    const response: SheetData = await getSheetData(null);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google Sheets' });
  }
});

app.get('/sheet-data/:type', async (req: Request, res: Response) => {
  const { type } = req.params;
  try {
    const response: SheetData = await getSheetData(type);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google Sheets' });
  }
});

app.post('/update-sheet-data', async (req: Request, res: Response) => {
  try {
    const sheetItem: SheetItem = req.body.data;
    const response = await setSheetData('dog', sheetItem);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error updating sheet' });
  }
});

app.get('/calendar-events', async (req: Request, res: Response) => {
  try {
    const response = await getCalendarEvents();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events from Google Calendar' });
  }
});

app.get('/calendar-next-event', async (req: Request, res: Response) => {
  try {
    const response = await getNextEvent();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events from Google Calendar' });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});