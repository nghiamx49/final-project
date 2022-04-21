import { apiClient } from ".";
import { IApiResponse } from "../type/apiResponse.interface";


export const loadProfile = async (
  profileFilter: string | string[] | undefined
): Promise<IApiResponse> => await apiClient.get(`/profile/${profileFilter}`);

export const updateProfile = async (token:string, updateData: any) => await apiClient.put('/profile/', {...updateData}, {headers: {
    Authorization: `Bearer ${token}`
}})