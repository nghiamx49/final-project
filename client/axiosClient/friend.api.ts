import { IAuthFormData, IRegistertFormData } from "../type/auth.interface";
import { apiClient, getToken } from "./index";
import { IApiResponse } from "../type/apiResponse.interface";
import { AxiosRequestConfig } from "axios";
import { FriendStatus } from "../type/friendStatus.enum";

export const checkFriendStatus = async (
  userId: string,
  token: string
): Promise<IApiResponse> =>
  apiClient.get(`/friends/status/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const handleFriendRequest = async (
  requestId: string,
  status: string,
  token: string
): Promise<IApiResponse> =>
  apiClient.post(
    `/friends/${requestId}`,
    { status: status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const handleAddNewFriend = async (
  receiverId: string,
  token: string
): Promise<IApiResponse> =>
  apiClient.post(
    `/friends/`,
    { receiverId: receiverId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getPendingRequests = async (token: string): Promise<IApiResponse> =>
  apiClient.get(
    `/friends/pending`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const getWaitingRequests = async (token: string): Promise<IApiResponse> =>
  apiClient.get(
    `/friends/waiting`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const unfriend = async (
  friendId: string,
  token: string
): Promise<IApiResponse> =>
  apiClient.post(`/friends/unfriend`,{friendId: friendId}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
