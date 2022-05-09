import { Container, Loading, Text } from "@nextui-org/react";
import { FC } from "react"


const AppLoading: FC = () => {
    return (
      <Container
        fluid
        display="flex"
        justify="center"
        alignItems="center"
        direction="column"
        css={{ margin: 0, padding: 0, height: "100vh"}}
        id="loading"
      >
        <Text as="div" css={{ color: "$pink600" }}>
          <Loading
            loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
            type="default"
            color="currentColor"
          />
        </Text>
        <Text css={{ color: "$pink600" }} h1>
          PetsLove
        </Text>
      </Container>
    );
}


export default AppLoading