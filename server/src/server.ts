import { getSheetData } from './api/sheets';
import type { SheetData } from '../../types/globals';
import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();
const port = process.env.PORT || 3000;

const useLocal: Boolean = true;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests only from this origin
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

app.listen(port, () => {
  console.log(`App is now listening on port ${port}`);
});