import { Airframe } from './airframes.h';

export const a318pw: Airframe = {
    name: 'A318PW',
    Engines: 'PW6000A',
    MTOW: 68400,
    OEW: 37415,
    MLW: 57500,
    ISAIncrease: 15,
    Trim: {
        MinCG: 15,
        MaxCG: 35,
        MinTrim: -2.5,
        MaxTrim: 3.8,
    },
    Takeoff: {
        RotateISA: 130,
        WeightReferenceISA: [40000, 60000, 70000],
        TakeoffDistanceTable: [1200, 1320, 2000],
        TakeoffDistanceTableISA: [1210, 1430, 2020],
        AltitudeAdjustment: 135,
        TMAXFlex: 60,
        TREFAICE: 30,
        ThrustMultiplier: 10037,
        FlapsMultiplier: [10, 1e-7, -5],
        TakeoffRef2Alt2000: 1400,
        TakeoffRef2Alt4000: 1510,
        TakeoffRef2Alt6000: 1860,
        TakeoffRef2Alt8000: 2300,
    },
    Landing: {
        WeightReferenceISA: [40000, 50000, 60000],
        DistanceReferenceISA: [1100, 1250, 1400],
        FlapsMultiplier: [1, 1.2, 1.15, 1.1],
        RunwayConditionMultiplier: [0, 0.15],
        AltitudeCorrectionTable: [2000, 4000, 6000, 8000, 10000],
        StopDistanceDiffs: [40, 60, 60, 80, 90],
    },
    VSpeeds: {
        // VSpeeds[Flaps][Weight] ; HZSIM A318
        '1': {
            // Conf 1+F
            '35': 126,
            '40': 126,
            '45': 126,
            '50': 126,
            '55': 127,
            '60': 132,
            '65': 137,
            '70': 142,
            '75': 147,
            '80': 151
        },
        '2': {
            // Conf 2
            '35': 126,
            '40': 126,
            '45': 126,
            '50': 126,
            '55': 126,
            '60': 127,
            '65': 132,
            '70': 137,
            '75': 141,
            '80': 146
        },
        '3': {
            // Conf 3
            '35': 125,
            '40': 125,
            '45': 125,
            '50': 125,
            '55': 125,
            '60': 125,
            '65': 128,
            '70': 132,
            '75': 137,
            '80': 141
        },
    },
};
