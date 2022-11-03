import dotenv from "dotenv";

dotenv.config();

function loadEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Required env var: ${key} not set.`);
    }
    return value;
}

export const envVars = {
    DATABASE_URL: loadEnvVar("DATABASE_URL"),
    PORT: loadEnvVar("PORT"),
    APP_NAME: loadEnvVar("APP_NAME"),
    JWT_ACCESS_SECRET: loadEnvVar("JWT_ACCESS_SECRET"),
    JWT_ACCESS_TOKEN_EXPIRATION: loadEnvVar("JWT_ACCESS_TOKEN_EXPIRATION"),
    JWT_REFRESH_SECRET: loadEnvVar("JWT_REFRESH_SECRET"),
    JWT_REFRESH_TOKEN_EXPIRATION: loadEnvVar("JWT_REFRESH_TOKEN_EXPIRATION"),
    APP_EMAIL_ADDRESS: loadEnvVar("APP_EMAIL_ADDRESS"),
    CLIENT_ID: loadEnvVar("CLIENT_ID"),
    CLIENT_SECRET: loadEnvVar("CLIENT_SECRET"),
    REFRESH_TOKEN: loadEnvVar("REFRESH_TOKEN"),
};
