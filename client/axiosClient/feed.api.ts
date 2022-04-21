import { apiClient } from ".";
import { IApiResponse } from "../type/apiResponse.interface";


export const getUserPosts = async (
  token: string,
  userId: string
): Promise<IApiResponse> =>
  apiClient.get(`/feeds/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
