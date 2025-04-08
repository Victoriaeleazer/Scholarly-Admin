import { useState, useEffect, useCallback } from 'react';
import { StreamVideoClient } from '@stream-io/video-react-sdk';

type CustomStreamVideoClientHook = {
  client?: StreamVideoClient;
  initializeClient: (client: StreamVideoClient) => void;
};

export const useCustomStreamVideoClient = (): CustomStreamVideoClientHook => {
  const [client, setClient] = useState<StreamVideoClient>();

  const initializeClient = useCallback((client: StreamVideoClient) => {
    

    setClient(client);
  }, []);

  // useEffect(() => {
  //   // Optional: clean up on unmount
  //   return () => {
  //     client?.disconnectUser();
  //     setClient(undefined);
  //   };
  // }, [client]);

  return { client, initializeClient };
};
