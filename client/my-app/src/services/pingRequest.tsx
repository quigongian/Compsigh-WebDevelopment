import { http } from "./http-client";

const ping = async (): Promise<string> => {
    return await http.get("/ping");
};

export default ping;
