import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3FB950', // Your primary color
    },
    secondary: {
      main: '#7C72FF', // Your secondary color
    },
    background: {
      paper: 'rgb(240, 246, 252)',
    }
  },
  typography: {
    // Customize typography options here
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    // Add more typography styles as needed
  },
	components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#3FB950', // Default color for unselected tabs
          '&.Mui-selected': {
            color: '#7C72FF', // Color for selected tab
          },
        },
      },
    },
	},
});

export default theme;
