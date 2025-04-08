import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from '../src/provider/channels-slice';
import notificationsReducer from '../src/provider/notificications-slice'

export const store = configureStore({
    reducer:{
        channels: channelsReducer,
        notifications: notificationsReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>