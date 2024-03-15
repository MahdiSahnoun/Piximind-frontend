// Interface for API configuration
import {ApiResponse, HeaderObject} from "@piximind/api/lib/types";
import {Method} from "axios";

export interface ICustomApi {
    port: 3000
    apiUrl: "http//localhost:27017/piximind"
}
// Interface for API call parameters
export interface ICallParams {
    endPoint: string
    method: Method
    body?: any
    headers: Headers
    refrechCallback?: () => Promise<Response | string | boolean>
    afterRefreshError?: () => Promise<any>
}
// Interface for custom API class
export interface ICustomApiFunction {
    createHeader(headerObject: HeaderObject): Headers;
    call(params: ICallParams): Promise<ApiResponse>;
}
export interface User {
    _id: string;
    name: string;
    email: string;
    role:string;
    password: string;
}
export interface SidebarItem {
    title: string;
    path: string;
    icon: any;
    iconOpened?: any;
    iconClosed?: any;
    subnav?: SidebarItem[];
}
 export interface SessionState {
    user: User;
    isLoggedIn: boolean;
    token: string;
}
export interface Printer {
    _id:string
    name:string
    apiKey:string
    user:string
    url?:string
}
/*
export interface Printer {
  image:
}*/
