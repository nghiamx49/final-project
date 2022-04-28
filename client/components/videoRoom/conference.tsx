import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Controller from "./MediaContro";
import Video from "./Video";

function Conference() {
  const peers = useHMSStore(selectPeers);
  return (
    <div className="conference-section">
      <h2>Conference</h2>
      <div className="peers-container">
        {peers.map((peer) => (
          <Video key={peer.id} peer={peer} />
        ))}
      </div>
      <Controller />
    </div>
  );
}

export default Conference;
