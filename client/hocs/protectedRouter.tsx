import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import {useSelector} from 'react-redux'
import { IRooteState } from "../store/interface/root.interface";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import SideBarLayout from "../layout/SideBarLayout";
import OnlyNavBarLayout from "../layout/OnlyNavBarLayout";
import { Container, Loading } from "@nextui-org/react";

const protectedRoute = (Component: any): any => {
    return (props: any) => {
        const authenticateReducer: IAuthenciateState = useSelector((state: IRooteState) => state.authenticateReducer);
        const {isAuthenticated} = authenticateReducer;
        const {push, asPath} = useRouter();
        useEffect(() => {
            if(!isAuthenticated) {
                push('/login');
            }
        }, [])
        return isAuthenticated ? (
          asPath === "/" ? (
            <SideBarLayout>
              <Component {...props} />
            </SideBarLayout>
          ) : (
            <OnlyNavBarLayout>
              <Component {...props} />
            </OnlyNavBarLayout>
          )
        ) : (
          <Container
            fluid
            display="flex"
            justify="center"
            alignItems="center"
            css={{ margin: 0, padding: 0, height: "100vh" }}
          >
            <Loading size="xl" type="default" color="secondary" />
          </Container>
        );
    }
}


export default protectedRoute;