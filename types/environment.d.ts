declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_DEFAULT_TIMER: number,
        NEXT_PUBLIC_CF_URL: string,

        // key for Firebase
        NEXT_PUBLIC_FB_APIKEY: string,
        NEXT_PUBLIC_FB_AUTH_DOMAIN: string,
        NEXT_PUBLIC_FB_DATABASE_URL: string,
        NEXT_PUBLIC_FB_PROJECT_ID: string,
        NEXT_PUBLIC_FB_STORAGE_BUCKET: string,
        NEXT_PUBLIC_FB_MESSAGING_SENDER_ID: string,
        NEXT_PUBLIC_FB_APP_ID: string,
        NEXT_PUBLIC_FB_MEASUREMENT_ID: string,
        NEXT_PUBLIC_MAP_KEY:string,

        NEXT_PUBLIC_LUNCH_START:number,
        NEXT_PUBLIC_LUNCH_END:number,

      }
    }
}

export {}