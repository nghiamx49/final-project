import {  AxiosResponse } from "axios";
import { Register } from "../../entities";

export interface ISignUpService {
    signUpAccount(user: Register): Promise<AxiosResponse>;
}

export class SignUpInteractor {
    _signUpService: ISignUpService;
    constructor(signUpService: ISignUpService) {
        this._signUpService = signUpService;
    }

    execute = async (user: Register): Promise<AxiosResponse> => {
        return await this._signUpService.signUpAccount(user);
    }
}