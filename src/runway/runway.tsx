/* eslint-disable max-len */
/*
 * A32NX
 * Copyright (C) 2020-2021 FlyByWire Simulations and its contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export type DistanceLabel = {
    distance: number;
    label: string;
    type: LabelType;
};

export enum LabelType {
    Main,
    Asda,
    Toda,
}

interface RunwayVisualizationProps {
    mainLength?: number;
    asda?: number;
    toda?: number;
    labels?: DistanceLabel[];
    runwayHeading?: number;
    distanceUnit: 'ft' | 'm';
}

interface RunwayNumberProps {
    heading?: number;
}
const RunwayNumber = ({ heading }: RunwayNumberProps) => {
    const displayedHeading = heading! % 360 < 5 ? 360 : heading! % 360;

    return (
        <Box //className="mx-auto w-min text-4xl font-bold text-white"
            sx={{
                mr: 'auto',
                ml: 'auto',
                minWidth: 'min-content',
                fontSize: '2.25rem',
                fontWeight: 700,
                color: '#777',
            }}
        >
            {heading !== undefined
                ? Math.round(displayedHeading / 10)
                      .toString()
                      .padStart(2, '0')
                : '??'}
        </Box>
    );
};

const RunwayVisualizationWidget = ({
    asda = 0,
    labels = [],
    mainLength = 0,
    runwayHeading,
    toda = 0,
    distanceUnit,
}: RunwayVisualizationProps) => {
    const maxDist = () => {
        const distances = labels.map((label) => label.distance);

        return Math.max(mainLength ?? 0, asda ?? 0, toda ?? 0, ...distances);
    };

    const getLabelBottomPercentage = (label: DistanceLabel): number =>
        (label.distance / maxDist()) * 100;

    const mainHeightPercentage = (): number => {
        const maximumDist = maxDist();

        if (mainLength === 0 || maximumDist === 0) {
            return 100;
        }

        const percentage = (mainLength / maxDist()) * 100;

        return Math.max(percentage, 20);
    };

    const asdaHeightPercentage = (): number =>
        Math.max(((asda - mainLength) / maxDist()) * 100, 0);

    const todaHeightPercentage = (): number =>
        Math.max(((toda - asda) / maxDist()) * 100, 0);

    const isLabelOverDistance = (label: DistanceLabel): boolean => {
        switch (label.type) {
            case LabelType.Asda:
                return label.distance > asda;
            case LabelType.Toda:
                return label.distance > toda;
            default:
                return label.distance > mainLength;
        }
    };

    const [labelComponents, setLabelComponents] = useState<JSX.Element>();

    useEffect(
        () =>
            setLabelComponents(() => {
                const elements = labels.map((label) => {
                    const bottomPercentage =
                        label.label === 'Stop Margin'
                            ? 100
                            : getLabelBottomPercentage(label);
                    const showBelow = label.label === 'Stop Margin';
                    const col = isLabelOverDistance(label) ? 'white' : 'red';
                    const colb = isLabelOverDistance(label) ? 'green' : 'red';
                    const lab = label.distance > 0 ? 0.9 : 0;
                    const tx =
                        bottomPercentage > 85 && !showBelow
                            ? 'translateY(100px)'
                            : 'translateY(30%)';
                    return (
                        <Box
                            sx={{
                                width: '8rem',
                                height: '0.25rem',
                                position: 'absolute',
                                left: '-22.5%',
                                transform: 'translateX(50%)',
                                backgroundColor: 'current',
                                color: `${col}`,
                                opacity: `${lab}`,
                                bottom: `${bottomPercentage}%`,
                            }}
                        >
                            <p
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    color: 'current',
                                    transform: `${tx}`,
                                    opacity: `${lab}`,
                                    top: '50%',
                                    backgroundColor: `${colb}`,
                                }}
                            >
                                {label.label}{' '}
                                {Math.round(
                                    distanceUnit === 'ft'
                                        ? 3.281 * label.distance
                                        : label.distance
                                )}
                                {distanceUnit}
                            </p>
                        </Box>
                    );
                });

                return <>{elements}</>;
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [labels, distanceUnit]
    );

    const runwayBoundMarkers = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '0.375rem',
            }}
        >
            <Box
                sx={{
                    width: '0.375rem',
                    height: '3rem',
                    backgroundColor: 'white',
                    m: '1.5px',
                }}
            />
            <Box
                sx={{
                    width: '0.375rem',
                    height: '3rem',
                    backgroundColor: 'white',
                    m: '1.5px',
                }}
            />
            <Box
                sx={{
                    width: '0.375rem',
                    height: '3rem',
                    backgroundColor: 'white',
                    m: '1.5px',
                }}
            />
            <Box
                sx={{
                    width: '0.375rem',
                    height: '3rem',
                    backgroundColor: 'white',
                    m: '1.5px',
                }}
            />
            <Box
                sx={{
                    width: '0.375rem',
                    height: '3rem',
                    backgroundColor: 'white',
                    m: '1.5px',
                }}
            />
            <Box
                sx={{
                    width: '0.375rem',
                    height: '3rem',
                    backgroundColor: 'white',
                    m: '1.5px',
                }}
            />
        </Box>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexShrink: 0,
                        backgroundColor: 'red',
                        height: `${100 - mainHeightPercentage()}%`,
                    }}
                />
                <div
                    style={{
                        backgroundColor: 'green',
                        opacity: '50%',
                        height: `${todaHeightPercentage()}%`,
                    }}
                />
                <div
                    className="bg-gray-700 opacity-50"
                    style={{
                        backgroundColor: 'blue',
                        opacity: '50%',
                        height: `${asdaHeightPercentage()}%`,
                    }}
                />
                <Box
                    sx={{
                        position: 'relative',
                        flexShrink: 0,
                        width: '11rem',
                        height: '100%',
                        backgroundColor: 'black',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            overflow: 'hidden',
                            position: 'absolute',
                            inset: 0,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            paddingLeft: '0.625rem',
                            paddingRight: '0.625rem',
                            height: '100%',
                            borderStyle: 'solid',
                            borderWidth: '0.25rem',
                            borderColor: 'white',
                        }}
                    >
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {runwayBoundMarkers}
                                {runwayBoundMarkers}
                            </Box>
                            <Box
                                sx={{
                                    transform: 'rotate(180deg)',
                                }}
                            >
                                <RunwayNumber
                                    heading={
                                        runwayHeading === undefined
                                            ? undefined
                                            : runwayHeading + 180
                                    }
                                />
                            </Box>
                        </div>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '0.75rem',
                                paddingBottom: '0.75rem',
                                paddingLeft: '0.625rem',
                                paddingRight: '0.625rem',
                                marginTop: '1rem',
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                            <Box
                                sx={{
                                    width: '0.25rem',
                                    height: '2rem',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            />
                        </Box>

                        <div>
                            <RunwayNumber heading={runwayHeading} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {runwayBoundMarkers}
                                {runwayBoundMarkers}
                            </Box>
                        </div>
                    </Box>
                </Box>
                {labelComponents}
            </Box>
        </Box>
    );
};

export default RunwayVisualizationWidget;
