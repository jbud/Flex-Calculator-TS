import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ManualState = {
    dialogOpen: boolean;
};

const defaultState: ManualState = {
    dialogOpen: false,
};

export const manualSlice = createSlice({
    name: 'manual',
    initialState: defaultState,
    reducers: {
        setManual: (state, action: PayloadAction<ManualState>) => {
            state.dialogOpen = action.payload.dialogOpen;
        },
    },
});

export const { setManual } = manualSlice.actions;
export default manualSlice.reducer;
