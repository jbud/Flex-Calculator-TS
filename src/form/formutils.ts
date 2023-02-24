import { parseMetar } from 'metar-taf-parser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Metar } from '@flybywiresim/api-client';

import { FlexMath, TakeoffInstance } from '../math/math';
import { debug, DebugMessage } from '../store/masterDebug';
import { setMCDU } from '../store/mcdu';
import { Runway, setRunway } from '../store/runway';
import { RootState } from '../store/store';
import {
    defaultMetarForm,
    defaultRunwayState,
    MetarForm,
    RunwaysForm,
} from './formdefs';

export const useApi = (): [
    MetarForm,
    (icao: string) => Promise<void>,
    RunwaysForm[],
    (icao: string) => Promise<void>,
    { ICAO: boolean },
    (
        settings: TakeoffInstance,
        validation: { ICAO: boolean; weight: boolean; CG: boolean }
    ) => void
] => {
    const disp = useDispatch();
    const mcduSetting = useSelector((state: RootState) => state.mcdu);
    const runway = useSelector((state: RootState) => state.runway);
    const [metar, setMetar] = useState<MetarForm>(defaultMetarForm);
    const [runways, setRunways] = useState<RunwaysForm[]>([]);
    const [runwayStateDispatcher, setRunwayStateDispatcher] =
        useState<Runway>(defaultRunwayState);
    const [formValidation, setFormValidation] = useState({
        ICAO: false,
    });

    const sendDebug = (formattedDebug: DebugMessage) => {
        disp(debug(formattedDebug));
    };

    const calculate = (
        settings: TakeoffInstance,

        validation: { ICAO: boolean; weight: boolean; CG: boolean }
    ) => {
        if (validation.ICAO || validation.weight || validation.CG) return;
        const ret = FlexMath.calculateFlexDist(settings);
        const vSpeeds = FlexMath.CalculateVSpeeds(
            settings.availRunway,
            settings.requiredRunway,
            settings.tow,
            settings.flaps,
            settings.runwayAltitude,
            settings.isMeters,
            settings.isKG,
            settings.runwayCondition
        );
        sendDebug({
            title: 'Calculate: INFO',
            message: JSON.stringify(ret),
        });
        sendDebug({
            title: 'Calculate: INFO',
            message: JSON.stringify(vSpeeds),
        });
        sendDebug({
            title: 'Calculate: INFO',
            message: JSON.stringify(settings),
        });
        setRunwayStateDispatcher((state) => {
            return {
                ...state,
                asd:
                    ret.flex < ret.minFlex
                        ? ret.togaRequiredRunway
                        : ret.requiredRunway,
            };
        });

        disp(
            setMCDU({
                ...mcduSetting,
                flex: ret.flex < ret.minFlex ? 'USE TOGA [ ]' : ret.flex,
                v1: vSpeeds.v1,
                vr: vSpeeds.vr,
                v2: vSpeeds.v2,
                speedSet: true,
            })
        );
    };

    const getRunways = async (icao: string) => {
        fetch('./database/runways/icao/' + icao + '.json')
            .then((response) => response.json())
            .then((data) => {
                const rws = data.runways;
                const rwList: RunwaysForm[] = []; //{ value: '', heading: '', elevation: '', length: '' },
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
                ...runway,
                heading: runwayStateDispatcher.heading,
                asd: runwayStateDispatcher.asd,
                wind: runwayStateDispatcher.wind,
                windSpeed: runwayStateDispatcher.windSpeed,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runwayStateDispatcher]);

    return [metar, getMETAR, runways, getRunways, formValidation, calculate];
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

export const validateWeight = (weight: number, unit: string): boolean => {
    const w320 = {
        // Weight chart for the A320, need to implement for other aircraft
        MTOW: 79000,
        EMPTY: 37230,
    };
    return unit === 'KG'
        ? weight < w320.EMPTY || weight > w320.MTOW
        : FlexMath.parseWeight(weight, false) < w320.EMPTY ||
              FlexMath.parseWeight(weight, false) > w320.MTOW;
};
