declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      COOKIE_SECRET: string;
    }
  }
}

export {};
