import { Button, Container, Grid, Row } from "@nextui-org/react";
import { FC, MouseEventHandler, SyntheticEvent } from "react";
import { reactToPost } from "../../axiosClient/feed.api";
import { IUser } from "../../store/interface/user.interface";
import AngryIcon from "./AngryIcon";
import HahaIcon from "./HahaIcon";
import LikeIcon from "./LikeIcon";
import LoveIcon from "./LoveIcon";
import SadIcon from "./SadIcon";
import WowIcon from "./WowIcon";

interface Props {
  postId: string;
  reload: Function;
  token: string;
}

const ReactionPicker: FC<Props> = ({ postId, reload, token}) => {

    const onReaction = async (e: SyntheticEvent) => {
      const reactionType: string = e.currentTarget.attributes[0].value;
      console.log(reactionType);
      const {data, status} = await reactToPost(token, postId, reactionType);
      if(status === 201) {
        reload(data.data);
      }
    };

    return (
      <Grid.Container gap={0.3}>
        <Grid xs={2}>
          <LikeIcon size="40" onClick={onReaction} />
        </Grid>
        <Grid xs={2}>
          <LoveIcon size="40" onClick={onReaction} />
        </Grid>
        <Grid xs={2}>
          <WowIcon size="40" onClick={onReaction} />
        </Grid>
        <Grid xs={2}>
          <SadIcon size="40" onClick={onReaction} />
        </Grid>
        <Grid xs={2}>
          <HahaIcon size="40" onClick={onReaction} />
        </Grid>
        <Grid xs={2}>
          <AngryIcon size="40" onClick={onReaction} />
        </Grid>
      </Grid.Container>
    );
}

export default ReactionPicker;