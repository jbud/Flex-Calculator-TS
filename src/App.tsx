import "./mcdu/mcdu.css";
import "./App.css";
import "./mcdu/mcduv2.css";

import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BugReportIcon from "@mui/icons-material/BugReport";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import {
  AppBar,
  Backdrop,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { a318cfm, a318pw, a319cfm, a319iae, a320cfm, a320iae, a20n, a21nlp, a21npw, a338, a339, a388rr, a388ea, Airframe } from "./airframes/index";
import Debug from "./debug/debug";
import Form from "./form/formv2";
import Mcduv2 from "./mcdu/mcduv2";
import Offline from "./offline/offline";
/* import useScreenOrientation from './pwahooks/screenorientation'; */
import RunwayV2 from "./runway/runwayv2";
import { setAirframe } from "./store/airframe";
import { setDebugWindow } from "./store/masterDebug";
import { RootState } from "./store/store";
import CrosswindCalc from "./wind/crosswind";

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
    const disp = useDispatch();
    const runwaySetting = useSelector((state: RootState) => state.runway);
    const airframeSelection = useSelector((state: RootState) => state.airframe);
    const [len, setLen] = useState(0);
    const [wind, setWind] = useState(0);
    const [heading, setHeading] = useState('0');
    const [windSpeed, setwindSpeed] = useState(0);
    const [ASD, setASD] = useState(0);
    const [online, setOnline] = useState(true);
    /* const orientation = useScreenOrientation(); */
    const [pleaseRotate] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedAirframeName, setSelectedAirframeName] = useState('A20N');
    const [selectedAirframe, setSelectedAirframe] =
        useState<Airframe>(airframeSelection);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickBug = () => {
        disp(setDebugWindow(true));
    };
    const handleClickWifi = () => {
        setOnline(!online);
    };
    const handleClickAirplane = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    type AFTable = {
        [key: string]: Airframe;
    };

    const airframes: AFTable = {
        a318c: a318cfm,
        a318p: a318pw,
        a319c: a319cfm,
        a319i: a319iae,
        a320c: a320cfm,
        a320i: a320iae,
        a20n: a20n,
        a21nl: a21nlp,
        a21nxl: a21nlp,
        a21np: a21npw,
        a21nxp: a21npw,
        a338: a338,
        a339: a339,
        a380r: a388rr,
        a380e: a388ea,
    };

    const changeAirframe = (selection: string) => {
        disp(setAirframe(structuredClone(airframes[selection])));
        setSelectedAirframe(airframes[selection]);
        console.log(airframeSelection);
        setSelectedAirframeName(selection);
    };

    const handleChangeAirframe = (e: MouseEvent<HTMLElement>) => {
        changeAirframe(e.currentTarget.id);
        handleClose();
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
                            mx: '0.5em',
                        }}
                    >
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="debugMode"
                            onClick={handleClickBug}
                            sx={{
                                mr: '0.5em',
                            }}
                        >
                            <BugReportIcon />
                        </IconButton>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="offlineMode"
                            onClick={handleClickWifi}
                            sx={{
                                mr: '0.5em',
                            }}
                        >
                            {online && <WifiIcon />}
                            {!online && <WifiOffIcon />}
                        </IconButton>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="airframeSelection"
                            onClick={handleClickAirplane}
                            sx={{
                                mr: '0.5em',
                            }}
                        >
                            <FlightTakeoffIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem
                                id="a318c"
                                selected={selectedAirframeName === 'a318c'}
                                onClick={handleChangeAirframe}
                            >
                                A318-100 (CFM)
                            </MenuItem>
                            <MenuItem
                                id="a318p"
                                selected={selectedAirframeName === 'a318p'}
                                onClick={handleChangeAirframe}
                                >
                                A318-100 (PW)
                            </MenuItem>
                            <MenuItem
                                id="a319c"
                                selected={selectedAirframeName === 'a319c'}
                                onClick={handleChangeAirframe}
                            >
                                A319-133 (CFM)
                            </MenuItem>
                            <MenuItem
                                id="a319i"
                                selected={selectedAirframeName === 'a319i'}
                                onClick={handleChangeAirframe}
                                >
                                A319-133 (IAE)
                            </MenuItem>
                            <MenuItem
                                id="a320c"
                                selected={selectedAirframeName === 'a320c'}
                                onClick={handleChangeAirframe}
                                >
                                A320-214 (CFM)
                            </MenuItem>
                            <MenuItem
                                id="a320i"
                                selected={selectedAirframeName === 'a320i'}
                                onClick={handleChangeAirframe}
                                >
                                A320-232 (IAE)
                            </MenuItem>
                            <MenuItem
                                id="a20n"
                                selected={selectedAirframeName === 'a20n'}
                                onClick={handleChangeAirframe}
                            >
                                A320-251 Neo
                            </MenuItem>
                            <MenuItem
                                id="a21nl"
                                selected={selectedAirframeName === 'a21nl'}
                                onClick={handleChangeAirframe}
                            >
                                A321-251 Neo (LEAP)
                            </MenuItem>
                            <MenuItem
                                id="a21nxl"
                                selected={selectedAirframeName === 'a21nxl'}
                                disabled
                                onClick={handleChangeAirframe}
                            >
                                A321-253 Neo (LEAP LR)
                            </MenuItem>
                            <MenuItem
                                id="a21np"
                                selected={selectedAirframeName === 'a21np'}
                                onClick={handleChangeAirframe}
                            >
                                A321-271 Neo (PW)
                            </MenuItem>
                            <MenuItem
                                id="a21nxp"
                                selected={selectedAirframeName === 'a21nxp'}
                                disabled
                                onClick={handleChangeAirframe}
                            >
                                A321-273 Neo (PW LR)
                            </MenuItem>
                            <MenuItem
                                id="a338"
                                selected={selectedAirframeName === 'a338'}
                                onClick={handleChangeAirframe}
                                >
                                A330-800 Neo
                            </MenuItem>
                            <MenuItem
                                id="a339"
                                selected={selectedAirframeName === 'a339'}
                                onClick={handleChangeAirframe}
                            >
                                A330-941 Neo
                            </MenuItem>
                            <MenuItem
                                id="a380r"
                                selected={selectedAirframeName === 'a380r'}
                                disabled
                                onClick={handleChangeAirframe}
                            >
                                A380-841 (RR)
                            </MenuItem>
                            <MenuItem
                                id="a380e"
                                selected={selectedAirframeName === 'a380e'}
                                disabled
                                onClick={handleChangeAirframe}
                                >
                                A380-841 (EA)
                            </MenuItem>
                        </Menu>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            {selectedAirframe.name} - Takeoff Performance
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
                        <Form useMETAR={online} />
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
