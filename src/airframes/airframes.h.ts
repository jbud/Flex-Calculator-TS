export type Airframe = {
    name: string;
    Engines: string;
    MTOW: number;
    OEW: number;
    MLW: number;
    Takeoff: AirframeTakeoff;
    Landing: AirframeLanding;
    VSpeeds: AirframeVSpeeds;
    ISAIncrease: number;
    Trim: TrimTable;
};

export type TrimTable = {
    MinTrim: number;
    MaxTrim: number;
    MinCG: number;
    MaxCG: number;
};

export type AirframeTakeoff = {
    RotateISA: number;
    WeightReferenceISA: number[];
    TakeoffDistanceTable: number[];
    TakeoffDistanceTableISA: number[];
    AltitudeAdjustment: number;
    TMAXFlex: number;
    TREFAICE: number;
    ThrustMultiplier: number;
    FlapsMultiplier: number[];
    TakeoffRef2Alt2000: number;
    TakeoffRef2Alt4000: number;
    TakeoffRef2Alt6000: number;
    TakeoffRef2Alt8000: number;
};

export type AirframeLanding = {
    WeightReferenceISA: number[];
    DistanceReferenceISA: number[];
    FlapsMultiplier: number[];
    RunwayConditionMultiplier: number[];
    AltitudeCorrectionTable: number[];
    StopDistanceDiffs: number[];
};

export type AirframeVSpeeds = {
    [flaps: string]: {
        [Weight: string]: number;
    };
};
