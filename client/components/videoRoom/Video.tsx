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
        borderRadius: "$lg",
        marginRight: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "fit-content",
      }}
    >
      <video
        playsInline
        poster="/images/default_avt.jpg"
        muted
        ref={videoRef}
        autoPlay
        style={{
          borderRadius: "20px",
          height: 300,
          width: 300,
          padding: 0, margin: 0
        }}
      />
      <Text h3>
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </Text>
    </Grid>
  );
};

export default Video;
