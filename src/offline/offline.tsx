import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    MenuItem,
    TextField,
} from '@mui/material';

import INOP from '../inop/inop';
import { FlexMath } from '../math/math';
import { setManual } from '../store/manual';
import { RootState } from '../store/store';

const Offline = () => {
    const disp = useDispatch();
    const open = useSelector((state: RootState) => state.manual.dialogOpen);
    const [dialogOpen, setDialogOpen] = React.useState(open);
    const [tick, setTick] = useState<NodeJS.Timeout | undefined>(undefined);
    const [weightUnit, setWeightUnit] = useState('kg');
    const [altimeterUnit, setAltimeterUnit] = useState('hpa');
    const [runways, setRunways] = useState([
        { value: '', heading: '', elevation: '', length: '' },
    ]);
    const [rwDisabled, setRWDisabled] = useState(true);
    const [formValidation, setFormValidation] = useState({
        ICAO: false,
        weight: false,
        CG: false,
    });

    const handleClickClose = () => {
        setDialogOpen(false);
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
                setFormValidation((valid) => {
                    return {
                        ...valid,
                        ICAO: false,
                    };
                });
            })
            .catch(() => {
                setFormValidation((valid) => {
                    return {
                        ...valid,
                        ICAO: true,
                    };
                });
            });
    };

    const handleGetRunways = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length === 4 && e.target.value !== '') {
            getRunways(e.target.value);
            setRWDisabled(false);
            setFormValidation((valid) => {
                return {
                    ...valid,
                    ICAO: false,
                };
            });
        } else {
            setFormValidation((valid) => {
                return {
                    ...valid,
                    ICAO: true,
                };
            });
        }
    };

    const handleICAOChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.value = e.target.value.toUpperCase();
    };

    const handleRunwayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const rw = runways.find((rw) => rw.value === e.target.value);
        if (rw === undefined) return;
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const MTOWk = 79000;
        const minTowk = 40000;
        let w = parseInt(e.target.value);
        const weightValidation = FlexMath.parseWeight(w, weightUnit === 'kg');
        const error = weightValidation > MTOWk || weightValidation < minTowk;
        setFormValidation((valid) => {
            return {
                ...valid,
                weight: error,
            };
        });
        clearTimeout(tick);
        const newTick = setTimeout(() => {}, 500);
        setTick(newTick);
    };

    const handleChangeWeightUnit = () => {
        setWeightUnit((f) => (f === 'kg' ? 'lb' : 'kg'));
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Trim = Math.abs(CalculatedTrim).toFixed(1) + 'UP';
        }
        /* disp(
            setMCDU({
                ...mcduSetting,
                ths: Trim,
            })
        ); */
    };
    const handleFlapsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};
    const handleRwCondChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {};
    const handleAiceChange = (e: React.SyntheticEvent<Element, Event>) => {};
    const handlePacksChange = (e: React.SyntheticEvent<Element, Event>) => {};

    const handleWindDirChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {};
    const handleWindSpeedChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {};
    const handleAltimeterChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {};

    const handleAltimeterUnitChange = () => {
        setAltimeterUnit((f) => (f === 'inhg' ? 'hpa' : 'inhg'));
    };
    const handleTempChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);

    useEffect(() => {
        disp(setManual({ dialogOpen: dialogOpen }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogOpen]);

    return (
        <>
            <Dialog open={dialogOpen} onClose={handleClickClose}>
                <DialogTitle>Manual Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Manually enter the conditions for the flight
                    </DialogContentText>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                            m: '8px',
                            maxWidth: '60vw',
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Box display="flex" flexDirection="column">
                            <TextField
                                error={formValidation.ICAO}
                                required
                                id="outlined-required-icao"
                                label="ICAO"
                                onChange={handleICAOChange}
                                onBlur={handleGetRunways}
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
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box display="flex" flexDirection="row">
                                <TextField
                                    required
                                    id="outlined-required-adornment"
                                    label="Wind Direction"
                                    defaultValue=""
                                    onChange={handleWindDirChange}
                                    sx={{
                                        m: 1,
                                        maxWidth: '18ch',
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                °
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    sx={{
                                        maxWidth: '15ch',
                                    }}
                                    required
                                    id="outlined-required"
                                    label="Speed"
                                    defaultValue=""
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                kts
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={handleWindSpeedChange}
                                />
                            </Box>
                            <Box display="flex" flexDirection="row">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Altimeter"
                                    defaultValue=""
                                    onChange={handleAltimeterChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handleAltimeterUnitChange()
                                                    }
                                                >
                                                    {altimeterUnit === 'hpa'
                                                        ? 'hpa'
                                                        : 'inHg'}
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box display="flex" flexDirection="row">
                                <TextField
                                    error={formValidation.weight}
                                    required
                                    id="outlined-required"
                                    label="Weight"
                                    defaultValue=""
                                    onChange={handleWeightChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handleChangeWeightUnit()
                                                    }
                                                >
                                                    {weightUnit === 'lb'
                                                        ? 'kg'
                                                        : 'lb'}
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <TextField
                                required
                                id="outlined-required"
                                label="OAT"
                                defaultValue=""
                                onChange={handleTempChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            °C
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                error={formValidation.CG}
                                required
                                id="outlined-required"
                                label="CG"
                                defaultValue=""
                                onChange={handleCGChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            %
                                        </InputAdornment>
                                    ),
                                }}
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
                            <Box
                                display="flex"
                                flexDirection="row"
                                maxHeight="5rem"
                                maxWidth="20rem"
                            >
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
                        </Box>
                    </Box>
                    <DialogActions>
                        <Box display="flex">
                            <Button onClick={handleClickClose}>Cancel</Button>
                            <Button onClick={handleClickClose}>
                                Enter Manual Details
                            </Button>
                            <Box
                                sx={{
                                    transform:
                                        'translateX(-6rem) translateY(0.75rem)',
                                }}
                                width="6rem"
                            >
                                <INOP />
                            </Box>
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Offline;
