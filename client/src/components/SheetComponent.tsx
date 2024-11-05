import { Card, CardContent } from '@mui/material';
import { SheetItem } from '../../../types/globals';

interface SheetComponentProps {
  sheetItem: SheetItem;
}

function SheetComponent({ sheetItem }: SheetComponentProps) {
	return (
		<Card className="sheetItem" sx={{ marginBottom: 2 }}>
			<CardContent>
				<p><span>{ sheetItem.Date }</span></p>
				<p>Practiced for { sheetItem.Duration }min in the { sheetItem.Place }.</p>
				{sheetItem.Comment && (
					<p>{sheetItem.Comment}.</p>
				)}
			</CardContent>
		</Card>
	);
}

export default SheetComponent;