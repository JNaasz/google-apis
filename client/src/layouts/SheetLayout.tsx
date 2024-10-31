import React, { useEffect, useState } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';

function SheetLayout() {
	const [data, setData] = useState<SheetData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:2000/sheet-data'); // Adjust endpoint as needed
			const resJson: SheetData = await response.json();
			setData(resJson);
		};

		if (!data) {
			fetchData();
		}
	}, []);

  return (
    <Box className="sheet-layout" sx={{ flexGrow: 1, padding: 5 }}>
			New sheet data:
			{data && (
          <div className="sheet-data">
            <h2>Data Response</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
    </Box>
  );
}

export default SheetLayout;
