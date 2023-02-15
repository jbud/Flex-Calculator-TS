import { Box } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Form from './form/form';
import MCDU from './mcdu/mcdu';

import './mcdu/mcdu.css';
import './App.css';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const test = () => {
    console.log('test');
};

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <Box display="flex">
                    <Form />
                    <MCDU />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default App;
