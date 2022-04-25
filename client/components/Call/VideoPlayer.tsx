import { Button, Grid, Modal, Text } from "@nextui-org/react";
import { useContext } from "react";
import { ISocketContext, SocketContext } from "../../hocs/socketContext";

const VideoPlayer  = () => {
    const { openFirst,stream, call, callAccepted, callEnded, user, myVideo,userVideo, friend } = useContext(SocketContext) as ISocketContext;
        return (
          <Modal closeButton open={openFirst} fullScreen>
            <Modal.Header>
              <Text h3>Video Call</Text>
            </Modal.Header>
            <Modal.Body>
              <Grid.Container>
                {stream && (
                  <Grid
                    xs={6}
                    css={{
                      dispaly: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Text h3>{user.fullname}</Text>
                    <video
                      playsInline
                      muted
                      ref={myVideo}
                      autoPlay
                      style={{ width: "100%", height: 500 }}
                    />
                  </Grid>
                )}
                {callAccepted && (
                  <Grid
                    xs={6}
                    css={{
                      dispaly: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Text h3>{call?.from.fullname || friend?.fullname}</Text>
                    <video
                      playsInline
                      muted
                      ref={userVideo}
                      autoPlay
                      style={{ width: "100%", height: 500 }}
                    />
                  </Grid>
                )}
              </Grid.Container>
            </Modal.Body>
            <Modal.Footer
              css={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button color={"error"}>Hang Up</Button>
            </Modal.Footer>
          </Modal>
        );
}


export default VideoPlayer;