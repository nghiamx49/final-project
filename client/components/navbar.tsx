import {
  Grid,
  Container,
  Text,
  Button,
  Link,
  Input,
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

interface RouterLink {
  link: string;
  title: string;
}

interface NavBarProps {
  authenticateReducer: IAuthenciateState;
  doLogout: Function;
}

const router: Array<RouterLink> = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/about",
    title: "About",
  },
];

const NavBar: FC<NavBarProps> = ({ authenticateReducer, doLogout }) => {
  const [fixed, SetFixed] = useState<boolean>(false);

  const { asPath, push } = useRouter();

  const { isAuthenticated } = authenticateReducer;

  const navigateToLoginPage = (): void => {
    push('/login');
  }

  const navigateToRegisterPage = (): void => {
    push('/register')
  }

  const logoutHandler = () => {
    doLogout();
  }

  const toggle = () => {
    if (window.scrollY > 70) {
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
  const { isDark, type } = useTheme();
  return (
    <Container className={fixed ? "fixed-navbar" : ""}>
      <Container md fluid responsive={true}>
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
              {router.map((item, index) => (
                <Grid key={index}>
                  <NextLink href={item.link}>
                    <Link
                      block
                      color={asPath === item.link ? "primary" : "text"}
                      css={{ fontWeight: "$bold" }}
                    >
                      {item.title}
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
                    <Input
                      aria-labelledby="search"
                      bordered
                      clearable
                      color="secondary"
                      borderWeight="light"
                      placeholder={type}
                    />
                  </Grid>
                  <Grid>
                    <Avatar
                      src={
                        "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/269891404_1557376167946818_8381890360866751040_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=-VBuQYN_NGoAX_kA96n&_nc_ht=scontent.fhan2-4.fna&oh=00_AT8iuW8Yng85KFlkBvwZW7y4bFQZmLj6rlO5iZnkaVYzoQ&oe=62188749"
                      }
                      size="lg"
                      pointer
                      bordered
                      color="gradient"
                    />
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
