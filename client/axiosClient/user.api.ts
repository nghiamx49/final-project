import { apiClient } from "./index";
import { IApiResponse } from "../type/apiResponse.interface";


export const getAllUsers = async (
  token: string,
  name: string = "",
  page: number = 1,
  sort: string = "asc"
): Promise<IApiResponse> =>
  await apiClient.get(`/users?name=${name}&page=${page}&sort=${sort}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  

export const getTopActiveUsers = async (
  token: string,
): Promise<IApiResponse> => await apiClient.get(`/users/top`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const updateUserStatus = async (userId:string, status: boolean, token: string) => apiClient.put(`/users/${userId}`, {status}, {headers: {
  'Authorization': `Bearer ${token}`
}})