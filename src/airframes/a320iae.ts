import { Airframe } from './airframes.h';

export const a320iae: Airframe = {
    name: 'A320IAE',
    Engines: 'IAE V2500',
    MTOW: 78000,
    OEW: 43780,
    MLW: 66000,
    ISAIncrease: 15,
    Trim: {
        MinCG: 17,
        MaxCG: 40,
        MinTrim: -2.5,
        MaxTrim: 3.8,
    },
    Takeoff: {
        RotateISA: 140,
        WeightReferenceISA: [63503, 70000, 77111],
        TakeoffDistanceTable: [1200, 1510, 2000],
        TakeoffDistanceTableISA: [1300, 1620, 2200],
        AltitudeAdjustment: 100,
        TMAXFlex: 55,
        TREFAICE: 31,
        ThrustMultiplier: 10032,
        FlapsMultiplier: [10, 1e-7, -5],
        TakeoffRef2Alt2000: 1700,
        TakeoffRef2Alt4000: 1910,
        TakeoffRef2Alt6000: 2001,
        TakeoffRef2Alt8000: 2250,
    },
    Landing: {
        WeightReferenceISA: [50000, 60000, 70000],
        DistanceReferenceISA: [1143, 1341, 1621],
        FlapsMultiplier: [1, 1.2, 1.15, 1.1],
        RunwayConditionMultiplier: [0, 0.15],
        AltitudeCorrectionTable: [2000, 4000, 6000, 8000, 10000],
        StopDistanceDiffs: [61, 61, 91, 168, 178],
    },
    VSpeeds: {
        // VSpeeds[Flaps][Weight] ; Fenix A320 v1.0.6.146 (LVFR A320 IAE unusable atm)
        '1': {
            // Conf 1+F
            '40': 123,
            '45': 123,
            '50': 123,
            '55': 129,
            '60': 135,
            '65': 151,
            '70': 156,
            '75': 159,
            '80': 159,
        },
        '2': {
            // Conf 2
            '40': 123,
            '45': 123,
            '50': 123,
            '55': 124,
            '60': 132,
            '65': 150,
            '70': 157,
            '75': 160,
            '80': 160,
        },
        '3': {
            // Conf 3
            '40': 123,
            '45': 123,
            '50': 123,
            '55': 128,
            '60': 134,
            '65': 150,
            '70': 158,
            '75': 160,
            '80': 160,
        },
    },
};
