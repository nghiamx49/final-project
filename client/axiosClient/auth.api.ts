import { IAuthFormData, IRegistertFormData } from "../type/auth.interface";
import { apiClient } from "./index";
import { IApiResponse } from "../type/apiResponse.interface";


export const loginApi = async (formData: IAuthFormData): Promise<IApiResponse> => await apiClient.post('/auth/login', {...formData});

export const registerApi = async (FormData: IRegistertFormData): Promise<IApiResponse> => await apiClient.post('/auth/register', {...FormData});

export const loadProfile = async (profileFilter: string| string[] | undefined): Promise<IApiResponse> => await apiClient.get(`/auth/profile/${profileFilter}`);