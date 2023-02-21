import { useEffect, useState } from 'react';

import { Box, TextField } from '@mui/material';

// import INOP from '../inop/inop';
import Windsock from './windsock';

interface Crosswind {
    rwHeading: number;
    windir: number;
    windspeed: number;
}

export type CrosswindResult = {
    parallel_comp: number;
    xwind_comp: number;
    xwind_dir_bool: number;
    thetadeg: number;
};

const CrosswindCalc = ({
    rwHeading = 0,
    windir = 0,
    windspeed = 0,
}: Crosswind) => {
    const [message, setMessage] = useState('');
    /* First determine whether the calculator is using runway name or magnetic heading */

    const rwyrad = (rwHeading * Math.PI) / 180;

    const windrad = (windir * Math.PI) / 180;

    const rwyx = Math.sin(rwyrad);

    const rwyy = Math.cos(rwyrad);

    const windx = Math.sin(windrad);

    const windy = Math.cos(windrad);

    const thetarad = Math.acos(rwyx * windx + rwyy * windy);

    const thetadeg = Math.round((thetarad * 180) / Math.PI);

    let sigfig = 100;

    const parallel_comp = Math.round(
        Math.round(sigfig * windspeed * Math.cos(thetarad)) / sigfig
    );

    const xwind_comp = Math.round(
        Math.round(sigfig * windspeed * Math.sin(thetarad)) / sigfig
    );

    const parallel = thetadeg < 180 ? 'Headwind' : 'Tailwind';
    useEffect(() => {
        setMessage(`Wind:\n 
    ${windir}° @ ${windspeed}kts\n
    ${parallel}: ${parallel_comp} kts\n
    Crosswind: ${xwind_comp} kts\n`);
    }, [windir, windspeed, parallel, parallel_comp, xwind_comp]);

    return (
        <Box
            sx={{
                height: '30vh',
                my: '10',
            }}
        >
            <Box
                sx={{
                    pt: '1.75rem',
                    width: '6rem',
                    mr: '6rem',
                    ml: '1rem',
                }}
            >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mr: '6rem', width: '20ch' },

                        '& .MuiOutlinedInput-root': {
                            '&.Mui-disabled fieldset': {
                                borderStyle: 'dashed',
                            },
                        },
                        pt: '0.5rem',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-textarea"
                        label="WindMessage"
                        placeholder="Winds"
                        multiline
                        disabled
                        value={message}
                    />
                    {/* 90 degree offset because windsock svg points right */}
                    <Windsock windDirRelative={thetadeg + 90} />
                    {/* <INOP /> */}
                </Box>
            </Box>
        </Box>
    );
};
export default CrosswindCalc;
