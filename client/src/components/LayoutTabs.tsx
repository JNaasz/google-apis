import { Tabs, Tab } from '@mui/material';

interface LayoutTabsProps {
	layouts: string[];
	layoutIndex: number;
	onChange: (newIndex: number) => void;
}

const LayoutTabs: React.FC<LayoutTabsProps>  = ({ layouts, layoutIndex, onChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

	return (
		<Tabs 
			value={layoutIndex} 
			onChange={handleChange} 
			aria-label="layout tabs"
			textColor="secondary"
			indicatorColor="secondary"
		>
			{layouts.map((layout, index) => (
				<Tab key={index} label={layout} id={`tab-${index}`} />
			))}
		</Tabs>
	)
}

export default LayoutTabs;