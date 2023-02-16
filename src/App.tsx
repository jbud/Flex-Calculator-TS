import { Box } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Form from './form/form';
import MCDU from './mcdu/mcdu';
import RunwayVisualizationWidget, { DistanceLabel } from './runway/runway';
import './mcdu/mcdu.css';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import CrosswindCalc from './wind/crosswind';
import { useEffect, useState } from 'react';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const test = () => {
    console.log('test');
};

function App() {
    const runwaySetting = useSelector((state: RootState) => state.runway);
    const [len, setLen] = useState(0);
    const [dist, setDist] = useState(0);
    const [wind, setWind] = useState(0);
    const [heading, setHeading] = useState('0');
    const [windSpeed, setwindSpeed] = useState(0);
    const [runwayVisualizationLabels, setRunwayVisualizationLabels] = useState<
        DistanceLabel[]
    >([]);

    useEffect(() => {
        setLen(runwaySetting.length ? runwaySetting.length : 0);
        setDist(runwaySetting.asd ? runwaySetting.asd : 0);
        setWind(runwaySetting.wind ? runwaySetting.wind : 0);
        const headingHasLetter = RegExp(/[A-Z]/g).test(
            runwaySetting.true ? runwaySetting.true : ''
        );
        const h = headingHasLetter
            ? runwaySetting.true?.slice(0, -1)
            : runwaySetting.true;
        setHeading(h ? h : '0');
        setwindSpeed(parseInt(heading ? heading : '0') * 10 - wind + 90);

        setRunwayVisualizationLabels([
            {
                distance: dist,
                label: 'ASD',
                type: 1,
            },
            {
                distance: len - dist,
                label: 'Stop Margin',
                type: 2,
            },
        ]);
        console.table(runwaySetting);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runwaySetting]);
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <Box
                    display="flex"
                    sx={{
                        height: '80vh',
                    }}
                    justifyContent="space-between"
                    marginRight={5}
                >
                    <Form />
                    <MCDU />

                    <CrosswindCalc
                        rwHeading={parseInt(heading ? heading : '0') * 10}
                        windir={wind}
                        windspeed={windSpeed}
                    />

                    <RunwayVisualizationWidget
                        mainLength={len}
                        labels={runwayVisualizationLabels}
                        runwayHeading={parseInt(heading ? heading : '0') * 10}
                        distanceUnit={'m'}
                    />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default App;
