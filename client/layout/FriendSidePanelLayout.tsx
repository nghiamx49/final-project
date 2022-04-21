import NavBar from "../components/navbar";
import { FunctionComponent, ReactChild } from "react";
import { Container, Grid, Row, Text, Link, useTheme } from "@nextui-org/react";
import NextLink from "next/link";
import SideBarNewFeed from "../components/SideBarNewFeed/Index";
import ChatPannel from "../components/ChatPannel";
import {FaUsers, FaUserPlus, FaUserClock, FaUserFriends} from 'react-icons/fa'
import { useRouter } from "next/router";

interface FriendSidePanelProps {
  children: ReactChild;
}

const FriendSidePanel: FunctionComponent<FriendSidePanelProps> = ({
  children,
}) => {
    const {asPath} = useRouter();
    const {isDark} = useTheme();
  return (
    <>
      <NavBar />
      <Container
        fluid
        css={{
          margin: 0,
          padding: 0,
          marginTop: 75,
        }}
      >
        <Grid.Container
          wrap="nowrap"
          css={{ padding: 0, width: "100%", height: "auto", margin: 0 }}
          justify="space-between"
        >
          <Grid xs={2}>
            <Container
              fluid
              css={{
                maxHeight: "calc(100vh - 80px)",
                height: "calc(100vh - 80px)",
                borderRight: "1px solid $gray700",
                position: "sticky",
                top: 70,
                padding: "0 5px",
                maxWidth: 360,
              }}
            >
              <Row>
                <Text h3>Friends</Text>
              </Row>
              <Row fluid css={{ width: "100%" }}>
                <NextLink href="/friends">
                  <Link
                    block
                    color="primary"
                    css={
                      asPath === "/friends"
                        ? {
                            dislay: "flex",
                            columnGap: 10,
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                            width: "100%",
                            backgroundColor: "$gray700",
                            color: "#fff",
                          }
                        : {
                            dislay: "flex",
                            columnGap: 10,
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                            width: "100%",
                            color: isDark ? "#fff" : "#000",
                          }
                    }
                  >
                    <div
                      style={
                        asPath === "/friends"
                          ? {
                              backgroundColor: "#0040AE",
                              padding: "10px 10px 5px",
                              borderRadius: "100%",
                            }
                          : {
                              backgroundColor: "#444",
                              padding: "10px 10px 5px",
                              borderRadius: "100%",
                            }
                      }
                    >
                      <FaUserFriends size={20} color="white" />
                    </div>
                    <Text h5 color="inherit">
                      Your Friends
                    </Text>
                  </Link>
                </NextLink>
              </Row>
              <Row fluid css={{ width: "100%" }}>
                <NextLink href="/friends/request">
                  <Link
                    block
                    color="primary"
                    css={
                      asPath === "/friends/request"
                        ? {
                            dislay: "flex",
                            columnGap: 10,
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                            width: "100%",
                            backgroundColor: "$gray700",
                            color: "#fff",
                          }
                        : {
                            dislay: "flex",
                            columnGap: 10,
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                            width: "100%",
                            color: isDark ? "#fff" : "#000",
                          }
                    }
                  >
                    <div
                      style={
                        asPath === "/friends/request"
                          ? {
                              backgroundColor: "#0040AE",
                              padding: "10px 10px 5px",
                              borderRadius: "100%",
                            }
                          : {
                              backgroundColor: "#444",
                              padding: "10px 10px 5px",
                              borderRadius: "100%",
                            }
                      }
                    >
                      <FaUserPlus size={20} color="white" />
                    </div>
                    <Text h5 color="inherit">
                      Incoming Requests
                    </Text>
                  </Link>
                </NextLink>
              </Row>
              <Row fluid css={{ width: "100%" }}>
                <NextLink href="/friends/pending">
                  <Link
                    block
                    color="primary"
                    css={
                      asPath === "/friends/pending"
                        ? {
                            dislay: "flex",
                            columnGap: 10,
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                            width: "100%",
                            backgroundColor: "$gray700",
                            color: "#fff",
                          }
                        : {
                            dislay: "flex",
                            columnGap: 10,
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                            width: "100%",
                            color: isDark ? "#fff" : "#000",
                          }
                    }
                  >
                    <div
                      style={
                        asPath === "/friends/pending"
                          ? {
                              backgroundColor: "#0040AE",
                              padding: "10px 10px 5px",
                              borderRadius: "100%",
                            }
                          : {
                              backgroundColor: "#444",
                              padding: "10px 10px 5px",
                              borderRadius: "100%",
                            }
                      }
                    >
                      <FaUserClock size={20} color="white" />
                    </div>
                    <Text h5 color="inherit">
                      Waiting For Response
                    </Text>
                  </Link>
                </NextLink>
              </Row>
              <Row fluid css={{ width: "100%" }}>
                <NextLink href="/friends/recommend">
                  <Link
                    block
                    color="primary"
                    css={
                      asPath === "/friends/recommend"
                        ? {
                            dislay: "flex",
                            columnGap: 10,
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                            width: "100%",
                            backgroundColor: "$gray700",
                            color: '#fff'
                          }
                        : {
                            dislay: "flex",
                            columnGap: 10,
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                            width: "100%",
                            color: isDark ? "#fff" : "#000",
                          }
                    }
                  >
                    <div
                      style={
                        asPath === "/friends/recommend"
                          ? {
                              backgroundColor: "#0040AE",
                              padding: "10px 10px 5px",
                              borderRadius: "100%",
                            }
                          : {
                              backgroundColor: "#444",
                              padding: "10px 10px 5px",
                              borderRadius: "100%",
                            }
                      }
                    >
                      <FaUsers size={20} color="white" />
                    </div>
                    <Text h5 color="inherit">You may know</Text>
                  </Link>
                </NextLink>
              </Row>
            </Container>
          </Grid>
          <Grid xs={10}>{children}</Grid>
        </Grid.Container>
      </Container>
    </>
  );
};

export default FriendSidePanel;
