import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { decode } from 'html-entities';

export type mcduSettings = {
    speedSet: boolean;
    v1: number | string | undefined;
    vr: number | string | undefined;
    v2: number | string | undefined;
    flex: number | string | undefined;
    flaps: number | string | undefined;
    ths: string | undefined;
    rw: string | undefined;
};

const defaultState: mcduSettings = {
    speedSet: false,
    v1: decode('&#95;&#95;&#95;'),
    vr: decode('&#95;&#95;&#95;'),
    v2: decode('&#95;&#95;&#95;'),
    flex: decode('[&nbsp;&nbsp;]'),
    flaps: decode('[]'),
    ths: decode('[&nbsp;]'),
    rw: decode(''),
};

export const mcduSlice = createSlice({
    name: 'mcdu',
    initialState: defaultState,
    reducers: {
        setMCDU: (state, action: PayloadAction<mcduSettings>) => {
            state.speedSet = action.payload.speedSet;
            state.v1 = action.payload.v1;
            state.vr = action.payload.vr;
            state.v2 = action.payload.v2;
            state.flex = action.payload.flex;
            state.flaps = action.payload.flaps;
            state.ths = action.payload.ths;
            state.rw = action.payload.rw;
        },
    },
});

export const { setMCDU } = mcduSlice.actions;
export default mcduSlice.reducer;
