const authPrefix: string = 'AUTHENTICATE_ACTION/';

interface AuthConstants {
    LOGIN: string,
    LOGIN_SUCCESS: string,
    LOGOUT: string,
    LOGOUT_SUCCESS: string
}

export const authConstant: AuthConstants = {
    LOGIN: `${authPrefix}LOGIN`,
    LOGIN_SUCCESS: `${authPrefix}LOGIN_SUCCESS`,
    LOGOUT: `${authPrefix}LOGOUT`,
    LOGOUT_SUCCESS: `${authPrefix}LOGOUT_SUCCESS`,
}