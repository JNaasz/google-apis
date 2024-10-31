import './App.scss';
import type { SheetData } from '../../types/globals';
import LayoutTabs from './components/LayoutTabs';

import React, { useEffect, useState } from 'react';
import { AppBar, Container, Box, Toolbar, Typography } from '@mui/material';

const layouts: string[] = ['sheets', 'maps', 'forms'];

function App() {
  const [data, setData] = useState<SheetData | null>(null);
  const [layoutIndex, setLayoutIndex] = useState<number>(0);

  const handleTabChange = (newIndex: number) => {
    setLayoutIndex(newIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:2000/sheet-data'); // Adjust endpoint as needed
      const resJson: SheetData = await response.json();
      setData(resJson);
    };

    fetchData();
  }, []);

  return (
    <Container className="App">

      {/* layout tabs */}
      <Box sx={{ flexGrow: 1, padding: 5 }}>
        {/* <AppBar className="App-header" position="static"> */}
          {/* <Toolbar> */}
            <LayoutTabs layouts={layouts} layoutIndex={layoutIndex} onChange={handleTabChange} />
          {/* </Toolbar> */}
        {/* </AppBar> */}
      </Box>

      {/* layout content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">{layouts[layoutIndex]} Content</Typography>
        {/* You can add more specific layout content here */}


        {layouts[layoutIndex] === 'sheets' && data && (
          <div className="sheet-data">
            <h2>Data Response</h2> {/* Add your title here */}
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Using <pre> for better formatting */}
          </div>
        )}
      </Box>
    </Container>
  );
}

export default App;
