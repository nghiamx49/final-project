import { AxiosResponse } from "axios";
import { Credential, Register } from "../entities";
import { ISignInService, ISignUpService } from "../use-cases";
import { apiClient } from "./ApiClient";

export class AuthenticationService implements ISignInService, ISignUpService {
  signInWithCredential = async (
    credential: Credential,
  ): Promise<AxiosResponse> => {
    const response: AxiosResponse = await apiClient.post("/auth/login", {
      body: credential,
    });
    return await response;
  };
  signUpAccount = async (user: Register): Promise<AxiosResponse> => {
    const response: AxiosResponse = await apiClient.post("/auth/register", {
      body: user,
    });
    return await response;
  };
}
