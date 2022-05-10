import { apiClient } from "./index";
import { IApiResponse } from "../type/apiResponse.interface";

export const getCount = async (token: string): Promise<IApiResponse> => await apiClient.get('/chart/count', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}) 

export const getPostsPerDay = async (token: string): Promise<IApiResponse> => await apiClient.get('/chart/', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}) 
export const getPostsIn3DaysNearby = async (token: string): Promise<IApiResponse> => await apiClient.get('/chart/column', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}) 