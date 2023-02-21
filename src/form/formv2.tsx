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

import { setMCDU } from '../store/mcdu';
import { RootState } from '../store/store';
import {
    defaultFormContent,
    FormContent,
    MetarForm,
    RunwaysForm,
} from './formdefs';
import { calculateTHS, useApi, useSettings } from './formutils';

const Form = () => {
    const disp = useDispatch();
    const mcduSetting = useSelector((state: RootState) => state.mcdu);
    const theme = useTheme();
    const mainForm = useRef<HTMLFormElement | null>(null);
    const icaoRef = useRef<HTMLInputElement | null>(null);
    const icaoActualRef = useRef<Element | undefined>(null);
    const [metar, setMetar] = useState<MetarForm>();
    const [formContent, setFormContent] =
        useState<FormContent>(defaultFormContent);
    const [runways, setRunways] = useState<RunwaysForm[]>();
    const [calculateDisabled, setCalculateDisabled] = useState(true);
    const [rwDisabled, setRWDisabled] = useState(true);
    const [formValidation, setFormValidation] = useState({
        ICAO: false,
        weight: false,
        CG: false,
    });
    // custom hooks
    const [settings, setSettings] = useSettings();
    const [apiMetar, getMETAR, apiRunways, getRunways, apiFormValidation] =
        useApi();

    const handleICAOChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.toUpperCase();
        setFormContent({ ...formContent, icao: e.target.value });
    };

    const handleICAOBlur = (e: FocusEvent<HTMLInputElement>) => {
        console.log('handleICAOBlur');
    };

    const handleKeyDownICAO = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            icaoRef.current?.blur();
        }
    };

    const handleRunwayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContent({ ...formContent, runway: e.target.value });
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContent({ ...formContent, weight: parseInt(e.target.value) });
    };

    const handleChangeWeightUnit = (e: MouseEvent<HTMLButtonElement>) => {
        setFormContent({
            ...formContent,
            weightUnit: formContent?.weightUnit === 'KG' ? 'LBS' : 'KG',
        });
    };

    const handleCGChange = (e: ChangeEvent<HTMLInputElement>) => {
        const [cg, error] = calculateTHS(parseInt(e.target.value));
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
        disp(
            setMCDU({
                ...mcduSetting,
                flaps: e.target.value,
            })
        );
    };

    const handleRwCondChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContent({ ...formContent, rwCond: e.target.value });

        // ===1?250:850 (hard coded adjustment for v1 speed, will be replaced by a function)
    };

    const handleAiceChange = (e: MouseEvent<HTMLElement>, value: string) => {
        setFormContent({ ...formContent, antiIce: value === 'on' });
    };

    const handlePacksChange = (e: MouseEvent<HTMLElement>, value: string) => {
        setFormContent({ ...formContent, packs: value === 'on' });
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

    const handleCalculate = (e: MouseEvent<HTMLButtonElement>) => {};

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
                    id="icao"
                    label="ICAO"
                    required
                    onChange={handleICAOChange}
                    onBlur={handleICAOBlur}
                    onKeyDown={handleKeyDownICAO}
                />
                <TextField
                    id="metar"
                    label="METAR"
                    placeholder="Select an ICAO to populate METAR and Runways"
                    multiline
                    disabled
                    value={metar?.message !== undefined ? metar.message : ''}
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
                    {runways?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    error={formValidation.weight}
                    required
                    id="weight"
                    label="Weight"
                    defaultValue=""
                    type="number"
                    onChange={handleWeightChange}
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
