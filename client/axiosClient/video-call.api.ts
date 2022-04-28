import axios from "axios";
import { apiClient } from ".";
import { IApiResponse } from "../type/apiResponse.interface";

export const genToken = async (role: string, roomId: string | string [], token: string): Promise<IApiResponse> => await apiClient.post('/call', {role, roomId}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const getManageToken = async (token: string): Promise<IApiResponse> => await apiClient.get('/call/token', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const createRoom = async (body: any, token: string | any) =>
  await axios.post(
    "https://prod-in2.100ms.live/api/v2/rooms",
    { ...body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );