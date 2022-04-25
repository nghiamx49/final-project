import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import {useSelector} from 'react-redux'
import { IRootState } from "../store/interface/root.interface";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import SideBarLayout from "../layout/SideBarLayout";
import OnlyNavBarLayout from "../layout/OnlyNavBarLayout";
import { Container, Loading } from "@nextui-org/react";
import FriendSidePanel from "../layout/FriendSidePanelLayout";
import SocketProvider from "./socketContext";
import { ChatWidgetProvider } from "./ChatWidgetContext";
import ChatWidget from "../components/ChatPannel/ChatWidget";
import CallNotification from "../components/Call/CallNotification";
import VideoPlayer from "../components/Call/VideoPlayer";

const protectedRoute = (Component: any): any => {
    return (props: any) => {
        const authenticateReducer: IAuthenciateState = useSelector((state: IRootState) => state.authenticateReducer);
        const {isAuthenticated} = authenticateReducer;
        const {push, asPath} = useRouter();
        useEffect(() => {
            if(!isAuthenticated) {
                push('/login');
            }
        }, [])
        return isAuthenticated ? (
          asPath === "/" ? (
            <SocketProvider>
              <ChatWidgetProvider>
                <>
                  <ChatWidget />
                  <CallNotification />
                  <VideoPlayer />
                  <SideBarLayout>
                    <Component {...props} />
                  </SideBarLayout>
                </>
              </ChatWidgetProvider>
            </SocketProvider>
          ) : asPath.includes("/friends") ? (
            <SocketProvider>
              <ChatWidgetProvider>
                <>
                  <ChatWidget />
                  <CallNotification />
                  <VideoPlayer />
                  <FriendSidePanel>
                    <Component {...props} />
                  </FriendSidePanel>
                </>
              </ChatWidgetProvider>
            </SocketProvider>
          ) : (
            <SocketProvider>
              <ChatWidgetProvider>
                <>
                  <ChatWidget />
                  <CallNotification />
                  <VideoPlayer />
                  <OnlyNavBarLayout>
                    <Component {...props} />
                  </OnlyNavBarLayout>
                </>
              </ChatWidgetProvider>
            </SocketProvider>
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