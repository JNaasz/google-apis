import './App.scss';
import LayoutTabs from './components/LayoutTabs';
import SheetLayout from './layouts/SheetLayout';
import FormsLayout from './layouts/FormsLayout';
import CalendarLayout from './layouts/CalendarLayout';

import React, { useState } from 'react';
import { Container, Box } from '@mui/material';

const layouts: string[] = ['calendar', 'sheets', 'maps', 'forms'];

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
        <LayoutTabs
          layouts={layouts}
          layoutIndex={layoutIndex}
          onChange={handleTabChange}
        />
        {/* </Toolbar> */}
        {/* </AppBar> */}
      </Box>

      {/* layout content */}
      <Box sx={{ p: 3 }}>
        {layouts[layoutIndex] === 'calendar' && <CalendarLayout />}

        {layouts[layoutIndex] === 'sheets' && <SheetLayout />}

        {layouts[layoutIndex] === 'forms' && <FormsLayout />}
      </Box>
    </Container>
  );
}

export default App;
