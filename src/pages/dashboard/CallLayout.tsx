import { Call, User, StreamVideoClient, StreamVideo, StreamCall, NoiseCancellationProvider, useCalls } from "@stream-io/video-react-sdk";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useCustomStreamCall } from "../../hooks/stream-call-hook";
import { useCustomStreamVideoClient } from "../../hooks/stream-client-hook";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { updateToken } from "../../services/api-consumer";
import { hasAdminUserData, getAdminUserData, saveCallToken, getCallToken } from "../../services/user-storage";
import DashboardLayout from "./DashboardLayout";
import { NoiseCancellation } from "@stream-io/audio-filters-web";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

export const CallContext = React.createContext<{
  setCall: (call?: Call) => void;
  setIncomingCall: (call?: Call) => void;
} | null>(null);

export default function CallLayout(){
  // For Calls
  const {client, initializeClient} = useCustomStreamVideoClient();

  const { call, setCall, incomingCall, setIncomingCall } = useCustomStreamCall();

  const navigate = useNavigate();

//   const noiseCancellation = useMemo(() => new NoiseCancellation(), []);

  useEffect(()=>{
    if(!hasAdminUserData()){
      localStorage.clear();
      navigate('/login', {replace:true, relative:'route'});
       return;
    }

    
    const _admin = getAdminUserData();

    // To Configure The Calls Object
    const user: User = {
      id: _admin.id,
      name: _admin?.fullName,
      image: _admin?.profile,
      custom:{
        color:_admin.color,
      }
    }
    const tokenProvider = async()=>{
      const response = await updateToken(_admin.id);

      const body = response.data as ApiResponse;

      const token = body.data as string;
      saveCallToken(token);

      return token;
      
    }
    console.log(user);

    //  Get The Call Instance If Already Created Or Create One if it isn't created.
    const _callClient = StreamVideoClient.getOrCreateInstance({apiKey, user, token: getCallToken() ?? _admin.token, tokenProvider});
    _callClient.connectUser(user, getCallToken())
      .then((_client)=>{
        initializeClient(_callClient);
      })
      .catch((e)=>{
        console.error(e);
      });


    return ()=>{
      // Disconnect the call client when page is closed
      _callClient.disconnectUser();
      initializeClient(_callClient);
    }
  }, [])

  if(!client) return (<></>);

  return <CallContext.Provider value={{setCall, setIncomingCall}}>
    <StreamVideo client={client}>
      <StreamCall call={call ?? incomingCall}>
        <DashboardLayout />
      </StreamCall>
    </StreamVideo>
  </CallContext.Provider>
}