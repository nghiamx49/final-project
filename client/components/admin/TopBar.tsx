import { Grid, Image, Text } from "@nextui-org/react";
import { FC } from "react";


const TopBar: FC = () => {
    return (
      <Grid.Container justify="space-between">
        <Grid xs={2} md={2} lg={2} alignItems="center" justify="flex-start">
          <Image alt="Logo" src="/images/logo.png" height={50} width={50} />
        </Grid>
        <Grid xs={10} md={10} lg={10} alignItems="center">
          <Text h2>Dashboard</Text>
        </Grid>
      </Grid.Container>
    );
}


export default TopBar;