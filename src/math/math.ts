import { Airframe } from '../airframes';
import { BARO_SEA, TakeoffInstance } from './mathh';

export class FlexMath {
    static parseQNH(qnh: number, ishpa = true) {
        // workaround to allow decimal or not,
        // valid imputs become 29.92 or 2992 (inHg) or 1013 (hPa)
        if (qnh - Math.floor(qnh) !== 0) qnh *= 100;

        if (!ishpa) {
            qnh /= 2.95360316; // convert inHg to hectopascels
        }
        return qnh;
    }
    static parseWeight(w: number, iskg = true) {
        let r = w;
        if (!iskg) {
            r = w / 2.20462262; // convert lbs to kg
        }
        return r;
    }
    static parseDist(d: number, ism = true) {
        let r = d;
        if (!ism) {
            r = d / 3.2808399; // convert ft to m
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
                    : ((density - AltCorrectionsTable[i - 1]) / 200) *
                      (perfDistDiffTable[i] / 100);
        }
        densityCorrection +=
            density < AltCorrectionsTable[3]
                ? 0
                : ((density - AltCorrectionsTable[3]) / 200) *
                  (perfDistDiffTable[4] / 100);
        return densityCorrection >= 0 ? densityCorrection : 0;
    }

    static plantSeeds(perfWeight: number, a: Airframe) {
        let seedModifierstd = 0;
        let seedModifierisa = 0;

        let stdSeedTable = [
            perfWeight < a.Takeoff.WeightReferenceISA[1]
                ? ((a.Takeoff.TakeoffDistanceTable[1] -
                      a.Takeoff.TakeoffDistanceTable[0]) /
                      (a.Takeoff.WeightReferenceISA[1] -
                          a.Takeoff.WeightReferenceISA[0])) *
                  (perfWeight - a.Takeoff.WeightReferenceISA[0])
                : ((a.Takeoff.TakeoffDistanceTable[1] -
                      a.Takeoff.TakeoffDistanceTable[0]) /
                      (a.Takeoff.WeightReferenceISA[1] -
                          a.Takeoff.WeightReferenceISA[0])) *
                  (a.Takeoff.WeightReferenceISA[1] -
                      a.Takeoff.WeightReferenceISA[0]),
            perfWeight < a.Takeoff.WeightReferenceISA[1]
                ? 0
                : perfWeight < a.Takeoff.WeightReferenceISA[2]
                ? ((a.Takeoff.TakeoffDistanceTable[2] -
                      a.Takeoff.TakeoffDistanceTable[1]) /
                      (a.Takeoff.WeightReferenceISA[2] -
                          a.Takeoff.WeightReferenceISA[1])) *
                  (perfWeight - a.Takeoff.WeightReferenceISA[1])
                : ((a.Takeoff.TakeoffDistanceTable[2] -
                      a.Takeoff.TakeoffDistanceTable[1]) /
                      (a.Takeoff.WeightReferenceISA[2] -
                          a.Takeoff.WeightReferenceISA[1])) *
                  (a.Takeoff.WeightReferenceISA[2] -
                      a.Takeoff.WeightReferenceISA[1]),
            perfWeight < a.Takeoff.WeightReferenceISA[2]
                ? 0
                : ((a.Takeoff.TakeoffDistanceTable[2] -
                      a.Takeoff.TakeoffDistanceTable[1]) /
                      (a.Takeoff.WeightReferenceISA[2] -
                          a.Takeoff.WeightReferenceISA[1])) *
                  1.5 *
                  (perfWeight - a.Takeoff.WeightReferenceISA[2]),
            a.Takeoff.TakeoffDistanceTable[0],
        ];

        let isaSeedTable = [
            perfWeight < a.Takeoff.WeightReferenceISA[1]
                ? ((a.Takeoff.TakeoffDistanceTableISA[1] -
                      a.Takeoff.TakeoffDistanceTableISA[0]) /
                      (a.Takeoff.WeightReferenceISA[1] -
                          a.Takeoff.WeightReferenceISA[0])) *
                  (perfWeight - a.Takeoff.WeightReferenceISA[0])
                : ((a.Takeoff.TakeoffDistanceTableISA[1] -
                      a.Takeoff.TakeoffDistanceTableISA[0]) /
                      (a.Takeoff.WeightReferenceISA[1] -
                          a.Takeoff.WeightReferenceISA[0])) *
                  (a.Takeoff.WeightReferenceISA[1] -
                      a.Takeoff.WeightReferenceISA[0]),
            perfWeight < a.Takeoff.WeightReferenceISA[1]
                ? 0
                : perfWeight < a.Takeoff.WeightReferenceISA[2]
                ? ((a.Takeoff.TakeoffDistanceTableISA[2] -
                      a.Takeoff.TakeoffDistanceTableISA[1]) /
                      (a.Takeoff.WeightReferenceISA[2] -
                          a.Takeoff.WeightReferenceISA[1])) *
                  (perfWeight - a.Takeoff.WeightReferenceISA[1])
                : ((a.Takeoff.TakeoffDistanceTableISA[2] -
                      a.Takeoff.TakeoffDistanceTableISA[1]) /
                      (a.Takeoff.WeightReferenceISA[2] -
                          a.Takeoff.WeightReferenceISA[1])) *
                  (a.Takeoff.WeightReferenceISA[2] -
                      a.Takeoff.WeightReferenceISA[1]),
            perfWeight < a.Takeoff.WeightReferenceISA[2]
                ? 0
                : ((a.Takeoff.TakeoffDistanceTableISA[2] -
                      a.Takeoff.TakeoffDistanceTableISA[1]) /
                      (a.Takeoff.WeightReferenceISA[2] -
                          a.Takeoff.WeightReferenceISA[1])) *
                  1.5 *
                  (perfWeight - a.Takeoff.WeightReferenceISA[2]),
            a.Takeoff.TakeoffDistanceTableISA[0],
        ];

        for (let i = 0; i < stdSeedTable.length; i++)
            seedModifierstd += stdSeedTable[i];

        for (let i = 0; i < isaSeedTable.length; i++)
            seedModifierisa += isaSeedTable[i];

        return [seedModifierstd, seedModifierisa];
    }

