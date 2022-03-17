declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_DEFAULT_TIMER: number,
      }
    }
}

export {}