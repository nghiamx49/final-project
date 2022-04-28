import {
  createContext,
  FC,
  MouseEventHandler,
  MutableRefObject,
  ReactChild,
  ReactChildren,
  RefObject,
  SyntheticEvent,
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
import { createRoom, genToken, getManageToken } from "../axiosClient/video-call.api";
import { useHMSActions } from "@100mslive/react-sdk";

export const socket = io("http://localhost:5000", { autoConnect: false });

export type ISocketContext = {
  socket: Socket;
  callFriends: Function;
  answerCall: MouseEventHandler;
  callAccepted: boolean;
  leaveCall: MouseEventHandler;
  isReceivingCall: boolean;
  openFirst: boolean;
  callEnded: boolean;
  user: IUser;
  roomId: string;
  from?: IUser;
};

interface IResponseCall {
  roomId: string;
  from: IUser;
}

export const SocketContext = createContext<ISocketContext | null>(null);

interface Props {
  children: ReactChild | ReactChildren;
  authenticateReducer: IAuthenciateState;
}

const SocketProvider: FC<Props> = ({ children, authenticateReducer }) => {
  const { user, token } = authenticateReducer;
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState<boolean>(false);
  const [openFirst, setOpenFirst] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('');
  const hmsActions = useHMSActions();
  const [from, setFrom] = useState<IUser>();

  useEffect(() => {
    socket.connect();
    socket.emit('online', user._id);
    socket.on("call-request", (data: IResponseCall) => {
      setRoomId(prev => data.roomId);
      setFrom(prev=> data.from)
      setIsReceivingCall(true);
    });
    return () => {
      socket.off("call-request");
      socket.disconnect();
    };
  }, []);

  const answerCall = async () => {
    const { data } = await genToken("guest", roomId, token);
    hmsActions.join({
      userName: user.fullname,
      authToken: data.token,
    });
    setOpenFirst(true);
    setIsReceivingCall(false);
    setCallAccepted(true);
  };

  const callFriends = async (friendId: string) => {
    let roomId:string = '';
    const {data, status} = await getManageToken(token);
    if(status === 200) {
      const body = {
        name: `video-call-with-${friendId}`,
        region: "in",
        description: "video call 1-1",
        template: "626a995587316dc7dd104b84",
      };
      const roomResponse = await createRoom(body, data.token);
      roomId = roomResponse.data.id;
    }
    socket.emit('call-request', {senderId: user._id, receiverId: friendId, roomId})
    const { data: tokenGen } = await genToken("host",roomId, token);
    setOpenFirst(true);
    hmsActions.join({
      userName: user.fullname,
      authToken: tokenGen.token,
    });
  };

  const leaveCall = (e: SyntheticEvent) => {
    setOpenFirst(false);
    setCallEnded(true);
    hmsActions.leave();
  };

  return (
    <SocketContext.Provider
      value={{
        isReceivingCall,
        socket,
        callFriends,
        answerCall,
        callAccepted,
        leaveCall,
        openFirst,
        callEnded,
        user,
        roomId,
        from
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
