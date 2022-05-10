import {
  Grid,
  Container,
  Text,
  Button,
  Link,
  Avatar,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { FC, SyntheticEvent, useCallback, useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IRootState } from "../store/interface/root.interface";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAction } from "../store/interface/action.interface";
import { logoutAction } from "../store/actions/authenticate";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import {
  FaHome,
  FaUserFriends,
  FaStore,
  FaSearch,
  FaCaretDown,
  FaFacebookMessenger,
  FaBell,
} from "react-icons/fa";
import { IconType } from "react-icons";
import DropdownTooltip from "./DropDownToolTip";
import Badge from "./badge";
import ConservationContainer from "./Conservation/ConservationContainer";
import { IConservation } from "../type/conservation.interface";
import { getAllConservations, markConservationasRead } from "../axiosClient/chat.api";
import { IUser } from "../store/interface/user.interface";
import { ChatWidgetContext } from "../hocs/ChatWidgetContext";
import { socket } from "../hocs/socketContext";
import { INotification } from "../type/notification.interface";
import { getAllNotification, markNotifcationAsRead } from "../axiosClient/notification.api";
import NotificationContainer from "./NotificationContainer"; 
interface RouterLink {
  link: string;
  title: string;
  Icon: IconType;
}

interface NavBarProps {
  authenticateReducer: IAuthenciateState;
  doLogout: Function;
}

const router: Array<RouterLink> = [
  {
    link: "/",
    title: "Home",
    Icon: FaHome,
  },
  {
    link: "/friends",
    title: "About",
    Icon: FaUserFriends,
  },
];

