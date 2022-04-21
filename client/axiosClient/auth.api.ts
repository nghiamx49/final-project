import { IAuthFormData, IRegistertFormData } from "../type/auth.interface";
import { apiClient } from "./index";
import { IApiResponse } from "../type/apiResponse.interface";


export const loginApi = async (formData: IAuthFormData): Promise<IApiResponse> => await apiClient.post('/auth/login', {...formData});

export const registerApi = async (formData: IRegistertFormData): Promise<IApiResponse> => await apiClient.post('/auth/register', {...formData});

