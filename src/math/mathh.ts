export const BARO_SEA = 1013; // 29.92 inhg

export type TakeoffInstance = {
    flex: number;
    availRunway: number;
    requiredRunway: number;
    windHeading: number;
    windKts: number;
    tow: number;
    isKG: boolean;
    isHP: boolean;
    isMeters: boolean;
    baro: number;
    oat: number;
    flaps: number;
    runwayHeading: number;
    runwayAltitude: number;
    antiIce: boolean;
    packs: boolean;
    togaRequiredRunway: number;
    toga: boolean;
    runwayCondition: number;
};

export type AircraftConfig = {
    isaInc: number;
    vrisa: number;
    towt1isa: number;
    towt2isa: number;
    towt3isa: number;
    todist1: number;
    todist2: number;
    todist3: number;
    todist1isa: number;
    todist2isa: number;
    todist3isa: number;
    toaltAdj: number;
    tmaxflex: number;
    trefaice: number;
    engThrust: number;
    f1: number;
    f2: number;
    f3: number;
    to2k: number;
    to4k: number;
    to6k: number;
    to8k: number;
};

export type VSpeedsTable = {
    [flaps: string]: {
        [Weight: string]: number;
    };
};

/* const a380Takeoff: VSpeedsTable = {
    '1': {},
    '2': {},
    '3': {},
}; */
/* const a330Takeoff: VSpeedsTable = {
    '1': {},
    '2': {},
    '3': {},
}; */
/* const a21nTakeoff: VSpeedsTable = {
    '1': {},
    '2': {},
    '3': {},
}; */
/* const a319Takeoff: VSpeedsTable = {
    '1': {},
    '2': {},
    '3': {},
}; */
/* const a318Takeoff: VSpeedsTable = {
    '1': {},
    '2': {},
    '3': {},
}; */

export const a20nTakeoff: VSpeedsTable = {
    '1': {
        '35': 126,
        '40': 126,
        '45': 126,
        '50': 127,
        '55': 127,
        '60': 132,
        '65': 137,
        '70': 142,
        '75': 147,
        '80': 152,
    },
    '2': {
        '35': 126,
        '40': 126,
        '45': 126,
        '50': 126,
        '55': 127,
        '60': 127,
        '65': 132,
        '70': 137,
        '75': 141,
        '80': 146,
    },
    '3': {
        '35': 125,
        '40': 125,
        '45': 125,
        '50': 125,
        '55': 125,
        '60': 128,
        '65': 129,
        '70': 132,
        '75': 141,
        '80': 141,
    },
};

/* const a380: AircraftConfig = {
    isaInc: 0,
    vrisa: 0,
    towt1isa: 0,
    towt2isa: 0,
    towt3isa: 0,
    todist1: 0,
    todist2: 0,
    todist3: 0,
    todist1isa: 0,
    todist2isa: 0,
    todist3isa: 0,
    toaltAdj: 0,
    tmaxflex: 0,
    trefaice: 0,
    engThrust: 0,
    f1: 0,
    f2: 0,
    f3: 0,
    to2k: 0,
    to4k: 0,
    to6k: 0,
    to8k: 0,
}; */
/* const a319: AircraftConfig = {
    isaInc: 0,
    vrisa: 0,
    towt1isa: 0,
    towt2isa: 0,
    towt3isa: 0,
    todist1: 0,
    todist2: 0,
    todist3: 0,
    todist1isa: 0,
    todist2isa: 0,
    todist3isa: 0,
    toaltAdj: 0,
    tmaxflex: 0,
    trefaice: 0,
    engThrust: 0,
    f1: 0,
    f2: 0,
    f3: 0,
    to2k: 0,
    to4k: 0,
    to6k: 0,
    to8k: 0,
}; */
/* const a318: AircraftConfig = {
    isaInc: 0,
    vrisa: 0,
    towt1isa: 0,
    towt2isa: 0,
    towt3isa: 0,
    todist1: 0,
    todist2: 0,
    todist3: 0,
    todist1isa: 0,
    todist2isa: 0,
    todist3isa: 0,
    toaltAdj: 0,
    tmaxflex: 0,
    trefaice: 0,
    engThrust: 0,
    f1: 0,
    f2: 0,
    f3: 0,
    to2k: 0,
    to4k: 0,
    to6k: 0,
    to8k: 0,
}; */
/* const a330: AircraftConfig = {
    isaInc: 0,
    vrisa: 0,
    towt1isa: 0,
    towt2isa: 0,
    towt3isa: 0,
    todist1: 0,
    todist2: 0,
    todist3: 0,
    todist1isa: 0,
    todist2isa: 0,
    todist3isa: 0,
    toaltAdj: 0,
    tmaxflex: 0,
    trefaice: 0,
    engThrust: 0,
    f1: 0,
    f2: 0,
    f3: 0,
    to2k: 0,
    to4k: 0,
    to6k: 0,
    to8k: 0,
}; */
/* const a21n: AircraftConfig = {
    isaInc: 0,
    vrisa: 0,
    towt1isa: 0,
    towt2isa: 0,
    towt3isa: 0,
    todist1: 0,
    todist2: 0,
    todist3: 0,
    todist1isa: 0,
    todist2isa: 0,
    todist3isa: 0,
    toaltAdj: 0,
    tmaxflex: 0,
    trefaice: 0,
    engThrust: 0,
    f1: 0,
    f2: 0,
    f3: 0,
    to2k: 0,
    to4k: 0,
    to6k: 0,
    to8k: 0,
}; */

export const a20n: AircraftConfig = {
    isaInc: 15,
    vrisa: 142,
    towt1isa: 50000,
    towt2isa: 75000,
    towt3isa: 85000,
    todist1: 1000,
    todist2: 1690,
    todist3: 2300,
    todist1isa: 1050,
    todist2isa: 1750,
    todist3isa: 2390,
    toaltAdj: 100,
    tmaxflex: 60,
    trefaice: 30,
    engThrust: 10031,
    f1: 10,
    f2: 1e-7,
    f3: -5,
    to2k: 1770,
    to4k: 1920,
    to6k: 2050,
    to8k: 2330,
};
