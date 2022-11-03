import jwt from "jsonwebtoken";
import { envVars } from "./env-vars";
import { HttpError } from "./HttpError";
import { HttpStatus } from "./HttpStatus";

function generateAccessJWT(userId: number): string {
    return jwt.sign(
        { userId, dateSigned: new Date().toLocaleString() },
        envVars.JWT_ACCESS_SECRET,
        { expiresIn: envVars.JWT_ACCESS_TOKEN_EXPIRATION }
    );
}

function generateRefreshJWT(userId: number, accessToken: string): string {
    return jwt.sign(
        { userId, accessToken, dateSigned: new Date().toLocaleString() },
        envVars.JWT_REFRESH_SECRET,
        { expiresIn: envVars.JWT_REFRESH_TOKEN_EXPIRATION }
    );
}

function verifyAccessToken(accessToken: string): AccessTokenPayload {
    try {
        const accessTokenPayload = jwt.verify(
            accessToken,
            envVars.JWT_ACCESS_SECRET
        ) as AccessTokenPayload;
        return accessTokenPayload;
    } catch (error) {
        throw new HttpError(HttpStatus.UNAUTHORIZED, "Invalid access token");
    }
}

function verifyRefreshToken(refreshToken: string): RefreshTokenPayload {
    try {
        const refreshTokenPayload = jwt.verify(
            refreshToken,
            envVars.JWT_REFRESH_SECRET
        ) as RefreshTokenPayload;
        const accessTokenPayload = jwt.verify(
            refreshTokenPayload.accessToken,
            envVars.JWT_ACCESS_SECRET
        ) as AccessTokenPayload;
        if (refreshTokenPayload.userId !== accessTokenPayload.userId) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                "Invalid refresh token"
            );
        }
        return refreshTokenPayload;
    } catch (error) {
        throw new HttpError(HttpStatus.UNAUTHORIZED, "Invalid refresh token");
    }
}

export interface AccessTokenPayload {
    userId: number;
    dateSigned: string;
}

export interface RefreshTokenPayload {
    userId: number;
    accessToken: string;
    dateSigned: string;
}

export const jwtUtil = {
    generateAccessJWT,
    generateRefreshJWT,
    verifyAccessToken,
    verifyRefreshToken,
};
