import axios from 'axios';

const baseUrl = "http://localhost:4000";

const instance = axios.create({baseURL:baseUrl});

interface ILoginParams{
    username : string;
    password : string;
    isRememberMe : boolean;
}

export const userLogin = async (data:ILoginParams) =>  instance.post("/user/login",data);

interface IRegisterParams{
    username: string;
    firstname : string;
    lastname : string;
    password : string;
    rePassword : string;
    isReceiveNews : boolean;
}

export const userRegister = async (data:IRegisterParams) => instance.post("/user/register",data);