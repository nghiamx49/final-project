import { HMSPeer, useVideo } from "@100mslive/react-sdk";
import { Grid, Text } from "@nextui-org/react";
import { FC } from "react";
interface Props {
  peer: HMSPeer;
}

const Peer: FC<Props> = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <Grid
      xs={6}
      css={{
        dispaly: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        width: "fit-content",
      }}
    >
      <Text h3>
        {peer.name} {peer.isLocal && "(You)"}
      </Text>
      <video
        playsInline
        poster="/images/default_avt.jpg"
        muted
        ref={videoRef}
        autoPlay
        style={{ width: 500, height: 500, borderRadius: "10px" }}
      />
    </Grid>
  );
};

export default Peer;
