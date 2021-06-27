import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { ToastAndroid } from 'react-native';
import Configurations from '../../configurations.json';
import { Category } from '../entities/category.entity';
import { User } from '../entities/user.entity';

export enum Endpoints {
    "USERS_LOGIN" = "users/authenticate",
    "USERS_REGISTER" = "users/register",
    "USERS" = "users",

    "SUB_CATEGORY" = "subCategory/",
    "ACTIVITY" = "activity/",
    "ACTIVTITY_ALL" = "activity/all", 
    "CATEGORY" = "category/",
    "REPORTS" = "reports/"
}

export type ErrorResponse = {
    Error_Code: string,
    Error_Message: string
}

export type ToastMessage = {
    text1: string,
    text2: string,
    type: "error" | "success" | "info"
    visibilityTime: number,
    autoHide: true
}

class ApiService {
    private readonly axios = Axios.create({
        baseURL: Configurations.SERVER_URL,
        timeout: 10000,
    });

    private BACK_LOGIN: Function | undefined = undefined;

    private AXIOS_CONFIGURATIONS: AxiosRequestConfig = {
        
    }

    constructor(){
        Axios.interceptors.response.use(
            (response: AxiosResponse) => response.data,
            (error: AxiosError) => {
                if (error.response?.status === undefined || error.response?.status >= 500) {
                    console.error('API Server Error', error);
                    // Show dialog
                    return;
                }
            }
        );
        this.loadJWTToken();
    }

    async get<ServerResponse, Params>(endpoint: string, params?: AxiosResponse['config']['params']): Promise<ServerResponse | ErrorResponse> {
        try {
            const response = await this.axios.get(endpoint, {...this.AXIOS_CONFIGURATIONS, params});
            return response.data;
        }
        catch (err) {
            const errorCode = this.getErrorCode(err.message);
            if (errorCode == "401") {
                this.backToLogin();
                return {
                    Error_Code: errorCode,
                    Error_Message: "You need to relogin into the app again..."
                }
            }
            const error: ErrorResponse = { 
                Error_Code: this.getErrorCode(err.message),
                Error_Message: err.message
            }
            return error;            
        }
    }

    async post<ServerResponse, Params>(endpoint: string, data?: Params):Promise<ServerResponse | ErrorResponse>{
        try {
            const response = await this.axios.post(endpoint, data, this.AXIOS_CONFIGURATIONS);
            return response.data;
        }
        catch (err) {
            const errorCode = this.getErrorCode(err.message);
            if (errorCode == "401") {
                this.backToLogin();
                return {
                    Error_Code: errorCode,
                    Error_Message: "You need to relogin into the app again..."
                }
            }
            const error: ErrorResponse = { 
                Error_Code: this.getErrorCode(err.message),
                Error_Message: err.message
            }
            return error;
        }
    }

    async patch<ServerResponse, Params>(endpoint: string, data?: Params): Promise<ServerResponse> {
        const response = await this.axios.patch(endpoint, data);
        return response.data;
    }

    async delete<ServerResponse, Params>(endpoint: string, data?: Params): Promise<ServerResponse> {
        const response = await this.axios.delete(endpoint);
        return response.data;
    } 

    setBackToLogin(updateState: Function){
        this.BACK_LOGIN = updateState;
    }

    private async backToLogin(){
        if (this.BACK_LOGIN) {
            await this.removeJWTToken();
            this.BACK_LOGIN()
        };
    }
    
