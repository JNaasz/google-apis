import { Card, CardContent } from '@mui/material';
import type { CalEvent } from '../../../types/globals';

interface CalProps {
	event: CalEvent;
}

const CalendarEvent = ({ event }: CalProps ) => {
  return (
    <Card className="sheetItem" sx={{ marginBottom: 2 }}>
      <CardContent>
        {event.start && <p>{event.start.dateTime}</p>}
				{event.summary && <p>{event.summary}</p>}
        {event.location && <p>Location: {event.location}.</p>}
      </CardContent>
    </Card>
  );
};

export default CalendarEvent;
