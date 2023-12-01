import { Airframe } from './airframes.h';

export const a388ea: Airframe = {
    name: 'A388EA',
    Engines: 'EA GP7270',
    MTOW: 242000,
    OEW: 137000,
    MLW: 191000,
    ISAIncrease: 15,
    Trim: {
        MinCG: 15,
        MaxCG: 35,
        MinTrim: -2.5,
        MaxTrim: 3.8,
    },
    Takeoff: {
        RotateISA: 150,
        WeightReferenceISA: [170000, 200000, 230000],
        TakeoffDistanceTable: [1680, 1860, 2310],
        TakeoffDistanceTableISA: [1770, 1960, 2420],
        AltitudeAdjustment: 100,
        TMAXFlex: 60,
        TREFAICE: 30,
        ThrustMultiplier: 10031,
        FlapsMultiplier: [10, 1e-7, -5],
        TakeoffRef2Alt2000: 1950,
        TakeoffRef2Alt4000: 2095,
        TakeoffRef2Alt6000: 2300,
        TakeoffRef2Alt8000: 2900,
    },
    Landing: {
        WeightReferenceISA: [170000, 180000, 190000],
        DistanceReferenceISA: [1740, 1850, 1910],
        FlapsMultiplier: [1, 1.2, 1.15, 1.1],
        RunwayConditionMultiplier: [0, 0.15],
        AltitudeCorrectionTable: [2000, 4000, 6000, 8000, 10000],
        StopDistanceDiffs: [50, 190, 110, 90, 140],
    },
    VSpeeds: {
        // VSpeeds[Flaps][Weight] ; TBD
        '1': {
            // Conf 1+F
        },
        '2': {
            // Conf 2
        },
        '3': {
            // Conf 3
        },
    },
};
