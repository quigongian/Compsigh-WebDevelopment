import { AxiosResponse } from "axios";
import { http } from "./http-client";
import {
    AuthResponse,
    NoContentResponse,
    SignInRequest,
    SignUpRequest,
    User,
} from "./models";

const ping = async (): Promise<string> => {
    return await http.get("/ping");
};

const getUser = async (): Promise<AxiosResponse<User>> => {
    // return await http.get("/user");
    return new Promise<AxiosResponse<User>>((resolve, reject) => {
        resolve({
            data: {
                userId: 1,
                firstName: "John",
                lastName: "Doe",
                email: "",
                categoryName: "Beginner",
                xpLevelName: "Beginner",
                theme: "light",
            },
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
        });
    });
};

const signIn = async (
    req: SignInRequest
): Promise<AxiosResponse<AuthResponse>> => {
    return await http.post("/auth/signin", req);
};

const signUp = async (
    req: SignUpRequest
): Promise<AxiosResponse<NoContentResponse>> => {
    return await http.post("/auth/signup", req);
};

export { ping, getUser, signIn, signUp };