    static calculateFlapEffect(flaps: string | number, a: Airframe) {
        return a.Takeoff.FlapsMultiplier[parseInt(flaps as string) - 1];
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

    static knotsToMetersPerSecond(knots: number) {
        return knots * 0.514444444;
    }

    static metersPerSecondToKnots(mps: number) {
        return mps * 1.943844492;
    }

    static timeFromAccelerationAndDistance(
        metersPerSecond: number,
        metersTraveled: number
    ) {
        return Math.sqrt(metersTraveled / metersPerSecond); //////
    }

    static avergageAcceleration(metersPerSecond: number, time: number) {
        return metersPerSecond / time; //////
    }

    static timeFromDistanceAndSpeed(metersTraveled: number, speed: number) {
        return metersTraveled / speed;
    }

    static speedAtDistance(metersPerSecond: number, metersTraveled: number) {
        return (
            FlexMath.timeFromAccelerationAndDistance(
                metersPerSecond,
                metersTraveled
            ) * metersPerSecond
        ); //////
    }

    static distanceFromAccelerationAndSpeed(
        metersPerSecond: number,
        speed: number
    ) {
        return speed ** 2 / metersPerSecond;
    }

    static distanceFromAccelerationAndTime(
        //////
        metersPerSecond: number,
        time: number
    ) {
        return metersPerSecond * time ** 2;
    }

    static sumof(array: number[]) {
        return array.reduce((a, b) => a + b, 0);
    }

    static AltitudeCorrection(params: any, densityAltitude: number) {
        const MLAND = params.airframe.MLW;
        const WeightReferenceISA2 =
            params.airframe.Landing.WeightReferenceISA[1];
        const AltitudeCorrectionTable =
            params.airframe.Landing.AltitudeCorrectionTable;
        const StopDistanceDiffs = params.airframe.Landing.StopDistanceDiffs;

        const DAADJ = (DA: number, BP: number) =>
            (DA / 2000 / 100) * (BP / 100);

        const densityCorrectionsTable = [
            densityAltitude > AltitudeCorrectionTable[0]
                ? StopDistanceDiffs[0]
                : DAADJ(densityAltitude, StopDistanceDiffs[0]),
            densityAltitude > AltitudeCorrectionTable[1]
                ? StopDistanceDiffs[1]
                : DAADJ(
                      densityAltitude - AltitudeCorrectionTable[1],
                      StopDistanceDiffs[1]
                  ),
            densityAltitude > AltitudeCorrectionTable[2]
                ? StopDistanceDiffs[2]
                : DAADJ(
                      densityAltitude - AltitudeCorrectionTable[2],
                      StopDistanceDiffs[2]
                  ),
            densityAltitude > AltitudeCorrectionTable[3]
                ? StopDistanceDiffs[3]
                : DAADJ(
                      densityAltitude - AltitudeCorrectionTable[3],
                      StopDistanceDiffs[3]
                  ),
            densityAltitude < AltitudeCorrectionTable[4]
                ? 0
                : DAADJ(
                      densityAltitude - AltitudeCorrectionTable[4],
                      StopDistanceDiffs[4]
                  ),
        ];

        const densityCorrectionMultiplier =
            FlexMath.sumof(densityCorrectionsTable) > 0
                ? FlexMath.sumof(densityCorrectionsTable)
                : 0;
        const AltitudeCorrectionStage1 =
            (densityCorrectionMultiplier / 100) *
            (params.tow / WeightReferenceISA2 / 100);
        return (
            AltitudeCorrectionStage1 -
            ((AltitudeCorrectionStage1 -
                (AltitudeCorrectionStage1 / 100) * (params.tow / MLAND / 100)) /
                100) *
                1
        );
    }

    static calibratedDistance(params: any, densityAltitude: number) {
        const DistanceRequiredISATable =
            params.airframe.Landing.DistanceReferenceISA;
        const WeightReferenceISATable =
            params.airframe.Landing.WeightReferenceISA;
        const diffsTable = [
            (DistanceRequiredISATable[1] - DistanceRequiredISATable[0]) /
                (WeightReferenceISATable[1] - WeightReferenceISATable[0]),
            (DistanceRequiredISATable[2] - DistanceRequiredISATable[1]) /
                (WeightReferenceISATable[2] - WeightReferenceISATable[1]),
        ];
        diffsTable[2] = diffsTable[1] * 1.5;

        const StopDistanceRef1 =
            params.tow < WeightReferenceISATable[1]
                ? diffsTable[0] * (params.tow - WeightReferenceISATable[0])
                : diffsTable[0] *
                  (WeightReferenceISATable[1] - WeightReferenceISATable[0]);
        const StopDistanceRef2 =
            params.tow < WeightReferenceISATable[1]
                ? 0
                : params.tow < WeightReferenceISATable[2]
                ? diffsTable[1] * (params.tow - WeightReferenceISATable[1])
                : diffsTable[1] *
                  (WeightReferenceISATable[2] - WeightReferenceISATable[1]);
        const StopDistanceRef3 =
            params.tow < WeightReferenceISATable[2]
                ? 0
                : diffsTable[2] * (params.tow - WeightReferenceISATable[2]);

        const SumOfSDRefs = this.sumof([
            StopDistanceRef1,
            StopDistanceRef2,
            StopDistanceRef3,
        ]);
        const SDRef =
            SumOfSDRefs >= 0
                ? SumOfSDRefs + DistanceRequiredISATable[0]
                : DistanceRequiredISATable[0];
        return FlexMath.AltitudeCorrection(params, densityAltitude) + SDRef;
    }

    static V1SpeedVer2(
        runwayAltitude: number,
        runwayLength: number,
        runwayRequired: number,
        oat: number,
        baro: number,
        runwayCondition: number,
        windHeading: number,
        windKts: number,
        runwayHeading: number,
        flaps: number,
        tow: number,
        VR: number,
        airframe: Airframe
    ) {
        const headwind =
            Math.cos((windHeading - runwayHeading * 10) * (Math.PI / 180)) *
            windKts;

        const params = {
            altitude: runwayAltitude,
            oat: oat,
            baro: FlexMath.parseQNH(baro, false),
            runwayCondition: runwayCondition,
            headwind: headwind,
            flaps: flaps,
            tow: tow,
            speed: 0,
            airframe: airframe,
        };
        let V1Candidate = -1;
        for (let i = VR; i >= 100; i--) {
            params.speed = i;
            let distance = FlexMath.calculateStopDistanceReq(params);
            distance /= 3; // Max Manual Braking.
            const time = FlexMath.timeFromDistanceAndSpeed(
                runwayRequired,
                FlexMath.knotsToMetersPerSecond(VR)
            );
            const acc = FlexMath.avergageAcceleration(
                FlexMath.knotsToMetersPerSecond(VR),
                time
            );

            const currDistance = FlexMath.distanceFromAccelerationAndSpeed(
                acc,
                FlexMath.knotsToMetersPerSecond(i)
            );
            const RemainingRunway =
                FlexMath.parseDist(runwayLength, false) -
                (currDistance + distance);
            if (RemainingRunway >= 0 && i > V1Candidate) {
                V1Candidate = i;
                //return V1Candidate;
            }
        }
        return V1Candidate;
    }

    static calculateStopDistanceReq(params: any) {
        const flapMultiplier = params.airframe.Landing.FlapsMultiplier;
        const ISAIncrease = params.airframe.ISAIncrease;
        const altitude = params.altitude;
        const oat = params.oat;
        const baro = params.baro;
        const runwayCondition = params.runwayCondition;
        const headwind = params.headwind;
        const flaps: number = parseInt(params.flaps);
        const speed = params.speed;

        let densityAltitude =
            altitude +
            (BARO_SEA - baro) * 27 +
            (oat - (ISAIncrease - (altitude / 1000) * 2)) * 120;
        densityAltitude =
            densityAltitude < 0 ? densityAltitude / 2 : densityAltitude;

        const calibratedDistance = FlexMath.calibratedDistance(
            params,
            densityAltitude
        );

        const FlapAdjusted = calibratedDistance * flapMultiplier[flaps];
        let windAdjusted: number;

        if (headwind > 0) {
            windAdjusted =
                FlapAdjusted -
                ((FlapAdjusted / 100) * (headwind / (speed / 100))) / 2;
        } else {
            windAdjusted =
                FlapAdjusted -
                (FlapAdjusted / 100) * (headwind / (speed / 100));
        }
        return (
            windAdjusted +
            FlexMath.calculateRCAM(windAdjusted, runwayCondition, params) +
            FlexMath.knotsToMetersPerSecond(speed) * 3 // 3 second buffer.
        );
    }

    static calculateRCAM(
        distance: number,
        runwayCondition: number,
        params: any
    ) {
        const runwayConditions =
            params.airframe.Landing.RunwayConditionMultiplier; // dry/wet
        return distance * runwayConditions[runwayCondition];
    }

    static round5up(x: number) {
        return Math.ceil(x / 5) * 5;
    }

    static round5down(x: number) {
        return Math.floor(x / 5) * 5;
    }
    static round10down(x: number) {
        return Math.floor(x / 10) * 10;
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

    static v2Speed(w: number, f: number, a: any, airframe: Airframe) {
        let v2 =
            airframe.VSpeeds[f.toString()][FlexMath.round5down(w).toString()];
        if (v2 === undefined) {
            v2 =
                airframe.VSpeeds[f.toString()][
                    FlexMath.round10down(w).toString()
                ];
        }
        v2 += FlexMath.f2corr(f, a);

        const V2Speed = Math.ceil(v2 + FlexMath.distfrom5(w));
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
        airframe: Airframe,
        ASD = 1621
    ) {
        const w = FlexMath.parseWeight(Weight, isKG) / 1000;
        const v2 = FlexMath.v2Speed(w, Flaps, RunwayAlt, airframe);
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

    static calculateFlexDist(settings: TakeoffInstance, airframe: Airframe) {
        let density =
            settings.runwayAltitude +
            (BARO_SEA - FlexMath.parseQNH(settings.baro, settings.isHP)) * 27 +
            (settings.oat - (15 - (settings.runwayAltitude / 1000) * 2)) * 120;

        let TREF =
            airframe.Takeoff.TREFAICE + (settings.runwayAltitude / 1000) * 2;
        let ISA = settings.oat - 15 + (settings.runwayAltitude / 1000) * 1.98;

        let flexTrendModifierTable = [
            settings.oat,
            0 + settings.oat - ISA,
            airframe.ISAIncrease + settings.oat - ISA,
            1 + airframe.ISAIncrease + settings.oat - ISA,
            TREF > settings.oat ? Math.floor(TREF) : settings.oat + 1,
            33,
            airframe.Takeoff.TMAXFlex + settings.oat - ISA,
            settings.oat,
        ];
        const minFlex = flexTrendModifierTable[4];
        let AltCorrectionsTable = [2000, 4000, 6000, 8000, 10000];

        let perfDistDiffTable = [
            airframe.Takeoff.TakeoffRef2Alt2000 -
                airframe.Takeoff.TakeoffDistanceTable[1],
            airframe.Takeoff.TakeoffRef2Alt4000 -
                airframe.Takeoff.TakeoffRef2Alt2000,
            airframe.Takeoff.TakeoffRef2Alt6000 -
                airframe.Takeoff.TakeoffRef2Alt4000,
            airframe.Takeoff.TakeoffRef2Alt8000 -
                airframe.Takeoff.TakeoffRef2Alt6000,
            (airframe.Takeoff.TakeoffRef2Alt8000 -
                airframe.Takeoff.TakeoffRef2Alt6000) *
                1.53,
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
                    (perfWeight /
                        (airframe.Takeoff.WeightReferenceISA[1] / 100))) /
                100) *
                airframe.Takeoff.AltitudeAdjustment;
        let altAboveToWt2ISA = altBelowToWt2ISA; // the correction is the same above or below for the currently implemented airframes

        let distanceByDensity =
            perfWeight < airframe.Takeoff.TakeoffDistanceTable[1]
                ? altBelowToWt2ISA
                : altAboveToWt2ISA;

        let seedModifiers = this.plantSeeds(perfWeight, airframe);

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
            Math.pow(growthTrend[3], airframe.Takeoff.ThrustMultiplier / 10000),
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
            ISA > airframe.ISAIncrease ? trendWithModifiers[5] : growthTrend[0];

        let flapCorr =
            isaCorrection +
            (isaCorrection / 100) *
                this.calculateFlapEffect(settings.flaps, airframe);

        let headwind =
            Math.cos(
                (settings.windHeading - settings.runwayHeading * 10) *
                    (Math.PI / 180)
            ) * settings.windKts;

        let windLen =
            headwind > 0
                ? flapCorr -
                  ((flapCorr / 100) *
                      (headwind / (airframe.Takeoff.RotateISA / 100))) /
                      2
                : flapCorr -
                  (flapCorr / 100) *
                      (headwind / (airframe.Takeoff.RotateISA / 150));

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
