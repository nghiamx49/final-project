import { HMSPeer, useVideo } from "@100mslive/react-sdk";
import { FC } from "react";

interface Props {
    peer: HMSPeer
}


const Video: FC<Props> = ({peer}) => {
    //peer.isLocal
    const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });
    return (
      <div className="peer-container">
        <video
          ref={videoRef}
          className={`peer-video`}
          autoPlay
          muted
          playsInline
        />
        <div className="peer-name">
          {peer.name} {peer.isLocal ? "(You)" : ""}
        </div>
      </div>
    );
}

export default Video;