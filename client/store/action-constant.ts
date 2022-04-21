const authPrefix: string = 'AUTHENTICATE_ACTION/';
const updateProfilePrefix: string = "PROFILE_ACTION/";
interface AuthConstants {
    LOGIN: string,
    LOGIN_SUCCESS: string,
    LOGOUT: string,
    LOGOUT_SUCCESS: string
}

interface ProfileConstants {
  UPDATE_PROFILE: string;
  UPDATE_PROFILE_SUCCESS: string;
}

export const authConstant: AuthConstants = {
    LOGIN: `${authPrefix}LOGIN`,
    LOGIN_SUCCESS: `${authPrefix}LOGIN_SUCCESS`,
    LOGOUT: `${authPrefix}LOGOUT`,
    LOGOUT_SUCCESS: `${authPrefix}LOGOUT_SUCCESS`,
}


export const profileConstant: ProfileConstants = {
  UPDATE_PROFILE: `${updateProfilePrefix}UPDATE_PROFILE`,
  UPDATE_PROFILE_SUCCESS: `${updateProfilePrefix}UPDATE_PROFILE_SUCCESS`,
};