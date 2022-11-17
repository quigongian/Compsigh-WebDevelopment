import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

enum StatusCode {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
}

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

class Http {
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
            case StatusCode.BadRequest:
                console.log("Bad request");
                break;
            case StatusCode.Unauthorized:
                console.log("Unauthorized");
                break;
            case StatusCode.Forbidden:
                console.log("Forbidden");
                break;
            case StatusCode.NotFound:
                console.log("NotFound");
                break;
            case StatusCode.InternalServerError:
                console.log("InternalServerError");
                break;
            default:
                console.log("Unknown error");
                break;
        }
        return Promise.reject(error);
    }
}

export const http = new Http();
