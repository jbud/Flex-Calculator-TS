import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { a20n, Airframe } from '../airframes/index';

const defaultState: Airframe = a20n;

export const airframeSlice = createSlice({
    name: 'airframe',
    initialState: defaultState,
    reducers: {
        setAirframe: (state, action: PayloadAction<Airframe>) => {
            state = action.payload;
        },
    },
});

export const { setAirframe } = airframeSlice.actions;
export default airframeSlice.reducer;
