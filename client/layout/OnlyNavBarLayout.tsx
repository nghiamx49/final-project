import NavBar from "../components/navbar";
import { FunctionComponent, ReactChild } from "react";
import { Container, Grid } from "@nextui-org/react";

interface OnlyNavBarLayoutProps {
  children: ReactChild;
}

const OnlyNavBarLayout: FunctionComponent<OnlyNavBarLayoutProps> = (
  props
) => {
  return (
    <>
      <NavBar />
      <Container
        fluid
        xl
        css={{
          margin: 0,
          padding: 0,
          marginTop: 75,
        }}
      >
        {props.children}
      </Container>
    </>
  );
};

export default OnlyNavBarLayout;
