import { NextPage } from "next";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import {useSelector} from 'react-redux'
import { IRooteState } from "../store/interface/roote.interface";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import Login from '../pages/login';

const protectedRoute = (WrapperComponent: any): any => {
    return (props: any) => {
        const authenticateReducer: IAuthenciateState = useSelector((state: IRooteState) => state.authenticateReducer);
        const {isAuthenticated} = authenticateReducer;
        const {push, replace} = useRouter();
        useEffect(() => {
            if(!isAuthenticated) {
                replace('/login');
            }
        }, [])
        return isAuthenticated ? <WrapperComponent {...props} /> : <Login />;
    }
}


export default protectedRoute;