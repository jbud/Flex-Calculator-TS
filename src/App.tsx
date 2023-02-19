import './mcdu/mcdu.css';
import './App.css';
import './mcdu/mcduv2.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';

import Form from './form/form';
import Mcduv2 from './mcdu/mcduv2';
import RunwayV2 from './runway/runwayv2';
import { RootState } from './store/store';
import CrosswindCalc from './wind/crosswind';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#232124',
            paper: '#424242',
        },
    },
});

function App() {
    const runwaySetting = useSelector((state: RootState) => state.runway);
    const [len, setLen] = useState(0);
    const [wind, setWind] = useState(0);
    const [heading, setHeading] = useState('0');
    const [windSpeed, setwindSpeed] = useState(0);
    const [ASD, setASD] = useState(0);

    useEffect(() => {
        const l = runwaySetting.length ? runwaySetting.length : 0;
        setLen(l);
        const d = runwaySetting.asd ? runwaySetting.asd : 0;
        setWind(runwaySetting.wind ? runwaySetting.wind : 0);
        const headingHasLetter = RegExp(/[A-Z]/g).test(
            runwaySetting.true ? runwaySetting.true : ''
        );
        const h = headingHasLetter
            ? runwaySetting.true?.slice(0, -1)
            : runwaySetting.true;
        setHeading(h ? h : '0');
        setwindSpeed(
            parseInt(
                runwaySetting.windSpeed
                    ? runwaySetting.windSpeed.toString()
                    : '0'
            )
        );
        setASD(d);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runwaySetting]);
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <Box
                    display="flex"
                    sx={{
                        height: '95vh',
                        pt: 2,
                    }}
                    justifyContent="space-between"
                >
                    <Form />
                    {<Mcduv2 />}

                    <CrosswindCalc
                        rwHeading={parseInt(heading ? heading : '0') * 10}
                        windir={wind}
                        windspeed={windSpeed}
                    />
                    <RunwayV2
                        runwayLength={len}
                        runwayMarker={
                            runwaySetting.true ? runwaySetting.true : '???'
                        }
                        runwayLengthUnit={'ft'}
                        ASD={ASD}
                    />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default App;
