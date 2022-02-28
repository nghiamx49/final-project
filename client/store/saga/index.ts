import { all } from "redux-saga/effects";
import authenticateSaga from "./autheticate.saga";

export default function* rootSaga(): Generator {
    yield all([authenticateSaga()]);
}