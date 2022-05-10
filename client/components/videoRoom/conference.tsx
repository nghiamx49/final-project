import { selectIsConnectedToRoom, selectPeers, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { Card, Container, Grid, Row, Text } from "@nextui-org/react";
import React, { useEffect } from "react";
import ChatPannel from "./ChatPanel";
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
      css={{
        minHeight: "90vh",
        position: "relative",
        width: "100%",
        padding: 0,
        margin: 0,
      }}
    >
      <Grid.Container css={{ height: "100%", padding: 0, margin: 0 }}>
        <Grid
          xs={11}
          css={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: '92vh'
          }}
        >
          <Card css={{ background: "transparent", height: '100%', borderRadius: 0 }}>
            <Card.Header>
              <Text h2>Conference</Text>
            </Card.Header>
            <Card.Body
              css={{
                height: "100%",
                overflow: "auto",
                padding: "10px 0",
                marginLeft: 120,
                justifyContent: "flex-end",
              }}
            >
              <Grid.Container
                gap={2}
                css={{ width: "100%", height: "100%", padding: 0 }}
              >
                {peers.map((peer) => (
                  <Video key={peer.id} peer={peer} />
                ))}
              </Grid.Container>
            </Card.Body>
            <Card.Footer css={{padding: 0}}>
              <Controller />
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={1}>
          <ChatPannel />
        </Grid>
      </Grid.Container>
    </Container>
  );
}

export default Conference;
