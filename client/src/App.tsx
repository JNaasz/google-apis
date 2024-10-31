import './App.scss';
import LayoutTabs from './components/LayoutTabs';
import SheetLayout from './layouts/SheetLayout';
import FormsLayout from './layouts/FormsLayout';
import MapsLayout from './layouts/MapsLayout';

import React, { useState } from 'react';
import { AppBar, Container, Box, Toolbar, Typography } from '@mui/material';

const layouts: string[] = ['sheets', 'maps', 'forms'];

function App() {
  const [layoutIndex, setLayoutIndex] = useState<number>(0);

  const handleTabChange = (newIndex: number) => {
    setLayoutIndex(newIndex);
  };

  return (
    <Container className="App">

      {/* layout tabs */}
      <Box sx={{ p: 5 }}>
        {/* <AppBar className="App-header" position="static"> */}
          {/* <Toolbar> */}
            <LayoutTabs layouts={layouts} layoutIndex={layoutIndex} onChange={handleTabChange} />
          {/* </Toolbar> */}
        {/* </AppBar> */}
      </Box>

      {/* layout content */}
      <Box sx={{ p: 3, flexGrow: 1 }}>

        {layouts[layoutIndex] === 'sheets' && (
          <SheetLayout/>
        )}

        {layouts[layoutIndex] === 'maps' && (
          <MapsLayout/>
        )}

        {layouts[layoutIndex] === 'forms' && (
          <FormsLayout/>
        )}
      </Box>
    </Container>
  );
}

export default App;
