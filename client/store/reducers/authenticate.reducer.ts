import { IAuthenciateState } from "../interface/authenticate.interface";
import { IAction } from "../interface/action.interface";
import { authConstant } from "../action-constant";
import { HYDRATE } from "next-redux-wrapper";

const initialState: IAuthenciateState = {
  user: {
    username: "",
    fullname: "",
    email: "",
    age: 0,
    address: "",
    role: "",
    createdAt: "",
    updatedAt: "",
    avatar_url: "",
    _id: "",
  },
  isAuthenticated: false,
  token: "",
};

const { LOGIN_SUCCESS, LOGOUT_SUCCESS } = authConstant;

export const authenticateReducer = (
  state = initialState,
  action: IAction
): IAuthenciateState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
