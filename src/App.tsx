import { useContext, useState } from 'react';
import { Box } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Form from './form/form';
import MCDU from './mcdu/mcdu';
import { MCDUSettingsContextProvider, mcduSettings } from './mcdu/mcduSettings';
import { decode } from 'html-entities';
import './mcdu/mcdu.css';
import './App.css';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const speeds = useContext(MCDUSettingsContextProvider);
    const [speed, setSpeed] = useState<mcduSettings>(speeds);

    const test = () => {
        if (!speed.speedSet) {
            setSpeed({
                ...speeds,
                speedSet: true,
                v1: 127,
                vr: 128,
                v2: 129,
                flex: 69,
                flaps: 1,
                ths: '1.9UP',
            });
        } else {
            setSpeed({
                ...speeds,
                speedSet: false,
                v1: decode('&#95;&#95;&#95;'),
                vr: decode('&#95;&#95;&#95;'),
                v2: decode('&#95;&#95;&#95;'),
                flex: decode('[]'),
                flaps: decode('[]'),
                ths: decode('[&nbsp;]'),
            });
        }
    };
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <MCDUSettingsContextProvider.Provider value={speed}>
                    <Box display="flex">
                        <Form />
                        <MCDU />
                    </Box>
                    <button onClick={test}>test</button>
                </MCDUSettingsContextProvider.Provider>
            </div>
        </ThemeProvider>
    );
}

export default App;
