import { CallEffect, PutEffect, takeLatest } from "redux-saga/effects";
import { IApiResponse } from "../../type/apiResponse.interface";
import { IAction } from "../interface/action.interface";
import {profileConstant} from '../action-constant';


function* updateProfile(action: IAction): Generator<CallEffect<IApiResponse> | PutEffect<IAction>, void, IApiResponse> {
    const {payload} = action;
    
}


export default function* profileSaga() {
    yield takeLatest(profileConstant.UPDATE_PROFILE, updateProfile)
}