const NavBar: FC<NavBarProps> = ({ authenticateReducer, doLogout }) => {
  const { asPath, push } = useRouter();
  const [conservations, setConservations] = useState<IConservation[]>([]);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const { isAuthenticated, user, token } = authenticateReducer;
  const {setOpen, setFriend} = useContext(ChatWidgetContext);

  const navigateToLoginPage = (): void => {
    push("/login");
  };

  const navigateToRegisterPage = (): void => {
    push("/register");
  };


  const loadAllConservation = useCallback(async () => {
    if(isAuthenticated) {
          const { data, status } = await getAllConservations(token);
          if (status === 200) {
            setConservations(data.data);
          }
    }
  }, [token, isAuthenticated]);

  const loadNotifications = useCallback(async () => {
 if (isAuthenticated) {
   const { data, status } = await getAllNotification(token);
   if (status === 200) {
     setNotifications(data.data);
   }
 }
  }, [isAuthenticated, token])

  const markAsRead = async (conservationId: string, isRead: boolean, friend: IUser) => {
   if(!isRead) {
      const { data, status } = await markConservationasRead(
        token,
        conservationId
      );
      if(status === 200) {
        setConservations(data.data);
      }
   }
   setFriend && setFriend(friend);
   setOpen && setOpen(true);
  }

  const markNotiRead = async (notificationId: string, isRead: boolean, link: string) => {
    if (!isRead) {
      const { data, status } = await markNotifcationAsRead(notificationId, token);
      if (status === 200) {
        setNotifications(data.data);
      }
    }
    push(link);
  }

  useEffect(() => {
    loadAllConservation();
    loadNotifications();
  }, [loadAllConservation, loadNotifications])

  useEffect(() => {
   
    socket.on("conservation-updated", () => {
      loadAllConservation();
    });
    socket.on("new-notification", () => {
      loadNotifications();
    });
    return () => {
      socket.off("conservation-updated");
      socket.off("new-notification");
    }
  }, [loadAllConservation, loadNotifications])

  const logoutHandler = () => {
    doLogout();
  };

  return (
    <Container
      css={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 999,
        background: "$background",
        backdropFilter: "blur(100px)",
        borderBottom: "1px solid $gray700",
        padding: 0,
        margin: 0,
      }}
      fluid
      xl
    >
      <Container fluid responsive={true} style={{ padding: "3px 7px" }}>
        <Grid.Container justify="space-between" alignItems="center">
          <Grid>
            <Grid.Container alignItems="center">
              <NextLink href="/" passHref>
                <Link style={{ marginRight: 10 }}>
                  <Image
                    color="white"
                    alt="app logo"
                    width={40}
                    height={40}
                    src={"/images/logo.png"}
                  />
                </Link>
              </NextLink>
              {isAuthenticated && (
                <Input
                  contentLeft={<FaSearch size={20} />}
                  placeholder="Search..."
                  aria-labelledby="search"
                  css={{ width: 250 }}
                />
              )}
            </Grid.Container>
          </Grid>
          <Grid>
            <Grid.Container gap={3} alignItems="center" style={{ padding: 0 }}>
              {isAuthenticated &&
                router.map(({ link, Icon }, index) => (
                  <Grid key={index}>
                    <NextLink href={link} passHref>
                      <Link
                        block
                        color={asPath === link ? "primary" : "text"}
                        css={{ fontWeight: "$bold" }}
                      >
                        <Icon size={30} />
                      </Link>
                    </NextLink>
                  </Grid>
                ))}
            </Grid.Container>
          </Grid>
          <Grid>
            <Grid.Container gap={1} alignItems="center">
              {isAuthenticated ? (
                <>
                  <Grid>
                    <NextLink
                      href={`/profile/${user?.username || user?._id}`}
                      passHref
                    >
                      <Link
                        block
                        color={
                          asPath === `/profile/${user?.username || user?._id}`
                            ? "primary"
                            : "text"
                        }
                        css={
                          asPath === `/profile/${user?.username || user?._id}`
                            ? {
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                backgroundColor: "rgba(24, 119, 242, .31)",
                                color: "$primary",
                                borderRadius: "100px",
                                paddingRight: "10px",
                              }
                            : { display: "flex", alignItems: "center", gap: 10 }
                        }
                      >
                        <Avatar
                          src={user?.avatar || "/images/default_avt.jpg"}
                          size="md"
                          pointer
                          bordered
                          color="gradient"
                        />
                        <Text weight="bold" size={16} small color="text">
                          {user?.fullname.split(" ").slice(0, 2).join(" ")}
                        </Text>
                      </Link>
                    </NextLink>
                  </Grid>
                  <Grid>
                    <Tooltip
                      placement="bottomEnd"
                      trigger="click"
                      css={{ width: 300, padding: 0, marginTop: -80 }}
                      content={
                        <ConservationContainer
                          onClickHandler={markAsRead}
                          conservations={conservations}
                          currentUser={user}
                        />
                      }
                    >
                      <Badge
                        count={
                          conservations.filter(
                            (conservation) =>
                              conservation.readBy.findIndex(
                                (reader) => reader?._id === user._id
                              ) < 0
                          ).length
                        }
                      >
                        <FaFacebookMessenger
                          style={{
                            width: 20,
                            height: 20,
                            cursor: "pointer",
                            color: "#fff",
                          }}
                        />
                      </Badge>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip
                      placement="bottomEnd"
                      trigger="click"
                      css={{ width: 300, padding: 0, marginTop: -80 }}
                      content={
                        <NotificationContainer
                          handleReadNoti={markNotiRead}
                          notifications={notifications}
                          currentUser={user}
                        />
                      }
                    >
                      <Badge
                        count={
                          notifications.filter(
                            (noti) =>
                              noti.readBy.findIndex(
                                (reader) => reader?._id === user._id
                              ) < 0
                          ).length
                        }
                      >
                        <FaBell
                          style={{
                            width: 20,
                            height: 20,
                            cursor: "pointer",
                            color: "#fff",
                          }}
                        />
                      </Badge>
                    </Tooltip>
                  </Grid>
                  <Grid css={{ cursor: "pointer" }}>
                    <Tooltip
                      placement="bottomEnd"
                      trigger="click"
                      css={{ width: 300, padding: 0, marginTop: -80 }}
                      content={
                        <DropdownTooltip
                          fullname={user?.fullname}
                          avatar={user?.avatar || "/images/default_avt.jpg"}
                          profileLink={`/profile/${
                            user?.username || user?._id
                          }`}
                          logoutHandler={logoutHandler}
                        />
                      }
                    >
                      <Badge count={0}>
                        <FaCaretDown
                          style={{
                            width: 20,
                            height: 20,
                            cursor: "pointer",
                            color: "#fff",
                          }}
                        />
                      </Badge>
                    </Tooltip>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid>
                    <Button
                      onClick={navigateToLoginPage}
                      auto
                      bordered
                      color="gradient"
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      onClick={navigateToRegisterPage}
                      auto
                      bordered
                      color="gradient"
                    >
                      Register
                    </Button>
                  </Grid>
                </>
              )}
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    doLogout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
