import { applyMiddleware, createStore, combineReducers, compose, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { Context, createWrapper } from "next-redux-wrapper";
import {composeWithDevTools} from '@redux-devtools/extension'
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer, Persistor } from "redux-persist";
import { authenticateReducer } from "./reducers/authenticate.reducer";

import { IRootState } from "./interface/root.interface";


const rootReducer = combineReducers<IRootState>({
    authenticateReducer
});

const persistsConfig = {
  key: "root",
  storage,
  whitelist: ["authenticateReducer"],
};

export const saga = createSagaMiddleware();

const persistedReducer = persistReducer(persistsConfig, rootReducer);

export const store: Store<IRootState> = createStore(persistedReducer, composeWithDevTools(applyMiddleware(saga)))

export const persistor: Persistor = persistStore(store);