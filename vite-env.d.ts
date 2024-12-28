/// <reference types="vite/client" />

interface ImportMetaEnv {
    // The Specific environment variables
    readonly VITE_STREAM_APP_ID: string; 
    readonly VITE_STREAM_API_SECRET: string;
    readonly VITE_STREAM_API_KEY: string;
    readonly VITE_API_URL: string;
    readonly VITE_WEBSOCKET_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  