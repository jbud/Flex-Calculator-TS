import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Button,
} from '@mui/material';
import { Metar } from '@flybywiresim/api-client';
import { parseMetar } from 'metar-taf-parser';
import { TakeoffInstance, FlexMath } from '../math/math';
import { useDispatch, useSelector } from 'react-redux';
import { setMCDU } from '../store/mcdu';
import { RootState } from '../store/store';
import { setRunway, Runway } from '../store/runway';
import INOP from '../inop/inop';
import Offline from '../offline/offline';
import { setManual } from '../store/manual';

const Form = () => {
    const disp = useDispatch();
    const mcduSetting = useSelector((state: RootState) => state.mcdu);
    const [runwayStateDispatcher, setRunwayStateDispatcher] = useState<Runway>({
        heading: 0,
        length: 0,
        asd: 0,
        true: '0',
        wind: 0,
        windSpeed: 0,
    });
    const [weightChk, setWeightChk] = useState('kgs');
    const [runways, setRunways] = useState([
        { value: '', heading: '', elevation: '', length: '' },
    ]);
    const [rwDisabled, setRWDisabled] = useState(true);
    const [calculateDisabled, setCalculateDisabled] = useState(true);
    const [weightUnit] = useState('kg');
    const [formValidation, setFormValidation] = useState({
        ICAO: false,
        weight: false,
        CG: false,
    });
    const [tick, setTick] = useState<NodeJS.Timeout | undefined>(undefined);
    const [metar, setMetar] = useState({
        message: 'Select an ICAO to populate METAR and Runways',
        wind: {
            degrees: 0,
            speed: 0,
        },
        altimeter: {
            value: 0,
            unit: '',
        },
        temperature: 0,
    });
    const [settings, setSettings] = useState<TakeoffInstance>({
        flex: 0,
        availRunway: 0,
        requiredRunway: 0,
        windHeading: 0,
        windKts: 0,
        tow: 0,
        isKG: true,
        isHP: false,
        isMeters: false,
        baro: 0,
        oat: 0,
        flaps: 0,
        runwayHeading: 0,
        runwayAltitude: 0,
        antiIce: true,
        packs: false,
        togaRequiredRunway: 0,
        toga: false,
        runwayCondition: 0,
    });

    const changeSettings = (setting: string, set: number | boolean) => {
        setSettings((current) => {
            return { ...current, [setting]: set };
        });
    };

    const getRunways = async (icao: string) => {
        fetch('./database/runways/' + icao + '.json')
            .then((response) => response.json())
            .then((data) => {
                const rws = data.runways;
                const rwList = [
                    { value: '', heading: '', elevation: '', length: '' },
                ];
                for (let i = 0; i < rws.length; i++) {
                    rwList.push({
                        value: rws[i].he_ident,
                        heading: rws[i].he_heading_degT,
                        elevation: data.elevation_ft,
                        length: rws[i].length_ft,
                    });
                    rwList.push({
                        value: rws[i].le_ident,
                        heading: rws[i].le_heading_degT,
                        elevation: data.elevation_ft,
                        length: rws[i].length_ft,
                    });
                }
                setRunways(rwList);
            });
    };

    const getMETAR = async (icao: string) => {
        Metar.get(icao, 'vatsim')
            .then((data) => {
                const mtar = parseMetar(data.metar);
                let windH = 0;
                let windS = 0;
                if (mtar.wind !== undefined) {
                    if (mtar.wind.degrees !== undefined) {
                        windH = mtar.wind.degrees;
                    }
                    if (mtar.wind.speed !== undefined) {
                        windS = mtar.wind.speed;
                    }
                }
                setMetar({
                    message: mtar.message,
                    wind: {
                        degrees: windH,
                        speed: mtar.wind !== undefined ? mtar.wind.speed : 0,
                    },
                    altimeter: {
                        value:
                            mtar.altimeter !== undefined
                                ? mtar.altimeter.value
                                : 0,
                        unit:
                            mtar.altimeter !== undefined
                                ? mtar.altimeter.unit
                                : '',
                    },
                    temperature:
                        mtar.temperature !== undefined ? mtar.temperature : 0,
                });
                setRunwayStateDispatcher((state) => {
                    return {
                        ...state,
                        wind: windH,
                        windSpeed: windS,
                    };
                });
                setFormValidation((valid) => {
                    return {
                        ...valid,
                        ICAO: false,
                    };
                });
            })
            .catch((err) => {
                setFormValidation((valid) => {
                    return {
                        ...valid,
                        ICAO: true,
                    };
                });
            });
    };
    const handleApi = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length === 4 && e.target.value !== '') {
            getMETAR(e.target.value);
            getRunways(e.target.value);
            setRWDisabled(false);
        } else {
            setFormValidation((valid) => {
                return {
                    ...valid,
                    ICAO: true,
                };
            });
        }
    };

    const handleCalculate = () => {
        if (formValidation.ICAO || formValidation.weight || formValidation.CG)
            return;
        const ret = FlexMath.calculateFlexDist(settings);
        const vSpeeds = FlexMath.CalculateVSpeeds(
            settings.availRunway,
            settings.requiredRunway,
            settings.tow,
            settings.flaps,
            settings.runwayAltitude,
            settings.isMeters,
            settings.runwayCondition
        );
        setRunwayStateDispatcher((state) => {
            return {
                ...state,
                heading: settings.runwayHeading,
                length: FlexMath.parseDist(
                    settings.availRunway,
                    settings.isMeters
                ),
                asd: settings.requiredRunway,
            };
        });
        disp(
            setMCDU({
                ...mcduSetting,
                flex: ret.flex,
                v1: vSpeeds.v1,
                vr: vSpeeds.vr,
                v2: vSpeeds.v2,
                speedSet: true,
            })
        );
    }; // todo: calculate takeoff performance and populate context for MCDU

    const handleRunwayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const rw = runways.find((rw) => rw.value === e.target.value);
        if (rw === undefined) return;
        changeSettings('runwayAltitude', parseInt(rw.elevation));
        changeSettings('runwayHeading', parseInt(rw.heading));
        changeSettings('availRunway', parseInt(rw.length));
        changeSettings('isMeters', false);
        setRunwayStateDispatcher((state) => {
            return {
                ...state,
                true: e.target.value,
            };
        });
        disp(
            setMCDU({
                ...mcduSetting,
                rw: e.target.value,
            })
        );
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const MTOWk = 79000;
        const minTowk = 40000;
        let w = parseInt(e.target.value);
        const weightValidation = FlexMath.parseWeight(w, settings.isKG);
        const error = weightValidation > MTOWk || weightValidation < minTowk;
        setFormValidation((valid) => {
            return {
                ...valid,
                weight: error,
            };
        });
        clearTimeout(tick);
        const newTick = setTimeout(() => {
            changeSettings('tow', parseInt(e.target.value));
            setCalculateDisabled(false);
        }, 500);
        setTick(newTick);
    };

    const handleChangeWeightUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeightChk(e.target.value);
        changeSettings('isKG', e.target.value === 'kgs');
    };

    const handleCGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cg320 = {
            CGMin: 17,
            CGMax: 40,
            TrimMin: -2.5,
            TrimMax: 3.8,
        };
        const cg = Number(e.target.value);
        const error = cg < cg320.CGMin || cg > cg320.CGMax;
        setFormValidation((valid) => {
            return {
                ...valid,
                CG: error,
            };
        });
        const magic1 =
            (cg320.TrimMin - cg320.TrimMax) / (cg320.CGMax - cg320.CGMin);

        const magic2 = cg320.TrimMax - cg320.CGMin * magic1;
        const CalculatedTrim = magic1 * cg + magic2;
        let Trim = '';
        if (CalculatedTrim < 0) {
            Trim = Math.abs(CalculatedTrim).toFixed(1) + 'DN';
        } else {
            Trim = Math.abs(CalculatedTrim).toFixed(1) + 'UP';
        }
        disp(
            setMCDU({
                ...mcduSetting,
                ths: Trim,
            })
        );
    };

    const handleFlapsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeSettings('flaps', parseInt(e.target.value));
        disp(
            setMCDU({
                ...mcduSetting,
                flaps: e.target.value,
            })
        );
    };

    const handleRwCondChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeSettings('runwayCondition', e.target.value === '1' ? 250 : 850);
    };

    const handleAiceChange = (e: React.SyntheticEvent<Element, Event>) => {
        changeSettings('antiIce', (e.target as HTMLInputElement).checked);
    };

    const handlePacksChange = (e: React.SyntheticEvent<Element, Event>) => {
        changeSettings('packs', (e.target as HTMLInputElement).checked);
    };

    const handleICAOChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.value = e.target.value.toUpperCase();
    };

    const handleClickManual = () => {
        disp(
            setManual({
                dialogOpen: true,
            })
        );
    };

    useEffect(() => {
        disp(
            setRunway({
                heading: runwayStateDispatcher.heading,
                length: runwayStateDispatcher.length,
                asd: runwayStateDispatcher.asd,
                true: runwayStateDispatcher.true,
                wind: runwayStateDispatcher.wind,
                windSpeed: runwayStateDispatcher.windSpeed,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runwayStateDispatcher]);

    useEffect(() => {
        //todo: apply metar elements to takeoffInstance settings
        changeSettings('windHeading', metar.wind.degrees);
        changeSettings('windKts', metar.wind.speed);
        changeSettings('oat', metar.temperature);
        changeSettings('baro', metar.altimeter.value);
        changeSettings('isHP', metar.altimeter.unit === 'hPa');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metar]);

    return (
        <>
            <Offline />
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    m: '8px',
                    maxWidth: '35ch',
                }}
                noValidate
                autoComplete="off"
            >
                <Box display="flex" flexDirection="column">
                    <Box
                        display="flex"
                        flexDirection="row"
                        sx={{ verticalAlign: 'center' }}
                    >
                        <TextField
                            error={formValidation.ICAO}
                            required
                            id="outlined-required-icao"
                            label="ICAO"
                            onChange={handleICAOChange}
                            onBlur={handleApi}
                        />
                        <Button
                            sx={{ height: '2rem', p: '0.5rem', mt: '1.25rem' }}
                            variant="outlined"
                            onClick={handleClickManual}
                        >
                            Manual
                        </Button>
                    </Box>
                    <TextField
                        id="outlined-textarea"
                        label="METAR"
                        placeholder="Select an ICAO to populate METAR and Runways"
                        multiline
                        disabled
                        value={metar.message !== undefined ? metar.message : ''}
                    />
                    <TextField
                        id="outlined-select-runway"
                        select
                        required
                        label="Select a runway"
                        defaultValue=""
                        disabled={rwDisabled}
                        onChange={handleRunwayChange}
                    >
                        {runways.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box display="flex" flexDirection="row">
                        <TextField
                            error={formValidation.weight}
                            required
                            id="outlined-required"
                            label="Weight"
                            defaultValue=""
                            onChange={handleWeightChange}
                        />
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={weightUnit}
                            onChange={handleChangeWeightUnit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <FormControlLabel
                                value="kgs"
                                control={
                                    <Radio
                                        size="small"
                                        checked={weightChk === 'kgs'}
                                    />
                                }
                                label="KGS"
                            />
                            <FormControlLabel
                                value="lbs"
                                control={
                                    <Radio
                                        size="small"
                                        checked={weightChk === 'lbs'}
                                    />
                                }
                                label="LBS"
                            />
                        </RadioGroup>
                    </Box>

                    <TextField
                        error={formValidation.CG}
                        required
                        id="outlined-required"
                        label="CG"
                        defaultValue=""
                        onChange={handleCGChange}
                    />
                    <TextField
                        required
                        id="outlined-select-flaps"
                        select
                        label="Flaps Conf"
                        defaultValue=""
                        onChange={handleFlapsChange}
                    >
                        <MenuItem key="1" value="1">
                            1+F
                        </MenuItem>
                        <MenuItem key="2" value="2">
                            2
                        </MenuItem>
                        <MenuItem key="3" value="3">
                            3
                        </MenuItem>
                    </TextField>
                    <Box display="flex" flexDirection="row" maxHeight="5rem">
                        <TextField
                            sx={{ minWidth: '20ch' }}
                            id="outlined-select-rwcond"
                            select
                            required
                            label="Runway Cond"
                            defaultValue=""
                            onChange={handleRwCondChange}
                        >
                            <MenuItem key="1" value="1">
                                Dry
                            </MenuItem>
                            <MenuItem key="2" value="2">
                                Wet
                            </MenuItem>
                        </TextField>
                        <INOP />
                    </Box>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Anti-Ice On"
                            id="antiice"
                            onChange={handleAiceChange}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="AC On"
                            id="packs"
                            onChange={handlePacksChange}
                        />
                    </FormGroup>
                    <Button
                        variant="outlined"
                        disabled={calculateDisabled}
                        onClick={handleCalculate}
                    >
                        Calculate
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Form;
