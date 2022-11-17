import jwt from "jsonwebtoken";
import { envVars } from "./env-vars";
import { cryptUtil } from "./crypt-util";
import { HttpError } from "./HttpError";
import { HttpStatus } from "./HttpStatus";

async function generateAccessJWT(userId: number): Promise<string> {
    const payload: AccessTokenPayload = {
        userId,
        dateSigned: new Date().toLocaleString(),
    };
    const jwtData: JwtData = {
        data: await cryptUtil.encrypt(JSON.stringify(payload)),
    };
    return jwt.sign(jwtData, envVars.JWT_ACCESS_SECRET, {
        expiresIn: envVars.JWT_ACCESS_TOKEN_EXPIRATION,
    });
}

async function generateRefreshJWT(
    userId: number,
    accessToken: string
): Promise<string> {
    const payload: RefreshTokenPayload = {
        userId,
        accessToken,
        dateSigned: new Date().toLocaleString(),
    };
    const jwtData: JwtData = {
        data: await cryptUtil.encrypt(JSON.stringify(payload)),
    };
    return jwt.sign(jwtData, envVars.JWT_REFRESH_SECRET, {
        expiresIn: envVars.JWT_REFRESH_TOKEN_EXPIRATION,
    });
}

async function verifyAccessToken(
    accessToken: string
): Promise<AccessTokenPayload> {
    try {
        const jwtData = jwt.verify(
            accessToken,
            envVars.JWT_ACCESS_SECRET
        ) as JwtData;
        const accessTokenPayload = JSON.parse(
            await cryptUtil.decrypt(jwtData.data)
        ) as AccessTokenPayload;
        return accessTokenPayload;
    } catch (error) {
        throw new HttpError(HttpStatus.Unauthorized, "Invalid access token");
    }
}

async function verifyRefreshToken(
    refreshToken: string
): Promise<RefreshTokenPayload> {
    try {
        let jwtData;
        jwtData = jwt.verify(
            refreshToken,
            envVars.JWT_REFRESH_SECRET
        ) as JwtData;
        const refreshTokenPayload = JSON.parse(
            await cryptUtil.decrypt(jwtData.data)
        ) as RefreshTokenPayload;
        jwtData = jwt.verify(
            refreshTokenPayload.accessToken,
            envVars.JWT_ACCESS_SECRET
        ) as JwtData;
        const accessTokenPayload = JSON.parse(
            await cryptUtil.decrypt(jwtData.data)
        ) as AccessTokenPayload;
        if (accessTokenPayload.userId !== refreshTokenPayload.userId) {
            throw new HttpError(
                HttpStatus.Unauthorized,
                "Invalid refresh token"
            );
        }
        return refreshTokenPayload;
    } catch (error) {
        throw new HttpError(HttpStatus.Unauthorized, "Invalid refresh token");
    }
}

export interface JwtData {
    data: string;
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
