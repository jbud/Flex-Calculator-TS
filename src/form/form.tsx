import React, { useState } from 'react';
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

const Form = () => {
    const [runways, setRunways] = useState([{ value: '' }]);
    const [rwDisabled, setRWDisabled] = useState(true);
    const [weightUnit, setWeightUnit] = React.useState('kg');

    const handleChangeWeightUnit = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setWeightUnit(event.target.value);
    };

    const handleApi = () => {
        console.log('cool api stuff');
        setRunways(() => {
            return [{ value: '10L' }, { value: '10R' }];
        });
        setRWDisabled(false);
    };
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
                    defaultValue="KPDX"
                    onBlur={handleApi}
                />
                <TextField
                    id="outlined-select-runway"
                    select
                    required
                    label="Select a runway"
                    defaultValue=""
                    disabled={rwDisabled}
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
                            control={<Radio size="small" />}
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
                />
                <TextField
                    required
                    id="outlined-select-flaps"
                    select
                    label="Flaps Conf"
                    defaultValue=""
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
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="AC On"
                        id="packs"
                    />
                </FormGroup>
                <Button variant="outlined">Calculate</Button>
            </Box>
        </Box>
    );
};

export default Form;
