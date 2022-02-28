import {authConstant} from '../action-constant'
import { IAuthenciateState } from '../interface/authenticate.interface';
import { IAction} from '../interface/action.interface';
import { IAuthFormData } from '../../type/auth.interface';

const {LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS} = authConstant;




export const loginAction = (payload: IAuthFormData): IAction => {
    return {type: LOGIN, payload}
}

export const loginSuccessAction = (payload: IAuthenciateState): IAction => {
    return {type: LOGIN_SUCCESS, payload}
}

export const logoutAction = ():IAction => {
    return {type: LOGOUT}
}

export const logoutSuccessAction = (): IAction => {
    return {type: LOGOUT_SUCCESS}
}