    async LoginUser<Response>(userName: string, password: string): Promise<Response | ErrorResponse>{                
        
        // const timeout = new Promise<boolean>((resolve, reject)=>{
        //     setTimeout(() => {
        //         resolve(false);
        //     }, 10000);
        // });
        
        // const ServerResponse = new Promise<{ message: string} | Response>(async (resolve, reject)=>{
        //     const data = {
        //         body: JSON.stringify({
        //             userName, password
        //         }),
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         method: "POST"
        //     }

        //     const response: { message: string } | Response = await fetch(Configurations.SERVER_URL+Endpoints.USERS_LOGIN, data).then(res=>res.json());
        //     resolve(response);
        // });
        
        // const values = await Promise.race<boolean | { message: string} | Response>([timeout, ServerResponse]);
        // console.log(values);
        
        const response = await this.post<{message: string} | Response, {userName: string, password: string}>(Endpoints.USERS_LOGIN, {
            userName, password
        });
        let Error: ErrorResponse;
        let User: Response;
        // INVALID PASSWORD
        const INVALID_PASSWORD = (response as {message: string}).message;
        if (INVALID_PASSWORD) {
            Error = { 
                Error_Code: "401",
                Error_Message: INVALID_PASSWORD
            }          
            return Error;  
        } 
        // ANY OTHER AXIOS OR SERVER ERROR
        Error = (response as ErrorResponse);
        if (Error.Error_Message) {
            return Error;
        }
        // SERVER RESPONSE
        User = (response as Response);
        return User;
    }

    async RegisterUser(firstName: string, lastName: string, userName: string, password: string): Promise<boolean | string | ErrorResponse>{
        try {
            const API = Configurations.SERVER_URL + Endpoints.USERS_REGISTER;
            const body = JSON.stringify({
                userName, firstName, lastName, password
            });
            const data = {
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await fetch(API, data).then(res=>res.json());
            if (response.message) {
                return response.message;
            }
            else {
                return true;
            }
        }
        catch (err) {
            const Error: ErrorResponse = {
                Error_Code: this.getErrorCode(err.message),
                Error_Message: err.message
            }
            return Error;
        }
    }

    async saveAndLoadJWTToken(JWTToken: string){
        await AsyncStorage.setItem("@JWT", JWTToken);
        this.AXIOS_CONFIGURATIONS.headers = { Authorization: `Bearer ${JWTToken}` }
    }

    async loadJWTToken(): Promise<string | undefined>{
        const response = await AsyncStorage.getItem("@JWT");
        if (response) {
            this.AXIOS_CONFIGURATIONS.headers = { Authorization: `Bearer ${response}` }
            return (response as string)
        }
        else return undefined;
    }

    async removeJWTToken(){
        await AsyncStorage.removeItem("@JWT");
    }

    async saveUserInformation(userInfo: User) {
        await AsyncStorage.setItem('@USER', JSON.stringify(userInfo));
    }

    async saveCategories(categories: Category[]) {
        await AsyncStorage.setItem("@CATEGORIES", JSON.stringify(categories));
    }

    async getCategories(): Promise<Category[] | undefined>{
        const response = await AsyncStorage.getItem("@CATEGORIES");
        if (response) {
            return JSON.parse(response);
        }
        else return undefined;
    }

    async getUserInformation(): Promise<User | undefined> {
        const response = await AsyncStorage.getItem("@USER");
        if (response) return JSON.parse(response);
        else return undefined;
    }

    async getAllCategories(): Promise<boolean>{
        const response = await this.get<Category[], {}>(Endpoints.CATEGORY);
        const Error = (response as ErrorResponse);
        if (Error.Error_Message) {
            return false;
        }
        const Categories = (response as Category[]);
        this.saveCategories(Categories);
        return true;
    }

    handleErrors(code: number, message: string){
        console.log('API SERVICE ERROR: ',code);
        switch(code) {
            case 400:
                ToastAndroid.show(`BAD REQUEST: ${message}`, ToastAndroid.SHORT);
                break;
            case 404:
                ToastAndroid.show(`NOT FOUND: ${message}`, ToastAndroid.SHORT);
                break;
            case 500:
                ToastAndroid.show(`INTERNAL SERVER ERROR: ${message}`, ToastAndroid.SHORT);
                break;
            case 422:
                ToastAndroid.show(`UNREACHABLE: ${message}`, ToastAndroid.SHORT);
        }
    }

    getErrorCode(message: string | undefined): string{
        if (message) {
            var numb = message.match(/\d/g);
            if (numb) return numb.join("");
            return "000";
        }
        else return "000"
    }
}

export const Service_API = new ApiService();