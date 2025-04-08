import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Notification } from '../interfaces/Notification'
import { getNotifications, saveNotifications } from '../services/user-storage'

interface NotificationssState{
    value: Notification[]
}

const initialState: NotificationssState = {value:getNotifications()}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers:{
        
        setNotifications(state, action:PayloadAction<Notification[]>){
            const notifications = [...action.payload];
            saveNotifications(notifications);
            state.value = notifications;
        },

        addNotification(state, action:PayloadAction<Notification>){
            const notifications = [...state.value, action.payload];
            saveNotifications(notifications);
            state.value = notifications;
        },

        removeNotification(state, action:PayloadAction<string>){
            const notifications = [...state.value.filter(notif => notif.id !== action.payload)];
            saveNotifications(notifications)
            state.value = notifications;
        }
    }
})

export const {addNotification, removeNotification, setNotifications} =  notificationsSlice.actions;
export default notificationsSlice.reducer;