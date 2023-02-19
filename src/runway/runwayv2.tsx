import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';

export interface RunwayV2Props {
    runwayLength: number;
    runwayLengthUnit: string;
    ASD: number;
    runwayMarker: string;
}

export const defaultValues: RunwayV2Props = {
    runwayLength: 0,
    runwayLengthUnit: 'ft',
    ASD: 0,
    runwayMarker: '???',
};

const RunwayV2 = ({
    runwayLength,
    runwayLengthUnit,
    ASD,
    runwayMarker,
}: RunwayV2Props) => {
    const [runwayLengthText, setRunwayLengthText] = useState('?????ft');
    const [opposingRunwayMarker, setOpposingRunwayMarker] = useState('???');
    const [calculated, setCalculated] = useState(false);
    const [asdLoc, setAsdLoc] = useState(1);
    const [stopMargin, setStopMargin] = useState(0);

    useEffect(() => {
        if (ASD > 0) {
            const ASDLoc = Math.round(
                (1 - (ASD * 3.28084) / runwayLength) * 700
            );
            const stopM = (ASDLoc - 700) * -1;
            setAsdLoc(ASDLoc < 60 ? ASDLoc + 60 : ASDLoc);
            setCalculated(true);
            setStopMargin(Math.round(stopM));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ASD]); // DO NOT DEPEND ON runwayLength

    useEffect(() => {
        setRunwayLengthText(
            (runwayLength !== 0
                ? Math.round(runwayLength).toString()
                : '?????') + runwayLengthUnit
        );
    }, [runwayLength, runwayLengthUnit]);

    useEffect(() => {
        const headingHasLetter = RegExp(/[A-Z]/g).test(
            runwayMarker ? runwayMarker : ''
        );
        const letter = headingHasLetter
            ? RegExp(/[A-Z]/g).exec(runwayMarker)
            : '';
        const opposingLetter = (letr: string | undefined) => {
            switch (letr) {
                case 'L':
                    return 'R';
                case 'R':
                    return 'L';
                case 'C':
                    return 'C';
                default:
                    return '';
            }
        };

        const heading = headingHasLetter
            ? runwayMarker?.slice(0, -1)
            : runwayMarker;
        const reverseHeading = !Number.isNaN(parseInt(heading))
            ? parseInt(heading) * 10
            : 0;
        if (reverseHeading === 0) {
            setOpposingRunwayMarker('???');
        } else {
            const opposingHeading =
                reverseHeading > 180
                    ? reverseHeading - 180
                    : reverseHeading + 180;
            const opposingRunway =
                (opposingHeading / 10).toString() +
                opposingLetter(letter?.toString());
            setOpposingRunwayMarker(opposingRunway);
        }
    }, [runwayMarker]);
    /* 
    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setAsdLoc(newValue as number);
    }; */

    return (
        <>
            {/* <Slider
                defaultValue={50}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{
                    position: 'absolute',
                    top: '550px',
                    left: '60%',
                    width: '200px',
                }}
                onChange={handleSliderChange}
            />
            <Checkbox
                checked={calculated}
                sx={{
                    position: 'absolute',
                    top: '510px',
                    left: '60%',
                }}
                onChange={() => setCalculated(!calculated)}
            /> */}
            <Box
                sx={{
                    minHeight: '85vh',
                    maxHeight: '90vh',
                    pt: 4,
                    justifyContent: 'left',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 800"
                    height="100%"
                    style={{
                        minWidth: '185.5px',
                        userSelect: 'none',
                        filter: 'drop-shadow(0px 0px 12px rgb(0 0 0))',
                    }}
                >
                    <defs>
                        <filter x="0" y="-0.20" width="1" height="1" id="solid">
                            <feFlood floodColor="black" result="bg" />
                            <feMerge>
                                <feMergeNode in="bg" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <rect
                        x="23"
                        y="9.251"
                        width="115"
                        height="775"
                        style={{
                            stroke: 'rgb(255, 255, 255)',
                            strokeWidth: '2px',
                        }}
                    />
                    <line
                        style={{
                            fill: 'rgb(216, 216, 216)',
                            stroke: 'rgb(255, 255, 255)',
                            strokeWidth: '41px',
                            strokeDasharray: '5, 2',
                        }}
                        x1="27"
                        y1="750"
                        x2="75"
                        y2="750"
                    />
                    <line
                        style={{
                            fill: 'rgb(216, 216, 216)',
                            stroke: 'rgb(255, 255, 255)',
                            strokeWidth: '41px',
                            strokeDasharray: '5, 2',
                        }}
                        x1="86"
                        y1="750"
                        x2="133"
                        y2="750"
                    />
                    <line
                        style={{
                            fill: 'rgb(216, 216, 216)',
                            stroke: 'rgb(255, 255, 255)',
                            strokeWidth: '41px',
                            strokeDasharray: '5, 2',
                        }}
                        x1="27"
                        y1="45"
                        x2="75"
                        y2="45"
                    />
                    <line
                        style={{
                            fill: 'rgb(216, 216, 216)',
                            stroke: 'rgb(255, 255, 255)',
                            strokeWidth: '41px',
                            strokeDasharray: '5, 2',
                        }}
                        x1="86"
                        y1="45"
                        x2="133"
                        y2="45"
                    />
                    <text
                        style={{
                            fill: 'rgba(255, 255, 255, 0.79)',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '26px',
                            fontWeight: '700',
                            whiteSpace: 'pre',
                            textAnchor: 'middle',
                        }}
                        x="85"
                        y="720"
                    >
                        {runwayMarker === '0' ? '???' : runwayMarker}{' '}
                        {/** 10L */}
                    </text>
                    <text
                        style={{
                            fill: 'rgba(255, 255, 255, 0.79)',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '26px',
                            fontWeight: '700',
                            whiteSpace: 'pre',
                            textAnchor: 'middle',
                        }}
                        x="85"
                        y="95.217"
                        transform="matrix(-1, 0, 0, -1, 160, 174)"
                    >
                        {opposingRunwayMarker} {/** 28R */}
                    </text>
                    <line
                        style={{
                            fill: 'rgb(216, 216, 216)',
                            stroke: 'rgb(255, 255, 255)',
                            strokeWidth: '3px',
                            strokeDasharray: '20px',
                        }}
                        x1="78.861"
                        y1="104.674"
                        x2="80.586"
                        y2="700"
                    />
                    <g transform="matrix(1, 0, 0, 1, -2, -3)">
                        <text
                            filter="url(#solid)"
                            style={{
                                fill: 'rgb(255,255,255',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '17px',
                                fontWeight: '700',
                                whiteSpace: 'pre',
                                textAnchor: 'end',
                            }}
                            transform="matrix(0, -1, 1, 0, -118, 147)"
                        >
                            <tspan x="-218.293" y="204.737">
                                {runwayLengthText} {/** 10,000ft */}
                            </tspan>
                        </text>
                    </g>
                    <g
                        style={{
                            opacity: `${calculated ? '0.88' : '0'}`,
                        }}
                    >
                        <line
                            style={{
                                fill: 'rgb(216, 216, 216)',
                                stroke: 'rgb(47, 255, 0)',
                                strokeWidth: '3px',
                                strokeLinecap: 'round',
                            }}
                            x1="35.628"
                            y1={10 + asdLoc} // 160.475
                            x2="164.643"
                            y2={10 + asdLoc} // 160.475
                        />
                        <text
                            filter="url(#solid)"
                            style={{
                                fill: 'rgb(47, 255, 0)',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '13.5px',
                                whiteSpace: 'pre',
                            }}
                            x="42.862"
                            y={5 + asdLoc} // 157
                        >
                            ASD {Math.round(ASD * 3.28084)}
                            {runwayLengthUnit}
                        </text>

                        <line
                            style={{
                                fill: 'rgb(216, 216, 216)',
                                stroke: 'rgb(47, 255, 0)',
                                strokeWidth: '3px',
                                strokeLinecap: 'round',
                                strokeDasharray: '6px',
                            }}
                            x1="150"
                            y1="13" // 12.793
                            x2="150"
                            y2={10 + asdLoc} // 155.051
                        />
                        <line
                            style={{
                                fill: 'rgb(216, 216, 216)',
                                stroke: 'rgb(47, 255, 0)',
                                strokeWidth: '3px',
                                strokeLinecap: 'round',
                            }}
                            x1="155.738"
                            y1="9.172"
                            x2="119.054"
                            y2="9.463"
                        />
                        <text
                            style={{
                                fill: 'rgb(47, 255, 0)',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '8.6px',
                                fontWeight: '700',
                                whiteSpace: 'pre',
                            }}
                        >
                            <tspan x="140" y={20 + asdLoc}>
                                {/** 191.446, 73.944 */}
                                Stop Margin
                            </tspan>
                            <tspan x="140" dy="1em">
                                {stopMargin}
                                {runwayLengthUnit}
                            </tspan>
                        </text>
                    </g>
                </svg>
            </Box>
        </>
    );
};

export default RunwayV2;
