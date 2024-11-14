import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarEvent from '../components/CalendarEvent.tsx';
import endpoints from '../config';

const iframeUrl = process.env.REACT_APP_IFRAME_URL;

// full calendar
// calendar list
// filter calendar list
// accordian doc: http://localhost:3000/material-ui/react-accordion/#introduction

function CalendarLayout() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [events, setEvents] = useState<CalEvent[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(endpoints.calendar); // Adjust endpoint as needed
      const resJson: CalEvent[] = await response.json();
      setEvents(resJson);
    };

    if (!events) {
      fetchData();
    }
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box className="calendar-layout" sx={{ flexGrow: 1, padding: 5 }}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel1d-header"
          aria-controls="panel1d-content"
        >
          Calendar as an Iframe
        </AccordionSummary>
        <AccordionDetails>
          <iframe title="googleMap" src={iframeUrl} width="800" height="600" />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel2d-header"
          aria-controls="panel2d-content"
        >
          Calendar as a List
        </AccordionSummary>
        <AccordionDetails>
          {events &&
            events.map((event, index) => (
              <CalendarEvent key={index} event={event} />
            ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default CalendarLayout;
