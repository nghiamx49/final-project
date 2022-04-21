import { IAction } from "../interface/action.interface";
import {profileConstant} from '../action-constant'


export const updateProfileAction = (payload: any): IAction => {
    return {type: profileConstant.UPDATE_PROFILE, payload};
}

export const updateProfileSuccess = (payload: any): IAction => {
    return {type: profileConstant.UPDATE_PROFILE_SUCCESS, payload}
}