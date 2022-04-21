import { IAuthenciateState } from "../interface/authenticate.interface";
import { IAction } from "../interface/action.interface";
import { authConstant, profileConstant } from "../action-constant";

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
    avatar: "",
    cover: "",
    _id: "",
    allFriends: []
  },
  isAuthenticated: false,
  token: "",
};

const { LOGIN_SUCCESS, LOGOUT_SUCCESS } = authConstant;
const {UPDATE_PROFILE_SUCCESS} = profileConstant;

export const authenticateReducer = (
  state = initialState,
  action: IAction
): IAuthenciateState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, ...initialState };
    case UPDATE_PROFILE_SUCCESS:
      return {...state, user: {...state.user, ...action.payload}};
    default:
      return state;
  }
};
