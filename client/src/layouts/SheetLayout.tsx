import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import { SheetData, SheetItem } from '../../../types/globals';
import SheetComponent from '../components/SheetComponent';
import SheetForm from '../components/SheetForm';

function SheetLayout() {
	const [data, setData] = useState<SheetData | null>(null);
	const [logTraining, setLogTraining] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:2000/sheet-data'); // Adjust endpoint as needed
			const resJson: SheetData = await response.json();
			setData(resJson);
		};

		if (!data) {
			fetchData();
		}
	});

	const sheetItems: SheetItem[] = data?.sheets[0]?.items || [];
	const lastTraining = sheetItems.length > 0 ? sheetItems[0].Date : null;

	const beginLog = () => {
		setLogTraining(true);
	}

	const handleFormCancel = () => {
		setLogTraining(false);
	}

	const handleFormSubmit = (formData: SheetItem) => {
		console.log('form submitted', formData);
		setLogTraining(false);
	}

  return (
    <Box className="sheet-layout" sx={{ flexGrow: 1, padding: 5 }}>
			{data && (
          <div className="sheet-data">
						<Box 
							className="title" 
							sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}
						>
							{!lastTraining ? (
								<Typography>No training logged yet.</Typography>
							) : (
								<Typography>Last Training on { lastTraining }</Typography>
							)}

							{!logTraining && (
								<Button variant="contained" onClick={beginLog}>
									Log Training
								</Button>
							)}							
						</Box>
            
            <div className="sheet-items">
							{!logTraining && sheetItems.map((item, index) => (
								<SheetComponent key={index} sheetItem={item} />
							))}
						</div>

						{logTraining && (
							<div className="sheet-form">
								<SheetForm onSubmit={handleFormSubmit} onCancel={handleFormCancel}/>
							</div>
						)}
          </div>
        )}
    </Box>
  );
}

export default SheetLayout;
