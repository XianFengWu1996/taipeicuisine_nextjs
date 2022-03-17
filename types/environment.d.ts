declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_DEFAULT_TIMER: number,

        // key for Firebase
        NEXT_PUBLIC_FB_APIKEY: string,
        NEXT_PUBLIC_FB_AUTH_DOMAIN: string,
        NEXT_PUBLIC_FB_DATABASE_URL: string,
        NEXT_PUBLIC_FB_PROJECT_ID: string,
        NEXT_PUBLIC_FB_STORAGE_BUCKET: string,
        NEXT_PUBLIC_FB_MESSAGING_SENDER_ID: string,
        NEXT_PUBLIC_FB_APP_ID: string,
        NEXT_PUBLIC_FB_MEASUREMENT_ID: string,
      }
    }
}

export {}