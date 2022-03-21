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
import { FC, useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IRooteState } from "../store/interface/roote.interface";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAction } from "../store/interface/action.interface";
import { logoutAction } from "../store/actions/authenticate";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
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
  {
    link: "/store",
    title: "About",
    Icon: FaStore,
  },
];

const NavBar: FC<NavBarProps> = ({ authenticateReducer, doLogout }) => {
  const [fixed, SetFixed] = useState<boolean>(false);

  const { asPath, push } = useRouter();

  const { isAuthenticated, user } = authenticateReducer;

  const navigateToLoginPage = (): void => {
    push("/login");
  };

  const navigateToRegisterPage = (): void => {
    push("/register");
  };

  const logoutHandler = () => {
    doLogout();
  };

  const toggle = (): void => {
    if (window.scrollY > 100) {
      SetFixed(true);
    } else {
      SetFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggle);
    return () => {
      window.removeEventListener("scroll", toggle);
    };
  });

  return (
    <Container
      css={{ margin: 0, background: "$background", padding: 0 }}
      fluid
      className={fixed ? "fixed-navbar" : ""}
    >
      <Container fluid responsive={true}>
        <Grid.Container justify="space-between" alignItems="center">
          <Grid>
            <Grid.Container alignItems="center">
              <NextLink href="/">
                <Link>
                  <Image
                    color="white"
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
            <Grid.Container gap={3} alignItems="center">
              {router.map(({ link, Icon }, index) => (
                <Grid key={index}>
                  <NextLink href={link}>
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
            <Grid.Container gap={2} alignItems="center">
              {isAuthenticated ? (
                <>
                  <Grid>
                    <NextLink href={`/profile/${user?.username || user?._id}`}>
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
                          src={user?.avatar_url || "/images/default_avt.jpg"}
                          size="sm"
                          pointer
                          color="gradient"
                        />
                        <Text weight="bold" size={16} small color="text">
                          {user?.fullname.split(" ").slice(0, 2).join(" ")}
                        </Text>
                      </Link>
                    </NextLink>
                  </Grid>
                  <Grid>
                    <FaFacebookMessenger
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                  </Grid>
                  <Grid>
                    <FaBell
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                  </Grid>
                  <Grid>
                    <Tooltip
                      placement="bottomEnd"
                      trigger="click"
                      css={{ width: 300, padding: 0 }}
                      content={
                        <DropdownTooltip
                          fullname={user?.fullname}
                          avatar={user?.avatar_url || "/images/default_avt.jpg"}
                          profileLink={`/profile/${
                            user?.username || user?._id
                          }`}
                          logoutHandler={logoutHandler}
                        />
                      }
                    >
                      <FaCaretDown
                        style={{ width: 20, height: 20, cursor: "pointer" }}
                      />
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

const mapStateToProps = (state: IRooteState) => {
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
