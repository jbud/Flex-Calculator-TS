const BARO_SEA = 1013; // 29.92 inhg

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

type AircraftConfig = {
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

type VSpeedsTable = {
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

const a20nTakeoff: VSpeedsTable = {
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

const a20n: AircraftConfig = {
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

export class FlexMath {
    static parseQNH(qnh: number, ishpa = true) {
        // workaround to allow decimal or not
        if (qnh - Math.floor(qnh) !== 0) qnh *= 100;

        if (!ishpa) {
            qnh /= 2.95360316; // convert inHg to hectopascels
        }
        return qnh;
    }
    static parseWeight(w: number, iskg = true) {
        let r = w;
        if (!iskg) {
            r = w / 2.20462262;
        }
        return r;
    }
    static parseDist(d: number, ism = true) {
        let r = d;
        if (!ism) {
            r = d / 3.2808399;
        }
        return r;
    }

    static calculateDensityCorrection(
        density: number,
        AltCorrectionsTable: number[],
        perfDistDiffTable: number[]
    ) {
        let densityCorrection: number = 0;

        for (let i = 0; i < AltCorrectionsTable.length; i++) {
            densityCorrection +=
                density > AltCorrectionsTable[i]
                    ? perfDistDiffTable[i]
                    : (density / 200) * (perfDistDiffTable[i] / 100);
        }
        densityCorrection +=
            density < AltCorrectionsTable[3]
                ? 0
                : ((density - AltCorrectionsTable[3]) / 200) *
                  (perfDistDiffTable[4] / 100);

        return densityCorrection >= 0 ? densityCorrection : 0;
    }

    static plantSeeds(perfWeight: number, a: AircraftConfig) {
        let seedModifierstd = 0;
        let seedModifierisa = 0;

        let stdSeedTable = [
            perfWeight < a.towt2isa
                ? ((a.todist2 - a.todist1) / (a.towt2isa - a.towt1isa)) *
                  (perfWeight - a.towt1isa)
                : ((a.todist2 - a.todist1) / (a.towt2isa - a.towt1isa)) *
                  (a.towt2isa - a.towt1isa),
            perfWeight < a.towt2isa
                ? 0
                : perfWeight < a.towt3isa
                ? ((a.todist3 - a.todist2) / (a.towt3isa - a.towt2isa)) *
                  (perfWeight - a.towt2isa)
                : ((a.todist3 - a.todist2) / (a.towt3isa - a.towt2isa)) *
                  (a.towt3isa - a.towt2isa),
            perfWeight < a.towt3isa
                ? 0
                : ((a.todist3 - a.todist2) / (a.towt3isa - a.towt2isa)) *
                  1.5 *
                  (perfWeight - a.towt3isa),
            a.todist1,
        ];

        let isaSeedTable = [
            perfWeight < a.towt2isa
                ? ((a.todist2isa - a.todist1isa) / (a.towt2isa - a.towt1isa)) *
                  (perfWeight - a.towt1isa)
                : ((a.todist2isa - a.todist1isa) / (a.towt2isa - a.towt1isa)) *
                  (a.towt2isa - a.towt1isa),
            perfWeight < a.towt2isa
                ? 0
                : perfWeight < a.towt3isa
                ? ((a.todist3isa - a.todist2isa) / (a.towt3isa - a.towt2isa)) *
                  (perfWeight - a.towt2isa)
                : ((a.todist3isa - a.todist2isa) / (a.towt3isa - a.towt2isa)) *
                  (a.towt3isa - a.towt2isa),
            perfWeight < a.towt3isa
                ? 0
                : ((a.todist3isa - a.todist2isa) / (a.towt3isa - a.towt2isa)) *
                  1.5 *
                  (perfWeight - a.towt3isa),
            a.todist1isa,
        ];

        for (let i = 0; i < stdSeedTable.length; i++)
            seedModifierstd += stdSeedTable[i];

        for (let i = 0; i < isaSeedTable.length; i++)
            seedModifierisa += isaSeedTable[i];

        return [seedModifierstd, seedModifierisa];
    }

    static calculateFlapEffect(flaps: string | number, a: AircraftConfig) {
        let fe: number = 0;
        switch (flaps) {
            default:
            case 1:
                fe = a.f1;
                break;
            case 2:
                fe = a.f2;
                break;
            case 3:
                fe = a.f3;
                break;
        }

        return fe;
    }
    // ported to js from https://stackoverflow.com/questions/7437660/
    static lsft(known_y: number[], known_x: number[], offset_x = 0) {
        if (known_y.length !== known_x.length) return [0, 0];

        let numPoints = known_y.length;
        let x1 = 0,
            y1 = 0,
            xy = 0,
            x2 = 0,
            J,
            M,
            B;

        for (var i = 0; i < numPoints; i++) {
            known_x[i] -= offset_x;
            x1 += known_x[i];
            y1 += known_y[i];
            xy += known_x[i] * known_y[i];
            x2 += known_x[i] * known_x[i];
        }

        J = numPoints * x2 - x1 * x1;

        if (J === 0) return [0, 0];

        M = (numPoints * xy - x1 * y1) / J;
        B = (y1 * x2 - x1 * xy) / J;

        return [M, B];
    }

    // ported to js from https://stackoverflow.com/questions/7437660/
    static trend(known_y: number[], known_x: number[], new_x: number[]) {
        let [m, b] = this.lsft(known_y, known_x);

        let new_y = [];
        for (let j = 0; j < new_x.length; j++) {
            let y = m * new_x[j] + b;
            new_y.push(y);
        }

        return new_y;
    }

    // https://stackoverflow.com/a/14163874
    static growth(
        known_y: number[],
        known_x: number[],
        new_x: number[],
        use_const: boolean = true
    ) {
        let tbeta: number, talpha: number;

        // calculate sums over the data:
        let n = known_y.length;
        let avg_x = 0;
        let avg_y = 0;
        let avg_xy = 0;
        let avg_xx = 0;
        for (let i = 0; i < n; i++) {
            let x = known_x[i];
            let y = Math.log(known_y[i]);
            avg_x += x;
            avg_y += y;
            avg_xy += x * y;
            avg_xx += x * x;
        }
        avg_x /= n;
        avg_y /= n;
        avg_xy /= n;
        avg_xx /= n;

        // compute linear regression coefficients:
        if (use_const) {
            tbeta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
            talpha = avg_y - tbeta * avg_x;
        } else {
            tbeta = avg_xy / avg_xx;
            talpha = 0;
        }

        // compute and return result array:
        let new_y = [];
        for (let i = 0; i < new_x.length; i++) {
            new_y.push(Math.exp(talpha + tbeta * new_x[i]));
        }
        return new_y;
    }

    static round5up(x: number) {
        return Math.ceil(x / 5) * 5;
    }

    static round5down(x: number) {
        return Math.floor(x / 5) * 5;
    }

    static distfrom5(x: number) {
        return x - this.round5down(x);
    }

    static altcorr(a: number) {
        return Math.abs(a * 2e-4);
    }

    static f2corr(f: number, a: number) {
        return f === 2 ? Math.abs(a * 2e-4) : 0;
    }

    static v2Speed(w: number, f: number, a: any) {
        let v2 = a20nTakeoff[f.toString()][FlexMath.round5down(w).toString()];

        v2 += FlexMath.f2corr(f, a);

        /* const v2diff =
            v2 - a20nTakeoff[f.toString()][FlexMath.round5down(w).toString()]; */
        const V2Speed =
            v2 + /*  Math.ceil((v2diff / 5) * */ FlexMath.distfrom5(w);
        return Math.ceil(V2Speed);
    }

    static vRSpeed(v2: number) {
        return v2 - 4;
    }

    static v1Speed(a: number, r: number, vR: number, asd = 1621) {
        const v1 = (asd / 2 - (a - r)) / 50;
        return v1 > 0 ? vR - Math.ceil(v1) : vR;
    }

    static CalculateVSpeeds(
        availRunway: number,
        requiredRunway: number,
        Weight: number,
        Flaps: number,
        RunwayAlt: number,
        isMeters: boolean,
        isKG: boolean,
        ASD = 1621
    ) {
        const w = FlexMath.parseWeight(Weight, isKG) / 1000;
        const v2 = FlexMath.v2Speed(w, Flaps, RunwayAlt);
        const vR = FlexMath.vRSpeed(v2);
        const v1 = FlexMath.v1Speed(
            FlexMath.parseDist(availRunway, isMeters),
            requiredRunway,
            vR,
            ASD
        );
        return {
            v1: v1,
            vr: vR,
            v2: v2,
        };
    }

    static calculateFlexDist(settings: TakeoffInstance) {
        let density =
            settings.runwayAltitude +
            (BARO_SEA - FlexMath.parseQNH(settings.baro, settings.isHP)) * 27 +
            (settings.oat - (15 - (settings.runwayAltitude / 1000) * 2)) * 120;

        let TREF = a20n.trefaice + (settings.runwayAltitude / 1000) * 2;
        let ISA = settings.oat - 15 + (settings.runwayAltitude / 1000) * 1.98;

        let flexTrendModifierTable = [
            settings.oat,
            0 + settings.oat - ISA,
            a20n.isaInc + settings.oat - ISA,
            1 + a20n.isaInc + settings.oat - ISA,
            TREF > settings.oat ? Math.floor(TREF) : settings.oat + 1,
            33,
            a20n.tmaxflex + settings.oat - ISA,
            settings.oat,
        ];
        const minFlex = flexTrendModifierTable[4];
        let AltCorrectionsTable = [2000, 4000, 6000, 8000, 10000];

        let perfDistDiffTable = [
            a20n.to2k - a20n.todist2,
            a20n.to4k - a20n.to2k,
            a20n.to6k - a20n.to4k,
            a20n.to8k - a20n.to6k,
            (a20n.to8k - a20n.to6k) * 1.53,
        ];

        let densityCorrection = this.calculateDensityCorrection(
            density,
            AltCorrectionsTable,
            perfDistDiffTable
        );

        let perfWeight = FlexMath.parseWeight(settings.tow, settings.isKG);

        let altBelowToWt2ISA =
            densityCorrection -
            ((densityCorrection -
                (densityCorrection / 100) *
                    (perfWeight / (a20n.towt2isa / 100))) /
                100) *
                a20n.toaltAdj;
        let altAboveToWt2ISA = altBelowToWt2ISA; // the correction is the same above or below for the currently implemented aircraft

        let distanceByDensity =
            perfWeight < a20n.towt2isa ? altBelowToWt2ISA : altAboveToWt2ISA;

        let seedModifiers = this.plantSeeds(perfWeight, a20n);

        let seedModStd = seedModifiers[0];

        let seedModIsa = seedModifiers[1];

        let growthSeed = [
            seedModStd + distanceByDensity,
            seedModIsa + distanceByDensity,
        ];

        let growthTrend = this.growth(
            growthSeed,
            [flexTrendModifierTable[1], flexTrendModifierTable[2]],
            flexTrendModifierTable
        );

        let trendBase = [
            growthTrend[0],
            growthTrend[1],
            growthTrend[2],
            Math.pow(growthTrend[3], a20n.engThrust / 10000),
        ];

        let trendWithModifiers = this.trend(
            [trendBase[2], trendBase[3]],
            [flexTrendModifierTable[2], flexTrendModifierTable[3]],
            [
                flexTrendModifierTable[2],
                flexTrendModifierTable[3],
                flexTrendModifierTable[4],
                flexTrendModifierTable[5],
                flexTrendModifierTable[6],
                flexTrendModifierTable[7],
            ]
        );

        let isaCorrection =
            ISA > a20n.isaInc ? trendWithModifiers[5] : growthTrend[0];

        let flapCorr =
            isaCorrection +
            (isaCorrection / 100) *
                this.calculateFlapEffect(settings.flaps, a20n);

        let headwind =
            Math.cos(
                (settings.windHeading - settings.runwayHeading * 10) *
                    (Math.PI / 180)
            ) * settings.windKts;

        let windLen =
            headwind > 0
                ? flapCorr -
                  ((flapCorr / 100) * (headwind / (a20n.vrisa / 100))) / 2
                : flapCorr - (flapCorr / 100) * (headwind / (a20n.vrisa / 150));

        let totDist = windLen;
        totDist += settings.antiIce ? (windLen / 100) * 3 : 0;
        totDist += settings.packs ? (windLen / 100) * 4 : 0;
        settings.togaRequiredRunway = totDist;
        let flapWindAIPackCorrection = totDist / (isaCorrection / 100);

        // do i need this?
        trendBase[4] = (growthTrend[4] / 100) * flapWindAIPackCorrection;

        let distanceTrendTablePreFlex = [
            (trendWithModifiers[0] / 100) * flapWindAIPackCorrection,
            (trendWithModifiers[1] / 100) * flapWindAIPackCorrection,
            (trendWithModifiers[2] / 100) * flapWindAIPackCorrection,
            (trendWithModifiers[3] / 100) * flapWindAIPackCorrection,
            (trendWithModifiers[4] / 100) * flapWindAIPackCorrection,
            FlexMath.parseDist(settings.availRunway, settings.isMeters),
        ];

        let flexTrendTable = this.trend(
            [
                flexTrendModifierTable[2],
                flexTrendModifierTable[3],
                flexTrendModifierTable[4],
                flexTrendModifierTable[5],
                flexTrendModifierTable[6],
            ],
            [
                distanceTrendTablePreFlex[0],
                distanceTrendTablePreFlex[1],
                distanceTrendTablePreFlex[2],
                distanceTrendTablePreFlex[3],
                distanceTrendTablePreFlex[4],
            ],
            distanceTrendTablePreFlex
        );

        //this will be our final flex number.
        flexTrendTable[6] =
            flexTrendTable[5] < flexTrendTable[4]
                ? Math.floor(flexTrendTable[5])
                : Math.floor(flexTrendTable[4]);

        let TakeoffDistanceTrendTable = this.trend(
            [
                distanceTrendTablePreFlex[2],
                distanceTrendTablePreFlex[3],
                distanceTrendTablePreFlex[4],
            ],
            [flexTrendTable[2], flexTrendTable[3], flexTrendTable[4]],
            [
                flexTrendTable[2],
                flexTrendTable[3],
                flexTrendTable[4],
                flexTrendTable[5],
                flexTrendTable[6],
            ]
        );

        settings.flex = settings.toga ? -1 : flexTrendTable[6];
        settings.requiredRunway = settings.toga
            ? settings.togaRequiredRunway
            : TakeoffDistanceTrendTable[4];
        return {
            flex: settings.flex,
            requiredRunway: settings.requiredRunway,
            minFlex: minFlex,
            togaRequiredRunway: settings.togaRequiredRunway,
        };
    }
}
