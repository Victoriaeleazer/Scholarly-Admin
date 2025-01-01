/// <reference types="vite/client" />

interface ImportMetaEnv {
    // The Specific environment variables
    readonly STREAM_APP_ID: string; 
    readonly STREAM_API_SECRET: string;
    readonly STREAM_API_KEY: string;
    readonly BACKEND_API_URL: string;
    readonly BACKEND_WEBSOCKET_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  