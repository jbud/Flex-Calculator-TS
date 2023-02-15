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

const Form = () => {
    const [runways, setRunways] = useState([
        { value: '', heading: '', elevation: '' },
    ]);
    const [rwDisabled, setRWDisabled] = useState(true);
    const [calculateDisabled, setCalculateDisabled] = useState(true);
    const [weightUnit, setWeightUnit] = React.useState('kg');
    const [metar, setMetar] = useState({
        message: 'Select an ICAO to populate METAR and Runways',
    });

    const getRunways = async (icao: string) => {
        fetch('/database/runways/' + icao + '.json')
            .then((response) => response.json())
            .then((data) => {
                const rws = data.runways;
                const rwList = [{ value: '', heading: '', elevation: '' }];
                for (let i = 0; i < rws.length; i++) {
                    rwList.push({
                        value: rws[i].he_ident,
                        heading: rws[i].he_heading_degT,
                        elevation: data.elevation_ft,
                    });
                    rwList.push({
                        value: rws[i].le_ident,
                        heading: rws[i].le_heading_degT,
                        elevation: data.elevation_ft,
                    });
                }
                setRunways(rwList);
            });
    };

    const handleChangeWeightUnit = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setWeightUnit(event.target.value);
    };
    const getMETAR = async (icao: string) => {
        Metar.get(icao, 'vatsim')
            .then((data) => {
                setMetar(parseMetar(data.metar));
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const handleApi = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        getMETAR(e.target.value);
        getRunways(e.target.value);
        setRWDisabled(false);
    };

    const handleCalculate = () => {}; // todo: calculate takeoff performance and populate context for MCDU

    const handleRunwayChange = () => {};

    const handleWeightChange = () => {};

    const handleCGChange = () => {};

    const handleFlapsChange = () => {};

    const handleAiceChange = () => {};

    const handlePacksChange = () => {};

    useEffect(() => {
        // todo apply runway elements to takeoffInstance settings
        console.log(runways);
    }, [runways]);

    useEffect(() => {
        //todo: apply metar elements to takeoffInstance settings
        console.log(metar);
    }, [metar]);

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                m: '8px',
            }}
            noValidate
            autoComplete="off"
        >
            <Box display="flex" flexDirection="column">
                <TextField
                    required
                    id="outlined-required-icao"
                    label="ICAO"
                    onBlur={handleApi}
                />
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
                            control={<Radio size="small" checked />}
                            label="KGS"
                        />
                        <FormControlLabel
                            value="lbs"
                            control={<Radio size="small" />}
                            label="LBS"
                        />
                    </RadioGroup>
                </Box>

                <TextField
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
                <TextField
                    id="outlined-select-rwcond"
                    select
                    required
                    label="Runway Cond"
                    defaultValue=""
                >
                    <MenuItem key="1" value="1">
                        Dry
                    </MenuItem>
                    <MenuItem key="2" value="2">
                        Wet
                    </MenuItem>
                </TextField>
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
    );
};

export default Form;
