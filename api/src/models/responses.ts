export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshAccessTokenResponse {
    accessToken: string;
}

export interface ErrorResponse {
    error: string;
}

export interface Created {}
export interface NoContent {}
export interface BadRequest extends ErrorResponse {}
export interface Unauthorized extends ErrorResponse {}
export interface Forbidden extends ErrorResponse {}
export interface NotFound extends ErrorResponse {}
export interface InternalServerError extends ErrorResponse {}
