import { selectIsConnectedToRoom, selectPeers, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { Container, Grid, Row, Text } from "@nextui-org/react";
import React, { useEffect } from "react";
import Controller from "./MediaControl";
import Video from "./Video";

function Conference() {
  const peers = useHMSStore(selectPeers);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();


  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <Container
      fluid
      css={{ minHeight: "100vh", position: "relative", width: "100%" }}
    >
      <Text h2>Conference</Text>
      <Controller />
      <Grid.Container gap={2} css={{ width: "100%" }}>
        {peers.map((peer) => (
          <Video key={peer.id} peer={peer} />
        ))}
      </Grid.Container>
    </Container>
  );
}

export default Conference;
