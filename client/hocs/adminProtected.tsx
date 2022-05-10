import { useRouter } from "next/router";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import AppLoading from "../components/Loading";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import { IRootState } from "../store/interface/root.interface";


const adminProtected = (Component: any) => {
    return (props: any) => {
        const {isAuthenticated, user}: IAuthenciateState = useSelector(
          (state: IRootState) => state.authenticateReducer
        );
        const { push, asPath } = useRouter();

        useEffect(() => {
              if (!isAuthenticated) {
                push("/login");
              } else {
                if (user.role !== "Admin") {
                  push("/");
                }
              }
         }, []);

         return (isAuthenticated ? <Component {...props} /> : <AppLoading />)
    }
}


export default adminProtected;