import { apiClient } from "./index";
import { IApiResponse } from "../type/apiResponse.interface";


export const sendOtp = async (email: string): Promise<IApiResponse> => await apiClient.post('/validation/send-otp', {email});
export const validateOtp = async (email: string, otp: number): Promise<IApiResponse> =>
  await apiClient.post("/validation/validate-otp", { email, otp });

export const resetPassword = async (email: string, password: string): Promise<IApiResponse> =>
  await apiClient.post("/auth/change-password", {email, password });