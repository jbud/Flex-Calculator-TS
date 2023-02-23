import './mcdu/mcdu.css';
import './App.css';
import './mcdu/mcduv2.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BugReportIcon from '@mui/icons-material/BugReport';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import {
    AppBar,
    Backdrop,
    Box,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Debug from './debug/debug';
import Form from './form/formv2';
import Mcduv2 from './mcdu/mcduv2';
import Offline from './offline/offline';
/* import useScreenOrientation from './pwahooks/screenorientation'; */
import RunwayV2 from './runway/runwayv2';
import { setDebugWindow } from './store/masterDebug';
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
    /* const orientation = useScreenOrientation(); */
    const [pleaseRotate] = useState(false);

    const disp = useDispatch();

    const handleClickBug = () => {
        disp(setDebugWindow(true));
    };

    /* useEffect(() => {
      if (orientation === 0 || orientation === 180) {
          setPleaseRotate(true);
      } else {
          setPleaseRotate(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation]); */

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
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={pleaseRotate}
                    /* onClick={handleClose} */
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h6" component="div">
                            Portrait mode is not currently supported on this
                            device. Please rotate your device.
                        </Typography>
                        <ScreenRotationIcon color="inherit" fontSize="large" />
                    </Box>
                </Backdrop>
                <Offline />
                <Debug />
                <AppBar position="static">
                    <Toolbar
                        sx={{
                            my: '-9px',
                        }}
                    >
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="debugMode"
                            onClick={handleClickBug}
                        >
                            <BugReportIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            Takeoff Performance
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                >
                    <Grid
                        sx={(theme) => ({
                            [theme.breakpoints.down('md')]: { order: '1' },
                        })}
                    >
                        <Form />
                    </Grid>
                    <Grid
                        sx={(theme) => ({
                            [theme.breakpoints.down('md')]: { order: '3' },
                            [theme.breakpoints.down('sm')]: { order: '2' },
                        })}
                    >
                        <Mcduv2 />
                    </Grid>

                    <Grid
                        sx={(theme) => ({
                            [theme.breakpoints.down('md')]: { order: '4' },
                            [theme.breakpoints.down('sm')]: { order: '3' },
                        })}
                    >
                        <CrosswindCalc
                            rwHeading={parseInt(heading ? heading : '0') * 10}
                            windir={wind}
                            windspeed={windSpeed}
                        />
                    </Grid>
                    <Grid
                        sx={(theme) => ({
                            [theme.breakpoints.down('md')]: { order: '2' },
                            [theme.breakpoints.down('sm')]: { order: '4' },
                        })}
                    >
                        <RunwayV2
                            runwayLength={len}
                            runwayMarker={
                                runwaySetting.true ? runwaySetting.true : '???'
                            }
                            runwayLengthUnit={'ft'}
                            ASD={ASD}
                        />
                    </Grid>
                </Grid>
                {/* </Box> */}
            </div>
        </ThemeProvider>
    );
}

export default App;
