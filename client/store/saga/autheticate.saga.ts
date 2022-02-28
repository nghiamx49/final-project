import { takeLatest, put, call,CallEffect, PutEffect } from "redux-saga/effects";
import {toast} from 'react-toastify'
import {authConstant} from '../action-constant'
import {logoutSuccessAction, loginSuccessAction} from '../actions/authenticate'
import { IAction } from "../interface/action.interface";
import { loginApi } from "../../axiosClient/auth.api";
import { IApiResponse } from "../../type/apiResponse.interface";
import Router from "next/router";

const {LOGIN, LOGOUT} = authConstant;

function* postLoginForm(
  action: IAction
): Generator<CallEffect<IApiResponse> | PutEffect<IAction>, void, IApiResponse> {
  const { payload } = action;
  try {
    const { data, status }: IApiResponse = yield call(loginApi, payload);
    if (status === 200) {
        yield put(loginSuccessAction(data));
        Router.push('/');
    }
    else {
        toast.error(data?.message);
    }
  } catch (error) {
    console.log(error);
  }
}

function* logout(): Generator<PutEffect<IAction>, void, never > {
    yield put(logoutSuccessAction())
    Router.push('/login');
}


export default function* authenticateSaga() {
    yield takeLatest(LOGIN, postLoginForm)
    yield takeLatest(LOGOUT, logout)
}
