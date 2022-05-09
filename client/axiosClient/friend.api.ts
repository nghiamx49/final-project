import { apiClient } from "./index";
import { IApiResponse } from "../type/apiResponse.interface";

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
  requestId: string | undefined,
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

export const getPendingRequests = async (
  token: string
): Promise<IApiResponse> =>
  apiClient.get(`/friends/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getWaitingRequests = async (
  token: string
): Promise<IApiResponse> =>
  apiClient.get(`/friends/waiting`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const unfriend = async (
  friendId: string,
  token: string
): Promise<IApiResponse> =>
  apiClient.put(
    `/friends/unfriend`,
    { friendId: friendId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const cancelRequest = async (
  requestId: string | undefined,
  token: string
): Promise<IApiResponse> =>
  await apiClient.delete(`/friends/${requestId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllSystemRecommendedFriends = async (
  token: string
): Promise<IApiResponse> =>
  apiClient.get(`/friends/recommend`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllFriends= async (
  token: string,
  search: string = ''
): Promise<IApiResponse> =>
  apiClient.get(`/friends?name=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllWaitingForAcceptRequest = async (
  token: string
): Promise<IApiResponse> =>
  apiClient.get(`/friends/waiting`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllWaitingForResponse = async (
  token: string
): Promise<IApiResponse> =>
  apiClient.get(`/friends/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
