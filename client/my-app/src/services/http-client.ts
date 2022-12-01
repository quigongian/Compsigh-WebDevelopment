import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
};

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers
            ? (config.headers.Authorization = `Bearer ${token}`)
            : (config.headers = { Authorization: `Bearer ${token}` });
    }
    return config;
};

const parseToken = (
    response: AxiosResponse<any, any>
): AxiosResponse<any, any> => {
    if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
    }
    if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response;
};

class HttpClient {
    private instance: AxiosInstance | null = null;

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    private initHttp() {
        const http = axios.create({
            baseURL: "http://localhost:8080/api/v1",
            headers,
            // withCredentials: true,
        });
        http.interceptors.request.use(injectToken, (error) => {
            Promise.reject(error);
        });
        http.interceptors.response.use(parseToken, (error) => {
            this.handleError(error);
        });
        this.instance = http;
        return http;
    }

    request<T = any, R = AxiosResponse<T>>(
        config: AxiosRequestConfig
    ): Promise<R> {
        return this.http.request(config);
    }

    get<T = any, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.get<T, R>(url, config);
    }

    post<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config);
    }

    put<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.put<T, R>(url, data, config);
    }

    patch<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.patch<T, R>(url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.delete<T, R>(url, config);
    }

    private handleError(error: any): Promise<never> {
        console.log(error);
        switch (error.status) {
            case HttpStatusCode.BadRequest:
                console.log("Bad request");
                break;
            case HttpStatusCode.Unauthorized:
                console.log("Unauthorized");
                break;
            case HttpStatusCode.Forbidden:
                console.log("Forbidden");
                break;
            case HttpStatusCode.NotFound:
                console.log("NotFound");
                break;
            case HttpStatusCode.InternalServerError:
                console.log("InternalServerError");
                break;
            default:
                console.log("Unknown error");
                break;
        }
        return Promise.reject(error);
    }
}

export enum HttpStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    EarlyHints = 103,
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    ImUsed = 226,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    TooEarly = 425,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511,
}

export const httpClient = new HttpClient();
