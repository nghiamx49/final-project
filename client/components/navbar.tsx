import {
  Grid,
  Container,
  Text,
  Button,
  Link,
  Row,
  Avatar,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import NextLink from "next/link";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { IRooteState } from "../store/interface/roote.interface";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAction } from "../store/interface/action.interface";
import { logoutAction } from "../store/actions/authenticate";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import { IoMdSunny , IoMdMoon} from "react-icons/io";
import {FaHome, FaUserSecret} from 'react-icons/fa'
import { IconType } from "react-icons";
interface RouterLink {
  link: string;
  title: string;
  Icon: IconType
}

interface NavBarProps {
  authenticateReducer: IAuthenciateState;
  doLogout: Function;
}

const router: Array<RouterLink> = [
  {
    link: "/",
    title: "Home",
    Icon: FaHome
  },
  {
    link: "/about",
    title: "About",
    Icon: FaUserSecret
  },
  {
    link: "/",
    title: "About",
    Icon: FaHome
  },
  {
    link: "/about",
    title: "About",
    Icon: FaUserSecret
  },
  {
    link: "/",
    title: "About",
    Icon: FaHome
  },
];

const NavBar: FC<NavBarProps> = ({ authenticateReducer, doLogout }) => {
  const [fixed, SetFixed] = useState<boolean>(false);

  const { asPath, push } = useRouter();

  const {
    isAuthenticated,
    user,
  } = authenticateReducer;

  const navigateToLoginPage = (): void => {
    push('/login');
  }

  const navigateToRegisterPage = (): void => {
    push('/register')
  }

  const navigateToOwnProfile = (): void => {
    push(`/profile/${user?.username || user?._id}`);
  }

  const logoutHandler = () => {
    doLogout();
  }

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

  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  return (
    <Container
      css={{ margin: 0, background: '$background' }}
      fluid
      className={fixed ? "fixed-navbar" : ""}
    >
      <Container fluid responsive={true}>
        <Grid.Container justify="space-between" alignItems="center">
          <Grid>
            <NextLink href="/">
              <Link>
                <Grid.Container alignItems="center">
                  <Image
                    color="white"
                    width={50}
                    height={50}
                    src={"/images/logo.png"}
                  />
                  <Text h2>Final Project</Text>
                </Grid.Container>
              </Link>
            </NextLink>
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
                      <Icon size="30" />
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
                    <Avatar
                      src={user?.avatar_url || "/images/default_avt.jpg"}
                      size="lg"
                      pointer
                      bordered
                      color="gradient"
                      onClick={navigateToOwnProfile}
                    />
                  </Grid>
                  <Grid>
                    <Row>
                      <Text weight="bold" size={12} small color="text">
                        Hello,
                      </Text>
                    </Row>
                    <Row>
                      <Text weight="bold" size={12} small color="text">
                        {user?.fullname}
                      </Text>
                    </Row>
                  </Grid>
                  <Grid>
                    <Button
                      onClick={logoutHandler}
                      auto
                      bordered
                      color="gradient"
                    >
                      Logout
                    </Button>
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

              <Grid>
                <Switch
                  checked={isDark}
                  iconOff={<IoMdMoon />}
                  iconOn={<IoMdSunny />}
                  color="secondary"
                  onChange={(e) =>
                    setTheme(e.target.checked ? "dark" : "light")
                  }
                />
              </Grid>
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
