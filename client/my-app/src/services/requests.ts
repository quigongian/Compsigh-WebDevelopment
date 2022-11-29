import { AxiosResponse } from "axios";
import { http } from "./http-client";
import { User } from "./models";

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
        userName: "jdoe",
        email: "gianlikes@beans.com",
        categoryName: "Data Engineer",
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

export { ping, getUser };
