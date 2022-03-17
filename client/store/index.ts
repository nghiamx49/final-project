import { applyMiddleware, createStore, combineReducers, compose, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import {composeWithDevTools} from '@redux-devtools/extension'
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer, Persistor } from "redux-persist";
import { authenticateReducer } from "./reducers/authenticate.reducer";

import { IRooteState } from "./interface/roote.interface";


const rootReducer = combineReducers<IRooteState>({
    authenticateReducer
});

const persistsConfig = {
  key: "root",
  storage,
  whitelist: ["authenticateReducer", "subRouterReducer"],
};

export const saga = createSagaMiddleware();

const persistedReducer = persistReducer(persistsConfig, rootReducer);

export const store: Store<IRooteState> = createStore(persistedReducer, composeWithDevTools(applyMiddleware(saga)))

export const persistor: Persistor = persistStore(store);

const makeStore = () => store;

export const wrapper = createWrapper<Store<IRooteState>>(makeStore, {debug: true})
// export const store: Store = createStore(persistedReducer, composeEnhancers(applyMiddleware(saga)));

// export const persistor: Persistor = persistStore(store);