import { axiosInstance } from "./base";


export interface LoginUser {
    username: string;
    password: string;
}

export interface RegisterUser extends LoginUser {
    password2: string
}


export async function register(username: string, password: string) {
    return await axiosInstance.post('/user/register', {
        username, password
    });
}

export async function login(username: string, password: string) {
    return await axiosInstance.post('/user/login', {
        username, password
    });
}
