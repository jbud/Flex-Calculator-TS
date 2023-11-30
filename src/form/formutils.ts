import { parseMetar } from 'metar-taf-parser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Airframe } from '../airframes';
import { FlexMath } from '../math/math';
import { TakeoffInstance } from '../math/mathh';
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
import { fetchMetar } from './metar';

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
    const airframe = useSelector((state: RootState) => state.airframe);
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
        const ret = FlexMath.calculateFlexDist(settings, airframe);
        const vSpeeds = FlexMath.CalculateVSpeeds(
            settings.availRunway,
            settings.requiredRunway,
            settings.tow,
            settings.flaps,
            settings.runwayAltitude,
            settings.isMeters,
            settings.isKG,
            airframe,
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

        /*outPutV1Speeds(
        runwayAltitude: number,
        oat: number,
        baro: number,
        runwayCondition: number,
        windHeading: number,
        windKts: number,
        runwayHeading: number,
        flaps: number,
        VR: number
    )*/
        const temp1 = settings.runwayCondition === 850 ? 0 : 1;
        let signal = false;
        let takeoffInvalid = false;
        let v1ver2 = FlexMath.V1SpeedVer2(
            settings.runwayAltitude,
            settings.availRunway,
            settings.requiredRunway,
            settings.oat,
            settings.baro,
            temp1,
            settings.windHeading,
            settings.windKts,
            settings.runwayHeading,
            settings.flaps,
            FlexMath.parseWeight(settings.tow, settings.isKG),
            vSpeeds.vr,
            airframe
        );
        if (v1ver2 === -1) {
            signal = true;
            v1ver2 = FlexMath.V1SpeedVer2(
                settings.runwayAltitude,
                settings.availRunway,
                settings.togaRequiredRunway, // try with TOGA distance
                settings.oat,
                settings.baro,
                temp1,
                settings.windHeading,
                settings.windKts,
                settings.runwayHeading,
                settings.flaps,
                FlexMath.parseWeight(settings.tow, settings.isKG),
                vSpeeds.vr,
                airframe
            );
        }
        let m = '';
        if (v1ver2 === -1) {
            takeoffInvalid = true;

            m =
                'INVALID TAKEOFF CAUSED BY V1 SPEED LOWER THAN 100KTS EVEN WITH TOGA THRUST TRY A HIGHER FLAPS SETTING OR A LONGER RUNWAY';
        }
        if (
            settings.togaRequiredRunway >
            FlexMath.parseDist(settings.availRunway, false)
        ) {
            takeoffInvalid = true;
            m =
                'INVALID TAKEOFF CAUSED BY CALCULATED DISTANCE REQUIRED LONGER THAN TORA EVEN WITH TOGA THRUST TRY A HIGHER FLAPS SETTING OR A LONGER RUNWAY';
        }
        sendDebug({
            title: 'Calculate: INFO',
            message: 'correctedV1: ' + v1ver2 + '',
        });
        setRunwayStateDispatcher((state) => {
            return {
                ...state,
                asd: takeoffInvalid
                    ? 0
                    : ret.flex < ret.minFlex || signal
                    ? ret.togaRequiredRunway
                    : ret.requiredRunway,
            };
        });
        disp(
            setMCDU({
                ...mcduSetting,
                flex: takeoffInvalid
                    ? 'INVALID TAKEOFF [ ]'
                    : ret.flex < ret.minFlex || signal
                    ? 'USE TOGA [ ]'
                    : ret.flex,
                v1: takeoffInvalid ? 0 : v1ver2,
                vr: takeoffInvalid ? 0 : vSpeeds.vr,
                v2: takeoffInvalid ? 0 : vSpeeds.v2,
                speedSet: true,
                message: takeoffInvalid ? m : '',
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
        fetchMetar(icao)
            .then((data) => {
                const mtar = parseMetar(data.data.raw);
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

export const calculateTHS = (
    gravity: number,
    airframe: Airframe
): [string, boolean] => {
    const Trims = {
        // CG chart for the A320, need to implement for other aircraft
        CGMin: airframe.Trim.MinCG,
        CGMax: airframe.Trim.MaxCG,
        TrimMin: airframe.Trim.MinTrim,
        TrimMax: airframe.Trim.MaxTrim,
    };
    const cg = Number(gravity);
    const error = cg < Trims.CGMin || cg > Trims.CGMax;

    const magic1 =
        (Trims.TrimMin - Trims.TrimMax) / (Trims.CGMax - Trims.CGMin);

    const magic2 = Trims.TrimMax - Trims.CGMin * magic1;
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

export const validateWeight = (
    weight: number,
    unit: string,
    airframe: Airframe
): boolean => {
    const Weights = {
        // Weight chart for the A320, need to implement for other aircraft
        MTOW: airframe.MTOW,
        EMPTY: airframe.OEW,
    };
    return unit === 'KG'
        ? weight < Weights.EMPTY || weight > Weights.MTOW
        : FlexMath.parseWeight(weight, false) < Weights.EMPTY ||
              FlexMath.parseWeight(weight, false) > Weights.MTOW;
};
