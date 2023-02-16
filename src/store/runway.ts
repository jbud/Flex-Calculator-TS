import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Runway = {
    heading: number | undefined;
    length: number | undefined;
    asd: number | undefined;
    true: string | undefined;
    wind: number | undefined;
};

const defaultState: Runway = {
    heading: 0,
    length: 0,
    asd: 0,
    true: '0',
    wind: 0,
};

export const runwaySlice = createSlice({
    name: 'runway',
    initialState: defaultState,
    reducers: {
        setRunway: (state, action: PayloadAction<Runway>) => {
            state.heading = action.payload.heading;
            state.length = action.payload.length;
            state.asd = action.payload.asd;
            state.true = action.payload.true;
        },
    },
});

export const { setRunway } = runwaySlice.actions;
export default runwaySlice.reducer;
