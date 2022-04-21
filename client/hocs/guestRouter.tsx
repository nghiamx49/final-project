import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IRootState } from "../store/interface/root.interface";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import OnlyNavBarLayout from "../layout/OnlyNavBarLayout";
import { Container, Loading } from "@nextui-org/react";

const guestRouter = (Component: any): any => {
  return (props: any) => {
      const authenticateReducer: IAuthenciateState = useSelector(
        (state: IRootState) => state.authenticateReducer
      );
      const { isAuthenticated } = authenticateReducer;
    const { replace, push } = useRouter();
    useEffect(() => {
      if (isAuthenticated) {
        push("/");
      }
    }, []);
    return !isAuthenticated ? (
      <OnlyNavBarLayout>
        <Component {...props} />
      </OnlyNavBarLayout>
    ) : <Container fluid display="flex" justify="center" alignItems="center" css={{margin: 0, padding: 0, height: '100vh'}}>
        <Loading size="xl" type="default" color="secondary" />
    </Container>;
  };
};

export default guestRouter;
