import { parseMetar } from 'metar-taf-parser';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Metar } from '@flybywiresim/api-client';

import { TakeoffInstance } from '../math/math';
import { debug, DebugMessage } from '../store/masterDebug';
import { Runway, setRunway } from '../store/runway';
import {
    defaultMetarForm,
    defaultRunwaysForm,
    defaultRunwayState,
    defaultSettingsContent,
    MetarForm,
    RunwaysForm,
} from './formdefs';

export const useSettings = (): [
    TakeoffInstance,
    React.Dispatch<React.SetStateAction<TakeoffInstance>>
] => {
    const disp = useDispatch();
    const [settings, setSettings] = useState<TakeoffInstance>(
        defaultSettingsContent
    );

    return [settings, setSettings];
};

export const useApi = (): [
    MetarForm,
    (icao: string) => Promise<void>,
    RunwaysForm[],
    (icao: string) => Promise<void>,
    { ICAO: boolean }
] => {
    const disp = useDispatch();
    const [metar, setMetar] = useState<MetarForm>(defaultMetarForm);
    const [runways, setRunways] = useState<RunwaysForm[]>([defaultRunwaysForm]);
    const [runwayStateDispatcher, setRunwayStateDispatcher] =
        useState<Runway>(defaultRunwayState);
    const [formValidation, setFormValidation] = useState({
        ICAO: false,
    });

    const sendDebug = (formattedDebug: DebugMessage) => {
        disp(debug(formattedDebug));
    };

    const getRunways = async (icao: string) => {
        fetch('./database/runways/icao/' + icao + '.json')
            .then((response) => response.json())
            .then((data) => {
                const rws = data.runways;
                const rwList: RunwaysForm[] = [
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
            })
            .catch((err) => {
                //console.log(JSON.stringify(err));
                sendDebug({
                    title: 'Error',
                    message: JSON.stringify(err),
                });
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
                sendDebug({
                    title: 'METAR Error',
                    message: JSON.stringify(err),
                });
                setFormValidation((valid) => {
                    return {
                        ...valid,
                        ICAO: true,
                    };
                });
            });
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

    return [metar, getMETAR, runways, getRunways, formValidation];
};

export const calculateTHS = (gravity: number): [string, boolean] => {
    const cg320 = {
        // CG chart for the A320, need to implement for other aircraft
        CGMin: 17,
        CGMax: 40,
        TrimMin: -2.5,
        TrimMax: 3.8,
    };
    const cg = Number(gravity);
    const error = cg < cg320.CGMin || cg > cg320.CGMax;

    const magic1 =
        (cg320.TrimMin - cg320.TrimMax) / (cg320.CGMax - cg320.CGMin);

    const magic2 = cg320.TrimMax - cg320.CGMin * magic1;
    const CalculatedTrim = magic1 * cg + magic2;
    let Trim = '';
    if (isNaN(CalculatedTrim)) {
        return ['[  ]', true];
    }
    if (CalculatedTrim < 0) {
        Trim = Math.abs(CalculatedTrim).toFixed(1) + 'DN';
    } else {
        Trim = Math.abs(CalculatedTrim).toFixed(1) + 'UP';
    }
    return [Trim, error];
};
