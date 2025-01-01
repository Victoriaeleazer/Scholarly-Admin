import { Call } from '@stream-io/video-react-sdk';
import { useState, useCallback } from 'react';
import { useStreamVideoClient, StreamCall, StreamVideo } from '@stream-io/video-react-sdk';
import { useCustomStreamVideoClient } from './stream-client-hook';

type CustomStreamCallHook = {
  call: Call | undefined;
  setCall: (call?: Call) => void;
  incomingCall: Call | undefined;
  setIncomingCall: (call?: Call) => void;
};

export const useCustomStreamCall = (): CustomStreamCallHook => {
  const [call, setCall] = useState<Call>();
  const [incomingCall, setIncomingCall] = useState<Call>();


  return { call, setCall, incomingCall , setIncomingCall };
};
