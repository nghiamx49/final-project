import { AxiosResponse } from "axios";
import { Credential, User } from "../../entities";

export interface ISignInService {
  signInWithCredential(credential: Credential): Promise<AxiosResponse>;
}

export class SignInInteractor {
  _signInService: ISignInService;

  constructor(signInService: ISignInService) {
    this._signInService = signInService;
  }

  execute = async (credential: Credential): Promise<AxiosResponse> => {
    return this._signInService.signInWithCredential(credential);
  };
}
