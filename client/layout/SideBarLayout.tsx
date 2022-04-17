import NavBar from "../components/navbar";
import { FunctionComponent, ReactChild } from "react";
import { Container, Grid } from "@nextui-org/react";
import SideBarNewFeed from "../components/SideBarNewFeed/Index";
import ChatPannel from "../components/ChatPannel";

interface SideBarLayoutProps {
    children: ReactChild
}

const SideBarLayout: FunctionComponent<SideBarLayoutProps> = ({children}) => {
    return (
      <>
        <NavBar />
        <Container
          fluid
          css={{
            margin: 0,
            padding: 0,
            marginTop: 80,
          }}
        >
          <Grid.Container
            wrap="nowrap"
            css={{ padding: 0, width: "100%", height: "auto", margin: 0 }}
          >
            <Grid>
              <SideBarNewFeed />
            </Grid>
            <Grid css={{ width: "70%" }}>
              {children}
            </Grid>
            <Grid>
                <ChatPannel />
            </Grid>
          </Grid.Container>
        </Container>
      </>
    );
}

export default SideBarLayout;