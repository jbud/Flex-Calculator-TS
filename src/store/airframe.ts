import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { a20n, Airframe } from '../airframes/index';

const defaultState: Airframe = a20n;

export const airframeSlice = createSlice({
    name: 'airframe',
    initialState: defaultState,
    reducers: {
        setAirframe: (state, action: PayloadAction<Airframe>) => {
            state.Engines = action.payload.Engines;
            state.MTOW = action.payload.MTOW;
            state.OEW = action.payload.OEW;
            state.MLW = action.payload.MLW;
            state.Takeoff = action.payload.Takeoff;
            state.Landing = action.payload.Landing;
            state.VSpeeds = action.payload.VSpeeds;
            state.ISAIncrease = action.payload.ISAIncrease;
            state.Trim = action.payload.Trim;
            state.name = action.payload.name;
        },
    },
});

export const { setAirframe } = airframeSlice.actions;
export default airframeSlice.reducer;
