import { HMSConfig, selectLocalPeer, useAVToggle, useHMSActions, useHMSStore, useVideo } from "@100mslive/react-sdk";
import { connect } from "react-redux";
import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { IRootState } from "../../store/interface/root.interface";
import { genToken } from "../../axiosClient/video-call.api";
import { Button, Container, Spacer } from "@nextui-org/react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";

interface Props {
  authenticateReducer: IAuthenciateState;
  roomId: string | string[];
} 
const JoineRoom: FC<Props> = ({authenticateReducer, roomId}) => {
    const {user, token} = authenticateReducer;
    const hmsActions = useHMSActions();
    const preview = useHMSStore(selectLocalPeer);
    const { videoRef } = useVideo({
      trackId: preview?.videoTrack,
    });

    const defaultToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjI2YTkwMTliZDRmM2I1NmIwNzY5OGZhIiwicm9vbV9pZCI6IjYyNmE5OTU2ZmY2ODhjMDM3YTM4MDc0YyIsInVzZXJfaWQiOiJla2pyY2VxaiIsInJvbGUiOiJndWVzdCIsImp0aSI6Ijk5OGVkY2ZhLTgxNjEtNDQ5NS1iMWY3LTZmOGZkMWJiMzNmZiIsInR5cGUiOiJhcHAiLCJ2ZXJzaW9uIjoyLCJleHAiOjE2NTIxNzU1MTF9.PSg2Hh9W48dGivpzjj3zwLOFovV4PxXyaVoa_QWE5KQ"
    const [config, setConfig] = useState<HMSConfig>({
      userName: user.fullname,
      authToken: defaultToken,
      settings: {
        isAudioMuted: false,
        isVideoMuted: false,
      },
      rememberDeviceSelection: true, // remember manual device change
      captureNetworkQualityInPreview: false, // whether to measure network score in preview
    });
    const [authToken, setAuthToken] = useState<string>("");
    const [waiting, setWaiting] = useState<boolean>(true);

    const {
      isLocalAudioEnabled,
      isLocalVideoEnabled,
      toggleAudio,
      toggleVideo,
    } = useAVToggle();

    const getAuthToken = useCallback(async () => {
        const { data, status } = await genToken("host", roomId, token);
        if(status === 201) {
          setAuthToken(data.token);
          setConfig(prev => ({...prev, authToken: data.token}));
          await hmsActions.preview(config);
          setWaiting(false)
        }
    }, [roomId])

    useEffect(() => {
      getAuthToken();
    }, [getAuthToken]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    hmsActions.join({
      userName: user.fullname,
      authToken: authToken,
    });
  };

  return (
    <Container
      fluid
      css={{
        margin: 0,
        padding: 0,
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <video
        playsInline
        poster="/images/default_avt.jpg"
        muted
        ref={videoRef}
        autoPlay
        style={{
          width: 500,
          height: 500,
          borderRadius: "10px",
        }}
      />
      <Container
        css={{
          padding: 0,
          margin: 0,
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          gap: 10,
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
        <Button disabled={waiting} onClick={handleSubmit}>Join</Button>
      </Container>
    </Container>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

export default connect(mapStateToProps)(JoineRoom)