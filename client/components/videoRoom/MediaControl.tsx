import { useAVToggle, useHMSActions } from "@100mslive/react-sdk";
import { Container, Spacer } from "@nextui-org/react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";

const Controller = () => {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const leaveCall = () => {
    hmsActions.leave();
  };
  return (
    <Container
      css={{
        width: "100%",
        padding: 20,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        gap: 20,
        backgroundColor: '$accents1',
      }}
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
    </Container>
  );
};

export default Controller;
