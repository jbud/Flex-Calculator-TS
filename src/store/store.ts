import { configureStore } from '@reduxjs/toolkit';

import airframeReducer from './airframe';
import manualReducer from './manual';
import masterDebugReducer from './masterDebug';
import mcduReducer from './mcdu';
import runwayReducer from './runway';

export const store = configureStore({
    reducer: {
        manual: manualReducer,
        mcdu: mcduReducer,
        runway: runwayReducer,
        debug: masterDebugReducer,
        airframe: airframeReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
