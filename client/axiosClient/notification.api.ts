import { apiClient } from "./index";
import { IApiResponse } from "../type/apiResponse.interface";
import { IPushNotification } from "../type/notification.interface";

export const getAllNotification = async (
  token: string
): Promise<IApiResponse> =>
  await apiClient.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const pushNotification = async (
  token: string,
  notification: IPushNotification
): Promise<IApiResponse> =>
  await apiClient.post(
    "/notifications",
    { ...notification },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
);

export const markNotifcationAsRead = async (
  notiId: string,
  token: string
): Promise<IApiResponse> =>
  await apiClient.put(`/notifications/${notiId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
