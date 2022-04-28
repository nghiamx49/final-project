import { HMSPeer, useVideo } from "@100mslive/react-sdk";
import { Grid, Text } from "@nextui-org/react";
import { FC } from "react";

interface Props {
  peer: HMSPeer;
}

const Video: FC<Props> = ({ peer }) => {
  //peer.isLocal
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <Grid
      xs={3}
      css={{
        backgroundColor: peer.isLocal ? "$blue500" : "$blue300",
        borderRadius: "$lg",
        marginRight: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <video
        playsInline
        poster="/images/default_avt.jpg"
        muted
        ref={videoRef}
        autoPlay
        style={{
          width: "auto",
          height: "auto",
          borderRadius: "20px",
        }}
      />
      <Text h3>
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </Text>
    </Grid>
  );
};

export default Video;
