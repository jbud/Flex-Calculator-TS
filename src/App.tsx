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
import Windsock from './wind/windsock';

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
    const len = runwaySetting.length ? runwaySetting.length : 0;
    const dist = runwaySetting.asd ? runwaySetting.asd : 0;
    const wind = runwaySetting.wind ? runwaySetting.wind : 0;
    const headingHasLetter = RegExp(/[A-Z]/g).test(
        runwaySetting.true ? runwaySetting.true : ''
    );
    const heading = headingHasLetter
        ? runwaySetting.true?.slice(0, -1)
        : runwaySetting.true;
    const windrel = parseInt(heading ? heading : '0') * 10 - wind + 90;

    const runwayVisualizationLabels: DistanceLabel[] = [
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
    ];
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
                    marginRight={20}
                >
                    <Form />
                    <MCDU />
                    <Box
                        sx={{
                            height: '20vh',
                        }}
                    >
                        <Windsock windDirRelative={windrel} />
                    </Box>

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
