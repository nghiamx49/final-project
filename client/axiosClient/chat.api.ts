import { apiClient } from ".";
import { IApiResponse } from "../type/apiResponse.interface";
import { ISendMessage } from "../type/message.interface";


export const getAllConservations = async (token: string): Promise<IApiResponse> => await apiClient.get('/conservation/', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const markConservationasRead = async (
  token: string,
  conservationId: string
): Promise<IApiResponse> =>
  await apiClient.put(`/conservation/${conservationId}`,null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const getSingleConservation = async (
  userId: string,
  friendId: string | null | undefined,
  token: string
): Promise<IApiResponse> =>
  await apiClient.get(
    `/conservation/single?userId=${userId}&friendId=${friendId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const sendMessage = async (message: ISendMessage, token: string): Promise<IApiResponse> =>
  await await apiClient.post("/conservation/",{...message}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});