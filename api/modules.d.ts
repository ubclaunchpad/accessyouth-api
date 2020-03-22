declare namespace NodeJS {
    export interface ProcessEnv {
      DB_CONNECTION_STRING: string;
      DB_USER_NAME: string;
      DB_PASSWORD: string;
      DB_NAME:string; 
    }
  }