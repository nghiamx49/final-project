import { Button, Container, Grid, Row } from "@nextui-org/react";
import { FC } from "react";
import AngryIcon from "./AngryIcon";
import HahaIcon from "./HahaIcon";
import LikeIcon from "./LikeIcon";
import LoveIcon from "./LoveIcon";
import SadIcon from "./SadIcon";
import WowIcon from "./WowIcon";

const ReactionPicker: FC = () => {
    return (
      <Grid.Container gap={.3}>
        <Grid xs={2}>
          <LikeIcon size="40" />
        </Grid>
        <Grid xs={2}>
          <LoveIcon size="40" />
        </Grid>
        <Grid xs={2}>
          <WowIcon size="40" />
        </Grid>
        <Grid xs={2}>
          <SadIcon size="40" />
        </Grid>
        <Grid xs={2}>
          <HahaIcon size="40" />
        </Grid>
        <Grid xs={2}>
          <AngryIcon size="40" />
        </Grid>
      </Grid.Container>
    );
}

export default ReactionPicker;