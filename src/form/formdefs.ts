import { TakeoffInstance } from '../math/mathh';
import { Runway } from '../store/runway';

export type MetarForm = {
    message?: string;
    wind?: {
        degrees?: number;
        speed?: number;
    };
    altimeter?: {
        value?: number;
        unit?: string;
    };
    temperature?: number;
};

export const defaultMetarForm: MetarForm = {
    message: 'Select an ICAO to populate METAR and Runways',
    wind: {
        degrees: 0,
        speed: 0,
    },
    altimeter: {
        value: 0,
        unit: '',
    },
    temperature: 0,
};

export type RunwaysForm = {
    value?: string;
    heading?: string;
    elevation?: string;
    length?: string;
};

export const defaultRunwaysForm = {
    value: '',
    heading: '',
    elevation: '',
    length: '',
};

export type OfflineFormContent = {
    windHeading?: number;
    windKts?: number;
    oat?: number;
    baro?: number;
    baroUnit?: string;
};

export const defaultOfflineFormContent: OfflineFormContent = {
    windHeading: 0,
    windKts: 0,
    oat: 0,
    baro: 0,
    baroUnit: 'hpa',
};

export type FormContent = {
    icao?: string;
    metar?: string;
    runway?: string;
    weight?: number;
    weightUnit?: string;
    cg?: number;
    flaps?: string;
    rwCond?: string;
    antiIce?: boolean;
    packs?: boolean;
};

export const defaultFormContent: FormContent = {
    icao: '',
    metar: '',
    runway: '',
    weight: 0,
    weightUnit: 'KG',
    cg: 0,
    flaps: '',
    rwCond: '',
    antiIce: false,
    packs: true,
};

export const defaultSettingsContent: TakeoffInstance = {
    flex: 0,
    availRunway: 0,
    requiredRunway: 0,
    windHeading: 0,
    windKts: 0,
    tow: 0,
    isKG: true,
    isHP: false,
    isMeters: false,
    baro: 0,
    oat: 0,
    flaps: 0,
    runwayHeading: 0,
    runwayAltitude: 0,
    antiIce: true,
    packs: false,
    togaRequiredRunway: 0,
    toga: false,
    runwayCondition: 0,
};

export const defaultRunwayState: Runway = {
    heading: 0,
    length: 0,
    asd: 0,
    true: '0',
    wind: 0,
    windSpeed: 0,
};
