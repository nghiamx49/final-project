import {
  createContext,
  FC,
  MouseEventHandler,
  MutableRefObject,
  ReactChild,
  ReactChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { io, Socket } from "socket.io-client";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import { IRootState } from "../store/interface/root.interface";
import Peer from "simple-peer";
import { boolean } from "yup";
import { ICallRequest, ICallResponse } from "../type/call.interface";
import { IUser } from "../store/interface/user.interface";

export const socket = io("http://localhost:5000", { autoConnect: false });

export type ISocketContext = {
  socket: Socket;
  callFriends: Function;
  answerCall: MouseEventHandler;
  callAccepted: boolean;
  leaveCall: Function;
  call: ICallResponse | undefined;
  isReceivingCall: boolean;
  openFirst: boolean;
  stream: MediaStream | undefined;
  callEnded: boolean;
  user: IUser;
  myVideo: RefObject<HTMLVideoElement>;
  userVideo: RefObject<HTMLVideoElement>;
  friend: IUser | undefined;
};

export const SocketContext = createContext<ISocketContext | null>(null);

interface Props {
  children: ReactChild | ReactChildren;
  authenticateReducer: IAuthenciateState;
}

const SocketProvider: FC<Props> = ({ children, authenticateReducer }) => {
  const { user, isAuthenticated } = authenticateReducer;
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [call, setCall] = useState<ICallResponse>();
  const [isReceivingCall, setIsReceivingCall] = useState<boolean>(false);
  const [openFirst, setOpenFirst] = useState<boolean>(false);
  const [friend, setFriend] = useState<IUser>();

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance>();

  useEffect(() => {
    socket.connect();
    socket.emit("online", user._id);
    socket.on("call-request", ({ from, signal }) => {
      console.log(signal);
      setCall({ from, signal });
      setIsReceivingCall(true);
    });
    return () => {
      socket.off("me");
      socket.off("call-request");
      socket.disconnect();
    };
  }, []);

  const answerCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current && (myVideo.current.srcObject = currentStream);
        userVideo.current &&
                (userVideo.current.srcObject = currentStream);
      });
    setOpenFirst(true);

    setIsReceivingCall(false);
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      console.log(call?.from.socketId);
      socket.emit("answer-call", { signal: data, to: call?.from.socketId, userId: user._id });
    });

    peer.on("stream", (currentStream) => {
      console.log(currentStream);
      userVideo.current && (userVideo.current.srcObject = currentStream);
    });

    peer.signal(call?.signal);

    connectionRef && (connectionRef.current = peer);
  };

  const callFriends = (friendId: string) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current && (myVideo.current.srcObject = currentStream);
         userVideo.current && (userVideo.current.srcObject = currentStream);
      });
    setOpenFirst(true);

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("call-request", {
        receiverId: friendId,
        signal: data,
        senderId: user._id,
      });
    });

    peer.on("stream", (currentStream) => {
          userVideo.current && (userVideo.current.srcObject = currentStream); 
    });

    socket.on("call-accepted", ({ signal, receiver }) => {
      console.log(receiver);
      setCallAccepted(true);
      setFriend(receiver);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
  };

  return (
    <SocketContext.Provider
      value={{
        isReceivingCall,
        call,
        socket,
        callFriends,
        answerCall,
        callAccepted,
        leaveCall,
        openFirst,
        stream,
        callEnded,
        user,
        myVideo,
        userVideo,
        friend,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

export default connect(mapStateToProps)(SocketProvider);
