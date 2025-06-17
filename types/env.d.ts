declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string;
      EXPO_PUBLIC_API_URL?: string;
    }
  }
}

// Ensure this file is treated as a module
export {};