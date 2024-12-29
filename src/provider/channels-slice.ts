import { Channel } from "../interfaces/Channel";
import { getChannels, saveChannels } from "../services/user-storage";
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ChannelsState{
    value: Channel[]
}

const initialState : ChannelsState = {value:getChannels()};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers:{
        // overwrite
        setChannels(state, action:PayloadAction<Channel[]>){
            const channels =  [...action.payload];
            saveChannels(channels)
            state.value = channels;
        },
    }
})

export const {setChannels} = channelsSlice.actions;
export default channelsSlice.reducer;