import React, {
    ChangeEvent,
    FocusEvent,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Box,
    Button,
    InputAdornment,
    MenuItem,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    useTheme,
} from '@mui/material';

import { TakeoffInstance } from '../math/mathh';
import { setMCDU } from '../store/mcdu';
import { setRunway } from '../store/runway';
import { RootState } from '../store/store';
import {
    defaultFormContent,
    defaultOfflineFormContent,
    defaultSettingsContent,
    FormContent,
    MetarForm,
    OfflineFormContent,
    RunwaysForm,
} from './formdefs';
import { calculateTHS, useApi, validateWeight } from './formutils';

interface Props {
    useMETAR?: boolean;
    simbreif: {
        icao: string;
        rw: string;
        tow: number;
    };
}
const Form = (props: Props) => {
    const disp = useDispatch();
    const airframe = useSelector((state: RootState) => state.airframe);
    const mcduSetting = useSelector((state: RootState) => state.mcdu);
    const runway = useSelector((state: RootState) => state.runway);
    const theme = useTheme();
    const mainForm = useRef<HTMLFormElement | null>(null);
    const icaoRef = useRef<HTMLInputElement | null>(null);
    const rwRef = useRef<HTMLInputElement | null>(null);
    const [metar, setMetar] = useState<MetarForm>();
    const [formContent, setFormContent] =
        useState<FormContent>(defaultFormContent);
    const [offlineFormContent, setOfflineFormContent] =
        useState<OfflineFormContent>(defaultOfflineFormContent);
    const [runways, setRunways] = useState<RunwaysForm[]>();
    const [isOfflineForm, setIsOfflineForm] = useState(
        props ? !props.useMETAR : false
    );
    const [simbreifData, setSimbreifData] = useState({
        icao: '',
        rw: '',
        tow: 0,
    });
    const [rwManual, setRwManual] = useState<string>('');
    const [icaoManual, setIcaoManual] = useState<string>('');
    const [weightManual, setWeightManual] = useState<number>(0);

    const [calculateDisabled, setCalculateDisabled] = useState(true);
    const [rwDisabled, setRWDisabled] = useState(true);
    const [formValidation, setFormValidation] = useState({
        ICAO: false,
        weight: false,
        CG: false,
    });
    const [settings, setSettings] = useState<TakeoffInstance>(
        defaultSettingsContent
    );
    const [
        apiMetar,
        getMETAR,
        apiRunways,
        getRunways,
        apiFormValidation,
        calculate,
    ] = useApi();

    let temporaryAltimeter = 'hpa'; // TODO: Remove this

    useEffect(() => {
        setSimbreifData(props.simbreif);
        console.log(props.simbreif);
    }, [props.simbreif]);

    useEffect(() => {
        icaoRef.current!.focus();
        setIcaoManual(simbreifData.icao);
        setWeightManual(simbreifData.tow);
        console.log('hi ' + simbreifData.icao);
    }, [simbreifData]);

    useEffect(() => {
        icaoRef.current!.blur();
    }, [icaoManual]);

    useEffect(() => {
        setIsOfflineForm(!props.useMETAR);
    }, [props.useMETAR]);

    useEffect(() => {
        setMetar(apiMetar);
        changeSettings('windHeading', apiMetar?.wind?.degrees || 0);
        changeSettings('windKts', apiMetar?.wind?.speed || 0);
        changeSettings('oat', apiMetar.temperature || 0);
        changeSettings('baro', apiMetar?.altimeter?.value || 1013);
        changeSettings(
            'isHP',
            apiMetar?.altimeter?.unit
                ? apiMetar.altimeter?.unit === 'hPa'
                : false
        );
    }, [apiMetar]);

    useEffect(() => {
        changeSettings('windHeading', offlineFormContent?.windHeading || 0);
        changeSettings('windKts', offlineFormContent?.windKts || 0);
        changeSettings('oat', offlineFormContent.oat || 0);
        changeSettings('baro', offlineFormContent?.baro || 1013);
        changeSettings(
            'isHP',
            offlineFormContent?.baroUnit
                ? offlineFormContent.baroUnit === 'hPa'
                : false
        );
    }, [offlineFormContent]);

    useEffect(() => {
        setRunways(apiRunways);
    }, [apiRunways]);

    useEffect(() => {
        setRWDisabled(runways?.length ? !(runways.length > 0) : true);
        if (simbreifData.rw !== '') {
            setRwManual(simbreifData.rw);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runways]);

    useEffect(() => {
        setFormValidation({
            ...formValidation,
            ICAO: apiFormValidation.ICAO,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiFormValidation]);

    const changeSettings = (setting: string, set: number | boolean) => {
        setSettings((current) => {
            return { ...current, [setting]: set };
        });
    };

    const handleICAOChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.toUpperCase();
        setFormContent({ ...formContent, icao: e.target.value });
    };

    const handleICAOBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value !== '') {
            if (!isOfflineForm) {
                getMETAR(e.target.value);
            }
            getRunways(e.target.value);
        } else {
            console.log('BlurError43');
        }
    };

    const handleKeyDownICAO = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            icaoRef.current?.blur();
        }
    };

    const handleRunwayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContent({ ...formContent, runway: e.target.value });
        const rw = runways!.find((rw) => rw.value === e.target.value);
        if (rw) {
            changeSettings('runwayAltitude', parseInt(rw.elevation!));
            changeSettings('runwayHeading', parseInt(rw.heading!));
            changeSettings('availRunway', parseInt(rw.length!));
            changeSettings('isMeters', false); // our runway database is in feet

            disp(
                setRunway({
                    ...runway,
                    true: e.target.value,
                    length: parseInt(rw.length || '0'),
                })
            );
        }
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContent({ ...formContent, weight: parseInt(e.target.value) });
        changeSettings('tow', parseInt(e.target.value));
        setCalculateDisabled(false);
        setFormValidation((valid) => {
            return {
                ...valid,
                weight: validateWeight(
                    parseInt(e.target.value),
                    formContent?.weightUnit!,
                    airframe
                ),
            };
        });
    };

    const handleChangeWeightUnit = (e: MouseEvent<HTMLButtonElement>) => {
        const val = formContent.weightUnit === 'KG' ? 'LBS' : 'KG';
        changeSettings('isKG', val === 'KG');
        setFormValidation((valid) => {
            return {
                ...valid,
                weight: validateWeight(formContent.weight || 0, val, airframe),
            };
        });
        setFormContent((form) => {
            return { ...form, weightUnit: val };
        });
    };

    const handleCGChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 2) {
            if (e.target.value.includes('.') === false) {
                e.target.value = (Number(e.target.value) / 10).toFixed(1);
            }
        }

        if (e.target.value.length > 4) {
            e.target.value = e.target.value.substring(0, 4);
        }
        const [cg, error] = calculateTHS(parseInt(e.target.value), airframe);
        setFormValidation((valid) => {
            return {
                ...valid,
                CG: error,
            };
        });
        disp(
            setMCDU({
                ...mcduSetting,
                ths: cg,
            })
        );
    };

    const handleFlapsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContent({ ...formContent, flaps: e.target.value });
        changeSettings('flaps', parseInt(e.target.value));
        disp(
            setMCDU({
                ...mcduSetting,
                flaps: e.target.value,
            })
        );
    };

    const handleRwCondChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContent({ ...formContent, rwCond: e.target.value });
        changeSettings('runwayCondition', e.target.value === '1' ? 250 : 850); // (hard coded adjustment for v1 speed, will be replaced by a function)
    };

    const handleAiceChange = (e: MouseEvent<HTMLElement>, value: string) => {
        setFormContent({ ...formContent, antiIce: value === 'on' });
        changeSettings(
            'antiIce',
            (e.target as HTMLInputElement).value === 'on'
        );
    };

    const handlePacksChange = (e: MouseEvent<HTMLElement>, value: string) => {
        setFormContent({ ...formContent, packs: value === 'on' });
        changeSettings('packs', (e.target as HTMLInputElement).value === 'on');
    };

    const handleResetForm = (e: MouseEvent<HTMLButtonElement>) => {
        mainForm.current?.reset();
        setFormContent(defaultFormContent);
        setFormValidation({
            ICAO: false,
            weight: false,
            CG: false,
        });
    };

    const handleCalculate = (e: MouseEvent<HTMLButtonElement>) => {
        calculate(settings, formValidation);
    };
    //handleOATChange handleAltimiterUnitChange handleAltimeterChange handleWindSpeedChange handleWindDirectionChange

    const handleWindDirectionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOfflineFormContent((form) => {
            return { ...form, windHeading: Number(e.target.value) };
        });
    };

    const handleWindSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOfflineFormContent((form) => {
            return { ...form, windKts: Number(e.target.value) };
        });
    };

    const handleAltimeterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOfflineFormContent((form) => {
            return { ...form, baro: Number(e.target.value) };
        });
    };

    const handleAltimiterUnitChange = (e: MouseEvent<HTMLButtonElement>) => {
        setOfflineFormContent((form) => {
            return {
                ...form,
                baroUnit: form.baroUnit === 'inHg' ? 'hPa' : 'inHg',
            };
        });
    };

    const handleOATChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOfflineFormContent((form) => {
            return { ...form, oat: Number(e.target.value) };
        });
    };

    return (
        <>
            <Box
                ref={mainForm}
                id="main-form"
                component="form"
                autoComplete="off"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2.5,
                    '& .MuiTextField-root': { m: '0.375em', width: '25ch' },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-disabled fieldset': {
                            borderStyle: 'dashed',
                        },
                        '&:hover:not(.Mui-disabled):not(.Mui-error) fieldset': {
                            borderColor: theme.palette.primary.dark,
                            borderWidth: '2px',
                        },
                    },
                }}
            >
                <TextField
                    inputRef={icaoRef}
                    error={formValidation.ICAO}
                    id="icao"
                    label="ICAO"
                    required
                    onChange={handleICAOChange}
                    onBlur={handleICAOBlur}
                    onKeyDown={handleKeyDownICAO}
                    inputProps={{
                        maxLength: 4,
                    }}
                    value={icaoManual}
                />
                {!isOfflineForm && (
                    <>
                        <TextField
                            id="metar"
                            label="METAR"
                            placeholder="Select an ICAO to populate METAR and Runways"
                            multiline
                            disabled
                            value={
                                metar?.message ||
                                'Select an ICAO to populate METAR and Runways'
                            }
                        />
                        <TextField
                            id="outlined-select-runway"
                            inputRef={rwRef}
                            select
                            required
                            label="Select a runway"
                            defaultValue=""
                            value={rwManual}
                            disabled={rwDisabled}
                            onChange={handleRunwayChange}
                        >
                            {runways?.length === 0 && (
                                <MenuItem key="-1" value="">
                                    No Runways
                                </MenuItem>
                            )}
                            {runways?.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </>
                )}
                {isOfflineForm && (
                    <>
                        <TextField
                            id="outlined-select-runway"
                            select
                            required
                            label="Select a runway"
                            defaultValue=""
                            disabled={rwDisabled}
                            onChange={handleRunwayChange}
                        >
                            {runways?.length === 0 && (
                                <MenuItem key="-1" value="">
                                    No Runways
                                </MenuItem>
                            )}
                            {runways?.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                '& .MuiTextField-root': {
                                    m: '0.375em',
                                    width: '14ch',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    '& .MuiTextField-root': {
                                        m: '0.375em',
                                        width: '10ch',
                                    },
                                }}
                            >
                                <TextField
                                    id="wind"
                                    placeholder="000"
                                    label="Wind"
                                    onChange={handleWindDirectionChange}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                °
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    id="windspeed"
                                    placeholder="0"
                                    label="Wind Speed"
                                    onChange={handleWindSpeedChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                @
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                KTS
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>
                        <TextField
                            required
                            id="outlined-required"
                            label="Altimeter"
                            onChange={handleAltimeterChange}
                            defaultValue=""
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            onClick={handleAltimiterUnitChange}
                                            variant="outlined"
                                        >
                                            {temporaryAltimeter === 'hpa'
                                                ? 'hpa'
                                                : 'inHg'}
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="oat"
                            placeholder="0"
                            label="Outside Air Temp"
                            onChange={handleOATChange}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        °C
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                )}

                <TextField
                    error={formValidation.weight}
                    required
                    id="weight"
                    label="Weight"
                    defaultValue=""
                    type="number"
                    onChange={handleWeightChange}
                    value={weightManual}
                    inputProps={{
                        step: '10',
                        min:
                            formContent.weightUnit === 'KG'
                                ? airframe.OEW
                                : airframe.OEW * 2.20462262185,
                        max:
                            formContent.weightUnit === 'KG'
                                ? airframe.MTOW
                                : airframe.MTOW * 2.20462262185,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="outlined"
                                    onClick={handleChangeWeightUnit}
                                >
                                    {formContent?.weightUnit}
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    error={formValidation.CG}
                    required
                    id="cg"
                    label="CG"
                    type="number"
                    defaultValue=""
                    onChange={handleCGChange}
                    inputProps={{
                        step: '0.1',
                        min: airframe.Trim.MinCG,
                        max: airframe.Trim.MaxCG,
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                        ),
                    }}
                />
                <TextField
                    required
                    id="flaps"
                    select
                    label="Flaps Conf"
                    defaultValue="1"
                    onChange={handleFlapsChange}
                    value={formContent?.flaps}
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
                <TextField
                    sx={{ minWidth: '20ch' }}
                    id="rwcond"
                    select
                    required
                    label="Runway Cond"
                    defaultValue=""
                    value={formContent?.rwCond}
                    onChange={handleRwCondChange}
                >
                    <MenuItem key="1" value="Dry">
                        Dry
                    </MenuItem>
                    <MenuItem key="2" value="Wet">
                        Wet
                    </MenuItem>
                </TextField>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'left',
                        pb: 1,
                        gap: '0 4',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'left',
                            alignContent: 'left',
                            alignItems: 'center',
                            gap: '2.3em',
                            my: 1,
                        }}
                    >
                        Anti-Ice
                        <ToggleButtonGroup
                            id="antiice"
                            color="primary"
                            value={formContent.antiIce ? 'on' : 'off'}
                            exclusive
                            onChange={handleAiceChange}
                        >
                            <ToggleButton value="on">On</ToggleButton>
                            <ToggleButton value="off">Off</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'left',
                            alignContent: 'left',
                            alignItems: 'center',
                            gap: '3em',
                            mb: 1,
                        }}
                    >
                        Packs
                        <ToggleButtonGroup
                            id="packs"
                            color="primary"
                            value={formContent.packs ? 'on' : 'off'}
                            exclusive
                            onChange={handlePacksChange}
                        >
                            <ToggleButton value="on">On</ToggleButton>
                            <ToggleButton value="off">Off</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                    }}
                >
                    <Button variant="outlined" onClick={handleResetForm}>
                        Reset
                    </Button>
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
