import { decode } from 'html-entities';
import { createContext } from 'react';

export type mcduSettings = {
    speedSet: boolean;
    v1: number | string | undefined;
    vr: number | string | undefined;
    v2: number | string | undefined;
    flex: number | string | undefined;
    flaps: number | string | undefined;
    ths: string | undefined;
};

const defaultState: mcduSettings = {
    speedSet: false,
    v1: decode('&#95;&#95;&#95;'),
    vr: decode('&#95;&#95;&#95;'),
    v2: decode('&#95;&#95;&#95;'),
    flex: decode('[]'),
    flaps: decode('[]'),
    ths: decode('[&nbsp;]'),
};

const MCDUSettingsContextProvider = createContext<mcduSettings>(defaultState);

const setMCDU = (state: mcduSettings) => {};

export { MCDUSettingsContextProvider, setMCDU };
