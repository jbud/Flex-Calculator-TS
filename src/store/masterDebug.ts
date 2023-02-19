import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DebugMessage = {
    title: string;
    message: string;
};

export type MasterDebugState = {
    debugMode: boolean;
    debugCount: number;
    debugMessages: {
        [key: string]: DebugMessage;
    };
};

const defaultState: MasterDebugState = {
    debugMode: false,
    debugCount: 0,
    debugMessages: {},
};

export const masterDebugSlice = createSlice({
    name: 'masterDebug',
    initialState: defaultState,
    reducers: {
        debug: (state, action: PayloadAction<DebugMessage>) => {
            const { title, message } = action.payload;
            state.debugCount += 1;
            state.debugMessages[state.debugCount] = { title, message };
        },
        setMasterDebug: (state, action: PayloadAction<MasterDebugState>) => {
            state = action.payload;
        },
        setDebugWindow: (state, action: PayloadAction<boolean>) => {
            state.debugMode = action.payload;
        },
    },
});

export const { setMasterDebug, setDebugWindow, debug } =
    masterDebugSlice.actions;
export default masterDebugSlice.reducer;
