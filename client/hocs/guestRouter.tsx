import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IRooteState } from "../store/interface/roote.interface";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import Home from '../pages'
const guestRouter = (WrapperComponent: any): any => {
  return (props: any) => {
    const authenticateReducer: IAuthenciateState = useSelector(
      (state: IRooteState) => state.authenticateReducer
    );
    const { isAuthenticated } = authenticateReducer;
    console.log(isAuthenticated);
    const { replace } = useRouter();
    useEffect(() => {
      if (isAuthenticated) {
        replace("/");
      }
    }, []);
    return !isAuthenticated ? <WrapperComponent {...props} /> : <Home />;
  };
};

export default guestRouter;
