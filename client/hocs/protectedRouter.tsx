import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import {useSelector} from 'react-redux'
import { IRootState } from "../store/interface/root.interface";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import SideBarLayout from "../layout/SideBarLayout";
import OnlyNavBarLayout from "../layout/OnlyNavBarLayout";
import FriendSidePanel from "../layout/FriendSidePanelLayout";
import SocketProvider from "./socketContext";
import { ChatWidgetProvider } from "./ChatWidgetContext";
import ChatWidget from "../components/ChatPannel/ChatWidget";
import CallNotification from "../components/Call/CallNotification";
import VideoPlayer from "../components/Call/VideoPlayer";
import Router from "next/router";
import { useState } from "react";
import AppLoading from "../components/Loading";

const protectedRoute = (Component: any): any => {

    return (props: any) => {
        const authenticateReducer: IAuthenciateState = useSelector((state: IRootState) => state.authenticateReducer);
        const {isAuthenticated, user} = authenticateReducer;
        const {push, asPath} = useRouter();

          const [loading, setLoading] = useState<boolean>(false);

          Router.events.on("routeChangeStart", (url) => {
            setLoading(true);
          });

          Router.events.on("routeChangeComplete", (url) => {
            setLoading(false);
          });

        useEffect(() => {
            if(!isAuthenticated) {
                push('/login');
            }
            else {
              if(user.role === 'Admin') {
                push('/admin')
              }
            }
        }, [])
        return isAuthenticated ? (
          loading ? (
            <OnlyNavBarLayout>
              <AppLoading />
            </OnlyNavBarLayout>
          ) : asPath === "/" ? (
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
          <OnlyNavBarLayout>
            <AppLoading />
          </OnlyNavBarLayout>
        ); 
    }
}


export default protectedRoute;