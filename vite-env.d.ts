/// <reference types="vite/client" />

interface ImportMetaEnv {
    // The Specific environment variables
    readonly VITE_STREAM_APP_ID: string; 
    readonly VITE_STREAM_API_SECRET: string;
    readonly VITE_STREAM_API_KEY: string;
    readonly VITE_BACKEND_API_URL: string;
    readonly VITE_BACKEND_WEBSOCKET_URL: string;

    readonly VITE_ONESIGNAL_APP_ID: string;
    readonly VITE_ONESIGNAL_API_KEY: string;

    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_APP_ID: string;
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string;
    readonly VITE_FIREBASE_MEASUREMENT_ID: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  