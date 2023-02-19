import { configureStore } from '@reduxjs/toolkit';

import manualReducer from './manual';
import masterDebugReducer from './masterDebug';
import mcduReducer from './mcdu';
import runwayReducer from './runway';

export const store = configureStore({
    reducer: {
        mcdu: mcduReducer,
        runway: runwayReducer,
        manual: manualReducer,
        debug: masterDebugReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
