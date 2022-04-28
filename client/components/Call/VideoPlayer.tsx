import { selectIsConnectedToRoom, selectPeers, useAVToggle, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { Button, Grid, Modal, Spacer, Text } from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaPhoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import { ISocketContext, SocketContext } from "../../hocs/socketContext";
import Peer from "./Peers";

const VideoPlayer  = () => {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const peers = useHMSStore(selectPeers);
    const {
      isLocalAudioEnabled,
      isLocalVideoEnabled,
      toggleAudio,
      toggleVideo,
    } = useAVToggle();
  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);
    const { openFirst, leaveCall } = useContext(SocketContext) as ISocketContext;
        return (
          <Modal closeButton open={openFirst} fullScreen>
            <Modal.Header>
              <Text h3>Video Call</Text>
            </Modal.Header>
            <Modal.Body>
              <Grid.Container>
                {peers.map((peer) => (
                  <Peer peer={peer} />
                ))}
              </Grid.Container>
            </Modal.Body>
            <Modal.Footer
              css={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              {isLocalAudioEnabled ? (
                <FaMicrophone
                  onClick={toggleAudio}
                  size={50}
                  style={{
                    padding: 10,
                    borderRadius: "100%",
                    backgroundColor: "#f21361",
                  }}
                  cursor="pointer"
                />
              ) : (
                <FaMicrophoneSlash
                  onClick={toggleAudio}
                  size={50}
                  style={{
                    padding: 10,
                    borderRadius: "100%",
                    color: "#FDA0A5",
                    backgroundColor: "#888888",
                  }}
                  cursor="pointer"
                />
              )}
              <Spacer x={0.5} />
              {isLocalVideoEnabled ? (
                <FaVideo
                  size={50}
                  style={{
                    padding: 10,
                    borderRadius: "100%",
                    backgroundColor: "#f21361",
                  }}
                  cursor="pointer"
                  onClick={toggleVideo}
                />
              ) : (
                <FaVideoSlash
                  size={50}
                  style={{
                    padding: 10,
                    borderRadius: "100%",
                    color: "#FDA0A5",
                    backgroundColor: "#888888",
                  }}
                  cursor="pointer"
                  onClick={toggleVideo}
                />
              )}
              <Spacer x={0.5} />
              <FaPhoneSlash cursor="pointer" size={50} onClick={leaveCall} />
            </Modal.Footer>
          </Modal>
        );
}


export default VideoPlayer;